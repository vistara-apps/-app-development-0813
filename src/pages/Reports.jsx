import React from 'react'
import { useApp } from '../context/AppContext'
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Users, 
  Calendar,
  Download
} from 'lucide-react'

export default function Reports() {
  const { projects, agents, auditLogs } = useApp()

  const totalProjects = projects.length
  const completedProjects = projects.filter(p => p.status === 'Completed').length
  const activeProjects = projects.filter(p => p.status === 'In Progress').length
  const totalTasks = projects.reduce((acc, p) => acc + p.tasks.length, 0)
  const completedTasks = projects.reduce((acc, p) => 
    acc + p.tasks.filter(t => t.status === 'Completed').length, 0
  )

  const metrics = [
    {
      label: 'Project Completion Rate',
      value: totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0,
      unit: '%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      label: 'Task Completion Rate',
      value: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      unit: '%',
      icon: CheckCircle,
      color: 'text-blue-600'
    },
    {
      label: 'Active Projects',
      value: activeProjects,
      unit: '',
      icon: Clock,
      color: 'text-orange-600'
    },
    {
      label: 'Active Agents',
      value: agents.filter(a => a.status === 'Active').length,
      unit: '',
      icon: Users,
      color: 'text-purple-600'
    }
  ]

  const recentLogs = auditLogs.slice(0, 10)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Track your development workflow performance</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {metric.value}{metric.unit}
                </p>
              </div>
              <metric.icon className={`h-8 w-8 ${metric.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Status Overview */}
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Project Status Overview</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{project.name}</h4>
                    <p className="text-sm text-gray-500">
                      {project.tasks.filter(t => t.status === 'Completed').length} / {project.tasks.length} tasks
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ 
                          width: `${project.tasks.length > 0 ? (project.tasks.filter(t => t.status === 'Completed').length / project.tasks.length) * 100 : 0}%` 
                        }}
                      ></div>
                    </div>
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
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agent Performance */}
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Agent Performance</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {agents.map((agent) => {
                const assignedTasks = projects.reduce((acc, p) => 
                  acc + p.tasks.filter(t => t.assignedTo === agent.name).length, 0
                )
                const completedTasks = projects.reduce((acc, p) => 
                  acc + p.tasks.filter(t => t.assignedTo === agent.name && t.status === 'Completed').length, 0
                )
                const completionRate = assignedTasks > 0 ? Math.round((completedTasks / assignedTasks) * 100) : 0

                return (
                  <div key={agent.id} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{agent.name}</h4>
                      <p className="text-sm text-gray-500">{agent.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{completionRate}%</p>
                      <p className="text-sm text-gray-500">{completedTasks}/{assignedTasks} tasks</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {recentLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-sm text-gray-900">
                    <span className="font-medium">{log.actor}</span> {log.action.toLowerCase().replace('_', ' ')} {log.target}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}