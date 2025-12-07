import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';
import { TextGenerateEffect } from './ui/TextGenerateEffect';
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from './ui/ExpandableScreen';
import { EnquiryFormContent } from './EnquiryFormContent';

const stats = [
  { id: 1, value: "9", label: "Cities" },
  { id: 2, value: "54", label: "Million Sq.ft. Delivered" },
  { id: 3, value: "80,000+", label: "Happy Families" },
];

export const Hero: React.FC = () => {
  return (
    <>
      <section className="relative h-screen w-full overflow-hidden bg-primary">
        {/* Background Video with Zoom Effect */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/hero-banner.mp4" type="video/mp4" />
              {/* Fallback image if video fails */}
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
                alt="Luxury Estate"
                className="w-full h-full object-cover"
              />
            </video>
          </motion.div>
          {/* Overlays */}
          <div className="absolute inset-0 bg-primary/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-primary/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center pt-20">

          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-tight mb-6 drop-shadow-2xl">
              The River of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-[#E5C585] to-[#C5A059] italic pr-2">Life</span>
            </h1>
          </FadeIn>

          <div className="max-w-3xl mx-auto mb-10 min-h-[80px]">
            <TextGenerateEffect
              words="Always flowing forward. Experience sustainable luxury and timeless elegance."
              className="text-gray-200 text-lg md:text-2xl font-light leading-relaxed drop-shadow-md font-sans"
              delay={0.8}
            />
          </div>

          <FadeIn delay={1.5}>
            <div className="flex flex-col md:flex-row gap-4">
              <ExpandableScreen
                layoutId="hero-enquiry-card"
                triggerRadius="9999px"
                contentRadius="24px"
                animationDuration={0.4}
              >
                <ExpandableScreenTrigger>
                  <div className="relative overflow-hidden bg-accent hover:bg-[#b08d48] text-primary transition-all duration-300 font-bold px-10 py-4 rounded-full tracking-widest text-sm uppercase shadow-[0_0_20px_rgba(197,160,89,0.5)] hover:shadow-[0_0_30px_rgba(197,160,89,0.7)] group cursor-pointer">
                    <span className="relative z-10">Enquire Now</span>
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
                  </div>
                </ExpandableScreenTrigger>
                <ExpandableScreenContent className="bg-gradient-to-br from-[#0B1525] via-[#0f1d33] to-[#0B1525]">
                  <EnquiryFormContent />
                </ExpandableScreenContent>
              </ExpandableScreen>
            </div>
          </FadeIn>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/50 z-20 hidden md:flex flex-col items-center gap-2 cursor-pointer hover:text-white transition-colors"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* Stats Bar (Below Hero) */}
      <div className="bg-[#0f213a] border-t border-white/5 relative z-20 py-10 shadow-2xl">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center md:justify-around gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/5">
            {stats.map((stat, idx) => (
              <FadeIn key={stat.id} delay={0.2 + (idx * 0.1)} direction="up" className="flex-1 min-w-[200px] pt-4 md:pt-0 group cursor-default">
                <div className="flex flex-col items-center transform transition-transform duration-300 group-hover:-translate-y-1">
                  <span className="text-3xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-2">{stat.value}</span>
                  <span className="text-xs md:text-sm text-accent uppercase tracking-widest font-semibold">{stat.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};