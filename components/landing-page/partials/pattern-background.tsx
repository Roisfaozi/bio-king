'use client';

import { useEffect, useRef } from 'react';

interface PatternBackgroundProps {
  variant?: 'dots' | 'grid' | 'hexagons' | 'triangles' | 'circles';
  color?: 'purple' | 'blue' | 'orange' | 'green' | 'pink';
  intensity?: 'light' | 'medium' | 'strong';
  animated?: boolean;
  className?: string;
}

export function PatternBackground({
  variant = 'dots',
  color = 'purple',
  intensity = 'medium',
  animated = true,
  className = '',
}: PatternBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Get color based on variant
  const getColor = () => {
    switch (color) {
      case 'purple':
        return { r: 124, g: 58, b: 237 }; // #7c3aed
      case 'blue':
        return { r: 59, g: 130, b: 246 }; // #3b82f6
      case 'orange':
        return { r: 249, g: 115, b: 22 }; // #f97316
      case 'green':
        return { r: 16, g: 185, b: 129 }; // #10b981
      case 'pink':
        return { r: 236, g: 72, b: 153 }; // #ec4899
      default:
        return { r: 124, g: 58, b: 237 };
    }
  };

  // Set opacity based on intensity
  const getOpacity = () => {
    switch (intensity) {
      case 'light':
        return 0.05;
      case 'medium':
        return 0.1;
      case 'strong':
        return 0.15;
      default:
        return 0.1;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const color = getColor();
    const opacity = getOpacity();

    // Pattern parameters
    const patternSize = variant === 'dots' ? 20 : 40;
    let offset = 0;

    // Draw pattern based on variant
    const drawPattern = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rows = Math.ceil(canvas.height / patternSize) + 1;
      const cols = Math.ceil(canvas.width / patternSize) + 1;

      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;

      switch (variant) {
        case 'dots':
          for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
              const xPos = x * patternSize;
              const yPos = y * patternSize;
              const size = 2;

              // Apply animation offset if enabled
              const animatedYPos = animated
                ? yPos + Math.sin(x / 5 + offset) * 5
                : yPos;

              ctx.beginPath();
              ctx.arc(xPos, animatedYPos, size, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          break;

        case 'grid':
          for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
              const xPos = x * patternSize;
              const yPos = y * patternSize;

              // Apply animation offset if enabled
              const animatedXPos = animated
                ? xPos + Math.sin(y / 5 + offset) * 3
                : xPos;
              const animatedYPos = animated
                ? yPos + Math.cos(x / 5 + offset) * 3
                : yPos;

              ctx.beginPath();
              ctx.moveTo(animatedXPos - 5, animatedYPos);
              ctx.lineTo(animatedXPos + 5, animatedYPos);
              ctx.moveTo(animatedXPos, animatedYPos - 5);
              ctx.lineTo(animatedXPos, animatedYPos + 5);
              ctx.stroke();
            }
          }
          break;

        case 'hexagons':
          const hexSize = patternSize / 2;
          for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
              const xPos = x * patternSize * 1.5;
              const yPos =
                y * patternSize * Math.sqrt(3) +
                (x % 2 === 0 ? 0 : (patternSize * Math.sqrt(3)) / 2);

              // Apply animation offset if enabled
              const animatedXPos = animated
                ? xPos + Math.sin(y / 3 + offset) * 5
                : xPos;
              const animatedYPos = animated
                ? yPos + Math.cos(x / 3 + offset) * 5
                : yPos;

              ctx.beginPath();
              for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i;
                const hx = animatedXPos + hexSize * Math.cos(angle);
                const hy = animatedYPos + hexSize * Math.sin(angle);

                if (i === 0) {
                  ctx.moveTo(hx, hy);
                } else {
                  ctx.lineTo(hx, hy);
                }
              }
              ctx.closePath();
              ctx.stroke();
            }
          }
          break;

        case 'triangles':
          const triSize = patternSize / 2;
          for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
              const xPos = x * patternSize;
              const yPos = y * patternSize;

              // Apply animation offset if enabled
              const animatedXPos = animated
                ? xPos + Math.sin(y / 4 + offset) * 4
                : xPos;
              const animatedYPos = animated
                ? yPos + Math.cos(x / 4 + offset) * 4
                : yPos;

              ctx.beginPath();
              ctx.moveTo(animatedXPos, animatedYPos - triSize);
              ctx.lineTo(animatedXPos - triSize, animatedYPos + triSize);
              ctx.lineTo(animatedXPos + triSize, animatedYPos + triSize);
              ctx.closePath();
              ctx.stroke();
            }
          }
          break;

        case 'circles':
          for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
              const xPos = x * patternSize;
              const yPos = y * patternSize;
              const size = patternSize / 4;

              // Apply animation offset if enabled
              const animatedXPos = animated
                ? xPos + Math.sin(y / 3 + offset) * 3
                : xPos;
              const animatedYPos = animated
                ? yPos + Math.cos(x / 3 + offset) * 3
                : yPos;

              ctx.beginPath();
              ctx.arc(animatedXPos, animatedYPos, size, 0, Math.PI * 2);
              ctx.stroke();
            }
          }
          break;
      }
    };

    // Animation loop
    let animationFrame: number;

    const animate = () => {
      if (animated) {
        offset += 0.01;
        drawPattern();
      }

      animationFrame = requestAnimationFrame(animate);
    };

    // Initial draw
    drawPattern();

    // Start animation if enabled
    if (animated) {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animated) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [variant, color, intensity, animated]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 -z-10 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}
