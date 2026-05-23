import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Lock, CheckCircle2, AlertCircle, ShoppingBag, ShieldCheck, ChevronRight, User, Mail, DollarSign, Wallet, FileText, Map, Activity } from 'lucide-react';
import { LoanApplication } from '../types';
import { calculateEligibility } from '../data';

interface EnquiryFormProps {
  initialCategory: 'personal' | 'business';
  onFormSubmit: (data: LoanApplication) => void;
}

export default function EnquiryForm({ initialCategory, onFormSubmit }: EnquiryFormProps) {
  // Wizard state: 1 = OTP Mobile Verification, 2 = Details Collection
  const [step, setStep] = useState<1 | 2>(1);
  const [loanCategory, setLoanCategory] = useState<'personal' | 'business'>(initialCategory);

  // Step 1: Mobile status
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [timer, setTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);

  // Form Fields State
  const [fullName, setFullName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState<number | ''>('');
  const [existingEmi, setExistingEmi] = useState<number | ''>('');
  const [monthlyExpenses, setMonthlyExpenses] = useState<number | ''>('');
  const [cibilScore, setCibilScore] = useState<number | ''>('');
  const [employmentType, setEmploymentType] = useState<LoanApplication['employmentType']>('Salaried');
  const [cityState, setCityState] = useState('');
  
  // Validation messages
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // OTP Simulator helpers
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      setOtpError('Please enter a valid 10-digit Indian mobile number starting with 6-9');
      return;
    }
    setOtpError('');
    setOtpSent(true);
    setTimer(30);
    // Auto-countdown simulation
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyOtp = (demoOtpOverride?: string) => {
    const code = demoOtpOverride || enteredOtp;
    setIsVerifying(true);
    setOtpError('');

    setTimeout(() => {
      if (code === '1234' || code === '9999') {
        setStep(2);
      } else {
        setOtpError('Invalid OTP! (Use code "1234" for instant mock verification)');
      }
      setIsVerifying(false);
    }, 1000);
  };

  // Check form inputs
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().split(' ').length < 2) {
      errors.fullName = 'Please enter your full first and last name';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId)) {
      errors.emailId = 'Please enter a valid email address';
    }
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber.toUpperCase())) {
      errors.panNumber = 'Invalid PAN format. Mandatory pattern: ABCDE1234F';
    }
    if (!monthlyIncome || monthlyIncome <= 0) {
      errors.monthlyIncome = 'Required monthly income must be greater than 0';
    }
    if (existingEmi === '' || Number(existingEmi) < 0) {
      errors.existingEmi = 'Please provide current obligations (use 0 if none)';
    }
    if (monthlyExpenses === '' || Number(monthlyExpenses) < 0) {
      errors.monthlyExpenses = 'Please provide estimated expenses (use 0 if none)';
    }
    if (cibilScore !== '' && (Number(cibilScore) < 300 || Number(cibilScore) > 900)) {
      errors.cibilScore = 'CIBIL score must be between 300 and 900';
    }
    if (!cityState.trim()) {
      errors.cityState = 'Please provide your current city & state';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Run core calculations from logic Engine
    const incVal = Number(monthlyIncome);
    const emiVal = Number(existingEmi) || 0;
    const expVal = Number(monthlyExpenses) || 0;
    const cibVal = cibilScore !== '' ? Number(cibilScore) : undefined;

    const calcResult = calculateEligibility(incVal, emiVal, expVal, cibVal);

    // Create application payload
    const applicationPayload: LoanApplication = {
      id: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName,
      mobileNumber,
      emailId,
      panNumber: panNumber.toUpperCase(),
      monthlyIncome: incVal,
      existingEmi: emiVal,
      monthlyExpenses: expVal,
      cibilScore: cibVal,
      employmentType,
      cityState,
      loanCategory,
      status: calcResult.status,
      appliedAt: new Date().toISOString(),
      remainingRepaymentCapacity: calcResult.remainingCapacity,
      eligibleEmi: calcResult.eligibleEmi,
      estimatedEligibility: calcResult.status === 'pre_approved' ? calcResult.estimatedLoanMin : 0, // Base min
      loanTenureYears: loanCategory === 'personal' ? 5 : 3,
      paymentStatus: 'unpaid'
    };

    onFormSubmit(applicationPayload);
  };

  return (
    <div className="bg-[#0f172a] text-slate-100 min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Loan Flow Progress Indicator Header */}
        <div className="mb-10 text-center">
          <span className="text-xs font-mono font-bold tracking-wider text-blue-400 uppercase">Interactive Pre-Approval Form</span>
          <h2 className="text-3xl font-extrabold text-white mt-1">Check Your Eligibility Limit</h2>
          
          <div className="flex items-center justify-center space-x-4 mt-6">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-blue-400' : 'text-slate-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-800'}`}>1</div>
              <span className="text-xs font-semibold">Verify Number</span>
            </div>
            <div className="w-12 h-px bg-slate-800" />
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-blue-400' : 'text-slate-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-800'}`}>2</div>
              <span className="text-xs font-semibold">Customer Details</span>
            </div>
          </div>
        </div>

        {/* Wizard Form container */}
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="bg-[#0b1329] border border-indigo-950/70 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Select Pre-Approval Category</h3>
                  <p className="text-xs text-slate-400">Specify whether this checks personal utility or business expansion</p>
                </div>
                <div className="flex bg-slate-950 p-1 rounded-xl border border-indigo-950/40">
                  <button
                    type="button"
                    onClick={() => setLoanCategory('personal')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold select-none transition-all ${
                      loanCategory === 'personal' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Personal Loan
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoanCategory('business')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold select-none transition-all ${
                      loanCategory === 'business' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Business Loan
                  </button>
                </div>
              </div>

              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Mobile Number Verification</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 text-sm font-semibold border-r border-slate-800 pr-2">
                        +91
                      </div>
                      <input
                        type="tel"
                        maxLength={10}
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter 10-digit mobile number"
                        className="w-full bg-slate-950 border border-slate-800/80 rounded-xl py-3 pl-16 pr-4 text-white text-base font-medium focus:border-blue-500 focus:outline-none transition-all placeholder-slate-600"
                        id="otp-mobile-input"
                      />
                    </div>
                    <p className="text-[10px] text-slate-500">We will send a one-time passcode to verify your phone authenticity dynamically.</p>
                  </div>

                  {otpError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>{otpError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-600/10 flex items-center justify-center space-x-2 transition-all"
                  >
                    <span>Request One-Time Code</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="bg-slate-950 p-4 rounded-xl border border-indigo-950/40 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400">SMS OTP code sent to</p>
                      <h4 className="text-sm font-bold text-slate-200">+91 {mobileNumber}</h4>
                    </div>
                    <button
                      onClick={() => setOtpSent(false)}
                      className="text-xs text-blue-400 underline"
                    >
                      Change Number
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Enter SMS Verification PIN</label>
                    <input
                      type="text"
                      maxLength={4}
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 4-digit code (e.g. 1234)"
                      className="w-full bg-slate-950 border border-slate-800/80 rounded-xl p-3 text-center tracking-[0.5em] text-xl font-mono text-white focus:border-blue-500 focus:outline-none transition-all"
                      id="otp-pin-input"
                    />
                    <div className="flex justify-between items-center pt-1.5">
                      <button
                        onClick={handleSendOtp}
                        disabled={timer > 0}
                        className={`text-xs ${timer > 0 ? 'text-slate-600 cursor-not-allowed' : 'text-blue-400 hover:underline'}`}
                      >
                        Resend Code {timer > 0 ? `(${timer}s)` : ''}
                      </button>
                      <span className="text-xs text-indigo-400/90 font-mono font-medium">Demo Secret: 1234</span>
                    </div>
                  </div>

                  {otpError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>{otpError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleVerifyOtp()}
                      disabled={isVerifying || enteredOtp.length < 4}
                      className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800/80 disabled:text-slate-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                    >
                      {isVerifying ? 'Verifying...' : 'Submit Verification'}
                    </button>
                    <button
                      onClick={() => handleVerifyOtp('1234')}
                      className="bg-[#1e293b] hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 text-xs select-none"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Auto OTP (Demo)</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.form
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              onSubmit={handleSubmitDetails}
              className="bg-[#0b1329] border border-indigo-950/70 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6"
            >
              <div className="bg-blue-950/20 border border-blue-900/30 p-3.5 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-slate-300">Verified mobile: <span className="font-bold text-slate-200">+91 {mobileNumber}</span></span>
                </div>
                <span className="text-[10px] bg-slate-900 border border-slate-800/80 px-2 py-0.5 rounded font-mono font-semibold text-emerald-400 uppercase">Category: {loanCategory}</span>
              </div>

              <div className="border-b border-indigo-950 pb-4">
                <h3 className="text-lg font-bold text-white">Fill Out Soft-Enquiry Particulars</h3>
                <p className="text-xs text-slate-400">Your details are processed purely through local math rules, maintaining credit safe state.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-blue-400" />
                    <span>Full Applicant Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter First & Last Name"
                    className={`w-full bg-slate-950 border rounded-xl p-3 text-sm text-white focus:border-blue-500 focus:outline-none transition-all ${
                      formErrors.fullName ? 'border-red-500' : 'border-slate-800'
                    }`}
                  />
                  {formErrors.fullName && <p className="text-[10px] text-red-400">{formErrors.fullName}</p>}
                </div>

                {/* Email ID */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span>Personal Email ID</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    placeholder="name@gmail.com"
                    className={`w-full bg-slate-950 border rounded-xl p-3 text-sm text-white focus:border-blue-500 focus:outline-none transition-all ${
                      formErrors.emailId ? 'border-red-500' : 'border-slate-800'
                    }`}
                  />
                  {formErrors.emailId && <p className="text-[10px] text-red-400">{formErrors.emailId}</p>}
                </div>

                {/* PAN Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-400" />
                    <span>PAN Number (Alphanumeric)</span>
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    required
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                    placeholder="ABCDE1234F"
                    className={`w-full bg-slate-950 border rounded-xl p-3 text-sm font-mono tracking-wider text-white focus:border-blue-500 focus:outline-none transition-all ${
                      formErrors.panNumber ? 'border-red-500' : 'border-slate-800'
                    }`}
                  />
                  {formErrors.panNumber && <p className="text-[10px] text-red-400">{formErrors.panNumber}</p>}
                </div>

                {/* Employment Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-blue-400" />
                    <span>Employment category</span>
                  </label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value as LoanApplication['employmentType'])}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-blue-500 focus:outline-none transition-all"
                  >
                    <option value="Salaried">Salaried Employee</option>
                    <option value="Self-Employed">Self-Employed Trade</option>
                    <option value="Business Owner">Business Owner / Partner</option>
                    <option value="Other">Other Profession</option>
                  </select>
                </div>

                {/* Monthly Income */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-blue-400" />
                    <span>Net Monthly Income (₹)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value !== '' ? Number(e.target.value) : '')}
                    placeholder="e.g. 50000"
                    className={`w-full bg-slate-950 border rounded-xl p-3 text-sm font-mono text-white focus:border-blue-500 focus:outline-none transition-all ${
                      formErrors.monthlyIncome ? 'border-red-500' : 'border-slate-800'
                    }`}
                  />
                  {formErrors.monthlyIncome && <p className="text-[10px] text-red-400">{formErrors.monthlyIncome}</p>}
                </div>

                {/* Existing EMI Obligation */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                    <Wallet className="w-3.5 h-3.5 text-blue-400" />
                    <span>Active EMI Obligations (₹)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={existingEmi}
                    onChange={(e) => setExistingEmi(e.target.value !== '' ? Number(e.target.value) : '')}
                    placeholder="Enter 0 if none"
                    className={`w-full bg-slate-950 border rounded-xl p-3 text-sm font-mono text-white focus:border-blue-500 focus:outline-none transition-all ${
                      formErrors.existingEmi ? 'border-red-500' : 'border-slate-800'
                    }`}
                  />
                  {formErrors.existingEmi && <p className="text-[10px] text-red-400">{formErrors.existingEmi}</p>}
                </div>

                {/* Monthly Rent/Expenses */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                    <Wallet className="w-3.5 h-3.5 text-blue-400" />
                    <span>Monthly Essential Rent/Expenses (₹)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(e.target.value !== '' ? Number(e.target.value) : '')}
                    placeholder="Expenses, rent, card bills"
                    className={`w-full bg-slate-950 border rounded-xl p-3 text-sm font-mono text-white focus:border-blue-500 focus:outline-none transition-all ${
                      formErrors.monthlyExpenses ? 'border-red-500' : 'border-slate-800'
                    }`}
                  />
                  {formErrors.monthlyExpenses && <p className="text-[10px] text-red-400">{formErrors.monthlyExpenses}</p>}
                </div>

                {/* CIBIL Score */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                    <Activity className="w-3.5 h-3.5 text-blue-400" />
                    <span>Approx CIBIL Score (Optional)</span>
                  </label>
                  <input
                    type="number"
                    min="300"
                    max="900"
                    value={cibilScore}
                    onChange={(e) => setCibilScore(e.target.value !== '' ? Number(e.target.value) : '')}
                    placeholder="Self-entered range (300-900)"
                    className={`w-full bg-slate-950 border rounded-xl p-3 text-sm font-mono text-white focus:border-blue-500 focus:outline-none transition-all ${
                      formErrors.cibilScore ? 'border-red-500' : 'border-slate-800'
                    }`}
                  />
                  {formErrors.cibilScore && <p className="text-[10px] text-red-400">{formErrors.cibilScore}</p>}
                </div>

                {/* City/State */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                    <Map className="w-3.5 h-3.5 text-blue-400" />
                    <span>Current Resident City & State</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={cityState}
                    onChange={(e) => setCityState(e.target.value)}
                    placeholder="e.g. Bangalore, Karnataka"
                    className={`w-full bg-slate-950 border rounded-xl p-3 text-sm text-white focus:border-blue-500 focus:outline-none transition-all ${
                      formErrors.cityState ? 'border-red-500' : 'border-slate-800'
                    }`}
                  />
                  {formErrors.cityState && <p className="text-[10px] text-red-400">{formErrors.cityState}</p>}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all hover:shadow-xl hover:shadow-blue-900/10 active:scale-98"
                >
                  <span>Evaluate My Pre-Approval Eligibility Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
