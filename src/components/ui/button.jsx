import React from 'react';
import Link from 'next/link';
import  GlassSurface  from '@/components/ui/glass-surface';

export const Button = ({ 
  text = "Button", 
  variant = 'white', 
  className = '', 
  onClick,
  type = 'button',
  href,
  target,
  rel,
  ...props 
}) => {
  const baseClasses = 'px-4 sm:px-5 py-2 sm:py-2.5 font-medium rounded-full transition-all duration-300 ease-in-out cursor-pointer animate-elastic-scale transform-gpu text-sm sm:text-base';
  
  const variantClasses = {
    transparent: 'bg-transparent text-white lg:hover:text-white btn-transparent',
    white: 'bg-white text-background lg:hover:text-white btn-white',
    glass: 'bg-transparent text-white lg:hover:text-black btn-glass'
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  // Render content based on whether it's a link or button
  const renderContent = () => {
    if (href) {
      // External link
      if (target === '_blank' || href.startsWith('http')) {
        return (
          <a
            href={href}
            target={target}
            rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
            className={combinedClasses}
            onClick={onClick}
            {...props}
          >
            {text}
          </a>
        );
      }
      // Internal link using Next.js Link
      return (
        <Link href={href} className={combinedClasses} onClick={onClick} {...props}>
          {text}
        </Link>
      );
    }
    
    // Regular button
    return (
      <button
        type={type}
        className={combinedClasses}
        onClick={onClick}
        {...props}
      >
        {text}
      </button>
    );
  };

  // Glass variant wraps content in GlassSurface
  if (variant === 'glass') {
    return (
      <div className="flex justify-center w-full">
        <GlassSurface
          width="auto"
          height="auto"
          borderRadius={50}
          borderWidth={0.2}
          brightness={60}
          opacity={0.8}
          blur={15}
          saturation={1.2}
          enableGlassEffect={true}
          className="inline-block max-w-fit"
        >
          {renderContent()}
        </GlassSurface>
      </div>
    );
  }

  return renderContent();
};
