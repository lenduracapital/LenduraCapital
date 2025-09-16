import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  'data-testid'?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, 'data-testid': testId, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:border-brand-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-colors",
          className
        )}
        data-testid={testId || `input-${type || 'text'}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
