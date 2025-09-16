import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-brand-primary text-white hover:bg-brand-primary-hover focus-visible:ring-brand-primary/20 shadow-brand hover:shadow-brand-hover transition-shadow",
        destructive:
          "bg-error text-white hover:bg-error/90 focus-visible:ring-error/20",
        outline:
          "border border-brand-primary bg-background text-brand-primary hover:bg-brand-primary hover:text-white focus-visible:ring-brand-primary/20",
        secondary:
          "bg-brand-secondary text-white hover:bg-brand-secondary-dark focus-visible:ring-brand-secondary/20 shadow-sm",
        ghost: "hover:bg-brand-primary/10 hover:text-brand-primary focus-visible:ring-brand-primary/20",
        link: "text-brand-primary underline-offset-4 hover:underline focus-visible:ring-brand-primary/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  'data-testid'?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, 'data-testid': testId, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        data-testid={testId || `button-${variant || 'default'}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
