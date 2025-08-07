import React, { createContext, useContext, useReducer, useEffect } from 'react'

const AppContext = createContext()

const initialState = {
  user: null,
  projects: [],
  agents: [],
  workflows: [],
  auditLogs: [],
  isAuthenticated: false,
  loading: false
}

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: !!action.payload }
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload }
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] }
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(p => 
          p.id === action.payload.id ? action.payload : p
        )
      }
    case 'SET_AGENTS':
      return { ...state, agents: action.payload }
    case 'ADD_AGENT':
      return { ...state, agents: [...state.agents, action.payload] }
    case 'SET_WORKFLOWS':
      return { ...state, workflows: action.payload }
    case 'ADD_WORKFLOW':
      return { ...state, workflows: [...state.workflows, action.payload] }
    case 'ADD_AUDIT_LOG':
      return { ...state, auditLogs: [action.payload, ...state.auditLogs] }
    case 'LOGOUT':
      return { ...initialState }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    // Initialize with mock data
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      subscriptionPlan: 'Pro'
    }

    const mockProjects = [
      {
        id: 1,
        name: 'E-commerce Platform',
        description: 'Building a modern e-commerce platform with AI recommendations',
        status: 'In Progress',
        startDate: '2024-01-15',
        endDate: '2024-03-15',
        tasks: [
          {
            id: 1,
            name: 'Database Design',
            description: 'Design and implement database schema',
            status: 'Completed',
            assignedTo: 'Database Agent',
            dueDate: '2024-01-20'
          },
          {
            id: 2,
            name: 'API Development',
            description: 'Build REST API endpoints',
            status: 'In Progress',
            assignedTo: 'Backend Agent',
            dueDate: '2024-02-01'
          },
          {
            id: 3,
            name: 'Frontend Components',
            description: 'Create React components',
            status: 'Pending',
            assignedTo: 'Frontend Agent',
            dueDate: '2024-02-15'
          }
        ]
      },
      {
        id: 2,
        name: 'AI Chatbot',
        description: 'Intelligent customer support chatbot',
        status: 'Planning',
        startDate: '2024-02-01',
        endDate: '2024-04-01',
        tasks: []
      }
    ]

    const mockAgents = [
      {
        id: 1,
        name: 'Frontend Agent',
        type: 'UI/UX',
        capabilities: ['React', 'CSS', 'Design Systems'],
        ownership: 'User Interface Development',
        status: 'Active'
      },
      {
        id: 2,
        name: 'Backend Agent',
        type: 'API',
        capabilities: ['Node.js', 'Database', 'Authentication'],
        ownership: 'Server-side Development',
        status: 'Active'
      },
      {
        id: 3,
        name: 'Database Agent',
        type: 'Data',
        capabilities: ['SQL', 'MongoDB', 'Data Modeling'],
        ownership: 'Data Architecture',
        status: 'Active'
      },
      {
        id: 4,
        name: 'Testing Agent',
        type: 'QA',
        capabilities: ['Unit Testing', 'Integration Testing', 'E2E Testing'],
        ownership: 'Quality Assurance',
        status: 'Active'
      }
    ]

    const mockWorkflows = [
      {
        id: 1,
        name: 'New Feature Development',
        description: 'Standard workflow for developing new features',
        trigger: 'Manual',
        steps: [
          'Requirements Analysis',
          'Design Review',
          'Implementation',
          'Testing',
          'Deployment'
        ],
        status: 'Active'
      },
      {
        id: 2,
        name: 'Bug Fix Process',
        description: 'Automated workflow for handling bug reports',
        trigger: 'Bug Report',
        steps: [
          'Bug Triage',
          'Investigation',
          'Fix Implementation',
          'Testing',
          'Release'
        ],
        status: 'Active'
      }
    ]

    dispatch({ type: 'SET_USER', payload: mockUser })
    dispatch({ type: 'SET_PROJECTS', payload: mockProjects })
    dispatch({ type: 'SET_AGENTS', payload: mockAgents })
    dispatch({ type: 'SET_WORKFLOWS', payload: mockWorkflows })
  }, [])

  const login = (credentials) => {
    // Mock login
    const user = {
      id: 1,
      name: 'John Doe',
      email: credentials.email,
      subscriptionPlan: 'Pro'
    }
    dispatch({ type: 'SET_USER', payload: user })
    return user
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  const createProject = (projectData) => {
    const newProject = {
      id: Date.now(),
      ...projectData,
      tasks: [],
      startDate: new Date().toISOString().split('T')[0],
      status: 'Planning'
    }
    dispatch({ type: 'ADD_PROJECT', payload: newProject })
    addAuditLog('CREATE_PROJECT', 'User', newProject.name)
    return newProject
  }

  const addTask = (projectId, taskData) => {
    const task = {
      id: Date.now(),
      ...taskData,
      status: 'Pending'
    }
    
    const project = state.projects.find(p => p.id === projectId)
    if (project) {
      const updatedProject = {
        ...project,
        tasks: [...project.tasks, task]
      }
      dispatch({ type: 'UPDATE_PROJECT', payload: updatedProject })
      addAuditLog('ADD_TASK', 'User', task.name)
    }
    return task
  }

  const updateTaskStatus = (projectId, taskId, status) => {
    const project = state.projects.find(p => p.id === projectId)
    if (project) {
      const updatedTasks = project.tasks.map(t => 
        t.id === taskId ? { ...t, status } : t
      )
      const updatedProject = { ...project, tasks: updatedTasks }
      dispatch({ type: 'UPDATE_PROJECT', payload: updatedProject })
      addAuditLog('UPDATE_TASK_STATUS', 'System', `Task ${taskId} status changed to ${status}`)
    }
  }

  const addAuditLog = (action, actor, target) => {
    const log = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      action,
      actor,
      target
    }
    dispatch({ type: 'ADD_AUDIT_LOG', payload: log })
  }

  const value = {
    ...state,
    login,
    logout,
    createProject,
    addTask,
    updateTaskStatus,
    addAuditLog
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}