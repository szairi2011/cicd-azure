#!/usr/bin/env python3
# step-07-music_react_graph.py
# Defining and compiling the music catalog sub-agent graph

import sys
from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import ToolNode

# Add necessary path for imports
if __name__ == "__main__":
    sys.path.append('..')

# Try to import from the steps directory
try:
    # Use dynamic imports to handle module structure
    import importlib.util
    import os
    
    # Helper function for importing modules
    def import_module(name, path):
        spec = importlib.util.spec_from_file_location(name, path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        return module
    
    # Import all necessary modules
    base_path = os.path.dirname(os.path.abspath(__file__))
    
    # Import memory setup
    memory_module = import_module("step_03_memory_setup", 
                                  os.path.join(base_path, "step-03-memory_setup.py"))
    in_memory_store = memory_module.in_memory_store
    checkpointer = memory_module.checkpointer
    
    # Import State definition
    state_module = import_module("step_04_state_definition", 
                                 os.path.join(base_path, "step-04-state_definition.py"))
    State = state_module.State
    
    # Import music tools
    tools_module = import_module("step_05_music_tools", 
                                os.path.join(base_path, "step-05-music_tools.py"))
    music_tools = tools_module.music_tools
    
    # Import music assistant node
    assistant_module = import_module("step_06_music_assistant_node", 
                                    os.path.join(base_path, "step-06-music_assistant_node.py"))
    music_assistant = assistant_module.music_assistant
    
except Exception as e:
    print(f"Error importing required modules: {e}")
    sys.exit(1)

# Create a ToolNode for executing music tools
music_tool_node = ToolNode(music_tools)

# Define the conditional edge function to determine next steps
def should_continue(state, config=None):
    """Determine whether to continue with tool execution or end the graph."""
    # Default config to empty dict if None
    if config is None:
        config = {}
        
    # Get the list of messages from the current state.
    messages = state["messages"]
    # Get the last message, which is the response from the `music_assistant` LLM.
    last_message = messages[-1]
    
    # Check if the last message contains any tool calls.
    if not hasattr(last_message, 'tool_calls') or not last_message.tool_calls:
        # If there are no tool calls, it means the LLM has generated a final answer.
        return "end"
    # Otherwise, if there are tool calls, route to the tool execution node.
    else:
        return "continue"

# Initialize the state graph
def build_music_catalog_graph():
    """Build and compile the music catalog sub-agent graph."""
    # Initialize a StateGraph with our defined `State` schema.
    music_workflow = StateGraph(State)
    
    # Add nodes
    music_workflow.add_node("music_assistant", music_assistant)
    music_workflow.add_node("music_tool_node", music_tool_node)
    
    # Define the starting point of the graph.
    music_workflow.add_edge(START, "music_assistant")
    
    # Add conditional edge from 'music_assistant'
    music_workflow.add_conditional_edges(
        "music_assistant", # Source node
        should_continue,   # Conditional function to call
        {
            # If `should_continue` returns "continue", route to `music_tool_node`.
            "continue": "music_tool_node",
            # If `should_continue` returns "end", terminate the graph execution.
            "end": END,
        },
    )
    
    # Add edge from 'music_tool_node' back to 'music_assistant'
    music_workflow.add_edge("music_tool_node", "music_assistant")
    
    # Compile the graph
    return music_workflow.compile(
        name="music_catalog_subagent", 
        checkpointer=checkpointer, 
        store=in_memory_store
    )

# Create the compiled graph
music_catalog_subagent = build_music_catalog_graph()

# When running directly, test the graph
if __name__ == "__main__":
    import uuid
    from langchain_core.messages import HumanMessage
    
    # Generate a unique thread ID for the conversation
    thread_id = uuid.uuid4()
    
    # Define a test question
    question = "I like the Rolling Stones. What songs do you recommend by them or by other artists that I might like?"
    
    # Create config with thread ID
    config = {"configurable": {"thread_id": thread_id}}
    
    # Invoke the graph
    print("\nTesting music catalog sub-agent...")
    result = music_catalog_subagent.invoke(
        {"messages": [HumanMessage(content=question)]}, 
        config=config
    )
    
    # Print the results
    print("\nConversation results:")
    for i, message in enumerate(result["messages"]):
        role = getattr(message, "type", "unknown")
        content = getattr(message, "content", "No content")
        print(f"{i+1}. {role}: {content}")
