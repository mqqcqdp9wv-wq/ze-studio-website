"use client";

import * as THREE from "three";

export interface TintLevel {
    vlt: number;
    label: string;
    color: string;
    transmission: number;
    roughness: number;
    gost: boolean;
}

export interface TintMaterial {
    name: string;
    fullName: string;
    description: string;
    accentColor: string;
    levels: TintLevel[];
}

// Конфигурация плёнок — все физические параметры
// transmission здесь = opacity материала (0 = невидим, 1 = глухой)
// VLT 5%  → почти глухое стекло  → opacity ≈ 0.94
// VLT 50% → полупрозрачное       → opacity ≈ 0.50
export const TINT_CONFIG: Record<string, TintMaterial> = {
    monocarbon: {
        name: "MonoCarbon",
        fullName: "Rayno MonoCarbon",
        description: "Наноуглеродная матрица. Абсолютный матовый чёрный. Гарантия стабильности цвета менее 1% выцветания за 10 лет. Нулевое сопротивление для сигналов 5G и ADAS.",
        accentColor: "#4A8FE7",
        levels: [
            { vlt: 5,  label: "5%",  color: "#050505", transmission: 0.94, roughness: 0.04, gost: false },
            { vlt: 15, label: "15%", color: "#0d0d0d", transmission: 0.80, roughness: 0.04, gost: false },
            { vlt: 35, label: "35%", color: "#181818", transmission: 0.62, roughness: 0.04, gost: false },
            { vlt: 50, label: "50%", color: "#222222", transmission: 0.50, roughness: 0.04, gost: true  },
        ],
    },
    centum: {
        name: "Centum",
        fullName: "Rayno Centum",
        description: "Диэлектрический нано-керамический спектрофильтр. Невидимый термощит, блокирующий 99% инфракрасного излучения. Полное соответствие ГОСТ для лобового стекла.",
        accentColor: "#0ED2E6",
        levels: [
            { vlt: 80, label: "80%", color: "#c8e6e4", transmission: 0.20, roughness: 0.0, gost: true },
        ],
    },
    rescue: {
        name: "Rescue",
        fullName: "Rescue",
        description: "Бронеплёнка для лобового стекла. Поглощение удара без искажения оптики. Максимальная прозрачность с защитными свойствами.",
        accentColor: "#8250FF",
        levels: [
            { vlt: 90, label: "90%", color: "#eaeaf4", transmission: 0.12, roughness: 0.0, gost: true },
        ],
    },
};

export type MaterialKey = "monocarbon" | "centum" | "rescue";

// Базовое заводское стекло (левая сторона слайдера)
// transmission = 0.10 → почти прозрачное (opacity 10%)
export const FACTORY_GLASS_PARAMS = {
    color: "#d0eef5",
    transmission: 0.10,
    roughness: 0.0,
};

// Создаёт Three.js материал для стекла
// params.transmission используется как opacity (0 = прозрачный, 1 = глухой)
export function createGlassMaterial(params: {
    color: string;
    transmission: number; // здесь это opacity (непрозрачность)
    roughness: number;
    clippingPlanes?: THREE.Plane[];
}): THREE.MeshPhysicalMaterial {
    return new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(params.color),
        metalness: 0.15,
        roughness: params.roughness,
        // PBR transmission отключён — используем простой alpha
        transmission: 0,
        opacity: params.transmission,
        transparent: true,
        envMapIntensity: 2.0,
        clearcoat: 0.8,
        clearcoatRoughness: 0.05,
        side: THREE.DoubleSide,
        depthWrite: false,
        clippingPlanes: params.clippingPlanes ?? [],
    });
}
