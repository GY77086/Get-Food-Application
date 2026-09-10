import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Heart, Users, Award, ShieldCheck, MapPin, ArrowRight, Sparkles } from 'lucide-react';

const VALUES = [
  { icon: Leaf, title: '100% Farm Fresh', desc: 'Directly sourced from local sustainable farms within 24 hours of harvest.' },
  { icon: Heart, title: 'Health & Nutrition', desc: 'Strictly selected organic and chemical-free produce for your family.' },
  { icon: ShieldCheck, title: 'Quality Assured', desc: 'Hand-sorted and rigorously checked for premium quality before dispatch.' },
];

const TEAM = [
  { 
    id: 1, 
    name: 'Aarav Sharma', 
    role: 'Founder & CEO', 
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300', 
    bio: 'Former agronomist passionate about bridging the gap between local farms and urban kitchens.' 
  },
  { 
    id: 2, 
    name: 'Priya Patel', 
    role: 'Head of Quality', 
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300', 
    bio: 'Nutritionist with over 8 years of experience ensuring top-tier farm produce standards.' 
  },
  { 
    id: 3, 
    name: 'Rohan Verma', 
    role: 'Supply Chain Lead', 
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300', 
    bio: 'Logistics expert making sure your cart reaches your doorstep flawlessly fresh.' 
  },
];

const AboutUs = () => {
  const [isNavigating, setIsNavigating] = useState(false);
  
  // React Router hook for navigation
  const navigate = useNavigate();

  const handleStartShopping = () => {
    setIsNavigating(true);
    
    // A tiny 300ms delay to show the button's "Preparing Store..." state before jumping to the Grocery page
    setTimeout(() => {
      // Changed from navigate('/grocery') to navigate('/Grocery')
      navigate('/Grocery');
    }, 300);
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 font-sans text-neutral-50 selection:bg-amber-500/30 overflow-x-hidden">
      
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-neutral-950/0 to-transparent -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        
        {/* ── Hero Section ── */}
        <section className="mb-24 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2 mb-6 text-xs font-black uppercase tracking-widest text-amber-400 border border-white/10 shadow-lg">
              <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Our Journey
          </div>
          <h1 className="max-w-4xl mb-6 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white drop-shadow-2xl">
            Cultivating fresh <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700">Connections.</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl font-medium leading-relaxed">
            At FeastFlow, we believe that eating healthy shouldn't be complicated. We are a passionate team dedicated to bringing the farmer's market right to your digital screen—delivering honesty, nutrition, and unmatched flavor.
          </p>
        </section>

        {/* ── Story / Mission Split ── */}
        <section className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative group overflow-hidden rounded-[3rem] bg-neutral-900/60 backdrop-blur-2xl border border-white/10 shadow-2xl p-10 h-full flex flex-col justify-center transition-all duration-500 hover:border-amber-500/30 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]">
            <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none bg-amber-500" />
            
            <h2 className="text-3xl font-black mb-6 text-white tracking-tight">Our Mission</h2>
            <p className="text-base font-medium leading-relaxed text-neutral-400 mb-8">
              To eliminate the middleman and create a transparent, sustainable ecosystem where local farmers receive fair compensation and families get uncompromised, pesticide-free, fresh produce daily.
            </p>
            
            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-950 text-amber-400 border border-white/5 shadow-inner shrink-0 group-hover:scale-110 transition-transform duration-500">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-wider mb-1">Community Driven</h4>
                <p className="text-xs font-bold text-neutral-500">Serving 5,000+ happy households</p>
              </div>
            </div>
          </div>

          <div className="relative h-80 md:h-full rounded-[3rem] overflow-hidden border border-white/10 group shadow-2xl">
            <div className="absolute inset-0 bg-neutral-950 animate-pulse" /> 
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800" 
              alt="Farm fresh produce" 
              className="relative z-10 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent z-20 flex items-end p-8">
              <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest px-4 py-2.5 rounded-full bg-neutral-900/80 backdrop-blur-md text-white border border-white/10 shadow-lg transform transition-transform group-hover:-translate-y-2">
                <MapPin className="w-4 h-4 text-amber-400" /> Locally Sourced Daily
              </span>
            </div>
          </div>
        </section>

        {/* ── Core Values ── */}
        <section className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-6 text-white tracking-tight">Why choose us?</h2>
            <p className="text-base font-medium text-neutral-400">The pillars that hold up our promise of excellence to your kitchen table.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div 
                  key={idx} 
                  className="group relative flex flex-col p-8 rounded-[2.5rem] bg-neutral-900/40 backdrop-blur-xl border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:bg-neutral-900/80 hover:border-amber-500/30 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.2)]" 
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-[2.5rem] pointer-events-none" />
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-950 text-amber-400 border border-white/5 shadow-inner mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-extrabold text-white mb-4 group-hover:text-amber-400 transition-colors">{val.title}</h3>
                  <p className="text-sm font-medium leading-relaxed text-neutral-400">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Meet the Team ── */}
        <section className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-6 text-white tracking-tight">Meet the Masters</h2>
            <p className="text-base font-medium text-neutral-400">A dedicated clan of nature-lovers, foodies, and culinary perfectionists.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div 
                key={member.id} 
                className="group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-neutral-900/60 backdrop-blur-2xl border border-white/10 shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.3)] hover:border-amber-500/40" 
              >
                <div className="relative h-72 w-full shrink-0 overflow-hidden bg-neutral-950">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:-rotate-1" 
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-neutral-950 to-transparent z-10 pointer-events-none" />
                </div>
                
                <div className="flex flex-1 flex-col p-8 z-20 -mt-12">
                  <h3 className="text-2xl font-extrabold text-white mb-2 group-hover:text-amber-400 transition-colors">{member.name}</h3>
                  <span className="text-xs font-black uppercase tracking-widest text-amber-500 mb-6">{member.role}</span>
                  <p className="text-sm font-medium leading-relaxed text-neutral-400 mb-8 flex-1">{member.bio}</p>
                  
                  <div className="mt-auto pt-5 border-t border-white/10 flex items-center justify-center">
                    <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 group-hover:text-amber-400/80 transition-colors">
                      <Award className="w-4 h-4" /> Certified Expert
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-[3rem] bg-neutral-900 border border-white/10 p-12 sm:p-16 text-center shadow-[0_0_60px_-15px_rgba(245,158,11,0.2)]">
            {/* Ambient Background Glows */}
            <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none bg-amber-500" />
            <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none bg-white" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-5xl font-black mb-6 text-white tracking-tight">Ready for Elite Gastronomy?</h2>
              <p className="text-base font-medium mb-10 text-neutral-400 leading-relaxed">
                Join thousands of households trusting us with their daily dose of premium, organic, and farm-fresh harvest.
              </p>
              
              {/* Working Button Implementation with React Router */}
              <button 
                onClick={handleStartShopping}
                disabled={isNavigating}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 px-8 py-4 text-sm font-black uppercase tracking-widest text-neutral-950 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.5)] active:scale-95 outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50 disabled:opacity-80 disabled:cursor-wait disabled:hover:scale-100"
              >
                {isNavigating ? 'Preparing Store...' : 'Start Shopping'}
                {!isNavigating && <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutUs;