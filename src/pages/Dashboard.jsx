import React from 'react'
import { useApp } from '../context/AppContext'
import { 
  FolderOpen, 
  Bot, 
  Activity, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Users
} from 'lucide-react'

export default function Dashboard() {
  const { projects, agents, auditLogs } = useApp()

  const activeProjects = projects.filter(p => p.status === 'In Progress').length
  const totalTasks = projects.reduce((acc, p) => acc + p.tasks.length, 0)
  const completedTasks = projects.reduce((acc, p) => 
    acc + p.tasks.filter(t => t.status === 'Completed').length, 0
  )
  const activeAgents = agents.filter(a => a.status === 'Active').length

  const stats = [
    {
      name: 'Active Projects',
      value: activeProjects,
      icon: FolderOpen,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      name: 'Active AI Agents',
      value: activeAgents,
      icon: Bot,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      name: 'Completed Tasks',
      value: completedTasks,
      icon: CheckCircle,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      name: 'Total Tasks',
      value: totalTasks,
      icon: Activity,
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    }
  ]

  const recentActivity = auditLogs.slice(0, 5)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Monitor your AI-powered development workflows</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Projects</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {projects.slice(0, 3).map((project) => (
                <div key={project.id} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{project.name}</h4>
                    <p className="text-sm text-gray-500">{project.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
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

        {/* AI Agent Status */}
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">AI Agent Status</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {agents.slice(0, 4).map((agent) => (
                <div key={agent.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">{agent.name}</h4>
                      <p className="text-sm text-gray-500">{agent.type}</p>
                    </div>
                  </div>
                  <span className="text-xs text-green-600 font-medium">Active</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.actor}</span> {activity.action.toLowerCase().replace('_', ' ')} {activity.target}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}