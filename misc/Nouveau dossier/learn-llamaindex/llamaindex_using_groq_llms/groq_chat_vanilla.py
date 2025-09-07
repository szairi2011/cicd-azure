import os
import requests

# Load the Groq API key from environment variables
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Function to start a chat with the model
def start_chat():
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    while True:
        user_input = input("You: ")
        if user_input.lower() in ["exit", "quit"]:
            print("Chat ended.")
            break

        data = {
            "prompt": user_input
        }

        response = requests.post("https://api.groq.com/v1/chat", json=data, headers=headers)
        if response.status_code == 200:
            print(f"Model: {response.json().get('response')}")
        else:
            print(f"Error: {response.status_code} - {response.text}")

if __name__ == "__main__":
    print("Starting chat with Groq model...")
    start_chat()
