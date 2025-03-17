'use client';

import { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  variant?: 'purple' | 'blue' | 'orange' | 'green' | 'pink';
  intensity?: 'light' | 'medium' | 'strong';
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
}

export function AnimatedBackground({
  variant = 'purple',
  intensity = 'medium',
  speed = 'medium',
  className = '',
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Set color based on variant
  const getColor = () => {
    switch (variant) {
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
        return { r: 124, g: 58, b: 237 }; // #7c3aed
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
  const getSpeed = () => {
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

    // Create particles
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    const particles: Particle[] = [];
    const color = getColor();
    const opacity = getOpacity();
    const speedFactor = getSpeed();

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * speedFactor;
        this.speedY = (Math.random() - 0.5) * speedFactor;
        this.color = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Connect particles with lines if they're close enough
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
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
