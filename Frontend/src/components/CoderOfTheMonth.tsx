import { useState, useEffect } from 'react';
import ScrollFloat from './ScrollFloat';
import type { CodeXEvent } from '../services/api';
import { api } from '../services/api';

export default function CoderOfTheMonth() {
  const [visibleCategories, setVisibleCategories] = useState<boolean[]>([]);
  const [codexData, setCodexData] = useState<CodeXEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getLatestCodeX()
      .then(data => {
        setCodexData(data);
        setVisibleCategories(new Array(data.categories.length).fill(false));
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load CodeX data:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const categories = document.querySelectorAll('.category-item');
      const newVisible = [...visibleCategories];

      categories.forEach((category, index) => {
        const rect = category.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight * 0.75) {
          newVisible[index] = true;
        }
      });

      setVisibleCategories(newVisible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [codexData]);

  const positionColors: Record<number, string> = {
    1: '#FFD700',
    2: '#C0C0C0',
    3: '#CD7F32',
  };

  const getPositionSuffix = (rank: number): string => {
    if (rank === 1) return '1st';
    if (rank === 2) return '2nd';
    if (rank === 3) return '3rd';
    return `${rank}th`;
  };

  if (loading) {
    return (
      <section className="relative bg-black py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="text-white text-xl">Loading CodeX...</div>
        </div>
      </section>
    );
  }

  if (!codexData) {
    return null;
  }

  return (
    <section className="relative bg-black py-20 overflow-hidden ">
      <div className="container mx-auto px-4 relative z-10">

        <div className="title-section text-center mb-16">
          <div
            style={{
              background: 'linear-gradient(to bottom, #f5f5dc 0%, #8b1a1a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(139, 26, 26, 0.5)',
            }}
          >
            <ScrollFloat
              containerClassName="font-vengeance"
              textClassName="text-5xl md:text-6xl lg:text-7xl tracking-wider"
            >
              CODER OF THE MONTH
            </ScrollFloat>
          </div>
          <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-[#8b1a1a] to-transparent"
            style={{ boxShadow: '0 0 20px rgba(139, 26, 26, 0.6)' }}></div>
        </div>

        <div className="space-y-16">
          {codexData.categories.map((category, catIndex) => (
            <div
              key={catIndex}
              className={`category-item transition-all duration-1000 ease-out ${visibleCategories[catIndex] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
            >
              <h3 className="font-vengeance text-2xl md:text-3xl text-[#8b1a1a] mb-8 text-center tracking-widest">
                {category.category_name}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {category.winners.map((winner, winIndex) => (
                  <div
                    key={winIndex}
                    className="comic-panel group relative"
                    style={{ animationDelay: `${(catIndex * 0.3) + (winIndex * 0.1)}s` }}
                  >
                    <div className="relative bg-black/80 backdrop-blur-md border-2 border-[#8b1a1a]/50 p-6 overflow-hidden transition-all duration-300 hover:border-[#8b1a1a] hover:scale-105"
                      style={{ boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.9), 0 0 20px rgba(139, 26, 26, 0.3)' }}>

                      <div className="absolute top-4 right-4 z-20 font-vengeance text-lg px-3 py-1 rounded"
                        style={{
                          background: `linear-gradient(135deg, ${positionColors[winner.rank] || '#8b1a1a'}, ${positionColors[winner.rank] || '#8b1a1a'}99)`,
                          color: '#000',
                          boxShadow: `0 0 15px ${positionColors[winner.rank] || '#8b1a1a'}80`,
                        }}>
                        {getPositionSuffix(winner.rank)}
                      </div>

                      <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg"
                        style={{ boxShadow: '0 0 20px rgba(139, 26, 26, 0.4)' }}>
                        <img
                          src={winner.photo_url}
                          alt={winner.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(winner.name)}&size=400&background=8b1a1a&color=f5f5dc&bold=true`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      <h4 className="font-vengeance text-xl text-center text-[#f5f5dc] tracking-wide">
                        {winner.name}
                      </h4>

                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#8b1a1a] opacity-50"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#8b1a1a] opacity-50"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
