import os
from langchain_groq import ChatGroq

# Load the Groq API key from environment variables
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
print("The groq API key to be used :", GROQ_API_KEY)

# Initialize the Groq LLM with a valid model
chat_groq = ChatGroq(api_key=GROQ_API_KEY, model="llama3-70b-8192")

# Function to start a chat with the model
def start_chat():
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["exit", "quit"]:
            print("Chat ended.")
            break
        response = chat_groq.generate(prompt=user_input)
        print(f"Model: {response}")

if __name__ == "__main__":
    print("Starting chat with Groq model...")
    start_chat()

# $python ./groq_chat_langchain.py 
