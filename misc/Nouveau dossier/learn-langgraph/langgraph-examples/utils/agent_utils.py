"""Agent utilities for creating and managing LangGraph agents."""

from typing import List, Dict, Any, Optional
from langchain_ollama import ChatOllama
from langgraph.prebuilt import create_react_agent
from tools import get_weather


def create_weather_agent(
    model_name: str = "llama3.2",
    base_url: str = "http://localhost:11434",
    prompt: Optional[str] = None,
    tools: Optional[List] = None
):
    """Create a weather agent with the specified configuration.
    
    Args:
        model_name (str): Name of the Ollama model to use
        base_url (str): Base URL for the Ollama service
        prompt (str, optional): Custom prompt for the agent
        tools (List, optional): List of tools to use with the agent
        
    Returns:
        Agent: Configured ReAct agent
    """
    if tools is None:
        tools = [get_weather]
    
    # Create ChatOllama model
    chat_model = ChatOllama(
        model=model_name,
        base_url=base_url
    )
    
    # Default prompt if none provided
    if prompt is None:
        prompt = """
        You are a helpful assistant that will display the weather in a given city. 
        In the response to the user prompt, you will both provide the raw data from the weather API as well as the AI analysed response.
        Both responses will be part of two separate messages keys in the response. 
        When providing the final response, extract the response durations for each one, i.e. the tool(s) response message and the analysed AI response message, and convert them from milliseconds to seconds to be human readable.
        The idea is to help understand the latency of the model and the tool(s) response. 
        For clarity and tracability purpose, provide the original duration attribute names and raw values that are extracted from the response payload.
        For all response messages include units (e.g., °C for temperature, km/h for wind speed, etc.) for the tool and the AI the response messages."""
    
    # Create a ReAct agent
    agent = create_react_agent(
        model=chat_model,
        tools=tools,
        prompt=prompt
    )
    
    return agent


def process_agent_response(chunks: List[Dict[str, Any]], verbose: bool = True) -> str:
    """Process agent response chunks and extract final response.
    
    Args:
        chunks (List[Dict[str, Any]]): List of response chunks from agent stream
        verbose (bool): Whether to print processing steps
        
    Returns:
        str: Final response content or error message
    """
    if verbose:
        print("Agent reasoning steps:")
        print("-" * 50)
        for chunk in chunks:
            print(chunk)
    
    print("\n" + "=" * 50)
    print("FINAL RESPONSE:")
    print("=" * 50)
    
    if chunks:
        # Get the last chunk that contains an 'agent' key
        final_agent_chunk = None
        for chunk in reversed(chunks):
            if 'agent' in chunk:
                final_agent_chunk = chunk
                break
        
        if final_agent_chunk and 'messages' in final_agent_chunk['agent']:
            final_message = final_agent_chunk['agent']['messages'][-1]
            if hasattr(final_message, 'content'):
                final_content = final_message.content
                print(final_content)
                return final_content
            else:
                error_msg = "No content found in final message"
                print(error_msg)
                return error_msg
        else:
            error_msg = "No final agent response found"
            print(error_msg)
            return error_msg
    else:
        error_msg = "No chunks received"
        print(error_msg)
        return error_msg


def run_agent_query(agent, query: str, verbose: bool = True) -> str:
    """Run a query through the agent and return the response.
    
    Args:
        agent: The configured agent
        query (str): Query to send to the agent
        verbose (bool): Whether to print processing steps
        
    Returns:
        str: Final response from the agent
    """
    inputs = {"messages": [{"role": "user", "content": query}]}
    
    # Collect all chunks to get final response
    chunks = []
    for chunk in agent.stream(inputs, stream_mode="updates"):
        chunks.append(chunk)
    
    return process_agent_response(chunks, verbose=verbose)
