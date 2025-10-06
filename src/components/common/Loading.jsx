"use client"

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Logo from "../../../public/images/logoWhite.png" 
import Image from 'next/image'
import { useProgress } from '@react-three/drei'


const Loading = () => {

  const logoRef = useRef(null);
  const loadingRef = useRef(null);
  const mainRef = useRef(null);
  const { progress } = useProgress();

  const tl = gsap.timeline();

  useEffect(()=>{
    tl.to(logoRef.current,{
        opacity: 1,
        duration: 0.7,
        scale: 10,
        ease: "power2.out"
    }).to(logoRef.current,{
      scale: 10,
      duration: 60
    })

    tl.to(loadingRef.current,{
      opacity: 0,
      duration: 1.5,
      ease: "power2.out"
    }).to(loadingRef.current,{
      opacity: 1,
      duration: 0.1
    }).to(loadingRef.current,{
      opacity: 1,
      duration: 60
    })
  },[])

  useEffect(()=>{
    if (progress >= 100) {

      const tl = gsap.timeline();

      tl.to(logoRef.current,{
        scale:10,
        duration:2,
      }).to(logoRef.current,{
        scale: 1,
        opacity: 0,
        duration: 0.7,
        ease: "power2.in"
      }).to(mainRef.current,{
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",  
        display: "none"
      })
    }
  }, [progress])

  useEffect(()=>{
    if (progress >= 100) {

      const tl = gsap.timeline();

      tl.to(loadingRef.current,{
        opacity: 1,
        duration: 1
      }).to(loadingRef.current,{
        opacity: 0,
        duration: 0.1,
      }).to(loadingRef.current,{
        opacity: 0,
        duration: 60
      })
    }
  }, [progress])


  return (
    <div ref={mainRef} className='absolute inset-0 z-200 flex items-center justify-center bg-[#121313] overflow-hidden'>
      <div ref={logoRef}>
        <Image
          src={Logo}
          alt="logo"
          className='w-4 md:w-8'
          color='white'
        />
      </div>
      <div ref={loadingRef} className="absolute inset-0 z-20 flex items-center justify-center mt-38 md:mt-46 opacity-0  scale-75 md:scale-100">
        <div className='w-[50px]'>
          <svg width="60" height="60" viewBox="0 0 50 50"><g transform="translate(25,25)"><g transform="rotate(0)"><circle cx="12" cy="0" r="3" fill="#8d96a0"><animate attributeName="r" values="3;4;3" dur="1s" repeatCount="indefinite" begin="0s"></animate></circle><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="2s" repeatCount="indefinite"></animateTransform></g><g transform="rotate(120)"><circle cx="12" cy="0" r="3" fill="#8d96a0"><animate attributeName="r" values="3;4;3" dur="1s" repeatCount="indefinite" begin="0.3s"></animate></circle><animateTransform attributeName="transform" type="rotate" from="120" to="480" dur="2s" repeatCount="indefinite"></animateTransform></g><g transform="rotate(240)"><circle cx="12" cy="0" r="3" fill="#8d96a0"><animate attributeName="r" values="3;4;3" dur="1s" repeatCount="indefinite" begin="0.6s"></animate></circle><animateTransform attributeName="transform" type="rotate" from="240" to="600" dur="2s" repeatCount="indefinite"></animateTransform></g></g></svg>
        </div>
      </div>
    </div>
  )
}

export default Loading
