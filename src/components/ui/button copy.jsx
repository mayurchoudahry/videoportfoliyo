import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


export function Button({
    text = "Button",
    variant = "white", // "white", "black", or "transparent"
    className,
    width,
    href, // URL to navigate to
    target, // Optional target for external links
    onClick, // Optional click handler
}) {
    const variants = {
        white: {
            base: "bg-white text-primary",
            hoverText: "text-white",
            expandBg: "bg-primary"
        },
        // black: {
        //     base: "bg-black text-white  text-black",
        //     hoverText: "text-black",
        //     expandBg: "bg-white",
        //     dotBg: "bg-white"
        // },
        transparent: {
            base: "bg-transparent text-white border border-white",
            hoverText: "text-white",
            expandBg: "bg-primary",
        },
        // transparentBlack: {
        //     base: "bg-transparent text-black text-black ",
        //     hoverText: "text-white",
        //     expandBg: "bg-black",
        //     dotBg: "bg-black"
        // }
    };

    const currentVariant = variants[variant] || variants.white;


    const buttonContent = (
        <div
            onClick={onClick}
            className={`group relative ${width || 'w-auto'} cursor-pointer overflow-hidden rounded-full px-7 py-2 text-center transition-all duration-700 ${currentVariant.base} ${className}`}
        >
            <span className="relative z-20 inline-block transition-all duration-300 group-hover:text-white">
                {text}
            </span>
            <div className={`absolute inset-0 translate-y-full transition-all duration-500 ease-out group-hover:translate-y-0 ${currentVariant.expandBg}`}></div>
        </div>
    );

    // If href is provided, wrap with Link component
    if (href) {
        // Check if it's an external link
        const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

        // Determine wrapper class based on width prop
        const wrapperClass = width === 'w-full' ? 'block w-full' : 'inline-block';

        if (isExternal) {
            return (
                <a
                    href={href}
                    target={target || '_blank'}
                    rel={target !== '_self' ? 'noopener noreferrer' : undefined}
                    className={wrapperClass}
                >
                    {buttonContent}
                </a>
            );
        } else {
            return (
                <Link href={href} className={wrapperClass}>
                    {buttonContent}
                </Link>
            );
        }
    }

    // If no href, return button as is
    return buttonContent;
}
