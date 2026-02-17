"use client";

import { useEffect, useRef } from "react";

export const ProtectionVisual = () => {
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

            // Chart area
            const chartX = w * 0.15;
            const chartY = h * 0.2;
            const chartWidth = w * 0.7;
            const chartHeight = h * 0.6;

            // Axes
            ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(chartX, chartY);
            ctx.lineTo(chartX, chartY + chartHeight);
            ctx.lineTo(chartX + chartWidth, chartY + chartHeight);
            ctx.stroke();

            // Grid lines
            for (let i = 1; i <= 4; i++) {
                const y = chartY + (chartHeight / 4) * i;
                ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
                ctx.beginPath();
                ctx.moveTo(chartX, y);
                ctx.lineTo(chartX + chartWidth, y);
                ctx.stroke();
            }

            // Data points (UV radiation vs protection)
            const dataPoints = 50;
            const animProgress = Math.min(progress / 100, 1);

            // UV radiation curve (without protection)
            ctx.beginPath();
            ctx.moveTo(chartX, chartY + chartHeight);

            for (let i = 0; i <= dataPoints * animProgress; i++) {
                const x = chartX + (chartWidth / dataPoints) * i;
                const value = Math.sin(i * 0.1) * 0.3 + 0.6; // Fluctuating high UV
                const y = chartY + chartHeight - chartHeight * value;

                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }

            ctx.strokeStyle = "rgba(247, 123, 74, 0.8)";
            ctx.lineWidth = 2;
            ctx.stroke();

            // Fill area under UV curve
            ctx.lineTo(chartX + (chartWidth / dataPoints) * dataPoints * animProgress, chartY + chartHeight);
            ctx.lineTo(chartX, chartY + chartHeight);
            ctx.closePath();
            ctx.fillStyle = "rgba(247, 123, 74, 0.1)";
            ctx.fill();

            // Protection curve (with nano-ceramic)
            ctx.beginPath();
            ctx.moveTo(chartX, chartY + chartHeight);

            for (let i = 0; i <= dataPoints * animProgress; i++) {
                const x = chartX + (chartWidth / dataPoints) * i;
                const value = 0.15; // Stable low heat
                const y = chartY + chartHeight - chartHeight * value;

                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }

            ctx.strokeStyle = "rgba(74, 200, 247, 0.9)";
            ctx.lineWidth = 2;
            ctx.stroke();

            // Fill area under protection curve
            ctx.lineTo(chartX + (chartWidth / dataPoints) * dataPoints * animProgress, chartY + chartHeight);
            ctx.lineTo(chartX, chartY + chartHeight);
            ctx.closePath();
            ctx.fillStyle = "rgba(74, 200, 247, 0.15)";
            ctx.fill();

            // Labels
            if (animProgress > 0.8) {
                const labelOpacity = (animProgress - 0.8) / 0.2;

                // "Без защиты"
                ctx.fillStyle = `rgba(247, 123, 74, ${labelOpacity * 0.8})`;
                ctx.font = "11px sans-serif";
                ctx.textAlign = "left";
                ctx.fillText("Без защиты", chartX + 10, chartY + chartHeight * 0.3);

                // "С nano-ceramic"
                ctx.fillStyle = `rgba(74, 200, 247, ${labelOpacity * 0.9})`;
                ctx.fillText("С nano-ceramic", chartX + 10, chartY + chartHeight * 0.85);

                // Temperature difference
                ctx.fillStyle = `rgba(255, 255, 255, ${labelOpacity * 0.6})`;
                ctx.font = "14px sans-serif";
                ctx.textAlign = "center";
                ctx.fillText("-15°C", chartX + chartWidth * 0.7, chartY + chartHeight * 0.55);
            }

            // Sun icon
            const sunX = chartX + chartWidth + 30;
            const sunY = chartY + 20;
            const sunPulse = Math.sin(progress * 0.1) * 0.2 + 0.8;

            ctx.beginPath();
            ctx.arc(sunX, sunY, 12 * sunPulse, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(247, 200, 74, ${sunPulse})`;
            ctx.fill();

            // Sun rays
            for (let i = 0; i < 8; i++) {
                const angle = (i * Math.PI * 2) / 8 + progress * 0.02;
                ctx.strokeStyle = `rgba(247, 200, 74, ${sunPulse * 0.6})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(sunX + Math.cos(angle) * 15, sunY + Math.sin(angle) * 15);
                ctx.lineTo(sunX + Math.cos(angle) * 22, sunY + Math.sin(angle) * 22);
                ctx.stroke();
            }

            progress++;
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
