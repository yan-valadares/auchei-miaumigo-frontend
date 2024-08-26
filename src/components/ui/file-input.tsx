import { CloudUpload, FileImage, X } from 'lucide-react'
import React, { forwardRef, useState } from 'react'

import { cn } from '@/lib/utils'

export interface ImageUploadInputProps {
  onChange: (file?: File) => void
  name?: string
}

const ImageUploadInput = forwardRef<HTMLInputElement, ImageUploadInputProps>(
  ({ onChange, name }, ref) => {
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
      <div>
        <label
          htmlFor="file-upload"
          className={cn(
            'flex h-auto w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 px-4 py-4 text-darkBlue',
            'hover:bg-blue-50 focus:outline-none',
          )}
        >
          <CloudUpload className="h-5 w-5" />

          <span>Arraste e solte o arquivo</span>
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
          <div className="mt-4 flex w-auto items-center justify-between rounded-lg border bg-white p-2 sm:p-4">
            <div className="flex items-center">
              <FileImage className="h-5 w-5" />
              <span className="text-gray-700">{selectedFile.name}</span>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-red-600 hover:text-red-800 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    )
  },
)

ImageUploadInput.displayName = 'ImageUploadInput'

export { ImageUploadInput }
