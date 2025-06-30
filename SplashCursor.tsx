import { useEffect, useRef } from "react";

interface SplashCursorProps {
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  COLOR_UPDATE_SPEED?: number;
}

function SplashCursor({
  DENSITY_DISSIPATION = 2.5,
  VELOCITY_DISSIPATION = 1.8,
  SPLAT_RADIUS = 0.15,
  SPLAT_FORCE = 4000,
  COLOR_UPDATE_SPEED = 5,
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      hue: number;
      size: number;
    }> = [];

    let animationId: number;

    function addParticle(x: number, y: number, force: number = 1) {
      const count = Math.floor(force * 5);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: x + (Math.random() - 0.5) * 30,
          y: y + (Math.random() - 0.5) * 30,
          vx: (Math.random() - 0.5) * force * 6,
          vy: (Math.random() - 0.5) * force * 6,
          life: 1.0,
          hue: (Date.now() * 0.01 + Math.random() * 120) % 360,
          size: Math.random() * 3 + 2,
        });
      }
    }

    function animate() {
      // Clear canvas with fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update particles
      particles = particles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.012;
        p.vx *= 0.985;
        p.vy *= 0.985;

        if (p.life <= 0) return false;

        const alpha = p.life * 0.7;
        const currentSize = p.size * p.life;

        // Create glowing effect
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          currentSize * 2,
        );
        gradient.addColorStop(0, `hsla(${p.hue}, 70%, 60%, ${alpha})`);
        gradient.addColorStop(0.5, `hsla(${p.hue}, 60%, 50%, ${alpha * 0.5})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 50%, 40%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize * 2, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      animationId = requestAnimationFrame(animate);
    }

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if mouse is within canvas bounds
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        addParticle(x, y, 1.2);
      }
    }

    function handleTouchMove(e: TouchEvent) {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        addParticle(x, y, 1.5);
      }
    }

    // Initialize
    resizeCanvas();
    animate();

    // Add some initial particles for demo
    setTimeout(() => {
      addParticle(canvas.width / 2, canvas.height / 2, 0.5);
    }, 500);

    // Event listeners
    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    SPLAT_RADIUS,
    SPLAT_FORCE,
    COLOR_UPDATE_SPEED,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
      style={{
        mixBlendMode: "screen",
        filter: "blur(0.5px)",
      }}
    />
  );
}

export default SplashCursor;
