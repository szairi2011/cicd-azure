import os
from langchain import Groq
from langchain.llms import GroqLLM

# Load the Groq API key from environment variables
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Initialize the Groq client
groq = Groq(api_key=GROQ_API_KEY)

# Initialize the Groq LLM
llm = GroqLLM(api_key=GROQ_API_KEY)

# Function to start a chat with the model
def start_chat():
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["exit", "quit"]:
            print("Chat ended.")
            break
        response = llm.generate(prompt=user_input)
        print(f"Model: {response}")

if __name__ == "__main__":
    print("Starting chat with Groq model...")
    start_chat()
