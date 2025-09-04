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
import { InfiniteSlider } from '@/components/ui/infinite-slider';

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
    category: "advertisemnt"
  },
  {
    id: 2,
    title: "martini bistro",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1756980662/IMG_6222_ju6qel.mov",
    category: "food"
  },
  {
    id: 3,
    title: "Martini bistro ",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1756980654/IMG_6203_faaqio.mov",
    category: "Food"
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
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1756980654/IMG_6203_faaqio.mov",
    category: "Travel"
  }
];

// Phone video projects
const phoneProjects = [
  {
    id: 6,
    title: "Creative Reel 1",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1756981631/IMG_8452_hq8qpv.mov",
    category: "Social Media"
  },
  {
    id: 7,
    title: "Creative Reel 1",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1756981624/IMG_8451_il5gpt.mov",
    category: "Social Media"
  },
  {
    id: 8,
    title: "Creative Reel 1",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1756980647/IMG_6529_yyc0rh.mov",
    category: "Social Media"
  },
  {
    id: 9,
    title: "Creative Reel 1",
    videoUrl: "https://res.cloudinary.com/da8mfzgxw/video/upload/v1756981616/IMG_8450_n3dddy.mov",
    category: "Social Media"
  },
  
];

export default function MyWorkSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cameraGridRef = useRef(null);
  const phoneGridRef = useRef(null);
  const [playingVideos, setPlayingVideos] = useState(new Set());

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
            <InfiniteSlider
              gap={24}
              speed={playingVideos.size > 0 ? 0 : 50}
              speedOnHover={playingVideos.size > 0 ? 0 : 20}
              className="py-4"
            >
              {cameraProjects.map((project, index) => (
                <div key={project.id} className="w-80 flex-shrink-0">
                  <Card className="relative aspect-[9/16] bg-gray-900 border-gray-800 overflow-hidden">
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
                      >
                        <source src={project.videoUrl} type="video/mp4" />
                      </video>

                      {/* Overlay - Hidden when playing */}
                      {!playingVideos.has(project.id) && (
                        <div className="absolute inset-0 bg-black/40" />
                      )}

                      {/* Play Button - Hidden when playing */}
                      {!playingVideos.has(project.id) && (
                        <button
                          onClick={(e) => {
                            const video = e.currentTarget.parentElement.querySelector('video');
                            handlePlayClick(video, project.id);
                          }}
                          className="absolute inset-0 flex items-center justify-center cursor-pointer"
                        >
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200">
                            <Play className="w-6 h-6 text-white ml-1" />
                          </div>
                        </button>
                      )}

                      {/* Project Info - Hidden when playing */}
                      {!playingVideos.has(project.id) && (
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
                </div>
              ))}
            </InfiniteSlider>
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
              Dynamic content creation using mobile technology for social media and creative storytelling.
            </p>
          </motion.div>

          <div ref={phoneGridRef}>
            <InfiniteSlider
              gap={20}
              speed={playingVideos.size > 0 ? 0 : 60}
              speedOnHover={playingVideos.size > 0 ? 0 : 25}
              reverse={true}
              className="py-4"
            >
              {phoneProjects.map((project, index) => (
                <div key={project.id} className="w-64 flex-shrink-0">
                   <Card className="relative aspect-[9/16] bg-gray-900 border-gray-800 overflow-hidden">
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
                      >
                        <source src={project.videoUrl} type="video/mp4" />
                      </video>

                      {/* Overlay - Hidden when playing */}
                      {!playingVideos.has(project.id) && (
                        <div className="absolute inset-0 bg-black/40" />
                      )}

                      {/* Play Button - Hidden when playing */}
                      {!playingVideos.has(project.id) && (
                        <button
                          onClick={(e) => {
                            const video = e.currentTarget.parentElement.querySelector('video');
                            handlePlayClick(video, project.id);
                          }}
                          className="absolute inset-0 flex items-center justify-center cursor-pointer"
                        >
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200">
                            <Play className="w-6 h-6 text-white ml-1" />
                          </div>
                        </button>
                      )}

                      {/* Project Info - Hidden when playing */}
                      {!playingVideos.has(project.id) && (
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
                </div>
              ))}
            </InfiniteSlider>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-400 mb-6">
            Interested in working together?
          </p>
          <Button
            onClick={scrollToContact}
            className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300 font-medium"
          >
            Let's Create Something Amazing
          </Button>
        </motion.div>
      </div>
    </section>
  );
}