import { useEffect, useRef, useState } from "react";

interface RippleBackgroundProps {
  className?: string;
}

const RippleBackground = ({ className = "" }: RippleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ripples = useRef<
    Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speed: number;
    }>
  >([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const addRipple = (x: number, y: number) => {
      ripples.current.push({
        x,
        y,
        radius: 0,
        alpha: 0.6,
        speed: 2 + Math.random() * 3,
      });

      // Limit ripples to prevent performance issues
      if (ripples.current.length > 20) {
        ripples.current.splice(0, 1);
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw ripples
      ripples.current.forEach((ripple, index) => {
        ripple.radius += ripple.speed;
        ripple.alpha -= 0.01;

        if (ripple.alpha <= 0) {
          ripples.current.splice(index, 1);
          return;
        }

        // Create gradient for ripple
        const gradient = ctx.createRadialGradient(
          ripple.x,
          ripple.y,
          0,
          ripple.x,
          ripple.y,
          ripple.radius,
        );

        // Alternate between mint and violet colors
        const color =
          ripple.radius % 2 === 0 ? "56, 249, 215" : "107, 126, 255";

        gradient.addColorStop(0, `rgba(${color}, 0)`);
        gradient.addColorStop(0.7, `rgba(${color}, ${ripple.alpha * 0.15})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw ripple ring
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${color}, ${ripple.alpha * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Add continuous mouse-following effect
      const now = Date.now();
      if (now % 100 < 16) {
        // Roughly every 100ms
        addRipple(
          mouseRef.current.x + (Math.random() - 0.5) * 50,
          mouseRef.current.y + (Math.random() - 0.5) * 50,
        );
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleClick = (e: MouseEvent) => {
      addRipple(e.clientX, e.clientY);

      // Add multiple ripples for click effect
      setTimeout(() => addRipple(e.clientX, e.clientY), 100);
      setTimeout(() => addRipple(e.clientX, e.clientY), 200);
    };

    const handleResize = () => {
      resizeCanvas();
    };

    // Initialize
    resizeCanvas();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    // Start animation
    animate();

    // Add some initial ripples
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          addRipple(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
          );
        }, i * 200);
      }
    }, 1000);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[1] ${className}`}
      style={{ mixBlendMode: "normal" }}
    />
  );
};

export default RippleBackground;
