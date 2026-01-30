import { useState, useEffect } from 'react';
import LaserFlow from './components/LaserFlow';
export default function BatmanLanding() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        setIsScrolled(true);
      } else if (e.deltaY < 0) {
        setIsScrolled(false);
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      {/* Animated Background Grid - Cyberpunk DC Style */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(139, 26, 26, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 26, 26, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>

       
      
      {/* Spotlight Effect with Bat Signal */}
      {/* {!isScrolled && (
        <>
          <div className="spotlight"></div>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 opacity-5 pointer-events-none z-1"
               style={{
                 background: 'radial-gradient(circle, rgba(139, 26, 26, 0.3) 0%, transparent 70%)',
                 filter: 'blur(40px)'
               }}></div>
        </>
      )} */}
  
      {/* Neo-Noir Comic Panel Layout - Removed */}

      {/* Central ACSES Text - Oversized, Intimidating */}
      <div 
        className={`absolute inset-0 z-10 transition-all duration-1500 ease-out flex items-center justify-center ${
          isScrolled ? 'opacity-0 pointer-events-none -translate-y-20' : 'opacity-100 translate-y-0'
        }`}
        onWheel={() => setIsScrolled(true)}
      >
        <div className="absolute md:top-35 right-35 md:right-70 inset-0 pointer-events-none md:scale-[180%] scale-[350%]" >
          <LaserFlow color="#8b1a1a" />
        </div>
            
        <div className="absolute z-1000 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center px-4"
             style={{ top: 'calc(38% + 10rem)' }}>
          {/* ACSES Text with Dramatic Shadow and DC Styling */}
          <div className="relative">

            {/* Multiple layered glowing effects with animations */}
              <div className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(139, 26, 26, 0.8) 0%, rgba(139, 26, 26, 0.4) 40%, transparent 70%)',
                    animation: 'glow-pulse 4s ease-in-out infinite'
                  }}></div>
              <div className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(245, 245, 220, 0.3) 0%, rgba(139, 26, 26, 0.5) 50%, transparent 70%)',
                    animation: 'glow-rotate 8s linear infinite, glow-pulse 3s ease-in-out infinite'
                  }}></div>
            
            <h1 className="font-vengeance  text-7xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9rem] mb-2 sm:mb-4 tracking-[0.1em] sm:tracking-[0.15em] leading-none relative z-10"
                style={{
                  textShadow: '4px 4px 0px rgba(0, 0, 0, 0.9), 8px 8px 16px rgba(0, 0, 0, 0.8), 0 0 20px rgba(139, 26, 26, 0.8), 0 0 40px rgba(139, 26, 26, 0.6), 0 0 60px rgba(139, 26, 26, 0.4), 0 0 80px rgba(139, 26, 26, 0.2)',
                  background: 'linear-gradient(to bottom, #f5f5dc 0%, #d4d4c4 30%, #8b1a1a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  // filter: 'drop-shadow(0 0 30px rgba(139, 26, 26, 0.5))',
                  // animation: 'pulse-slow 3s ease-in-out infinite'
                }}>
                  ACSES
            </h1>
            
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#8b1a1a] to-transparent opacity-80 animate-pulse-slow"
                 style={{
                   boxShadow: '0 0 30px rgba(139, 26, 26, 0.8), 0 0 60px rgba(139, 26, 26, 0.4)'
                 }}></div>
          </div>
          
          {/* Subtitle - Mythological Style with enhanced styling */}
          <div className="font-mythology text-xs sm:text-sm md:text-base lg:text-lg text-center max-w-2xl px-2 sm:px-4 mt-6 sm:mt-8 relative z-10"
               style={{ 
                 color: '#d4d4c4',
                 textShadow: '1px 1px 3px rgba(0, 0, 0, 0.9), 0 0 10px rgba(139, 26, 26, 0.3)'
               }}>
            Association of Computer Science and Engineering Students
          </div>
          
          {/* Scroll indicator */}
          <div className="mt-12 sm:mt-16 animate-bounce opacity-60">
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="#8b1a1a" viewBox="0 0 24 24"
                 style={{
                   filter: 'drop-shadow(0 0 8px rgba(139, 26, 26, 0.6))'
                 }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>


    </main>
  );
}

