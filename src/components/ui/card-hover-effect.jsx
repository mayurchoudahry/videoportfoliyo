"use client"
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const HoverEffect = ({
  items,
  className
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const getVisibleItems = () => {
    if (items.length <= 2) return items;
    
    const secondIndex = (currentIndex + 1) % items.length;
    return [items[currentIndex], items[secondIndex]];
  };

  const visibleItems = getVisibleItems();

  return (
    <div className={cn("relative w-full", className)}>
      {/* Responsive Card Display */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            {/* Single card on mobile/tablet, two cards on lg+ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {visibleItems.map((item, index) => (
                <div 
                  key={`${currentIndex}-${index}`}
                  className={cn(
                    "w-full",
                    // Hide second card on smaller screens
                    index === 1 && "hidden lg:block"
                  )}
                >
                  <a
                    href={item?.link}
                    className="relative group block h-full w-full"
                  >
                    <Card>
                      <CardMedia item={item} />
                      <CardContent>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                        <div className="flex justify-between items-center mt-3">
                          {item.year && <CardYear>{item.year}</CardYear>}
                          {item.turnaroundTime && <TurnAroundTime>{item.turnaroundTime}</TurnAroundTime>}
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons - Below and to the right */}
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={prevSlide}
          className="p-2 bg-white/5 border border-white/10 rounded-full text-sm text-white hover:bg-white/10 transition-colors duration-300"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 bg-white/5 border border-white/10 rounded-full text-sm text-white hover:bg-white/10 transition-colors duration-300"
          aria-label="Next project"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};

export const Card = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        "rounded-3xl h-full w-full overflow-hidden bg-black group-hover:bg-black border border-white/10 relative z-20 aspect-[5/4] md:aspect-[3/2] lg:aspect-[5/4] transition-all duration-300 ease-in-out",
        className
      )}>
      <div className="relative z-50 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export const CardMedia = ({ item }) => {
  return (
    <div className="relative flex-1 overflow-hidden">
      {item.mediaType === 'video' ? (
        <video
          src={item.media || item.video}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <Image
          src={item.media || item.image || '/api/placeholder/400/500'}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
    </div>
  );
};

export const CardContent = ({
  className,
  children
}) => {
  return (
    <div className={cn("p-6 bg-transparent", className)}>
      {children}
    </div>
  );
};
export const CardTitle = ({
  className,
  children
}) => {
  return (
    <h3 className={cn("text-white group-hover:text-gray-100 font-medium text-xl mb-1 transition-colors duration-300", className)}>
      {children}
    </h3>
  );
};

export const CardDescription = ({
  className,
  children
}) => {
  return (
    <p className={cn("text-gray-400 group-hover:text-gray-300 text-sm transition-colors duration-300", className)}>
      {children}
    </p>
  );
};

export const CardYear = ({
  className,
  children
}) => {
  return (
    <span className={cn("text-white group-hover:text-gray-100 text-sm float-right transition-colors duration-300", className)}>
      {children}
    </span>
  );
};

export const TurnAroundTime = ({
  className,
  children
}) => {
  return (
    <span className={cn("text-white group-hover:text-gray-100 text-sm float-right transition-colors duration-300", className)}>
      {children}
    </span>
  );
};
