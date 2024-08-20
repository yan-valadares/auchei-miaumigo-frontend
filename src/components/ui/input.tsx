import React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="flex w-full items-center rounded-md border border-input bg-background px-3 py-2 text-base text-darkBlue">
        <input
          type={type}
          className={cn(
            'h-10 flex-1 border-none bg-transparent text-lg outline-none placeholder:text-muted-foreground',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
