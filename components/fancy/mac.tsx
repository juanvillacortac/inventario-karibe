import * as THREE from 'three'
import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Environment, useGLTF, ContactShadows, OrbitControls } from '@react-three/drei'
import { getAbsoluteURL } from '@/lib/utils/client'
import { use100vh } from 'react-div-100vh'
import Loading from '../loading'
import dynamic from 'next/dynamic'

function Model(props) {
  const group = useRef<THREE.Group>()
  const mesh = useRef<THREE.Mesh>()
  // Load model
  const { nodes, materials } = useGLTF(getAbsoluteURL({ path: '/mac-draco.glb' })) as any
  // Make it float
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 2) / 10 + 0.35, 0.1)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 4) / 10, 0.1)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, Math.sin(t / 4) / 20, 0.1)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (-5 + Math.sin(t)) / 5, 0.1)
  })
  // The jsx graph was auto-generated by: https://github.com/pmndrs/gltfjsx
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation-x={-0.425} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={materials.aluminium} geometry={nodes['Cube008'].geometry} ref={mesh} />
          <mesh material={materials['matte.001']} geometry={nodes['Cube008_1'].geometry} />
          <mesh geometry={nodes['Cube008_2'].geometry}>
            {/* Drei's HTML component can now "hide behind" canvas geometry */}
            <Html
              style={{
                width: 334,
                height: 216,
                overflow: 'hidden',
                background: '#f0f0f0',
                borderRadius: '3px',
              }}
              rotation-x={-Math.PI / 2}
              // position={[-0.13, 0.02, -0.09]}
              // position={[-0.02, 0.05, 0.1]}
              // position={[0, 0, 0]}
              position={[0, 0.05, -0.09]}
              transform
              occlude={[mesh]}
            >
              <div style={{
                width: 334 * 2,
                height: 216 * 2,
                transform: 'scale(0.5)',
                transformOrigin: 'top left',
              }}>
                <iframe
                  src="/"
                  frameBorder="0"
                  style={{width: '100%', height: '100%'}}
                />
              </div>
            </Html>
          </mesh>
        </group>
      </group>
      <mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]} />
      <group position={[0, -0.1, 3.39]}>
        <mesh material={materials.aluminium} geometry={nodes['Cube002'].geometry} />
        <mesh material={materials.trackpad} geometry={nodes['Cube002_1'].geometry} />
      </group>
      <mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} />
    </group>
  )
}

function MacComponent() {
  const sH = use100vh()
  return (
    <div
      className="h-[40vh] w-auto relative lg:h-[var(--min-h)]"
      style={{
        aspectRatio: '1/1',
        ['--min-h' as string]: `calc(${sH ? sH + 'px' : '100vh'} - 97px)`
      }}
    >
      <Canvas dpr={[1, 2]} camera={{ position: [-10, 0, -25], fov: 35 }} resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}>
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Suspense fallback={() => (<Loading />)}>
          <group rotation={[0, Math.PI, 0]}>
            <Model />
          </group>
          <Environment preset="city" />
        </Suspense>
        <ContactShadows rotation-x={Math.PI / 2} position={[0, -4.5, 0]} opacity={1} width={20} height={20} blur={2} far={4.5} />
        {/* <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} /> */}
      </Canvas>
    </div>
  )
}

const Mac = dynamic(async () => MacComponent, {
  ssr: false,
})
export default Mac
