"""
Example script showing how to use different agent types and extensibility.
"""

from agents import WeatherAgent, NewsAgent
from config import Settings


def demonstrate_weather_agent():
    """Demonstrate weather agent capabilities."""
    print("=" * 60)
    print("🌤️  Weather Agent Demonstration")
    print("=" * 60)
    
    settings = Settings()
    agent = WeatherAgent(
        model_name=settings.ollama_model,
        base_url=settings.ollama_host
    )
    
    print("\n1. Basic city weather:")
    response = agent.get_weather_for_city("London", verbose=False)
    print(f"✅ Retrieved weather for London ({len(response)} chars)")
    
    print("\n2. Weather comparison:")
    response = agent.get_weather_comparison(["Tokyo", "Sydney"], verbose=False)
    print(f"✅ Compared weather for multiple cities ({len(response)} chars)")
    
    print("\n3. Custom weather query:")
    response = agent.run_query("Is it a good day for a picnic in Paris?", verbose=False)
    print(f"✅ Answered custom weather question ({len(response)} chars)")


def demonstrate_extensibility():
    """Demonstrate how easy it is to add new agent types."""
    print("\n" + "=" * 60)
    print("🔮 Agent Extensibility Demonstration")
    print("=" * 60)
    
    # Show how news agent would work (placeholder)
    print("\n1. News Agent (placeholder implementation):")
    news_agent = NewsAgent()
    response = news_agent.get_headlines("technology")
    print(f"📰 News response: {response}")
    
    print("\n2. Future agent types could include:")
    print("   - FinanceAgent (stock prices, market data)")
    print("   - TranslationAgent (multi-language translation)")
    print("   - ResearchAgent (academic paper search)")
    print("   - TravelAgent (flights, hotels, recommendations)")
    print("   - CookingAgent (recipes, nutrition info)")
    print("   - CodeAgent (programming help, code review)")


def demonstrate_agent_inheritance():
    """Demonstrate the base agent pattern."""
    print("\n" + "=" * 60)
    print("🏗️  Agent Inheritance Pattern")
    print("=" * 60)
    
    settings = Settings()
    weather_agent = WeatherAgent(
        model_name=settings.ollama_model,
        base_url=settings.ollama_host
    )
    
    print(f"Weather Agent:")
    print(f"  - Model: {weather_agent.model_name}")
    print(f"  - Base URL: {weather_agent.base_url}")
    print(f"  - Tools: {[tool.__name__ for tool in weather_agent.get_tools()]}")
    print(f"  - Methods: {[method for method in dir(weather_agent) if not method.startswith('_')]}")


def main():
    """Main function demonstrating all agent capabilities."""
    print("🚀 LangGraph Agent System - Complete Demonstration")
    
    try:
        demonstrate_weather_agent()
        demonstrate_extensibility()
        demonstrate_agent_inheritance()
        
        print("\n" + "=" * 60)
        print("✅ All demonstrations completed successfully!")
        print("=" * 60)
        
    except Exception as e:
        print(f"❌ Error during demonstration: {e}")


if __name__ == "__main__":
    main()
