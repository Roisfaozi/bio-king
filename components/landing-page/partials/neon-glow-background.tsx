'use client';

import { useEffect, useRef } from 'react';

interface NeonGlowBackgroundProps {
  variant?: 'purple' | 'blue' | 'orange' | 'green' | 'pink' | 'rainbow';
  intensity?: 'light' | 'medium' | 'strong';
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
}

export function NeonGlowBackground({
  variant = 'purple',
  intensity = 'medium',
  speed = 'medium',
  className = '',
}: NeonGlowBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Get colors based on variant
  const getColors = () => {
    switch (variant) {
      case 'purple':
        return [
          { r: 124, g: 58, b: 237 }, // #7c3aed
          { r: 192, g: 38, b: 211 }, // #c026d3
        ];
      case 'blue':
        return [
          { r: 59, g: 130, b: 246 }, // #3b82f6
          { r: 99, g: 102, b: 241 }, // #6366f1
        ];
      case 'orange':
        return [
          { r: 249, g: 115, b: 22 }, // #f97316
          { r: 239, g: 68, b: 68 }, // #ef4444
        ];
      case 'green':
        return [
          { r: 16, g: 185, b: 129 }, // #10b981
          { r: 20, g: 184, b: 166 }, // #14b8a6
        ];
      case 'pink':
        return [
          { r: 236, g: 72, b: 153 }, // #ec4899
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
        return 0.4;
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

    // Create neon blobs
    const blobCount = variant === 'rainbow' ? colors.length : 5;
    const blobs: NeonBlob[] = [];

    class NeonBlob {
      x: number;
      y: number;
      radius: number;
      color: { r: number; g: number; b: number };
      angle: number;
      speed: number;
      range: number;
      pulseSpeed: number;
      pulseAmount: number;
      pulsePhase: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = 100 + Math.random() * 150;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = Math.random() * Math.PI * 2;
        this.speed = (0.0005 + Math.random() * 0.001) * speedFactor;
        this.range = 100 + Math.random() * 100;
        this.pulseSpeed = 0.005 + Math.random() * 0.01;
        this.pulseAmount = 0.2 + Math.random() * 0.3;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.opacity = (0.3 + Math.random() * 0.7) * baseOpacity;
      }

      update(time: number) {
        // Move in a circular pattern
        this.x += Math.cos(this.angle) * this.speed * time;
        this.y += Math.sin(this.angle) * this.speed * time;

        // Change direction slightly over time
        this.angle += (Math.random() - 0.5) * 0.01;

        // Wrap around edges with some padding
        const padding = this.radius;
        if (this.x < -padding) this.x = canvas.width + padding;
        else if (this.x > canvas.width + padding) this.x = -padding;
        if (this.y < -padding) this.y = canvas.height + padding;
        else if (this.y > canvas.height + padding) this.y = -padding;

        // Pulse effect
        const pulseFactor =
          1 +
          Math.sin(time * this.pulseSpeed + this.pulsePhase) * this.pulseAmount;

        return pulseFactor;
      }

      draw(pulseFactor: number) {
        const radius = this.radius * pulseFactor;

        // Create gradient for neon glow
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          radius,
        );

        gradient.addColorStop(
          0,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`,
        );
        gradient.addColorStop(
          0.5,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.5})`,
        );
        gradient.addColorStop(
          1,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`,
        );

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize blobs
    for (let i = 0; i < blobCount; i++) {
      blobs.push(new NeonBlob());
    }

    // Animation loop
    let animationFrame: number;
    let time = 0;

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw blobs
      blobs.forEach((blob) => {
        const pulseFactor = blob.update(time);
        blob.draw(pulseFactor);
      });

      // Apply composite operation for glow effect
      ctx.globalCompositeOperation = 'screen';

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
