import React from 'react'
import { useApp } from '../context/AppContext'
import { Play, Edit, Trash2, Plus, GitBranch } from 'lucide-react'

export default function Workflows() {
  const { workflows } = useApp()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workflows</h1>
          <p className="text-gray-600">Automate your development processes with AI agents</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Workflow</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workflows.map((workflow) => (
          <div key={workflow.id} className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <GitBranch className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{workflow.name}</h3>
                  <p className="text-sm text-gray-600">{workflow.description}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                workflow.status === 'Active' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {workflow.status}
              </span>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Steps</h4>
              <div className="space-y-2">
                {workflow.steps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>Trigger: {workflow.trigger}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="btn-primary flex items-center space-x-1 text-sm">
                <Play className="h-3 w-3" />
                <span>Run</span>
              </button>
              <button className="btn-secondary flex items-center space-x-1 text-sm">
                <Edit className="h-3 w-3" />
                <span>Edit</span>
              </button>
              <button className="text-red-600 hover:text-red-700 p-2">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}