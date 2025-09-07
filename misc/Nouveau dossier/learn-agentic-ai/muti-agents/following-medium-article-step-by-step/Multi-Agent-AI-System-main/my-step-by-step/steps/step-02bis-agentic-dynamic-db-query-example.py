#!/usr/bin/env python3
# step-03bis-agentic-dynamic-query-example.py
# Demonstrating dynamic SQL querying using natural language prompts

import os
from langchain_ollama import ChatOllama
from langchain_community.utilities.sql_database import SQLDatabase
from langchain_community.agent_toolkits.sql.toolkit import SQLDatabaseToolkit
from langgraph.prebuilt import create_react_agent
from dotenv import load_dotenv
from langchain import hub

def setup_environment():
    """Load environment variables and set up LangSmith tracing."""
    load_dotenv()
    os.environ["LANGSMITH_TRACING"] = "true"
    print("LangSmith tracing enabled.")

def setup_database():
    """Set up the SQLite database connection."""
    db_path = "sqlite:///step-02_chinook_sqlite.sql"
    db = SQLDatabase.from_uri(db_path)
    print(f"Connected to database at: {db_path}")
    return db

def setup_llm():
    """Set up the ChatOllama model."""
    base_url = os.getenv("OLLAMA_HOST", "http://localhost:11434")
    llm = ChatOllama(
        model="llama3.2",  # Change this to a model you have in Ollama
        base_url=base_url,
        temperature=0
    )
    print(f"ChatOllama model initialized with base URL: {base_url}")
    return llm

def create_agent(db, llm):
    """Create a question-answering agent using the SQLDatabaseToolkit."""
    # Pull the prompt template from LangChain hub
    prompt_template = hub.pull("langchain-ai/sql-agent-system-prompt")
    assert len(prompt_template.messages) == 1
    print("Prompt template input variables:", prompt_template.input_variables)

    # Format the system message with database dialect and top_k parameter
    system_message = prompt_template.format(dialect="SQLite", top_k=5)

    # Initialize the toolkit and agent executor
    toolkit = SQLDatabaseToolkit(db=db, llm=llm)
    agent_executor = create_react_agent(llm, toolkit.get_tools(), prompt=system_message)
    print("Agent created with SQLDatabaseToolkit and custom prompt.")
    return agent_executor

def run_example_query(agent_executor):
    """Run an example query using the agent."""
    # example_query = "Which country's customers spent the most?"
    example_query = "Which top 2 artists that sell best?"
    print(f"Running example query: {example_query}")
    events = agent_executor.stream({"messages": [("user", example_query)]}, stream_mode="values")
    for event in events:
        print(event["messages"][-1].pretty_print())

def main():
    """Main function to demonstrate dynamic SQL querying."""
    setup_environment()
    db = setup_database()
    llm = setup_llm()
    agent_executor = create_agent(db, llm)
    run_example_query(agent_executor)

if __name__ == "__main__":
    main()
