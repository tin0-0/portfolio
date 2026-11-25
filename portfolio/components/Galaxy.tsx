"use client";
import { useEffect, useRef } from "react";

export default function Galaxy() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0;
    let mx = 0, my = 0; // mouse target, -0.5 to 0.5
    let sx = 0, sy = 0; // smoothed mouse

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      mx = e.clientX / w - 0.5;
      my = e.clientY / h - 0.5;
    };
    window.addEventListener("pointermove", onMove);

    const stars = Array.from({ length: 220 }, () => {
      const r = Math.random() * 1.6 + 0.3;
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r,
        s: 0.1 + r * 0.25, // bigger = faster
        depth: r / 1.9,
        t: Math.random() * Math.PI * 2,
      };
    });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      sx += (mx - sx) * 0.05;
      sy += (my - sy) * 0.05;

      for (const st of stars) {
        st.t += 0.02;
        st.x -= st.s;
        if (st.x < -5) {
          st.x = w + 5;
          st.y = Math.random() * h;
        }
        const px = st.x - sx * st.depth * 70;
        const py = st.y - sy * st.depth * 70;
        ctx.globalAlpha = 0.45 + Math.sin(st.t) * 0.4;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(px, py, st.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}