'use client';

import { useEffect, useRef } from 'react';

interface GeometricShapesBackgroundProps {
  variant?: 'purple' | 'blue' | 'orange' | 'green' | 'pink' | 'rainbow';
  intensity?: 'light' | 'medium' | 'strong';
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
}

export function GeometricShapesBackground({
  variant = 'purple',
  intensity = 'medium',
  speed = 'medium',
  className = '',
}: GeometricShapesBackgroundProps) {
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

    // Create shapes
    const shapeCount = 30;
    const shapes: Shape[] = [];

    class Shape {
      x: number;
      y: number;
      size: number;
      color: { r: number; g: number; b: number };
      type: 'triangle' | 'square' | 'circle' | 'hexagon';
      rotation: number;
      rotationSpeed: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulseSpeed: number;
      pulseAmount: number;
      pulsePhase: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 20 + Math.random() * 60;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.type = ['triangle', 'square', 'circle', 'hexagon'][
          Math.floor(Math.random() * 4)
        ] as any;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() * 0.02 - 0.01) * speedFactor;
        this.speedX = (Math.random() * 0.5 - 0.25) * speedFactor;
        this.speedY = (Math.random() * 0.5 - 0.25) * speedFactor;
        this.opacity = (0.2 + Math.random() * 0.3) * baseOpacity;
        this.pulseSpeed = 0.01 + Math.random() * 0.02;
        this.pulseAmount = 0.1 + Math.random() * 0.2;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update(time: number) {
        // Move
        this.x += this.speedX;
        this.y += this.speedY;

        // Rotate
        this.rotation += this.rotationSpeed;

        // Wrap around edges with some padding
        const padding = this.size;
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
        const size = this.size * pulseFactor;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        ctx.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 1.5})`;
        ctx.lineWidth = 1;

        switch (this.type) {
          case 'triangle':
            ctx.beginPath();
            ctx.moveTo(0, -size / 2);
            ctx.lineTo(-size / 2, size / 2);
            ctx.lineTo(size / 2, size / 2);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            break;

          case 'square':
            ctx.fillRect(-size / 2, -size / 2, size, size);
            ctx.strokeRect(-size / 2, -size / 2, size, size);
            break;

          case 'circle':
            ctx.beginPath();
            ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            break;

          case 'hexagon':
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (Math.PI / 3) * i;
              const x = Math.cos(angle) * (size / 2);
              const y = Math.sin(angle) * (size / 2);

              if (i === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            break;
        }

        ctx.restore();
      }
    }

    // Initialize shapes
    for (let i = 0; i < shapeCount; i++) {
      shapes.push(new Shape());
    }

    // Animation loop
    let animationFrame: number;
    let time = 0;

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw shapes
      shapes.forEach((shape) => {
        const pulseFactor = shape.update(time);
        shape.draw(pulseFactor);
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
