import React, { useState, useEffect } from 'react';
import { Menu, Phone, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from './ui/ExpandableScreen';
import { EnquiryFormContent } from './EnquiryFormContent';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Amenities', href: '#amenities' },
    { name: 'Homeowners', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Logo - Separate from navbar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 md:top-6 md:left-6 md:translate-x-0 z-50 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <img
          src="/images/paradise-logo.png"
          alt="Paradise RealEstate"
          className="h-16 md:h-24 w-auto transition-transform hover:scale-105"
          loading="lazy"
        />
      </div>

      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex justify-center ${scrolled ? 'py-4' : 'py-6'
          }`}
      >
        <div
          className={`
                relative px-6 py-3 transition-all duration-500 
                ${scrolled
              ? 'w-[90%] md:w-[70%] bg-primary/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-full'
              : 'w-auto bg-transparent border-transparent'
            }
                flex items-center justify-center text-white
            `}
        >
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide hover:text-accent transition-colors relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full opacity-50"></span>
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block p-2 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white">
              <Search className="w-4 h-4" />
            </button>
            <ExpandableScreen
              layoutId="navbar-enquiry-card"
              triggerRadius="9999px"
              contentRadius="24px"
              animationDuration={0.4}
            >
              <ExpandableScreenTrigger>
                <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-accent to-[#b08d48] hover:shadow-lg hover:shadow-accent/20 text-primary font-bold px-6 py-2.5 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 text-sm cursor-pointer">
                  <Phone className="w-3 h-3" />
                  <span>Enquire</span>
                </div>
              </ExpandableScreenTrigger>
              <ExpandableScreenContent className="bg-gradient-to-br from-[#0B1525] via-[#0f1d33] to-[#0B1525]">
                <EnquiryFormContent />
              </ExpandableScreenContent>
            </ExpandableScreen>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Toggle - Fixed Position */}
      <button
        className="md:hidden fixed top-6 right-6 z-50 p-2 text-white bg-primary/50 backdrop-blur-sm rounded-full border border-white/10"
        onClick={() => setMobileMenuOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-[#0B1525] text-white flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <img
                src="/images/paradise-logo.png"
                alt="Paradise RealEstate"
                className="h-14 w-auto"
                loading="lazy"
              />
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-white/5 rounded-full">
                <X className="w-6 h-6 text-accent" />
              </button>
            </div>

            <div className="flex flex-col space-y-6 text-xl font-serif">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className="border-b border-white/5 pb-4 hover:text-accent hover:border-accent/30 transition-all"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <ExpandableScreen
                  layoutId="mobile-enquiry-card"
                  triggerRadius="8px"
                  contentRadius="24px"
                  animationDuration={0.4}
                  onExpandChange={(expanded) => {
                    if (expanded) setMobileMenuOpen(false);
                  }}
                >
                  <ExpandableScreenTrigger>
                    <div className="bg-gradient-to-r from-accent to-[#b08d48] text-primary py-4 font-bold rounded-lg shadow-xl text-center cursor-pointer">
                      Enquire Now
                    </div>
                  </ExpandableScreenTrigger>
                  <ExpandableScreenContent className="bg-gradient-to-br from-[#0B1525] via-[#0f1d33] to-[#0B1525]">
                    <EnquiryFormContent />
                  </ExpandableScreenContent>
                </ExpandableScreen>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};