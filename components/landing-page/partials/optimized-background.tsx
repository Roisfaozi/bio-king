'use client';

import { getColors } from '@/components/landing-page/partials/colors/colors';
import { useEffect, useRef, useState } from 'react';
import {
  createGeometricShapes,
  drawGeometricShapes,
} from './backgrounds/geometricBackground';
import {
  createLiquidPoints,
  drawLiquidGradient,
} from './backgrounds/liquidBackground';
import { createNeonBlobs, drawNeonBlobs } from './backgrounds/neonBackground';
import {
  createParticles,
  drawParticles,
} from './backgrounds/particlesBackground';
import { createWaves, drawWaves } from './backgrounds/waveBackground';

interface OptimizedBackgroundProps {
  variant?: 'neon' | 'geometric' | 'liquid' | 'particles' | 'wave';
  color?: 'purple' | 'blue' | 'orange' | 'green' | 'pink' | 'rainbow';
  intensity?: 'light' | 'medium' | 'strong';
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
  lowPerformanceMode?: boolean;
}

export function OptimizedBackground({
  variant = 'neon',
  color = 'purple',
  intensity = 'medium',
  speed = 'medium',
  className = '',
  lowPerformanceMode = false,
}: OptimizedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [fps, setFps] = useState(60);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const lastFpsUpdateRef = useRef<number>(0);

  // Set opacity based on intensity
  const getOpacity = () => {
    switch (intensity) {
      case 'light':
        return 0.1;
      case 'medium':
        return 0.2;
      case 'strong':
        return 0.3;
      default:
        return 0.2;
    }
  };

  // Set animation speed
  const getSpeedFactor = () => {
    switch (speed) {
      case 'slow':
        return 0.5;
      case 'medium':
        return 1;
      case 'fast':
        return 1.5;
      default:
        return 1;
    }
  };

  // Determine element count based on performance mode
  const getElementCount = () => {
    if (lowPerformanceMode) {
      return 10;
    }

    return variant === 'particles' ? 30 : 15;
  };

  // Setup intersection observer to pause animation when not visible
  useEffect(() => {
    setIsMounted(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Main animation effect
  useEffect(() => {
    if (!isMounted || !isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas dimensions with device pixel ratio for sharp rendering
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = getColors(color);
    const baseOpacity = getOpacity();
    const speedFactor = getSpeedFactor();
    const elementCount = getElementCount();

    // Create elements based on variant
    let elements: any[] = [];

    switch (variant) {
      case 'neon':
        elements = createNeonBlobs(
          canvas,
          colors,
          baseOpacity,
          speedFactor,
          elementCount,
        );
        break;
      case 'geometric':
        elements = createGeometricShapes(
          canvas,
          colors,
          baseOpacity,
          speedFactor,
          elementCount,
        );
        break;
      case 'liquid':
        elements = createLiquidPoints(canvas, colors, baseOpacity, speedFactor);
        break;
      case 'particles':
        elements = createParticles(
          canvas,
          colors,
          baseOpacity,
          speedFactor,
          elementCount,
        );
        break;
      case 'wave':
        elements = createWaves(canvas, colors, baseOpacity, speedFactor);
        break;
      default:
        elements = createNeonBlobs(
          canvas,
          colors,
          baseOpacity,
          speedFactor,
          elementCount,
        );
    }

    // Animation loop with FPS monitoring and throttling
    let time = 0;
    let targetFps = lowPerformanceMode ? 30 : 60;
    let fpsInterval = 1000 / targetFps;

    const animate = (currentTime: number) => {
      // Calculate FPS
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
        lastFpsUpdateRef.current = currentTime;
      }

      const elapsed = currentTime - lastTimeRef.current;

      // Only render if enough time has passed (for consistent animation speed)
      if (elapsed > fpsInterval) {
        // Adjust time step based on elapsed time
        const timeStep = elapsed * 0.001 * speedFactor;
        time += timeStep;

        lastTimeRef.current = currentTime - (elapsed % fpsInterval);
        frameCountRef.current++;

        // Update FPS counter every second
        if (currentTime - lastFpsUpdateRef.current >= 1000) {
          const fps = Math.round(
            (frameCountRef.current * 1000) /
              (currentTime - lastFpsUpdateRef.current),
          );
          setFps(fps);
          frameCountRef.current = 0;
          lastFpsUpdateRef.current = currentTime;

          // Adjust target FPS if performance is poor
          if (fps < 30 && targetFps > 30) {
            targetFps = 30;
            fpsInterval = 1000 / targetFps;
          }
        }

        // Clear canvas
        ctx.clearRect(
          0,
          0,
          canvas.width / (window.devicePixelRatio || 1),
          canvas.height / (window.devicePixelRatio || 1),
        );

        // Draw based on variant
        switch (variant) {
          case 'neon':
            drawNeonBlobs(ctx, elements, time);
            break;
          case 'geometric':
            drawGeometricShapes(ctx, elements, time);
            break;
          case 'liquid':
            drawLiquidGradient(
              ctx,
              canvas,
              elements,
              colors,
              baseOpacity,
              time,
            );
            break;
          case 'particles':
            drawParticles(ctx, elements, time);
            break;
          case 'wave':
            drawWaves(ctx, canvas, elements, colors, baseOpacity, time);
            break;
        }
      }

      if (isVisible) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [
    variant,
    color,
    intensity,
    speed,
    isMounted,
    isVisible,
    lowPerformanceMode,
  ]);

  return (
    <div className='relative'>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 z-0 ${className}`}
        style={{ pointerEvents: 'none', opacity: 0.8 }}
      />
      {process.env.NODE_ENV === 'development' && (
        <div className='absolute bottom-2 right-2 rounded-md bg-black/30 px-2 py-1 text-xs text-white/50'>
          {fps} FPS
        </div>
      )}
    </div>
  );
}
