import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewState, LoanApplication, BankPartner } from './types';
import { INITIAL_ENQUIRIES, BANK_PARTNERS } from './data';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import EnquiryForm from './components/EnquiryForm';
import PreApprovalResult from './components/PreApprovalResult';
import PaymentUnlock from './components/PaymentUnlock';
import UnlockedBancos from './components/UnlockedBancos';
import AdminPanel from './components/AdminPanel';
import { Bell, CheckCircle2, ShieldCheck, Mail, Smartphone, ArrowRight, X } from 'lucide-react';

interface MockNotification {
  id: string;
  type: 'sms' | 'whatsapp' | 'email' | 'system';
  target: string;
  message: string;
  timestamp: string;
}

export default function App() {
  const [currentView, setView] = useState<ViewState>('home');
  const [selectedCategory, setCategory] = useState<'personal' | 'business'>('personal');
  
  // Storage states (react state as persistent local stack)
  const [enquiries, setEnquiries] = useState<LoanApplication[]>(INITIAL_ENQUIRIES);
  const [partners, setPartners] = useState<BankPartner[]>(BANK_PARTNERS);
  const [activeEnquiry, setActiveEnquiry] = useState<LoanApplication | null>(null);
  
  // Session State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Simulation Notifications logs database
  const [alerts, setAlerts] = useState<MockNotification[]>([
    {
      id: 'init-1',
      type: 'system',
      target: 'System Init',
      message: 'LendFlow core routing engine booted. Mapping 5 active partner DSA nodes.',
      timestamp: new Date(Date.now() - 3600000).toLocaleTimeString()
    },
    {
      id: 'init-2',
      type: 'system',
      target: 'Credit API',
      message: 'Active credit soft calculators checked. Matching standards of 20+ Tier-1 financial entities.',
      timestamp: new Date(Date.now() - 1800000).toLocaleTimeString()
    }
  ]);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [unreadAlerts, setUnreadAlerts] = useState(0);

  // Watch alerts list to manage badge indicators
  useEffect(() => {
    setUnreadAlerts(alerts.length);
  }, [alerts.length]);

  const addAlert = (type: MockNotification['type'], target: string, message: string) => {
    const newAlert: MockNotification = {
      id: `alert-${Date.now()}`,
      type,
      target,
      message,
      timestamp: new Date().toLocaleTimeString()
    };
    setAlerts(prev => [newAlert, ...prev]);

    // Give visual system toast brief feedback
    const toastElem = document.createElement('div');
    toastElem.className = "fixed bottom-5 left-5 bg-slate-900 border border-blue-500/35 text-white px-4 py-3 rounded-xl shadow-2xl z-50 text-xs flex items-center space-x-2.5 max-w-sm animate-bounce";
    toastElem.innerHTML = `
      <div class="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
      <div>
        <p class="font-bold font-mono text-[9px] text-blue-400 capitalize">${type} Alert</p>
        <p class="text-slate-300 font-sans mt-0.5">${message}</p>
      </div>
    `;
    document.body.appendChild(toastElem);
    setTimeout(() => {
      toastElem.remove();
    }, 4500);
  };

  // State modifiers
  const handleFormSubmit = (data: LoanApplication) => {
    setEnquiries(prev => [data, ...prev]);
    setActiveEnquiry(data);
    
    // Add simulation notifications
    addAlert(
      'system',
      'Eligibility Engine',
      `Dynamic evaluation created for ${data.fullName}. File status: ${data.status.toUpperCase()}`
    );

    if (data.status === 'pre_approved') {
      addAlert(
        'sms',
        data.mobileNumber,
        `Dear Applicant, your pre-approval references are generated as ${data.id}. Limit evaluated at ₹${data.estimatedEligibility.toLocaleString('en-IN')}. Verify on app.`
      );
      setView('result');
    } else {
      addAlert(
        'email',
        data.emailId,
        `Notice regarding soft application assessment APP-${data.id}. Debt consolidation options inside.`
      );
      setView('result');
    }
  };

  const handlePaymentSuccess = (method: 'Card' | 'UPI' | 'NetBanking', transactionId: string) => {
    if (!activeEnquiry) return;

    const updatedEnquiry: LoanApplication = {
      ...activeEnquiry,
      paymentStatus: 'paid',
      paymentDetails: {
        transactionId,
        amount: 499,
        method,
        paidAt: new Date().toISOString()
      }
    };

    // Replace in general stack
    setEnquiries(prev => prev.map(e => e.id === activeEnquiry.id ? updatedEnquiry : e));
    setActiveEnquiry(updatedEnquiry);
    setIsUnlocked(true);

    addAlert(
      'system',
      'Finance Portal',
      `Payment confirmation verified for reference ${activeEnquiry.id}. Sandbox Txn ID: ${transactionId}`
    );

    addAlert(
      'email',
      activeEnquiry.emailId,
      `Payment Invoice Received (₹499.00). Mapped DSA logins list released. Transmitting credentials.`
    );

    addAlert(
      'whatsapp',
      activeEnquiry.mobileNumber,
      `✅ LendFlow Premium Unlocked! Direct partner portals ICICI Bank and Tata Capital are active. Utilize code: DSA-TC-08812 during direct login.`
    );

    setView('dashboard');
  };

  // Partner DSA manager CRUD helpers
  const handleAddPartner = (partner: BankPartner) => {
    setPartners(prev => [...prev, partner]);
    addAlert(
      'system',
      'Router Config',
      `Manually indexed new Bank Partner: ${partner.name}. Target DSA: ${partner.dsaCode}.`
    );
  };

  const handleUpdatePartner = (updated: BankPartner) => {
    setPartners(prev => prev.map(p => p.id === updated.id ? updated : p));
    addAlert(
      'system',
      'Router Config',
      `DSA node configuration updated for ${updated.name}. New criteria set.`
    );
  };

  const handleCleanDeletePartner = (id: string) => {
    const deletedName = partners.find(p => p.id === id)?.name || id;
    setPartners(prev => prev.filter(p => p.id !== id));
    addAlert(
      'system',
      'Router Config',
      `Disabled DSA match connection for ${deletedName}`
    );
  };

  return (
    <div className="bg-[#0f172a] text-slate-100 min-h-screen font-sans antialiased relative">
      
      {/* Visual Navigation Bar */}
      <Navbar
        currentView={currentView}
        setView={(v) => {
          setView(v);
          // Auto scroll to page top on transition
          window.scrollTo({ top: 0 });
        }}
        isUnlocked={isUnlocked}
        isAdminLoggedIn={isAdminLoggedIn}
        onAdminLogout={() => {
          setIsAdminLoggedIn(false);
          addAlert('system', 'Security', 'Administrator session terminated.');
        }}
      />

      {/* Dynamic Views Controller Panel */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <div key="home">
              <Hero setView={setView} setCategory={setCategory} />
            </div>
          )}

          {currentView === 'categories' && (
            <div key="categories">
              <Categories setView={setView} setCategory={setCategory} />
            </div>
          )}

          {currentView === 'apply' && (
            <div key="apply">
              <EnquiryForm 
                initialCategory={selectedCategory} 
                onFormSubmit={handleFormSubmit} 
              />
            </div>
          )}

          {currentView === 'result' && activeEnquiry && (
            <div key="result">
              <PreApprovalResult
                application={activeEnquiry}
                onProceedToUnlock={() => setView('unlock')}
                onRecalculate={() => setView('apply')}
              />
            </div>
          )}

          {currentView === 'unlock' && activeEnquiry && (
            <div key="unlock">
              <PaymentUnlock
                application={activeEnquiry}
                onPaymentSuccess={handlePaymentSuccess}
                onCancel={() => setView('result')}
              />
            </div>
          )}

          {currentView === 'dashboard' && activeEnquiry && (
            <div key="dashboard">
              <UnlockedBancos
                application={activeEnquiry}
                onBackToHome={() => {
                  setView('home');
                }}
              />
            </div>
          )}

          {currentView === 'admin' && (
            <div key="admin">
              <AdminPanel
                enquiries={enquiries}
                partners={partners}
                onAddPartner={handleAddPartner}
                onUpdatePartner={handleUpdatePartner}
                onDeletePartner={handleCleanDeletePartner}
                isAdminLoggedIn={isAdminLoggedIn}
                onAdminLogin={() => {
                  setIsAdminLoggedIn(true);
                  addAlert('system', 'Security', 'Administrator session approved.');
                }}
                onAdminLogout={() => setIsAdminLoggedIn(false)}
              />
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Interactive Trigger for Simulated Notification logs */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            setShowNotificationPanel(!showNotificationPanel);
            setUnreadAlerts(0);
          }}
          className="relative bg-[#1e293b] hover:bg-slate-800 text-blue-400 p-4 rounded-full shadow-2xl border border-blue-500/25 flex items-center justify-center transition-all focus:outline-none"
        >
          <Bell className="w-6 h-6 animate-pulse" />
          {unreadAlerts > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900">
              {unreadAlerts}
            </span>
          )}
        </button>
      </div>

      {/* Floating Notifications drawer simulation panel */}
      <AnimatePresence>
        {showNotificationPanel && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 bg-[#0a0f1d] border border-blue-500/20 rounded-2xl shadow-2xl overflow-hidden z-40 max-w-[calc(100vw-32px)]"
          >
            <div className="p-4 bg-gradient-to-r from-blue-950 to-[#0b1329] border-b border-indigo-950/60 flex justify-between items-center">
              <div>
                <h4 className="text-sm font-black text-white">LendFlow Automation Logs</h4>
                <p className="text-[10px] text-slate-400">Review SMS, Email & WhatsApp mock deliveries</p>
              </div>
              <button
                onClick={() => setShowNotificationPanel(false)}
                className="text-slate-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 max-h-[350px] overflow-y-auto space-y-3 scrollbar-thin">
              {alerts.map((al) => (
                <div
                  key={al.id}
                  className="p-3 bg-slate-950 rounded-xl border border-indigo-950/40 space-y-1.5"
                >
                  <div className="flex justify-between items-center text-[10px] uppercase font-mono">
                    <span className={`px-1.5 py-0.5 rounded font-black ${
                      al.type === 'sms' ? 'bg-indigo-500/10 text-indigo-400' :
                      al.type === 'whatsapp' ? 'bg-emerald-500/10 text-emerald-400' :
                      al.type === 'email' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-slate-900 text-slate-400'
                    }`}>
                      {al.type}
                    </span>
                    <span className="text-slate-500">{al.timestamp}</span>
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-400 block text-[9px] uppercase font-mono tracking-wider">Target: {al.target}</p>
                    <p className="text-slate-200 mt-1 leading-relaxed">{al.message}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-950 text-center border-t border-indigo-950/50 text-[9px] text-slate-500 font-mono">
              Transactional outputs are logged in real-time.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
