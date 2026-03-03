"use client";

import { TINT_CONFIG, type MaterialKey } from "./glass-material";

interface ControlPanelProps {
    material: MaterialKey;
    vlt: number;
    splitX: number;
    doorOpen: boolean;
    onMaterialChange: (m: MaterialKey) => void;
    onVltChange: (v: number) => void;
    onSplitChange: (v: number) => void;
    onDoorToggle: () => void;
}

export function ControlPanel({
    material,
    vlt,
    splitX,
    doorOpen,
    onMaterialChange,
    onVltChange,
    onSplitChange,
    onDoorToggle,
}: ControlPanelProps) {
    const config = TINT_CONFIG[material];
    const level  = config.levels.find((l) => l.vlt === vlt) ?? config.levels[0];
    const isGost = level.gost;

    const MATERIALS: MaterialKey[] = ["monocarbon", "centum", "rescue"];

    return (
        <>
            {/* ─── Слайдер До/После — сверху по центру ─── */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 w-[260px]">
                <input
                    type="range"
                    min={0} max={100}
                    value={splitX}
                    onChange={(e) => onSplitChange(Number(e.target.value))}
                    className="w-full h-[2px] cursor-ew-resize appearance-none bg-white/10 rounded-full
                               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4
                               [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full
                               [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-grab"
                />
                <div className="flex w-full justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/25">Без плёнки</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/25">С плёнкой</span>
                </div>
            </div>

            {/* ─── Кнопка двери — правый верхний угол ─── */}
            <button
                onClick={onDoorToggle}
                className="absolute top-6 right-6 z-30 font-mono text-[11px] uppercase tracking-[0.15em]
                           border border-white/10 bg-black/60 backdrop-blur-md px-4 py-2.5
                           text-white/50 hover:text-white/80 hover:border-white/20 transition-all"
            >
                {doorOpen ? "Закрыть" : "Осмотр салона"}
            </button>

            {/* ─── Главная панель — снизу ─── */}
            <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-48px)] max-w-[680px]
                           border border-white/[0.08] bg-black/70 backdrop-blur-xl p-6"
            >
                {/* Заголовок + бейдж */}
                <div className="flex items-start justify-between mb-5">
                    <div>
                        <h2 className="font-mono text-[15px] font-semibold text-white tracking-tight">
                            {config.fullName}
                        </h2>
                        <p className="mt-1 font-sans text-[12px] text-white/40 leading-relaxed max-w-[420px]">
                            {config.description}
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0 ml-4">
                        <span
                            className="font-mono text-[13px] font-bold border px-3 py-1"
                            style={{ color: config.accentColor, borderColor: `${config.accentColor}40` }}
                        >
                            {vlt}% VLT
                        </span>
                        <span
                            className={`font-mono text-[9px] uppercase tracking-[0.12em] border px-2 py-1 ${
                                isGost
                                    ? "text-green-400 border-green-800/50 bg-green-900/20"
                                    : "text-red-400 border-red-800/50 bg-red-900/20"
                            }`}
                        >
                            {isGost ? "✓ ГОСТ" : "× ГОСТ"}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-5">
                    {/* Выбор плёнки */}
                    <div className="flex-1">
                        <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/30 mb-2">
                            Материал
                        </p>
                        <div className="flex border border-white/[0.08]">
                            {MATERIALS.map((key, idx) => {
                                const c = TINT_CONFIG[key];
                                const active = material === key;
                                return (
                                    <button
                                        key={key}
                                        onClick={() => onMaterialChange(key)}
                                        className={`flex-1 py-2.5 font-mono text-[11px] transition-all
                                                    ${idx < MATERIALS.length - 1 ? "border-r border-white/[0.08]" : ""}
                                                    ${active ? "text-white bg-white/[0.06]" : "text-white/35 hover:text-white/60"}`}
                                    >
                                        {c.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* VLT уровни */}
                    <div className="flex-1">
                        <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/30 mb-2">
                            Светопропускание
                        </p>
                        <div className="flex gap-1.5">
                            {config.levels.map((lvl) => {
                                const active = vlt === lvl.vlt;
                                return (
                                    <button
                                        key={lvl.vlt}
                                        onClick={() => onVltChange(lvl.vlt)}
                                        className="flex-1 py-2.5 font-mono text-[12px] border transition-all"
                                        style={{
                                            borderColor: active ? config.accentColor + "80" : "rgba(255,255,255,0.08)",
                                            color:       active ? config.accentColor : "rgba(255,255,255,0.35)",
                                            background:  active ? config.accentColor + "10" : "transparent",
                                        }}
                                    >
                                        {lvl.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Подсказка вращения — левый нижний угол ─── */}
            <div className="absolute bottom-[140px] left-6 z-20 flex items-center gap-3 pointer-events-none">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10">
                    <span className="font-mono text-[9px] text-white/30">360°</span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/20">
                    Вращайте модель
                </span>
            </div>
        </>
    );
}
