"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  r: number;
};

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;

    const makeStars = (count: number) => {
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
        z: Math.random(),
        r: Math.random(),
      }));
    };

    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const tick = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const time = t * 0.00005;

      for (const s of starsRef.current) {
        // Soft drift + wrap
        s.x += Math.sin(time + s.z * 10) * 0.0007;
        s.y += Math.cos(time + s.z * 10) * 0.0007;
        if (s.x > 1) s.x = -1;
        if (s.x < -1) s.x = 1;
        if (s.y > 1) s.y = -1;
        if (s.y < -1) s.y = 1;

        // Perspective-ish projection
        const depth = 0.25 + s.z * 0.75;
        const px = cx + s.x * cx * depth;
        const py = cy + s.y * cy * depth;

        const size = 0.6 + s.r * 1.6;
        const alpha = 0.18 + s.z * 0.65;

        ctx.fillStyle = `rgba(51, 229, 207, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = window.requestAnimationFrame(tick);
    };

    // Ensure the canvas has measurable size before sizing buffers
    makeStars(900);
    resize();
    window.addEventListener("resize", resize);
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block pointer-events-none"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}



