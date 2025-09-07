#!/usr/bin/env python3
"""
Simple Weather Script using wttr.in
No API key required - completely free service
"""

import requests
import sys
from typing import Optional

def get_weather(location: str = "", format_type: str = "text") -> Optional[str]:
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

def main():
    """Main function to demonstrate weather service."""
    print("=== Simple Weather Service (wttr.in) ===\n")
    
    # Example 1: Get weather for current location (auto-detected)
    print("1. Weather for your current location:")
    weather = get_weather(format_type="short")
    if weather:
        print(weather.strip())
    else:
        print("Failed to get weather data")
    
    print("\n" + "="*50 + "\n")
    
    # Example 2: Get weather for a specific city
    city = "London"
    print(f"2. Weather for {city}:")
    weather = get_weather(city, format_type="short")
    if weather:
        print(weather.strip())
    else:
        print("Failed to get weather data")
    
    print("\n" + "="*50 + "\n")
    
    # Example 3: Get detailed weather information
    print("3. Detailed weather information:")
    weather = get_weather("Paris", format_type="text")
    if weather:
        # Display first 20 lines to avoid too much output
        lines = weather.split('\n')[:20]
        print('\n'.join(lines))
        if len(weather.split('\n')) > 20:
            print("... (truncated)")
    else:
        print("Failed to get weather data")
    
    print("\n" + "="*50 + "\n")
    
    # Interactive example
    try:
        user_city = input("Enter a city name (or press Enter to skip): ").strip()
        if user_city:
            print(f"\nWeather for {user_city}:")
            weather = get_weather(user_city, format_type="short")
            if weather:
                print(weather.strip())
            else:
                print("Failed to get weather data for the specified city")
    except KeyboardInterrupt:
        print("\nExiting...")
        sys.exit(0)

if __name__ == "__main__":
    main()
