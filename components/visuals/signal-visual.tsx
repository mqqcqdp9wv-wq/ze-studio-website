"use client";

import { useEffect, useRef } from "react";

export const SignalVisual = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const updateSize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        };

        updateSize();
        window.addEventListener("resize", updateSize);

        let animationFrame: number;
        let progress = 0;

        // Signal waves
        const waves: { x: number; y: number; radius: number; opacity: number }[] = [];

        const draw = () => {
            const w = canvas.width / (window.devicePixelRatio || 1);
            const h = canvas.height / (window.devicePixelRatio || 1);

            ctx.clearRect(0, 0, w, h);

            // Car icon (simplified)
            const carX = w * 0.5;
            const carY = h * 0.55;
            ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
            ctx.fillRect(carX - 30, carY - 15, 60, 30);
            ctx.fillRect(carX - 20, carY - 25, 40, 10);

            // Antenna
            ctx.strokeStyle = "rgba(74, 123, 247, 0.8)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(carX, carY - 25);
            ctx.lineTo(carX, carY - 40);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(carX, carY - 42, 3, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(74, 123, 247, 1)";
            ctx.fill();

            // Create new waves periodically
            if (progress % 30 === 0) {
                waves.push({ x: carX, y: carY - 42, radius: 0, opacity: 1 });
            }

            // Draw and update waves
            waves.forEach((wave, i) => {
                wave.radius += 1.5;
                wave.opacity -= 0.01;

                if (wave.opacity > 0) {
                    ctx.strokeStyle = `rgba(74, 123, 247, ${wave.opacity * 0.6})`;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
                    ctx.stroke();

                    // Concentric wave
                    ctx.strokeStyle = `rgba(74, 247, 200, ${wave.opacity * 0.4})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.arc(wave.x, wave.y, wave.radius + 10, 0, Math.PI * 2);
                    ctx.stroke();
                }
            });

            // Remove faded waves
            for (let i = waves.length - 1; i >= 0; i--) {
                if (waves[i].opacity <= 0) {
                    waves.splice(i, 1);
                }
            }

            // Signal indicators (GPS, 5G)
            const indicators = [
                { x: w * 0.25, y: h * 0.25, label: "GPS", type: "satellite" },
                { x: w * 0.75, y: h * 0.3, label: "5G", type: "tower" },
            ];

            indicators.forEach((ind, i) => {
                const pulse = Math.sin((progress + i * 50) * 0.05) * 0.3 + 0.7;

                // Icon background
                ctx.beginPath();
                ctx.arc(ind.x, ind.y, 20, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(74, 123, 247, ${pulse * 0.2})`;
                ctx.fill();

                // Icon (simplified)
                if (ind.type === "satellite") {
                    // GPS satellite icon
                    ctx.fillStyle = `rgba(74, 247, 200, ${pulse})`;
                    ctx.fillRect(ind.x - 5, ind.y - 2, 10, 4);
                    ctx.fillRect(ind.x - 2, ind.y - 8, 4, 16);
                } else {
                    // 5G tower icon
                    ctx.fillStyle = `rgba(74, 200, 247, ${pulse})`;
                    ctx.fillRect(ind.x - 2, ind.y - 8, 4, 16);
                    ctx.fillRect(ind.x - 6, ind.y - 10, 12, 3);
                }

                // Label
                ctx.fillStyle = `rgba(255, 255, 255, ${pulse * 0.6})`;
                ctx.font = "12px sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(ind.label, ind.x, ind.y + 35);

                // Connection line to car
                const lineOpacity = Math.sin((progress + i * 30) * 0.08) * 0.3 + 0.3;
                ctx.strokeStyle = `rgba(74, 123, 247, ${lineOpacity})`;
                ctx.lineWidth = 1;
                ctx.setLineDash([5, 5]);
                ctx.beginPath();
                ctx.moveTo(ind.x, ind.y + 20);
                ctx.lineTo(carX, carY - 42);
                ctx.stroke();
                ctx.setLineDash([]);
            });

            progress++;
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
