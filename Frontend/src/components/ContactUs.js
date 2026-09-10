import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, Sparkles, Clock, User, MessageSquare, ArrowRight } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Form Submitted:', formData);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'general', message: '' });
    }, 3500);
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 font-sans text-neutral-50 selection:bg-amber-500/30 overflow-x-hidden">
      
      {/* ── Ambient Background Glows ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-neutral-950/0 to-transparent -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full filter blur-[180px] bg-amber-900/10 pointer-events-none" />
      <div className="absolute top-[40%] left-[20%] w-[400px] h-[400px] rounded-full filter blur-[150px] bg-neutral-900/40 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
        
        {/* ── Header ── */}
        <div className="mb-20 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2 mb-6 text-xs font-black uppercase tracking-widest text-amber-400 border border-white/10 shadow-lg cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Contact Our Premium Team
          </div>
          <h1 className="max-w-4xl mb-6 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white drop-shadow-2xl">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 italic pr-4">Touch.</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl font-medium leading-relaxed">
            Have queries about your delivery, a specific farm order, or want to collaborate with us? Send us a message directly.
          </p>
        </div>

        {/* ── Main Content Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* ── Left Form Container ── */}
          <div className="lg:col-span-8 p-8 sm:p-12 rounded-[3rem] bg-neutral-900/60 backdrop-blur-2xl border border-white/10 shadow-2xl relative overflow-hidden transition-all duration-500 hover:border-amber-500/30 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] group/form">
            
            {/* Ambient Background Glows inside Form */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none bg-amber-500 transition-opacity group-hover/form:opacity-20" />
            <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full blur-[100px] opacity-[0.03] pointer-events-none bg-white" />

            {/* Success Overlay Modal */}
            {submitted && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-8 bg-neutral-950/90 backdrop-blur-xl animate-in fade-in duration-300">
                <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.3)] mb-6 transform transition-all scale-100 animate-bounce">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black text-white tracking-tight mb-2">Ticket Dispatched!</h3>
                <p className="text-xs font-black tracking-[0.2em] uppercase text-amber-400">We will connect with you shortly.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Name Input */}
                <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-neutral-500 group-focus-within:text-amber-400 transition-colors">
                    <User className="w-3.5 h-3.5" /> Full Name
                  </label>
                  <input
                    required
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full h-14 px-6 rounded-[1.5rem] text-sm font-bold bg-neutral-950 text-white placeholder-neutral-600 border border-white/5 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10 transition-all shadow-inner"
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-neutral-500 group-focus-within:text-amber-400 transition-colors">
                    <Mail className="w-3.5 h-3.5" /> Email Address
                  </label>
                  <input
                    required
                    type="email"
                    id="email"
                    placeholder="john@farmfresh.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full h-14 px-6 rounded-[1.5rem] text-sm font-bold bg-neutral-950 text-white placeholder-neutral-600 border border-white/5 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10 transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Subject Selection */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Inquiry Classification</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'general', label: 'General Query' },
                    { key: 'merchant', label: 'Merchant Partner' },
                    { key: 'rider', label: 'Fleet Rider' },
                    { key: 'issue', label: 'Technical Issue' },
                  ].map((subj) => {
                    const isActive = formData.subject === subj.key;
                    return (
                      <button
                        key={subj.key}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, subject: subj.key }))}
                        className={`w-full h-14 px-5 rounded-[1.5rem] text-xs font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-between outline-none focus-visible:ring-4 focus-visible:ring-amber-500/30 ${
                          isActive 
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)]" 
                            : "bg-neutral-950 text-neutral-400 border border-white/5 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {subj.label}
                        <span className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors ${
                          isActive ? 'border-amber-400 bg-transparent' : 'border-neutral-700'
                        }`}>
                          {isActive && <span className="h-2 w-2 rounded-full bg-amber-400" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message Textarea */}
              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-neutral-500 group-focus-within:text-amber-400 transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" /> Your Message
                </label>
                <textarea
                  required
                  rows="6"
                  id="message"
                  placeholder="Tell us how we can help you today..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full p-6 rounded-[1.5rem] text-sm font-bold bg-neutral-950 text-white placeholder-neutral-600 border border-white/5 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10 transition-all shadow-inner resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-16 rounded-[1.5rem] bg-gradient-to-br from-amber-400 to-amber-600 text-sm font-black uppercase tracking-widest text-neutral-950 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] active:scale-95 flex items-center justify-center gap-3 mt-8 outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50"
              >
                Send Dispatch Ticket <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* ── Right Info Cards Cluster ── */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full lg:max-w-md justify-between">
            
            {/* Address Card */}
            <div className="p-8 rounded-[2.5rem] bg-neutral-900/40 backdrop-blur-xl border border-white/5 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-neutral-900/80 hover:border-amber-500/30 group flex-1 flex flex-col justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-950 text-amber-400 border border-white/5 shadow-inner mb-6 group-hover:scale-110 transition-transform duration-500">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-extrabold text-white tracking-tight">Operational HQ</h4>
                <div className="space-y-1.5 text-sm font-medium text-neutral-400">
                  <p className="font-black text-amber-500 tracking-wide">FeastFlow Culinary Logistics LLC</p>
                  <p>Kakadeo Center Grid Node 12,</p>
                  <p>Kanpur, Uttar Pradesh, 208025</p>
                </div>
              </div>
            </div>

            {/* Email / Contact Card */}
            <div className="p-8 rounded-[2.5rem] bg-neutral-900/40 backdrop-blur-xl border border-white/5 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-neutral-900/80 hover:border-amber-500/30 group flex-1 flex flex-col justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-950 text-amber-400 border border-white/5 shadow-inner mb-6 group-hover:scale-110 transition-transform duration-500">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-5">
                <h4 className="text-xl font-extrabold text-white tracking-tight">Transmission Channels</h4>
                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Support Dispatch</span>
                    <a href="mailto:support@feastflow.net" className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors w-max group/link">
                      support@feastflow.net <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Merchant Node</span>
                    <a href="mailto:merchant@feastflow.net" className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors w-max group/link">
                      merchant@feastflow.net <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Extra Badge */}
            <div className="p-6 rounded-[2rem] bg-neutral-950 border border-white/5 flex flex-row items-center gap-5 text-left shadow-inner">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] bg-neutral-900 border border-white/10 text-amber-400">
                <Clock className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h5 className="font-black text-[10px] uppercase tracking-[0.15em] text-white">Rapid Response Guarantee</h5>
                <p className="text-xs font-medium text-neutral-500 mt-1.5">All dispatches evaluated within 2-4 working hours.</p>
              </div>
            </div>

          </div>
        </div>

        {/* ── Subfooter ── */}
        <div className="mt-24 pt-8 text-center border-t border-white/5 max-w-2xl mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600">
            FeastFlow Support Center — Built for perfection
          </p>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;