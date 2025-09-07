#!/usr/bin/env python3
# step-06-music_assistant_node.py
# Defining the music assistant node for the multi-agent system

import sys
import os
from langchain_core.messages import SystemMessage

# Add parent directory to path for imports when running directly
if __name__ == "__main__":
    sys.path.append('..')

# Try to import from the steps directory
try:
    # First try relative import when used as module
    try:
        from .step_01_setup_ollama import llm
        from .step_04_state_definition import State
        from .step_05_music_tools import music_tools
    except ImportError:
        # Then try from steps package
        from steps.step_01_setup_ollama import llm
        from steps.step_04_state_definition import State
        from steps.step_05_music_tools import music_tools
except ImportError:
    # Fallback to direct imports when run as script
    try:
        import importlib.util
        
        # Import llm from step_01
        spec = importlib.util.spec_from_file_location("step_01_setup_ollama",
             "steps/step_01_setup_ollama.py")
        llm_module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(llm_module)
        llm = llm_module.llm
        
        # Import State from step_04
        spec = importlib.util.spec_from_file_location("step_04_state_definition",
             "steps/step_04_state_definition.py")
        state_module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(state_module)
        State = state_module.State
        
        # Import music_tools from step_05
        spec = importlib.util.spec_from_file_location("step_05_music_tools",
             "steps/step_05_music_tools.py")
        tools_module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(tools_module)
        music_tools = tools_module.music_tools
        
    except Exception as e:
        print(f"Error importing required modules: {e}")
        sys.exit(1)

# Bind the tools to our LLM
llm_with_music_tools = llm.bind_tools(music_tools)

# Define the system prompt for the music assistant
def generate_music_assistant_prompt(memory: str = "None") -> str:
    return f"""
    You are a member of the assistant team, your role specifically is to focused on helping customers discover and learn about music in our digital catalog. 
    If you are unable to find playlists, songs, or albums associated with an artist, it is okay. 
    Just inform the customer that the catalog does not have any playlists, songs, or albums associated with that artist.
    You also have context on any saved user preferences, helping you to tailor your response. 
    
    CORE RESPONSIBILITIES:
    - Search and provide accurate information about songs, albums, artists, and playlists
    - Offer relevant recommendations based on customer interests
    - Handle music-related queries with attention to detail
    - Help customers discover new music they might enjoy
    - You are routed only when there are questions related to music catalog; ignore other questions. 
    
    SEARCH GUIDELINES:
    1. Always perform thorough searches before concluding something is unavailable
    2. If exact matches aren't found, try:
       - Checking for alternative spellings
       - Looking for similar artist names
       - Searching by partial matches
       - Checking different versions/remixes
    3. When providing song lists:
       - Include the artist name with each song
       - Mention the album when relevant
       - Note if it's part of any playlists
       - Indicate if there are multiple versions
    
    Additional context is provided below: 

    Prior saved user preferences: {memory}
    
    Message history is also attached.  
    """

# Define the music_assistant node function
def music_assistant(state: State, config=None): 
    # Default config to empty dict if None
    if config is None:
        config = {}

    # Fetch long-term memory (user preferences) from the state.
    # If `loaded_memory` is not present in the state, default to "None".
    memory = "None" 
    if "loaded_memory" in state: 
        memory = state["loaded_memory"]

    # Generate the system prompt for the music assistant, injecting the loaded memory.
    music_assistant_prompt = generate_music_assistant_prompt(memory)

    # Invoke the LLM with the system prompt and the current message history.
    response = llm_with_music_tools.invoke([SystemMessage(content=music_assistant_prompt)] + state["messages"])
    
    # Update the state by appending the LLM's response to the `messages` list.
    return {"messages": [response]}

# Test the music_assistant node when running directly
if __name__ == "__main__":
    from langchain_core.messages import HumanMessage
    
    # Create a test state
    test_state = {
        "customer_id": "1",
        "messages": [
            HumanMessage(content="I'm looking for some albums by Queen. What do you recommend?")
        ],
        "loaded_memory": "Previous preferences: Rock music, likes Queen and Led Zeppelin",
        "remaining_steps": None  # Not needed for this test
    }
    
    # Run the music_assistant node
    print("\nTesting music_assistant node...")
    result = music_assistant(test_state)
    
    # Print the result
    print("\nMusic Assistant Response:")
    print(result["messages"][0].content)
