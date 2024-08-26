import { forwardRef, useEffect, useState } from 'react'

import { Input, InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const CepInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, value: inputValue, onChange, ...props }, ref) => {
    const [formattedValue, setFormattedValue] = useState<string>('')

    useEffect(() => {
      if (inputValue) {
        const stringValue = String(inputValue)
        setFormattedValue(cepMask(stringValue))
      }
    }, [inputValue])

    const cepMask = (value: string) => {
      const formattedCep = value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
      return formattedCep
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      const raw = value.replace(/\D/g, '')
      setFormattedValue(cepMask(raw))
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
          maxLength={9}
          className={cn('cep-input', className)}
          value={formattedValue}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        <style>{`
          .cep-input::-ms-reveal,
          .cep-input::-ms-clear {
            visibility: hidden;
            pointer-events: none;
            display: none;
          }
        `}</style>
      </div>
    )
  },
)

CepInput.displayName = 'CepInput'

export { CepInput }
