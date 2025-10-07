import * as THREE from 'three'
import { useMemo } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'

export function TModel({props, selectedImage, selectedMaterial}) {
  const { nodes } = useGLTF('/model/BACKDESING2.compressed.glb')

  const logoImg = useTexture(selectedImage.src)
  const gripTex  = useTexture(selectedMaterial.src)
  
  logoImg.flipY = false
  gripTex.flipY  = false
  
  logoImg.colorSpace = THREE.SRGBColorSpace
  gripTex.colorSpace  = THREE.SRGBColorSpace

  const logotexture = useMemo(()=>{
    const texture = new THREE.MeshStandardMaterial({
      map: logoImg,
      metalness: 0,
      roughness: 0.9,
      side: THREE.DoubleSide,
      transparent: true,
    })
  
    if(logoImg){
      logoImg.wrapS = THREE.RepeatWrapping;
      logoImg.wrapT = THREE.RepeatWrapping;
      logoImg.repeat.set(-3, 3);
      logoImg.needsUpdate = true;
      logoImg.offset.set(1.26, -0.377);
      logoImg.rotation = Math.PI / 2 * 2;
    }
  
    return texture;
  },[logoImg])

  const mainMat = useMemo(()=>{
    const texture = new THREE.MeshStandardMaterial({
      map: gripTex,
      metalness: 0,
      roughness: 1.0,
      side: THREE.DoubleSide,
    })
  
    if(gripTex){
      gripTex.wrapS = THREE.RepeatWrapping;
      gripTex.wrapT = THREE.RepeatWrapping;
      gripTex.repeat.set(6, 6);
      gripTex.needsUpdate = true;
    }
  
    return texture;
  },[gripTex])
  
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={mainMat}
        position={[0, -7.293, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={11.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_5002.geometry}
        material={logotexture}
        position={[0.008, -7.283, -0.02]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={11.991}
      />
    </group>
  )
}

useGLTF.preload('/model/BACKDESING2.compressed.glb')
