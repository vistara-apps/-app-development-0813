const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Tool management
  async searchTools(query) {
    return this.request(`/tool_search?query=${encodeURIComponent(query)}`);
  }

  async listTools() {
    return this.request('/tool_list');
  }

  // Agent management
  async searchAgents(query) {
    return this.request(`/agent_search?query=${encodeURIComponent(query)}`);
  }

  async listAgents() {
    return this.request('/agent_list');
  }

  async saveAgent(agentData) {
    return this.request('/save_agent', {
      method: 'POST',
      body: JSON.stringify(agentData),
    });
  }

  // Agent execution
  async executeAgent(agentData) {
    return this.request('/agent_call', {
      method: 'POST',
      body: JSON.stringify(agentData),
    });
  }

  // WebSocket connection for real-time updates
  createWebSocket() {
    const wsUrl = API_BASE_URL.replace('http', 'ws') + '/ws';
    return new WebSocket(wsUrl);
  }
}

export default new ApiService();

