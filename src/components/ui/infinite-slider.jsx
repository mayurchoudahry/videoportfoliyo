'use client';
import { cn } from '@/lib/utils';
import { useMotionValue, animate, motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
  paused = false
}) {
  const [currentSpeed, setCurrentSpeed] = useState(paused ? 0 : speed);
  const ref = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  // Measure container dimensions
  useEffect(() => {
    const measureElement = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    measureElement();
    window.addEventListener('resize', measureElement);
    return () => window.removeEventListener('resize', measureElement);
  }, [children]);

  // Update speed when paused prop changes
  useEffect(() => {
    if (paused) {
      setIsTransitioning(true);
      setCurrentSpeed(0);
    } else {
      setIsTransitioning(true);
      setCurrentSpeed(speed);
    }
  }, [paused, speed]);

  useEffect(() => {
    let controls;
    const { width, height } = dimensions;
    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    const distanceToTravel = Math.abs(to - from);
    const duration = currentSpeed > 0 ? distanceToTravel / currentSpeed : 0;

    if (currentSpeed === 0) {
      // When paused, stop all animations
      return;
    }

    if (isTransitioning) {
      const remainingDistance = Math.abs(translation.get() - to);
      const transitionDuration = remainingDistance / currentSpeed;

      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration: transitionDuration,
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: duration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return controls?.stop;
  }, [
    key,
    translation,
    currentSpeed,
    dimensions,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);

  const hoverProps = speedOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speedOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speed);
        },
      }
    : {};

  return (
    (<div className={cn('overflow-hidden', className)}>
      <motion.div
        className='flex w-max'
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...hoverProps}>
        {children}
        {children}
      </motion.div>
    </div>)
  );
}
