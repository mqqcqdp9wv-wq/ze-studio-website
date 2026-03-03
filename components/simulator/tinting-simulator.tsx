"use client";

import { useState, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { VehicleScene } from "./vehicle-scene";
import { ControlPanel } from "./control-panel";
import { TINT_CONFIG, type MaterialKey } from "./glass-material";

// Проверяем есть ли реальная модель в public/models/
const MODEL_PATH = "/models/crossover.glb";

export default function TintingSimulator() {
    const [material, setMaterial]   = useState<MaterialKey>("monocarbon");
    const [vlt, setVlt]             = useState(35);
    const [splitX, setSplitX]       = useState(50);
    const [doorOpen, setDoorOpen]   = useState(false);
    const [hasModel, setHasModel]   = useState(false);

    // Проверяем наличие GLB модели
    useEffect(() => {
        fetch(MODEL_PATH, { method: "HEAD" })
            .then((r) => setHasModel(r.ok))
            .catch(() => setHasModel(false));
    }, []);

    const handleMaterialChange = (key: MaterialKey) => {
        setMaterial(key);
        // Автоматически выставляем дефолтный VLT при смене плёнки
        setVlt(TINT_CONFIG[key].levels[0].vlt === 80 ? 80
             : TINT_CONFIG[key].levels[1]?.vlt ?? TINT_CONFIG[key].levels[0].vlt);
    };

    return (
        <div className="relative w-full h-full bg-[#0F0F0F]">
            {/* ─── Canvas — занимает весь родительский контейнер ─── */}
            <Canvas
                frameloop="always"
                shadows
                dpr={[1, 2]}
                camera={{ position: [5, 2.5, -5], fov: 42 }}
                style={{ width: "100%", height: "100%" }}
            >
                <Suspense fallback={null}>
                    <VehicleScene
                        materialKey={material}
                        vlt={vlt}
                        splitX={splitX}
                        doorOpen={doorOpen}
                        hasModel={hasModel}
                    />
                </Suspense>

                <OrbitControls
                    enablePan={false}
                    minDistance={3.5}
                    maxDistance={9}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 2.05}
                    makeDefault
                />
            </Canvas>

            {/* ─── UI поверх канваса ─── */}
            <ControlPanel
                material={material}
                vlt={vlt}
                splitX={splitX}
                doorOpen={doorOpen}
                onMaterialChange={handleMaterialChange}
                onVltChange={setVlt}
                onSplitChange={setSplitX}
                onDoorToggle={() => setDoorOpen((d) => !d)}
            />

            {/* ─── Заглушка: нет модели ─── */}
            {!hasModel && (
                <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-3 opacity-20">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white">
                        Placeholder — ожидание модели
                    </span>
                    <span className="font-mono text-[9px] text-white/50">
                        Добавь /public/models/crossover.glb
                    </span>
                </div>
            )}
        </div>
    );
}
