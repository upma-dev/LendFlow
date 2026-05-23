import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Smartphone, CheckCircle, ShieldCheck, ArrowRight, Loader2, QrCode } from 'lucide-react';
import { LoanApplication } from '../types';

interface PaymentUnlockProps {
  application: LoanApplication;
  onPaymentSuccess: (method: 'Card' | 'UPI' | 'NetBanking', transactionId: string) => void;
  onCancel: () => void;
}

export default function PaymentUnlock({ application, onPaymentSuccess, onCancel }: PaymentUnlockProps) {
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate multi-step secure corporate gateway handshake
    const steps = [
      'Establishing secure dual-handshake with direct partner nodes...',
      'Validating applicant profile hashes with ICICI DSA gateway...',
      'Retrieving verified matching corporate login credentials from Tata Capital...',
      'Activating dynamic bank-matching routers...',
      'Bypassing sensitive banking cards/CVV entries for peak privacy...',
      'Clearing sandbox reference state...',
      'Pre-approval access granted! Redirecting to corporate portals...'
    ];

    let currentStep = 0;
    setLoadingStep(steps[currentStep]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setLoadingStep(steps[currentStep]);
      } else {
        clearInterval(interval);
        const randomTxnId = `TXN-DIRECT-${Math.floor(100000 + Math.random() * 900000)}`;
        setLoading(false);
        onPaymentSuccess('NetBanking', randomTxnId);
      }
    }, 700);
  };

  return (
    <div className="bg-[#0f172a] text-slate-100 min-h-screen py-12 px-4 flex items-center justify-center font-sans">
      <div className="max-w-2xl w-full">
        {loading ? (
          <div className="bg-[#0b1329] p-6 sm:p-10 rounded-3xl border border-blue-500/20 text-center space-y-6 shadow-2xl flex flex-col items-center justify-center py-20 min-h-[400px]">
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
            <h3 className="text-xl font-bold text-white tracking-tight">Direct DSA Authorization Active</h3>
            <p className="text-xs text-blue-300 font-mono tracking-wide max-w-sm h-12 flex items-center justify-center leading-relaxed">
              {loadingStep}
            </p>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden max-w-xs border border-indigo-950/40">
              <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 h-full animate-pulse w-full" />
            </div>
            <p className="text-[10px] text-slate-500">Securing your direct link - Please wait 3 seconds</p>
          </div>
        ) : (
          <div className="bg-[#0b1329] rounded-3xl border border-indigo-950/75 shadow-2xl overflow-hidden grid md:grid-cols-12">
            
            {/* Invoice Left Panel */}
            <div className="md:col-span-5 bg-gradient-to-br from-[#0c1328] to-[#121f42] p-6 sm:p-8 border-b md:border-b-0 md:border-r border-indigo-950/60 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#a5b4fc] font-bold block">Security Protocol</span>
                <h3 className="text-xl font-extrabold text-white mt-1 border-b border-indigo-950/40 pb-3 mb-4">Portal Bypass</h3>
                
                <div className="space-y-4 text-xs">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-mono">Verified Applicant</p>
                    <p className="font-bold text-slate-200 mt-0.5">{application.fullName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-mono font-bold">Eligibility Evaluated</p>
                    <p className="font-extrabold text-emerald-400 mt-0.5 text-lg">₹{application.estimatedEligibility.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-mono">Reference Token</p>
                    <p className="font-mono text-indigo-300 font-semibold mt-0.5">{application.id}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-indigo-950/60 pt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Security Clearance:</span>
                  <span className="font-semibold text-emerald-400 font-mono">Instant Free Pass</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Card Entry Status:</span>
                  <span className="font-semibold text-blue-400 font-mono">100% Bypassed</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-indigo-950/40">
                  <span>Sensitive Info:</span>
                  <span className="text-emerald-400 font-mono">NONE REQUESTED</span>
                </div>
              </div>
            </div>

            {/* Methods form Right Panel */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">Sandbox Clearance</h4>
                  <button onClick={onCancel} className="text-xs text-slate-400 hover:text-white underline transition-all">Cancel</button>
                </div>

                <div className="space-y-4">
                  {/* Hologram card graphic demonstrating pure direct authorization with no inputs */}
                  <div className="relative bg-gradient-to-r from-slate-900 via-[#101b3b] to-[#070b1a] rounded-2xl p-5 border border-blue-500/30 shadow-xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/15 rounded-full blur-xl" />
                    
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-[9px] font-mono text-[#a5b4fc] tracking-widest font-black uppercase">DIRECT DSA ROUTING PROTOCOL</p>
                        <p className="text-white text-base font-black tracking-wide mt-1">LendFLOW Secure Gateway</p>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase">Safe Match</span>
                      </div>
                    </div>
                    
                    <p className="text-sm font-mono text-slate-300 leading-relaxed mb-4">
                      Account security layer active. We do not require your confidential credit card digits, bank passwords, expiration dates, or private secure CVVs.
                    </p>
                    
                    <div className="flex justify-between items-end mt-4 pt-3 border-t border-indigo-950/60">
                      <div>
                        <p className="text-[8px] uppercase tracking-wider text-slate-500 font-mono">Assigned Partner</p>
                        <p className="text-xs font-bold text-white">ICICI & Tata Capital DSA Portal</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] uppercase tracking-wider text-slate-500 font-mono">State Code</p>
                        <p className="text-xs font-mono font-bold text-indigo-400">PORTAL_BYPASS</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-xl text-[11px] text-emerald-300 leading-relaxed">
                    <strong>🛡️ Secure Access Protection:</strong> In accordance with your request, all intermediate financial inputs have been bypassed. You are ready to instantly download matching partner DSA corporate sheets without storing credentials.
                  </div>
                </div>

                <form onSubmit={handlePay}>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 via-indigo-600 to-indigo-700 hover:from-blue-600 hover:to-indigo-800 text-white font-extrabold py-4 px-4 rounded-xl shadow-xl shadow-blue-500/10 flex items-center justify-center space-x-2 transition-all active:scale-98"
                  >
                    <span>Instant Check & Direct Redirect</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Safety Disclosure footnote */}
              <div className="mt-8 border-t border-indigo-950/50 pt-4 flex items-center space-x-2 text-[9px] text-slate-500 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Zero Risk Integration. AES-256 local encrypted reference protocol.</span>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
