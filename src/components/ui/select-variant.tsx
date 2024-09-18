import * as SelectPrimitive from '@radix-ui/react-select'
import { Check } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

interface SelectTriggerVariantProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {}

const SelectTriggerVariant = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerVariantProps
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-base text-blue-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  >
    {children}
  </SelectPrimitive.Trigger>
))
SelectTriggerVariant.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButtonVariant = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <span className="h-6 w-6" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButtonVariant.displayName =
  SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButtonVariant = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <span className="h-6 w-6" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButtonVariant.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContentVariant = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-64 min-w-[8rem] overflow-hidden rounded-md border border-input bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButtonVariant />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-3/4 min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButtonVariant />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContentVariant.displayName = SelectPrimitive.Content.displayName

const SelectLabelVariant = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      'py-1.5 pl-8 pr-2 text-base font-semibold text-blue-900',
      className,
    )}
    {...props}
  />
))
SelectLabelVariant.displayName = SelectPrimitive.Label.displayName

const SelectItemVariant = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-base text-blue-900 outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItemVariant.displayName = SelectPrimitive.Item.displayName

const SelectSeparatorVariant = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('mx-2 my-1 h-px bg-muted', className)}
    {...props}
  />
))
SelectSeparatorVariant.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTriggerVariant as SelectTrigger,
  SelectContentVariant as SelectContent,
  SelectLabelVariant as SelectLabel,
  SelectItemVariant as SelectItem,
  SelectSeparatorVariant as SelectSeparator,
  SelectScrollUpButtonVariant as SelectScrollUpButton,
  SelectScrollDownButtonVariant as SelectScrollDownButton,
}
