import React from 'react';
import { AppRoute } from '../types';
import { VENDOR_DETAILS } from '../data/vendor';
import { TradewindsAwardableBadge } from './TradewindsAwardableBadge';
import { ShieldCheck, FileText, CheckCircle2, Terminal, Scale, Mail, Printer, ExternalLink, Box, Cpu } from 'lucide-react';

interface NavbarProps {
  currentRoute: AppRoute;
  setRoute: (route: AppRoute) => void;
  onOpenQuote: () => void;
  onPrint: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, setRoute, onOpenQuote, onPrint }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-40 shadow-lg">
      {/* Top Banner: Government Procurement Notice */}
      <div className="bg-slate-950 px-4 py-1.5 border-b border-slate-800/80 text-xs flex flex-wrap items-center justify-between gap-2 text-slate-400">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            {VENDOR_DETAILS.tradewindsStatus}
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span>UEI: <strong className="text-slate-200 font-mono">{VENDOR_DETAILS.uei}</strong></span>
          <span className="text-slate-600">•</span>
          <span>CAGE: <strong className="text-slate-200 font-mono">{VENDOR_DETAILS.cage}</strong></span>
          <span className="hidden md:inline text-slate-600">•</span>
          <span className="hidden md:inline text-slate-300">Package: <strong>{VENDOR_DETAILS.packageVersion}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrint}
            className="hover:text-amber-300 text-slate-300 transition-colors flex items-center gap-1 px-2 py-0.5 rounded border border-slate-700 bg-slate-800/60"
            title="Print Government Evaluation Summary"
          >
            <Printer className="w-3 h-3 text-amber-400" />
            <span>Print Summary</span>
          </button>
          <button
            onClick={onOpenQuote}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-2.5 py-0.5 rounded transition-all flex items-center gap-1 shadow-sm text-[11px]"
          >
            <Mail className="w-3 h-3" />
            Request Quote ($14,500)
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Package Title */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setRoute('micro-purchase')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="shrink-0 p-0.5 rounded-full bg-slate-950 border border-slate-700 group-hover:border-slate-500 transition-colors">
                <TradewindsAwardableBadge size={38} theme="dark" />
              </div>
              <div>
                <div className="font-bold text-slate-100 text-sm tracking-tight flex items-center gap-2">
                  VEK-7 Conformance Demonstrator
                  <span className="text-[10px] bg-slate-800 text-amber-400 font-mono px-1.5 py-0.5 rounded border border-amber-500/30">
                    v{VENDOR_DETAILS.packageVersion}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  Tradewinds Awardable Solution | Fixed-Price Software Evaluation
                </div>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setRoute('micro-purchase')}
              className={`px-3 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                currentRoute === 'micro-purchase' || currentRoute === 'tradewinds'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Micro-Purchase Landing
            </button>

            <button
              onClick={() => setRoute('vectors')}
              className={`px-3 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                currentRoute === 'vectors'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Vector Runner (33)
            </button>

            <button
              onClick={() => setRoute('fpga')}
              className={`px-3 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                currentRoute === 'fpga'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              FPGA Hardware
            </button>

            <button
              onClick={() => setRoute('claims')}
              className={`px-3 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                currentRoute === 'claims'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Claims Matrix
            </button>

            <button
              onClick={() => setRoute('deliverables')}
              className={`px-3 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                currentRoute === 'deliverables'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              6 Deliverables
            </button>

            <button
              onClick={() => setRoute('license')}
              className={`px-3 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                currentRoute === 'license'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              License & Terms
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="md:hidden flex border-t border-slate-800 bg-slate-950 overflow-x-auto text-[11px] p-1 gap-1">
        <button
          onClick={() => setRoute('micro-purchase')}
          className={`flex-1 min-w-[90px] py-1.5 px-2 rounded text-center whitespace-nowrap ${
            currentRoute === 'micro-purchase' || currentRoute === 'tradewinds' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
          }`}
        >
          Landing
        </button>
        <button
          onClick={() => setRoute('vectors')}
          className={`flex-1 min-w-[90px] py-1.5 px-2 rounded text-center whitespace-nowrap ${
            currentRoute === 'vectors' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
          }`}
        >
          33 Vectors
        </button>
        <button
          onClick={() => setRoute('fpga')}
          className={`flex-1 min-w-[90px] py-1.5 px-2 rounded text-center whitespace-nowrap ${
            currentRoute === 'fpga' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
          }`}
        >
          FPGA Demo
        </button>
        <button
          onClick={() => setRoute('claims')}
          className={`flex-1 min-w-[90px] py-1.5 px-2 rounded text-center whitespace-nowrap ${
            currentRoute === 'claims' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
          }`}
        >
          Claims
        </button>
        <button
          onClick={() => setRoute('deliverables')}
          className={`flex-1 min-w-[90px] py-1.5 px-2 rounded text-center whitespace-nowrap ${
            currentRoute === 'deliverables' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
          }`}
        >
          Deliverables
        </button>
        <button
          onClick={() => setRoute('license')}
          className={`flex-1 min-w-[90px] py-1.5 px-2 rounded text-center whitespace-nowrap ${
            currentRoute === 'license' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
          }`}
        >
          License
        </button>
      </div>
    </header>
  );
};

