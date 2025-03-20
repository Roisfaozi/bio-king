'use client';

import { useEffect, useRef } from 'react';

interface FloatingElementsBackgroundProps {
  variant?: 'purple' | 'blue' | 'orange' | 'green' | 'pink' | 'rainbow';
  intensity?: 'light' | 'medium' | 'strong';
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
}

export function FloatingElementsBackground({
  variant = 'purple',
  intensity = 'medium',
  speed = 'medium',
  className = '',
}: FloatingElementsBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Get colors based on variant
  const getColors = () => {
    switch (variant) {
      case 'purple':
        return [
          '#7c3aed', // purple-600
          '#8b5cf6', // purple-500
          '#c026d3', // fuchsia-600
        ];
      case 'blue':
        return [
          '#3b82f6', // blue-500
          '#0ea5e9', // sky-500
          '#6366f1', // indigo-500
        ];
      case 'orange':
        return [
          '#f97316', // orange-500
          '#f59e0b', // amber-500
          '#ef4444', // red-500
        ];
      case 'green':
        return [
          '#10b981', // emerald-500
          '#059669', // emerald-600
          '#14b8a6', // teal-500
        ];
      case 'pink':
        return [
          '#ec4899', // pink-500
          '#d946ef', // fuchsia-500
          '#f472b6', // pink-400
        ];
      case 'rainbow':
        return [
          '#ef4444', // red-500
          '#f97316', // orange-500
          '#eab308', // yellow-500
          '#10b981', // emerald-500
          '#3b82f6', // blue-500
          '#8b5cf6', // violet-500
          '#d946ef', // fuchsia-500
        ];
      default:
        return [
          '#7c3aed', // purple-600
          '#8b5cf6', // purple-500
          '#c026d3', // fuchsia-600
        ];
    }
  };

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
        return 2;
      case 'medium':
        return 1;
      case 'fast':
        return 0.5;
      default:
        return 1;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing elements
    container.innerHTML = '';

    const colors = getColors();
    const baseOpacity = getOpacity();
    const speedFactor = getSpeedFactor();

    // Create floating elements
    const elementCount = 20;
    const elements: HTMLDivElement[] = [];

    // Create elements
    for (let i = 0; i < elementCount; i++) {
      const element = document.createElement('div');

      // Random properties
      const size = 30 + Math.random() * 100;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = (0.3 + Math.random() * 0.7) * baseOpacity;
      const shape = Math.random() > 0.5 ? 'circle' : 'square';
      const blur = 10 + Math.random() * 20;

      // Position randomly
      const left = Math.random() * 100;
      const top = Math.random() * 100;

      // Animation properties
      const duration = (10 + Math.random() * 20) * speedFactor;
      const delay = Math.random() * 5;

      // Set styles
      element.style.position = 'absolute';
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.backgroundColor = color;
      element.style.opacity = opacity.toString();
      element.style.borderRadius = shape === 'circle' ? '50%' : '20%';
      element.style.filter = `blur(${blur}px)`;
      element.style.left = `${left}%`;
      element.style.top = `${top}%`;
      element.style.animation = `floating ${duration}s ease-in-out ${delay}s infinite`;
      element.style.transform = 'translateZ(0)';
      element.style.willChange = 'transform';

      // Add to container
      container.appendChild(element);
      elements.push(element);
    }

    // Add some smaller particles
    for (let i = 0; i < elementCount * 2; i++) {
      const element = document.createElement('div');

      // Random properties
      const size = 5 + Math.random() * 15;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = (0.3 + Math.random() * 0.7) * baseOpacity;

      // Position randomly
      const left = Math.random() * 100;
      const top = Math.random() * 100;

      // Animation properties
      const duration = (5 + Math.random() * 10) * speedFactor;
      const delay = Math.random() * 5;

      // Set styles
      element.style.position = 'absolute';
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.backgroundColor = color;
      element.style.opacity = opacity.toString();
      element.style.borderRadius = '50%';
      element.style.filter = `blur(${size / 4}px)`;
      element.style.left = `${left}%`;
      element.style.top = `${top}%`;
      element.style.animation = `floating ${duration}s ease-in-out ${delay}s infinite, pulse 3s ease-in-out ${delay}s infinite`;
      element.style.transform = 'translateZ(0)';
      element.style.willChange = 'transform';

      // Add to container
      container.appendChild(element);
      elements.push(element);
    }

    return () => {
      // Clean up
      elements.forEach((element) => {
        if (element.parentNode === container) {
          container.removeChild(element);
        }
      });
    };
  }, [variant, intensity, speed]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 -z-10 overflow-hidden ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}
