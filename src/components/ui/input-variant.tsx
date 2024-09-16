import React, { forwardRef } from 'react'

import { Input, InputProps } from '@/components/ui/input'

import { CepInput } from './cep-input'
import { CpfInput } from './cpf-input'
import { PhoneInput } from './phone-input'

const InputVariant = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => (
    <Input
      {...props}
      className={`h-6 w-full rounded border border-gray-300 text-base text-blue-900 placeholder:text-slate-400 ${props.className}`}
      ref={ref}
    />
  ),
)

InputVariant.displayName = 'InputVariant'

export { InputVariant }

const CpfInputVariant = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => (
    <CpfInput
      {...props}
      className={`h-6 w-full rounded border border-gray-300 text-base text-blue-900 placeholder:text-slate-400 ${props.className}`}
      ref={ref}
    />
  ),
)

CpfInputVariant.displayName = 'CpfInputVariant'

export { CpfInputVariant }

const PhoneInputVariant = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => (
    <PhoneInput
      {...props}
      className={`h-6 w-full rounded border text-base text-blue-900 placeholder:text-slate-400 ${props.className}`}
      ref={ref}
    />
  ),
)

PhoneInputVariant.displayName = 'PhoneInputVariant'

export { PhoneInputVariant }

const CepInputVariant = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => (
    <CepInput
      {...props}
      className={`h-6 w-full rounded border text-base text-blue-900 placeholder:text-slate-400 ${props.className}`}
      ref={ref}
    />
  ),
)

CepInputVariant.displayName = 'CepInputVariant'

export { CepInputVariant }
