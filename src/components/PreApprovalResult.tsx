import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ShieldAlert, FileDown, Check, Coins, Calendar, TrendingUp, ChevronRight, RefreshCw } from 'lucide-react';
import { LoanApplication } from '../types';

interface PreApprovalResultProps {
  application: LoanApplication;
  onProceedToUnlock: () => void;
  onRecalculate: () => void;
}

export default function PreApprovalResult({
  application,
  onProceedToUnlock,
  onRecalculate
}: PreApprovalResultProps) {
  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const isApproved = application.status === 'pre_approved';
  const remainingRepay = application.remainingRepaymentCapacity;
  const debtRatio = Math.round(((application.existingEmi + application.monthlyExpenses) / application.monthlyIncome) * 100);

  return (
    <div className="bg-[#0f172a] text-slate-100 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <AnimatePresenceWrapper>
          {isApproved ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Pre-Approved Certificate Container */}
              <div className="bg-gradient-to-br from-[#121f44] to-[#0a0f21] border border-blue-500/30 rounded-3xl overflow-hidden shadow-2xl relative">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-[40px] pointer-events-none" />

                <div className="p-6 sm:p-10">
                  {/* Status Badge */}
                  <div className="flex flex-col sm:flex-row items-center sm:justify-between border-b border-indigo-950/70 pb-6 mb-6">
                    <div className="flex items-center space-x-4 text-center sm:text-left">
                      <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400">
                        <ShieldCheck className="w-8 h-8" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-[#a5b4fc] uppercase">Soft Assessment Clearance</span>
                        <h3 className="text-xl sm:text-2xl font-black text-white">Pre-Approval Approved!</h3>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 text-center sm:text-right">
                      <span className="text-[10px] uppercase font-mono text-slate-500 block">Reference Code</span>
                      <span className="text-sm font-mono font-bold text-slate-300">{application.id}</span>
                    </div>
                  </div>

                  {/* Summary Core Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-950/40 p-6 rounded-2xl border border-slate-900 mb-8">
                    <div>
                      <span className="text-xs text-slate-400 block font-mono">ESTIMATED ELIGIBLE RANGE</span>
                      <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                        {formatINR(application.estimatedEligibility)} - {formatINR(application.estimatedEligibility * 1.6)}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Calculated dynamic ceiling based on current debt capabilities</p>
                    </div>

                    <div className="border-t sm:border-t-0 sm:border-l border-slate-900 sm:pl-6 pt-4 sm:pt-0 flex flex-col justify-between">
                      <div>
                        <span className="text-xs text-slate-400 block font-mono">SUPPORTABLE MAX EMI / MONTH</span>
                        <p className="text-xl font-extrabold text-blue-400 mt-0.5">{formatINR(application.eligibleEmi)}/mo</p>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-slate-300 pt-2">
                        <Calendar className="w-3.5 h-3.5 text-blue-400" />
                        <span>Proposed Tenure: <span className="font-bold text-white">{application.loanTenureYears} Years max</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Complete Breakdown Details */}
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-indigo-300">Financial Capability Summary</h4>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                      <div className="bg-slate-950/20 p-3.5 rounded-xl border border-indigo-950/40">
                        <span className="text-slate-400 block text-[10px]">Monthly Income</span>
                        <span className="font-bold text-slate-200 block mt-0.5">{formatINR(application.monthlyIncome)}</span>
                      </div>
                      <div className="bg-slate-950/20 p-3.5 rounded-xl border border-indigo-950/40">
                        <span className="text-slate-400 block text-[10px]">Unpaid Obligations</span>
                        <span className="font-bold text-slate-200 block mt-0.5">{formatINR(application.existingEmi)}</span>
                      </div>
                      <div className="bg-slate-950/20 p-3.5 rounded-xl border border-indigo-950/40 col-span-2 sm:col-span-1">
                        <span className="text-slate-400 block text-[10px]">Estimated Expenses</span>
                        <span className="font-bold text-slate-200 block mt-0.5">{formatINR(application.monthlyExpenses)}</span>
                      </div>
                    </div>

                    <div className="border-t border-indigo-950/50 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-3.5 bg-slate-900/40 border border-slate-900 rounded-xl">
                        <span className="text-xs text-slate-400">Net Repayment Capacity:</span>
                        <span className="text-xs font-bold font-mono text-indigo-300">{formatINR(remainingRepay)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3.5 bg-slate-900/40 border border-slate-900 rounded-xl">
                        <span className="text-xs text-slate-400">Debt Burden Ratio:</span>
                        <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                          debtRatio > 50 ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                        }`}>
                          {debtRatio}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Checklist before Partner links */}
                  <div className="mt-8 bg-blue-950/30 rounded-xl border border-blue-900/30 p-4 space-y-2 text-xs">
                    <span className="font-bold uppercase text-blue-300 block">Pre-Approval Conditions:</span>
                    <div className="space-y-1.5 text-slate-300">
                      <div className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Eligible for instant reference transfer to ICICI & Tata Capital</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Direct integration to partner corporate DSA login portals</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>One-time ₹499 gateway processing fee enables full details download</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Block */}
                <div className="bg-[#0b1328] p-6 border-t border-indigo-950/80 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-between items-center">
                  <div className="text-center sm:text-left">
                    <p className="text-xs text-slate-400">Secure matching partner APIs</p>
                    <p className="text-sm font-extrabold text-white">Platform Processing Fee: <span className="text-emerald-400 font-bold">₹499 only</span></p>
                  </div>
                  <button
                    onClick={onProceedToUnlock}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-xl shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all active:scale-95"
                  >
                    <span>Proceed & Unlock Bank Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Dynamic Recalculator Trigger */}
              <div className="text-center">
                <button
                  onClick={onRecalculate}
                  className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-white transition-all underline"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Test other variables / Recalculate</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0b1329] border border-red-900/30 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-10 space-y-6"
            >
              <div className="flex items-center space-x-4 border-b border-indigo-950 pb-6">
                <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center text-red-500">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-red-400 uppercase">Assessment Halt</span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">Pre-Approval Unsatisfactory</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Our eligibility calculation indicates that your active debt obligations (<span className="font-mono text-slate-200">{formatINR(application.existingEmi)}</span>) combined with rent/expenses (<span className="font-mono text-slate-200">{formatINR(application.monthlyExpenses)}</span>) overwhelm your incoming monthly income capability. Under leading bank guidelines, your debt-to-income (DTI) ratio is <span className="font-bold text-red-400">{debtRatio}%</span>, which exceeds our safe threshold of <span className="text-slate-300 font-bold">50%</span>.
              </p>

              {/* Suggestions matrix */}
              <div className="space-y-3 bg-red-950/10 border border-red-900/20 p-5 rounded-2xl">
                <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-red-300">Tips to Increase Pre-Approval Chances:</h4>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 font-bold mt-0.5">•</span>
                    <span><strong className="text-slate-200">Consolidate micro-debts:</strong> Settle outstanding buy-now-pay-later charges to free up your monthly debt profile.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 font-bold mt-0.5">•</span>
                    <span><strong className="text-slate-200">Joint Application:</strong> Add a secondary spouse/parent co-applicant to count collective pool income.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 font-bold mt-0.5">•</span>
                    <span><strong className="text-slate-200">Specify Lower EMI Obligation:</strong> If any current loan is closing within 2 months, minimize its impact.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onRecalculate}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl border border-slate-700 flex items-center justify-center space-x-2 transition-all text-xs sm:text-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Update and Recalculate Details</span>
                </button>
                <button
                  onClick={onRecalculate}
                  className="w-full bg-blue-600/20 hover:bg-blue-600/35 text-blue-300 font-bold py-3.5 rounded-xl transition-all text-xs"
                >
                  Contact LendFlow Expert
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresenceWrapper>
      </div>
    </div>
  );
}

// Internal animated wrapper inside single component to keep standard import rules
function AnimatePresenceWrapper({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-in">{children}</div>;
}
