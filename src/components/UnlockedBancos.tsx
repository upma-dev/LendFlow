import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Download, ExternalLink, RefreshCw, FileText, CheckCircle, ArrowRight, Home, Info, Loader2 } from 'lucide-react';
import { LoanApplication, BankPartner } from '../types';
import { BANK_PARTNERS } from '../data';

interface UnlockedBancosProps {
  application: LoanApplication;
  onBackToHome: () => void;
}

export default function UnlockedBancos({ application, onBackToHome }: UnlockedBancosProps) {
  const [showRedirecting, setShowRedirecting] = useState<string | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptDownloaded, setReceiptDownloaded] = useState(false);

  const triggerRedirect = (bankName: string) => {
    setShowRedirecting(bankName);
    setTimeout(() => {
      setShowRedirecting(null);
    }, 2800);
  };

  const getFilteredPartners = (): BankPartner[] => {
    // If business loan, prioritize Piramal, Aditya, Tata, Bajaj
    // If personal loan, allow HDFC/ICICI, Tata and others
    return BANK_PARTNERS;
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="bg-[#0f172a] text-slate-100 min-h-screen py-12 px-4 relative">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Unlocked Banner Top Alert */}
        <div className="bg-gradient-to-r from-emerald-600/20 to-teal-500/15 border border-emerald-500/35 p-6 rounded-3xl flex flex-col sm:flex-row items-center sm:justify-between shadow-lg">
          <div className="flex items-center space-x-4 text-center sm:text-left">
            <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-mono text-emerald-400 font-bold block">Access Unlocked • Premium</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">Lender Dashboards Released</h2>
              <p className="text-xs text-slate-300">We pushed applicant records successfully to direct DSA databases!</p>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-2.5">
            <button
              onClick={() => setShowReceipt(true)}
              className="bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Get Fee Invoice</span>
            </button>
            <button
              onClick={onBackToHome}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Fintech Home</span>
            </button>
          </div>
        </div>

        {/* Dynamic calculation results brief info card */}
        <div className="bg-[#0b1329] border border-indigo-950/60 rounded-2xl p-6 grid sm:grid-cols-3 gap-6">
          <div>
            <span className="text-xs text-slate-500 block">Soft Checked Eligibility</span>
            <p className="text-lg font-extrabold text-white mt-0.5">{formatCurrency(application.estimatedEligibility)}</p>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Optimal Term / Tenure</span>
            <p className="text-lg font-extrabold text-blue-400 mt-0.5">{application.loanTenureYears} Years Tenure</p>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Secured Transaction ID</span>
            <p className="text-sm font-mono text-slate-300 mt-1 truncate">{application.paymentDetails?.transactionId || 'SANDBOX-TXN'}</p>
          </div>
        </div>

        {/* Bank Partner Grid lists */}
        <div className="space-y-4">
          <h3 className="text-lg font-extrabold text-white">Recommended Lenders Matching Your Profile</h3>
          <p className="text-xs text-slate-400 -mt-2">These institutional lenders match your monthly repayment capacity with automated API referral.</p>

          <div className="grid gap-4">
            {getFilteredPartners().map((bank) => {
              const matchesEligibility = application.monthlyIncome >= 35000;
              return (
                <div
                  key={bank.id}
                  className="bg-[#0b1329] border border-indigo-950/70 p-5 rounded-2xl flex flex-col md:flex-row items-center md:justify-between hover:border-blue-500/30 transition-all shadow-md gap-4"
                >
                  <div className="flex flex-col md:flex-row items-center md:space-x-4 text-center md:text-left">
                    {/* Bank Placeholder Logo */}
                    <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xs font-black text-blue-400 font-sans tracking-tight">
                      {bank.name.split(' ')[0]}
                    </div>
                    
                    <div className="mt-2 md:mt-0">
                      <div className="flex items-center justify-center md:justify-start space-x-2">
                        <h4 className="text-base font-bold text-white">{bank.name}</h4>
                        <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-1.5 py-0.5 rounded font-bold font-mono">Matched 100%</span>
                      </div>
                      <div className="flex flex-wrap justify-center md:justify-start items-center space-x-3.5 mt-1 text-xs text-slate-400">
                        <span>Interest: <strong className="text-blue-400 font-bold">{bank.interestRate}</strong></span>
                        <span className="hidden sm:inline text-slate-600">•</span>
                        <span>Grant Ceiling: <strong className="text-slate-300">{bank.maxAmount}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center sm:space-x-3 w-full md:w-auto mt-2 md:mt-0 gap-3">
                    <div className="text-center sm:text-right text-xs">
                      <span className="text-[10px] text-slate-500 uppercase block font-mono">Lendflow DSA Code</span>
                      <span className="font-mono font-bold text-emerald-400 bg-emerald-400/5 border border-emerald-500/20 px-2 py-0.5 rounded block sm:inline-block mt-0.5">{bank.dsaCode}</span>
                    </div>

                    <button
                      onClick={() => triggerRedirect(bank.name)}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-blue-500/10 transition-all select-none"
                    >
                      <span>Direct Router Login</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Terms details disclaimers file */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-start space-x-3.5">
          <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-300">How to proceed:</strong> Click "Direct Router Login" for any matched partner. You will be redirected to their official digital loan creation system. Since LendFlow has auto-transmitted your pre-approval clearance file, make sure to use the same <span className="text-slate-100 font-bold">PAN Number ({application.panNumber})</span> and <span className="text-slate-100 font-bold">Mobile ({application.mobileNumber})</span> during bank validation to ensure the direct LendFlow DSA discount gets updated.
          </p>
        </div>

      </div>

      {/* Redirect dialog simulation modal popup */}
      <AnimatePresence>
        {showRedirecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-center"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#0b1329] border border-blue-500/20 p-8 rounded-2xl max-w-sm w-full space-y-5 shadow-2xl flex flex-col items-center"
            >
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-white">Redirecting to Lender Portal</h4>
                <p className="text-xs text-slate-400">Verifying secure partner API connection</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-indigo-950/40 text-xs w-full space-y-1 font-mono text-left text-slate-300">
                <p><span className="text-slate-500">Host:</span> {showRedirecting.split(' ')[0].toLowerCase()}.partner.lendflow</p>
                <p><span className="text-slate-500">DSA Token:</span> active_authorized</p>
                <p><span className="text-slate-500">PAN ID:</span> {application.panNumber}</p>
                <p><span className="text-slate-500">User Status:</span> pre_screened_green</p>
              </div>

              <p className="text-[10px] text-slate-500">You will land securely on {showRedirecting} inside a separate secure checkout frame.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invoice receipt details modal simulation */}
      <AnimatePresence>
        {showReceipt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white text-slate-900 p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-6 shadow-2xl relative"
            >
              {/* Receipt watermark pattern */}
              <div className="absolute top-2 right-2 border-2 border-emerald-500/30 text-emerald-600 px-3 py-1 font-mono text-[10px] font-black tracking-wider uppercase rounded-lg rotate-12">
                PAID IN FULL
              </div>

              <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                <div>
                  <span className="font-extrabold text-xl tracking-tight text-blue-900">LendFLOW Receipt</span>
                  <p className="text-[10px] font-mono text-slate-500 mt-0.5">PLATFORM REFERRAL TRANSACTION</p>
                </div>
                <button
                  onClick={() => setShowReceipt(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 underline uppercase"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Reference Number:</span>
                  <span className="font-mono font-bold text-slate-800">{application.id}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Payment Method:</span>
                  <span className="font-bold text-slate-800">{application.paymentDetails?.method || 'UPI'} Gateway</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Gateway Txn ID:</span>
                  <span className="font-mono font-bold text-blue-600 truncate block max-w-[150px]">{application.paymentDetails?.transactionId || 'SANDBOX-TXN-5510291'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Settled On:</span>
                  <span className="font-bold text-slate-800 font-mono">
                    {application.paymentDetails?.paidAt 
                      ? new Date(application.paymentDetails.paidAt).toLocaleDateString()
                      : new Date().toLocaleDateString()
                    }
                  </span>
                </div>
              </div>

              <div className="border-t border-b border-slate-150 py-4 space-y-1.5 text-xs">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Description</span>
                  <span>Amount</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Soft Pull Pre-Approval Referral Fee</span>
                  <span>₹422.88</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Goods & Services Tax (18% SGST + CGST)</span>
                  <span>₹76.12</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-slate-950 font-extrabold text-base pt-1">
                <span>Amount Charged Amount:</span>
                <span className="text-indigo-900">₹499.00</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg text-[9px] text-slate-500 leading-tight">
                This digital document confirms receipt of the platform verification fee which maps your particulars to licensed DSA code systems. It serves as an official invoice. For billing support, write to support@lendflow.in.
              </div>

              {receiptDownloaded ? (
                <div className="bg-emerald-50 text-emerald-700 text-center py-3.5 px-4 rounded-xl text-xs font-bold border border-emerald-250 animate-pulse">
                  ✓ Receipt Invoice PDF Generated & Saved!
                </div>
              ) : (
                <button
                  onClick={() => {
                    setReceiptDownloaded(true);
                    setTimeout(() => setReceiptDownloaded(false), 3500);
                  }}
                  className="w-full bg-[#0d152a] hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Print PDF Invoice</span>
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
