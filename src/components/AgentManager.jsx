import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const AgentManager = () => {
  const { agents, tools, backendConnected, createAgent, executeAgent, searchTools, loading } = useApp();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [newAgent, setNewAgent] = useState({
    name: '',
    role: '',
    goal: '',
    backstory: '',
    tools: []
  });

  const handleCreateAgent = async (e) => {
    e.preventDefault();
    try {
      await createAgent(newAgent);
      setNewAgent({ name: '', role: '', goal: '', backstory: '', tools: [] });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Failed to create agent:', error);
    }
  };

  const handleSearchTools = async () => {
    if (searchQuery.trim()) {
      try {
        const results = await searchTools(searchQuery);
        setSearchResults(results);
      } catch (error) {
        console.error('Failed to search tools:', error);
      }
    }
  };

  const handleExecuteAgent = async (agentId) => {
    try {
      const result = await executeAgent({
        agent_id: agentId,
        task: 'Execute default task'
      });
      console.log('Agent execution result:', result);
    } catch (error) {
      console.error('Failed to execute agent:', error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Agent Manager</h1>
          <div className="flex items-center space-x-4">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              backendConnected 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {backendConnected ? '🟢 Backend Connected' : '🟡 Mock Mode'}
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              Create Agent
            </button>
          </div>
        </div>
      </div>

      {/* Tool Search */}
      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-3">Tool Search</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for tools..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSearchTools}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            disabled={loading}
          >
            Search
          </button>
        </div>
        
        {searchResults.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Search Results:</h3>
            <div className="space-y-2">
              {searchResults.map((tool, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded border">
                  <div className="font-medium">{tool.payload?.id || tool.id}</div>
                  <div className="text-sm text-gray-600">{tool.payload?.description || tool.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Agents List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Agents ({agents.length})</h2>
        </div>
        <div className="divide-y">
          {agents.map((agent) => (
            <div key={agent.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{agent.name}</h3>
                  <p className="text-sm text-gray-600">{agent.type || agent.role}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {agent.ownership || agent.goal || 'No description available'}
                  </p>
                  {agent.capabilities && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {agent.capabilities.map((capability, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                        >
                          {capability}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    agent.status === 'Active' || agent.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {agent.status}
                  </span>
                  <button
                    onClick={() => handleExecuteAgent(agent.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                    disabled={loading}
                  >
                    Execute
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Agent Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Create New Agent</h2>
            <form onSubmit={handleCreateAgent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  value={newAgent.role}
                  onChange={(e) => setNewAgent({ ...newAgent, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal
                </label>
                <textarea
                  value={newAgent.goal}
                  onChange={(e) => setNewAgent({ ...newAgent, goal: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Backstory
                </label>
                <textarea
                  value={newAgent.backstory}
                  onChange={(e) => setNewAgent({ ...newAgent, backstory: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  required
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Agent'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentManager;

