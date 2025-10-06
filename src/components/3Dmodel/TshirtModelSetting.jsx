import * as THREE from 'three'
import { useMemo } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'

export function TModel({props, selectedImage, selectedMaterial}) {
  const { nodes } = useGLTF('/model/BACKDESING2.glb')

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
      <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          name="Object_2"
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={mainMat}
          position={[0, 0, -7.293]}
          scale={11.991}
        >
        </mesh>

        <mesh
          name="Object_3"
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={mainMat}
          position={[0, 0, -7.293]}
          scale={11.991}
        />
        <mesh
          name="Object_4"
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={mainMat}
          position={[0, 0, -7.293]}
          scale={11.991}
        />
        <mesh
          name="Object_5"
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={mainMat}
          position={[0.008, -0.021, -7.283]}
          scale={11.991}
        />
      </group>

      <group name="Sketchfab_model002" rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          name="Object_5002"
          castShadow
          receiveShadow
          geometry={nodes.Object_5002.geometry}
          material={logotexture}
          position={[0.008, 0.02, -7.283]}
          scale={11.991}
        >
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/model/BACKDESING2.glb')
