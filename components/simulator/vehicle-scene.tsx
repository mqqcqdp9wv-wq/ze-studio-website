"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";
import {
    createGlassMaterial,
    FACTORY_GLASS_PARAMS,
    TINT_CONFIG,
    type MaterialKey,
} from "./glass-material";

// Имена mesh-объектов Mercedes S-Class (из GLB структуры)
// MM_Glass_WindowTintFront — лобовое + боковые окна
// MM_Glass_Mphong2 — остальные стёкла кузова
const GLASS_KEYWORDS  = ["mm_glass_window", "mm_glass_mphong2"];
const DOOR_KEYWORDS   = ["door"]; // в этой модели дверей нет отдельно
const BODY_KEYWORDS   = ["carpaint", "mm_carpaint"];

interface VehicleSceneProps {
    materialKey: MaterialKey;
    vlt: number;
    splitX: number; // 0–100
    doorOpen: boolean;
    hasModel: boolean;
}

// ──────────────────────────────────────────────────────
// Процедурная машина — заглушка пока нет .glb модели
// ──────────────────────────────────────────────────────
function ProceduralCar({
    materialKey,
    vlt,
    splitX,
    doorOpen,
}: Omit<VehicleSceneProps, "hasModel">) {
    const { gl } = useThree();
    gl.localClippingEnabled = true;

    const doorRef = useRef<THREE.Group>(null);

    const config = TINT_CONFIG[materialKey];
    const level  = config.levels.find((l) => l.vlt === vlt) ?? config.levels[0];

    // Clipping planes для слайдера До/После
    const { clipFactory, clipTint } = useMemo(() => ({
        clipFactory: new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0), // правая → скрывает тонировку
        clipTint:    new THREE.Plane(new THREE.Vector3( 1, 0, 0), 0), // левая  → скрывает заводское
    }), []);

    // Материалы стёкол
    const matFactory = useMemo(() =>
        createGlassMaterial({ ...FACTORY_GLASS_PARAMS, clippingPlanes: [clipFactory] }),
    [clipFactory]);

    const matTint = useMemo(() =>
        createGlassMaterial({
            color:        level.color,
            transmission: level.transmission,
            roughness:    level.roughness,
            clippingPlanes: [clipTint],
        }),
    [level, clipTint]);

    // Синхронизируем плоскости с позицией слайдера
    useFrame(() => {
        const x = (splitX / 100) * 4 - 2;
        clipFactory.constant = -x;
        clipTint.constant    =  x;

        // Анимация двери (lerp 60fps)
        if (doorRef.current) {
            const target = doorOpen ? -Math.PI / 3 : 0;
            doorRef.current.rotation.y = THREE.MathUtils.lerp(
                doorRef.current.rotation.y,
                target,
                0.08
            );
        }
    });

    const bodyMat = useMemo(() =>
        new THREE.MeshStandardMaterial({ color: "#1a1a1a", roughness: 0.3, metalness: 0.8 }),
    []);

    const rimMat = useMemo(() =>
        new THREE.MeshStandardMaterial({ color: "#111", roughness: 0.2, metalness: 0.9 }),
    []);

    const tireMat = useMemo(() =>
        new THREE.MeshStandardMaterial({ color: "#080808", roughness: 0.9 }),
    []);

    return (
        <group position={[0, 0, 0]}>
            {/* ─── Кузов ─── */}
            <mesh castShadow receiveShadow material={bodyMat} position={[0, 0.35, 0]}>
                <boxGeometry args={[4.2, 0.75, 1.85]} />
            </mesh>
            {/* Крыша */}
            <mesh castShadow material={bodyMat} position={[-0.15, 0.9, 0]}>
                <boxGeometry args={[2.4, 0.55, 1.65]} />
            </mesh>
            {/* Капот скос */}
            <mesh castShadow material={bodyMat} position={[1.35, 0.62, 0]} rotation={[0, 0, -0.35]}>
                <boxGeometry args={[0.8, 0.12, 1.65]} />
            </mesh>
            {/* Багажник скос */}
            <mesh castShadow material={bodyMat} position={[-1.3, 0.62, 0]} rotation={[0, 0, 0.28]}>
                <boxGeometry args={[0.7, 0.12, 1.65]} />
            </mesh>

            {/* ─── Стёкла (тонировка) ─── */}
            {/* Лобовое */}
            <mesh position={[0.98, 0.88, 0]} rotation={[0, 0, -0.62]} material={matTint}>
                <planeGeometry args={[0.78, 1.6]} />
            </mesh>
            <mesh position={[0.98, 0.88, 0]} rotation={[0, 0, -0.62]} material={matFactory}>
                <planeGeometry args={[0.78, 1.6]} />
            </mesh>

            {/* Заднее */}
            <mesh position={[-1.28, 0.88, 0]} rotation={[0, 0, 0.5]} material={matTint}>
                <planeGeometry args={[0.72, 1.6]} />
            </mesh>
            <mesh position={[-1.28, 0.88, 0]} rotation={[0, 0, 0.5]} material={matFactory}>
                <planeGeometry args={[0.72, 1.6]} />
            </mesh>

            {/* Боковые стёкла — правая сторона */}
            {[[0.38, 0.91, 0.927], [-0.5, 0.91, 0.927]].map((pos, idx) => (
                <group key={`rside-${idx}`}>
                    <mesh position={pos as [number, number, number]} material={matTint}>
                        <planeGeometry args={[0.88, 0.5]} />
                    </mesh>
                    <mesh position={pos as [number, number, number]} material={matFactory}>
                        <planeGeometry args={[0.88, 0.5]} />
                    </mesh>
                </group>
            ))}
            {/* Боковые стёкла — левая сторона */}
            {[[0.38, 0.91, -0.927], [-0.5, 0.91, -0.927]].map((pos, idx) => (
                <group key={`lside-${idx}`}>
                    <mesh position={pos as [number, number, number]} rotation={[0, Math.PI, 0]} material={matTint}>
                        <planeGeometry args={[0.88, 0.5]} />
                    </mesh>
                    <mesh position={pos as [number, number, number]} rotation={[0, Math.PI, 0]} material={matFactory}>
                        <planeGeometry args={[0.88, 0.5]} />
                    </mesh>
                </group>
            ))}

            {/* ─── Левая передняя дверь (анимируется) ─── */}
            <group ref={doorRef} position={[0.5, 0.35, -0.93]}>
                <mesh castShadow material={bodyMat} position={[0, 0, -0.04]}>
                    <boxGeometry args={[0.9, 0.72, 0.06]} />
                </mesh>
            </group>

            {/* ─── Колёса ─── */}
            {([ [-1.3, -0.08,  0.98], [1.3, -0.08,  0.98],
                [-1.3, -0.08, -0.98], [1.3, -0.08, -0.98],
            ] as [number, number, number][]).map((pos, i) => (
                <group key={i} position={pos}>
                    <mesh rotation={[Math.PI / 2, 0, 0]} material={tireMat}>
                        <cylinderGeometry args={[0.38, 0.38, 0.26, 32]} />
                    </mesh>
                    <mesh rotation={[Math.PI / 2, 0, 0]} material={rimMat}>
                        <cylinderGeometry args={[0.24, 0.24, 0.28, 16]} />
                    </mesh>
                </group>
            ))}

            {/* Тень */}
            <ContactShadows
                position={[0, -0.46, 0]}
                opacity={0.7}
                scale={12}
                blur={2.5}
                far={1}
                color="#000"
            />
        </group>
    );
}

// ──────────────────────────────────────────────────────
// GLB модель — подключается когда есть файл
// ──────────────────────────────────────────────────────
function GLBCar({
    materialKey,
    vlt,
    splitX,
    doorOpen,
}: Omit<VehicleSceneProps, "hasModel">) {
    const { scene } = useGLTF("/models/crossover.glb");
    const { gl } = useThree();
    gl.localClippingEnabled = true;

    const doorRef = useRef<THREE.Object3D | null>(null);
    const config = TINT_CONFIG[materialKey];
    const level  = config.levels.find((l) => l.vlt === vlt) ?? config.levels[0];

    const { clipFactory, clipTint } = useMemo(() => ({
        clipFactory: new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0),
        clipTint:    new THREE.Plane(new THREE.Vector3( 1, 0, 0), 0),
    }), []);

    // Применяем материалы к стёклам при изменении конфига
    useEffect(() => {
        scene.traverse((child) => {
            if (!(child instanceof THREE.Mesh)) return;
            const name = child.name.toLowerCase();

            // Дверь
            if (DOOR_KEYWORDS.some((k) => name.includes(k))) {
                doorRef.current = child;
            }

            // Стёкла
            if (GLASS_KEYWORDS.some((k) => name.includes(k))) {
                child.material = createGlassMaterial({
                    color:        level.color,
                    transmission: level.transmission,
                    roughness:    level.roughness,
                    clippingPlanes: [clipTint],
                });
                child.castShadow    = false;
                child.receiveShadow = false;
                // Фикс пропадания при орбите: рендерим стёкла после кузова
                child.renderOrder   = 2;
                child.frustumCulled = false;
            }

            // Кузов
            if (BODY_KEYWORDS.some((k) => name.includes(k))) {
                (child.material as THREE.MeshStandardMaterial).color?.set("#1a1a1a");
            }
        });
    }, [scene, level, clipTint]);

    useFrame(() => {
        const x = (splitX / 100) * 4 - 2;
        clipFactory.constant = -x;
        clipTint.constant    =  x;

        if (doorRef.current) {
            const target = doorOpen ? -Math.PI / 3 : 0;
            doorRef.current.rotation.y = THREE.MathUtils.lerp(
                doorRef.current.rotation.y,
                target,
                0.08
            );
        }
    });

    return (
        <group>
            {/* scale — подобрать под фактический размер модели */}
            <primitive object={scene} scale={0.5} position={[0, 0, 0]} />
            <ContactShadows position={[0, -0.01, 0]} opacity={0.8} scale={12} blur={2.5} far={4} />
        </group>
    );
}

// ──────────────────────────────────────────────────────
// Главный экспорт — выбирает версию в зависимости от наличия модели
// ──────────────────────────────────────────────────────
export function VehicleScene(props: VehicleSceneProps) {
    return (
        <>
            <Environment preset="city" />
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
            <directionalLight position={[-5, 4, -3]} intensity={0.4} />

            {props.hasModel
                ? <GLBCar {...props} />
                : <ProceduralCar {...props} />
            }
        </>
    );
}
