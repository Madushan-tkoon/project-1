"use client"
import { Canvas, useThree } from '@react-three/fiber'
import React, { Suspense, useEffect, useRef } from 'react'
import { TModel } from './TMs';
import { OrbitControls } from '@react-three/drei'
import {DirectionalLight } from 'three'

const DitailsTshirtModel = ({logo, material}) => {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0.9, 0.5, -2.5], fov: 23 }}>
        <Suspense>
          <Scene logo={logo} material={material}/>
        </Suspense>
      </Canvas>
    </div>
  )
}

const Scene = ({logo, material}) => {
  const { camera, scene } = useThree()

  const modelRef = useRef(null)

  useEffect(() => {
    const light = new DirectionalLight(0xffffff, 2)
    light.position.set(60, 50, 40)
    camera.add(light)
    scene.add(camera)

    return () => {
      camera.remove(light)
    }
  }, [camera, scene])

  return (
    <group position={[0, 0, 0]}>
      <OrbitControls
        target={[0, 0, 0]}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        minDistance={3}
        maxDistance={3}
      />
      <ambientLight intensity={0.6} />
      <group>
        <group position={[0, -1.02, 0]} ref={modelRef} scale={0.13}>
        <TModel selectedImage={logo}  selectedMaterial={material}/>
        </group>
      </group>
    </group>
  )
}

export default DitailsTshirtModel

