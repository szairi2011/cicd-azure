#!/usr/bin/env python3
# step-12-long_term_memory.py
# Implementing long-term memory for user preferences

import sys
import os
import uuid
import importlib.util
from typing import List, Dict, Any
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
    
    # Import memory setup
    memory_module = import_module("step_03_memory_setup", 
                                  os.path.join(base_path, "step-03-memory_setup.py"))
    in_memory_store = memory_module.in_memory_store
    checkpointer = memory_module.checkpointer
    
    # Import State definition
    state_module = import_module("step_04_state_definition", 
                                 os.path.join(base_path, "step-04-state_definition.py"))
    State = state_module.State
    
    # Import human-in-the-loop verification
    verification_module = import_module("step_11_human_in_the_loop", 
                                       os.path.join(base_path, "step-11-human_in_the_loop.py"))
    verify_info = verification_module.verify_info
    human_input = verification_module.human_input
    should_interrupt = verification_module.should_interrupt
    
    # Import langgraph components
    from langgraph.graph import StateGraph, START, END
    from langgraph.store.base import BaseStore
    from langchain_core.runnables import RunnableConfig
    
    # Helper function to format user memory (music preferences) into a readable string
    def format_user_memory(user_data):
        """Formats music preferences from users, if available."""
        profile = user_data['memory']  # Access the 'memory' key from the stored dictionary
        result = ""  # Initialize an empty string for the formatted result
        
        # Check if the profile object has a 'music_preferences' attribute and if it's not empty
        if hasattr(profile, 'music_preferences') and profile.music_preferences:
            # If preferences exist, join them into a comma-separated string
            result += f"Music Preferences: {', '.join(profile.music_preferences)}"
        
        return result.strip()  # Return the formatted string, removing any whitespace

    # Define the load_memory node function
    def load_memory(state: State, config: RunnableConfig, store: BaseStore):
        """Loads music preferences from users, if available."""
        
        user_id = state["customer_id"]  # Get the current customer ID from the state
        namespace = ("memory_profile", str(user_id))  # Define a namespace for storing user-specific memory
                                            # This creates a unique key for each user's profile
        
        # Attempt to retrieve existing memory for this user from the InMemoryStore
        existing_memory = store.get(namespace, "user_memory")
        
        formatted_memory = ""  # Initialize formatted memory as empty
        
        # If memory exists and has a value, format it using our helper function
        if existing_memory and existing_memory.value:
            formatted_memory = format_user_memory(existing_memory.value)

        # Update the loaded_memory field in the state with the retrieved and formatted memory
        return {"loaded_memory": formatted_memory}

    # Define a Pydantic BaseModel to structure the UserProfile for long-term memory
    class UserProfile(BaseModel):
        # customer_id: Required field for the customer's unique identifier
        customer_id: str = Field(
            description="The customer ID of the customer"
        )
        # music_preferences: A list of strings to store the customer's music interests
        music_preferences: List[str] = Field(
            description="The music preferences of the customer"
        )
    
    # Define the system prompt for the create_memory LLM
    create_memory_prompt = """You are an expert analyst that is observing a conversation that has taken place between a customer and a customer support assistant. The customer support assistant works for a digital music store, and has utilized a multi-agent team to answer the customer's request. 
    You are tasked with analyzing the conversation that has taken place between the customer and the customer support assistant, and updating the memory profile associated with the customer. The memory profile may be empty. If it's empty, you should create a new memory profile for the customer.

    You specifically care about saving any music interest the customer has shared about themselves, particularly their music preferences to their memory profile.

    To help you with this task, I have attached the conversation that has taken place between the customer and the customer support assistant below, as well as the existing memory profile associated with the customer that you should either update or create. 

    The customer's memory profile should have the following fields:
    - customer_id: the customer ID of the customer
    - music_preferences: the music preferences of the customer

    These are the fields you should keep track of and update in the memory profile. If there has been no new information shared by the customer, you should not update the memory profile. It is completely okay if you do not have new information to update the memory profile with. In that case, just leave the values as they are.

    *IMPORTANT INFORMATION BELOW*

    The conversation between the customer and the customer support assistant that you should analyze is as follows:
    {conversation}

    The existing memory profile associated with the customer that you should either update or create is as follows:
    {memory_profile}

    Ensure your response is an object that has the following fields:
    - customer_id: the customer ID of the customer
    - music_preferences: the music preferences of the customer

    For each key in the object, if there is no new information, do not update the value, just keep the value that is already there. If there is new information, update the value. 

    Take a deep breath and think carefully before responding.
    """

    # Define the create_memory node function
    def create_memory(state: State, config: RunnableConfig, store: BaseStore):
        """Analyzes the conversation and saves/updates user music preferences."""
        user_id = str(state["customer_id"])  # Get the customer ID from the current state
        namespace = ("memory_profile", user_id)  # Define the namespace for this user's memory profile
        
        # Retrieve the existing memory profile for this user from the long-term store
        existing_memory = store.get(namespace, "user_memory")
        
        formatted_memory = ""  # Initialize formatted memory for the prompt
        if existing_memory and existing_memory.value:
            existing_memory_dict = existing_memory.value  # Get the dictionary containing the UserProfile instance
            # Format existing music preferences into a string for the prompt
            formatted_memory = (
                f"Music Preferences: {', '.join(existing_memory_dict.get('memory').music_preferences or [])}"  # Access the UserProfile object via 'memory' key
            )

        # Create a SystemMessage with the formatted prompt, injecting the full conversation history
        # and the existing memory profile
        formatted_system_message = SystemMessage(content=create_memory_prompt.format(
            conversation=state["messages"], 
            memory_profile=formatted_memory
        ))
        
        # Invoke the LLM with structured output (UserProfile) to analyze the conversation
        # and update the memory profile based on new information
        updated_memory = llm.with_structured_output(UserProfile).invoke([formatted_system_message])
        
        key = "user_memory"  # Define the key for storing this specific memory object
        
        # Store the updated memory profile back into the InMemoryStore
        # Wrap updated_memory in a dictionary under the key 'memory' for consistency in access
        store.put(namespace, key, {"memory": updated_memory})
        
        # No state modifications needed for this node
        return {}

    # Create the final multi-agent graph with memory management
    multi_agent_final = StateGraph(State)

    # Add all necessary nodes to the graph
    multi_agent_final.add_node("verify_info", verify_info)         # Node for customer verification
    multi_agent_final.add_node("human_input", human_input)         # Node for human-in-the-loop interruption
    multi_agent_final.add_node("load_memory", load_memory)         # Node for loading user long-term memory
    
    # Import supervisor from verification module to avoid circular imports
    supervisor_prebuilt = verification_module.supervisor_prebuilt
    multi_agent_final.add_node("supervisor", supervisor_prebuilt)  # Supervisor for routing to sub-agents
    
    multi_agent_final.add_node("create_memory", create_memory)     # Node for saving/updating user long-term memory

    # Define the initial entry point: all interactions start with verification
    multi_agent_final.add_edge(START, "verify_info")

    # Define the conditional routing after verify_info
    multi_agent_final.add_conditional_edges(
        "verify_info",
        should_interrupt,
        {
            "continue": "load_memory",  # If verified, load user memory
            "interrupt": "human_input",  # If not verified, request human input
        },
    )

    # After human_input (resume), loop back to verify_info to re-attempt verification
    multi_agent_final.add_edge("human_input", "verify_info")

    # After loading memory, proceed to the supervisor for main query processing
    multi_agent_final.add_edge("load_memory", "supervisor")

    # After the supervisor completes, save/update the user's memory
    multi_agent_final.add_edge("supervisor", "create_memory")

    # The graph ends after memory has been updated
    multi_agent_final.add_edge("create_memory", END)

    # Compile the entire graph
    multi_agent_final_graph = multi_agent_final.compile(
        name="multi_agent_final", 
        checkpointer=checkpointer, 
        store=in_memory_store
    )
    
    # Example function to test the full graph with memory
    def test_full_graph_with_memory():
        thread_id = uuid.uuid4()
        question = "My customer ID is 1. How much was my most recent purchase? I'm also a big fan of The Rolling Stones, do you have any of their albums?"
        config = {"configurable": {"thread_id": thread_id, "user_id": "1"}}
        
        # Invoke the graph with a comprehensive question
        result = multi_agent_final_graph.invoke({"messages": [HumanMessage(content=question)]}, config=config)
        print("\n--- Full Conversation with Memory ---")
        for message in result["messages"]:
            print(f"Role: {message.type}\nContent: {message.content}\n")
        
        # Check saved preferences
        user_id = "1"
        namespace = ("memory_profile", user_id)
        memory_data = in_memory_store.get(namespace, "user_memory")
        if memory_data and "memory" in memory_data.value:
            saved_music_preferences = memory_data.value.get("memory").music_preferences
            print(f"\nSaved Music Preferences for Customer ID {user_id}: {saved_music_preferences}")
        else:
            print(f"\nNo saved preferences found for Customer ID {user_id}")
            
        return result

    # Run the test if executed directly
    if __name__ == "__main__":
        test_full_graph_with_memory()

except Exception as e:
    print(f"Error in long-term memory setup: {e}")
    raise
