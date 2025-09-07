#!/usr/bin/env python3
# step-09-invoice_agent_prebuilt.py
# Creating the invoice information sub-agent using the pre-built ReAct agent

import sys
import os
from langgraph.prebuilt import create_react_agent

# Add parent directory to path for imports when running directly
if __name__ == "__main__":
    sys.path.append('..')

# Try to import from the steps directory
try:
    # Use dynamic imports to handle module structure
    import importlib.util
    
    # Helper function for importing modules
    def import_module(name, path):
        spec = importlib.util.spec_from_file_location(name, path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        return module
    
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
    
    # Import invoice tools
    tools_module = import_module("step_08_invoice_tools", 
                                os.path.join(base_path, "step-08-invoice_tools.py"))
    invoice_tools = tools_module.invoice_tools
    
except Exception as e:
    print(f"Error importing required modules: {e}")
    sys.exit(1)

# Define the system prompt for the invoice information sub-agent
invoice_subagent_prompt = """
    You are a subagent among a team of assistants. You are specialized for retrieving and processing invoice information. You are routed for invoice-related portion of the questions, so only respond to them.. 

    You have access to three tools. These tools enable you to retrieve and process invoice information from the database. Here are the tools:
    - get_invoices_by_customer_sorted_by_date: This tool retrieves all invoices for a customer, sorted by invoice date.
    - get_invoices_sorted_by_unit_price: This tool retrieves all invoices for a customer, sorted by unit price.
    - get_employee_by_invoice_and_customer: This tool retrieves the employee information associated with an invoice and a customer.
    
    If you are unable to retrieve the invoice information, inform the customer you are unable to retrieve the information, and ask if they would like to search for something else.
    
    CORE RESPONSIBILITIES:
    - Retrieve and process invoice information from the database
    - Provide detailed information about invoices, including customer details, invoice dates, total amounts, employees associated with the invoice, etc. when the customer asks for it.
    - Always maintain a professional, friendly, and patient demeanor
    
    You may have additional context that you should use to help answer the customer's query. It will be provided to you below:
    """

# Create the invoice information subagent using the pre-built create_react_agent function
def build_invoice_agent():
    """Build the invoice information subagent using the pre-built ReAct agent creator."""
    return create_react_agent(
        llm,                          # The language model to use for reasoning
        tools=invoice_tools,          # The list of tools available to this agent
        name="invoice_information_subagent", # A unique name for this agent
        prompt=invoice_subagent_prompt, # The system prompt for this agent's persona and instructions
        state_schema=State,           # The shared state schema for the graph
        checkpointer=checkpointer,    # The checkpointer for short-term memory
        store=in_memory_store         # The in-memory store for long-term user data
    )

# Create the invoice agent
invoice_information_subagent = build_invoice_agent()

# Test the invoice sub-agent when running directly
if __name__ == "__main__":
    import uuid
    from langchain_core.messages import HumanMessage
    
    # Generate a unique thread ID for this conversation
    thread_id = uuid.uuid4()
    
    # Define a sample question for the invoice sub-agent
    question = "My customer id is 1. What was my most recent invoice, and who was the employee that helped me with it?"
    
    # Set up the configuration with the thread ID
    config = {"configurable": {"thread_id": thread_id}}
    
    # Invoke the invoice sub-agent with the question and configuration
    print("\nTesting invoice information sub-agent...")
    result = invoice_information_subagent.invoke(
        {"messages": [HumanMessage(content=question)]}, 
        config=config
    )
    
    # Print the conversation history
    print("\nConversation results:")
    for i, message in enumerate(result["messages"]):
        role = getattr(message, "type", "unknown")
        content = getattr(message, "content", "No content")
        print(f"{i+1}. {role}: {content}")
