"use client";

import React, { useRef, useEffect } from 'react';

const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const stars: { x: number; y: number; radius: number; alpha: number, speed: number }[] = [];
    for (let i = 0; i < 400; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.2,
            alpha: Math.random(),
            speed: Math.random() > 0.5 ? 1 : -1,
        });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        star.alpha += 0.01 * star.speed;
        if(star.alpha > 1) {
            star.alpha = 1;
            star.speed *= -1;
        } else if (star.alpha < 0) {
            star.alpha = 0;
            star.speed *= -1;
        }
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      setup();
    };

    setup();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 -z-10 h-full w-full bg-background" />;
};

export default StarryBackground;
