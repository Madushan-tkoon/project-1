"use client"

import TshirtModel from '../3Dmodel/HeroTshirtModel'
import Header from '../common/Header'
import Button from '../common/Button'
import SlideControl from './SlideControl'
import slideData from '../../data/slideData'
import { useState, useEffect, useRef } from 'react'
import { IoBagHandleOutline } from "react-icons/io5";
import GlowCircle from '../common/GlowCircle'
import Loading from "../common/Loading"
import { useProgress } from '@react-three/drei'
import gsap from 'gsap'


const HeroSection = () => {
  const [selectedTshirt, setSelectedTshirt] = useState(slideData[1]);
  const { progress } = useProgress();

  // 🔹 Initialize loading as true until we check sessionStorage on client
  const [loading, setLoading] = useState(true);

  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const controlsRef = useRef(null);
  const buttonRef = useRef(null);

  const handleSlideChange = (data) => setSelectedTshirt(data);

  // ✅ Check sessionStorage safely inside useEffect
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasLoadedBefore = sessionStorage.getItem("hasLoadedBefore");
      setLoading(!hasLoadedBefore);
    }
  }, []);

  useEffect(() => {
    if (!loading && line1Ref.current && line2Ref.current && controlsRef.current && buttonRef.current) {
      const line1Element = line1Ref.current;
      const line2Element = line2Ref.current;
      const controlsElement = controlsRef.current;
      const buttonElement = buttonRef.current;

      gsap.set([line1Element, line2Element, controlsElement, buttonElement], {
        opacity: 0,
        visibility: 'hidden',
      });

      gsap.set([line1Element, line2Element], { clipPath: 'inset(0 100% 0 0)' });
      gsap.set([controlsElement, buttonElement], { y: 50 });

      const tl = gsap.timeline();
      tl.to(line1Element, {
        opacity: 1,
        visibility: 'visible',
        clipPath: 'inset(0 0% 0 0)',
        duration: 3,
        ease: "power2.out",
      })
        .to(line2Element, {
          opacity: 1,
          visibility: 'visible',
          clipPath: 'inset(0 0% 0 0)',
          duration: 2.8,
          ease: "power2.out",
        }, "-=3")
        .to([controlsElement, buttonElement], {
          opacity: 1,
          visibility: 'visible',
          y: 0,
          duration: 2,
          ease: "power2.out",
        }, "-=3");
    }
  }, [loading]);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setLoading(false);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("hasLoadedBefore", "true");
        }
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("hasLoadedBefore");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [loading]);

  return (
    <>
      <Header />
      {loading && <Loading />}
      <section className={`relative h-full overflow-hidden bg-neutral-900`}>
        <div className='mx-auto w-full max-w-6xl h-full px-5'>
          <div className='flex flex-col justify-between h-full py-12'>
            <div className='flex flex-col gap-6'>
              <h1 className='font-1 text-[42px] md:text-[75px] lg:text-[95px] font-medium leading-[1] tracking-wide text-white uppercase mt-10 md:mt-25'>
                <span ref={line1Ref} className='inline-block opacity-0'>you dream it,</span><br />
                <span ref={line2Ref} className='inline-block opacity-0'>we print it</span>
              </h1>
            </div>

            <div className='flex flex-col gap-6 items-center z-19 justify-between md:flex-row mb-[-38px] md:mb-0 scale-85 md:scale-100'>
              <div ref={controlsRef} className="opacity-0">
                <SlideControl
                  slideData={slideData}
                  onSlideChange={handleSlideChange}
                  selectedTshirtId={selectedTshirt.id}
                />
              </div>

              <div ref={buttonRef} className='flex gap-4 opacity-0'>
                <Button color="black" href={`/t-shirt/${selectedTshirt.id}`}>
                  <div className='flex items-center uppercase gap-4 text-black'>
                    <IoBagHandleOutline className='text-[22px]' />
                    Add To Cart
                  </div>
                </Button>
              </div>
            </div>
          </div>
          <div className='absolute inset-0 max-h-[600px] flex items-center justify-center mx-auto my-auto'>
            <TshirtModel selectedTshirt={selectedTshirt} />
          </div>

          <div className='absolute scale-40 mt-6 inset-0 flex items-center justify-center z-[1] opacity-60 md:mt-26 md:scale-50'>
            <GlowCircle />
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
