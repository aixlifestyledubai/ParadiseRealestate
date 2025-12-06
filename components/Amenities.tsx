import React from 'react';
import { Waves, Trees, Tent, Wifi, ShieldCheck, Flower2, HeartPulse, Droplets, Car, Home } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';
import { BentoGrid, BentoGridItem } from './ui/BentoGrid';

export const Amenities: React.FC = () => {
  return (
    <section id="amenities" className="py-24 bg-primary text-white relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
            backgroundImage: "linear-gradient(#C5A059 1px, transparent 1px), linear-gradient(to right, #C5A059 1px, transparent 1px)", 
            backgroundSize: "60px 60px" 
        }}></div>
        
        {/* Soft Spotlights */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header - Centered for Impact */}
        <div className="text-center max-w-3xl mx-auto mb-20">
            <FadeIn>
                <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="h-[1px] w-12 bg-accent/50"></span>
                    <span className="text-accent text-sm font-bold uppercase tracking-[0.2em]">World Class Living</span>
                    <span className="h-[1px] w-12 bg-accent/50"></span>
                </div>
                <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                    Curated for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C585] to-[#C5A059]">Perfection</span>
                </h2>
                <p className="text-gray-400 text-lg font-light leading-relaxed">
                    Every amenity is thoughtfully designed to enhance your lifestyle, blending modern technology with nature's tranquility.
                </p>
            </FadeIn>
        </div>

        {/* Bento Grid */}
        <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem]">
            {/* Item 1 - Large Span */}
            <BentoGridItem
                title="Floating Clubhouse"
                description="An architectural marvel floating above serene waters, offering a lounge, cafe, and panoramic views."
                className="md:col-span-2 bg-[#0B1525] border-white/10"
                icon={<Home className="h-6 w-6" />}
                header={
                    <div className="flex flex-1 w-full h-full min-h-[6rem] bg-gray-900 relative group overflow-hidden">
                         <img src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Clubhouse" />
                         <div className="absolute inset-0 bg-gradient-to-t from-[#0B1525] to-transparent" />
                    </div>
                }
            />

            {/* Item 2 */}
            <BentoGridItem
                title="Miyawaki Forest"
                description="A dense, native urban forest improving air quality."
                className="md:col-span-1 bg-[#0B1525] border-white/10"
                icon={<Trees className="h-6 w-6" />}
                header={
                    <div className="flex flex-1 w-full h-full min-h-[6rem] bg-emerald-950 relative overflow-hidden group">
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                         <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-colors"></div>
                         <Trees className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-emerald-800/20" />
                    </div>
                }
            />

            {/* Item 3 */}
            <BentoGridItem
                title="Infinity Wave Pool"
                description="Temperature controlled waters with horizon views."
                className="md:col-span-1 bg-[#0B1525] border-white/10"
                icon={<Waves className="h-6 w-6" />}
                header={
                    <div className="flex flex-1 w-full h-full min-h-[6rem] bg-blue-950 relative overflow-hidden group">
                        <img src="https://images.unsplash.com/photo-1572331165267-854da2b00ca1?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" alt="Pool" />
                        <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
                    </div>
                }
            />

            {/* Item 4 - Large Span */}
            <BentoGridItem
                title="Smart Living Ecosystem"
                description="Wi-Fi 6 zones, smart security, and app-controlled home automation integrated into every residence."
                className="md:col-span-2 bg-[#0B1525] border-white/10"
                icon={<Wifi className="h-6 w-6" />}
                header={
                    <div className="flex flex-1 w-full h-full min-h-[6rem] bg-gray-900 relative overflow-hidden group flex-row items-center justify-center gap-4">
                        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
                        <div className="z-10 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl group-hover:-translate-y-2 transition-transform duration-500">
                            <ShieldCheck className="w-8 h-8 text-accent" />
                        </div>
                        <div className="z-10 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl group-hover:translate-y-2 transition-transform duration-500 delay-75">
                            <Wifi className="w-8 h-8 text-blue-400" />
                        </div>
                         <div className="z-10 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl group-hover:-translate-y-2 transition-transform duration-500 delay-100">
                            <Car className="w-8 h-8 text-white" />
                        </div>
                    </div>
                }
            />
        </BentoGrid>

        <div className="mt-16 flex justify-center">
            <button className="text-sm font-bold uppercase tracking-widest text-accent border-b border-accent/30 pb-1 hover:text-white hover:border-white transition-colors">
                View All Amenities
            </button>
        </div>

      </div>
    </section>
  );
};
