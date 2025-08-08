#!/usr/bin/env python3
"""
Simple startup script for the Z Framework backend.
This script provides a development-friendly way to start the server.
"""

import os
import sys
from pathlib import Path

# Add the backend directory to Python path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

# Set development environment
os.environ.setdefault('NODE_ENV', 'development')

if __name__ == "__main__":
    try:
        from main import main
        print("🚀 Starting Z Framework Backend...")
        print("📍 Backend will be available at: http://localhost:8000")
        print("📋 API documentation at: http://localhost:8000/docs")
        print("🔧 Development mode: In-memory storage enabled")
        print("=" * 50)
        main()
    except KeyboardInterrupt:
        print("\n👋 Shutting down gracefully...")
    except Exception as e:
        print(f"❌ Failed to start backend: {e}")
        sys.exit(1)

