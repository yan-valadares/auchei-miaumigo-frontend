import { forwardRef, useEffect, useState } from 'react'

import { Input, InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const PhoneInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, value: inputValue, onChange, ...props }, ref) => {
    const [formattedValue, setFormattedValue] = useState<string>('')

    useEffect(() => {
      if (inputValue) {
        const stringValue = String(inputValue)
        setFormattedValue(phoneMask(stringValue))
      }
    }, [inputValue])

    const phoneMask = (value: string) => {
      const formattedPhone = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d)(\d{4})$/, '$1-$2')
      return formattedPhone
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      const raw = value.replace(/\D/g, '')
      setFormattedValue(phoneMask(raw))
      if (onChange) {
        const syntheticEvent = {
          ...event,
          target: {
            ...event.target,
            value: raw,
          },
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange(syntheticEvent as any)
      }
    }

    return (
      <div className="relative">
        <Input
          type="text"
          className={cn('phone-input', className)}
          value={formattedValue}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        <style>{`
          .phone-input::-ms-reveal,
          .phone-input::-ms-clear {
            visibility: hidden;
            pointer-events: none;
            display: none;
          }
        `}</style>
      </div>
    )
  },
)

PhoneInput.displayName = 'PhoneInput'

export { PhoneInput }
