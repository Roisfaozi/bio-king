'use client';

import { useEffect, useRef, useState } from 'react';

interface DecorativeElementsOptimizedProps {
  variant?: 'dots' | 'lines' | 'circles' | 'squares' | 'mixed';
  color?: 'purple' | 'blue' | 'orange' | 'green' | 'pink' | 'rainbow';
  density?: 'low' | 'medium' | 'high';
  animated?: boolean;
  className?: string;
}

export function DecorativeElementsOptimized({
  variant = 'dots',
  color = 'purple',
  density = 'medium',
  animated = true,
  className = '',
}: DecorativeElementsOptimizedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Get colors based on color prop
  const getColors = () => {
    switch (color) {
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

  // Set element count based on density
  const getElementCount = () => {
    switch (density) {
      case 'low':
        return 20;
      case 'medium':
        return 40;
      case 'high':
        return 70;
      default:
        return 40;
    }
  };

  // Setup intersection observer to only render when visible
  useEffect(() => {
    setIsMounted(true);

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Create and manage decorative elements
  useEffect(() => {
    if (!isMounted || !isVisible) return;

    const container = containerRef.current;
    if (!container) return;

    // Clear any existing elements
    container.innerHTML = '';

    const colors = getColors();
    const elementCount = getElementCount();
    const elements: HTMLDivElement[] = [];

    // Limit the number of elements based on screen size
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const screenArea = screenWidth * screenHeight;
    const scaleFactor = Math.min(1, screenArea / (1920 * 1080));
    const adjustedCount = Math.floor(elementCount * scaleFactor);

    // Create elements
    for (let i = 0; i < adjustedCount; i++) {
      const element = document.createElement('div');

      // Random properties
      const color = colors[Math.floor(Math.random() * colors.length)];

      // Position randomly but ensure good distribution
      // Use a grid-based approach to ensure better distribution
      const gridSize = Math.ceil(Math.sqrt(adjustedCount));
      const cellWidth = 100 / gridSize;
      const cellHeight = 100 / gridSize;

      const gridX = i % gridSize;
      const gridY = Math.floor(i / gridSize);

      // Add some randomness within the cell
      const left = gridX * cellWidth + Math.random() * cellWidth * 0.8;
      const top = gridY * cellHeight + Math.random() * cellHeight * 0.8;

      // Set common styles
      element.style.position = 'absolute';
      element.style.left = `${left}%`;
      element.style.top = `${top}%`;
      element.style.transform = 'translate(-50%, -50%)';
      element.style.willChange = 'transform, opacity';
      element.style.pointerEvents = 'none';

      // Set variant-specific styles
      let elementVariant = variant;
      if (variant === 'mixed') {
        const variants = ['dots', 'lines', 'circles', 'squares'];
        elementVariant = variants[Math.floor(Math.random() * variants.length)];
      }

      switch (elementVariant) {
        case 'dots':
          const dotSize = 2 + Math.random() * 3;
          element.style.width = `${dotSize}px`;
          element.style.height = `${dotSize}px`;
          element.style.backgroundColor = color;
          element.style.borderRadius = '50%';
          element.style.opacity = (0.2 + Math.random() * 0.5).toString();
          break;

        case 'lines':
          const lineLength = 15 + Math.random() * 30;
          const lineWidth = 1 + Math.random() * 1;
          const rotation = Math.random() * 180;

          element.style.width = `${lineLength}px`;
          element.style.height = `${lineWidth}px`;
          element.style.backgroundColor = color;
          element.style.opacity = (0.1 + Math.random() * 0.3).toString();
          element.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
          break;

        case 'circles':
          const circleSize = 8 + Math.random() * 20;
          const borderWidth = 1 + Math.random() * 1;

          element.style.width = `${circleSize}px`;
          element.style.height = `${circleSize}px`;
          element.style.border = `${borderWidth}px solid ${color}`;
          element.style.borderRadius = '50%';
          element.style.opacity = (0.1 + Math.random() * 0.3).toString();
          break;

        case 'squares':
          const squareSize = 4 + Math.random() * 12;
          const rotation2 = Math.random() * 45;

          element.style.width = `${squareSize}px`;
          element.style.height = `${squareSize}px`;
          element.style.backgroundColor = color;
          element.style.opacity = (0.1 + Math.random() * 0.3).toString();
          element.style.transform = `translate(-50%, -50%) rotate(${rotation2}deg)`;
          break;
      }

      // Add animation if enabled
      if (animated) {
        const animationType = Math.random() > 0.5 ? 'pulse' : 'float';
        const duration = 3 + Math.random() * 7;
        const delay = Math.random() * 5;

        element.style.animation = `${animationType} ${duration}s ease-in-out ${delay}s infinite`;
      }

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
  }, [variant, color, density, animated, isMounted, isVisible]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 -z-10 overflow-hidden ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}
