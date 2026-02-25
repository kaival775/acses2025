import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
      {/* Grain texture overlay */}
      <div className="fixed inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}></div>
      
      <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 relative z-10">
        <DotLottieReact
          src="/bat.lottie"
          loop
          autoplay
          style={{ 
            width: "100%", 
            height: "100%",
            filter: "brightness(0) saturate(100%) invert(17%) sepia(98%) saturate(4872%) hue-rotate(356deg) brightness(91%) contrast(95%)"
          }}
        />
      </div>
    </div>
  );
}