import React, { useId, useState } from 'react';
import { MapPin, Phone, Mail, ArrowRight, CheckCircle, Zap, Loader2 } from 'lucide-react';

export const EnquiryFormContent: React.FC = () => {
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const projectId = useId();
  const messageId = useId();

  const [formData, setFormData] = useState({
    firstName: '',
    phone: '',
    email: '',
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
          phone: '',
          email: '',
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
    <div className="relative z-10 flex flex-col lg:flex-row h-full w-full max-w-[1200px] mx-auto items-center p-6 sm:p-10 lg:p-16 gap-8 lg:gap-16">
      {/* Left Side - Info */}
      <div className="flex-1 flex flex-col justify-center space-y-3 w-full">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-white leading-none tracking-tight">
          Start Your Journey to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C585] to-[#C5A059]">
            Excellence
          </span>
        </h2>

        <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-lg pt-2">
          Whether you're looking for your dream home or a prime commercial investment,
          our team is here to guide you every step of the way.
        </p>

        <div className="space-y-4 sm:space-y-6 pt-6">
          <div className="flex gap-3 sm:gap-4">
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#C5A059]" />
            </div>
            <div>
              <p className="text-sm sm:text-base text-gray-300 leading-[150%]">
                50+ years of excellence in delivering sustainable luxury homes across 9 cities.
              </p>
            </div>
          </div>
          <div className="flex gap-3 sm:gap-4">
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/10 flex items-center justify-center">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#C5A059]" />
            </div>
            <div>
              <p className="text-sm sm:text-base text-gray-300 leading-[150%]">
                Join 80,000+ happy families who trust Paradise RealEstate for their dream homes.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-white/20 space-y-4">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-[#C5A059]" />
            <span className="text-white">+971 50 371 7590</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-[#C5A059]" />
            <span className="text-white">Info@preuae.com</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#C5A059]" />
            <span className="text-white text-sm">Paradise RealEstate Towers, Bengaluru</span>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 w-full bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10">
        <h3 className="text-xl sm:text-2xl font-serif font-medium text-white mb-6">Send us a Message</h3>

        {submitStatus === 'success' ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h4 className="text-2xl font-serif font-medium text-white mb-2">Thank You!</h4>
            <p className="text-gray-400">We've received your inquiry and will get back to you within 24-48 hours.</p>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="mt-6 text-[#C5A059] hover:text-[#b08d48] underline transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor={nameId}
                  className="block text-[10px] font-mono font-normal text-gray-400 mb-2 tracking-[0.5px] uppercase"
                >
                  FULL NAME *
                </label>
                <input
                  type="text"
                  id={nameId}
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C5A059] transition-all text-sm h-10"
                />
              </div>
              <div>
                <label
                  htmlFor={phoneId}
                  className="block text-[10px] font-mono font-normal text-gray-400 mb-2 tracking-[0.5px] uppercase"
                >
                  PHONE
                </label>
                <input
                  type="tel"
                  id={phoneId}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+971 50 371 7590"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C5A059] transition-all text-sm h-10"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor={emailId}
                className="block text-[10px] font-mono font-normal text-gray-400 mb-2 tracking-[0.5px] uppercase"
              >
                EMAIL *
              </label>
              <input
                type="email"
                id={emailId}
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Info@preuae.com"
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C5A059] transition-all text-sm h-10"
              />
            </div>

            <div>
              <label
                htmlFor={projectId}
                className="block text-[10px] font-mono font-normal text-gray-400 mb-2 tracking-[0.5px] uppercase"
              >
                PROJECT OF INTEREST
              </label>
              <select
                id={projectId}
                name="project"
                value={formData.project}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#C5A059] transition-all text-sm h-10 appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#0B1525]">Select a Project</option>
                <option value="Luxe Horizon" className="bg-[#0B1525]">Luxe Horizon</option>
                <option value="The Riveria" className="bg-[#0B1525]">The Riveria</option>
                <option value="Emerald Bay" className="bg-[#0B1525]">Emerald Bay</option>
                <option value="Skyline Towers" className="bg-[#0B1525]">Skyline Towers</option>
              </select>
            </div>

            <div>
              <label
                htmlFor={messageId}
                className="block text-[10px] font-mono font-normal text-gray-400 mb-2 tracking-[0.5px] uppercase"
              >
                MESSAGE
              </label>
              <textarea
                id={messageId}
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us more about your requirements..."
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C5A059] transition-all resize-none text-sm"
              />
            </div>

            {submitStatus === 'error' && (
              <p className="text-red-400 text-sm text-center">
                Something went wrong. Please try again or contact us directly.
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full group bg-gradient-to-r from-[#C5A059] to-[#b08d48] hover:shadow-lg hover:shadow-[#C5A059]/20 text-[#0B1525] font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
      </div>
    </div>
  );
};
