"""Test script for the weather agent modules."""

import sys
import os

# Add the parent directory to Python path so we can import our modules
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from tools import get_weather
from config import Settings
from agents import WeatherAgent, BaseAgent
from utils import run_weather_query


def test_weather_tool():
    """Test the weather tool directly."""
    print("Testing weather tool...")
    result = get_weather("London")
    print(f"Weather result: {result[:100]}...")
    return "Error" not in result


def test_configuration():
    """Test the configuration module."""
    print("Testing configuration...")
    settings = Settings()
    config = settings.config_dict
    print(f"Config keys: {list(config.keys())}")
    return all(key in config for key in ['ollama_host', 'ollama_model'])


def test_weather_agent():
    """Test the weather agent directly."""
    print("Testing weather agent...")
    try:
        settings = Settings()
        agent = WeatherAgent(
            model_name=settings.ollama_model,
            base_url=settings.ollama_host
        )
        print("Weather agent created successfully!")
        
        # Test agent inheritance
        print(f"Agent is instance of BaseAgent: {isinstance(agent, BaseAgent)}")
        print(f"Agent tools: {[tool.__name__ for tool in agent.get_tools()]}")
        
        return True
    except Exception as e:
        print(f"Error creating weather agent: {e}")
        return False


def test_runner_utilities():
    """Test the runner utilities."""
    print("Testing runner utilities...")
    try:
        # Test with a simple query
        response = run_weather_query("what is the weather in Tokyo", verbose=False)
        print(f"Runner response length: {len(response)} characters")
        return len(response) > 0 and "Error" not in response
    except Exception as e:
        print(f"Error testing runner: {e}")
        return False


def test_agent_methods():
    """Test specific agent methods."""
    print("Testing agent methods...")
    try:
        settings = Settings()
        agent = WeatherAgent(
            model_name=settings.ollama_model,
            base_url=settings.ollama_host
        )
        
        # Test convenience methods (without actually calling them to avoid long execution)
        print("Available methods:")
        print(f"- get_weather_for_city: {hasattr(agent, 'get_weather_for_city')}")
        print(f"- get_weather_comparison: {hasattr(agent, 'get_weather_comparison')}")
        print(f"- get_weather_forecast: {hasattr(agent, 'get_weather_forecast')}")
        print(f"- run_query: {hasattr(agent, 'run_query')}")
        
        return True
    except Exception as e:
        print(f"Error testing agent methods: {e}")
        return False


def run_tests():
    """Run all tests."""
    print("=" * 50)
    print("Running Module Tests")
    print("=" * 50)
    
    tests = [
        ("Weather Tool", test_weather_tool),
        ("Configuration", test_configuration),
        ("Weather Agent", test_weather_agent),
        ("Runner Utilities", test_runner_utilities),
        ("Agent Methods", test_agent_methods)
    ]
    
    results = []
    for test_name, test_func in tests:
        print(f"\n--- {test_name} ---")
        try:
            result = test_func()
            results.append((test_name, result))
            print(f"✅ {test_name}: {'PASSED' if result else 'FAILED'}")
        except Exception as e:
            print(f"❌ {test_name}: FAILED - {e}")
            results.append((test_name, False))
    
    print("\n" + "=" * 50)
    print("Test Results Summary")
    print("=" * 50)
    for test_name, result in results:
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name}: {status}")


if __name__ == "__main__":
    run_tests()
