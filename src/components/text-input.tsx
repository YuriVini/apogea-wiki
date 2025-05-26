import React, { useCallback, useState } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { EyeIcon } from '../assets/icons/eye-icon'
import { EyeOffIcon } from '../assets/icons/eye-off-icon'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ControlledTextInputProps = UseControllerProps<any> & {
  isPassword?: boolean
  iconRight?: React.ReactNode
  title?: string
  description?: React.ReactNode
  className?: string
  placeholder?: string
  type?: string
}

export const TextInput = ({ className, name, control, rules, isPassword, iconRight, title, description, placeholder, type = 'text', ...props }: ControlledTextInputProps) => {
  const { field, fieldState } = useController({ name, control, rules })
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev)
  }, [])

  const shouldShowError = fieldState.error

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div className='flex flex-col gap-2'>
      {title && <label className='text-sm font-medium text-gray-300'>{title}</label>}

      <div className='flex flex-col gap-1'>
        <div className='relative flex items-center'>
          <input
            {...props}
            className={`w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
            ref={field.ref}
            type={inputType}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            placeholder={placeholder}
          />

          {isPassword && (
            <button type='button' onClick={toggleShowPassword} className='absolute right-3 text-gray-400 hover:text-gray-300 transition-colors duration-200'>
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          )}

          {iconRight && <div className='absolute right-3'>{iconRight}</div>}
        </div>

        {shouldShowError && <p className='text-sm text-red-500 mt-1'>{fieldState.error?.message}</p>}

        {description && <div className='text-sm text-gray-400 mt-1'>{description}</div>}
      </div>
    </div>
  )
}

TextInput.displayName = 'TextInput'
