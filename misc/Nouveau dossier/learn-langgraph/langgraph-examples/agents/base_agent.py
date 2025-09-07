"""Base agent class for all LangGraph agents."""

from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional
from langchain_ollama import ChatOllama
from langgraph.prebuilt import create_react_agent


class BaseAgent(ABC):
    """Base class for all LangGraph agents."""
    
    def __init__(self, 
                 model_name: str = "llama3.2",
                 base_url: str = "http://localhost:11434",
                 prompt: Optional[str] = None):
        """Initialize the base agent.
        
        Args:
            model_name: Name of the Ollama model to use
            base_url: Base URL for the Ollama service
            prompt: Custom prompt for the agent
        """
        self.model_name = model_name
        self.base_url = base_url
        self.prompt = prompt or self.get_default_prompt()
        self.chat_model = self._create_chat_model()
        self.agent = self._create_agent()
    
    def _create_chat_model(self) -> ChatOllama:
        """Create the chat model."""
        return ChatOllama(
            model=self.model_name,
            base_url=self.base_url
        )
    
    def _create_agent(self):
        """Create the LangGraph agent."""
        return create_react_agent(
            model=self.chat_model,
            tools=self.get_tools(),
            prompt=self.prompt
        )
    
    @abstractmethod
    def get_tools(self) -> List[Any]:
        """Get the tools for this agent.
        
        Returns:
            List of tools for the agent
        """
        pass
    
    @abstractmethod
    def get_default_prompt(self) -> str:
        """Get the default prompt for this agent.
        
        Returns:
            Default prompt string
        """
        pass
    
    def run_query(self, query: str, verbose: bool = True) -> str:
        """Run a query through the agent.
        
        Args:
            query: Query to send to the agent
            verbose: Whether to print processing steps
            
        Returns:
            Agent response
        """
        inputs = {"messages": [{"role": "user", "content": query}]}
        
        # Collect all chunks to get final response
        chunks = []
        for chunk in self.agent.stream(inputs, stream_mode="updates"):
            chunks.append(chunk)
        
        return self._process_response(chunks, verbose=verbose)
    
    def _process_response(self, chunks: List[Dict[str, Any]], verbose: bool = True) -> str:
        """Process agent response chunks and extract final response.
        
        Args:
            chunks: List of response chunks from agent stream
            verbose: Whether to print processing steps
            
        Returns:
            Final response content or error message
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
