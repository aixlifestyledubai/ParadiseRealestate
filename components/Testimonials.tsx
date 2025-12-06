import React, { useState } from 'react';
import { Play, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './ui/FadeIn';

const testimonials = [
    {
        id: 1,
        videoThumbnail: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
        quote: "The post-purchase experience with Paradise RealEstate was seamless.",
        author: "The Sharma Family",
        project: "Luxe Horizon"
    },
    {
        id: 2,
        videoThumbnail: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
        quote: "Living at Emerald Bay feels like a vacation every day.",
        author: "Mr. & Mrs. Verma",
        project: "Emerald Bay"
    },
    {
        id: 3,
        videoThumbnail: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop",
        quote: "Quality of construction is unmatched.",
        author: "Rajesh Kumar",
        project: "Skyline Towers"
    },
    {
        id: 4,
        videoThumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2070&auto=format&fit=crop",
        quote: "A true legacy developer we trust.",
        author: "Sarah Jenkins",
        project: "The Riveria"
    },
    {
        id: 5,
        videoThumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
        quote: "Exceptional amenities and green spaces.",
        author: "David Chen",
        project: "Serenity Gardens"
    }
];

export const Testimonials: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-24 bg-surface relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">

                {/* Title Section */}
                <div className="mb-12 text-left">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-serif text-primary mb-2">
                            Hear It from <span className="text-primary font-bold">Paradise RealEstate Homeowners</span>
                        </h2>
                        <div className="h-1 w-24 bg-accent mt-4"></div>
                    </FadeIn>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col items-center">

                    <div className="w-full max-w-7xl flex items-center justify-between gap-4 md:gap-8 mb-8">
                        {/* Left Arrow */}
                        <button
                            onClick={prev}
                            className="hidden md:flex flex-shrink-0 items-center justify-center w-12 h-12 rounded-full border border-gray-300 bg-white text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 z-10"
                        >
                            <ArrowLeft size={20} />
                        </button>

                        {/* Main Video Player */}
                        <div className="flex-grow w-full relative aspect-video bg-black shadow-2xl rounded-sm overflow-hidden group">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <img
                                        src={testimonials[currentIndex].videoThumbnail}
                                        alt={testimonials[currentIndex].author}
                                        className="w-full h-full object-cover opacity-80"
                                    />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                                    {/* Play Button */}
                                    <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
                                        <div className="w-20 h-20 rounded-full border-2 border-white/80 flex items-center justify-center backdrop-blur-sm hover:scale-110 transition-transform duration-300 group-hover:border-accent">
                                            <div className="w-14 h-14 bg-white/90 text-primary rounded-full flex items-center justify-center pl-1 group-hover:bg-accent group-hover:text-white transition-colors">
                                                <Play fill="currentColor" size={24} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Text Overlay (Bottom) */}
                                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                                        <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">
                                            "{testimonials[currentIndex].quote}"
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            <span className="text-accent font-bold uppercase tracking-widest text-sm">
                                                {testimonials[currentIndex].author}
                                            </span>
                                            <span className="w-1 h-1 bg-white rounded-full"></span>
                                            <span className="text-gray-300 text-sm">
                                                {testimonials[currentIndex].project}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Right Arrow */}
                        <button
                            onClick={next}
                            className="hidden md:flex flex-shrink-0 items-center justify-center w-12 h-12 rounded-full border border-gray-300 bg-white text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 z-10"
                        >
                            <ArrowRight size={20} />
                        </button>
                    </div>

                    {/* Mobile Navigation (Visible only on small screens) */}
                    <div className="flex md:hidden gap-4 mb-8">
                        <button onClick={prev} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-white"><ArrowLeft size={16} /></button>
                        <button onClick={next} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-white"><ArrowRight size={16} /></button>
                    </div>

                    {/* Thumbnails */}
                    <div className="flex flex-wrap justify-center gap-4 px-4 w-full max-w-5xl">
                        {testimonials.map((item, index) => (
                            <button
                                key={item.id}
                                onClick={() => setCurrentIndex(index)}
                                className={`relative w-24 h-16 md:w-32 md:h-20 flex-shrink-0 overflow-hidden rounded-sm transition-all duration-300 ${index === currentIndex
                                        ? 'ring-2 ring-accent ring-offset-2 ring-offset-surface scale-105 grayscale-0'
                                        : 'grayscale opacity-60 hover:opacity-100 hover:grayscale-0'
                                    }`}
                            >
                                <img
                                    src={item.videoThumbnail}
                                    alt={item.author}
                                    className="w-full h-full object-cover"
                                />
                                {index === currentIndex && (
                                    <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                                        <Play size={16} fill="white" className="text-white" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};