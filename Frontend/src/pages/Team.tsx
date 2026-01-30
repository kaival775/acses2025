import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import type { Member } from '../services/api';
import { api } from '../services/api';

export default function Team() {
  const [founderMember, setFounderMember] = useState<Member | null>(null);
  const [facultyMembers, setFacultyMembers] = useState<Member[]>([]);
  const [superCoreMembers, setSuperCoreMembers] = useState<Member[]>([]);
  const [coreDepts, setCoreDepts] = useState<Array<{department: string, members: Member[]}>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getMembers('founder'),
      api.getMembers('faculty'),
      api.getMembers('super-core'),
      api.getMembersByDepartment()
    ])
      .then(([founder, faculty, superCore, depts]) => {
        setFounderMember(founder[0] || null);
        setFacultyMembers(faculty);
        setSuperCoreMembers(superCore);
        const deptOrder = ['Tech', 'Creatives', 'Events', 'Operations', 'Public Relations', 'Marketing'];
        const sortedDepts = depts.sort((a, b) => deptOrder.indexOf(a.department) - deptOrder.indexOf(b.department));
        setCoreDepts(sortedDepts);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load members:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading team...</div>
      </div>
    );
  }

  const MemberCard = ({ member }: { member: Member }) => (
    <div
      className="group comic-panel ink-bleed bg-black/60 backdrop-blur-sm border-2 p-6 sm:p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 text-center batman-quote w-full"
      style={{
        borderColor: 'rgba(139, 26, 26, 0.4)',
        boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 15px rgba(139, 26, 26, 0.2)',
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
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 sm:mb-6 overflow-hidden border-2 relative transition-all duration-500"
        style={{ borderColor: 'rgba(139, 26, 26, 0.4)' }}>
        <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
      </div>
      <div className="font-mythology font-bold text-base sm:text-lg mb-2 sm:mb-3 tracking-wider relative z-10"
        style={{
          color: '#f5f5dc',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8), 0 0 8px rgba(139, 26, 26, 0.3)'
        }}>
        {member.name}
      </div>
      <div className="h-px w-12 mx-auto mb-3 transition-colors duration-500 relative z-10"
        style={{ backgroundColor: 'rgba(139, 26, 26, 0.5)' }}></div>
      <p className="text-xs font-vengeance tracking-[0.15em] uppercase relative z-10" style={{ color: '#8b1a1a' }}>{member.role}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black pt-20 relative halftone">
      <div className="fixed inset-0 opacity-15 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h1 className="font-batman text-red text-xl md:text-6xl text-center mb-12"
            style={{
              color: 'white',
              fontSize: '5rem',
              textShadow: '0 0 10px rgba(139, 26, 26, 0.8), 0 0 20px rgba(139, 26, 26, 0.6), 0 0 30px rgba(139, 26, 26, 0.4), 0 0 40px rgba(139, 26, 26, 0.2)'
            }}>
            [TEAM]
          </h1>
        </div>

        {founderMember && (
          <div className="mb-16">
            <div className="flex items-center justify-center mb-8 sm:mb-12">
              <div className="flex-1 h-px hidden sm:block" style={{ background: 'linear-gradient(to right, transparent, rgba(139, 26, 26, 0.3), rgba(139, 26, 26, 0.3))' }}></div>
              <h3 className="text-xl sm:text-2xl font-bold px-4 sm:px-8 tracking-[0.15em] sm:tracking-[0.2em] font-vengeance"
                style={{
                  color: '#8b1a1a',
                  textShadow: '2px 2px 0px rgba(0, 0, 0, 0.8), 0 0 15px rgba(139, 26, 26, 0.4)'
                }}>
                FOUNDER
              </h3>
              <div className="flex-1 h-px hidden sm:block" style={{ background: 'linear-gradient(to left, transparent, rgba(139, 26, 26, 0.3), rgba(139, 26, 26, 0.3))' }}></div>
            </div>
            <div className="flex justify-center">
              <MemberCard member={founderMember} />
            </div>
          </div>
        )}

        {facultyMembers.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-center mb-8 sm:mb-12">
              <div className="flex-1 h-px hidden sm:block" style={{ background: 'linear-gradient(to right, transparent, rgba(139, 26, 26, 0.3), rgba(139, 26, 26, 0.3))' }}></div>
              <h3 className="text-xl sm:text-2xl font-bold px-4 sm:px-8 tracking-[0.15em] sm:tracking-[0.2em] font-vengeance"
                style={{
                  color: '#8b1a1a',
                  textShadow: '2px 2px 0px rgba(0, 0, 0, 0.8), 0 0 15px rgba(139, 26, 26, 0.4)'
                }}>
                FACULTY COORDINATORS
              </h3>
              <div className="flex-1 h-px hidden sm:block" style={{ background: 'linear-gradient(to left, transparent, rgba(139, 26, 26, 0.3), rgba(139, 26, 26, 0.3))' }}></div>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {facultyMembers.map((member) => (
                  <MemberCard key={member._id} member={member} />
                ))}
              </div>
            </div>
          </div>
        )}

        {superCoreMembers.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-center mb-8 sm:mb-12">
              <div className="flex-1 h-px hidden sm:block" style={{ background: 'linear-gradient(to right, transparent, rgba(139, 26, 26, 0.3), rgba(139, 26, 26, 0.3))' }}></div>
              <h3 className="text-xl sm:text-2xl font-bold px-4 sm:px-8 tracking-[0.15em] sm:tracking-[0.2em] font-vengeance"
                style={{
                  color: '#8b1a1a',
                  textShadow: '2px 2px 0px rgba(0, 0, 0, 0.8), 0 0 15px rgba(139, 26, 26, 0.4)'
                }}>
                SUPER - CORE TEAM
              </h3>
              <div className="flex-1 h-px hidden sm:block" style={{ background: 'linear-gradient(to left, transparent, rgba(139, 26, 26, 0.3), rgba(139, 26, 26, 0.3))' }}></div>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {superCoreMembers.map((member) => (
                  <MemberCard key={member._id} member={member} />
                ))}
              </div>
            </div>
          </div>
        )}

        {coreDepts.map((dept) => (
          <div key={dept.department} className="mt-16 sm:mt-20 md:mt-24">
            <div className="flex items-center justify-center mb-8 sm:mb-12">
              <div className="flex-1 h-px hidden sm:block" style={{ background: 'linear-gradient(to right, transparent, rgba(139, 26, 26, 0.3), rgba(139, 26, 26, 0.3))' }}></div>
              <h3 className="text-xl sm:text-2xl font-bold px-4 sm:px-8 tracking-[0.15em] sm:tracking-[0.2em] font-vengeance"
                style={{
                  color: '#8b1a1a',
                  textShadow: '2px 2px 0px rgba(0, 0, 0, 0.8), 0 0 15px rgba(139, 26, 26, 0.4)'
                }}>
                {dept.department.toUpperCase()}
              </h3>
              <div className="flex-1 h-px hidden sm:block" style={{ background: 'linear-gradient(to left, transparent, rgba(139, 26, 26, 0.3), rgba(139, 26, 26, 0.3))' }}></div>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {dept.members.map((member) => (
                  <MemberCard key={member._id} member={member} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
