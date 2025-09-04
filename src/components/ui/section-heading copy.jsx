import { cn } from "@/lib/utils"

export function SectionHeading({ 
  title, 
  subtitle, 
  className,
  titleClassName,
  subtitleClassName,
  alignment = "left",
  fadeEffect = false,
  fadeDirection = "bottom",
  ...props 
}) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center", 
    right: "text-right"
  }

  const fadeClasses = {
    bottom: "bg-gradient-to-b from-gray-900 via-gray-900/20 to-transparent bg-clip-text text-transparent",
    top: "bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent bg-clip-text text-transparent",
    left: "bg-gradient-to-l from-gray-900 via-gray-900/20 to-transparent bg-clip-text text-transparent",
    right: "bg-gradient-to-r from-gray-900 via-gray-900/20 to-transparent bg-clip-text text-transparent"
  }

  return (
    <div 
      className={cn(
        "relative mt-38",
        alignmentClasses[alignment],
        className
      )} 
      {...props}
    >
      {subtitle && (
        <p className={cn(
          "absolute inset-0 top-[-180] text-sm md:text-base text-gray-500 font-medium tracking-wide uppercase",
          subtitleClassName
        )}>
          {subtitle}
        </p>
      )}
      <h2 className={cn(
        "absolute inset-0 top-[-140] text-3xl md:text-5xl lg:text-[12rem] font-medium tracking-tighter",
        fadeEffect ? fadeClasses[fadeDirection] : "text-gray-900",
        titleClassName
      )}>
        {title}
      </h2>
    </div>
  )
}

// Variant for dark backgrounds
export function SectionHeadingDark({ 
  title, 
  subtitle, 
  className,
  titleClassName,
  subtitleClassName,
  alignment = "left",
  fadeEffect = false,
  fadeDirection = "bottom",
  ...props 
}) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center", 
    right: "text-right"
  }

  const fadeClasses = {
    bottom: "bg-gradient-to-b from-white via-white/20 to-transparent bg-clip-text text-transparent",
    top: "bg-gradient-to-t from-white via-white/20 to-transparent bg-clip-text text-transparent",
    left: "bg-gradient-to-l from-white via-white/20 to-transparent bg-clip-text text-transparent",
    right: "bg-gradient-to-r from-white via-white/20 to-transparent bg-clip-text text-transparent"
  }

  return (
    <div 
      className={cn(
        "relative mt-38",
        alignmentClasses[alignment],
        className
      )} 
      {...props}
    >
      {subtitle && (
        <p className={cn(
          "absolute inset-0 top-[-180] text-sm md:text-base text-gray-400 font-medium tracking-wide uppercase",
          subtitleClassName
        )}>
          {subtitle}
        </p>
      )}
      <h2 className={cn(
        "absolute inset-0 top-[-140] text-3xl md:text-5xl lg:text-[12rem] font-medium tracking-tighter",
        fadeEffect ? fadeClasses[fadeDirection] : "text-white",
        titleClassName
      )}>
        {title}
      </h2>
    </div>
  )
}
