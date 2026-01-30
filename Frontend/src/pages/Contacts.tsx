// import React from 'react';
import Footer from '../components/Footer';

export default function Contacts() {
  const developers = [
    { name: "Swaraj Panmand", position: "Lead Developer" },
    { name: "Kaivalya Sonawane", position: "Site Developer" },
  ];

  return (
    <div className="min-h-screen bg-black pt-20 relative halftone">
      {/* Static Grain Texture Overlay */}
      <div className="fixed inset-0 opacity-15 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="space-y-4 sm:space-y-6">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/itsa-s-p-i-t/"
            target="_blank"
            rel="noopener noreferrer"
            className="block comic-panel ink-bleed bg-black/60 backdrop-blur-sm border-2 p-6 sm:p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 group batman-quote"
            style={{
              borderColor: 'rgba(139, 26, 26, 0.4)',
              boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 15px rgba(139, 26, 26, 0.2)',
              '--delay': 0
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139, 26, 26, 0.6)';
              e.currentTarget.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 25px rgba(139, 26, 26, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139, 26, 26, 0.4)';
              e.currentTarget.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 15px rgba(139, 26, 26, 0.2)';
            }}
          >
            <div className="flex items-center relative z-10 flex-col sm:flex-row">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 mb-4 sm:mb-0 sm:mr-6 transition-all duration-500"
                style={{
                  background: 'linear-gradient(to bottom right, rgba(139, 26, 26, 0.2), rgba(139, 26, 26, 0.05))',
                  borderColor: 'rgba(139, 26, 26, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 26, 26, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 26, 26, 0.4)';
                }}>
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(139, 26, 26, 0.9)' }}>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div className="flex-1 text-center sm:text-left w-full sm:w-auto">
                <div className="font-vengeance font-bold text-lg sm:text-xl mb-2 uppercase tracking-wider relative z-10"
                  style={{
                    color: '#8b1a1a',
                    textShadow: '2px 2px 0px rgba(0, 0, 0, 0.8), 0 0 8px rgba(139, 26, 26, 0.4)'
                  }}>
                  LinkedIn
                </div>
                <div className="h-px w-16 mb-2 transition-colors duration-500 relative z-10"
                  style={{ backgroundColor: 'rgba(139, 26, 26, 0.5)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(139, 26, 26, 0.8)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(139, 26, 26, 0.5)'}></div>
                <div className="font-mythology text-xs sm:text-sm relative z-10" style={{ color: '#d4d4c4' }}>Follow us on LinkedIn</div>
              </div>
              <svg className="hidden sm:block w-6 h-6 transition-colors relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(139, 26, 26, 0.6)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/acses.spit/"
            target="_blank"
            rel="noopener noreferrer"
            className="block comic-panel ink-bleed bg-black/60 backdrop-blur-sm border-2 p-6 sm:p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 group batman-quote"
            style={{
              borderColor: 'rgba(139, 26, 26, 0.4)',
              boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 15px rgba(139, 26, 26, 0.2)',
              '--delay': 1
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139, 26, 26, 0.6)';
              e.currentTarget.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 25px rgba(139, 26, 26, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139, 26, 26, 0.4)';
              e.currentTarget.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 15px rgba(139, 26, 26, 0.2)';
            }}
          >
            <div className="flex items-center relative z-10 flex-col sm:flex-row">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 mb-4 sm:mb-0 sm:mr-6 transition-all duration-500"
                style={{
                  background: 'linear-gradient(to bottom right, rgba(139, 26, 26, 0.2), rgba(139, 26, 26, 0.05))',
                  borderColor: 'rgba(139, 26, 26, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 26, 26, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 26, 26, 0.4)';
                }}>
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(139, 26, 26, 0.9)' }}>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <div className="flex-1 text-center sm:text-left w-full sm:w-auto">
                <div className="font-vengeance font-bold text-lg sm:text-xl mb-2 uppercase tracking-wider relative z-10"
                  style={{
                    color: '#8b1a1a',
                    textShadow: '2px 2px 0px rgba(0, 0, 0, 0.8), 0 0 8px rgba(139, 26, 26, 0.4)'
                  }}>
                  Instagram
                </div>
                <div className="h-px w-16 mb-2 transition-colors duration-500 relative z-10"
                  style={{ backgroundColor: 'rgba(139, 26, 26, 0.5)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(139, 26, 26, 0.8)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(139, 26, 26, 0.5)'}></div>
                <div className="font-mythology text-xs sm:text-sm relative z-10" style={{ color: '#d4d4c4' }}>Follow us on Instagram</div>
              </div>
              <svg className="hidden sm:block w-6 h-6 transition-colors relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(139, 26, 26, 0.6)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>

          {/* Google Maps Location */}
          <a
            href="https://maps.app.goo.gl/RAGPnDpFMhLUkGxs7"
            target="_blank"
            rel="noopener noreferrer"
            className="block comic-panel ink-bleed bg-black/60 backdrop-blur-sm border-2 p-6 sm:p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 group batman-quote"
            style={{
              borderColor: 'rgba(139, 26, 26, 0.4)',
              boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 15px rgba(139, 26, 26, 0.2)',
              '--delay': 2
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139, 26, 26, 0.6)';
              e.currentTarget.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 25px rgba(139, 26, 26, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139, 26, 26, 0.4)';
              e.currentTarget.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 15px rgba(139, 26, 26, 0.2)';
            }}
          >
            <div className="flex items-center relative z-10 flex-col sm:flex-row">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 mb-4 sm:mb-0 sm:mr-6 transition-all duration-500"
                style={{
                  background: 'linear-gradient(to bottom right, rgba(139, 26, 26, 0.2), rgba(139, 26, 26, 0.05))',
                  borderColor: 'rgba(139, 26, 26, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 26, 26, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 26, 26, 0.4)';
                }}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(139, 26, 26, 0.9)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1 text-center sm:text-left w-full sm:w-auto">
                <div className="font-vengeance font-bold text-lg sm:text-xl mb-2 uppercase tracking-wider relative z-10"
                  style={{
                    color: '#8b1a1a',
                    textShadow: '2px 2px 0px rgba(0, 0, 0, 0.8), 0 0 8px rgba(139, 26, 26, 0.4)'
                  }}>
                  Location
                </div>
                <div className="h-px w-16 mb-2 transition-colors duration-500 relative z-10"
                  style={{ backgroundColor: 'rgba(139, 26, 26, 0.5)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(139, 26, 26, 0.8)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(139, 26, 26, 0.5)'}></div>
                <div className="font-mythology text-xs sm:text-sm mb-2 relative z-10" style={{ color: '#d4d4c4' }}>View on Google Maps</div>
                <div className="font-mythology text-xs sm:text-sm mt-3 relative z-10" style={{ color: '#d4d4c4' }}>
                  <span style={{ color: '#d4d4c4' }}>Bhartiya Vidya Bhavan's Sardar Patel Institue of Technology, Munshi Nagar, Andheri West, Mumbai</span>
                </div>
              </div>
              <svg className="hidden sm:block w-6 h-6 transition-colors relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(139, 26, 26, 0.6)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>

        {/* Developers Section - Neo-Noir Styled */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <div className="flex items-center justify-center mb-8 sm:mb-12">
            <div className="flex-1 h-px hidden sm:block" style={{ background: 'linear-gradient(to right, transparent, rgba(139, 26, 26, 0.3), rgba(139, 26, 26, 0.3))' }}></div>
            <h3 className="text-xl sm:text-5xl  px-4 sm:px-8  font-batman"
              style={{
                color: '#8b1a1a',
                // textShadow: '2px 2px 0px rgba(0, 0, 0, 0.8), 0 0 15px rgba(139, 26, 26, 0.4)'
              }}>
              (DEVELOPERS)
            </h3>
            <div className="flex-1 h-px hidden sm:block" style={{ background: 'linear-gradient(to left, transparent, rgba(139, 26, 26, 0.3), rgba(139, 26, 26, 0.3))' }}></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
            {developers.map((member, index) => (
              <div
                key={index}
                className="group comic-panel ink-bleed bg-black/60 backdrop-blur-sm border-2 p-6 sm:p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 text-center batman-quote"
                style={{
                  borderColor: 'rgba(139, 26, 26, 0.4)',
                  boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 15px rgba(139, 26, 26, 0.2)',
                  '--delay': index * 0.1
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 26, 26, 0.6)';
                  e.currentTarget.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 25px rgba(139, 26, 26, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 26, 26, 0.4)';
                  e.currentTarget.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 15px rgba(139, 26, 26, 0.2)';
                }}
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center border-2 relative overflow-hidden transition-all duration-500"
                  style={{
                    background: 'linear-gradient(to bottom right, rgba(139, 26, 26, 0.2), rgba(139, 26, 26, 0.05))',
                    borderColor: 'rgba(139, 26, 26, 0.4)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 26, 26, 0.6)';
                    const gradient = e.currentTarget.querySelector('.avatar-gradient') as HTMLElement;
                    if (gradient) gradient.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 26, 26, 0.4)';
                    const gradient = e.currentTarget.querySelector('.avatar-gradient') as HTMLElement;
                    if (gradient) gradient.style.opacity = '0';
                  }}>
                  <div className="avatar-gradient absolute inset-0 transition-opacity duration-500" style={{
                    background: 'linear-gradient(to bottom right, rgba(139, 26, 26, 0.3), transparent)',
                    opacity: 0
                  }}></div>
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(139, 26, 26, 0.8)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="font-mythology font-bold text-base sm:text-lg mb-2 sm:mb-3 tracking-wider relative z-10"
                  style={{
                    color: '#f5f5dc',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8), 0 0 8px rgba(139, 26, 26, 0.3)'
                  }}>
                  {member.name}
                </div>
                <div className="h-px w-12 mx-auto mb-3 transition-colors duration-500 relative z-10"
                  style={{ backgroundColor: 'rgba(139, 26, 26, 0.5)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(139, 26, 26, 0.8)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(139, 26, 26, 0.5)'}></div>
                <p className="text-xs font-vengeance tracking-[0.15em] uppercase relative z-10" style={{ color: '#8b1a1a' }}>{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

