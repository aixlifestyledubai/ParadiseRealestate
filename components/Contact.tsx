import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    project: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          project: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-primary text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#0f1d33] transform -skew-x-12 translate-x-20 z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Info Side */}
          <div className="space-y-12">
            <FadeIn>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-[1px] w-12 bg-accent"></span>
                <span className="text-accent text-sm font-bold uppercase tracking-[0.2em]">Get in Touch</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Start Your Journey to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C585] to-[#C5A059]">Excellence</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                Whether you're looking for your dream home or a prime commercial investment, our team is here to guide you every step of the way.
              </p>
            </FadeIn>

            <FadeIn delay={0.2} className="space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300 flex-shrink-0">
                  <MapPin className="text-accent w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-serif font-medium mb-1">Corporate Office</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Office No 20, GR Floor, Al Aamra Valley,<br />
                    Al Helio Ajman Eastern Sector,<br />
                    Near MacD, Ajman - U.A.E
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300 flex-shrink-0">
                  <Mail className="text-accent w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-serif font-medium mb-1">Email Us</h4>
                  <p className="text-gray-400 text-sm">Info@preuae.com</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Contact Form Side */}
          <FadeIn delay={0.4} className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl">
            <h3 className="text-2xl font-serif font-medium mb-8">Send us a Message</h3>

            {submitStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h4 className="text-2xl font-serif font-medium mb-2">Thank You!</h4>
                <p className="text-gray-400">We've received your inquiry and will get back to you within 24-48 hours.</p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-6 text-accent hover:text-[#b08d48] underline transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-400">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-400">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                    placeholder="Info@preuae.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                    placeholder="+971 12 345 6789"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Project of Interest</label>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-primary">Select a Project</option>
                    <option value="Luxe Horizon" className="bg-primary">Luxe Horizon</option>
                    <option value="The Riveria" className="bg-primary">The Riveria</option>
                    <option value="Emerald Bay" className="bg-primary">Emerald Bay</option>
                    <option value="Skyline Towers" className="bg-primary">Skyline Towers</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Message</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Tell us more about your requirements..."
                  ></textarea>
                </div>

                {submitStatus === 'error' && (
                  <p className="text-red-400 text-sm text-center">
                    Something went wrong. Please try again or contact us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group bg-accent hover:bg-[#b08d48] text-primary font-bold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mt-4 shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(197,160,89,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Enquiry</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-gray-500 mt-4">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
};