#!/usr/bin/env python3
# step-04-state_definition.py
# Defining the state schema for the multi-agent system

from typing_extensions import TypedDict
from typing import Annotated, List
from langgraph.graph.message import AnyMessage, add_messages
from langgraph.managed.is_last_step import RemainingSteps

class State(TypedDict):
    """Represents the state of our LangGraph agent."""
    # customer_id: Stores the unique identifier for the current customer.
    customer_id: str
    
    # messages: A list of messages that form the conversation history.
    # Annotated with `add_messages` to ensure new messages are appended rather than overwritten.
    messages: Annotated[list[AnyMessage], add_messages]
    
    # loaded_memory: Stores information loaded from the long-term memory store, 
    # typically user preferences or historical context.
    loaded_memory: str
    
    # remaining_steps: Used by LangGraph to track the number of allowed steps 
    # to prevent infinite loops in cyclic graphs.
    remaining_steps: RemainingSteps

if __name__ == "__main__":
    # Import necessary components for testing
    from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
    
    # Create a test state
    test_state = {
        "customer_id": "1",
        "messages": [
            HumanMessage(content="Hello, I'm looking for some music recommendations."),
            AIMessage(content="I'd be happy to help you find some music recommendations. What kind of music do you enjoy?")
        ],
        "loaded_memory": "Previous preferences: Rock music, The Beatles",
        "remaining_steps": RemainingSteps(max_steps=10)
    }
    
    # Print the test state
    print("Test state created:")
    print(f"Customer ID: {test_state['customer_id']}")
    print(f"Loaded Memory: {test_state['loaded_memory']}")
    print(f"Number of messages: {len(test_state['messages'])}")
    print(f"Remaining steps: {test_state['remaining_steps'].remaining_steps}")
    
    # Test message appending behavior
    test_state["messages"] = [HumanMessage(content="Can you recommend some Beatles albums?")]
    print("\nAfter adding a new message:")
    print(f"Number of messages: {len(test_state['messages'])}")
    print(f"Last message content: {test_state['messages'][-1].content}")
