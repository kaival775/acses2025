import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedContent from '../components/AnimatedContent';
import BatmanLanding from '../BatmanLanding';
import Footer from '../components/Footer';

export default function Home() {
  const [currentTeamImage, setCurrentTeamImage] = useState(0);
  const teamImages = ['/team.jpeg', '/team2.jpeg', '/team3.jpeg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTeamImage((prev) => (prev + 1) % teamImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const mythologyText = [
    {
      title: "INNOVATION",
      text: "From the halls of technology, students unite. Driven by curiosity, powered by code, forging the future one line at a time."
    },
    {
      title: "COLLABORATION",
      text: "Not just individuals, but a league. Together we build, together we learn, together we rise beyond limits."
    },
    {
      title: "EXCELLENCE",
      text: "Every project, every event, every challenge. A commitment to mastery, a pursuit of perfection, a legacy of achievement."
    },
    {
      title: "LEGACY",
      text: "They remember our impact. The innovators. The problem solvers. A force of creation, driven by passion, defined by excellence."
    }
  ];

  return (
    <div className="min-h-screen">
      <BatmanLanding />
      
      {/* About ACSES Section */}
      <section className="relative bg-black py-20 border-t border-[#8b1a1a]/20">
        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          duration={1}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={0.95}
          threshold={0.1}
          delay={0}
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-batman text-4xl md:text-5xl text-center mb-8"
                style={{
                  color: 'white',
                  textShadow: '0 0 10px rgba(139, 26, 26, 0.8), 0 0 20px rgba(139, 26, 26, 0.6)'
                }}>
                [ABOUTACSES]
              </h2>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#8b1a1a]/20 via-[#8b1a1a]/10 to-[#8b1a1a]/20 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-black/80 backdrop-blur-sm border border-[#8b1a1a]/30 p-8 md:p-12 rounded-lg"
                  style={{
                    boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.9), 0 0 20px rgba(139, 26, 26, 0.15)'
                  }}>
                  <div className="space-y-6 font-mythology text-base md:text-lg leading-relaxed" style={{ color: '#d4d4c4' }}>
                    <p>
                      Welcome to the official webpage of <span className="text-[#8b1a1a] font-bold">ACSES</span> (formerly known as ITSA), 
                      the Techno-cultural committee and Home committee for the students of the IT, AI/ML, DS, and MCA departments 
                      within the Computer Science and Engineering (CSE) domain.
                    </p>
                    <p>
                      ACSES is dedicated to fostering the growth and development of students within our department. 
                      We strive to create a vibrant and inclusive community by organizing a diverse range of events.
                    </p>
                    <p>
                      From technical workshops and coding competitions to cultural fun events, ACSES offers a platform 
                      for students to enhance their skills, explore their passions, and connect with like-minded individuals.
                    </p>
                    <p className="text-center pt-4">
                      <span className="inline-block px-6 py-2 border border-[#8b1a1a]/40 rounded" 
                        style={{
                          color: '#8b1a1a',
                          textShadow: '0 0 10px rgba(139, 26, 26, 0.5)'
                        }}>
                        Join us in our mission to inspire creativity, innovation, and personal growth.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedContent>
      </section>

      {/* Mythology Section */}
      <section className="relative bg-black py-20">
        <AnimatedContent
          distance={150}
          direction="vertical"
          reverse={false}
          duration={1.2}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={0.9}
          threshold={0.05}
          delay={0.1}
        > 
        <div className="container mx-auto px-4 relative z-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {mythologyText.map((item, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 transition-all duration-300 group-hover:w-8 group-hover:h-8"
                     style={{ borderColor: '#8b1a1a' }}></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 transition-all duration-300 group-hover:w-8 group-hover:h-8"
                     style={{ borderColor: '#8b1a1a' }}></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 transition-all duration-300 group-hover:w-8 group-hover:h-8"
                     style={{ borderColor: '#8b1a1a' }}></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 transition-all duration-300 group-hover:w-8 group-hover:h-8"
                     style={{ borderColor: '#8b1a1a' }}></div>

                <div className="bg-black/60 backdrop-blur-sm border border-[#8b1a1a]/30 p-8 h-full transition-all duration-500 group-hover:border-[#8b1a1a]/60"
                     style={{
                       boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 10px rgba(139, 26, 26, 0.1)'
                     }}>
                  <div className="font-batman text-red-500 text-4xl mb-3 "
                       style={{
                        //  color: '#8b1a1a',
                         textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                       }}>
                    [{item.title}]
                  </div>
                  <div className="h-px w-16 mb-4 transition-all duration-300 group-hover:w-full"
                       style={{ backgroundColor: 'rgba(139, 26, 26, 0.5)' }}></div>
                  <p className="font-mythology text-sm leading-relaxed" style={{ color: '#d4d4c4' }}>
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          </div>
        </AnimatedContent>
      </section>

      {/* Team Carousel Section */}
      <section className="relative bg-black py-20">
        <AnimatedContent
          distance={150}
          direction="vertical"
          reverse={false}
          duration={1.2}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={0.9}
          threshold={0.05}
          delay={0.1}
        >
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="font-batman text-4xl md:text-5xl text-center mb-12"
              style={{
                color: 'white',
                textShadow: '0 0 10px rgba(139, 26, 26, 0.8), 0 0 20px rgba(139, 26, 26, 0.6)'
              }}>
              [OURTEAM]
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative h-96 overflow-hidden rounded-lg"
                style={{
                  boxShadow: '0 0 30px rgba(139, 26, 26, 0.4), inset 0 0 20px rgba(0, 0, 0, 0.8)'
                }}>
                {teamImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Team ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                    style={{
                      opacity: currentTeamImage === index ? 1 : 0
                    }}
                  />
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Link
                  to="/team"
                  className="inline-block font-vengeance text-lg px-8 py-3 border-2 transition-all duration-300 hover:scale-105"
                  style={{
                    borderColor: '#8b1a1a',
                    color: '#8b1a1a',
                    boxShadow: '0 0 15px rgba(139, 26, 26, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#8b1a1a';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.boxShadow = '0 0 25px rgba(139, 26, 26, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#8b1a1a';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(139, 26, 26, 0.3)';
                  }}
                >
                  MEET THE TEAM →
                </Link>
              </div>
            </div>
          </div>
        </AnimatedContent>
      </section>

      
      <div className="fixed inset-0 opacity-15 pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}></div>
      
      <Footer />
    </div>
  );
}

