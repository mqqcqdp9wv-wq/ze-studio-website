"use client";

import { useEffect, useRef } from "react";

export const AssemblyVisual = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const updateSize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        };

        updateSize();
        window.addEventListener("resize", updateSize);

        // Animation variables
        let animationFrame: number;
        let progress = 0;

        // Car assembly points
        const assemblyPoints = [
            { x: 0.2, y: 0.4, label: "Дверь" },
            { x: 0.35, y: 0.3, label: "Клипсы" },
            { x: 0.5, y: 0.5, label: "Обшивка" },
            { x: 0.65, y: 0.35, label: "Уплотнитель" },
            { x: 0.8, y: 0.45, label: "Стекло" },
        ];

        // Draw function
        const draw = () => {
            const w = canvas.width / (window.devicePixelRatio || 1);
            const h = canvas.height / (window.devicePixelRatio || 1);

            // Clear canvas
            ctx.clearRect(0, 0, w, h);

            // Draw car outline (simplified)
            ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(w * 0.15, h * 0.6);
            ctx.lineTo(w * 0.25, h * 0.3);
            ctx.lineTo(w * 0.75, h * 0.3);
            ctx.lineTo(w * 0.85, h * 0.6);
            ctx.lineTo(w * 0.15, h * 0.6);
            ctx.stroke();

            // Draw assembly points
            assemblyPoints.forEach((point, i) => {
                const x = w * point.x;
                const y = h * point.y;
                const delay = i * 20;
                const pointProgress = Math.min(Math.max((progress - delay) / 30, 0), 1);

                // Connection lines (to center)
                if (pointProgress > 0.3) {
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(w * 0.5, h * 0.5);
                    ctx.strokeStyle = `rgba(74, 123, 247, ${pointProgress * 0.4})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }

                // Point glow
                if (pointProgress > 0) {
                    const glowRadius = 15 * pointProgress;
                    const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
                    gradient.addColorStop(0, `rgba(74, 123, 247, ${0.6 * pointProgress})`);
                    gradient.addColorStop(1, "rgba(74, 123, 247, 0)");
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Point circle
                ctx.beginPath();
                ctx.arc(x, y, 5 * pointProgress, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(74, 123, 247, ${pointProgress})`;
                ctx.fill();

                // Label
                if (pointProgress > 0.7) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${(pointProgress - 0.7) / 0.3 * 0.5})`;
                    ctx.font = "11px sans-serif";
                    ctx.textAlign = "center";
                    ctx.fillText(point.label, x, y - 12);
                }
            });

            // Center status indicator
            const centerProgress = Math.min(Math.max(progress / 100, 0), 1);
            if (centerProgress > 0.5) {
                ctx.beginPath();
                ctx.arc(w * 0.5, h * 0.5, 8, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(74, 247, 123, ${(centerProgress - 0.5) * 2})`;
                ctx.fill();

                // Checkmark
                ctx.strokeStyle = `rgba(255, 255, 255, ${(centerProgress - 0.5) * 2})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(w * 0.5 - 3, h * 0.5);
                ctx.lineTo(w * 0.5 - 1, h * 0.5 + 2);
                ctx.lineTo(w * 0.5 + 3, h * 0.5 - 2);
                ctx.stroke();
            }

            // Update progress
            progress += 0.8;
            if (progress > 150) progress = 0;

            animationFrame = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", updateSize);
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="h-full w-full"
            style={{ width: "100%", height: "100%" }}
        />
    );
};
