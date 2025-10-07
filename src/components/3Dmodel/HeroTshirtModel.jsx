"use client"

import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { TModel } from './TMs';
import { OrbitControls, useProgress } from '@react-three/drei';
import { AxesHelper, DirectionalLight} from 'three';
import gsap from 'gsap';

const TshirtModel = ({ selectedTshirt }) => {
  return ( 
    <div className='absolute inset-0 z-10 flex items-center justify-center'>
      <Canvas className='min-h-[60rem] w-full' camera={{ position: [0.9, 0.5, -2.5], fov: 23 }}>
        <Suspense>
            <Scene selectedTshirt = {selectedTshirt} />
        </Suspense>
      </Canvas>
    </div>
  )
}

const Scene = ({selectedTshirt})=>{

  const containerRef = useRef(null);
  const modelRef = useRef(null);
  const {progress} = useProgress();
  const tl = gsap.timeline();
  const {viewport, camera, scene, size} = useThree();


  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)

  const hasAnimatedBefore = sessionStorage.getItem("hasAnimatedBefore");
  const isInitialAnimationPlayed = useRef(hasAnimatedBefore === "true");


  useEffect(() => {
    if (hasAnimatedBefore === "true") {
      setIsAnimationComplete(true);
    }
  }, []);

    // Mouse move event handle karanna
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!isAnimationComplete) return; 

      const x = (event.clientX / size.width) * 2 - 1;
      const y = -(event.clientY / size.height) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
  
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };

  }, [size, isAnimationComplete]);

  useFrame(() => {
    if (containerRef.current && isAnimationComplete) {
      const targetRotationY = mousePosition.x * (Math.PI / 80);
      const targetRotationX = mousePosition.y * (Math.PI / 160); 

      containerRef.current.rotation.y += (targetRotationY - containerRef.current.rotation.y) * 0.08;
      containerRef.current.rotation.x += (targetRotationX - containerRef.current.rotation.x) * 0.08;
    }
  });

  useEffect(() => {
    const light = new DirectionalLight(0xffffff, 2);
    light.position.set(60, 50, 40);
    camera.add(light);
    scene.add(camera);

    return () => {
      camera.remove(light);
    };
  }, [camera, scene]);

  useEffect(() => {
  if (!isInitialLoad) {
    const tl = gsap.timeline();
    tl.fromTo(
      containerRef.current.rotation,
      { y: 0 },
      {
        y: -Math.PI * 2.17, 
        duration: 2.5,
        ease: 'power2.out',
        onComplete: () => {
          containerRef.current.rotation.y = 0;
        }
      }
    );
  } else {
    setIsInitialLoad(false);
  }
}, [selectedTshirt]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("hasAnimatedBefore");
    };
    
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(()=>{
    if(progress >= 100 && !isInitialAnimationPlayed.current){

      isInitialAnimationPlayed.current = true;
      sessionStorage.setItem("hasAnimatedBefore", "true");

      tl.to(containerRef.current.position,{
        y: 0,
        duration: 1,
        ease: 'none',
      }).to(containerRef.current.rotation,{
        y: Math.PI / 3.3,
        duration: 1.2,
        ease: 'power2.out',
      }).to(containerRef.current.position,{
        y: 1.12,
        duration: 1.4,
        ease: 'power2.out',
      }).to(containerRef.current.rotation,{
        y: 0,
        duration: 2.4,
        ease: 'power2.out',
        onComplete: ()=>{
          setIsAnimationComplete(true);
        }
      })
    }
  },[progress])

  useEffect(()=>{
    if(modelRef.current){

      let scale;
      let positionY;

      if(viewport.width < 0.49){
        scale = 0.052;
        positionY = -0.342
      }else if (viewport.width < 0.97){
        scale = 0.06;
        positionY = -0.41;
      }else{
        scale = 0.07;
        positionY = -0.53
      }

      modelRef.current.scale.set(scale, scale, scale);
      modelRef.current.position.y = positionY;
    }
  },[viewport.width])


  return (
    <group position={[0, -1.25, 0]}>
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
      <group ref={containerRef}>
        <group ref={modelRef}>
          <TModel selectedImage={selectedTshirt.image} selectedMaterial={selectedTshirt.material}/>
        </group>
      </group>
    </group>
  )
}


export default TshirtModel
