import { FileImage, ImageUp, X } from 'lucide-react'
import React, { forwardRef, useState } from 'react'

import { Input, InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'

import { CepInput } from './cep-input'
import { CpfInput } from './cpf-input'
import { NumberOnlyInput } from './number-only-input'
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

interface NumberOnlyInputVariantProps extends Omit<InputProps, 'value'> {
  value?: string | number | null
}

const NumberOnlyInputVariant = forwardRef<
  HTMLInputElement,
  NumberOnlyInputVariantProps
>((props, ref) => (
  <NumberOnlyInput
    {...props}
    className={`h-6 w-full rounded border text-base text-blue-900 placeholder:text-slate-400 ${props.className}`}
    ref={ref}
  />
))

NumberOnlyInputVariant.displayName = 'NumberOnlyInputVariant'

export { NumberOnlyInputVariant }

export interface FileUploadInputVariantProps {
  onChange: (file?: File) => void
  name?: string
}

const FileUploadInputVariant = forwardRef<
  HTMLInputElement,
  FileUploadInputVariantProps & { className?: string }
>(({ onChange, name, className }, ref) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setSelectedFile(file ?? null)
    if (onChange) {
      onChange(file)
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    if (onChange) {
      onChange(undefined)
    }
  }

  return (
    <div
      className={cn(
        'relative flex h-28 w-28 overflow-hidden rounded-full border-2 border-gray-300',
        className,
      )}
    >
      <label
        htmlFor="file-upload"
        className={cn(
          'flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 text-darkBlue',
          'hover:bg-blue-50 focus:outline-none',
        )}
      >
        <ImageUp className="h-6 w-6" />
      </label>
      <input
        id="file-upload"
        name={name}
        type="file"
        ref={ref}
        onChange={handleFileChange}
        className="hidden"
      />

      {selectedFile && (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-between border border-gray-300 bg-white p-2">
          <div className="flex items-center gap-1">
            <FileImage className="h-6 w-6" />
            <span className="text-xs text-gray-700">{selectedFile.name}</span>
          </div>
          <button
            type="button"
            onClick={handleRemoveFile}
            className="text-red-600 hover:text-red-800 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  )
})

FileUploadInputVariant.displayName = 'FileUploadInputVariant'

export { FileUploadInputVariant }

export interface TextareaInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}

const TextareaInputVariant = React.forwardRef<
  HTMLTextAreaElement,
  TextareaInputProps
>((props, ref) => (
  <textarea
    {...props}
    ref={ref}
    className={cn(
      'h-32 w-full rounded border border-gray-300 px-2 py-1 text-base text-blue-900 placeholder:text-slate-400',
      props.className,
    )}
  />
))

TextareaInputVariant.displayName = 'TextareaInputVariant'

export { TextareaInputVariant }

interface DateInputVariantProps extends Omit<InputProps, 'value'> {
  value?: Date | string
}

const DateInputVariant = React.forwardRef<
  HTMLInputElement,
  DateInputVariantProps
>(({ value, ...props }, ref) => {
  const formattedValue =
    value instanceof Date ? value.toISOString().split('T')[0] : value

  return (
    <Input
      {...props}
      type="date"
      value={formattedValue}
      className={cn(
        'h-6 w-full rounded border border-gray-300 text-base text-blue-900 placeholder:text-slate-400',
        props.className,
      )}
      ref={ref}
    />
  )
})

DateInputVariant.displayName = 'DateInputVariant'

export { DateInputVariant }
