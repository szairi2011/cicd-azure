#!/usr/bin/env python3
# step-01-setup_ollama.py
# Setting up the Ollama integration for the multi-agent system

import os
import sys
from dotenv import load_dotenv
from urllib.parse import urlparse
from langchain_ollama import ChatOllama
from langsmith import utils

def ensure_url_has_protocol(url):
    """Ensure URL has http:// or https:// protocol"""
    if not url:
        return "http://localhost:11434"
    parsed = urlparse(url)
    if not parsed.scheme:
        return f"http://{url}"
    return url

def setup_ollama_client():
    """Setup and validate Ollama client connection."""
    load_dotenv()  # Load environment variables from .env file
    host = os.getenv('OLLAMA_HOST', 'localhost:11434')
    host = ensure_url_has_protocol(host)
    
    try:
        from ollama import Client
        print(f"Connecting to Ollama at: {host}")
        client = Client(host=host)
        
        # Get model list from Ollama
        response = client.list()
        models = response.get('models', [])
        
        # Handle both object-style models (newer Ollama clients) and dictionary-style models
        print("\nAvailable models:")
        if models and hasattr(models[0], 'model'):
            # Object-style model format (newer Ollama clients)
            for model in models:
                model_name = getattr(model, 'model', 'unknown')
                model_size = getattr(model, 'size', 0)
                
                # Extract additional details if available
                details = getattr(model, 'details', None)
                if details:
                    param_size = getattr(details, 'parameter_size', 'unknown')
                    quant_level = getattr(details, 'quantization_level', 'unknown')
                    family = getattr(details, 'family', 'unknown')
                    print(f"- {model_name} ({param_size}, {quant_level}, {family}, {model_size} bytes)")
                else:
                    print(f"- {model_name} ({model_size} bytes)")
        else:
            # Dictionary-style model format (older Ollama clients)
            for model in models:
                if isinstance(model, dict):
                    print(f"- {model.get('name', 'unknown')} ({model.get('size', 0)} bytes)")
                else:
                    print(f"- {model}")
                    
        return client
    except Exception as e:
        print(f"Failed to connect to Ollama at {host}: {str(e)}")
        print("Make sure Ollama is running and the URL is correct.")
        sys.exit(1)

# Set a default for OLLAMA_HOST if not already set
if 'OLLAMA_HOST' not in os.environ:
    os.environ['OLLAMA_HOST'] = 'http://localhost:11434'

def main():
    # Check if tracing is enabled
    print(f"Langsmith tracing is enabled: {utils.tracing_is_enabled()}")
    print(f"The Langsmith tracing project is: {utils.get_tracer_project()}")


    """Main function to setup Ollama and test the LLM."""
    # Initialize Ollama client
    ollama_client = setup_ollama_client()

    # Initialize the ChatOllama model
    # You can change the model name to any model you have in Ollama
    llm = ChatOllama(
        model="llama3.2",  # Change this to a model you have in Ollama
        base_url=os.environ['OLLAMA_HOST'],
        temperature=0
    )

    # Test the LLM with a simple query
    # response = llm.invoke("Hello! Can you help me with some music recommendations?")
    response = llm.invoke("What is th capital of France?")
    print("\nLLM Test Response:")
    print(response.content)

# Test the LLM with a simple query
if __name__ == "__main__":
    main()
