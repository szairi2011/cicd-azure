#!/usr/bin/env python3
# step-11-human_in_the_loop.py
# Implementing customer verification with human-in-the-loop functionality

import sys
import os
import uuid
import importlib.util
import ast
from typing import Optional
from pydantic import BaseModel, Field
from langchain_core.messages import SystemMessage, HumanMessage

# Add parent directory to path for imports when running directly
if __name__ == "__main__":
    sys.path.append('..')

# Helper function for importing modules
def import_module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

try:
    # Import all necessary modules
    base_path = os.path.dirname(os.path.abspath(__file__))
    
    # Import LLM
    llm_module = import_module("step_01_setup_ollama", 
                              os.path.join(base_path, "step-01-setup_ollama.py"))
    llm = llm_module.llm
    
    # Import database
    db_module = import_module("step_02_database_setup", 
                              os.path.join(base_path, "step-02-database_setup.py"))
    db = db_module.db
    
    # Import memory setup
    memory_module = import_module("step_03_memory_setup", 
                                  os.path.join(base_path, "step-03-memory_setup.py"))
    in_memory_store = memory_module.in_memory_store
    checkpointer = memory_module.checkpointer
    
    # Import State definition
    state_module = import_module("step_04_state_definition", 
                                 os.path.join(base_path, "step-04-state_definition.py"))
    State = state_module.State
    
    # Import supervisor agent
    supervisor_module = import_module("step_10_supervisor_agent", 
                                       os.path.join(base_path, "step-10-supervisor_agent.py"))
    supervisor_prebuilt = supervisor_module.supervisor_prebuilt
    
    # Import langgraph interrupt capability
    from langgraph.types import interrupt
    from langgraph.graph import StateGraph, START, END
    from langgraph.types import Command
    from langchain_core.runnables import RunnableConfig
    
    # Define a Pydantic model for structured output
    class UserInput(BaseModel):
        """Schema for parsing user-provided account information."""
        identifier: str = Field(description="Identifier, which can be a customer ID, email, or phone number.")

    # Bind the Pydantic schema to the LLM
    structured_llm = llm.with_structured_output(schema=UserInput)

    # Define system prompt for the structured LLM
    structured_system_prompt = """You are a customer service representative responsible for extracting customer identifier.\n 
    Only extract the customer's account information from the message history. 
    If they haven't provided the information yet, return an empty string for the file"""

    # Helper function to retrieve customer ID from various identifiers
    def get_customer_id_from_identifier(identifier: str) -> Optional[int]:
        """
        Retrieve Customer ID using an identifier, which can be a customer ID, email, or phone number.
        
        Args:
            identifier (str): The identifier can be customer ID, email, or phone.
        
        Returns:
            Optional[int]: The CustomerId if found, otherwise None.
        """
        # Check if the identifier is purely numeric (direct customer ID)
        if identifier.isdigit():
            return int(identifier)
        
        # Check if the identifier starts with '+' (phone number)
        elif identifier.startswith('+'):
            query = f"SELECT CustomerId FROM Customer WHERE Phone = '{identifier}';"
            result = db.run(query)
            formatted_result = ast.literal_eval(result) if result else []
            if formatted_result:
                return formatted_result[0][0]  # Return the first CustomerId found
        
        # Check if the identifier contains '@' (email address)
        elif "@" in identifier:
            query = f"SELECT CustomerId FROM Customer WHERE Email = '{identifier}';"
            result = db.run(query)
            formatted_result = ast.literal_eval(result) if result else []
            if formatted_result:
                return formatted_result[0][0]  # Return the first CustomerId found
        
        # If no matching identifier type is found or no ID is retrieved, return None
        return None

    # Define the verification node function
    def verify_info(state: State, config: RunnableConfig):
        """Verify the customer's account by parsing their input and matching it with the database."""

        # Check if a customer_id is already present in the state
        if state.get("customer_id") is None:
            # System instructions for the verification LLM
            system_instructions = """You are a music store agent, where you are trying to verify the customer identity 
            as the first step of the customer support process. 
            Only after their account is verified, you would be able to support them on resolving the issue. 
            In order to verify their identity, one of their customer ID, email, or phone number needs to be provided.
            If the customer has not provided the information yet, please ask them for it.
            If they have provided the identifier but cannot be found, please ask them to revise it."""

            # Get the most recent user message from the state
            user_input = state["messages"][-1]
        
            # Use the structured LLM to parse the user's input for an identifier
            parsed_info = structured_llm.invoke([SystemMessage(content=structured_system_prompt)] + [user_input])
        
            # Extract the identified identifier string
            identifier = parsed_info.identifier
        
            customer_id = None  # Initialize customer_id as None
            # Attempt to find the customer ID in the database using the helper function
            if identifier:
                customer_id = get_customer_id_from_identifier(identifier)
        
            # If a valid customer_id was found
            if customer_id is not None:
                # Create a system message confirming verification
                intent_message = SystemMessage(
                    content=f"Thank you for providing your information! I was able to verify your account with customer id {customer_id}."
                )
                # Update the state with the found customer_id and the confirmation message
                return {
                    "customer_id": customer_id,
                    "messages": [intent_message]
                }
            # If no customer_id was found or provided
            else:
                # Invoke the base LLM with instructions to prompt the user for their identifier or revise it
                response = llm.invoke([SystemMessage(content=system_instructions)] + state['messages'])
                # Update the state with the LLM's response (the prompt for user input)
                return {"messages": [response]}
        else:
            # If customer_id is already in state, this node does nothing
            pass

    # Define the human_input node function
    def human_input(state: State, config: RunnableConfig):
        """No-op node that should be interrupted on"""
        # Pause the graph execution and wait for user input
        user_input = interrupt("Please provide input.")
        
        # The new user input (after resume) is then added to the messages in the state
        return {"messages": [user_input]}

    # Define the conditional edge function for verify_info
    def should_interrupt(state: State, config: RunnableConfig):
        # If customer_id is present, verification was successful
        if state.get("customer_id") is not None:
            return "continue"
        # Otherwise, interrupt for human input
        else:
            return "interrupt"

    # Create the multi-agent graph with human-in-the-loop verification
    multi_agent_verify = StateGraph(State)

    # Add nodes
    multi_agent_verify.add_node("verify_info", verify_info)
    multi_agent_verify.add_node("human_input", human_input)
    multi_agent_verify.add_node("supervisor", supervisor_prebuilt)

    # Define edges
    multi_agent_verify.add_edge(START, "verify_info")
    multi_agent_verify.add_conditional_edges(
        "verify_info",
        should_interrupt,
        {
            "continue": "supervisor",
            "interrupt": "human_input",
        },
    )
    multi_agent_verify.add_edge("human_input", "verify_info")
    multi_agent_verify.add_edge("supervisor", END)

    # Compile the graph
    multi_agent_verify_graph = multi_agent_verify.compile(
        name="multi_agent_verify", 
        checkpointer=checkpointer, 
        store=in_memory_store
    )
    
    # Example function to test the human-in-the-loop verification
    def test_verification():
        thread_id = uuid.uuid4()
        question = "How much was my most recent purchase?"
        config = {"configurable": {"thread_id": thread_id}}
        
        # Initial invocation (will request customer ID)
        result = multi_agent_verify_graph.invoke({"messages": [HumanMessage(content=question)]}, config=config)
        print("\n--- Initial Invocation (Request for ID) ---")
        for message in result["messages"]:
            print(f"Role: {message.type}\nContent: {message.content}\n")
        
        # Resume with customer ID
        customer_id_input = "My customer ID is 1."
        result = multi_agent_verify_graph.invoke(Command(resume=customer_id_input), config=config)
        print("\n--- After Providing ID ---")
        for message in result["messages"]:
            print(f"Role: {message.type}\nContent: {message.content}\n")
        
        return result

    # Run the test if executed directly
    if __name__ == "__main__":
        test_verification()

except Exception as e:
    print(f"Error in human-in-the-loop setup: {e}")
    raise
