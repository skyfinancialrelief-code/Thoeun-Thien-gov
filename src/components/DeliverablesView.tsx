import React from 'react';
import { DELIVERABLES_DATA } from '../data/deliverables';
import { VENDOR_DETAILS } from '../data/vendor';
import { TradewindsAwardableBadge } from './TradewindsAwardableBadge';
import { Box, CheckCircle2, ShieldCheck, FileText, Lock, FileCode, Layers, DollarSign } from 'lucide-react';

export const DeliverablesView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <TradewindsAwardableBadge size={60} theme="dark" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Box className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-bold text-white">
                Six (6) Government Deliverables Specification
              </h2>
            </div>
            <p className="text-xs text-slate-300">
              Fixed-Price Evaluation Package: <strong className="text-amber-300 font-mono">{VENDOR_DETAILS.fixedPrice}</strong> • UEI: <strong className="font-mono text-slate-200">{VENDOR_DETAILS.uei}</strong> • CAGE: <strong className="font-mono text-slate-200">{VENDOR_DETAILS.cage}</strong>
            </p>
          </div>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
          {VENDOR_DETAILS.tradewindsStatus}
        </span>
      </div>

      {/* Deliverable Cards */}
      <div className="space-y-6">
        {DELIVERABLES_DATA.map((d) => (
          <div 
            key={d.id} 
            className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4 shadow-sm hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold text-sm flex items-center justify-center">
                  #{d.id}
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">{d.title}</h3>
                  <div className="text-xs text-amber-400/90 font-medium">{d.subtitle}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded border border-amber-500/40">
                  {VENDOR_DETAILS.priceAllocations.find(p => p.deliverableId === d.id)?.amount}
                </span>
                <span className="text-xs font-mono bg-slate-800 text-slate-300 px-3 py-1 rounded border border-slate-700">
                  Deliverable {d.id} of 6
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {d.summary}
            </p>

            {/* Scope Bullets */}
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Detailed Scope Components:
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                {d.scope.map((item, idx) => (
                  <li key={idx} className="leading-normal">{item}</li>
                ))}
              </ul>
            </div>

            {/* Acceptance Criteria & Data Rights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
              <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/80">
                <strong className="text-slate-200 block mb-1">Acceptance Verification:</strong>
                <span className="text-slate-300">{d.acceptanceCriteria}</span>
              </div>
              <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/80">
                <strong className="text-slate-200 block mb-1">Government Data Rights Clause:</strong>
                <span className="text-slate-300">{d.dataRights}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
