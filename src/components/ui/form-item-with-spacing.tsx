'use client'

import * as React from 'react'

import { FormItem } from '@/components/ui/form'
import { cn } from '@/lib/utils'

type FormItemWithSpacingProps = React.ComponentPropsWithoutRef<
  typeof FormItem
> & {
  labelSpacing?: string
}

const FormItemWithSpacing = React.forwardRef<
  HTMLDivElement,
  FormItemWithSpacingProps
>(({ labelSpacing, className, ...props }, ref) => {
  return (
    <FormItem
      ref={ref}
      className={cn(
        labelSpacing ? `space-y-[${labelSpacing}]` : 'space-y-2',
        className,
      )}
      {...props}
    />
  )
})

FormItemWithSpacing.displayName = 'FormItemWithSpacing'

export { FormItemWithSpacing }
