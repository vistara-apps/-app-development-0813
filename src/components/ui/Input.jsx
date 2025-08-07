import React from 'react'
import { clsx } from 'clsx'

const Input = React.forwardRef(({ 
  className, 
  type = 'text',
  error = false,
  success = false,
  icon: Icon,
  iconPosition = 'left',
  ...props 
}, ref) => {
  const baseStyles = 'w-full rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    default: 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
    error: 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50',
    success: 'border-green-300 focus:border-green-500 focus:ring-green-500 bg-green-50'
  }
  
  const getVariant = () => {
    if (error) return 'error'
    if (success) return 'success'
    return 'default'
  }
  
  const paddingClass = Icon 
    ? iconPosition === 'left' 
      ? 'pl-10 pr-3 py-2.5' 
      : 'pl-3 pr-10 py-2.5'
    : 'px-3 py-2.5'
  
  return (
    <div className="relative">
      {Icon && (
        <div className={clsx(
          'absolute inset-y-0 flex items-center pointer-events-none',
          iconPosition === 'left' ? 'left-0 pl-3' : 'right-0 pr-3'
        )}>
          <Icon className={clsx(
            'h-5 w-5',
            error ? 'text-red-400' : success ? 'text-green-400' : 'text-gray-400'
          )} />
        </div>
      )}
      <input
        type={type}
        className={clsx(
          baseStyles,
          variants[getVariant()],
          paddingClass,
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
})

Input.displayName = 'Input'

const Label = React.forwardRef(({ className, children, ...props }, ref) => (
  <label
    ref={ref}
    className={clsx('block text-sm font-medium text-gray-700 mb-1', className)}
    {...props}
  >
    {children}
  </label>
))

Label.displayName = 'Label'

const FormField = ({ label, error, children, className }) => (
  <div className={clsx('space-y-1', className)}>
    {label && <Label>{label}</Label>}
    {children}
    {error && (
      <p className="text-sm text-red-600">{error}</p>
    )}
  </div>
)

export { Input, Label, FormField }

