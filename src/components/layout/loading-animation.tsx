"use client";

import { useEffect, useRef } from 'react';

const LoadingAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Stars
    const stars: { x: number; y: number; radius: number; speed: number }[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5 + 0.2,
      });
    }

    const drawStars = () => {
      ctx.fillStyle = 'white';
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        star.x -= star.speed;
        if (star.x < 0) {
          star.x = canvas.width;
        }
      });
    };

    // Spaceship
    const spaceship = {
      x: -100,
      y: canvas.height / 2,
      angle: 0,
    };

    const drawSpaceship = () => {
      ctx.save();
      ctx.translate(spaceship.x, spaceship.y);
      ctx.rotate(spaceship.angle);
      
      // Body
      ctx.fillStyle = '#E0E0E0';
      ctx.beginPath();
      ctx.moveTo(-30, 0);
      ctx.lineTo(20, -20);
      ctx.lineTo(20, 20);
      ctx.closePath();
      ctx.fill();

      // Cockpit
      ctx.fillStyle = '#3498db';
      ctx.beginPath();
      ctx.arc(5, 0, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Flame
      ctx.fillStyle = `rgba(255, ${100 + Math.random() * 100}, 0, ${0.5 + Math.random() * 0.5})`;
      ctx.beginPath();
      ctx.moveTo(-30, 0);
      ctx.lineTo(-50 - Math.random() * 20, -10);
      ctx.lineTo(-50 - Math.random() * 20, 10);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawStars();
      drawSpaceship();

      spaceship.x += 3;
      spaceship.y = canvas.height / 2 + Math.sin(spaceship.x / 100) * 20;

      if (spaceship.x > canvas.width + 100) {
          spaceship.x = -100;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
        if(canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-black">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};

export default LoadingAnimation;
