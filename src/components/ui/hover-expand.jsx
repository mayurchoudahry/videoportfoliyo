"use client";
import React, { useEffect, useState, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"

export default function HoverExpand({
  projects = [],
  initialSelectedIndex = 0
}) {
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex)
  const videoRefs = useRef([])

  // Handle video play/pause based on selected index
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video && video.tagName === 'VIDEO') {
        if (index === selectedIndex) {
          video.play().catch(() => {
            // Handle autoplay restrictions
          })
        } else {
          video.pause()
        }
      }
    })
  }, [selectedIndex])

  // Early return if no projects
  if (!projects || projects.length === 0) {
    return <div className="text-center p-8">No projects available</div>;
  }

  return (
    <div className="relative w-full">
      <div className="flex w-full gap-1 sm:gap-2 md:gap-3 rounded-lg overflow-hidden">
        {projects.map((project, i) => (
          <Link
            key={`project-container-${i}`}
            href={project.link}
            className={`group relative h-48 sm:h-64 md:h-[38rem] overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-700 ease-in-out cursor-pointer ${selectedIndex === i
              ? "flex-[2] sm:flex-[3] md:flex-[4]"
              : "flex-[0.3] sm:flex-[0.5] md:flex-[0.4]"
              }`}
            onMouseEnter={() => setSelectedIndex(i)}
            onMouseLeave={() => setSelectedIndex(i)}>
            <motion.div
              layoutId={`project-${i}`}
              className="absolute inset-0 size-full"
            >
              {project.mediaType === 'video' ? (
                <video
                  ref={(el) => (videoRefs.current[i] = el)}
                  src={project.media}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  muted
                  loop
                  playsInline
                />
              ) : (
                <Image
                  src={project.media}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              {/* Gradient overlay for better text readability */}
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" /> */}
            </motion.div>

            {/* Text overlay - only show when expanded */}
            <AnimatePresence>
              {selectedIndex === i && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 text-white z-10 flex flex-col gap-1"

                >
                  <ProgressiveBlur
                    className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl'
                    blurIntensity={1}
                  />
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-1">
                      <motion.h3
                        className="heading text-sm sm:text-base md:text-lg lg:text-xl font-bold drop-shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        {projects[selectedIndex].title}
                      </motion.h3>

                      <motion.p
                        className="text-xs sm:text-sm md:text-base opacity-90 drop-shadow-md hidden sm:block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.1, delay: 0.2 }}
                      >
                        {projects[selectedIndex].description}
                      </motion.p>
                    </div>
                    
                    <motion.div
                      className="text-right"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2, delay: 0.15 }}
                    >
                      <p className="text-xs sm:text-sm font-medium opacity-80 drop-shadow-md">
                        {projects[selectedIndex].year}
                      </p>
                      <p className="text-xs opacity-70 drop-shadow-sm">
                        {projects[selectedIndex].turnaroundTime}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        ))}
      </div>

    </div>
  );
}

