'use client';

import { useEffect, useRef } from 'react';

interface BubbleBackgroundProps {
  variant?: 'purple' | 'blue' | 'orange' | 'green' | 'pink' | 'rainbow';
  intensity?: 'light' | 'medium' | 'strong';
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
}

export function BubbleBackground({
  variant = 'purple',
  intensity = 'medium',
  speed = 'medium',
  className = '',
}: BubbleBackgroundProps) {
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

    // Create bubbles
    const bubbleCount = Math.floor((canvas.width * canvas.height) / 20000);
    const bubbles: Bubble[] = [];

    class Bubble {
      x: number;
      y: number;
      radius: number;
      color: { r: number; g: number; b: number };
      speedY: number;
      speedX: number;
      opacity: number;
      pulseSpeed: number;
      pulseAmount: number;
      pulsePhase: number;

      constructor() {
        this.x = Math.random() * (canvas?.width ?? 0);
        this.y = (canvas?.height ?? 0) + Math.random() * 100;
        this.radius = 5 + Math.random() * 20;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedY = (0.2 + Math.random() * 0.8) * speedFactor;
        this.speedX = (Math.random() - 0.5) * 0.5 * speedFactor;
        this.opacity = (0.2 + Math.random() * 0.6) * baseOpacity;
        this.pulseSpeed = 0.01 + Math.random() * 0.02;
        this.pulseAmount = 0.1 + Math.random() * 0.2;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update(time: number) {
        this.y -= this.speedY;
        this.x += this.speedX;

        // Reset bubble when it goes off screen
        if (this.y < -this.radius * 2) {
          this.y = (canvas?.height ?? 0) + this.radius;
          this.x = Math.random() * (canvas?.width ?? 0);
        }

        // Bounce off walls
        if (this.x < -this.radius) {
          this.x = (canvas?.width ?? 0) + this.radius;
        } else if (this.x > (canvas?.width ?? 0) + this.radius) {
          this.x = -this.radius;
        }

        // Pulse effect
        const pulseFactor =
          1 +
          Math.sin(time * this.pulseSpeed + this.pulsePhase) * this.pulseAmount;

        return pulseFactor;
      }

      draw(pulseFactor: number) {
        const radius = this.radius * pulseFactor;

        // Create gradient for bubble
        if (!ctx) return;

        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          radius,
        );

        if (gradient) {
          gradient.addColorStop(
            0,
            `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`,
          );
          gradient.addColorStop(
            0.8,
            `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.5})`,
          );
          gradient.addColorStop(
            1,
            `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`,
          );

          ctx.fillStyle = gradient;
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize bubbles
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push(new Bubble());
    }

    // Animation loop
    let animationFrame: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw bubbles
      bubbles.forEach((bubble) => {
        const pulseFactor = bubble.update(time);
        bubble.draw(pulseFactor);
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
