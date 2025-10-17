import React, { useEffect, useRef } from 'react'
import { Store, Award, Ruler } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const FeaturesSection = () => {
  const sectionRef = useRef(null)
  const featuresRef = useRef([])

  const features = [
    {
      icon: <Store className="w-10 h-10 text-black mb-4" />,
      title: 'Wide Style Selection',
      description: 'Discover an extensive range of styles, from casual wear to formal attire.',
    },
    {
      icon: <Award className="w-10 h-10 text-black mb-4" />,
      title: 'Quality Fabric',
      description: 'Our clothing is made from high-quality materials, ensuring durability and comfort.',
    },
    {
      icon: <Ruler className="w-10 h-10 text-black mb-4" />,
      title: 'Size Inclusivity',
      description: 'Range of sizes, ensuring that every man can find clothing that fits well and feels comfortable.',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        featuresRef.current.forEach((item, index) => {
          if (item) {
            gsap.fromTo(item, 
              {
                opacity: 0,
                y: 60,
                scale: 0.8
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 80%", 
                  end: "bottom 20%",
                  toggleActions: "play none none none"
                }
              }
            )
          }
        })
      });

      mm.add("(max-width: 767px)", () => {
        featuresRef.current.forEach((item, index) => {
          if (item) {
            gsap.set(item, {
              opacity: 1,
              y: 0,
              scale: 1
            });
          }
        })
      });

    }, sectionRef)

    return () => ctx.revert() 
  }, [])

  const addToRefs = (el) => {
    if (el && !featuresRef.current.includes(el)) {
      featuresRef.current.push(el)
    }
  }

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="flex flex-col justify-between gap-12 md:gap-5 md:flex-row max-w-6xl mx-auto px-6 text-center">
        {features.map((feature, index) => (
          <div 
            key={index} 
            ref={addToRefs}
            className="flex flex-col items-center opacity-0" 
          >
            {feature.icon}
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection