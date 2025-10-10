import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

import img2 from "../../../public/images/model (2).jpg";
import img3 from "../../../public/images/model (3).jpg";

const AnimatedText = ({ text, className, delay = 0 }) => {
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      
      // Desktop සඳහා පමණක් text animation
      mm.add("(min-width: 768px)", () => {
        const textElement = textRef.current;

        if (textElement) {
          const words = textElement.innerText.split(' ');
          textElement.innerHTML = '';

          words.forEach((word) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = '0.2';
            textElement.appendChild(span);
          });

          gsap.fromTo(
            textElement.querySelectorAll('span'),
            { opacity: 0.2 },
            {
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: textElement,
                start: "top 90%",
                end: "bottom 20%",
                toggleActions: "play none none none",
                once: true
              },
              delay: delay
            }
          );
        }
      });

      // Mobile සඳහා - text animation නැත
      mm.add("(max-width: 767px)", () => {
        const textElement = textRef.current;
        if (textElement) {
          // Text එක සාමාන්‍ය state එකේම තබා ගන්න
          textElement.style.opacity = '1';
        }
      });

    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <h5 ref={textRef} className={className}>
      {text}
    </h5>
  );
};

const FashionSection = () => {
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop සඳහා පමණක් image animations
      mm.add("(min-width: 768px)", () => {
        const scrollTriggerConfig = {
          trigger: sectionRef.current,
          start: "top 20%",    
          end: "bottom 10%",   
          toggleActions: "play none none none",
          once: true
        };

        gsap.fromTo(img1Ref.current, 
          { width: "10px", opacity: 0 },
          { 
            width: "200px", 
            opacity: 1, 
            duration: 3.5,
            ease: "power3.out",
            scrollTrigger: scrollTriggerConfig
          }
        );

        gsap.fromTo(img2Ref.current, 
          { width: "10px", opacity: 0 },
          { 
            width: "200px", 
            opacity: 1, 
            duration: 2.5,
            ease: "power3.out",
            scrollTrigger: scrollTriggerConfig
          }
        );
      });

      // Mobile සඳහා - images සහ video සාමාන්‍ය state එකේම තබා ගන්න
      mm.add("(max-width: 767px)", () => {
        if (img1Ref.current) {
          img1Ref.current.style.width = "150px";
          img1Ref.current.style.opacity = "1";
        }
        if (img2Ref.current) {
          img2Ref.current.style.width = "150px";
          img2Ref.current.style.opacity = "1";
        }
        if (videoRef.current) {
          videoRef.current.style.opacity = "1";
        }
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className='relative h-[850px] sm:h-[950px] overflow-hidden'>
      <div className='mx-auto relative w-full max-w-6xl h-full px-10 flex items-center justify-center'>
        <div className='flex items-center justify-between w-full h-[720px] '>
          <div ref={img1Ref} className='place-self-start w-[150px] h-[200px] sm:w-[200px] sm:h-[300px] rounded-2xl overflow-hidden'>
            <Image className='object-cover w-full h-full' src={img3} alt='mat'/>
          </div>
          <div ref={img2Ref} className='place-self-end w-[150px] h-[200px] sm:w-[200px] sm:h-[300px] rounded-2xl overflow-hidden'>
            <Image className='object-cover w-full h-full' src={img2} alt='mat'/>
          </div>
        </div>
        <div ref={videoRef} className='absolute w-[210px] h-[350px] sm:w-[260px] sm:h-[400px]  md:w-[380px] md:h-[550px]  rounded-2xl overflow-hidden z-10'>
            <video
              className='w-full h-full object-cover'
              controls={false}
              autoPlay
              loop
              muted
            >
              <source src="/video/modelVideo.mp4" type="video/mp4" />
            </video>
        </div>
        <div className='absolute h-[800px] w-full flex justify-between px-9  font-2'>

          <div className='place-self-end w-[280px]'>
            <AnimatedText 
              text="This week, stay fit. Our winter workout gear is designed specifically to keep you going in the toughest conditions."
              className="text-start"
              delay={0.2}
            />
          </div>

          <div className='place-self-start w-[270px]'>
            <AnimatedText 
              text="Perform your street gear to your next workout session and look cool."
              className="text-end"
              delay={0.4}
            />
          </div>
        </div>
        <div className='absolute '>
          <h2 className='font-3 text-[430px] text-[#ebeaea] '>mtkoon</h2>
        </div>
      </div>
    </section>
  )
}

export default FashionSection