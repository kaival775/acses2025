import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavigationBar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'HOME' },
    { path: '/events', label: 'EVENTS' },
    { path: '/team', label: 'TEAM' },
    { path: '/contacts', label: 'CONTACTS' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/98 border-b border-[#8b1a1a]/30 shadow-2xl shadow-black/50 halftone backdrop-blur-md" style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
           }}></div>
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8b1a1a] to-transparent opacity-60"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16 sm:h-20">
     
          <Link to="/" className="flex items-center group" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="relative">
          
              <div className="absolute inset-0 bg-[#8b1a1a]/20 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
              
             
              <div className="relative batman-title  transition-all duration-300" 
                  
                   style={{
                    // backgroundImage:'acses_logo.png',
                     background: 'linear-gradient(to right, #f5f5dc 0%, #8b1a1a 50%, #f5f5dc 100%)',
                     backgroundSize: '200% auto',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                     backgroundClip: 'text',
                     animation: 'shine 3s linear infinite'
                   }}>
                <img className="w-10 md:w-16 h-auto" src="acses_logo.png" alt="ACSES Logo" />
              </div>
              
              {/* Bottom accent */}
              <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8b1a1a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </Link>

          {/* Desktop Navigation Links - DC Styled */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  group relative text-xs font-mythology tracking-[0.2em] uppercase
                  transition-all duration-500 ease-in-out
                  py-2 px-3
                  ${
                    isActive(item.path)
                      ? 'text-[#8b1a1a]'
                      : 'text-[#d4d4c4] hover:text-[#f5f5dc]'
                  }
                  transform hover:scale-105
                `}
                style={{
                  textShadow: isActive(item.path) 
                    ? '1px 1px 2px rgba(0, 0, 0, 0.8), 0 0 12px rgba(139, 26, 26, 0.6)'
                    : '1px 1px 2px rgba(0, 0, 0, 0.8)'
                }}
              >
                <span className="relative z-10">{item.label}</span>
                {isActive(item.path) && (
                  <>
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#8b1a1a] to-transparent opacity-80"></span>
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-[#8b1a1a] shadow-lg shadow-[#8b1a1a]/60"
                          style={{
                            boxShadow: '0 0 10px rgba(139, 26, 26, 0.8), 0 0 20px rgba(139, 26, 26, 0.4)'
                          }}></span>
                  </>
                )}
                {!isActive(item.path) && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#8b1a1a] transition-all duration-500 group-hover:w-full opacity-70"
                        style={{
                          boxShadow: '0 0 8px rgba(139, 26, 26, 0.6)'
                        }}></span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 space-y-1.5 focus:outline-none relative z-20"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-[#8b1a1a] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-[#8b1a1a] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-[#8b1a1a] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-black/98 border-b border-[#8b1a1a]/30 shadow-2xl transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  block group relative text-sm font-mythology tracking-[0.2em] uppercase
                  transition-all duration-500 ease-in-out
                  py-3 px-4
                  ${
                    isActive(item.path)
                      ? 'text-[#8b1a1a]'
                      : 'text-[#d4d4c4] hover:text-[#f5f5dc]'
                  }
                `}
                style={{
                  textShadow: isActive(item.path) 
                    ? '1px 1px 2px rgba(0, 0, 0, 0.8), 0 0 8px rgba(139, 26, 26, 0.4)'
                    : '1px 1px 2px rgba(0, 0, 0, 0.8)'
                }}
              >
                <span className="relative z-10">{item.label}</span>
                {isActive(item.path) && (
                  <span className="absolute left-0 bottom-0 top-0 w-1 bg-[#8b1a1a] shadow-lg shadow-[#8b1a1a]/40"></span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

