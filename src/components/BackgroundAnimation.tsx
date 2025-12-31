import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  density: number;

  // Floating animation properties
  floatOffsetX: number;
  floatOffsetY: number;
  floatSpeed: number;
}

export const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, isActive: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 110;
    const mouseRadius = 150;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);

      initParticles(rect.width, rect.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      mouse.current.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.current.isActive = false;
    };

    const initParticles = (width: number, height: number) => {
      particles = [];

      const centerX = width / 2;
      const centerY = height * 0.65; // Positioned behind the amount
      const maxRadius = Math.min(width, height) * 0.5;

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 0.9 + 0.1; // Finer particles: 0.1px to 1.0px

        // Random placement in a circle
        const angle = Math.random() * Math.PI * 2;
        // Using power > 1 pushes points slightly towards center for a "core" glow effect
        // Using sqrt makes it uniform. Let's do a mix or simple random.
        const r = Math.random() * maxRadius;

        const originX = centerX + Math.cos(angle) * r;
        const originY = centerY + Math.sin(angle) * r;

        particles.push({
          x: originX,
          y: originY,
          originX,
          originY,
          size,
          density: Math.random() * 30 + 1,
          floatOffsetX: Math.random() * 100,
          floatOffsetY: Math.random() * 100,
          floatSpeed: Math.random() * 0.5 + 0.2, // Slow floating speed
        });
      }
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const time = Date.now() * 0.001; // Current time in seconds

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // 1. Calculate Floating Target (Natural organic movement)
        const floatRange = 15; // How far they wander from their spot
        const floatX =
          Math.sin(time * p.floatSpeed + p.floatOffsetX) * floatRange;
        const floatY =
          Math.cos(time * p.floatSpeed + p.floatOffsetY) * floatRange;

        const targetX = p.originX + floatX;
        const targetY = p.originY + floatY;

        // 2. Mouse Interaction
        let forceX = 0;
        let forceY = 0;

        if (mouse.current.isActive) {
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseRadius) {
            const force = (mouseRadius - distance) / mouseRadius;
            const angle = Math.atan2(dy, dx);
            const pushFactor = p.density * 0.6;
            forceX = -Math.cos(angle) * force * pushFactor;
            forceY = -Math.sin(angle) * force * pushFactor;
          }
        }

        // 3. Physics: Spring to Target (Target = Origin + Float)
        const returnSpeed = 0.08;

        // Move towards the floating target
        p.x += (targetX - p.x) * returnSpeed;
        p.y += (targetY - p.y) * returnSpeed;

        // Apply external forces
        p.x += forceX;
        p.y += forceY;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(190, 190, 195, 0.28)";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize
    // Delay slightly to ensure layout is done
    setTimeout(() => {
      handleResize();
      animate();
    }, 0);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black z-10" />
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};
