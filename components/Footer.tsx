import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Youtube, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white border-t border-white/10">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">

          {/* Brand Column */}
          <div className="space-y-4">
            <img
              src="/images/paradise-logo.png"
              alt="Paradise RealEstate"
              className="h-32 md:h-36 w-auto"
              loading="lazy"
            />
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              Curating refined living experiences that blend elegance, sustainability, and modern comfort. Discover your next sanctuary with our bespoke real estate portfolio.
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              Paradise RealEstate Limited<br />
              Office No 20, GR Floor, Al Aamra Valley,<br />
              Al Helio Ajman Eastern Sector,<br />
              Near MacD, Ajman - U.A.E<br />
              Email: Info@preuae.com
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6 text-accent">Stay Updated</h4>
            <p className="text-xs text-gray-500 mb-4">Subscribe to our newsletter for the latest luxury listings.</p>
            <div className="flex border-b border-gray-600 pb-2">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent border-none outline-none text-white w-full placeholder-gray-600 text-sm"
              />
              <button className="text-accent hover:text-white">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2024 Paradise RealEstate Limited. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Disclaimer</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};