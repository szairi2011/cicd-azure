import os
import time
from typing import Dict, Any
from dotenv import load_dotenv
from langgraph.prebuilt import create_react_agent
import ollama
from ollama import Client
import sys
from langchain_ollama import ChatOllama
# from tools import get_weather  # Import get_weather from the tools package
import requests

# Load environment variables
# load_dotenv()
# print("Ollama host is resolved to: ", os.getenv('OLLAMA_HOST'))

def get_weather(location: str = "", format_type: str = "json") -> str:
    """
    Get weather information from wttr.in service.
    
    Args:
        location (str): City name or coordinates. Empty string for auto-detection.
        format_type (str): Format type - 'text', 'json', or 'png'
    
    Returns:
        str: Weather information or None if failed
    """
    try:
        # Base URL for wttr.in service
        base_url = "https://wttr.in"
        
        # Build URL based on location and format
        if location:
            url = f"{base_url}/{location}"
        else:
            url = base_url
            
        # Add format parameters
        if format_type == "json":
            url += "?format=j1"
        elif format_type == "short":
            url += "?format=3"
        elif format_type == "one_line":
            url += "?format=1"
        
        # Make the request
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        return response.text
        
    except requests.exceptions.RequestException as e:
        print(f"Error fetching weather data: {e}")
        return None
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None

def setup_ollama_client() -> Client:
    """Setup and validate Ollama client connection."""
    load_dotenv()  # Load environment variables from .env file
    host = os.getenv('OLLAMA_HOST', 'http://localhost:11434')
    try:
        client = Client(host=host)
        # Test the connection
        models = client.list()
        print(models)
        return client
    except Exception as e:
        print(f"Failed to connect to Ollama at {host}: {str(e)}")
        sys.exit(1)

# Note: We're now using the get_weather function imported from tools package

def format_time(seconds):
    """Format time duration for display."""
    return f"{seconds:.2f}s"

def main() -> None:
    # Setup ollama client
    client = setup_ollama_client()

    # Start timing the overall execution
    total_start_time = time.time()
    
    # Step 1: Setup timing
    setup_start_time = time.time()
    print("Setting up Ollama client...")
    
    # Create ChatOllama model
    chat_model = ChatOllama(
        model="llama3.2",  # Change this to a model you have
        base_url='http://localhost:11434'
    )
    
    setup_time = time.time() - setup_start_time

    # Step 2: Agent creation timing
    agent_start_time = time.time()
    
    # Create a ReAct agent with improved weather assistant prompt
    agent = create_react_agent(
        model=chat_model,  # Using llm parameter as per current LangGraph conventions
        tools=[get_weather],
        prompt="""
        You are a helpful weather assistant that provides accurate weather information for any location.
        
        When responding to weather queries:
        1. Always use the weather tool to get current, accurate data
        2. Present information in a clear, readable format
        3. Include relevant details like temperature, conditions, humidity, wind, etc.
        4. Use appropriate units (°C for temperature, km/h for wind speed, etc.)
        5. If the location is not found, suggest similar locations or ask for clarification
        
        Your responses should be helpful, accurate, and user-friendly.
        """
    )
    
    agent_creation_time = time.time() - agent_start_time
    
    inputs = {"messages": [{"role": "user", "content": "what is the weather in sf"}]}

    print("=== Simple Weather Agent Demonstration ===")
    print("\nQuerying weather for San Francisco...")
    
    # Process and display the agent's response
    final_response = None
    updates = []
    
    # Step 3: Query execution timing
    query_start_time = time.time()
    
    # Collect all updates from the agent stream
    for chunk in agent.stream(inputs, stream_mode="updates"):
        updates.append(chunk)
        print(".", end="", flush=True)  # Show progress
        
    query_execution_time = time.time() - query_start_time
    
    # Step 4: Response extraction timing
    extraction_start_time = time.time()
    
    # Extract the final response from the updates
    for update in reversed(updates):
        if "agent" in update and "messages" in update["agent"]:
            messages = update["agent"]["messages"]
            if messages and hasattr(messages[0], 'content') and messages[0].content:
                final_response = messages[0].content
                break
                
    extraction_time = time.time() - extraction_start_time
    
    # Display the final formatted response
    if final_response:
        print("\n\nAI Assistant Response:")
        print("-" * 50)
        print(final_response)
        print("-" * 50)
    else:
        print("\n\nNo response generated by the agent.")
    
    # Calculate and display execution time
    total_execution_time = time.time() - total_start_time
    
    # Display timing information
    print("\n=== Performance Metrics ===")
    print(f"Setup time:            {format_time(setup_time)}")
    print(f"Agent creation time:   {format_time(agent_creation_time)}")
    print(f"Query execution time:  {format_time(query_execution_time)}")
    print(f"Response extraction:   {format_time(extraction_time)}")
    print(f"Total execution time:  {format_time(total_execution_time)}")
    
    # Calculate percentage of time spent in each phase
    print("\n=== Time Distribution ===")
    print(f"Setup:             {setup_time/total_execution_time*100:.1f}%")
    print(f"Agent creation:    {agent_creation_time/total_execution_time*100:.1f}%")
    print(f"Query execution:   {query_execution_time/total_execution_time*100:.1f}%")
    print(f"Response parsing:  {extraction_time/total_execution_time*100:.1f}%")


if __name__ == "__main__":
    main()