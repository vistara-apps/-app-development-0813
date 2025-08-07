import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { 
  Calendar, 
  Users, 
  Plus, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Edit
} from 'lucide-react'
import AddTaskModal from '../components/AddTaskModal'

export default function ProjectDetail() {
  const { id } = useParams()
  const { projects, agents, updateTaskStatus } = useApp()
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  
  const project = projects.find(p => p.id === parseInt(id))

  if (!project) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Project not found</p>
      </div>
    )
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'In Progress':
        return <Clock className="h-5 w-5 text-blue-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBg = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'In Progress':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="card p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{project.name}</h1>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{project.startDate} - {project.endDate}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>{project.tasks.length} tasks</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 text-sm rounded-full ${getStatusBg(project.status)}`}>
              {project.status}
            </span>
            <button className="btn-secondary">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress</h3>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className="bg-primary-600 h-3 rounded-full" 
              style={{ 
                width: `${project.tasks.length > 0 ? (project.tasks.filter(t => t.status === 'Completed').length / project.tasks.length) * 100 : 0}%` 
              }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">
            {project.tasks.filter(t => t.status === 'Completed').length} of {project.tasks.length} tasks completed
          </p>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Tasks</h3>
          <p className="text-2xl font-bold text-blue-600">
            {project.tasks.filter(t => t.status === 'In Progress').length}
          </p>
          <p className="text-sm text-gray-600">Currently in progress</p>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending Tasks</h3>
          <p className="text-2xl font-bold text-orange-600">
            {project.tasks.filter(t => t.status === 'Pending').length}
          </p>
          <p className="text-sm text-gray-600">Waiting to start</p>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Tasks</h3>
            <button
              onClick={() => setShowAddTaskModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Task</span>
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {project.tasks.map((task) => (
            <div key={task.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(task.status)}
                  <div>
                    <h4 className="font-medium text-gray-900">{task.name}</h4>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>Assigned to: {task.assignedTo}</span>
                      <span>Due: {task.dueDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(project.id, task.id, e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
          
          {project.tasks.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No tasks yet. Add your first task to get started.
            </div>
          )}
        </div>
      </div>

      {showAddTaskModal && (
        <AddTaskModal 
          projectId={project.id}
          agents={agents}
          onClose={() => setShowAddTaskModal(false)} 
        />
      )}
    </div>
  )
}