import { cn } from "@/lib/utils"

export function H1({ children, className, ...props }) {
  return (
    <h1 className={cn("text-4xl md:text-6xl font-bold tracking-tight text-foreground font-sans antialiased", className)} {...props}>
      {children}
    </h1>
  )
}

export function H2({ children, className, ...props }) {
  return (
    <h2 className={cn("text-2xl md:text-4xl font-semibold text-foreground font-sans antialiased", className)} {...props}>
      {children}
    </h2>
  )
}

export function H3({ children, className, ...props }) {
  return (
    <h3 className={cn("text-xl md:text-2xl font-medium text-foreground font-sans antialiased", className)} {...props}>
      {children}
    </h3>
  )
}

export function Paragraph({ children, className, ...props }) {
  return (
    <p className={cn("text-base md:text-lg leading-relaxed text-foreground/80 font-sans antialiased", className)} {...props}>
      {children}
    </p>
  )
}

export function SmallText({ children, className, ...props }) {
  return (
    <p className={cn("text-sm md:text-base text-foreground font-sans antialiased", className)} {...props}>
      {children}
    </p>
  )
}

// Legacy alias for backward compatibility
export const P = Paragraph
