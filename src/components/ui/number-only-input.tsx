import { forwardRef } from 'react'

import { Input, InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface NumberOnlyInputProps extends Omit<InputProps, 'value'> {
  value?: string | number | null
}

const NumberOnlyInput = forwardRef<HTMLInputElement, NumberOnlyInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value.replace(/\D/g, '')
      if (onChange) {
        const syntheticEvent = {
          ...event,
          target: {
            ...event.target,
            value: newValue,
          },
        }
        onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>)
      }
    }

    return (
      <Input
        type="text"
        className={cn(
          'h-10 w-full border-none bg-transparent text-lg outline-none placeholder:text-muted-foreground',
          className,
        )}
        ref={ref}
        value={value ?? ''}
        onChange={handleChange}
        {...props}
      />
    )
  },
)

NumberOnlyInput.displayName = 'NumberOnlyInput'

export { NumberOnlyInput }
