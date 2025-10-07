"use client"

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiMiniArrowLongRight } from "react-icons/hi2";
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Product = ({title, products}) => {
  const scrollContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const headerElementsRef = useRef([]);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    headerElementsRef.current = headerElementsRef.current.slice(0, 3);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Desktop සඳහා පමණක් animation
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
        // Header elements animation
        gsap.fromTo(".header-element", 
          {
            y: 80,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "top 60%",
              toggleActions: "play none none none",
              once: true
            }
          }
        );

        // Product cards animation
        gsap.fromTo(".product-card", 
          {
            y: 100, 
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15, 
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%", 
              end: "top 30%",  
              toggleActions: "play none none none", 
              once: true 
            }
          }
        );
      });

      // Mobile සඳහා - animation නොමැතිව
      mm.add("(max-width: 767px)", () => {
        // Mobile එකේ කිසිදු animation එකක් නොකරන්න
        // Elements මුල් state එකේම තබන්න
        gsap.set([".header-element", ".product-card"], {
          y: 0,
          opacity: 1
        });
      });

    }, sectionRef);

    return () => ctx.revert(); 
  }, [products]);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setIsAtStart(scrollLeft < 10);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
    }
  };
  
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.children[0];
      
      if (!firstCard) return;

      const scrollAmount = firstCard.getBoundingClientRect().width + 16;

      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const timer = setTimeout(() => {
        checkScrollPosition();
      }, 100);
      
      container.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);

      return () => {
        clearTimeout(timer);
        if (container) {
          container.removeEventListener('scroll', checkScrollPosition);
          window.removeEventListener('resize', checkScrollPosition);
        }
      };
    }
  }, [products]);

  const addToHeaderRefs = (el) => {
    if (el && !headerElementsRef.current.includes(el)) {
      headerElementsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className='mx-auto w-full max-w-6xl px-8 pt-10 pb-0 sm:pb-1 sm:pt-16 '>
      <div className='mb-7 flex items-center justify-between'>
        <h2 ref={addToHeaderRefs} className='header-element font-bold text-2xl md:text-3xl font-2'>{title}</h2>
        <div className='flex gap-6'>
          <HiMiniArrowLongLeft 
            ref={addToHeaderRefs}
            onClick={() => handleScroll('left')} 
            className={`header-element text-2xl transition-colors ${isAtStart ? 'text-gray-300 cursor-not-allowed' : 'text-black cursor-pointer'}`} 
          />
          <HiMiniArrowLongRight 
            ref={addToHeaderRefs}
            onClick={() => handleScroll('right')} 
            className={`header-element text-2xl transition-colors ${isAtEnd ? 'text-gray-300 cursor-not-allowed' : 'text-black cursor-pointer'}`} 
          />
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef} 
        className='flex overflow-x-auto gap-[16px] pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth'
      >
        {products.map((data) =>
            <Link 
              key={data.id} 
              href={`/t-shirt/${data.id}${data.title}`}
              className='product-card basis-full sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.33%-1rem)] xl:basis-[calc(25%-0.75rem)] flex-shrink-0 flex flex-col items-center snap-start py-6 cursor-pointer transform-gpu'
            >
              <div className='w-[250px]'>
                <div className='bg-[#ebeaea] w-full h-[350px] rounded-[7px] flex pt-5 overflow-hidden'>
                  <Image 
                    src={data.displayImg} 
                    alt={data.title} 
                    className='object-contain w-full h-auto transform-gpu' 
                  />
                </div>
                <div className='mt-4 flex flex-col items-center font-2 gap-1'>
                  <h2>{data.title}</h2>
                  <span>${data.price}</span>
                </div>
              </div>
            </Link>
        )}
      </div>
    </section>
  )
}

export default Product;