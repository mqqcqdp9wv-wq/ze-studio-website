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
export const TINT_CONFIG: Record<string, TintMaterial> = {
    monocarbon: {
        name: "MonoCarbon",
        fullName: "Rayno MonoCarbon",
        description: "Наноуглеродная матрица. Абсолютный матовый чёрный. Гарантия стабильности цвета менее 1% выцветания за 10 лет. Нулевое сопротивление для сигналов 5G и ADAS.",
        accentColor: "#4A8FE7",
        levels: [
            { vlt: 5,  label: "5%",  color: "#050505", transmission: 0.05, roughness: 0.05, gost: false },
            { vlt: 15, label: "15%", color: "#111111", transmission: 0.20, roughness: 0.05, gost: false },
            { vlt: 35, label: "35%", color: "#212121", transmission: 0.40, roughness: 0.05, gost: false },
            { vlt: 50, label: "50%", color: "#424242", transmission: 0.60, roughness: 0.05, gost: true  },
        ],
    },
    centum: {
        name: "Centum",
        fullName: "Rayno Centum",
        description: "Диэлектрический нано-керамический спектрофильтр. Невидимый термощит, блокирующий 99% инфракрасного излучения. Полное соответствие ГОСТ для лобового стекла.",
        accentColor: "#0ED2E6",
        levels: [
            { vlt: 80, label: "80%", color: "#b2dfdb", transmission: 0.90, roughness: 0.0, gost: true },
        ],
    },
    rescue: {
        name: "Rescue",
        fullName: "Rescue",
        description: "Бронеплёнка для лобового стекла. Поглощение удара без искажения оптики. Максимальная прозрачность с защитными свойствами.",
        accentColor: "#8250FF",
        levels: [
            { vlt: 90, label: "90%", color: "#e8e8f0", transmission: 0.92, roughness: 0.0, gost: true },
        ],
    },
};

export type MaterialKey = "monocarbon" | "centum" | "rescue";

// Базовое заводское стекло (левая сторона слайдера)
export const FACTORY_GLASS_PARAMS = {
    color: "#e0f7fa",
    transmission: 0.95,
    roughness: 0.0,
    ior: 1.52,
};

// Создаёт Three.js материал для стекла
export function createGlassMaterial(params: {
    color: string;
    transmission: number;
    roughness: number;
    clippingPlanes?: THREE.Plane[];
}): THREE.MeshPhysicalMaterial {
    return new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(params.color),
        metalness: 0.1,
        roughness: params.roughness,
        transmission: params.transmission,
        opacity: 1.0,
        ior: 1.52,
        thickness: 1,
        transparent: true,
        envMapIntensity: 1.5,
        clearcoat: 1,
        clearcoatRoughness: 0,
        clippingPlanes: params.clippingPlanes ?? [],
    });
}
