"""Configuration settings for the LangGraph weather agent."""

import os
from dotenv import load_dotenv


class Settings:
    """Configuration settings for the weather agent."""
    
    def __init__(self):
        """Initialize settings by loading environment variables."""
        load_dotenv()
        
        # Ollama configuration
        self.ollama_host = os.getenv('OLLAMA_HOST', 'http://localhost:11434')
        self.ollama_model = os.getenv('OLLAMA_MODEL', 'llama3.2')
        
        # Agent configuration
        self.default_prompt = """
        You are a helpful assistant that will display the weather in a given city. 
        In the response to the user prompt, you will both provide the raw data from the weather API as well as the AI analysed response.
        Both responses will be part of two separate messages keys in the response. 
        When providing the final response, extract the response durations for each one, i.e. the tool(s) response message and the analysed AI response message, and convert them from milliseconds to seconds to be human readable.
        The idea is to help understand the latency of the model and the tool(s) response. 
        For clarity and tracability purpose, provide the original duration attribute names and raw values that are extracted from the response payload.
        For all response messages include units (e.g., °C for temperature, km/h for wind speed, etc.) for the tool and the AI the response messages."""
    
    def display_config(self):
        """Display current configuration."""
        print(f"Using Ollama host: {self.ollama_host}")
        print(f"Using Ollama model: {self.ollama_model}")
        
    @property
    def config_dict(self):
        """Return configuration as dictionary."""
        return {
            'ollama_host': self.ollama_host,
            'ollama_model': self.ollama_model,
            'default_prompt': self.default_prompt
        }
