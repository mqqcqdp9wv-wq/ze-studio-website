"use client";

import { useEffect, useRef } from "react";

export const FlowchartVisual = () => {
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

        // Draw function
        const draw = () => {
            const w = canvas.width / (window.devicePixelRatio || 1);
            const h = canvas.height / (window.devicePixelRatio || 1);

            // Clear canvas
            ctx.clearRect(0, 0, w, h);

            // Draw nodes (circles)
            const nodes = [
                { x: w * 0.2, y: h * 0.3, label: "Data" },
                { x: w * 0.5, y: h * 0.2, label: "QA" },
                { x: w * 0.8, y: h * 0.4, label: "Deploy" },
            ];

            // Draw connections (lines)
            ctx.strokeStyle = "rgba(74, 123, 247, 0.3)";
            ctx.lineWidth = 2;

            // Animated line from node 1 to node 2
            const lineProgress = Math.min(progress / 100, 1);
            ctx.beginPath();
            ctx.moveTo(nodes[0].x, nodes[0].y);
            const x1 = nodes[0].x + (nodes[1].x - nodes[0].x) * lineProgress;
            const y1 = nodes[0].y + (nodes[1].y - nodes[0].y) * lineProgress;
            ctx.lineTo(x1, y1);
            ctx.stroke();

            // Line from node 2 to node 3 (appears after first line)
            if (progress > 50) {
                const lineProgress2 = Math.min((progress - 50) / 50, 1);
                ctx.beginPath();
                ctx.moveTo(nodes[1].x, nodes[1].y);
                const x2 = nodes[1].x + (nodes[2].x - nodes[1].x) * lineProgress2;
                const y2 = nodes[1].y + (nodes[2].y - nodes[1].y) * lineProgress2;
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }

            // Draw nodes
            nodes.forEach((node, i) => {
                const nodeProgress = Math.min(Math.max((progress - i * 30) / 30, 0), 1);

                // Node circle
                ctx.beginPath();
                ctx.arc(node.x, node.y, 8 * nodeProgress, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(74, 123, 247, 0.8)";
                ctx.fill();

                // Node label
                if (nodeProgress > 0.5) {
                    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
                    ctx.font = "12px sans-serif";
                    ctx.textAlign = "center";
                    ctx.fillText(node.label, node.x, node.y - 15);
                }
            });

            // Update progress
            progress += 0.5;
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
