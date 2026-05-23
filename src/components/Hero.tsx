import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight, CheckCircle2, Star, Phone, Mail, MapPin, Award, Bookmark, Users } from 'lucide-react';
import { INITIAL_TESTIMONIALS } from '../data';
import { ViewState } from '../types';

interface HeroProps {
  setView: (view: ViewState) => void;
  setCategory?: (category: 'personal' | 'business') => void;
}

export default function Hero({ setView, setCategory }: HeroProps) {
  
  
  // Testimonial automated scroll state
  const [activeTestimonialIndex, setActiveTestimonialIndex] = React.useState(0);

  //automated typing list
  const heroTexts = [
  "Instant Loan Eligibility",
  "Smart Credit Matching",
  "Real-Time EMI Analysis",
  "AI Powered Loan Insights",
  "Pre-Approved Loan Offers",
  "Secure Banking Gateway",
  "Fast Digital Approval System",
];

const [activeHeroText, setActiveHeroText] = React.useState(0);

React.useEffect(() => {
  const interval = setInterval(() => {
    setActiveHeroText((prev) => 
      (prev + 1) % heroTexts.length
    );
  }, 3500);

  return () => clearInterval(interval);
}, []);

  React.useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveTestimonialIndex((prev) => (prev + 1) % INITIAL_TESTIMONIALS.length);
    }, 4000);
    
    return () => clearInterval(slideInterval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  const startCheck = (category: 'personal' | 'business') => {
    if (setCategory) setCategory(category);
    setView('apply');
  };

  return (
    <div className="bg-[#0f172a] text-slate-100 min-h-screen">
      {/* Dynamic Animated Header / Jumbotron */}
      <section className="relative overflow-hidden pt-12 pb-24 md:py-32 bg-gradient-to-b from-[#0b1329] via-[#0f172a] to-[#1e293b]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute bottom-0 right-[-10%] w-[40%] h-[50%] rounded-full bg-indigo-500/10 blur-[130px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            {/* Left intro copy */}
            <motion.div 
              className="md:col-span-7 space-y-6 text-center md:text-left"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                variants={itemVariants}
                className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-400/20 px-3.5 py-1.5 rounded-full text-blue-400 text-xs sm:text-sm font-semibold whitespace-nowrap"
              >
                <Award className="w-4 h-4 text-blue-400" />
                <span>Dual-Verify Credit Eligibility Engine</span>
              </motion.div>
 
              <motion.div
  variants={itemVariants}
  className="min-h-[120px] flex items-center justify-center md:justify-start"
>
  <motion.h1
    key={activeHeroText}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.7 }}
 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl
font-black tracking-tight leading-tight
max-w-[900px]
break-words"
  >
    <span className="text-white">
      Get{" "}
    </span>

    <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
      {heroTexts[activeHeroText]}
    </span>
  </motion.h1>
</motion.div>
             
            

              <motion.p 
                variants={itemVariants}
                className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto md:mx-0 leading-relaxed font-sans"
              >
                We calculate your real-time repayment capacity across leading banks—unlock customized interest rates, exact EMIs, and direct lender portals instantly. No credit score damage.
              </motion.p>

              <motion.div 
                variants={itemVariants} 
                className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-2"
              >
                <button
                  onClick={() => startCheck('personal')}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-2.5 transition-all text-base hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Get Personal Loan Pre-Approved</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => startCheck('business')}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-white font-semibold px-6 py-4 rounded-xl flex items-center justify-center space-x-2 transition-all hover:-translate-y-0.5"
                >
                  <span>Business Eligibility</span>
                </button>
              </motion.div>

              {/* Trust markers */}
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80 max-w-lg mx-auto md:mx-0"
              >
                <div>
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white whitespace-nowrap">
  ₹2,500 Cr+
</h4>
                  <p className="text-xs text-slate-400">Applications Routed</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-white">100%</h4>
                  <p className="text-xs text-slate-400">Soft Pull Security</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-white">20+</h4>
                  <p className="text-xs text-slate-400">Tier-1 Banking Partners</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Interactive Card / Promotion */}
            <motion.div 
              className="md:col-span-5"
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-[#111c3a] to-[#0f172a] rounded-2xl border border-indigo-500/20 p-6 sm:p-8 shadow-2xl relative">
                {/* Visual badge */}
                <div className="absolute top-4 right-4 bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-xs px-2.5 py-1 rounded-md font-mono font-semibold uppercase tracking-wider">
                  Verified platform
                </div>

                <h3 className="text-xl font-bold text-white mb-4">Calculate On-the-Fly</h3>
                
                <div className="space-y-4">
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">Example Formula</span>
                    <div className="flex justify-between items-end mt-2">
                      <div>
                        <p className="text-[10px] text-slate-400">Monthly Income</p>
                        <p className="text-lg font-bold text-white">₹50,000</p>
                      </div>
                      <div className="text-slate-500 font-bold text-sm">-</div>
                      <div>
                        <p className="text-[10px] text-slate-400">Fixed Obligation</p>
                        <p className="text-lg font-bold text-white">₹10,000</p>
                      </div>
                      <div className="text-slate-500 font-bold text-sm">-</div>
                      <div>
                        <p className="text-[10px] text-slate-400">Rent/Expenses</p>
                        <p className="text-lg font-bold text-white">₹15,000</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-blue-950/40 border border-blue-900/30 rounded-xl">
                    <span className="text-xs font-semibold text-blue-300">Net Repayment Capacity</span>
                    <span className="text-base font-extrabold text-blue-400">₹25,000 / month</span>
                  </div>

                  <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Eligible EMI Option</span>
                      <span className="font-bold text-white">₹20,000 approx.</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400 font-semibold">Pre-Approval Bracket</span>
                      <span className="font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">₹3.0 - ₹5.0 Lakhs</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setView('categories')}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-98 text-sm"
                  >
                    View Personal & Business Criteria
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#0b1329] border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Why Smart Earners Pull Pre-Approvability</h2>
            <p className="text-slate-400 mt-2 font-sans text-sm sm:text-base">We are a high-technology lead referral router. We check guidelines of 20+ partner lenders instead of pushing random products.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "100% Client Protected",
                desc: "Checking your options on LendFlow performs a Soft Bureau pull. It never impacts credit scores negatively."
              },
              {
                icon: Award,
                title: "Smart DSA Matching",
                desc: "Instantly maps your PAN and financials to find precise DSA codes corresponding to maximum approvals."
              },
              {
                icon: Bookmark,
                title: "One-Time Small Fee",
                desc: "Pay a tiny processing reference fee of ₹499 to directly fetch API-linked direct bank DSA portals. No commission cuts."
              },
              {
                icon: Users,
                title: "Dynamic Eligibility Engine",
                desc: "Considers your debt-to-income limits in real time so you save hours filling individual application rejections."
              }
            ].map((box, idx) => (
              <motion.div
                key={idx}
                className="bg-[#0f172a] p-6 rounded-2xl border border-indigo-950/60 hover:border-blue-500/30 transition-all group"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-900/30 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all mb-4">
                  <box.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{box.title}</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{box.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#0f172a] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-1/2 bg-blue-500/[0.01] blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-xs font-semibold tracking-wider text-blue-400 uppercase font-mono">Real Lending Feedback</h3>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">What Real Borrowers Say</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">Verified reviews powered by LendFlow soft-eligibility matches.</p>
          </div>

          {/* Testimonial Active Carousel Cards */}
          <div className="relative">
            {/* Desktop View: Shifting Glow states based on Active Index */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 items-stretch pt-4">
              {INITIAL_TESTIMONIALS.map((t, idx) => {
                const isActive = idx === activeTestimonialIndex;
                return (
                  <div
                    key={t.id}
                    onClick={() => setActiveTestimonialIndex(idx)}
                    className={`cursor-pointer transition-all duration-700 ease-out p-7 rounded-2xl flex flex-col justify-between border ${
                      isActive 
                        ? 'bg-[#111c3a] border-blue-500 scale-[1.03] shadow-lg shadow-blue-500/10' 
                        : 'bg-[#0b1329] border-slate-900 opacity-60 hover:opacity-90 scale-100'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-1">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        {isActive && (
                          <span className="text-[9px] bg-blue-500/20 text-blue-300 font-mono px-2 py-0.5 rounded font-black uppercase tracking-wider animate-pulse">Active Live</span>
                        )}
                      </div>
                      <p className="text-slate-200 text-sm italic leading-relaxed">"{t.text}"</p>
                    </div>
                    
                    <div className="flex items-center space-x-3.5 mt-6 pt-6 border-t border-indigo-950/60">
                      <img 
                        src={t.avatar} 
                        className="w-10 h-10 rounded-full object-cover border border-blue-500/30" 
                        alt={t.name}
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-white">{t.name}</h5>
                        <p className="text-[11px] text-blue-400">{t.role}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile View: Single Highlight Sliding Card */}
            <div className="block md:hidden">
              <div className="bg-[#111c3a] border border-blue-500/60 p-6 rounded-2xl min-h-[220px] flex flex-col justify-between shadow-2xl relative">
                {INITIAL_TESTIMONIALS.map((t, idx) => {
                  if (idx !== activeTestimonialIndex) return null;
                  return (
                    <div key={t.id} className="space-y-4 animate-fade-in">
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-1">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[9px] bg-blue-500/20 text-blue-300 font-mono px-2 py-0.5 rounded font-bold uppercase">Soft Match Verification</span>
                      </div>
                      <p className="text-slate-200 text-xs sm:text-sm italic leading-relaxed">"{t.text}"</p>
                      
                      <div className="flex items-center space-x-3.5 mt-4 pt-4 border-t border-indigo-950/60">
                        <img 
                          src={t.avatar} 
                          className="w-10 h-10 rounded-full object-cover border border-blue-500/30" 
                          alt={t.name}
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h5 className="text-xs font-bold text-white">{t.name}</h5>
                          <p className="text-[10px] text-blue-400 leading-tight">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Carousel navigation Dots and interactive arrows */}
            <div className="flex justify-center items-center space-x-2 mt-8">
              {INITIAL_TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonialIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeTestimonialIndex ? 'w-8 bg-blue-500' : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Jump to review slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Details & Footer */}
      <section id="contact" className="py-16 bg-[#090e1c] border-t border-indigo-950/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5 space-y-4">
              <span className="font-sans font-extrabold text-2xl tracking-tight text-white">LendFLOW</span>
              <p className="text-xs sm:text-sm text-slate-400 pr-4">
                We are India's premier high-speed soft approval aggregator. We act as an enquiry and lead router matching details with licensed Non-Banking Financial Companies (NBFC) & Banks. Note: Pre-approvals are soft evaluations and final terms are disbursed by direct banks.
              </p>
              <div className="pt-2 text-slate-500 text-xs">
                © 2026 LendFLOW Technologies Pvt Ltd. All rights reserved.
              </div>
            </div>

            <div className="md:col-span-4 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Direct Contacts</h4>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-blue-500 flex-none" />
                  <span>+91 9123-110-099 (Mon - Sat, 9 AM - 6 PM)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-blue-500 flex-none" />
                  <span>support@lendflow.in</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-blue-500 flex-none" />
                  <span>Cyber City Gateway Phase 3, Gurugram, HR - 122002</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Legal Disclosures</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                LendFLOW is NOT a licensed lender. We charge a dynamic platform referral fee to map candidate applications directly with API-ready DSA systems. Pre-approvals do not constitute final credit commitments.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
