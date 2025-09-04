import { cn } from "@/lib/utils"

export function Section({ children, className, ...props }) {
  return (
    <section 
      className={cn("py-16 md:py-24 w-full space-y-6 md:space-y-8", className)}
      {...props}
    >
      {children}
    </section>
  )
}

// Compact section variant for footer, etc.
export function CompactSection({ children, className, ...props }) {
  return (
    <section 
      className={cn("py-8 md:py-12 max-w-7xl mx-auto px-4 md:px-8 space-y-4 md:space-y-6", className)}
      {...props}
    >
      {children}
    </section>
  )
}

export default Section