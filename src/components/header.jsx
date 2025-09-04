'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Mail, Instagram, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { H3 } from '@/components/ui/typography'
import GlassSurface from '@/components/ui/glass-surface'
import { motion, AnimatePresence } from 'framer-motion'

const menuItems = [
    { name: 'My Work', href: '#my-work' },
    // { name: 'About', href: '#my-work' },
    { name: 'Contact', href: '#contact' },
]

export const Header = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [currentTime, setCurrentTime] = React.useState('')
    const [isMounted, setIsMounted] = React.useState(false)

    // Smooth scroll function
    const smoothScrollTo = (target) => {
        if (typeof window === 'undefined') return
        const element = document.querySelector(target)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    React.useEffect(() => {
        setIsMounted(true)
        
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    React.useEffect(() => {
        if (!isMounted) return
        
        const updateTime = () => {
            const now = new Date()
            const timeString = now.toLocaleTimeString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            })
            setCurrentTime(timeString)
        }

        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [isMounted])
    return (
        <header>
            <nav
                className={cn(
                    'fixed z-50 w-full transition-all duration-300',
                    isMounted && isScrolled && 'px-6'
                )}
                {...(isMounted && menuState && { 'data-state': 'active' })}>
                <GlassSurface
                    width="100%"
                    height="auto"
                    borderRadius={50}
                    saturation={1.5}
                    borderWidth={0.2}
                    // height="auto"
                    displace={4}
                    distortionScale={-180}
                    // brightness={60}
                    opacity={1}
                    // mixBlendMode="screen"
                    enableGlassEffect={isMounted ? isScrolled : false}
                    className={cn(
                        'mx-auto mt-3 max-w-6xl px-0 sm:px-6 transition-all duration-300 lg:px-12',
                        isMounted && isScrolled && 'max-w-lg sm:max-w-xl lg:max-w-3xl px-0 md:px-0 lg:px-0 mt-6'
                    )}
                >
                    <div className="relative w-full px-5 flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-3">
                        <div className="flex w-full justify-between lg:w-auto">
                            

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                {!menuState ? (
                                    <Menu className="size-6 transition-all duration-300 text-white" />
                                ) : (
                                    <X className="size-6 transition-all duration-300 text-white" />
                                )}
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm ">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault()
                                                smoothScrollTo(item.href)
                                            }}
                                            className="text-white hover:text-gray-300 block duration-150">
                                            <span>{item.name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            onClick={() => smoothScrollTo('#contact')}
                            className="hidden lg:block px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-150 text-sm font-medium"
                        >
                            Get in Touch
                        </button>

                    </div>
                </GlassSurface>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {menuState && (
                        <motion.div
                            className="lg:hidden fixed inset-0 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            {/* Backdrop */}
                            <motion.div
                                className="fixed inset-0  backdrop-blur-md"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            />

                            {/* Menu Content */}
                            <motion.div
                                className="fixed inset-0 w-full bg-black/98"
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                    duration: 0.4
                                }}
                            >
                                <div className="flex flex-col h-full">
                                    {/* Header */}
                                    <motion.div
                                        className="flex items-center justify-between p-6"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.3 }}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <Image
                                                src="https://res.cloudinary.com/drk8b86b2/image/upload/v1756220743/cluvionWhiteLogo_fnutzv.png"
                                                alt="Cluvion Logo"
                                                width={24}
                                                height={24}
                                                className="h-6 w-6"
                                            />
                                            <span className="text-white font-semibold text-lg">Cluvion</span>
                                        </div>

                                        <button
                                            onClick={() => setMenuState(false)}
                                            className="p-2 text-gray-300 hover:text-white rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </motion.div>
                                    {isMounted && <span className="text-foreground text-sm text-center m-auto size-fit ">{currentTime}</span>}

                                    {/* Navigation */}
                                    <nav className="flex-1 px-6 pt-8">
                                        <ul className="space-y-0">
                                            {/* Add Home link */}
                                            <motion.li
                                                className="border-b border-gray-700"
                                                initial={{ opacity: 0, x: 30 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay: 0.3 + (menuItems.length * 0.1),
                                                    duration: 0.3,
                                                    ease: "easeOut"
                                                }}
                                            >
                                                <Link
                                                    href="/"
                                                    onClick={() => setMenuState(false)}
                                                    className="flex items-center justify-between py-6 text-white hover:text-gray-300 transition-colors group"
                                                >
                                                    <span className="text-3xl font-normal tracking-tight">
                                                        Home
                                                    </span>
                                                    <span className="text-gray-400 text-lg font-light">
                                                        (01)
                                                    </span>
                                                </Link>
                                            </motion.li>
                                            {menuItems.map((item, index) => (
                                                <motion.li
                                                    key={index}
                                                    className="border-b border-gray-700 last:border-b-0"
                                                    initial={{ opacity: 0, x: 30 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{
                                                        delay: 0.3 + (index * 0.1),
                                                        duration: 0.3,
                                                        ease: "easeOut"
                                                    }}
                                                >
                                                    <Link
                                                        href={item.href}
                                                        onClick={() => setMenuState(false)}
                                                        className="flex items-center justify-between py-6 text-white hover:text-gray-300 transition-colors group"
                                                    >
                                                        <span className="text-3xl font-normal tracking-tight">
                                                            {item.name}
                                                        </span>
                                                        <span className="text-gray-400 text-lg font-light">
                                                            (0{index + 2})
                                                        </span>
                                                    </Link>
                                                </motion.li>
                                            ))}

                                        </ul>
                                    </nav>

                                    {/* Contact Information */}
                                    <motion.div
                                        className="px-6 pb-8 space-y-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5, duration: 0.3 }}
                                    >
                                        <div className="text-center space-y-2">
                                            <p className="text-white text-lg font-medium">
                                                cluvionteam@gmail.com
                                            </p>
                                        </div>

                                        {/* Social Links */}
                                        <div className="flex justify-center space-x-6 pt-4">
                                            <Link
                                                href="https://www.linkedin.com/in/cluvion-digital-creative-agency-084b04380/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="LinkedIn"
                                                className="text-gray-300 hover:text-white transition-colors"
                                            >
                                                <svg
                                                    className="size-6"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="1em"
                                                    height="1em"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        fill="currentColor"
                                                        d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"></path>
                                                </svg>
                                            </Link>
                                            <Link
                                                href="https://www.instagram.com/cluvion?igsh=eGZzMjdiejF6dGRq&utm_source=qr"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Instagram"
                                                className="text-gray-300 hover:text-white transition-colors"
                                            >
                                                <svg
                                                    className="size-6"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="1em"
                                                    height="1em"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        fill="currentColor"
                                                        d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"></path>
                                                </svg>
                                            </Link>
                                            <Link
                                                href="https://x.com/cluvion?s=21"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="X/Twitter"
                                                className="text-gray-300 hover:text-white transition-colors"
                                            >
                                                <svg
                                                    className="size-6"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="1em"
                                                    height="1em"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        fill="currentColor"
                                                        d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"></path>
                                                </svg>
                                            </Link>
                                            <Link
                                                href="mailto:cluvionteam@gmail.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Mail"
                                                className="text-gray-300 hover:text-white transition-colors"
                                            >
                                                <Mail className="size-6" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </nav>
        </header>
    )
}