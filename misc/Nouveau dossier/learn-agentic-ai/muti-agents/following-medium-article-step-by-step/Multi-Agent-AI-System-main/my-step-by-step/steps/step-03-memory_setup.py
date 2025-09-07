#!/usr/bin/env python3
# step-03-memory_setup.py
# Setting up short-term and long-term memory for the multi-agent system

from langgraph.checkpoint.memory import MemorySaver
from langgraph.store.memory import InMemoryStore

def setup_memory():
    """Initialize memory systems for the multi-agent system."""
    # Initializing `InMemoryStore` for long-term memory. 
    # This store will hold user-specific data like music preferences across sessions.
    in_memory_store = InMemoryStore()
    print("Long-term memory (InMemoryStore) initialized.")

    # Initializing `MemorySaver` for short-term (thread-level) memory. 
    # This checkpointer saves the graph's state after each step, allowing for restarts or interruptions within a thread.
    checkpointer = MemorySaver()
    print("Short-term memory (MemorySaver) initialized.")
    
    return in_memory_store, checkpointer

# Initialize the memory components
in_memory_store, checkpointer = setup_memory()

def test_long_term_memory(store):
    """Test the long-term memory functionality using InMemoryStore."""
    print("\n=== Testing Long-term Memory (InMemoryStore) ===")
    # Test storing and retrieving data from the in_memory_store
    test_namespace = ("test", "user1")
    test_key = "preferences"
    test_data = {"music_preferences": ["rock", "jazz", "pop"], "favorite_artist": "Mickael Jackson"}
    
    # Store test data
    store.put(test_namespace, test_key, test_data)
    print("Stored test data in long-term memory.")
    
    # Retrieve test data
    retrieved_data = store.get(test_namespace, test_key)
    print(f"Retrieved data from long-term memory: {retrieved_data.value}")
    
    # Clean up test data
    store.delete(test_namespace, test_key)
    print("Cleaned up long-term memory test data.")

def test_short_term_memory(checkpointer):
    """Test the short-term memory functionality using MemorySaver."""
    print("\n=== Testing Short-term Memory (Checkpointer) ===")
    # Example conversation thread state
    conversation_state = {
        "thread_id": "conv123",
        "current_step": 1,
        "context": "Discussing music preferences",
        "last_response": "What kind of music do you like?"
    }

    # Save the current state using the checkpointer
    thread_key = "conversation_thread_123"
    metadata = {"version": 1}
    new_versions = {"state": conversation_state}
    checkpointer.put(thread_key, metadata, new_versions)
    print(f"Saved conversation state to short-term memory: {conversation_state}")

    # Simulate some progress in the conversation
    conversation_state["current_step"] = 2
    conversation_state["last_response"] = "I see you like rock music!"
    metadata = {"version": 2}
    new_versions = {"state": conversation_state}
    checkpointer.put(thread_key, metadata, new_versions)
    print(f"Updated conversation state in short-term memory: {conversation_state}")

    # Retrieve the latest state
    retrieved = checkpointer.get(thread_key)
    retrieved_state = retrieved.get("state") if retrieved else None
    print(f"Retrieved conversation state from short-term memory: {retrieved_state}")

    # Clear the conversation state
    checkpointer.delete(thread_key)
    print("Cleared conversation state from short-term memory.")

    # Try to retrieve after clearing (should return None)
    cleared = checkpointer.get(thread_key)
    cleared_state = cleared.get("state") if cleared else None
    print(f"Attempting to retrieve cleared state (should be None): {cleared_state}")

if __name__ == "__main__":
    # Test long-term memory functionality
    test_long_term_memory(in_memory_store)
    
    # Test short-term memory functionality
    test_short_term_memory(checkpointer)
