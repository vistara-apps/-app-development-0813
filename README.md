# Zara AI Dev Factory

A platform where scoped AI agents coordinate with clear ownership to help solo builders ship apps fast.

## Features

- **AI Agent Orchestration**: Manage the handoffs and communication between AI agents for seamless app development workflows
- **Process Automation**: Automate repetitive workflows and build auditable trails for enhanced transparency
- **Oversight and Reporting**: Real-time dashboards and scheduled reports on project status
- **Auditable Trails**: Tamper-proof logs of all actions taken by AI agents

## Architecture

### Frontend (React)
- Modern React application with Tailwind CSS
- Context-based state management
- Real-time updates via WebSocket
- Responsive design with component library

### Backend (Z Framework)
- Built on CrewAI framework for agent orchestration
- FastAPI server with REST API endpoints
- Tool registry system for dynamic tool management
- Optional Qdrant vector database for advanced search
- In-memory storage fallback for development

## Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Python 3.8+
- (Optional) Qdrant vector database for production

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zara-ai-dev-factory
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

### Development

1. **Start the backend server**
   ```bash
   cd backend
   python main.py
   ```
   The backend will run on `http://localhost:8000`

2. **Start the frontend development server**
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`

### Environment Variables

Create a `.env` file in the root directory:

```env
# Z Framework Backend Configuration
OPENROUTER_API_KEY=your_openrouter_api_key_here
SERPER_API_KEY=your_serper_api_key_here

# Qdrant Configuration (optional for production)
QDRANT_HOST=localhost
QDRANT_PORT=6333
QDRANT_API_KEY=your_qdrant_api_key_here

# Frontend Configuration
REACT_APP_API_URL=http://localhost:8000
```

## API Endpoints

### Tools
- `GET /tool_list` - List all available tools
- `GET /tool_search?query={query}` - Search tools by query

### Agents
- `GET /agent_list` - List all agents
- `GET /agent_search?query={query}` - Search agents by query
- `POST /save_agent` - Create/save an agent
- `POST /agent_call` - Execute an agent

### WebSocket
- `WS /ws` - Real-time updates and monitoring

## Development Mode

The application supports development mode with graceful fallbacks:

- **Backend Connection**: Automatically detects if the Z Framework backend is available
- **Mock Data**: Falls back to mock data if backend is unavailable
- **In-Memory Storage**: Uses in-memory storage if Qdrant is not configured
- **Error Handling**: Graceful error handling with user-friendly messages

## Project Structure

```
├── src/
│   ├── components/          # React components
│   │   └── AgentManager.jsx # Main agent management interface
│   ├── context/            # React context providers
│   │   └── AppContext.jsx  # Main application state
│   ├── pages/              # Page components
│   ├── services/           # API services
│   │   └── api.js          # Backend API integration
│   └── styles/             # CSS and styling
├── backend/                # Z Framework backend
│   ├── api.py              # FastAPI routes
│   ├── main.py             # Server initialization
│   ├── registry.py         # Tool and agent registry
│   ├── common/             # Shared types and utilities
│   └── tools/              # Tool implementations
└── public/                 # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

