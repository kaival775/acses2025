import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import type { Event } from '../services/api';
import { api } from '../services/api';

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch both general and CodeX events
    Promise.all([api.getEvents(), api.getAllCodeX()])
      .then(([generalEvents, codexEvents]) => {
        setEvents([...codexEvents, ...generalEvents]);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load events:', err);
        setLoading(false);
      });
  }, []);

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

  const currentEvent = events.find(e => e._id === selectedEvent);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20 relative">
      <div className="fixed inset-0 opacity-15 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <h1 className="font-batman text-red text-xl md:text-6xl text-center mb-12"
          style={{
            color: 'white',
            fontSize: '5rem',
            textShadow: '0 0 10px rgba(139, 26, 26, 0.8), 0 0 20px rgba(139, 26, 26, 0.6), 0 0 30px rgba(139, 26, 26, 0.4), 0 0 40px rgba(139, 26, 26, 0.2)'
          }}>
          [EVENTS]
        </h1>

        {!selectedEvent ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {events.map((event, index) => (
              <div
                key={event._id}
                onClick={() => setSelectedEvent(event._id)}
                className="group comic-panel ink-bleed transition-all duration-500 bg-black/60 backdrop-blur-sm border-2 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer batman-quote"
                style={{
                  borderColor: 'rgba(139, 26, 26, 0.4)',
                  boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 15px rgba(139, 26, 26, 0.2)',
                  '--delay': index * 0.2
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
                {event.cover_image && (
                  <div className="w-full h-48 overflow-hidden">
                    <img src={event.cover_image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      onError={(e) => e.currentTarget.style.display = 'none'} />
                  </div>
                )}
                <div className="p-8">
                  <h2 className="font-vengeance text-2xl sm:text-3xl mb-3 tracking-wider"
                    style={{
                      color: '#f5f5dc',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8), 0 0 8px rgba(139, 26, 26, 0.3)'
                    }}>
                    {event.title}
                  </h2>
                  <div className="h-px w-16 mx-auto mb-3" style={{ backgroundColor: 'rgba(139, 26, 26, 0.5)' }}></div>
                  <p className="text-[#8b1a1a] font-mythology text-base mb-4">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                  <p className="text-[#d4d4c4] mb-6 text-sm line-clamp-3">
                    {event.description}
                  </p>
                  <div className="text-xs font-banger tracking-[0.15em] uppercase" style={{ color: '#8b1a1a' }}>
                    {event.event_type === 'codex' || (event.winners && event.winners.length > 0) ? 'CLICK TO VIEW WINNERS →' : 'CLICK TO VIEW DETAILS →'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedEvent(null)}
              className="comic-panel ink-bleed bg-black/60 backdrop-blur-sm border-2 font-vengeance mb-8 px-6 py-3 transition-all duration-500"
              style={{
                borderColor: 'rgba(139, 26, 26, 0.4)',
                boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 15px rgba(139, 26, 26, 0.2)',
                color: '#8b1a1a'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 26, 26, 0.6)';
                e.currentTarget.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 25px rgba(139, 26, 26, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 26, 26, 0.4)';
                e.currentTarget.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 15px rgba(139, 26, 26, 0.2)';
              }}
            >
              ← BACK TO EVENTS
            </button>

            {currentEvent && (
              <div className="space-y-16">
                <h2 className="font-vengeance text-4xl text-center text-[#f5f5dc] mb-2"
                  style={{
                    color: '#f5f5dc',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8), 0 0 8px rgba(139, 26, 26, 0.3)'
                  }}>
                  {currentEvent.title}
                </h2>
                <p className="text-center text-[#d4d4c4] text-lg mb-8">{currentEvent.description}</p>

                {currentEvent.event_type === 'codex' && currentEvent.codex_categories?.map((category, catIndex) => (
                  <div key={catIndex}>
                    <h3 className="font-banger text-3xl text-[#f51414] mb-8 text-center">
                      {category.category_name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                      {category.winners.map((winner, winIndex) => (
                        <div key={winIndex} className="group">
                          <div className="comic-panel ink-bleed bg-black/60 backdrop-blur-sm border-2 p-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 text-center relative"
                            style={{
                              borderColor: 'rgba(139, 26, 26, 0.4)',
                              boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 15px rgba(139, 26, 26, 0.2)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = 'rgba(139, 26, 26, 0.6)';
                              e.currentTarget.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 25px rgba(139, 26, 26, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = 'rgba(139, 26, 26, 0.4)';
                              e.currentTarget.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 15px rgba(139, 26, 26, 0.2)';
                            }}>

                            <div className="absolute top-4 right-4 z-20 font-vengeance text-sm px-2 py-1 rounded"
                              style={{
                                background: positionColors[winner.rank] || '#8b1a1a',
                                color: '#000',
                                boxShadow: `0 0 10px ${positionColors[winner.rank] || '#8b1a1a'}80`,
                              }}>
                              {getPositionSuffix(winner.rank)}
                            </div>

                            <div className="relative w-full aspect-square mb-4 overflow-hidden"
                              style={{ boxShadow: '0 0 15px rgba(139, 26, 26, 0.4)' }}>
                              <img
                                src={winner.photo_url}
                                alt={winner.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(winner.name)}&size=400&background=8b1a1a&color=f5f5dc&bold=true`;
                                }}
                              />
                            </div>

                            <div className="font-mythology font-bold text-base sm:text-lg mb-2 tracking-wider"
                              style={{
                                color: '#f5f5dc',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8), 0 0 8px rgba(139, 26, 26, 0.3)'
                              }}>
                              {winner.name}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {currentEvent.event_type === 'general' && currentEvent.winners && currentEvent.winners.length > 0 && (
                  <div>
                    <h3 className="font-banger text-3xl text-[#f51414] mb-8 text-center">Winners</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                      {currentEvent.winners.map((winner: any, winIndex: number) => (
                        <div key={winIndex} className="group">
                          <div className="comic-panel ink-bleed bg-black/60 backdrop-blur-sm border-2 p-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 text-center relative"
                            style={{
                              borderColor: 'rgba(139, 26, 26, 0.4)',
                              boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 15px rgba(139, 26, 26, 0.2)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = 'rgba(139, 26, 26, 0.6)';
                              e.currentTarget.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 25px rgba(139, 26, 26, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = 'rgba(139, 26, 26, 0.4)';
                              e.currentTarget.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 15px rgba(139, 26, 26, 0.2)';
                            }}>
                            <div className="absolute top-4 right-4 z-20 font-vengeance text-sm px-2 py-1 rounded"
                              style={{
                                background: '#8b1a1a',
                                color: '#fff',
                                boxShadow: '0 0 10px #8b1a1a80',
                              }}>
                              {winner.position}
                            </div>
                            <div className="relative w-full aspect-square mb-4 overflow-hidden"
                              style={{ boxShadow: '0 0 15px rgba(139, 26, 26, 0.4)' }}>
                              <img
                                src={winner.photo_url}
                                alt={winner.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(winner.name)}&size=400&background=8b1a1a&color=f5f5dc&bold=true`;
                                }}
                              />
                            </div>
                            <div className="font-mythology font-bold text-base sm:text-lg mb-2 tracking-wider"
                              style={{
                                color: '#f5f5dc',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8), 0 0 8px rgba(139, 26, 26, 0.3)'
                              }}>
                              {winner.name}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentEvent.event_photos && currentEvent.event_photos.length > 0 && (
                  <div className="mt-16">
                    <h3 className="font-banger text-3xl text-[#f51414] mb-8 text-center">Event Photos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                      {currentEvent.event_photos.map((photo: string, photoIndex: number) => (
                        <div key={photoIndex} className="group overflow-hidden rounded-lg"
                          style={{ boxShadow: '0 0 15px rgba(139, 26, 26, 0.4)' }}>
                          <img
                            src={photo}
                            alt={`Event photo ${photoIndex + 1}`}
                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => e.currentTarget.style.display = 'none'}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentEvent.event_type === 'general' && (!currentEvent.winners || currentEvent.winners.length === 0) && (!currentEvent.event_photos || currentEvent.event_photos.length === 0) && (
                  <div className="text-center text-[#d4d4c4]">
                    <p>Event details and photos coming soon...</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
