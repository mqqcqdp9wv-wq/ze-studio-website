"use client";

import { useEffect, useRef } from "react";

export const FocusVisual = () => {
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

        const draw = () => {
            const w = canvas.width / (window.devicePixelRatio || 1);
            const h = canvas.height / (window.devicePixelRatio || 1);

            ctx.clearRect(0, 0, w, h);

            // Split view: left = haze, right = clear
            const centerX = w * 0.5;

            // Left side: WITH haze (blurred, unfocused)
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, centerX, h);
            ctx.clip();

            // Haze effect circles (random, unfocused)
            const hazeOpacity = Math.sin(progress * 0.05) * 0.1 + 0.2;
            for (let i = 0; i < 15; i++) {
                const x = (w * 0.25) + Math.sin(progress * 0.02 + i) * 40;
                const y = (h * 0.5) + Math.cos(progress * 0.03 + i * 2) * 50;
                const radius = 20 + Math.sin(progress * 0.04 + i) * 10;

                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${hazeOpacity * 0.1})`;
                ctx.fill();
            }

            // "Haze" label
            ctx.fillStyle = "rgba(247, 123, 74, 0.6)";
            ctx.font = "13px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("С мутностью", w * 0.25, h * 0.85);

            ctx.restore();

            // Right side: CLEAR (focused)
            ctx.save();
            ctx.beginPath();
            ctx.rect(centerX, 0, centerX, h);
            ctx.clip();

            // Focus ripples (concentric circles from center)
            const focusProgress = (progress % 100) / 100;
            for (let i = 0; i < 4; i++) {
                const radius = focusProgress * 150 + i * 30;
                const opacity = Math.max(0, 1 - focusProgress - i * 0.2);

                ctx.beginPath();
                ctx.arc(w * 0.75, h * 0.5, radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(74, 200, 247, ${opacity * 0.4})`;
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // Central focus point
            const pulseSize = Math.sin(progress * 0.1) * 3 + 10;
            ctx.beginPath();
            ctx.arc(w * 0.75, h * 0.5, pulseSize, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(74, 247, 200, 0.8)";
            ctx.fill();

            // Sharp grid (showing clarity)
            for (let i = -2; i <= 2; i++) {
                for (let j = -2; j <= 2; j++) {
                    const dotX = w * 0.75 + i * 30;
                    const dotY = h * 0.5 + j * 30;
                    const distance = Math.sqrt(i * i + j * j);
                    const opacity = Math.max(0, 1 - distance * 0.3);

                    ctx.beginPath();
                    ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(74, 200, 247, ${opacity * 0.5})`;
                    ctx.fill();
                }
            }

            // "Zero Haze" label
            ctx.fillStyle = "rgba(74, 247, 200, 0.8)";
            ctx.font = "13px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("Zero Haze", w * 0.75, h * 0.85);

            ctx.restore();

            // Center divider
            ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(centerX, 0);
            ctx.lineTo(centerX, h);
            ctx.stroke();
            ctx.setLineDash([]);

            // Eye icon at bottom center
            const eyeY = h * 0.15;
            const eyeX = w * 0.5;
            const blinkProgress = Math.sin(progress * 0.05);

            // Eye outline (ellipse)
            ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.ellipse(eyeX, eyeY, 25, 12 * Math.abs(blinkProgress), 0, 0, Math.PI * 2);
            ctx.stroke();

            // Pupil
            if (Math.abs(blinkProgress) > 0.3) {
                ctx.beginPath();
                ctx.arc(eyeX, eyeY, 6, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(74, 200, 247, 0.8)";
                ctx.fill();
            }

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
