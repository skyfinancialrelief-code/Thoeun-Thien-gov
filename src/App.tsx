import React, { useState, useEffect } from 'react';
import { AppRoute } from './types';
import { Navbar } from './components/Navbar';
import { MicroPurchasePage } from './components/MicroPurchasePage';
import { VectorRunner } from './components/VectorRunner';
import { FpgaView } from './components/FpgaView';
import { ClaimsMatrix } from './components/ClaimsMatrix';
import { DeliverablesView } from './components/DeliverablesView';
import { LicenseView } from './components/LicenseView';
import { QuoteModal } from './components/QuoteModal';
import { PrintSummary } from './components/PrintSummary';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('micro-purchase');
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);
  const [isPrintOpen, setIsPrintOpen] = useState<boolean>(false);

  // Sync route with window pathname or location hash on load
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase().replace('#', '');

      if (path.includes('tradewinds') || path.includes('micro-purchase') || hash === 'tradewinds' || hash === 'micro-purchase') {
        setCurrentRoute('micro-purchase');
      } else if (path.includes('vectors') || hash === 'vectors') {
        setCurrentRoute('vectors');
      } else if (path.includes('fpga') || hash === 'fpga') {
        setCurrentRoute('fpga');
      } else if (path.includes('claims') || hash === 'claims') {
        setCurrentRoute('claims');
      } else if (path.includes('deliverables') || hash === 'deliverables') {
        setCurrentRoute('deliverables');
      } else if (path.includes('license') || hash === 'license') {
        setCurrentRoute('license');
      } else {
        // Default route is micro-purchase
        setCurrentRoute('micro-purchase');
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const changeRoute = (route: AppRoute) => {
    setCurrentRoute(route);
    window.location.hash = route === 'micro-purchase' ? 'micro-purchase' : route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* Navigation Header */}
      <Navbar
        currentRoute={currentRoute}
        setRoute={changeRoute}
        onOpenQuote={() => setIsQuoteOpen(true)}
        onPrint={() => setIsPrintOpen(true)}
      />

      {/* Main Content Router */}
      <main className="animate-fadeIn">
        {(currentRoute === 'micro-purchase' || currentRoute === 'tradewinds') && (
          <MicroPurchasePage
            setRoute={changeRoute}
            onOpenQuote={() => setIsQuoteOpen(true)}
            onPrint={() => setIsPrintOpen(true)}
          />
        )}

        {currentRoute === 'vectors' && <VectorRunner />}
        {currentRoute === 'fpga' && <FpgaView onOpenQuote={() => setIsQuoteOpen(true)} />}
        {currentRoute === 'claims' && <ClaimsMatrix />}
        {currentRoute === 'deliverables' && <DeliverablesView />}
        {currentRoute === 'license' && <LicenseView />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 text-slate-500 text-xs text-center space-y-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <strong>VEK-7 Conformance Demonstrator v0.1.0</strong> • Tradewinds Awardable
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            UEI: FQJUJKVKSAS3 | CAGE: 1ZMG9 | Fixed Price: $14,500
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />

      {isPrintOpen && (
        <PrintSummary onClose={() => setIsPrintOpen(false)} />
      )}
    </div>
  );
}

