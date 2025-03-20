'use client';

import { useEffect, useRef } from 'react';

interface LiquidGradientBackgroundProps {
  variant?: 'purple' | 'blue' | 'orange' | 'green' | 'pink' | 'rainbow';
  intensity?: 'light' | 'medium' | 'strong';
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
}

export function LiquidGradientBackground({
  variant = 'purple',
  intensity = 'medium',
  speed = 'medium',
  className = '',
}: LiquidGradientBackgroundProps) {
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
        return 0.5;
      case 'medium':
        return 1;
      case 'fast':
        return 2;
      default:
        return 1;
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
    const baseOpacity = getOpacity();
    const speedFactor = getSpeedFactor();

    // Create control points for Bezier curves
    const pointCount = 8;
    const points: Point[] = [];

    class Point {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      offsetX: number;
      offsetY: number;
      angleX: number;
      angleY: number;
      speedX: number;
      speedY: number;

      constructor(index: number) {
        // Position points evenly around the canvas
        const slice = (Math.PI * 2) / pointCount;
        const angle = slice * index;
        // Position points outside the canvas for a full-screen effect
        const radius = Math.max(canvas?.width || 0, canvas?.height || 0) * 0.7;

        this.baseX = (canvas?.width || 0) / 2 + Math.cos(angle) * radius;
        this.baseY = (canvas?.height || 0) / 2 + Math.sin(angle) * radius;

        this.x = this.baseX;
        this.y = this.baseY;

        // Random movement parameters
        this.offsetX = 100 + Math.random() * 100;
        this.offsetY = 100 + Math.random() * 100;
        this.angleX = Math.random() * Math.PI * 2;
        this.angleY = Math.random() * Math.PI * 2;
        this.speedX = (0.001 + Math.random() * 0.002) * speedFactor;
        this.speedY = (0.001 + Math.random() * 0.002) * speedFactor;
      }

      update(time: number) {
        // Move points in a sinusoidal pattern
        this.x =
          this.baseX +
          Math.sin(time * this.speedX + this.angleX) * this.offsetX;
        this.y =
          this.baseY +
          Math.sin(time * this.speedY + this.angleY) * this.offsetY;
      }
    }

    // Initialize points
    for (let i = 0; i < pointCount; i++) {
      points.push(new Point(i));
    }

    // Animation loop
    let animationFrame: number;
    let time = 0;

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update points
      points.forEach((point) => {
        point.update(time);
      });

      // Draw gradient background
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height,
      );

      if (variant === 'rainbow') {
        // For rainbow, use all colors
        colors.forEach((color, index) => {
          gradient.addColorStop(
            index / (colors.length - 1),
            `rgba(${color.r}, ${color.g}, ${color.b}, ${baseOpacity})`,
          );
        });
      } else {
        // For other variants, create a smooth gradient
        gradient.addColorStop(
          0,
          `rgba(${colors[0].r}, ${colors[0].g}, ${colors[0].b}, ${baseOpacity})`,
        );
        gradient.addColorStop(
          0.5,
          `rgba(${colors[1].r}, ${colors[1].g}, ${colors[1].b}, ${baseOpacity})`,
        );
        gradient.addColorStop(
          1,
          `rgba(${colors[2].r}, ${colors[2].g}, ${colors[2].b}, ${baseOpacity})`,
        );
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw liquid shapes
      for (let i = 0; i < colors.length; i++) {
        const color = colors[i];
        const opacity = baseOpacity * 0.8;

        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;

        // Draw a closed Bezier curve
        ctx.beginPath();

        // Start at the first point
        ctx.moveTo(points[0].x, points[0].y);

        // Draw curves between points
        for (let j = 0; j < points.length; j++) {
          const current = points[j];
          const next = points[(j + 1) % points.length];

          // Calculate control points for smooth curves
          const cpX1 = current.x + (next.x - current.x) * 0.3;
          const cpY1 = current.y + (next.y - current.y) * 0.1;
          const cpX2 = current.x + (next.x - current.x) * 0.7;
          const cpY2 = current.y + (next.y - current.y) * 0.9;

          // Draw the curve
          ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, next.x, next.y);
        }

        ctx.closePath();
        ctx.fill();

        // Offset points for the next color layer
        points.forEach((point) => {
          point.baseX += 50;
          point.baseY += 50;
        });
      }

      // Reset point positions for the next frame
      points.forEach((point, index) => {
        const slice = (Math.PI * 2) / pointCount;
        const angle = slice * index;
        const radius = Math.max(canvas.width, canvas.height) * 0.7;

        point.baseX = canvas.width / 2 + Math.cos(angle) * radius;
        point.baseY = canvas.height / 2 + Math.sin(angle) * radius;
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
