from llama_index.llms import openai
from llama_index.readers import SimpleWebPageReader
from llama_index import VectorStoreIndex
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# URL of the webpage to read
webpage_url = "https://example.com"

# Create a SimpleWebPageReader instance
reader = SimpleWebPageReader()

# Read the webpage content
webpage_content = reader.read(webpage_url)

# Create a VectorStoreIndex instance
index = VectorStoreIndex()

# Add the webpage content to the index
index.add_document(webpage_content)

# Print the index
print(index)