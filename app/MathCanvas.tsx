"use client";

import { useEffect, useRef } from "react";

type SceneVariant =
  | "hero"
  | "prime"
  | "program"
  | "speakers"
  | "venue"
  | "materials"
  | "fold"
  | "orbit"
  | "lattice";

type MathCanvasProps = {
  variant?: SceneVariant;
};

const TAU = Math.PI * 2;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function MathCanvas({ variant = "hero" }: MathCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pointer = {
      x: 0.66,
      y: 0.48,
      targetX: 0.66,
      targetY: 0.48,
      energy: 0,
      targetEnergy: 0,
    };

    let animation = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let visible = true;
    let elapsed = 0;

    const isDark =
      variant === "hero" ||
      variant === "speakers" ||
      variant === "orbit";

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!inside) {
        pointer.targetEnergy = 0;
        return;
      }

      pointer.targetX = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      pointer.targetY = clamp((event.clientY - rect.top) / rect.height, 0, 1);
      pointer.targetEnergy = 1;
    };

    const handlePointerLeave = () => {
      pointer.targetEnergy = 0;
    };

    const displacedPoint = (x: number, y: number, force = 1) => {
      const cursorX = pointer.x * width;
      const cursorY = pointer.y * height;
      const dx = x - cursorX;
      const dy = y - cursorY;
      const radius = Math.max(150, Math.min(width, height) * 0.34);
      const influence = Math.exp(-(dx * dx + dy * dy) / (radius * radius));
      const angle = Math.atan2(dy, dx) + Math.PI / 2;
      const displacement = influence * pointer.energy * radius * 0.12 * force;

      return {
        x: x + Math.cos(angle) * displacement,
        y: y + Math.sin(angle) * displacement,
      };
    };

    const drawBackdrop = () => {
      context.clearRect(0, 0, width, height);
      if (variant !== "hero") {
        return;
      }

      const gradient = context.createRadialGradient(
        width * pointer.x,
        height * pointer.y,
        0,
        width * 0.54,
        height * 0.5,
        Math.max(width, height),
      );
      gradient.addColorStop(0, "#0a3a7d");
      gradient.addColorStop(0.42, "#012c63");
      gradient.addColorStop(1, "#001b3b");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
    };

    const drawPrimeLattice = (time: number) => {
      const gap = clamp(Math.min(width, height) / 17, 34, 68);
      const cols = Math.ceil(width / gap) + 2;
      const rows = Math.ceil(height / gap) + 2;

      context.save();
      context.lineWidth = 0.7;
      for (let row = -1; row < rows; row += 1) {
        context.beginPath();
        for (let col = -1; col < cols; col += 1) {
          const seed = row * 97 + col * 53;
          const baseX = col * gap + Math.sin(row * 0.7 + time) * 5;
          const baseY = row * gap + Math.cos(col * 0.56 - time * 0.7) * 5;
          const point = displacedPoint(baseX, baseY, 0.8);

          if (col === -1) {
            context.moveTo(point.x, point.y);
          } else {
            context.lineTo(point.x, point.y);
          }

          if (Math.abs(seed) % 7 === 1 || Math.abs(seed) % 11 === 3) {
            const pulse = 1.5 + Math.sin(time * 2 + seed) * 0.75;
            context.fillStyle = isDark
              ? "rgba(200, 216, 240, 0.62)"
              : "rgba(28, 95, 194, 0.34)";
            context.beginPath();
            context.arc(point.x, point.y, Math.max(0.7, pulse), 0, TAU);
            context.fill();
          }
        }
        context.strokeStyle = isDark
          ? "rgba(200, 216, 240, 0.12)"
          : "rgba(1, 44, 99, 0.07)";
        context.stroke();
      }
      context.restore();
    };

    const drawAlgebraicCurve = (time: number, emphasis = 1) => {
      const centerX = variant === "hero" ? width * 0.67 : width * 0.52;
      const centerY = height * 0.48;
      const scale = Math.min(width, height) * (variant === "hero" ? 0.43 : 0.38);
      const families = variant === "hero" ? 19 : 11;

      context.save();
      context.globalCompositeOperation = isDark ? "lighter" : "source-over";
      for (let family = 0; family < families; family += 1) {
        const offset = (family - (families - 1) / 2) / families;
        const phase = time * (0.22 + family * 0.006) + offset * 1.6;
        context.beginPath();
        for (let step = 0; step <= 360; step += 1) {
          const t = (step / 360) * TAU;
          const radial =
            0.67 +
            0.13 * Math.sin(3 * t + phase) +
            0.08 * Math.sin(5 * t - phase * 1.4);
          const x =
            centerX +
            Math.cos(2 * t + phase * 0.18) * scale * radial *
              (1 + offset * 0.66);
          const y =
            centerY +
            Math.sin(3 * t - phase * 0.14) * scale * radial * 0.74 +
            offset * scale * 0.58;
          const point = displacedPoint(x, y, 1.18);

          if (step === 0) {
            context.moveTo(point.x, point.y);
          } else {
            context.lineTo(point.x, point.y);
          }
        }
        const alpha = (0.08 + (family / families) * 0.18) * emphasis;
        context.strokeStyle =
          family % 4 === 0
            ? `rgba(200, 216, 240, ${alpha + 0.08})`
            : isDark
              ? `rgba(28, 95, 194, ${alpha})`
              : `rgba(28, 95, 194, ${alpha * 0.72})`;
        context.lineWidth = family % 4 === 0 ? 1.35 : 0.75;
        context.stroke();
      }
      context.restore();
    };

    const drawProgramField = (time: number) => {
      context.save();
      for (let lane = 0; lane < 5; lane += 1) {
        const laneX = ((lane + 0.5) / 5) * width;
        context.beginPath();
        for (let step = 0; step <= 120; step += 1) {
          const ratio = step / 120;
          const y = ratio * height;
          const x =
            laneX +
            Math.sin(ratio * TAU * 1.8 + time + lane) * width * 0.028;
          const point = displacedPoint(x, y, 0.72);
          if (step === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        }
        context.strokeStyle =
          lane % 2 === 0
            ? "rgba(28, 95, 194, 0.18)"
            : "rgba(200, 216, 240, 0.46)";
        context.lineWidth = lane === 2 ? 1.8 : 1;
        context.stroke();
      }
      context.restore();
    };

    const drawContours = (time: number) => {
      const centerX = width * (0.45 + (pointer.x - 0.5) * 0.05);
      const centerY = height * (0.5 + (pointer.y - 0.5) * 0.05);
      const rings = variant === "venue" ? 18 : 13;

      context.save();
      for (let ring = 1; ring <= rings; ring += 1) {
        context.beginPath();
        for (let step = 0; step <= 240; step += 1) {
          const t = (step / 240) * TAU;
          const radius = Math.min(width, height) * (0.032 + ring * 0.028);
          const noise =
            1 +
            Math.sin(t * 3 + ring * 0.7 + time) * 0.08 +
            Math.cos(t * 7 - ring - time * 0.6) * 0.035;
          const x = centerX + Math.cos(t) * radius * noise * 1.7;
          const y = centerY + Math.sin(t) * radius * noise * 0.82;
          const point = displacedPoint(x, y, 0.95);
          if (step === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        }
        context.strokeStyle = isDark
          ? `rgba(200, 216, 240, ${0.06 + ring * 0.009})`
          : ring % 4 === 0
            ? "rgba(10, 58, 125, 0.24)"
            : "rgba(28, 95, 194, 0.11)";
        context.lineWidth = ring % 4 === 0 ? 1.25 : 0.75;
        context.stroke();
      }
      context.restore();
    };

    const drawFold = (time: number) => {
      context.save();
      const lines = 24;
      for (let line = 0; line < lines; line += 1) {
        context.beginPath();
        for (let step = 0; step <= 160; step += 1) {
          const ratio = step / 160;
          const x = ratio * width;
          const fold = Math.sin(ratio * Math.PI) * height * 0.2;
          const y =
            height * (0.18 + (line / lines) * 0.64) +
            fold * Math.sin(ratio * TAU + line * 0.22 + time);
          const point = displacedPoint(x, y, 1.25);
          if (step === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        }
        context.strokeStyle =
          line % 5 === 0
            ? "rgba(200, 216, 240, 0.5)"
            : isDark
              ? "rgba(28, 95, 194, 0.15)"
              : "rgba(28, 95, 194, 0.1)";
        context.lineWidth = line % 5 === 0 ? 1.2 : 0.7;
        context.stroke();
      }
      context.restore();
    };

    const drawCursorSingularity = (time: number) => {
      if (pointer.energy < 0.03) {
        return;
      }

      const x = pointer.x * width;
      const y = pointer.y * height;
      context.save();
      context.globalCompositeOperation = isDark ? "lighter" : "source-over";
      for (let ring = 0; ring < 4; ring += 1) {
        const radius =
          22 + ring * 15 + Math.sin(time * 2 - ring) * 4 + pointer.energy * 8;
        context.beginPath();
        context.arc(x, y, radius, 0, TAU);
        context.strokeStyle = isDark
          ? `rgba(200, 216, 240, ${0.25 - ring * 0.045})`
          : `rgba(28, 95, 194, ${0.16 - ring * 0.025})`;
        context.lineWidth = 0.8;
        context.stroke();
      }
      context.restore();
    };

    const draw = () => {
      if (!visible && !reduceMotion) {
        animation = window.requestAnimationFrame(draw);
        return;
      }

      elapsed += reduceMotion ? 0 : 0.012;
      pointer.x += (pointer.targetX - pointer.x) * 0.055;
      pointer.y += (pointer.targetY - pointer.y) * 0.055;
      pointer.energy += (pointer.targetEnergy - pointer.energy) * 0.07;

      drawBackdrop();

      if (variant === "hero") {
        drawPrimeLattice(elapsed * 0.46);
        drawAlgebraicCurve(elapsed, 1.25);
      } else if (variant === "program") {
        drawProgramField(elapsed);
        drawAlgebraicCurve(elapsed * 0.72, 0.58);
      } else if (variant === "speakers" || variant === "venue") {
        drawContours(elapsed);
      } else if (variant === "materials" || variant === "fold") {
        drawFold(elapsed);
      } else if (variant === "orbit") {
        drawContours(elapsed);
        drawAlgebraicCurve(elapsed * 0.8, 0.72);
      } else if (variant === "lattice") {
        drawPrimeLattice(elapsed);
        drawProgramField(elapsed * 0.8);
      } else {
        drawPrimeLattice(elapsed);
        drawAlgebraicCurve(elapsed * 0.64, 0.62);
      }

      drawCursorSingularity(elapsed);

      if (!reduceMotion) {
        animation = window.requestAnimationFrame(draw);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw();
    });
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "20%" },
    );

    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", handlePointerLeave);
    document.addEventListener("mouseleave", handlePointerLeave);

    resize();
    draw();

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handlePointerLeave);
      document.removeEventListener("mouseleave", handlePointerLeave);
      if (animation) window.cancelAnimationFrame(animation);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`math-canvas math-canvas-${variant}`}
      aria-hidden="true"
    />
  );
}
