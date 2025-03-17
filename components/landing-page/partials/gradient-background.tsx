'use client';

import { useEffect, useRef } from 'react';

interface GradientBackgroundProps {
  variant?: 'purple' | 'blue' | 'orange' | 'green' | 'pink' | 'rainbow';
  intensity?: 'light' | 'medium' | 'strong';
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
}

export function GradientBackground({
  variant = 'purple',
  intensity = 'medium',
  speed = 'medium',
  className = '',
}: GradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Get colors based on variant
  const getColors = () => {
    switch (variant) {
      case 'purple':
        return [
          { r: 124, g: 58, b: 237 }, // #7c3aed
          { r: 139, g: 92, b: 246 }, // #8b5cf6
          { r: 192, g: 38, b: 211 }, // #c026d3
        ];
      case 'blue':
        return [
          { r: 59, g: 130, b: 246 }, // #3b82f6
          { r: 14, g: 165, b: 233 }, // #0ea5e9
          { r: 99, g: 102, b: 241 }, // #6366f1
        ];
      case 'orange':
        return [
          { r: 249, g: 115, b: 22 }, // #f97316
          { r: 245, g: 158, b: 11 }, // #f59e0b
          { r: 239, g: 68, b: 68 }, // #ef4444
        ];
      case 'green':
        return [
          { r: 16, g: 185, b: 129 }, // #10b981
          { r: 5, g: 150, b: 105 }, // #059669
          { r: 20, g: 184, b: 166 }, // #14b8a6
        ];
      case 'pink':
        return [
          { r: 236, g: 72, b: 153 }, // #ec4899
          { r: 217, g: 70, b: 239 }, // #d946ef
          { r: 244, g: 114, b: 182 }, // #f472b6
        ];
      case 'rainbow':
        return [
          { r: 239, g: 68, b: 68 }, // #ef4444 (red)
          { r: 245, g: 158, b: 11 }, // #f59e0b (orange)
          { r: 234, g: 179, b: 8 }, // #eab308 (yellow)
          { r: 16, g: 185, b: 129 }, // #10b981 (green)
          { r: 59, g: 130, b: 246 }, // #3b82f6 (blue)
          { r: 139, g: 92, b: 246 }, // #8b5cf6 (indigo)
          { r: 217, g: 70, b: 239 }, // #d946ef (purple)
        ];
      default:
        return [
          { r: 124, g: 58, b: 237 },
          { r: 139, g: 92, b: 246 },
          { r: 192, g: 38, b: 211 },
        ];
    }
  };

  // Set opacity based on intensity
  const getOpacity = () => {
    switch (intensity) {
      case 'light':
        return 0.15;
      case 'medium':
        return 0.25;
      case 'strong':
        return 0.35;
      default:
        return 0.25;
    }
  };

  // Set animation speed
  const getSpeedFactor = () => {
    switch (speed) {
      case 'slow':
        return 0.001;
      case 'medium':
        return 0.002;
      case 'fast':
        return 0.004;
      default:
        return 0.002;
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

    const colors = getColors();
    const opacity = getOpacity();
    const speedFactor = getSpeedFactor();

    // Create gradient blobs
    const blobs = colors.map((color, index) => {
      return {
        x: (canvas.width * (index + 1)) / (colors.length + 1),
        y: canvas.height * (0.3 + Math.random() * 0.4),
        radius:
          Math.min(canvas.width, canvas.height) * (0.15 + Math.random() * 0.15),
        color: { ...color },
        angle: Math.random() * Math.PI * 2,
        speed: speedFactor * (0.8 + Math.random() * 0.4),
        range: Math.min(canvas.width, canvas.height) * 0.15,
      };
    });

    // Animation loop
    let animationFrame: number;
    let time = 0;

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw blobs
      blobs.forEach((blob) => {
        // Move blob in a circular pattern
        blob.x =
          blob.x + Math.cos(blob.angle + time * blob.speed) * blob.range * 0.02;
        blob.y =
          blob.y + Math.sin(blob.angle + time * blob.speed) * blob.range * 0.02;

        // Draw gradient blob
        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius,
        );

        gradient.addColorStop(
          0,
          `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${opacity})`,
        );
        gradient.addColorStop(
          1,
          `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0)`,
        );

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, [variant, intensity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 -z-10 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}
