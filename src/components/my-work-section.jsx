'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';
import { TextEffect } from "@/components/ui/text-effect";
import { Button } from '@/components/ui/button';
import { H3 } from '@/components/ui/typography';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Camera video projects
const cameraProjects = [
  {
    id: 1,
    title: "kyar",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1756980665/IMG_2845_opalcb.mov",
    category: "advertisemnt",
    
  },
  {
    id: 2,
    title: "martini bistro",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1756980662/IMG_6222_ju6qel.mov",
    category: "food",
    thumbnail: "https://res.cloudinary.com/da8mfzgxw/image/upload/v1757014171/IMG_8465_zv15om.jpg" // Optional thumbnail
  },
  {
    id: 3,
    title: "Martini bistro ",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1756980654/IMG_6203_faaqio.mov",
    category: "Food",
    thumbnail: "https://res.cloudinary.com/da8mfzgxw/image/upload/v1757014171/IMG_8462_pivedy.jpg" // Optional thumbnail,
  },
  {
    id: 4,
    title: "Kyra",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1756980682/IMG_2790_zrxajh.mov",
    category: "Cinematic shoot"
  },
  {
    id: 5,
    title: "Travel Vlog",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1756980637/IMG_9967_zjqmnv.mov",
    category: "Travel"
  }
];

// Landscape video projects
const landscapeProjects = [
  {
    id: 10,
    title: "Cinematic Landscape",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1756981631/IMG_8452_hq8qpv.mov",
    category: ""
  },
  {
    id: 11,
    title: "Urban Exploration",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1756981616/IMG_8450_n3dddy.mov",
    category: "City Timelapses"
  },
  {
    id: 12,
    title: "Golden Hour",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1756981624/IMG_8451_il5gpt.mov",
    category: "Cinematic"
  },
  {
    id: 13,
    title: "Coastal Scenes",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1757011361/IMG_8461_nqfdif.mov",
    category: "Landscape"
  }
];

// Phone video projects
const phoneProjects = [
  {
    id: 6,
    title: "Bartender Brothers",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1757010152/What_a_baraat_to_remember_at_the_grand_Indian_wedding_in_Bopal_Dhols_beating_colors_flying_an_dyflff.mp4",
    category: "Event"
  },
  {
    id: 7,
    title: "Bartender Brothers",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1757010154/Night_of_Glitz_Glamour_Creativity_We_had_the_absolute_honor_of_being_part_of_the_stunning_S_1_raeaun.mp4",
    category: "Event"
  },
  {
    id: 8,
    title: "Bartender Brothers ",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1757010154/Night_of_Glitz_Glamour_Creativity_We_had_the_absolute_honor_of_being_part_of_the_stunning_S_jola64.mp4",
    category: "Event"
  },
];

// Custom Draggable Carousel Component
const DraggableCarousel = ({ children, className = "", cardWidth = 320 }) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.cursor = 'grabbing';
    containerRef.current.style.userSelect = 'none';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    containerRef.current.style.cursor = 'grab';
    containerRef.current.style.userSelect = 'auto';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch events for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseleave', handleMouseUp);
      return () => {
        container.removeEventListener('mouseleave', handleMouseUp);
      };
    }
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide gap-6 py-4 cursor-grab select-none"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitScrollbar: { display: 'none' }
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
      
      {/* Gradient overlays to indicate scrollability */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
    </div>
  );
};

// Video Card Component
const VideoCard = ({ project, aspectRatio = "9/16", playButtonSize = "w-16 h-16", playIconSize = "w-6 h-6", showInfo = true }) => {
  const [playingVideos, setPlayingVideos] = useState(new Set());
  const [thumbnailError, setThumbnailError] = useState(false);

  const handlePlayClick = (videoElement, projectId) => {
    if (videoElement.paused) {
      // Pause all other videos first
      const allVideos = document.querySelectorAll('video');
      allVideos.forEach(video => {
        if (video !== videoElement && !video.paused) {
          video.pause();
        }
      });
      
      // Clear all playing videos from state
      setPlayingVideos(new Set([projectId]));
      
      // Enable audio and play the selected video
      videoElement.muted = false;
      videoElement.play().catch(console.error);
    } else {
      videoElement.pause();
      videoElement.muted = true;
      setPlayingVideos(prev => {
        const newSet = new Set(prev);
        newSet.delete(projectId);
        return newSet;
      });
    }
  };

  const handleVideoEnd = (projectId) => {
    setPlayingVideos(prev => {
      const newSet = new Set(prev);
      newSet.delete(projectId);
      return newSet;
    });
  };

  const handleThumbnailError = () => {
    setThumbnailError(true);
  };

  return (
    <Card className={`relative aspect-[${aspectRatio}] bg-gray-900 border-gray-800 overflow-hidden`}>
      <CardContent className="p-0 h-full relative">
        {/* Video Element */}
        <video
          className="w-full h-full object-cover cursor-pointer"
          muted
          loop
          playsInline
          preload="metadata"
          onEnded={() => handleVideoEnd(project.id)}
          onPause={() => {
            setPlayingVideos(prev => {
              const newSet = new Set(prev);
              newSet.delete(project.id);
              return newSet;
            });
          }}
          onClick={(e) => {
            if (playingVideos.has(project.id)) {
              handlePlayClick(e.target, project.id);
            }
          }}
          style={{ display: playingVideos.has(project.id) ? 'block' : 'none' }}
        >
          <source src={project.videoUrl} type="video/mp4" />
        </video>

        {/* Thumbnail Image - Only shown when not playing and thumbnail exists */}
        {!playingVideos.has(project.id) && project.thumbnail && !thumbnailError && (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={handleThumbnailError}
          />
        )}

        {/* Video Preview - Shown when no thumbnail or thumbnail failed to load */}
        {!playingVideos.has(project.id) && (!project.thumbnail || thumbnailError) && (
          <video
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
          >
            <source src={project.videoUrl} type="video/mp4" />
          </video>
        )}

        {/* Overlay - Hidden when playing */}
        {!playingVideos.has(project.id) && (
          <div className="absolute inset-0 bg-black/40" />
        )}

        {/* Play Button - Hidden when playing */}
        {!playingVideos.has(project.id) && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              const video = e.currentTarget.parentElement.querySelector('video');
              handlePlayClick(video, project.id);
            }}
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
          >
            <div className={`${playButtonSize} bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200`}>
              <Play className={`${playIconSize} text-white ml-1`} />
            </div>
          </button>
        )}

        {/* Project Info - Hidden when playing and only shown if showInfo is true */}
        {!playingVideos.has(project.id) && showInfo && (
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Card className="bg-black/80 backdrop-blur-sm border-gray-700">
              <CardHeader className="p-4">
                <CardTitle className="text-base font-semibold text-white">{project.title}</CardTitle>
                <CardDescription className="text-sm text-gray-300">{project.category}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function MyWorkSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cameraGridRef = useRef(null);
  const landscapeGridRef = useRef(null);
  const phoneGridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Camera grid items stagger animation
      const cameraGridItems = cameraGridRef.current?.children;
      if (cameraGridItems) {
        gsap.fromTo(cameraGridItems,
          {
            opacity: 0,
            y: 60,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: cameraGridRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Landscape grid items stagger animation
      const landscapeGridItems = landscapeGridRef.current?.children;
      if (landscapeGridItems) {
        gsap.fromTo(landscapeGridItems,
          {
            opacity: 0,
            y: 60,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: landscapeGridRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Phone grid items stagger animation
      const phoneGridItems = phoneGridRef.current?.children;
      if (phoneGridItems) {
        gsap.fromTo(phoneGridItems,
          {
            opacity: 0,
            y: 60,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: phoneGridRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: contactSection, offsetY: 80 },
        ease: "power3.inOut"
      });
    }
  };

  return (
    <section id="my-work" ref={sectionRef} className="py-20 px-4 bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Camera Work Section */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <TextEffect 
              per="char" 
              preset="fade" 
              className="text-3xl md:text-5xl font-bold mb-4 text-white"
            >
              Professional Cinema
            </TextEffect>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Cinematic storytelling through professional camera work and advanced filmmaking techniques.
            </p>
          </motion.div>

          <div ref={cameraGridRef} className="mb-16">
            <DraggableCarousel className="py-4" cardWidth={320}>
              {cameraProjects.map((project) => (
                <div key={project.id} className="w-80 flex-shrink-0">
                  <VideoCard 
                    project={project} 
                    aspectRatio="9/16" 
                    playButtonSize="w-16 h-16" 
                    playIconSize="w-6 h-6"
                    showInfo={true}
                  />
                </div>
              ))}
            </DraggableCarousel>
          </div>
        </div>

        {/* Landscape Video Section */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <TextEffect 
              per="char" 
              preset="fade" 
              className="text-3xl md:text-5xl font-bold mb-4 text-white"
            >
              Cinematic Landscapes
            </TextEffect>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Breathtaking landscape cinematography capturing the beauty of nature and urban environments with mobile Phone.
            </p>
          </motion.div>

          <div ref={landscapeGridRef} className="mb-16">
            <DraggableCarousel className="py-4" cardWidth={384}>
              {landscapeProjects.map((project) => (
                <div key={project.id} className="w-96 flex-shrink-0">
                  <VideoCard 
                    project={project} 
                    aspectRatio="16/9" 
                    playButtonSize="w-20 h-20" 
                    playIconSize="w-8 h-8"
                    showInfo={false}
                  />
                </div>
              ))}
            </DraggableCarousel>
          </div>
        </div>

        {/* Phone Work Section */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <TextEffect 
              per="char" 
              preset="fade" 
              className="text-3xl md:text-5xl font-bold mb-4 text-white"
            >
              Mobile Creations
            </TextEffect>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Dynamic content creation using mobile for social media and creative storytelling.
            </p>
          </motion.div>

          <div ref={phoneGridRef}>
            <DraggableCarousel className="py-4" cardWidth={256}>
              {phoneProjects.map((project) => (
                <div key={project.id} className="w-64 flex-shrink-0">
                  <VideoCard 
                    project={project} 
                    aspectRatio="9/16" 
                    playButtonSize="w-16 h-16" 
                    playIconSize="w-6 h-6"
                    showInfo={true}
                  />
                </div>
              ))}
            </DraggableCarousel>
          </div>
        </div>
      </div>
    </section>
  );
}