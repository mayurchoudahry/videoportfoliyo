'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { TextEffect } from "@/components/ui/text-effect";
import { Button } from '@/components/ui/button';
import { H3 } from '@/components/ui/typography';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CarouselSpacing } from './card';

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
    thumbnail: "https://res.cloudinary.com/da8mfzgxw/image/upload/v1757139697/IMG_8484_jrquwt.jpg" // Optional thumbnail
    
  },
  {
    id: 2,
    title: "martini bistro",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1756980662/IMG_6222_ju6qel.mov",
    category: "food",
    thumbnail: "https://res.cloudinary.com/da8mfzgxw/image/upload/v1757014171/IMG_8465_zv15om.jpg" 
  },
  {
    id: 3,
    title: "Martini bistro ",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1756980654/IMG_6203_faaqio.mov",
    category: "Food",
    thumbnail: "https://res.cloudinary.com/da8mfzgxw/image/upload/v1757014171/IMG_8462_pivedy.jpg" 
  },
  {
    id: 4,
    title: "Kyra",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1756980682/IMG_2790_zrxajh.mov",
    category: "Cinematic shoot",
    thumbnail: "https://res.cloudinary.com/da8mfzgxw/image/upload/v1757139698/IMG_8485_iyawra.jpg" 
  },
  {
    id: 5,
    title: "Martini Biestro",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1756980637/IMG_9967_zjqmnv.mov",
    category: "Food",
    thumbnail: "https://res.cloudinary.com/da8mfzgxw/image/upload/v1757139695/IMG_8483_vdesib.jpg" 
  }
];

// Landscape video projects
const landscapeProjects = [
  {
    id: 10,
    title: "Cinematic Landscape",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1756981631/IMG_8452_hq8qpv.mov",
    category: "cinematic",
    thumbnail: "https://res.cloudinary.com/da8mfzgxw/image/upload/v1757139694/IMG_8488_nilpsh.jpg" 
  },
  {
    id: 11,
    title: "Urban Exploration",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1756981616/IMG_8450_n3dddy.mov",
    category: "City Timelapses",
    thumbnail: "https://res.cloudinary.com/da8mfzgxw/image/upload/v1757140229/IMG_8490_nmzxtk.jpg"  
  },
  {
    id: 12,
    title: "Golden Hour",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1756981624/IMG_8451_il5gpt.mov",
    category: "Cinematic",
    thumbnail: "https://res.cloudinary.com/da8mfzgxw/image/upload/v1757139694/IMG_8487_k2iy6t.jpg" 
  },
  // {
  //   id: 13,
  //   title: "Coastal Scenes",
  //   videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1757011361/IMG_8461_nqfdif.mov",
  //   category: "Landscape", 
  //   thumbnail: "https://res.cloudinary.com/da8mfzgxw/image/upload/v1757139694/IMG_8489_ej2sat.jpg" 
  // }
];

// Phone video projects
const phoneProjects = [
  {
    id: 6,
    title: "Bartender Brothers",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1757010152/What_a_baraat_to_remember_at_the_grand_Indian_wedding_in_Bopal_Dhols_beating_colors_flying_an_dyflff.mp4",
    category: "Event",
    thumbnail: "https://res.cloudinary.com/da8mfzgxw/image/upload/v1757144405/IMG_8496_zl24yh.jpg" 
  },
  {
    id: 7,
    title: "Bartender Brothers",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1757010154/Night_of_Glitz_Glamour_Creativity_We_had_the_absolute_honor_of_being_part_of_the_stunning_S_1_raeaun.mp4",
    category: "Event",
    thumbnail: "https://res.cloudinary.com/da8mfzgxw/image/upload/v1757144405/IMG_8498_gxpovt.jpg" 
  },
  {
    id: 8,
    title: "Bartender Brothers ",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1757010154/Night_of_Glitz_Glamour_Creativity_We_had_the_absolute_honor_of_being_part_of_the_stunning_S_jola64.mp4",
    category: "Event",
    thumbnail: "https://res.cloudinary.com/da8mfzgxw/image/upload/v1757144404/IMG_8495_u5zs9x.jpg" 
  },
  {
    id: 9,
    title: "Bombboo Anna ",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1760687574/IMG_0721_fhzfwc.mov",
    category: "Commercail",
    thumbnail: "https://res.cloudinary.com/da8mfzgxw/image/upload/v1760687699/IMG_1201_jxnxeh.jpg" 
  },
  {
    id: 10,
    title: "Bombboo Anna ",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1760687576/IMG_0924_gowyzw.mov",
    category: "Commercail",
    thumbnail: "https://res.cloudinary.com/da8mfzgxw/image/upload/v1760687700/IMG_1200_ebgtb9.jpg" 
  },
];

// Navigation Carousel Component
const NavigationCarousel = ({ children, className = "" }) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const updateCarouselDimensions = useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const totalCards = children.length;
      const isMobile = window.innerWidth < 640;
      const currentContainerWidth = container.offsetWidth;
      
      setContainerWidth(currentContainerWidth);
      
      // Get actual card width from first child
      const firstCard = container.querySelector(":scope > *");
      if (firstCard) {
        const actualCardWidth = firstCard.offsetWidth;
        const gap = isMobile ? 0 : 24;
        setCardWidth(actualCardWidth + gap);
        
        if (isMobile) {
          // On mobile, show one card at a time
          setMaxIndex(Math.max(0, totalCards - 1));
        } else {
          // On desktop, calculate how many cards fit and set maxIndex accordingly
          const cardsPerView = Math.floor(currentContainerWidth / (actualCardWidth + gap));
          setMaxIndex(Math.max(0, totalCards - cardsPerView));
        }
      }
    }
  }, [children.length]);

  useEffect(() => {
    updateCarouselDimensions();
    
    const handleResize = () => {
      updateCarouselDimensions();
      // Reset to first item on resize to avoid being stuck
      setCurrentIndex(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateCarouselDimensions]);

  const scrollTo = (index) => {
    if (containerRef.current && cardWidth > 0) {
      const container = containerRef.current;
      const isMobile = window.innerWidth < 640;
      
      let scrollPosition;
      if (isMobile) {
        // On mobile, scroll full container width per item
        scrollPosition = index * containerWidth;
      } else {
        // On desktop, scroll by card width to show next set of cards
        scrollPosition = index * cardWidth;
      }

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });

      setCurrentIndex(index);
    }
  };

  const handlePrevious = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollTo(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    scrollTo(newIndex);
  };

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  return (
    <div className={`relative ${className}`}>
      {/* Left Navigation */}
      <button
        onClick={handlePrevious}
        disabled={!canGoPrevious}
        className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/30 ${
          !canGoPrevious ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
        }`}
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>

      {/* Right Navigation */}
      <button
        onClick={handleNext}
        disabled={!canGoNext}
        className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/30 ${
          !canGoNext ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
        }`}
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>

      {/* Carousel */}
      <div
        ref={containerRef}
        className="flex overflow-x-hidden gap-0 sm:gap-6 py-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {children}
      </div>

      {/* Dots - Only show if there are multiple pages */}
      {maxIndex > 0 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};


// Video Card Component
const VideoCard = ({ project, aspectRatio = "9/16", playButtonSize = "w-16 h-16", playIconSize = "w-6 h-6", showInfo = true }) => {
  const [playingVideos, setPlayingVideos] = useState(new Set());
  const [thumbnailError, setThumbnailError] = useState(false);
  const [videoThumbnail, setVideoThumbnail] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const previewVideoRef = useRef(null);
  const canvasRef = useRef(null);

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

  // Detect iOS device
  useEffect(() => {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
              (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(iOS);
  }, []);

  // Generate thumbnail from video for iOS
  const generateVideoThumbnail = (videoElement) => {
    if (!videoElement || !isIOS || project.thumbnail) return;
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = videoElement.videoWidth || 320;
      canvas.height = videoElement.videoHeight || 568;
      
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
      setVideoThumbnail(thumbnailUrl);
    } catch (error) {
      console.warn('Could not generate video thumbnail:', error);
    }
  };

  // Handle video metadata loaded for iOS thumbnail generation
  const handleVideoLoadedData = (videoElement) => {
    if (isIOS && !project.thumbnail && videoElement) {
      videoElement.currentTime = 1; // Seek to 1 second for better frame
    }
  };

  const handleVideoSeeked = (videoElement) => {
    if (isIOS && !project.thumbnail && videoElement && videoElement.readyState >= 2) {
      generateVideoThumbnail(videoElement);
    }
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
          crossOrigin="anonymous"
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
          <source src={project.videoUrl} type="video/mov" />
          <source src={project.videoUrl} type="video/quicktime" />
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

        {/* Generated Video Thumbnail for iOS */}
        {!playingVideos.has(project.id) && isIOS && !project.thumbnail && videoThumbnail && (
          <img
            src={videoThumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        )}

        {/* Video Preview - Shown when no thumbnail or thumbnail failed to load */}
        {!playingVideos.has(project.id) && (!project.thumbnail || thumbnailError) && !(isIOS && videoThumbnail) && (
          <video
            ref={previewVideoRef}
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
            onLoadedData={(e) => handleVideoLoadedData(e.target)}
            onSeeked={(e) => handleVideoSeeked(e.target)}
            crossOrigin="anonymous"
          >
            <source src={project.videoUrl} type="video/mp4" />
            <source src={project.videoUrl} type="video/mov" />
            <source src={project.videoUrl} type="video/quicktime" />
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
            <NavigationCarousel className="py-4">
              {cameraProjects.map((project) => (
                <div key={project.id} className="w-full sm:w-80 flex-shrink-0 px-4 sm:px-0">
                  <VideoCard 
                    project={project} 
                    aspectRatio="9/16" 
                    playButtonSize="w-16 h-16" 
                    playIconSize="w-6 h-6"
                    showInfo={true}
                  />
                </div>
              ))}
            </NavigationCarousel>
          </div>
           {/* <CarouselSpacing></CarouselSpacing> */}

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
            <NavigationCarousel className="py-4">
              {landscapeProjects.map((project) => (
                <div key={project.id} className="w-full sm:w-96 flex-shrink-0 px-4 sm:px-0">
                  <VideoCard 
                    project={project} 
                    aspectRatio="16/9" 
                    playButtonSize="w-20 h-20" 
                    playIconSize="w-8 h-8"
                    showInfo={false}
                  />
                </div>
              ))}
            </NavigationCarousel>
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
            <NavigationCarousel className="py-4">
              {phoneProjects.map((project) => (
                <div key={project.id} className="w-full sm:w-64 flex-shrink-0 px-4 sm:px-0">
                  <VideoCard 
                    project={project} 
                    aspectRatio="9/16" 
                    playButtonSize="w-16 h-16" 
                    playIconSize="w-6 h-6"
                    showInfo={true}
                  />
                </div>
              ))}
            </NavigationCarousel>
          </div>
        </div>
      </div>
    </section>
  );
}