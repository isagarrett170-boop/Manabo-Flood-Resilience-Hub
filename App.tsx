import React, { useState } from 'react';
import { LayoutDashboard, MessageSquareText, Info, Menu, X, Map } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Advisor from './components/Advisor';
import About from './components/About';
import MapsGallery from './components/MapsGallery';
import { TabView } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabView>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Risk Dashboard', icon: LayoutDashboard },
    { id: 'maps', label: 'Digital Atlas', icon: Map },
    { id: 'advisor', label: 'AI Advisor', icon: MessageSquareText },
    { id: 'about', label: 'Thesis Info', icon: Info },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'maps': return <MapsGallery />;
      case 'advisor': return <Advisor />;
      case 'about': return <About />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
                    M
                </div>
                <div>
                    <h1 className="text-lg font-bold text-slate-800 leading-tight">Manabo Resilience</h1>
                    <p className="text-xs text-slate-500">Flood Risk Index System</p>
                </div>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as TabView)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => {
               const Icon = item.icon;
               const isActive = activeTab === item.id;
               return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as TabView);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-medium ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-slate-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
               );
            })}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-400">
            © 2025 Manabo Flood Risk Mapping Project. Based on the Thesis by Benedito et al.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;