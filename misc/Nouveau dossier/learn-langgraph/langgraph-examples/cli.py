#!/usr/bin/env python3
"""
Command-line interface for the weather agent.
This script provides a unified interface to run weather queries using the new agent structure.
"""

import argparse
import sys
from agents import WeatherAgent
from config import Settings
from utils import run_weather_query, run_interactive_session


def main():
    """Main CLI function."""
    parser = argparse.ArgumentParser(
        description='Weather Agent CLI - Get weather information using LangGraph agents'
    )
    
    # Add subcommands
    subparsers = parser.add_subparsers(dest='command', help='Available commands')
    
    # Query command
    query_parser = subparsers.add_parser('query', help='Run a single weather query')
    query_parser.add_argument('query', nargs='+', help='Weather query (e.g., "weather in London")')
    query_parser.add_argument('-v', '--verbose', action='store_true', help='Show detailed output')
    query_parser.add_argument('-m', '--model', help='Override model name')
    query_parser.add_argument('-u', '--url', help='Override base URL')
    
    # Interactive command
    interactive_parser = subparsers.add_parser('interactive', help='Start interactive session')
    
    # Test command
    test_parser = subparsers.add_parser('test', help='Run a test query')
    test_parser.add_argument('-v', '--verbose', action='store_true', help='Show detailed output')
    
    # Agent command (new - direct agent usage)
    agent_parser = subparsers.add_parser('agent', help='Use agent methods directly')
    agent_parser.add_argument('action', choices=['city', 'compare', 'forecast'], 
                            help='Agent action to perform')
    agent_parser.add_argument('location', nargs='+', help='Location(s) for the action')
    agent_parser.add_argument('-v', '--verbose', action='store_true', help='Show detailed output')
    
    # Demo command
    demo_parser = subparsers.add_parser('demo', help='Run agent demonstration')
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        return
    
    try:
        if args.command == 'query':
            query = ' '.join(args.query)
            response = run_weather_query(
                query, 
                verbose=args.verbose,
                model_name=args.model,
                base_url=args.url
            )
            print(f"\n✅ Query completed. Response length: {len(response)} characters")
            
        elif args.command == 'interactive':
            run_interactive_session()
            
        elif args.command == 'test':
            test_query = "what is the weather in San Francisco"
            response = run_weather_query(test_query, verbose=args.verbose)
            print(f"\n✅ Test completed. Response length: {len(response)} characters")
            
        elif args.command == 'agent':
            # Direct agent usage
            settings = Settings()
            agent = WeatherAgent(
                model_name=settings.ollama_model,
                base_url=settings.ollama_host
            )
            
            if args.action == 'city':
                city = ' '.join(args.location)
                response = agent.get_weather_for_city(city, verbose=args.verbose)
                print(f"\n✅ Weather for {city} retrieved. Response length: {len(response)} characters")
                
            elif args.action == 'compare':
                cities = args.location
                response = agent.get_weather_comparison(cities, verbose=args.verbose)
                print(f"\n✅ Weather comparison completed. Response length: {len(response)} characters")
                
            elif args.action == 'forecast':
                city = ' '.join(args.location)
                response = agent.get_weather_forecast(city, verbose=args.verbose)
                print(f"\n✅ Weather forecast for {city} retrieved. Response length: {len(response)} characters")
                
        elif args.command == 'demo':
            # Import and run demo
            from demo_agents import main as demo_main
            demo_main()
            
    except KeyboardInterrupt:
        print("\n\n👋 Goodbye!")
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
