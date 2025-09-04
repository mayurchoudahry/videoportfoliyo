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
    bottom: "bg-gradient-to-b from-gray-600 via-gray-600/10 to-transparent bg-clip-text text-transparent",
    top: "bg-gradient-to-t from-gray-600 via-gray-600/10 to-transparent bg-clip-text text-transparent",
    left: "bg-gradient-to-l from-gray-600 via-gray-600/10 to-transparent bg-clip-text text-transparent",
    right: "bg-gradient-to-r from-gray-600 via-gray-600/10 to-transparent bg-clip-text text-transparent"
  }

  return (
    <div 
      className={cn(
        "space-y-3 sm:space-y-4 md:space-y-6 mb-[-30px] sm:mb-[-40px] md:mb-[-55px]",
        alignmentClasses[alignment],
        className
      )} 
      {...props}
    >
      {subtitle && (
        <p className={cn(
          "text-xs sm:text-sm md:text-base text-gray-500 font-medium tracking-wide uppercase",
          subtitleClassName
        )}>
          {subtitle}
        </p>
      )}
      <h1 className={cn(
        "text-6xl md:text-4xl lg:text-5xl xl:text-[12rem] font-medium tracking-tighter",
        fadeEffect ? fadeClasses[fadeDirection] : "text-gray-900",
        titleClassName
      )}>
        {title}
      </h1>
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
    bottom: "bg-gradient-to-b from-white/80 via-white/20 to-transparent bg-clip-text text-transparent",
    top: "bg-gradient-to-t from-white/80 via-white/20 to-transparent bg-clip-text text-transparent",
    left: "bg-gradient-to-l from-white/80 via-white/20 to-transparent bg-clip-text text-transparent",
    right: "bg-gradient-to-r from-white/80 via-white/20 to-transparent bg-clip-text text-transparent"
  }

  return (
    <div 
      className={cn(
        "space-y-3 sm:space-y-4 md:space-y-6 mb-[-18px] sm:mb-[-28px] lg:mb-[-45px] xl:mb-[-55px]",
        alignmentClasses[alignment],
        className
      )} 
      {...props}
    >
      {subtitle && (
        <p className={cn(
          "text-xs sm:text-sm md:text-base text-gray-200 font-medium tracking-wide uppercase",
          subtitleClassName
        )}>
          {subtitle}
        </p>
      )}
      <h2 className={cn(
        "text-6xl sm:text-8xl lg:text-[10rem] xl:text-[12rem] font-medium tracking-tighter",
        fadeEffect ? fadeClasses[fadeDirection] : "text-white",
        titleClassName
      )}>
        {title}
      </h2>
    </div>
  )
}
