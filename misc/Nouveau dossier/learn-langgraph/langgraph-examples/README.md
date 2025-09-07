# Weather Agent - Modular LangGraph Implementation

A modular, extensible framework for building AI agents using LangGraph, showcasing clean architecture and code reuse principles with a weather agent implementation.

## 📋 Table of Contents

- [Architecture](#architecture)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage Modes](#usage-modes)
- [Project Structure](#project-structure)
- [Agent System](#agent-system)
- [Customization](#customization)
- [API Reference](#api-reference)
- [Contributing](#contributing)

## 🏗️ Architecture <a name="architecture"></a>

The project primarily follows a modular design pattern with clear separation of concerns. However, for educational purposes, it also includes a single-file non-modular implementation (`simple-agent-ollama.py`) that consolidates the core functionality in one script.

### Core Modules

- **`agents/`** - Agent implementations using inheritance hierarchy
  - `base_agent.py` - Abstract base agent with common functionality
  - `weather_agent.py` - Weather-specific agent implementation
  - `news_agent.py` - Example for future extension
  
- **`tools/`** - Domain-specific tool implementations
  - `weather_tool.py` - wttr.in integration (no API key required)
  
- **`config/`** - Configuration management
  - `settings.py` - Environment settings and defaults
  
- **`utils/`** - Utility functions and helper modules
  - `agent_utils.py` - Agent creation and response processing
  - `runner.py` - High-level runner utilities for common tasks

### Scripts

- **`cli.py`** - Command-line interface with multiple modes
- **`simple-test.py`** - Basic weather query demonstration
- **`weather_agent.py`** - Advanced weather agent with custom configurations
- **`interactive_weather_agent.py`** - Interactive chat mode
- **`demo_agents.py`** - Comprehensive demonstration of agent capabilities
- **`test_modules.py`** - Module validation and testing
- **`simple-agent-ollama.py`** - Single-file implementation with all components in one script (non-modular design for readability)

## � Installation <a name="installation"></a>

### Prerequisites

- Python 3.8+ installed
- [Ollama](https://ollama.ai/) running locally or on a remote server
- Git (for cloning the repository)

### Setup Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/langgraph-examples.git
   cd langgraph-examples
   ```

2. Install dependencies using Pipenv:
   ```bash
   pip install pipenv
   pipenv install
   pipenv shell
   ```

3. Create a `.env` file with your settings:
   ```env
   OLLAMA_HOST=http://localhost:11434
   OLLAMA_MODEL=llama3.2
   ```

## 🚀 Quick Start <a name="quick-start"></a>

### Basic Weather Query

```bash
python simple-test.py
```

### Interactive Mode

```bash
python interactive_weather_agent.py
```

### Command Line Interface

```bash
# Run a query
python cli.py query "what is the weather in London"

# Start interactive session
python cli.py interactive

# Run a demo
python cli.py demo

# Use agent directly
python cli.py agent city Tokyo
python cli.py agent compare "New York" London Paris
```

## 🔄 Usage Modes <a name="usage-modes"></a>

### 1. Single-File Implementation (simple-agent-ollama.py)

For those who want to understand the core functionality without navigating the modular architecture, the project includes a self-contained single-file implementation:

```bash
python simple-agent-ollama.py
```

This script contains all the essential components in one file, making it easier to follow the execution flow and understand how the different parts connect. It is primarily designed for educational purposes and is not part of the modular architecture approach. Key features include:

- Complete weather agent implementation in a single file
- Performance timing for each execution phase
- Direct integration with the tools package for weather data
- Simple interface focused on demonstrating core functionality
- Visual progress indicators during execution

While this script is useful for learning, the modular implementations are recommended for production use and extension.

### 3. Command-Line Interface

The CLI provides the most versatile interface with several modes:

```bash
# Basic query mode
python cli.py query "weather in San Francisco"

# Interactive chat mode
python cli.py interactive

# Direct agent usage
python cli.py agent city Berlin
python cli.py agent compare London Paris Rome
python cli.py agent forecast Tokyo

# Comprehensive demonstration
python cli.py demo
```

### 2. Standalone Scripts

Each script focuses on a specific use case:

```bash
# Simple query (minimal example)
python simple-test.py

# Advanced features demonstration
python weather_agent.py

# Interactive chat session
python interactive_weather_agent.py

# Agent system demonstration
python demo_agents.py

# Testing and validation
python test_modules.py

# Non-modular single-file implementation (for learning purposes)
python simple-agent-ollama.py
```

### 4. Python API Usage

#### Simple API (Function-Based)

```python
from utils import run_weather_query

# Basic query
response = run_weather_query("weather in Tokyo")

# With custom settings
response = run_weather_query(
    "weather in Berlin", 
    verbose=True,
    model_name="llama3.2",
    base_url="http://localhost:11434"
)
```

#### Agent API (Object-Oriented)

```python
from agents import WeatherAgent
from config import Settings

# Get configuration
settings = Settings()

# Create agent instance
agent = WeatherAgent(
    model_name=settings.ollama_model,
    base_url=settings.ollama_host
)

# Use specialized methods
weather_nyc = agent.get_weather_for_city("New York")
comparison = agent.get_weather_comparison(["London", "Paris", "Rome"])
forecast = agent.get_weather_forecast("Tokyo")

# Direct query
custom_query = agent.run_query("Is it a good day for hiking in Switzerland?")
```

## 📁 Project Structure <a name="project-structure"></a>

```
langgraph-examples/
├── agents/
│   ├── __init__.py
│   ├── base_agent.py         # Abstract base agent
│   ├── weather_agent.py      # Weather agent implementation
│   └── news_agent.py         # Example future agent
├── tools/
│   ├── __init__.py
│   └── weather_tool.py       # Weather data fetching
├── config/
│   ├── __init__.py
│   └── settings.py           # Configuration management
├── utils/
│   ├── __init__.py
│   ├── agent_utils.py        # Core agent utilities
│   └── runner.py             # High-level runner functions
├── cli.py                    # Command-line interface
├── simple-test.py            # Basic demonstration
├── weather_agent.py          # Advanced agent script
├── interactive_weather_agent.py # Interactive mode
├── demo_agents.py            # Agent capabilities showcase
├── test_modules.py           # Module tests
├── AGENT_ARCHITECTURE.md     # Architecture documentation
├── .env                      # Environment variables
├── Pipfile                   # Dependencies
└── README.md                 # This file
```

## 🤖 Agent System <a name="agent-system"></a>

### Agent Hierarchy

The project implements an extensible agent architecture:

```
BaseAgent (Abstract)
├── WeatherAgent
├── NewsAgent (placeholder)
└── Future agents (FinanceAgent, TranslationAgent, etc.)
```

### Core Features

1. **Inheritance-Based Design**
   - Common functionality in base class
   - Specialized behavior in subclasses
   - Consistent interfaces across agents

2. **Agent Capabilities**
   - Tool integration through `get_tools()` method
   - Custom prompts through `get_default_prompt()`
   - Specialized domain methods for convenience

3. **Unified Response Processing**
   - Consistent response formatting
   - Error handling
   - Stream processing support

### Creating a New Agent

To add a new agent type:

1. Create a new class inheriting from `BaseAgent`
2. Implement required abstract methods
3. Add specialized methods as needed
4. Update `agents/__init__.py`

Example:

```python
from agents import BaseAgent

class FinanceAgent(BaseAgent):
    def get_tools(self):
        from tools import get_stock_price, get_market_data
        return [get_stock_price, get_market_data]
    
    def get_default_prompt(self):
        return "You are a financial assistant..."
    
    def get_stock_quote(self, ticker):
        return self.run_query(f"What is the current price of {ticker}?")
```

## ⚙️ Customization <a name="customization"></a>

### Configuration Options

The system can be configured through:

1. **Environment Variables** (`.env` file)
   ```env
   OLLAMA_HOST=http://localhost:11434
   OLLAMA_MODEL=llama3.2
   ```

2. **Direct Parameter Overrides**
   ```python
   agent = WeatherAgent(
       model_name="custom-model",
       base_url="http://other-server:11434",
       prompt="Custom prompt for specialized behavior"
   )
   ```

3. **Settings Object**
   ```python
   from config import Settings
   
   settings = Settings()
   settings.ollama_model = "custom-model"
   
   agent = WeatherAgent(
       model_name=settings.ollama_model,
       base_url=settings.ollama_host
   )
   ```

### Custom Weather Tools

To replace the weather data source:

1. Create a new tool in `tools/` with the same signature
2. Update imports in `agents/weather_agent.py`

Example:
```python
# tools/custom_weather.py
def get_weather(city: str) -> str:
    # Custom implementation
    return f"Weather data for {city} from custom source"

# In agents/weather_agent.py
from tools import custom_weather
```

## 📚 API Reference <a name="api-reference"></a>

### Module: `agents`

#### `BaseAgent` (Abstract Class)

Base class for all agents with common functionality.

- **Constructor**: `BaseAgent(model_name, base_url, prompt)`
- **Methods**:
  - `run_query(query, verbose)`: Execute a query with the agent
  - `get_tools()`: Abstract method to get agent tools
  - `get_default_prompt()`: Abstract method for default prompt

#### `WeatherAgent` (Class)

Specialized agent for weather queries.

- **Constructor**: `WeatherAgent(model_name, base_url, prompt)`
- **Methods**:
  - `get_weather_for_city(city, verbose)`: Get weather for a specific city
  - `get_weather_comparison(cities, verbose)`: Compare weather in multiple cities
  - `get_weather_forecast(city, verbose)`: Get weather forecast for a city

### Module: `utils.runner`

- `create_default_agent(model_name, base_url, prompt)`: Create a default weather agent
- `run_weather_query(query, verbose, model_name, base_url, prompt)`: Run a weather query
- `run_interactive_session()`: Start an interactive weather query session

### Module: `tools`

- `get_weather(city)`: Fetch weather data for a city using wttr.in

### Module: `config`

- `Settings`: Configuration class for loading and managing settings

## 🤝 Contributing <a name="contributing"></a>

### How to Contribute

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

### Development Workflow

1. Set up the development environment:
   ```bash
   pipenv install --dev
   ```

2. Run tests to ensure everything is working:
   ```bash
   python test_modules.py
   ```

3. Implement your changes and test thoroughly

4. Submit a pull request with a clear description of the changes

## 📄 License

This project is open source and available under the MIT License.
