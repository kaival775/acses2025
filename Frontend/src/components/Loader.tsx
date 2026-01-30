import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const maskGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 100);
      }
    });

    // Mask animation - show for 1.5s then zoom out smoothly
    tl.to(maskGroupRef.current, {
      scale: 1,
      duration: 0.8,
      ease: 'power2.out',
      delay: 1.5,
      force3D: true
    })
    .to(maskGroupRef.current, {
      rotate: 8,
      duration: 1.4,
      ease: 'power3.inOut',
      transformOrigin: '50% 50%',
      force3D: true
    }, '-=0.8')
    .to(maskGroupRef.current, {
      scale: 12,
      duration: 1.4,
      delay: -1.2,
      ease: 'power3.inOut',
      transformOrigin: '50% 50%',
      opacity: 0,
      force3D: true
    })
    .to(loaderRef.current, {
      opacity: 0,
      duration: 0.3
    }, '-=0.3');

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Logo with animation */}
      <div ref={maskGroupRef} className="absolute" style={{ willChange: 'transform, opacity' }}>
        <img
          src="/acses.png"
          alt="ACSES"
          className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] object-contain"
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        />
      </div>
    </div>
  );
}
