"""Weather agent implementation."""

from typing import Any, List
from .base_agent import BaseAgent
from tools import get_weather


class WeatherAgent(BaseAgent):
    """Specialized agent for weather queries."""
    
    def get_tools(self) -> List[Any]:
        """Get weather-specific tools.
        
        Returns:
            List of weather tools
        """
        return [get_weather]
    
    def get_default_prompt(self) -> str:
        """Get the default weather agent prompt.
        
        Returns:
            Default weather prompt
        """
        return """
        You are a helpful weather assistant that provides accurate weather information for any location.
        
        When responding to weather queries:
        1. Always use the weather tool to get current, accurate data
        2. Present information in a clear, readable format
        3. Include relevant details like temperature, conditions, humidity, wind, etc.
        4. Use appropriate units (°C for temperature, km/h for wind speed, etc.)
        5. If the location is not found, suggest similar locations or ask for clarification
        
        Your responses should be helpful, accurate, and user-friendly.
        """
    
    def get_weather_for_city(self, city: str, verbose: bool = True) -> str:
        """Convenience method to get weather for a specific city.
        
        Args:
            city: Name of the city
            verbose: Whether to show detailed output
            
        Returns:
            Weather information for the city
        """
        query = f"What is the weather in {city}?"
        return self.run_query(query, verbose=verbose)
    
    def get_weather_comparison(self, cities: List[str], verbose: bool = True) -> str:
        """Get weather comparison for multiple cities.
        
        Args:
            cities: List of city names
            verbose: Whether to show detailed output
            
        Returns:
            Weather comparison for the cities
        """
        cities_str = ", ".join(cities)
        query = f"Compare the weather in {cities_str}"
        return self.run_query(query, verbose=verbose)
    
    def get_weather_forecast(self, city: str, verbose: bool = True) -> str:
        """Get weather forecast for a city.
        
        Args:
            city: Name of the city
            verbose: Whether to show detailed output
            
        Returns:
            Weather forecast information
        """
        query = f"What is the weather forecast for {city}?"
        return self.run_query(query, verbose=verbose)
