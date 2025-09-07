"""
Main weather agent script using modular components.
This script demonstrates advanced weather query functionality with custom configurations.
"""

from agents import WeatherAgent
from config import Settings

def main():
    """Main function to run the weather agent with custom settings."""
    # Initialize configuration
    settings = Settings()
    settings.display_config()
    
    # Create weather agent directly
    agent = WeatherAgent(
        model_name=settings.ollama_model,
        base_url=settings.ollama_host
    )
    
    # Example queries showing different capabilities
    print("=== Weather Agent Demonstration ===")
    
    # Basic weather query
    print("\n1. Basic Weather Query:")
    response1 = agent.get_weather_for_city("New York", verbose=False)
    print(f"Response length: {len(response1)} characters")
    
    # Weather comparison
    print("\n2. Weather Comparison:")
    response2 = agent.get_weather_comparison(["London", "Paris", "Tokyo"], verbose=False)
    print(f"Response length: {len(response2)} characters")
    
    # Custom query
    print("\n3. Custom Weather Query:")
    response3 = agent.run_query("What's the weather like in San Francisco and should I bring an umbrella?", verbose=False)
    print(f"Response length: {len(response3)} characters")
    
    return response3

if __name__ == "__main__":
    main()
