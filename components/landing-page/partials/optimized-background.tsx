'use client';

import { useEffect, useRef, useState } from 'react';

interface OptimizedBackgroundProps {
  variant?: 'neon' | 'geometric' | 'liquid' | 'particles' | 'wave';
  color?: 'purple' | 'blue' | 'orange' | 'green' | 'pink' | 'rainbow';
  intensity?: 'light' | 'medium' | 'strong';
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
  lowPerformanceMode?: boolean;
}

export function OptimizedBackground({
  variant = 'neon',
  color = 'purple',
  intensity = 'medium',
  speed = 'medium',
  className = '',
  lowPerformanceMode = false,
}: OptimizedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [fps, setFps] = useState(60);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const lastFpsUpdateRef = useRef<number>(0);

  // Get colors based on color prop
  const getColors = () => {
    switch (color) {
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
        return 1.5;
      default:
        return 1;
    }
  };

  // Determine element count based on performance mode
  const getElementCount = () => {
    if (lowPerformanceMode) {
      return 10;
    }

    return variant === 'particles' ? 30 : 15;
  };

  // Setup intersection observer to pause animation when not visible
  useEffect(() => {
    setIsMounted(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Main animation effect
  useEffect(() => {
    if (!isMounted || !isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas dimensions with device pixel ratio for sharp rendering
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = getColors();
    const baseOpacity = getOpacity();
    const speedFactor = getSpeedFactor();
    const elementCount = getElementCount();

    // Create elements based on variant
    let elements: any[] = [];

    switch (variant) {
      case 'neon':
        elements = createNeonBlobs(
          canvas,
          colors,
          baseOpacity,
          speedFactor,
          elementCount,
        );
        break;
      case 'geometric':
        elements = createGeometricShapes(
          canvas,
          colors,
          baseOpacity,
          speedFactor,
          elementCount,
        );
        break;
      case 'liquid':
        elements = createLiquidPoints(canvas, colors, baseOpacity, speedFactor);
        break;
      case 'particles':
        elements = createParticles(
          canvas,
          colors,
          baseOpacity,
          speedFactor,
          elementCount,
        );
        break;
      case 'wave':
        elements = createWaves(canvas, colors, baseOpacity, speedFactor);
        break;
      default:
        elements = createNeonBlobs(
          canvas,
          colors,
          baseOpacity,
          speedFactor,
          elementCount,
        );
    }

    // Animation loop with FPS monitoring and throttling
    let time = 0;
    let targetFps = lowPerformanceMode ? 30 : 60;
    let fpsInterval = 1000 / targetFps;

    const animate = (currentTime: number) => {
      // Calculate FPS
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
        lastFpsUpdateRef.current = currentTime;
      }

      const elapsed = currentTime - lastTimeRef.current;

      // Only render if enough time has passed (for consistent animation speed)
      if (elapsed > fpsInterval) {
        // Adjust time step based on elapsed time
        const timeStep = elapsed * 0.001 * speedFactor;
        time += timeStep;

        lastTimeRef.current = currentTime - (elapsed % fpsInterval);
        frameCountRef.current++;

        // Update FPS counter every second
        if (currentTime - lastFpsUpdateRef.current >= 1000) {
          const fps = Math.round(
            (frameCountRef.current * 1000) /
              (currentTime - lastFpsUpdateRef.current),
          );
          setFps(fps);
          frameCountRef.current = 0;
          lastFpsUpdateRef.current = currentTime;

          // Adjust target FPS if performance is poor
          if (fps < 30 && targetFps > 30) {
            targetFps = 30;
            fpsInterval = 1000 / targetFps;
          }
        }

        // Clear canvas
        ctx.clearRect(
          0,
          0,
          canvas.width / (window.devicePixelRatio || 1),
          canvas.height / (window.devicePixelRatio || 1),
        );

        // Draw based on variant
        switch (variant) {
          case 'neon':
            drawNeonBlobs(ctx, elements, time);
            break;
          case 'geometric':
            drawGeometricShapes(ctx, elements, time);
            break;
          case 'liquid':
            drawLiquidGradient(
              ctx,
              canvas,
              elements,
              colors,
              baseOpacity,
              time,
            );
            break;
          case 'particles':
            drawParticles(ctx, elements, time);
            break;
          case 'wave':
            drawWaves(ctx, canvas, elements, colors, baseOpacity, time);
            break;
        }
      }

      if (isVisible) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [
    variant,
    color,
    intensity,
    speed,
    isMounted,
    isVisible,
    lowPerformanceMode,
  ]);

  // Helper functions for creating and drawing different background types

  // Neon Blobs
  function createNeonBlobs(
    canvas: HTMLCanvasElement,
    colors: any[],
    baseOpacity: number,
    speedFactor: number,
    count: number,
  ) {
    const blobs = [];

    for (let i = 0; i < count; i++) {
      blobs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 50 + Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        speed: (0.0005 + Math.random() * 0.001) * speedFactor,
        range: 50 + Math.random() * 50,
        pulseSpeed: 0.005 + Math.random() * 0.01,
        pulseAmount: 0.2 + Math.random() * 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        opacity: (0.3 + Math.random() * 0.7) * baseOpacity,
      });
    }

    return blobs;
  }

  function drawNeonBlobs(
    ctx: CanvasRenderingContext2D,
    blobs: any[],
    time: number,
  ) {
    // Use screen blend mode for glow effect
    ctx.globalCompositeOperation = 'screen';

    blobs.forEach((blob) => {
      // Move in a circular pattern
      blob.x += Math.cos(blob.angle + time) * blob.speed * 50;
      blob.y += Math.sin(blob.angle + time) * blob.speed * 50;

      // Change direction slightly
      blob.angle += (Math.random() - 0.5) * 0.01;

      // Wrap around edges
      const width = ctx.canvas.width / (window.devicePixelRatio || 1);
      const height = ctx.canvas.height / (window.devicePixelRatio || 1);
      const padding = blob.radius;

      if (blob.x < -padding) blob.x = width + padding;
      else if (blob.x > width + padding) blob.x = -padding;
      if (blob.y < -padding) blob.y = height + padding;
      else if (blob.y > height + padding) blob.y = -padding;

      // Pulse effect
      const pulseFactor =
        1 +
        Math.sin(time * blob.pulseSpeed + blob.pulsePhase) * blob.pulseAmount;
      const radius = blob.radius * pulseFactor;

      // Create gradient for neon glow
      const gradient = ctx.createRadialGradient(
        blob.x,
        blob.y,
        0,
        blob.x,
        blob.y,
        radius,
      );

      gradient.addColorStop(
        0,
        `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${blob.opacity})`,
      );
      gradient.addColorStop(
        0.5,
        `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${blob.opacity * 0.5})`,
      );
      gradient.addColorStop(
        1,
        `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0)`,
      );

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(blob.x, blob.y, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
  }

  // Geometric Shapes
  function createGeometricShapes(
    canvas: HTMLCanvasElement,
    colors: any[],
    baseOpacity: number,
    speedFactor: number,
    count: number,
  ) {
    const shapes = [];

    for (let i = 0; i < count; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 20 + Math.random() * 40,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: ['triangle', 'square', 'circle', 'hexagon'][
          Math.floor(Math.random() * 4)
        ],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() * 0.02 - 0.01) * speedFactor,
        speedX: (Math.random() * 0.5 - 0.25) * speedFactor,
        speedY: (Math.random() * 0.5 - 0.25) * speedFactor,
        opacity: (0.2 + Math.random() * 0.3) * baseOpacity,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        pulseAmount: 0.1 + Math.random() * 0.2,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    return shapes;
  }

  function drawGeometricShapes(
    ctx: CanvasRenderingContext2D,
    shapes: any[],
    time: number,
  ) {
    shapes.forEach((shape) => {
      // Move
      shape.x += shape.speedX;
      shape.y += shape.speedY;

      // Rotate
      shape.rotation += shape.rotationSpeed;

      // Wrap around edges
      const width = ctx.canvas.width / (window.devicePixelRatio || 1);
      const height = ctx.canvas.height / (window.devicePixelRatio || 1);
      const padding = shape.size;

      if (shape.x < -padding) shape.x = width + padding;
      else if (shape.x > width + padding) shape.x = -padding;
      if (shape.y < -padding) shape.y = height + padding;
      else if (shape.y > height + padding) shape.y = -padding;

      // Pulse effect
      const pulseFactor =
        1 +
        Math.sin(time * shape.pulseSpeed + shape.pulsePhase) *
          shape.pulseAmount;
      const size = shape.size * pulseFactor;

      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);

      ctx.fillStyle = `rgba(${shape.color.r}, ${shape.color.g}, ${shape.color.b}, ${shape.opacity})`;
      ctx.strokeStyle = `rgba(${shape.color.r}, ${shape.color.g}, ${shape.color.b}, ${shape.opacity * 1.5})`;
      ctx.lineWidth = 1;

      switch (shape.type) {
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
    });
  }

  // Liquid Gradient
  function createLiquidPoints(
    canvas: HTMLCanvasElement,
    colors: any[],
    baseOpacity: number,
    speedFactor: number,
  ) {
    const pointCount = 8;
    const points = [];

    for (let i = 0; i < pointCount; i++) {
      // Position points evenly around the canvas
      const slice = (Math.PI * 2) / pointCount;
      const angle = slice * i;

      // Position points outside the canvas for a full-screen effect
      const radius = Math.max(canvas.width, canvas.height) * 0.7;

      const baseX = canvas.width / 2 + Math.cos(angle) * radius;
      const baseY = canvas.height / 2 + Math.sin(angle) * radius;

      points.push({
        x: baseX,
        y: baseY,
        baseX: baseX,
        baseY: baseY,
        offsetX: 100 + Math.random() * 100,
        offsetY: 100 + Math.random() * 100,
        angleX: Math.random() * Math.PI * 2,
        angleY: Math.random() * Math.PI * 2,
        speedX: (0.001 + Math.random() * 0.002) * speedFactor,
        speedY: (0.001 + Math.random() * 0.002) * speedFactor,
      });
    }

    return points;
  }

  function drawLiquidGradient(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    points: any[],
    colors: any[],
    baseOpacity: number,
    time: number,
  ) {
    const width = ctx.canvas.width / (window.devicePixelRatio || 1);
    const height = ctx.canvas.height / (window.devicePixelRatio || 1);

    // Update points
    points.forEach((point) => {
      // Move points in a sinusoidal pattern
      point.x =
        point.baseX +
        Math.sin(time * point.speedX + point.angleX) * point.offsetX;
      point.y =
        point.baseY +
        Math.sin(time * point.speedY + point.angleY) * point.offsetY;
    });

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);

    if (color === 'rainbow') {
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
    ctx.fillRect(0, 0, width, height);

    // Draw liquid shapes (limit to 2 for better performance)
    for (let i = 0; i < Math.min(colors.length, 2); i++) {
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
      const slice = (Math.PI * 2) / points.length;
      const angle = slice * index;
      const radius = Math.max(width, height) * 0.7;

      point.baseX = width / 2 + Math.cos(angle) * radius;
      point.baseY = height / 2 + Math.sin(angle) * radius;
    });
  }

  // Particles
  function createParticles(
    canvas: HTMLCanvasElement,
    colors: any[],
    baseOpacity: number,
    speedFactor: number,
    count: number,
  ) {
    const particles = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * speedFactor,
        speedY: (Math.random() - 0.5) * speedFactor,
        opacity: (0.3 + Math.random() * 0.7) * baseOpacity,
      });
    }

    return particles;
  }

  function drawParticles(
    ctx: CanvasRenderingContext2D,
    particles: any[],
    time: number,
  ) {
    const width = ctx.canvas.width / (window.devicePixelRatio || 1);
    const height = ctx.canvas.height / (window.devicePixelRatio || 1);

    // Draw and update particles
    particles.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x > width) particle.x = 0;
      else if (particle.x < 0) particle.x = width;
      if (particle.y > height) particle.y = 0;
      else if (particle.y < 0) particle.y = height;

      ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.opacity})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Connect particles with lines if they're close enough
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${particles[i].color.r}, ${particles[i].color.g}, ${particles[i].color.b}, ${particles[i].opacity * (1 - distance / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  // Waves
  function createWaves(
    canvas: HTMLCanvasElement,
    colors: any[],
    baseOpacity: number,
    speedFactor: number,
  ) {
    const waves = [];

    for (let i = 0; i < colors.length; i++) {
      waves.push({
        color: colors[i],
        amplitude: canvas.height * (0.05 + Math.random() * 0.05),
        frequency: 0.005 + Math.random() * 0.005,
        phase: Math.random() * Math.PI * 2,
        speed: speedFactor * (0.8 + Math.random() * 0.4),
        y: canvas.height * (0.3 + (i / colors.length) * 0.4),
      });
    }

    return waves;
  }

  function drawWaves(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    waves: any[],
    colors: any[],
    baseOpacity: number,
    time: number,
  ) {
    const width = ctx.canvas.width / (window.devicePixelRatio || 1);
    const height = ctx.canvas.height / (window.devicePixelRatio || 1);

    // Draw waves
    waves.forEach((wave) => {
      ctx.beginPath();

      // Draw wave path (optimize by increasing step size)
      const step = lowPerformanceMode ? 10 : 5;
      for (let x = 0; x <= width; x += step) {
        const y =
          wave.y +
          Math.sin(x * wave.frequency + wave.phase + time * wave.speed) *
            wave.amplitude;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      // Complete the wave by drawing to the bottom and back to start
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      // Create gradient fill
      const gradient = ctx.createLinearGradient(
        0,
        wave.y - wave.amplitude,
        0,
        height,
      );
      gradient.addColorStop(
        0,
        `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, ${baseOpacity})`,
      );
      gradient.addColorStop(
        1,
        `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, 0)`,
      );

      ctx.fillStyle = gradient;
      ctx.fill();
    });
  }

  return (
    <div className='relative'>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 -z-10 ${className}`}
        style={{ pointerEvents: 'none' }}
      />
      {process.env.NODE_ENV === 'development' && (
        <div className='absolute bottom-2 right-2 rounded-md bg-black/30 px-2 py-1 text-xs text-white/50'>
          {fps} FPS
        </div>
      )}
    </div>
  );
}
