import os
from dotenv import load_dotenv

load_dotenv()

NODE_API_URL = os.getenv("NODE_API_URL", "http://localhost:5000/api")
INTERNAL_API_KEY = os.getenv("INTERNAL_API_KEY")

