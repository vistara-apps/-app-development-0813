import React from 'react'
import { useApp } from '../context/AppContext'
import { Bot, Cpu, Database, TestTube, Palette, Shield } from 'lucide-react'

export default function Agents() {
  const { agents } = useApp()

  const getAgentIcon = (type) => {
    switch (type) {
      case 'UI/UX':
        return <Palette className="h-6 w-6" />
      case 'API':
        return <Cpu className="h-6 w-6" />
      case 'Data':
        return <Database className="h-6 w-6" />
      case 'QA':
        return <TestTube className="h-6 w-6" />
      default:
        return <Bot className="h-6 w-6" />
    }
  }

  const getAgentColor = (type) => {
    switch (type) {
      case 'UI/UX':
        return 'text-purple-600 bg-purple-100'
      case 'API':
        return 'text-blue-600 bg-blue-100'
      case 'Data':
        return 'text-green-600 bg-green-100'
      case 'QA':
        return 'text-orange-600 bg-orange-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Agents</h1>
        <p className="text-gray-600">Manage your specialized AI development agents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg ${getAgentColor(agent.type)}`}>
                {getAgentIcon(agent.type)}
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                agent.status === 'Active' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {agent.status}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{agent.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{agent.ownership}</p>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Capabilities</h4>
              <div className="flex flex-wrap gap-1">
                {agent.capabilities.map((capability, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                  >
                    {capability}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{agent.type} Agent</span>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}