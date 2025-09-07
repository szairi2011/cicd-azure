"""Weather tool for getting real-time weather data using wttr.in service."""

import requests


def get_weather(city: str) -> str:
    """Get real weather data for a given city using wttr.in service.
    
    Args:
        city (str): The name of the city to get weather for
        
    Returns:
        str: Formatted weather information or error message
    """
    try:
        # Use wttr.in service - no API key required
        weather_url = f"https://wttr.in/{city}?format=j1"
        
        weather_response = requests.get(weather_url)
        weather_response.raise_for_status()
        weather_data = weather_response.json()
        
        # Extract current weather information
        current = weather_data['current_condition'][0]
        nearest_area = weather_data['nearest_area'][0]
        
        city_name = nearest_area['areaName'][0]['value']
        country = nearest_area['country'][0]['value']
        region = nearest_area['region'][0]['value']
        
        temp_c = current['temp_C']
        feels_like_c = current['FeelsLikeC']
        humidity = current['humidity']
        pressure = current['pressure']
        uv_index = current['uvIndex']
        visibility = current['visibility']
        wind_speed_kmh = current['windspeedKmph']
        wind_dir = current['winddir16Point']
        description = current['weatherDesc'][0]['value']
        
        weather_info = f"""Current weather in {city_name}, {region}, {country}:
🌡️ Temperature: {temp_c}°C (feels like {feels_like_c}°C)
☁️ Conditions: {description}
💧 Humidity: {humidity}%
🌪️ Wind: {wind_speed_kmh} km/h {wind_dir}
📊 Pressure: {pressure} hPa
👁️ Visibility: {visibility} km
☀️ UV Index: {uv_index}"""
        
        return weather_info
        
    except requests.exceptions.RequestException as e:
        return f"Error fetching weather data: {str(e)}"
    except KeyError as e:
        return f"Error parsing weather data: {str(e)}. Please check the API response format."
    except Exception as e:
        return f"Unexpected error: {str(e)}"
