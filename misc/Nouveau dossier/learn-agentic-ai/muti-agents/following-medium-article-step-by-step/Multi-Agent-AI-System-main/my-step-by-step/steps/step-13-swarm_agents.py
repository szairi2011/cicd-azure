#!/usr/bin/env python3
# step-13-swarm_agents.py
# Implementing a swarm architecture for decentralized agent collaboration

import sys
import os
import uuid
import importlib.util
from langchain_core.messages import HumanMessage

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
    print("Setting up swarm agents...")
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
    
    # Import music tools and prompt
    music_tools_module = import_module("step_05_music_tools", 
                                      os.path.join(base_path, "step-05-music_tools.py"))
    music_tools = music_tools_module.music_tools
    
    music_assistant_module = import_module("step_06_music_assistant_node", 
                                         os.path.join(base_path, "step-06-music_assistant_node.py"))
    generate_music_assistant_prompt = music_assistant_module.generate_music_assistant_prompt
    
    # Import invoice tools and prompt
    invoice_tools_module = import_module("step_08_invoice_tools", 
                                        os.path.join(base_path, "step-08-invoice_tools.py"))
    invoice_tools = invoice_tools_module.invoice_tools
    
    invoice_agent_module = import_module("step_09_invoice_agent_prebuilt", 
                                        os.path.join(base_path, "step-09-invoice_agent_prebuilt.py"))
    invoice_subagent_prompt = invoice_agent_module.invoice_subagent_prompt
    
    # Import langgraph-swarm (check if installed)
    try:
        from langgraph_swarm import create_handoff_tool, create_swarm
    except ImportError:
        print("Installing langgraph-swarm...")
        import subprocess
        subprocess.check_call([sys.executable, "-m", "pip", "install", "langgraph-swarm"])
        from langgraph_swarm import create_handoff_tool, create_swarm
    
    # Import create_react_agent
    from langgraph.prebuilt import create_react_agent

    # Create handoff tools between agents
    transfer_to_invoice_agent_handoff_tool = create_handoff_tool(
        agent_name="invoice_information_agent_with_handoff",
        description="Transfer user to the invoice information agent that can help with invoice information"
    )

    transfer_to_music_catalog_agent_handoff_tool = create_handoff_tool(
        agent_name="music_catalog_agent_with_handoff",
        description="Transfer user to the music catalog agent that can help with music searches and music catalog information"
    )

    # Combine the handoff tools with the existing specific tools for each agent
    invoice_tools_with_handoff = [transfer_to_music_catalog_agent_handoff_tool] + invoice_tools
    music_tools_with_handoff = [transfer_to_invoice_agent_handoff_tool] + music_tools

    # Create the invoice information agent with its original prompt and the handoff tool
    invoice_information_agent_with_handoff = create_react_agent(
        llm,
        invoice_tools_with_handoff,
        prompt=invoice_subagent_prompt,
        name="invoice_information_agent_with_handoff"
    )

    # Create the music catalog agent with its original prompt and the handoff tool
    music_catalog_agent_with_handoff = create_react_agent(
        llm,
        music_tools_with_handoff,
        prompt=generate_music_assistant_prompt(),
        name="music_catalog_agent_with_handoff"
    )

    # Create the swarm workflow
    swarm_workflow = create_swarm(
        agents=[invoice_information_agent_with_handoff, music_catalog_agent_with_handoff],
        default_active_agent="invoice_information_agent_with_handoff"
    )

    # Compile the swarm graph
    swarm_agents = swarm_workflow.compile(
        checkpointer=checkpointer,
        store=in_memory_store
    )
    
    # Example function to test the swarm agents
    def test_swarm_agents():
        thread_id = uuid.uuid4()
        question = "Do you have any albums by the Rolling Stones?"
        config = {"configurable": {"thread_id": thread_id}}
        
        # Invoke the swarm agents. Even though the default active agent is invoice_information_agent_with_handoff,
        # it should recognize that the query is for music and hand off to music_catalog_agent_with_handoff
        print("\n--- Testing Swarm Agents ---")
        print(f"Question: {question}")
        print("Expected behavior: Invoice agent should recognize music query and hand off to music catalog agent")
        print("Invoking swarm agents...\n")
        
        result = swarm_agents.invoke({"messages": [HumanMessage(content=question)]}, config=config)
        
        print("--- Swarm Agent Conversation ---")
        for message in result["messages"]:
            print(f"Role: {message.type}\nContent: {message.content}\n")
            
        return result

    # Run the test if executed directly
    if __name__ == "__main__":
        test_swarm_agents()

except Exception as e:
    print(f"Error in swarm agent setup: {e}")
    raise
