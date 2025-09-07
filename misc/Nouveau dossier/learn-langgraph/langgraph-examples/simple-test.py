"""
Simple weather agent test script.
This script demonstrates basic weather query functionality.
"""

from utils import run_weather_query

def main():
    """Main function to run a simple weather query."""
    # Run a simple weather query
    query = "what is the weather in London and Paris?"
    response = run_weather_query(query, verbose=True)
    
    print(f"\n✅ Query completed. Response length: {len(response)} characters")

if __name__ == "__main__":
    main()

