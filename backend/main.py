import crewai_tools
import uvicorn
from qdrant_client import QdrantClient
from os import environ, getenv
from dotenv import load_dotenv

load_dotenv()

from api import create_api
from registry import Registry
# from tools.agentipy_tools import gen_tools
from tools.stock import (
    FundamentalAnalysis,
    TechnicalAnalysis,
    RiskAssessment,
)
from tools.mindshare_tool import MindshareTool

# Configure OpenRouter and LiteLLM
environ["OPENAI_API_KEY"] = getenv("OPENROUTER_API_KEY")
environ["OPENAI_API_BASE"] = "https://openrouter.ai/api/v1"
environ["OPENAI_API_VERSION"] = "2023-05-15"  # Add API version
environ["OPENAI_ORGANIZATION"] = ""  # Empty string for OpenRouter

# Add headers required by OpenRouter
environ["OPENAI_HEADERS"] = '{"HTTP-Referer": "https://agents.vistara.dev", "X-Title": "Z Framework"}'
# Configure LiteLLM
import litellm
litellm.set_verbose = True  # Enable debug logging
litellm.drop_params = True  # Prevent API validation errors

def main():
    # Use in-memory storage for development if Qdrant is not configured
    client = None
    if all(key in environ for key in ["QDRANT_HOST", "QDRANT_PORT", "QDRANT_API_KEY"]):
        try:
            client = QdrantClient(
                host=environ["QDRANT_HOST"], 
                port=int(environ["QDRANT_PORT"]), 
                api_key=environ["QDRANT_API_KEY"]
            )
            print("Connected to Qdrant vector database")
        except Exception as e:
            print(f"Failed to connect to Qdrant: {e}")
            print("Using in-memory storage for development")
            client = None
    else:
        print("Qdrant configuration not found, using in-memory storage for development")

    registry = Registry(client)

    # Register basic tools for development
    try:
        if getenv("SERPER_API_KEY"):
            registry.register_tool("SerperDevTool", crewai_tools.SerperDevTool())
        registry.register_tool("FundamentalAnalysis", FundamentalAnalysis())
        registry.register_tool("TechnicalAnalysis", TechnicalAnalysis())
        registry.register_tool("RiskAssessment", RiskAssessment())
        registry.register_tool("MindshareTool", MindshareTool())
        print("Tools registered successfully")
    except Exception as e:
        print(f"Error registering tools: {e}")

    uvicorn.run(create_api(registry), host="0.0.0.0", port=8000)


main()
