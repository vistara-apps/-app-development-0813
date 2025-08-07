import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Plus, Calendar, Users, Activity } from 'lucide-react'
import CreateProjectModal from '../components/CreateProjectModal'

export default function Projects() {
  const { projects } = useApp()
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Manage your AI-powered development projects</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                project.status === 'In Progress' 
                  ? 'bg-blue-100 text-blue-800'
                  : project.status === 'Completed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {project.status}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{project.description}</p>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{project.startDate} - {project.endDate}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Activity className="h-4 w-4 mr-2" />
                <span>{project.tasks.length} tasks</span>
              </div>
            </div>
            
            {project.tasks.length > 0 && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full" 
                    style={{ 
                      width: `${(project.tasks.filter(t => t.status === 'Completed').length / project.tasks.length) * 100}%` 
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {project.tasks.filter(t => t.status === 'Completed').length} of {project.tasks.length} tasks completed
                </p>
              </div>
            )}
          </Link>
        ))}
      </div>

      {showCreateModal && (
        <CreateProjectModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  )
}