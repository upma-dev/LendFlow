import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, CheckCircle2, DollarSign, Briefcase, ChevronRight, FileText, Calendar, Compass } from 'lucide-react';
import { ViewState } from '../types';

interface CategoriesProps {
  setView: (view: ViewState) => void;
  setCategory: (category: 'personal' | 'business') => void;
}

export default function Categories({ setView, setCategory }: CategoriesProps) {
  const triggerApply = (type: 'personal' | 'business') => {
    setCategory(type);
    setView('apply');
  };

  const categories = [
    {
      id: 'personal' as const,
      title: 'Personal Loan pre-approval',
      tagline: 'Ideal for salaried professionals & fast cash needs',
      rate: '10.50% - 14.25% p.a.',
      maxGrant: 'Up to ₹25,000,000',
      tenure: '12 to 60 Months',
      icon: DollarSign,
      color: 'from-blue-600 to-indigo-600',
      shadowColor: 'shadow-blue-500/10',
      description: 'Gain immediate liquidity for emergency expenses, home restructuring, elite study loans or major lifestyle purchases. Uses rapid soft checks to prevent credit score drops.',
      eligibility: [
        'Minimum age of 21 years up to 58 years',
        'Minimum net monthly income of ₹20,000',
        'CIBIL score above 650 preferred',
        'Active bank account with salary credits'
      ],
      documents: [
        'Identity & Address Proof (Aadhaar/PAN)',
        'Salary slips for last 3 months',
        'Net-banking credentials or 3 months statement'
      ]
    },
    {
      id: 'business' as const,
      title: 'Business Growth Capital',
      tagline: 'Powering retail expansion, GST credit & cash flows',
      rate: '11.25% - 18.00% p.a.',
      maxGrant: 'Up to ₹50,000,000',
      tenure: '6 to 36 Months',
      icon: Briefcase,
      color: 'from-cyan-600 to-blue-700',
      shadowColor: 'shadow-cyan-500/10',
      description: 'Fuel your inventory stocking, machinery updates, warehouse optimization or GST invoice settlement. Zero collateral needed for amounts under ₹15 Lakhs.',
      eligibility: [
        'Proprietorship, Partnership, or Pvt Ltd company',
        'Business vintage of minimum 1 year active',
        'Monthly business revenue of ₹45,000+',
        'GST registration with clean filings (optional but preferred)'
      ],
      documents: [
        'Business Registration Certificate (GST/MSME/Udyam)',
        'Business PAN & owner Aadhaar Card',
        '6 Months bank statement showing trade turnover'
      ]
    }
  ];

  return (
    <div className="bg-[#0f172a] text-slate-100 py-16 md:py-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Our Automated Loan Categories
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Select the category that matches your requirement. Each is equipped with a specialized soft evaluation engine instantly mapping to direct DSP partners.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                className={`bg-[#0b1329] rounded-2xl border border-indigo-950 p-6 sm:p-8 flex flex-col justify-between hover:border-blue-500/30 transition-all shadow-2xl ${cat.shadowColor}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                whileHover={{ y: -6 }}
              >
                <div>
                  {/* Top Bar Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-mono text-slate-500 block">Interest Starting From</span>
                      <span className="text-sm sm:text-md font-bold text-blue-400">{cat.rate}</span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">{cat.title}</h3>
                  <p className="text-xs sm:text-sm font-semibold text-blue-300 mb-4">{cat.tagline}</p>
                  
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">{cat.description}</p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-6 pt-4 border-t border-slate-900">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-mono">Max Eligibility Link</span>
                      <span className="text-sm font-bold text-slate-200">{cat.maxGrant}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-mono">Tenure Range</span>
                      <span className="text-sm font-bold text-slate-200">{cat.tenure}</span>
                    </div>
                  </div>

                  {/* Eligibility Factors */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-xs uppercase font-mono text-slate-400 tracking-wider font-semibold">Minimum Eligibility Parameters:</h4>
                    <ul className="space-y-2">
                      {cat.eligibility.map((el, itemIdx) => (
                        <li key={itemIdx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{el}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Documents Required */}
                  <div className="space-y-3 mb-8 pt-4 border-t border-slate-900">
                    <h4 className="text-xs uppercase font-mono text-slate-400 tracking-wider font-semibold flex items-center space-x-1.5">
                      <FileText className="w-4 h-4 text-blue-400" />
                      <span>Documents Required for Verification:</span>
                    </h4>
                    <ul className="space-y-2">
                      {cat.documents.map((doc, itemIdx) => (
                        <li key={itemIdx} className="flex items-start space-x-2 text-xs text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500/70 flex-shrink-0 mt-0.5" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => triggerApply(cat.id)}
                  className={`w-full bg-gradient-to-r ${cat.color} hover:brightness-110 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2.5 transition-all text-sm shadow-xl active:scale-98`}
                >
                  <span>Apply with Dynamic Calculation</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic warning disclaimer */}
        <div className="mt-12 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-start space-x-3 max-w-4xl mx-auto">
          <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-slate-400 leading-relaxed">
            <span className="font-semibold text-amber-500">Notice on Soft Approvals:</span> Checking on our platform compiles a secure data file utilizing manual or auto-filled options. This evaluation does not trigger an official hard debit on national databases, which ensures your eligibility status is preserved. Complete information gets shared strictly with selection banks under secure SSL parameters.
          </div>
        </div>
      </div>
    </div>
  );
}
