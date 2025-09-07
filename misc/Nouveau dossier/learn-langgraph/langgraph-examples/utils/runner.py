"""Common runner utilities for weather agent scripts."""

from typing import Optional
from config import Settings
from agents import WeatherAgent


def create_default_agent(model_name: Optional[str] = None, 
                        base_url: Optional[str] = None,
                        prompt: Optional[str] = None) -> WeatherAgent:
    """Create a default weather agent with fallback to configuration settings.
    
    Args:
        model_name: Optional model name override
        base_url: Optional base URL override  
        prompt: Optional prompt override
        
    Returns:
        Configured weather agent
    """
    settings = Settings()
    settings.display_config()
    
    return WeatherAgent(
        model_name=model_name or settings.ollama_model,
        base_url=base_url or settings.ollama_host,
        prompt=prompt or None  # Let agent use its default prompt
    )


def run_weather_query(query: str, verbose: bool = True, 
                     model_name: Optional[str] = None,
                     base_url: Optional[str] = None,
                     prompt: Optional[str] = None) -> str:
    """Run a weather query with a default agent configuration.
    
    Args:
        query: The weather query to run
        verbose: Whether to show detailed output
        model_name: Optional model name override
        base_url: Optional base URL override
        prompt: Optional prompt override
        
    Returns:
        Agent response string
    """
    agent = create_default_agent(model_name, base_url, prompt)
    return agent.run_query(query, verbose=verbose)


def run_interactive_session():
    """Run an interactive weather query session."""
    agent = create_default_agent()
    
    print("\n" + "=" * 60)
    print("🌤️  Interactive Weather Agent")
    print("=" * 60)
    print("Ask me about the weather in any city!")
    print("Type 'quit', 'exit', or 'q' to stop.")
    print("-" * 60)
    
    while True:
        try:
            user_input = input("\n🌍 Enter your weather query: ").strip()
            
            if user_input.lower() in ['quit', 'exit', 'q']:
                print("👋 Goodbye!")
                break
            
            if not user_input:
                print("Please enter a valid query.")
                continue
            
            # Run the agent query
            response = agent.run_query(user_input, verbose=False)
            
        except KeyboardInterrupt:
            print("\n\n👋 Goodbye!")
            break
        except Exception as e:
            print(f"❌ An error occurred: {e}")
            print("Please try again.")
