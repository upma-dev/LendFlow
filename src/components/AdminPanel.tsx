import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Users, CreditCard, ShieldAlert, FileText, Download, CheckCircle, Search, Edit2, Plus, Trash2, Key, LogOut } from 'lucide-react';
import { LoanApplication, BankPartner } from '../types';

interface AdminPanelProps {
  enquiries: LoanApplication[];
  partners: BankPartner[];
  onAddPartner: (partner: BankPartner) => void;
  onUpdatePartner: (partner: BankPartner) => void;
  onDeletePartner: (id: string) => void;
  isAdminLoggedIn: boolean;
  onAdminLogin: () => void;
  onAdminLogout: () => void;
}

export default function AdminPanel({
  enquiries,
  partners,
  onAddPartner,
  onUpdatePartner,
  onDeletePartner,
  isAdminLoggedIn,
  onAdminLogin,
  onAdminLogout
}: AdminPanelProps) {
  const [passphrase, setPassphrase] = useState('');
  const [loginError, setLoginError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [exportMessage, setExportMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  // Bank editor modal state
  const [editingPartner, setEditingPartner] = useState<BankPartner | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPartnerForm, setNewPartnerForm] = useState<Omit<BankPartner, 'id'>>({
    name: '',
    logo: 'Award',
    interestRate: '11.00% p.a.',
    maxAmount: 'Up to ₹30 Lakhs',
    dsaCode: 'DSA-LF-0000',
    portalUrl: 'https://partner.bank'
  });

  // Selected lead context details state
  const [selectedEnquiry, setSelectedEnquiry] = useState<LoanApplication | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passphrase === 'admin123' || passphrase === 'admin') {
      onAdminLogin();
      setLoginError('');
    } else {
      setLoginError('Invalid Administrator credit key. Try "admin" as access key.');
    }
  };

  const calculateFinanceMetric = () => {
    const totalPaymentsCount = enquiries.filter(e => e.paymentStatus === 'paid').length;
    const totalPaymentsAmount = totalPaymentsCount * 499;
    
    // Convert to percentage
    const conversionPercent = enquiries.length > 0
      ? Math.round((totalPaymentsCount / enquiries.length) * 100)
      : 0;

    return {
      totalPaymentsCount,
      totalPaymentsAmount,
      conversionPercent
    };
  };

  const metric = calculateFinanceMetric();

  // Search filter
  const filteredEnquiries = enquiries.filter(e => {
    return e.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           e.mobileNumber.includes(searchTerm) ||
           e.panNumber.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Export functions
  const handleExportData = (format: 'Excel' | 'PDF') => {
    setExportMessage(`Export complete! Generated system raw output: LendFlow_Leads_${format === 'Excel' ? 'Schema.csv' : 'Report.pdf'}`);
    setTimeout(() => setExportMessage(null), 5000);
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="bg-[#0f172a] text-slate-100 min-h-screen py-16 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#0b1329] border border-indigo-950/70 rounded-2xl p-6 sm:p-8 max-w-sm w-full space-y-6 shadow-2xl"
          id="admin-login-box"
        >
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-blue-900/30 border border-blue-500/20 flex items-center justify-center text-blue-500 mx-auto">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Admin Lock Gateway</h3>
            <p className="text-xs text-slate-400">Restricted audit area of LendFlow router systems</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5 text-xs">
              <label className="text-slate-400 block font-semibold">Enter Security Passkey</label>
              <input
                type="password"
                required
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="Access key (e.g. admin)"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white tracking-widest text-center focus:border-blue-500 focus:outline-none"
                id="admin-passkey-input"
              />
            </div>

            {loginError && (
              <p className="text-[10px] text-red-400 text-center">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-lg text-xs transition-all active:scale-98"
            >
              Sign In to Admin View
            </button>
          </form>

          <p className="text-[10px] text-slate-500 text-center">Demo credentials: <span className="font-mono text-slate-300">admin</span></p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] text-slate-100 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header Title strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-indigo-950 pb-6 gap-4">
          <div>
            <span className="text-[10px] uppercase font-mono text-blue-400 font-bold block">Internal Audit Operations</span>
            <h2 className="text-2xl font-black text-white">LendFlow Administrator Dashboard</h2>
          </div>
          <button
            onClick={onAdminLogout}
            className="flex items-center space-x-1.5 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 text-red-400 font-bold px-4 py-2 rounded-xl text-xs transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Close Admin Console</span>
          </button>
        </div>

        {/* Dashboard Cards Summary analytics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0b1329] border border-indigo-950/70 p-4 rounded-xl">
            <span className="text-[10px] uppercase text-slate-400 font-mono block">Enquired Leads</span>
            <p className="text-2xl font-extrabold text-white mt-1">{enquiries.length}</p>
          </div>
          <div className="bg-[#0b1329] border border-indigo-950/70 p-4 rounded-xl">
            <span className="text-[10px] uppercase text-slate-400 font-mono block">Cleared Approvals</span>
            <p className="text-2xl font-extrabold text-emerald-400 mt-1">{enquiries.filter(e => e.status === 'pre_approved').length}</p>
          </div>
          <div className="bg-[#0b1329] border border-indigo-950/70 p-4 rounded-xl">
            <span className="text-[10px] uppercase text-slate-400 font-mono block">Platform Sales</span>
            <p className="text-2xl font-extrabold text-blue-400 mt-1">₹{metric.totalPaymentsAmount.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-[#0b1329] border border-indigo-950/70 p-4 rounded-xl">
            <span className="text-[10px] uppercase text-slate-400 font-mono block">Conversion Rate</span>
            <span className="text-xl font-bold text-[#fed7aa] bg-[#7c2d12]/20 px-2 py-0.5 rounded font-mono inline-block mt-1">{metric.conversionPercent}%</span>
          </div>
        </div>

        {/* Dynamic section: Left column leads, Right column Partners DSA manager */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Leads table block */}
          <div className="lg:col-span-8 bg-[#0b1329] border border-indigo-950/75 rounded-2xl p-5 shadow-xl space-y-4">
            {exportMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-xl text-xs font-semibold text-center"
              >
                ✓ {exportMessage}
              </motion.div>
            )}
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 border-b border-indigo-950/55 pb-4">
              <div>
                <h3 className="text-md font-extrabold text-white">Acquired Soft Leads Database</h3>
                <p className="text-xs text-slate-400">Total verified phone enquiries mapped</p>
              </div>
              
              <div className="flex items-center space-x-2.5 w-full sm:w-auto">
                <div className="relative w-full sm:w-48">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by PAN/Name..."
                    className="bg-slate-950 border border-slate-900 rounded-lg py-1.5 pl-8 pr-3 text-xs text-white focus:outline-none w-full font-sans"
                  />
                </div>
                
                <button
                  onClick={() => handleExportData('Excel')}
                  className="bg-slate-900 border border-slate-700/80 hover:bg-slate-800 text-slate-300 font-semibold p-1.5 rounded-lg text-xs"
                  title="Export XLS"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                </button>
              </div>
            </div>

            {/* List scroll panel */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[600px] border-collapse">
                <thead>
                  <tr className="border-b border-indigo-950 text-slate-500 font-mono font-bold uppercase">
                    <th className="py-2.5">Reference ID</th>
                    <th className="py-2.5">Name / Category</th>
                    <th className="py-2.5">Primary PAN</th>
                    <th className="py-2.5 flex justify-end">Income Bracket</th>
                    <th className="py-2.5 text-center">Eligibility Status</th>
                    <th className="py-2.5 text-center">Paid State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-950/40 text-slate-300">
                  {filteredEnquiries.map((e) => (
                    <tr
                      key={e.id}
                      onClick={() => setSelectedEnquiry(e)}
                      className={`hover:bg-slate-900/30 cursor-pointer transition-all ${
                        selectedEnquiry?.id === e.id ? 'bg-blue-900/20 text-white' : ''
                      }`}
                    >
                      <td className="py-3 font-mono font-bold text-slate-400">{e.id}</td>
                      <td className="py-3 font-bold">
                        <div>
                          <span>{e.fullName}</span>
                          <span className="text-[10px] font-normal text-slate-500 block uppercase">{e.loanCategory}</span>
                        </div>
                      </td>
                      <td className="py-3 font-mono tracking-wider">{e.panNumber}</td>
                      <td className="py-3 text-right font-mono font-bold text-slate-300">₹{e.monthlyIncome.toLocaleString('en-IN')}/mo</td>
                      <td className="py-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          e.status === 'pre_approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                        }`}>
                          {e.status === 'pre_approved' ? 'PRE_APPROVED' : 'REJECTED'}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          e.paymentStatus === 'paid' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'bg-slate-950 text-slate-600'
                        }`}>
                          {e.paymentStatus === 'paid' ? 'PAID' : 'UNPAID'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredEnquiries.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-6 text-slate-500 italic">No corresponding lead application archives located.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Partner and routing configuration block */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Bank partner management console */}
            <div className="bg-[#0b1329] border border-indigo-950/75 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-indigo-950/50 pb-3">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono">Routing Bank DSA Codes</h3>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold p-1 rounded-lg text-xs flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="text-[10px] pr-1">Add Code</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {partners.map((partner) => (
                  <div
                    key={partner.id}
                    className="p-3 bg-slate-950 rounded-xl border border-indigo-950/40 text-xs flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-bold text-slate-200">{partner.name}</h4>
                      <div className="flex space-x-2 text-[10px] text-slate-500 mt-0.5">
                        <span className="text-blue-400">{partner.interestRate}</span>
                        <span>•</span>
                        <span>{partner.maxAmount}</span>
                      </div>
                      <span className="text-[9px] bg-slate-900 border border-slate-800 text-emerald-400 px-1.5 py-0.5 rounded font-mono block mt-1 w-max">{partner.dsaCode}</span>
                    </div>

                    <div className="flex space-x-1">
                      <button
                        onClick={() => setEditingPartner(partner)}
                        className="p-1 hover:text-white text-slate-500 text-xs"
                        title="Edit Partner"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeletePartner(partner.id)}
                        className="p-1 hover:text-red-400 text-slate-500 text-xs"
                        title="Delete Partner"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected enquiry context profile details panel */}
            {selectedEnquiry && (
              <div className="bg-gradient-to-br from-[#0c1328] to-[#111d40] border border-blue-500/20 rounded-2xl p-5 shadow-2xl relative">
                <div className="flex justify-between items-start border-b border-indigo-950/60 pb-3 mb-3">
                  <div>
                    <span className="text-[9px] font-mono text-blue-400 uppercase">Selected Applicant Profile</span>
                    <h4 className="text-sm font-bold text-white">{selectedEnquiry.fullName}</h4>
                  </div>
                  <button
                    onClick={() => setSelectedEnquiry(null)}
                    className="text-slate-500 hover:text-white font-mono text-xs"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[10px] text-slate-500">Mobile Phone</p>
                      <p className="font-bold font-mono text-slate-200">{selectedEnquiry.mobileNumber}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">Resident Address</p>
                      <p className="font-semibold text-slate-200 truncate">{selectedEnquiry.cityState}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-500 font-mono">PAN CARD ID</p>
                    <p className="font-mono tracking-widest font-extrabold text-blue-300">{selectedEnquiry.panNumber}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-slate-950/40 p-2.5 rounded-xl border border-slate-900 font-mono text-[10px]">
                    <div>
                      <p className="text-slate-500">Income</p>
                      <p className="font-bold text-slate-300">₹{selectedEnquiry.monthlyIncome.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">EMI Debt</p>
                      <p className="font-bold text-slate-300">₹{selectedEnquiry.existingEmi.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Expenses</p>
                      <p className="font-bold text-slate-300">₹{selectedEnquiry.monthlyExpenses.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-indigo-950/40 text-[10px] text-slate-400 space-y-1">
                    <p><strong className="text-slate-300">Eligible EMI:</strong> ₹{selectedEnquiry.eligibleEmi.toLocaleString()}/mo</p>
                    <p><strong className="text-slate-300">Calculated Cap:</strong> ₹{selectedEnquiry.estimatedEligibility.toLocaleString()}</p>
                    <p><strong className="text-slate-300">Submitted On:</strong> {new Date(selectedEnquiry.appliedAt).toLocaleString()}</p>
                  </div>

                  {selectedEnquiry.paymentStatus === 'paid' && (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-2 rounded-lg text-[9px] font-semibold text-emerald-400 uppercase tracking-wider text-center">
                      Platform fee ₹499 Cleared via {selectedEnquiry.paymentDetails?.method}
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Edit Bank Partner Modal */}
      {editingPartner && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b1329] border border-blue-500/20 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl">
            <h4 className="text-base font-extrabold text-white">Modify DSA Code Target</h4>
            
            <div className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400">Partner Bank Name</label>
                <input
                  type="text"
                  value={editingPartner.name}
                  onChange={(e) => setEditingPartner({ ...editingPartner, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-400">Interest rate (p.a.)</label>
                <input
                  type="text"
                  value={editingPartner.interestRate}
                  onChange={(e) => setEditingPartner({ ...editingPartner, interestRate: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-400">DSA Agency Code</label>
                <input
                  type="text"
                  value={editingPartner.dsaCode}
                  onChange={(e) => setEditingPartner({ ...editingPartner, dsaCode: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono uppercase"
                />
              </div>
            </div>

            <div className="flex space-x-2 pt-2 text-xs">
              <button
                onClick={() => {
                  onUpdatePartner(editingPartner);
                  setEditingPartner(null);
                }}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg"
              >
                Apply Changes
              </button>
              <button
                onClick={() => setEditingPartner(null)}
                className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Bank Partner Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b1329] border border-blue-500/20 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl">
            <h4 className="text-base font-extrabold text-white">Map New DSA Router</h4>
            
            <div className="space-y-3 text-xs col-span-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-slate-400">Bank Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. State Bank of India"
                    value={newPartnerForm.name}
                    onChange={(e) => setNewPartnerForm({ ...newPartnerForm, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">DSA Agency Code</label>
                  <input
                    type="text"
                    required
                    placeholder="DSA-SBI-81"
                    value={newPartnerForm.dsaCode}
                    onChange={(e) => setNewPartnerForm({ ...newPartnerForm, dsaCode: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-slate-400">Interest rate (p.a.)</label>
                  <input
                    type="text"
                    placeholder="10.8% - 15.0%"
                    value={newPartnerForm.interestRate}
                    onChange={(e) => setNewPartnerForm({ ...newPartnerForm, interestRate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Max loan</label>
                  <input
                    type="text"
                    placeholder="Up to ₹50 Lakhs"
                    value={newPartnerForm.maxAmount}
                    onChange={(e) => setNewPartnerForm({ ...newPartnerForm, maxAmount: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Redirect Portal Link</label>
                <input
                  type="text"
                  placeholder="https://sbi.co.in/personal-loan"
                  value={newPartnerForm.portalUrl}
                  onChange={(e) => setNewPartnerForm({ ...newPartnerForm, portalUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>
            </div>

            {validationError && (
              <div className="text-[10px] text-red-400 bg-red-950/20 border border-red-900/30 p-2 text-center rounded-lg font-bold">
                {validationError}
              </div>
            )}

            <div className="flex space-x-2 pt-2 text-xs">
              <button
                onClick={() => {
                  if (!newPartnerForm.name || !newPartnerForm.dsaCode) {
                    setValidationError('Specify bank name and routing code!');
                    setTimeout(() => setValidationError(null), 4000);
                    return;
                  }
                  setValidationError(null);
                  onAddPartner({
                    id: `bank-${Date.now()}`,
                    ...newPartnerForm
                  });
                  setShowAddModal(false);
                  setNewPartnerForm({
                    name: '',
                    logo: 'Award',
                    interestRate: '11.00% p.a.',
                    maxAmount: 'Up to ₹30 Lakhs',
                    dsaCode: 'DSA-LF-0000',
                    portalUrl: 'https://partner.bank'
                  });
                }}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg"
              >
                Create Partner Target
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setValidationError(null);
                }}
                className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
