"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const nodesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const arcsGroupRef = useRef<THREE.Group>(null);

  const nodeCount = 300;

  const nodePositions = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 0.5;
      pos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      pos[i * 3 + 1] = Math.cos(phi) * r;
      pos[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r;
    }
    return pos;
  }, []);

  // Build connection lines between nearby nodes
  const linePositions = useMemo(() => {
    const lines: number[] = [];
    for (let i = 0; i < nodeCount; i += 5) {
      for (let j = i + 1; j < Math.min(i + 15, nodeCount); j++) {
        const dx = nodePositions[i*3] - nodePositions[j*3];
        const dy = nodePositions[i*3+1] - nodePositions[j*3+1];
        const dz = nodePositions[i*3+2] - nodePositions[j*3+2];
        if (Math.sqrt(dx*dx+dy*dy+dz*dz) < 0.8) {
          lines.push(nodePositions[i*3], nodePositions[i*3+1], nodePositions[i*3+2]);
          lines.push(nodePositions[j*3], nodePositions[j*3+1], nodePositions[j*3+2]);
        }
      }
    }
    return new Float32Array(lines);
  }, [nodePositions]);

  // Arc curves between random nodes (animated transactions)
  const arcs = useMemo(() => {
    const arcList: { points: THREE.Vector3[]; phase: number }[] = [];
    for (let k = 0; k < 12; k++) {
      const i = Math.floor(Math.random() * nodeCount);
      const j = Math.floor(Math.random() * nodeCount);
      const start = new THREE.Vector3(nodePositions[i*3], nodePositions[i*3+1], nodePositions[i*3+2]);
      const end = new THREE.Vector3(nodePositions[j*3], nodePositions[j*3+1], nodePositions[j*3+2]);
      const mid = start.clone().add(end).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(2.4);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      arcList.push({ points: curve.getPoints(30), phase: Math.random() * Math.PI * 2 });
    }
    return arcList;
  }, [nodePositions]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.2;
    if (nodesRef.current) {
      nodesRef.current.rotation.y = t * 0.2;
      nodesRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.2;
      linesRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (arcsGroupRef.current) {
      arcsGroupRef.current.rotation.y = t * 0.2;
      arcsGroupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    // Pulsing glow
    const light = meshRef.current.parent?.getObjectByName("glow") as THREE.Mesh;
    if (light) {
      const scale = 1 + Math.sin(t * 2) * 0.05;
      light.scale.setScalar(scale);
    }
  });

  return (
    <>
      {/* Wireframe globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#f97316" wireframe transparent opacity={0.25} />
      </mesh>

      {/* Glow sphere */}
      <mesh name="glow">
        <sphereGeometry args={[1.52, 32, 32]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>

      {/* Nodes */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#f97316" size={0.04} sizeAttenuation transparent opacity={0.8} />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#eab308" transparent opacity={0.15} />
      </lineSegments>

      {/* Transaction arcs */}
      <group ref={arcsGroupRef}>
        {arcs.map((arc, i) => {
          const pts = new Float32Array(arc.points.length * 3);
          arc.points.forEach((p, j) => {
            pts[j*3] = p.x; pts[j*3+1] = p.y; pts[j*3+2] = p.z;
          });
          return (
            <line key={i}>
              <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[pts, 3]} />
              </bufferGeometry>
              <lineBasicMaterial color="#f97316" transparent opacity={0.5} />
            </line>
          );
        })}
      </group>
    </>
  );
}

function PulsingLight() {
  const ref = useRef<THREE.PointLight>(null);
  useFrame(s => {
    if (ref.current) ref.current.intensity = 2 + Math.sin(s.clock.elapsedTime * 1.5) * 1;
  });
  return <pointLight ref={ref} position={[3, 3, 3]} color="#f97316" intensity={2} />;
}

export default function BitcoinGlobe3D() {
  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]} style={{ background: "transparent" }}>
        <ambientLight intensity={0.3} />
        <PulsingLight />
        <pointLight position={[-3, -2, -2]} color="#eab308" intensity={1} />
        <Globe />
      </Canvas>
    </div>
  );
}
