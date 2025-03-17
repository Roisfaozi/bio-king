'use client';

import { useEffect, useRef } from 'react';

interface DecorativeElementsProps {
  variant?: 'dots' | 'lines' | 'circles' | 'squares' | 'mixed';
  color?: 'purple' | 'blue' | 'orange' | 'green' | 'pink' | 'rainbow';
  density?: 'low' | 'medium' | 'high';
  animated?: boolean;
  className?: string;
}

export function DecorativeElements({
  variant = 'dots',
  color = 'purple',
  density = 'medium',
  animated = true,
  className = '',
}: DecorativeElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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
        return 30;
      case 'medium':
        return 60;
      case 'high':
        return 100;
      default:
        return 60;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing elements
    container.innerHTML = '';

    const colors = getColors();
    const elementCount = getElementCount();
    const elements: HTMLDivElement[] = [];

    // Create elements
    for (let i = 0; i < elementCount; i++) {
      const element = document.createElement('div');

      // Random properties
      const color = colors[Math.floor(Math.random() * colors.length)];

      // Position randomly but ensure good distribution
      const left = Math.random() * 100;
      const top = Math.random() * 100;

      // Set common styles
      element.style.position = 'absolute';
      element.style.left = `${left}%`;
      element.style.top = `${top}%`;
      element.style.transform = 'translate(-50%, -50%)';

      // Set variant-specific styles
      let elementVariant = variant;
      if (variant === 'mixed') {
        const variants = ['dots', 'lines', 'circles', 'squares'];
        elementVariant = variants[Math.floor(Math.random() * variants.length)];
      }

      switch (elementVariant) {
        case 'dots':
          const dotSize = 2 + Math.random() * 4;
          element.style.width = `${dotSize}px`;
          element.style.height = `${dotSize}px`;
          element.style.backgroundColor = color;
          element.style.borderRadius = '50%';
          element.style.opacity = (0.3 + Math.random() * 0.7).toString();
          break;

        case 'lines':
          const lineLength = 20 + Math.random() * 60;
          const lineWidth = 1 + Math.random() * 2;
          const rotation = Math.random() * 180;

          element.style.width = `${lineLength}px`;
          element.style.height = `${lineWidth}px`;
          element.style.backgroundColor = color;
          element.style.opacity = (0.2 + Math.random() * 0.4).toString();
          element.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
          break;

        case 'circles':
          const circleSize = 10 + Math.random() * 30;
          const borderWidth = 1 + Math.random() * 2;

          element.style.width = `${circleSize}px`;
          element.style.height = `${circleSize}px`;
          element.style.border = `${borderWidth}px solid ${color}`;
          element.style.borderRadius = '50%';
          element.style.opacity = (0.2 + Math.random() * 0.4).toString();
          break;

        case 'squares':
          const squareSize = 5 + Math.random() * 20;
          const rotation2 = Math.random() * 45;

          element.style.width = `${squareSize}px`;
          element.style.height = `${squareSize}px`;
          element.style.backgroundColor = color;
          element.style.opacity = (0.2 + Math.random() * 0.4).toString();
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
  }, [variant, color, density, animated]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 -z-10 overflow-hidden ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}
