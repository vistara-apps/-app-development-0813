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
  Users,
  Zap,
  Target
} from 'lucide-react'
import StatCard from '../components/StatCard'
import { ProgressBar } from '../components/ProgressBar'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'

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
      title: 'Active Projects',
      value: activeProjects,
      icon: FolderOpen,
      color: 'blue',
      trend: 'up',
      trendValue: '+12%'
    },
    {
      title: 'Active AI Agents',
      value: activeAgents,
      icon: Bot,
      color: 'green',
      trend: 'up',
      trendValue: '+8%'
    },
    {
      title: 'Completed Tasks',
      value: completedTasks,
      icon: CheckCircle,
      color: 'purple',
      trend: 'up',
      trendValue: '+23%'
    },
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: Activity,
      color: 'orange',
      trend: 'up',
      trendValue: '+15%'
    }
  ]

  const recentActivity = auditLogs.slice(0, 5)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor your AI-powered development workflows</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Zap className="h-4 w-4 text-primary-600" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.title}
            {...stat}
            variant={index % 2 === 0 ? 'gradient' : 'default'}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Projects</CardTitle>
              <Target className="h-5 w-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.slice(0, 3).map((project, index) => {
                const progress = project.tasks.length > 0 
                  ? (project.tasks.filter(t => t.status === 'Completed').length / project.tasks.length) * 100 
                  : 0
                
                return (
                  <div key={project.id} className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{project.name}</h4>
                        <p className="text-sm text-gray-500">{project.description}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        project.status === 'In Progress' 
                          ? 'bg-blue-100 text-blue-800'
                          : project.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <ProgressBar 
                      value={progress} 
                      size="sm" 
                      color="primary"
                      label={`${Math.round(progress)}% Complete`}
                    />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* AI Agent Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>AI Agents</CardTitle>
              <Bot className="h-5 w-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agents.slice(0, 4).map((agent) => (
                <div key={agent.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{agent.name}</h4>
                      <p className="text-xs text-gray-500">{agent.type}</p>
                    </div>
                  </div>
                  <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium text-primary-600">{activity.actor}</span>{' '}
                    <span className="text-gray-600">
                      {activity.action.toLowerCase().replace('_', ' ')}
                    </span>{' '}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {activity.action.split('_')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
