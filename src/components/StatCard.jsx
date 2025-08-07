import React from 'react'
import { clsx } from 'clsx'
import { TrendingUp, TrendingDown } from 'lucide-react'

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue,
  color = 'blue',
  variant = 'default',
  className 
}) => {
  const colorClasses = {
    blue: {
      icon: 'text-blue-600',
      bg: 'bg-blue-100',
      gradient: 'from-blue-50 to-blue-100'
    },
    green: {
      icon: 'text-green-600',
      bg: 'bg-green-100',
      gradient: 'from-green-50 to-green-100'
    },
    purple: {
      icon: 'text-purple-600',
      bg: 'bg-purple-100',
      gradient: 'from-purple-50 to-purple-100'
    },
    orange: {
      icon: 'text-orange-600',
      bg: 'bg-orange-100',
      gradient: 'from-orange-50 to-orange-100'
    },
    red: {
      icon: 'text-red-600',
      bg: 'bg-red-100',
      gradient: 'from-red-50 to-red-100'
    }
  }
  
  const colors = colorClasses[color] || colorClasses.blue
  
  const cardClasses = variant === 'gradient' 
    ? `bg-gradient-to-br ${colors.gradient} border-0`
    : 'bg-white border border-gray-200'
  
  return (
    <div className={clsx(
      'rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 animate-fade-in',
      cardClasses,
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={clsx('p-3 rounded-lg', colors.bg)}>
            <Icon className={clsx('h-6 w-6', colors.icon)} />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
        
        {trend && trendValue && (
          <div className={clsx(
            'flex items-center text-sm font-medium',
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          )}>
            {trend === 'up' ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            {trendValue}
          </div>
        )}
      </div>
    </div>
  )
}

export default StatCard

