import React from 'react';
import { VENDOR_DETAILS } from '../data/vendor';
import { DELIVERABLES_DATA } from '../data/deliverables';
import { CLAIMS_MATRIX_DATA } from '../data/claims';
import { TradewindsAwardableBadge } from './TradewindsAwardableBadge';
import { Printer, X, ShieldCheck, CheckCircle2, FileText, Building2 } from 'lucide-react';

interface PrintSummaryProps {
  onClose: () => void;
}

export const PrintSummary: React.FC<PrintSummaryProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 overflow-y-auto p-4 sm:p-8 text-slate-900">
      {/* Floating Action Bar (Hidden when printing) */}
      <div className="print:hidden max-w-4xl mx-auto mb-6 flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-xl text-slate-100 shadow-xl">
        <div className="flex items-center gap-2">
          <Printer className="w-5 h-5 text-amber-400" />
          <span className="font-bold text-sm">Government Procurement Fact Sheet (Print View)</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded text-xs transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            Print Document
          </button>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-3 py-2 rounded text-xs transition-colors"
          >
            Close Print View
          </button>
        </div>
      </div>

      {/* Printable Paper Container */}
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-lg shadow-2xl space-y-8 font-sans border border-slate-200 text-slate-900">
        
        {/* Header */}
        <div className="border-b-2 border-slate-900 pb-6 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <TradewindsAwardableBadge size={90} theme="light" />
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                Government Procurement & Evaluation Document
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                VEK-7 Conformance Demonstrator v0.1.0
              </h1>
              <div className="text-sm font-bold text-amber-800 mt-1">
                $14,500 Fixed-Price Evaluation Package Summary
              </div>
            </div>
          </div>

          <div className="text-right text-xs space-y-1 shrink-0">
            <div className="inline-block bg-slate-100 border border-slate-300 px-3 py-1 font-bold text-slate-800 rounded">
              {VENDOR_DETAILS.tradewindsStatus}
            </div>
            <div className="font-mono text-slate-600">UEI: {VENDOR_DETAILS.uei}</div>
            <div className="font-mono text-slate-600">CAGE: {VENDOR_DETAILS.cage}</div>
          </div>
        </div>

        {/* Vendor & Purchasing Office Determination */}
        <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded border border-slate-200 text-xs">
          <div>
            <strong className="text-slate-900 block font-bold uppercase text-[10px] tracking-wider mb-1">Vendor Entity Identification</strong>
            <div className="font-bold text-slate-900">{VENDOR_DETAILS.legalEntityName}</div>
            <div>UEI: <span className="font-mono">{VENDOR_DETAILS.uei}</span> | CAGE: <span className="font-mono">{VENDOR_DETAILS.cage}</span></div>
            <div>Contact Email: {VENDOR_DETAILS.contactEmail}</div>
            <div>POC: {VENDOR_DETAILS.pocName}</div>
            <div className="mt-2 text-[11px] text-slate-700 bg-amber-50 p-2 rounded border border-amber-200">
              <strong className="text-amber-900 block font-semibold">Tradewinds Solution Awardable:</strong>
              {VENDOR_DETAILS.tradewindsNote}
            </div>
          </div>
          <div>
            <strong className="text-slate-900 block font-bold uppercase text-[10px] tracking-wider mb-1">Procurement Framework & Terms</strong>
            <div>Total Fixed Price: <strong className="text-slate-900">{VENDOR_DETAILS.fixedPrice}</strong></div>
            <div>FAR Authority: FAR Subpart 13.2 Micro-Purchase</div>
            <div>Quote Expiration: {VENDOR_DETAILS.quoteExpiration}</div>
            <div>Delivery Schedule: {VENDOR_DETAILS.deliverySchedule}</div>
            <div>Payment Methods: {VENDOR_DETAILS.paymentMethod}</div>
            <div>Support Period: {VENDOR_DETAILS.supportPeriod}</div>
          </div>
        </div>

        {/* Deliverables Table with Itemized Pricing */}
        <div className="space-y-3">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center justify-between">
            <span>6 Package Deliverables & Itemized Allocation</span>
            <span className="text-amber-800 font-mono font-bold">Total: {VENDOR_DETAILS.fixedPrice}</span>
          </h2>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 font-bold uppercase text-[10px] text-slate-700">
                <th className="p-2">#</th>
                <th className="p-2">Deliverable Title</th>
                <th className="p-2">Scope Summary</th>
                <th className="p-2 text-right">Fixed Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {DELIVERABLES_DATA.map((d) => (
                <tr key={d.id}>
                  <td className="p-2 font-bold font-mono text-amber-800">#{d.id}</td>
                  <td className="p-2 font-bold text-slate-900">{d.title}</td>
                  <td className="p-2 text-slate-700">{d.summary}</td>
                  <td className="p-2 text-right font-mono font-bold text-emerald-800">
                    {VENDOR_DETAILS.priceAllocations.find(p => p.deliverableId === d.id)?.amount}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-400">
                <td colSpan={3} className="p-2 uppercase text-[11px]">Total Package Value</td>
                <td className="p-2 text-right font-mono text-emerald-900">{VENDOR_DETAILS.fixedPrice}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Conformance Verification & Honest Architectural Classification */}
        <div className="space-y-3">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            Technical Conformance Verification (33/33 Report & Hashes Available)
          </h2>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="border border-slate-200 p-3 rounded bg-emerald-50/50">
              <strong className="text-emerald-900 block font-bold mb-1">TypeScript Reference Engine (33/33 PASS)</strong>
              <p className="text-slate-700 leading-snug">
                33 deterministic vectors verified: 10 successful transitions, 10 typed halts, 8 U64 boundary cases, and 5 canonicalization rejection cases. Full verification logs and reproducible SHA-256 state hashes are available for purchaser inspection.
              </p>
            </div>
            <div className="border border-slate-200 p-3 rounded bg-amber-50/50">
              <strong className="text-amber-900 block font-bold mb-1">Rust & WASM Classification</strong>
              <p className="text-slate-700 leading-snug">
                Honestly classified as ADAPTER ONLY wrappers for host integration rather than standalone parallel execution runtimes.
              </p>
            </div>
          </div>
        </div>

        {/* Source Code Delivery Protection & Exclusions */}
        <div className="border border-slate-200 p-3 rounded bg-slate-50 text-xs space-y-1">
          <div><strong className="text-slate-900">Source Code Delivery Terms:</strong> {VENDOR_DETAILS.sourceCodeProtection}</div>
          <div><strong className="text-slate-900">Explicit Package Exclusions:</strong> {VENDOR_DETAILS.packageExclusions}</div>
        </div>

        {/* Data Rights & Licensing Statement */}
        <div className="border-t border-slate-200 pt-4 text-[11px] text-slate-600 space-y-1">
          <div>
            <strong className="text-slate-800">License and Data Rights:</strong> Government rights in software, documentation, technical data, and evaluation artifacts are determined solely by the final written order and incorporated license. No additional rights are granted by this webpage. Guts Deterministic Technology LLC retains all preexisting intellectual-property and patent rights.
          </div>
          <div className="pt-2 text-[10px] text-slate-400 text-center uppercase tracking-widest font-mono">
            VEK-7 Conformance Demonstrator v0.1.0 • Tradewinds Awardable Solution Summary
          </div>
        </div>

      </div>
    </div>
  );
};
