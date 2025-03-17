'use client';

import { useEffect, useRef, useState } from 'react';

interface InteractiveBackgroundProps {
  variant?: 'purple' | 'blue' | 'orange' | 'green' | 'pink' | 'rainbow';
  intensity?: 'light' | 'medium' | 'strong';
  className?: string;
}

export function InteractiveBackground({
  variant = 'purple',
  intensity = 'medium',
  className = '',
}: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInCanvas, setIsMouseInCanvas] = useState(false);

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
        return 0.1;
      case 'medium':
        return 0.2;
      case 'strong':
        return 0.3;
      default:
        return 0.2;
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

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseEnter = () => {
      setIsMouseInCanvas(true);
    };

    const handleMouseLeave = () => {
      setIsMouseInCanvas(false);
    };

    // Touch event handlers for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        setMousePosition({
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        });
        setIsMouseInCanvas(true);
      }
    };

    const handleTouchEnd = () => {
      setIsMouseInCanvas(false);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);

    const colors = getColors();
    const baseOpacity = getOpacity();

    // Create particles
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    const particles: Particle[] = [];
    const interactionRadius = 150;

    class Particle {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      color: { r: number; g: number; b: number };
      speedX: number;
      speedY: number;
      opacity: number;
      baseOpacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseSize = 2 + Math.random() * 3;
        this.size = this.baseSize;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.baseOpacity = (0.3 + Math.random() * 0.7) * baseOpacity;
        this.opacity = this.baseOpacity;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        else if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        else if (this.y > canvas.height) this.y = 0;

        // Reset size and opacity
        this.size = this.baseSize;
        this.opacity = this.baseOpacity;

        // Interact with mouse
        if (isMouseInCanvas) {
          const dx = this.x - mousePosition.x;
          const dy = this.y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < interactionRadius) {
            // Calculate influence (stronger closer to mouse)
            const influence = 1 - distance / interactionRadius;

            // Move away from mouse
            this.x += dx * 0.02 * influence;
            this.y += dy * 0.02 * influence;

            // Increase size and opacity based on proximity
            this.size += this.baseSize * 2 * influence;
            this.opacity += (1 - this.baseOpacity) * influence;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    let animationFrame: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw connections between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${particles[i].color.r}, ${particles[i].color.g}, ${particles[i].color.b}, ${particles[i].opacity * (1 - distance / 100) * 0.5})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw mouse interaction area
      if (isMouseInCanvas) {
        const gradient = ctx.createRadialGradient(
          mousePosition.x,
          mousePosition.y,
          0,
          mousePosition.x,
          mousePosition.y,
          interactionRadius,
        );

        const color = colors[0];
        gradient.addColorStop(
          0,
          `rgba(${color.r}, ${color.g}, ${color.b}, ${baseOpacity * 0.5})`,
        );
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(
          mousePosition.x,
          mousePosition.y,
          interactionRadius,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrame);
    };
  }, [variant, intensity, mousePosition, isMouseInCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 -z-10 ${className}`}
      style={{ pointerEvents: 'auto', cursor: 'pointer' }}
    />
  );
}
