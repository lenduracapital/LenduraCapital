import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const headingVariants = cva(
  "font-heading text-foreground leading-tight tracking-tight",
  {
    variants: {
      level: {
        h1: "text-4xl sm:text-5xl lg:text-6xl font-bold",
        h2: "text-3xl sm:text-4xl lg:text-5xl font-bold", 
        h3: "text-2xl sm:text-3xl lg:text-4xl font-semibold",
        h4: "text-xl sm:text-2xl lg:text-3xl font-semibold",
        h5: "text-lg sm:text-xl lg:text-2xl font-medium",
        h6: "text-base sm:text-lg lg:text-xl font-medium",
      },
      variant: {
        default: "",
        brand: "text-brand-primary",
        secondary: "text-brand-secondary", 
        muted: "text-muted-foreground",
        accent: "text-accent-foreground",
      },
    },
    defaultVariants: {
      level: "h1",
      variant: "default",
    },
  }
)

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6
  variant?: "default" | "brand" | "secondary" | "muted" | "accent"
  'data-testid'?: string
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, variant = "default", 'data-testid': testId, ...props }, ref) => {
    const Component = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    const levelVariant = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    
    return React.createElement(
      Component,
      {
        className: cn(headingVariants({ level: levelVariant, variant, className })),
        'data-testid': testId || `heading-${level}`,
        ref,
        ...props,
      }
    )
  }
)
Heading.displayName = "Heading"

export { Heading, headingVariants }