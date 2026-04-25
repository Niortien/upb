"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  hue: number;
  alpha: number;
}

export function useBackgroundCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const animRef = useRef<number | null>(null);
  const blobsRef = useRef<Blob[]>([]);
  const scrollProgressRef = useRef(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const dimensionsRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    // ── Resize handler
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      dimensionsRef.current = { w, h };
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Init blobs
    const COUNT = 7;
    const { w, h } = dimensionsRef.current;
    const PALETTE = [220, 245, 260, 30, 200]; // blue, gold, purple, amber, cyan hues
    blobsRef.current = Array.from({ length: COUNT }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: 160 + Math.random() * 200,
      baseRadius: 160 + Math.random() * 200,
      hue: PALETTE[i % PALETTE.length],
      alpha: 0.12 + Math.random() * 0.1,
    }));

    // ── Scroll → progress
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      },
    });

    // ── GSAP ticker drives the canvas
    const tick = () => {
      const { w, h } = dimensionsRef.current;
      const progress = scrollProgressRef.current;

      ctx.clearRect(0, 0, w, h);

      blobsRef.current.forEach((blob) => {
        // Scroll modulates speed + radius
        const speedMult = 1 + progress * 2.5;
        blob.x += blob.vx * speedMult;
        blob.y += blob.vy * speedMult;

        // Bounce
        if (blob.x < -blob.radius) blob.x = w + blob.radius;
        if (blob.x > w + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = h + blob.radius;
        if (blob.y > h + blob.radius) blob.y = -blob.radius;

        // Pulse radius with scroll
        blob.radius = blob.baseRadius * (1 + progress * 0.5);

        // Hue shift with scroll
        const hue = blob.hue + progress * 60;

        const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius);
        grad.addColorStop(0, `hsla(${hue}, 80%, 60%, ${blob.alpha})`);
        grad.addColorStop(1, `hsla(${hue}, 80%, 60%, 0)`);

        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });
    };

    gsap.ticker.add(tick);
    animRef.current = 1;

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}
