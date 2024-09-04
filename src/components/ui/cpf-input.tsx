import { forwardRef, useEffect, useState } from 'react'

import { Input, InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const CpfInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, value: inputValue, onChange, ...props }, ref) => {
    const [formattedValue, setFormattedValue] = useState<string>('')

    useEffect(() => {
      if (inputValue) {
        const stringValue = String(inputValue)
        setFormattedValue(cpfMask(stringValue))
      }
    }, [inputValue])

    const cpfMask = (value: string) => {
      const formattedCpf = value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      return formattedCpf
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      const raw = value.replace(/\D/g, '')
      setFormattedValue(cpfMask(raw))
      if (onChange) {
        const syntheticEvent = {
          ...event,
          target: {
            ...event.target,
            value: raw,
          },
        }
        onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>)
      }
    }

    return (
      <div className="relative">
        <Input
          type="text"
          maxLength={14} // 11 digits + 2 separators (dots) + 1 separator (dash)
          className={cn('cpf-input', className)}
          value={formattedValue}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        <style>{`
          .cpf-input::-ms-reveal,
          .cpf-input::-ms-clear {
            visibility: hidden;
            pointer-events: none;
            display: none;
          }
        `}</style>
      </div>
    )
  },
)

CpfInput.displayName = 'CpfInput'

export { CpfInput }
