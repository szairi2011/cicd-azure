#!/usr/bin/env python3
# step-10-supervisor_agent.py
# Creating a supervisor agent to route between music and invoice sub-agents

import sys
import os
import importlib.util

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
    
    # Import music catalog sub-agent
    music_agent_module = import_module("step_07_music_react_graph", 
                                     os.path.join(base_path, "step-07-music_react_graph.py"))
    music_catalog_subagent = music_agent_module.music_catalog_subagent
    
    # Import invoice information sub-agent
    invoice_agent_module = import_module("step_09_invoice_agent_prebuilt", 
                                       os.path.join(base_path, "step-09-invoice_agent_prebuilt.py"))
    invoice_information_subagent = invoice_agent_module.invoice_information_subagent
    
except Exception as e:
    print(f"Error importing required modules: {e}")
    sys.exit(1)

# Try importing langgraph_supervisor or install it
try:
    import langgraph_supervisor
except ImportError:
    print("langgraph_supervisor package not found. Installing...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "langgraph_supervisor"])
    import langgraph_supervisor

from langgraph_supervisor import create_supervisor

# Define the system prompt for the supervisor agent
supervisor_prompt = """You are an expert customer support assistant for a digital music store. 
You are dedicated to providing exceptional service and ensuring customer queries are answered thoroughly. 
You have a team of subagents that you can use to help answer queries from customers. 
Your primary role is to serve as a supervisor/planner for this multi-agent team that helps answer queries from customers. 

Your team is composed of two subagents that you can use to help answer the customer's request:
1. music_catalog_information_subagent: this subagent has access to user's saved music preferences. It can also retrieve information about the digital music store's music 
catalog (albums, tracks, songs, etc.) from the database. 
3. invoice_information_subagent: this subagent is able to retrieve information about a customer's past purchases or invoices 
from the database. 

Based on the existing steps that have been taken in the messages, your role is to generate the next subagent that needs to be called. 
This could be one step in an inquiry that needs multiple sub-agent calls. """

# Create the supervisor workflow
def build_supervisor():
    """Build and compile the supervisor agent to route between sub-agents."""
    # Create the supervisor workflow using the create_supervisor utility
    supervisor_workflow = create_supervisor(
        agents=[invoice_information_subagent, music_catalog_subagent],  # List of available sub-agents
        output_mode="last_message",  # Return only the last message from the selected sub-agent
        model=llm,                   # The LLM to use for routing decisions
        prompt=supervisor_prompt,    # The system prompt for the supervisor
        state_schema=State           # The shared state schema
    )
    
    # Compile the supervisor workflow
    return supervisor_workflow.compile(
        name="supervisor_agent",
        checkpointer=checkpointer,
        store=in_memory_store
    )

# Create the supervisor agent
supervisor_agent = build_supervisor()

# Test the supervisor agent when running directly
if __name__ == "__main__":
    import uuid
    from langchain_core.messages import HumanMessage
    
    # Generate a unique thread ID for this conversation
    thread_id = uuid.uuid4()
    
    # Define a question that involves both invoice and music information
    question = "My customer ID is 1. How much was my most recent purchase? What albums do you have by U2?"
    
    # Set up the configuration with the thread ID
    config = {"configurable": {"thread_id": thread_id}}
    
    # Invoke the supervisor agent
    print("\nTesting supervisor agent...")
    result = supervisor_agent.invoke(
        {"messages": [HumanMessage(content=question)]}, 
        config=config
    )
    
    # Print the conversation results
    print("\nConversation results:")
    for i, message in enumerate(result["messages"]):
        role = getattr(message, "type", "unknown")
        content = getattr(message, "content", "No content")
        print(f"{i+1}. {role}: {content}")
