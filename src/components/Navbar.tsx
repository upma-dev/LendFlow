import React from 'react';
import { ViewState } from '../types';
import { ShieldCheck, LayoutDashboard, Compass, CreditCard, ChevronRight, Menu, X } from 'lucide-react';

const logoImg = "/public/logo.png"; // Ensure this path is correct based on your project structure

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isUnlocked: boolean;
  onAdminLogout: () => void;
  isAdminLoggedIn: boolean;
}

export default function Navbar({
  currentView,
  setView,
  isUnlocked,
  onAdminLogout,
  isAdminLoggedIn
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'Home', view: 'home' as ViewState, icon: Compass },
    { label: 'Loan Categories', view: 'categories' as ViewState, icon: ShieldCheck },
    { label: 'Calculate & Apply', view: 'apply' as ViewState, icon: CreditCard }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0b1329] border-b border-indigo-950/40 text-white shadow-xl backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => { setView('home'); setMobileMenuOpen(false); }}
          >
            <div className="relative w-12 h-12 overflow-hidden rounded-xl border border-blue-500/30 flex items-center justify-center bg-slate-900 group-hover:border-blue-400 transition-all">
              <img 
                src={logoImg} 
                className="w-full h-full object-cover" 
                alt="Fintech Logo" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback to stylized SVG if asset has trouble resolving
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent pointer-events-none" />
            </div>
            <div>
              <span className="font-sans font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-400 via-indigo-200 to-white bg-clip-text text-transparent">
                LendFLOW
              </span>
              <p className="font-mono text-[9px] text-blue-400 uppercase tracking-widest -mt-1">Lead & Pre-Approval</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.view || 
                               (item.view === 'apply' && ['result', 'unlock', 'dashboard'].includes(currentView));
              return (
                <button
                  key={item.view}
                  onClick={() => setView(item.view)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                      : 'text-indigo-200 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop Right Hand Action */}
          <div className="hidden md:flex items-center space-x-3">
            {isAdminLoggedIn ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setView('admin')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-900/50 text-indigo-200 hover:text-white border border-indigo-700/50 transition-all ${
                    currentView === 'admin' ? 'ring-2 ring-indigo-500' : ''
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Admin Console</span>
                </button>
                <button
                  onClick={onAdminLogout}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-red-400 hover:bg-red-950/10 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setView('admin')}
                className="flex items-center space-x-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-indigo-300 hover:text-indigo-100 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              >
                <span>Admin Login</span>
              </button>
            )}

            <button
              onClick={() => setView('apply')}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-xl shadow-blue-900/30 flex items-center space-x-1.5 transition-all active:scale-95"
            >
              <span>Instant Check</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setView('admin')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-950/60 border border-indigo-900/50 text-indigo-300"
            >
              Admin
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-indigo-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0f1d] border-t border-indigo-950 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => {
                  setView(item.view);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-indigo-200 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-4 border-t border-indigo-950 space-y-2">
            {isAdminLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    setView('admin');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-semibold bg-indigo-950 text-white"
                >
                  Admin Console
                </button>
                <button
                  onClick={() => {
                    onAdminLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 rounded-xl text-sm text-red-400"
                >
                  Logout Admin
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setView('admin');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2 text-sm text-slate-400"
              >
                Admin Gateway
              </button>
            )}
            
            <button
              onClick={() => {
                setView('apply');
                setMobileMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-3 rounded-xl font-bold text-sm shadow-lg"
            >
              Get Pre-Approved Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
