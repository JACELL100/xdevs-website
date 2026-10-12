"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Environment, Float, Lightformer } from "@react-three/drei";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { outline, STROKE, strokes, toUnit } from "@/lib/emblem";

type Pointer = { x: number; y: number };

/** Extruded, bevelled chrome X built from the traced logo strokes. */
function Emblem({ pointer }: { pointer: RefObject<Pointer> }) {
  const group = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const shapes = strokes.map((s) => {
      const poly = outline(s, STROKE).map((p) => toUnit(p, 1 / 330));
      // Logo space is y-down; after flipping, winding reverses, so restore CCW.
      const pts = poly.map(([x, y]) => new THREE.Vector2(x, y)).reverse();
      return new THREE.Shape(pts);
    });
    const depth = 0.32;
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.035,
      bevelSegments: 4,
      curveSegments: 1,
    });
    geo.translate(0, 0, -depth / 2);
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const p = pointer.current;
    const targetY = Math.sin(t * 0.35) * 0.42 + p.x * 0.45;
    const targetX = Math.sin(t * 0.25) * 0.06 - p.y * 0.3;
    const k = 1 - Math.pow(0.001, delta);
    g.rotation.y += (targetY - g.rotation.y) * k * 0.6;
    g.rotation.x += (targetX - g.rotation.x) * k * 0.6;
    g.position.y = Math.sin(t * 0.9) * 0.08;
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry} castShadow={false}>
        <meshPhysicalMaterial
          color="#eef0f3"
          metalness={1}
          roughness={0.24}
          clearcoat={0.7}
          clearcoatRoughness={0.1}
          envMapIntensity={1.6}
        />
      </mesh>
    </group>
  );
}

type FloaterDef = {
  kind: "cube" | "octa" | "ico" | "tetra";
  pos: [number, number, number];
  scale: number;
  glass: boolean;
  depth: number;
  speed: number;
};

// Deterministic layout (no Math.random during render).
const FLOATERS: FloaterDef[] = [
  { kind: "cube", pos: [-3.6, 1.6, -0.6], scale: 0.42, glass: true, depth: 0.9, speed: 1.1 },
  { kind: "octa", pos: [3.5, 1.9, -1.2], scale: 0.32, glass: false, depth: 0.6, speed: 1.4 },
  { kind: "cube", pos: [3.1, -1.7, 0.4], scale: 0.34, glass: true, depth: 1.2, speed: 0.9 },
  { kind: "ico", pos: [-3.2, -1.9, 0.8], scale: 0.28, glass: false, depth: 1.4, speed: 1.6 },
  { kind: "tetra", pos: [-1.9, 2.6, -2.2], scale: 0.24, glass: false, depth: 0.4, speed: 1.2 },
  { kind: "octa", pos: [1.8, -2.7, -1.6], scale: 0.2, glass: false, depth: 0.5, speed: 1.8 },
  { kind: "cube", pos: [4.8, 0.2, -2.6], scale: 0.26, glass: true, depth: 0.3, speed: 1.3 },
  { kind: "ico", pos: [-4.9, 0.1, -2.4], scale: 0.2, glass: false, depth: 0.3, speed: 1.5 },
  { kind: "octa", pos: [0.9, 2.95, -3.2], scale: 0.16, glass: false, depth: 0.2, speed: 2 },
];

function Floaters({ pointer, lite }: { pointer: RefObject<Pointer>; lite: boolean }) {
  const refs = useRef<(THREE.Group | null)[]>([]);
  const items = lite ? FLOATERS.slice(0, 5) : FLOATERS;

  useFrame(() => {
    const p = pointer.current;
    items.forEach((f, i) => {
      const g = refs.current[i];
      if (!g) return;
      // Parallax: nearer objects (higher depth) drift further.
      g.position.x += (f.pos[0] + p.x * f.depth * 0.6 - g.position.x) * 0.05;
      g.position.y += (f.pos[1] + p.y * f.depth * 0.4 - g.position.y) * 0.05;
    });
  });

  return (
    <>
      {items.map((f, i) => (
        <group key={i} ref={(el) => void (refs.current[i] = el)} position={f.pos}>
          <Float speed={f.speed} rotationIntensity={1.2} floatIntensity={0.8}>
            <mesh scale={f.scale}>
              {f.kind === "cube" && <boxGeometry args={[1, 1, 1]} />}
              {f.kind === "octa" && <octahedronGeometry args={[1, 0]} />}
              {f.kind === "ico" && <icosahedronGeometry args={[1, 0]} />}
              {f.kind === "tetra" && <tetrahedronGeometry args={[1, 0]} />}
              {f.glass ? (
                <meshPhysicalMaterial
                  color="#ffffff"
                  metalness={0.1}
                  roughness={0.04}
                  transparent
                  opacity={0.16}
                  clearcoat={1}
                  envMapIntensity={2.5}
                  depthWrite={false}
                />
              ) : (
                <meshStandardMaterial color="#c9ccd2" metalness={1} roughness={0.22} flatShading />
              )}
              {f.glass && <Edges color="#f2f3f5" threshold={15} />}
            </mesh>
          </Float>
        </group>
      ))}
    </>
  );
}

function Rings() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  const c = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (a.current) a.current.rotation.z += dt * 0.08;
    if (b.current) b.current.rotation.z -= dt * 0.06;
    if (c.current) c.current.rotation.z += dt * 0.03;
  });
  return (
    <group position={[0, 0, -1]}>
      <mesh ref={a} rotation={[1.15, 0.25, 0]}>
        <torusGeometry args={[4.1, 0.006, 8, 220]} />
        <meshBasicMaterial color="#b9bdc4" transparent opacity={0.35} />
      </mesh>
      <mesh ref={b} rotation={[0.35, -0.5, 0]}>
        <torusGeometry args={[3.6, 0.005, 8, 220]} />
        <meshBasicMaterial color="#b9bdc4" transparent opacity={0.18} />
      </mesh>
      <mesh ref={c} rotation={[0.9, 0, 0]} position={[0, 0, -1.5]}>
        <torusGeometry args={[5.2, 0.008, 6, 64]} />
        <meshBasicMaterial color="#6b7078" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function Studio() {
  // Procedural studio lighting: crisp silver reflections with no HDR download.
  // Panels in front of the emblem (behind the camera) light its flat faces;
  // the strips create the brushed-chrome streaks.
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={["#0d0e10"]} />
      {/* Front fill + streaks */}
      <Lightformer form="rect" intensity={0.45} position={[0, 0, 9]} rotation-y={Math.PI} scale={[22, 14, 1]} />
      <Lightformer form="rect" intensity={4} position={[-2, 3, 8]} rotation={[0, Math.PI, -0.6]} scale={[18, 0.9, 1]} />
      <Lightformer form="rect" intensity={2.5} position={[2, -2.5, 8]} rotation={[0, Math.PI, -0.6]} scale={[18, 0.5, 1]} />
      {/* Top, sides and floor */}
      <Lightformer form="rect" intensity={5} position={[0, 6, -3]} scale={[14, 1.2, 1]} />
      <Lightformer form="rect" intensity={2.4} position={[-6, 1, -2]} rotation-y={Math.PI / 2} scale={[12, 1.6, 1]} />
      <Lightformer form="rect" intensity={2.4} position={[6, -1, -2]} rotation-y={-Math.PI / 2} scale={[12, 1.6, 1]} />
      <Lightformer form="ring" intensity={4} position={[3, 2.5, 6]} rotation-y={Math.PI} scale={2.4} />
      <Lightformer form="rect" intensity={1.4} position={[0, -5, 2]} rotation-x={-Math.PI / 2} scale={[14, 0.6, 1]} />
    </Environment>
  );
}

export default function HeroScene({
  active,
  lite,
  pointer,
  onReady,
}: {
  active: boolean;
  lite: boolean;
  pointer: RefObject<Pointer>;
  onReady: () => void;
}) {
  return (
    <Canvas
      dpr={[1, lite ? 1.25 : 1.75]}
      camera={{ position: [0, 0, 9], fov: 38 }}
      frameloop={active ? "always" : "never"}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      onCreated={() => requestAnimationFrame(onReady)}
      aria-hidden
    >
      <Studio />
      <ambientLight intensity={0.2} />
      <directionalLight position={[4, 6, 6]} intensity={1.2} />
      <Emblem pointer={pointer} />
      <Floaters pointer={pointer} lite={lite} />
      <Rings />
    </Canvas>
  );
}
