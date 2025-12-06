import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Building2, ExternalLink } from 'lucide-react';
import { Project } from '../types';
import { FadeIn } from './ui/FadeIn';
import { Card3D } from './ui/Card3D';
import { VelocityScroll } from './ui/VelocityScroll';

const projects: Project[] = [
  {
    id: '1',
    title: "Luxe Horizon",
    location: "Bengaluru",
    status: "Upcoming",
    type: "Residential",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
    priceStart: "Starts ₹2.5 Cr"
  },
  {
    id: '2',
    title: "The Riveria",
    location: "Chennai",
    status: "Ongoing",
    type: "Residential",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    priceStart: "Starts ₹1.8 Cr"
  },
  {
    id: '3',
    title: "World Trade Center",
    location: "Pune",
    status: "Completed",
    type: "Commercial",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: '4',
    title: "Emerald Bay",
    location: "Mumbai",
    status: "Ongoing",
    type: "Residential",
    image: "https://images.unsplash.com/photo-1600596542815-e32c8ec23fc9?q=80&w=2070&auto=format&fit=crop",
    priceStart: "Starts ₹4.5 Cr"
  },
  {
    id: '5',
    title: "Skyline Towers",
    location: "Hyderabad",
    status: "Upcoming",
    type: "Commercial",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: '6',
    title: "Serenity Gardens",
    location: "Kochi",
    status: "Completed",
    type: "Residential",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    priceStart: "Starts ₹1.2 Cr"
  }
];

const categories = ["All", "Upcoming", "Ongoing", "Completed"];

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.status === activeCategory);

  return (
    <section id="projects" className="py-20 md:py-32 bg-surface relative overflow-hidden">
      {/* Premium Background Text Effect */}
      <div className="absolute top-20 md:top-40 w-full opacity-[0.03] select-none pointer-events-none mix-blend-multiply">
        <VelocityScroll text="PARADISE REALESTATE • TIMELESS LUXURY • " default_velocity={3} className="text-primary" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <FadeIn>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[1px] w-8 bg-accent inline-block"></span>
              <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Our Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#9A7B3E]">Collections</span>
            </h2>
            <p className="mt-6 text-gray-500 max-w-xl text-lg font-light leading-relaxed">
              Discover a portfolio of landmarks that redefine skylines and lifestyles across the nation. Each project is a testament to our legacy.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} direction="left">
            <div className="flex flex-wrap gap-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm border border-gray-200/60">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-colors duration-300 z-10 ${activeCategory === cat ? 'text-white' : 'text-gray-500 hover:text-primary'
                    }`}
                >
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary rounded-full shadow-lg -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Project Grid with Focus Effect */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: hoveredCard && hoveredCard !== project.id ? "blur(2px) grayscale(80%)" : "blur(0px) grayscale(0%)",
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="h-[500px]"
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card3D className="h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10" containerClassName="h-full">
                  <div className="relative h-full bg-gray-900 group">
                    {/* Image */}
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                    {/* Elegant Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                    {/* Status Tag */}
                    <div className="absolute top-6 right-6">
                      <div className={`
                                backdrop-blur-md px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border rounded-full
                                ${project.status === 'Completed' ? 'bg-emerald-900/40 border-emerald-500/30 text-emerald-100' : ''}
                                ${project.status === 'Ongoing' ? 'bg-amber-900/40 border-amber-500/30 text-amber-100' : ''}
                                ${project.status === 'Upcoming' ? 'bg-blue-900/40 border-blue-500/30 text-blue-100' : ''}
                            `}>
                        {project.status}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 w-full p-8 text-white translate-z-20">
                      <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                        <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">{project.type}</p>
                        <h3 className="text-3xl font-serif font-bold mb-2 group-hover:text-accent transition-colors duration-300">{project.title}</h3>
                        <div className="flex items-center text-gray-300 mb-4">
                          <MapPin className="w-4 h-4 mr-2 text-accent" />
                          <span className="text-sm font-medium tracking-wide">{project.location}</span>
                        </div>
                      </div>

                      {/* Expandable Section */}
                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                        <div className="overflow-hidden">
                          <div className="border-t border-white/20 pt-4 mt-2 flex items-center justify-between">
                            <div>
                              {project.priceStart ? (
                                <>
                                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Starting From</p>
                                  <p className="text-lg font-serif text-white">{project.priceStart}</p>
                                </>
                              ) : (
                                <p className="text-sm text-gray-400">View Project Details</p>
                              )}
                            </div>
                            <button className="bg-white text-primary p-3 rounded-full hover:bg-accent transition-colors duration-300">
                              <ExternalLink size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <div className="mt-24 text-center">
          <button className="group relative inline-flex items-center gap-3 px-12 py-5 overflow-hidden font-bold rounded-full text-primary transition-all duration-300 hover:text-white bg-white shadow-lg hover:shadow-2xl hover:shadow-primary/20">
            <span className="absolute inset-0 w-full h-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></span>
            <span className="relative uppercase tracking-widest text-xs z-10">View All Projects</span>
            <ArrowRight className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 z-10" />
          </button>
        </div>
      </div>
    </section>
  );
};
