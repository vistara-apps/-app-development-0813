import React from 'react'
import { clsx } from 'clsx'

const Card = React.forwardRef(({ 
  className, 
  variant = 'default',
  padding = 'default',
  children, 
  ...props 
}, ref) => {
  const baseStyles = 'bg-white rounded-xl border transition-all duration-200'
  
  const variants = {
    default: 'border-gray-200 shadow-sm hover:shadow-md',
    elevated: 'border-gray-200 shadow-lg hover:shadow-xl',
    outlined: 'border-gray-300 shadow-none hover:shadow-sm',
    gradient: 'border-0 bg-gradient-to-br from-primary-50 to-primary-100 shadow-sm hover:shadow-md'
  }
  
  const paddings = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  }
  
  return (
    <div
      className={clsx(
        baseStyles,
        variants[variant],
        paddings[padding],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

const CardHeader = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx('border-b border-gray-200 pb-4 mb-6', className)}
    {...props}
  >
    {children}
  </div>
))

CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={clsx('text-lg font-semibold text-gray-900', className)}
    {...props}
  >
    {children}
  </h3>
))

CardTitle.displayName = 'CardTitle'

const CardContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx('', className)}
    {...props}
  >
    {children}
  </div>
))

CardContent.displayName = 'CardContent'

export { Card, CardHeader, CardTitle, CardContent }

