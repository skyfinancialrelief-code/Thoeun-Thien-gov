import React from 'react';
import { AppRoute } from '../types';
import { VENDOR_DETAILS } from '../data/vendor';
import { DELIVERABLES_DATA } from '../data/deliverables';
import { CLAIMS_MATRIX_DATA } from '../data/claims';
import { TradewindsAwardableBadge } from './TradewindsAwardableBadge';
import { 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Mail, 
  Printer, 
  Terminal, 
  ArrowRight,
  AlertTriangle, 
  BadgeCheck, 
  Lock, 
  Scale, 
  HelpCircle,
  Building2,
  Box,
  Copy,
  ExternalLink
} from 'lucide-react';

interface MicroPurchasePageProps {
  setRoute: (route: AppRoute) => void;
  onOpenQuote: () => void;
  onPrint: () => void;
}

export const MicroPurchasePage: React.FC<MicroPurchasePageProps> = ({ setRoute, onOpenQuote, onPrint }) => {
  const [copiedUei, setCopiedUei] = React.useState(false);
  const [copiedCage, setCopiedCage] = React.useState(false);

  const copyToClipboard = (text: string, type: 'uei' | 'cage') => {
    navigator.clipboard.writeText(text);
    if (type === 'uei') {
      setCopiedUei(true);
      setTimeout(() => setCopiedUei(false), 2000);
    } else {
      setCopiedCage(true);
      setTimeout(() => setCopiedCage(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      {/* Top Hero Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800 pt-10 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Status Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold px-3 py-1 rounded-full text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {VENDOR_DETAILS.tradewindsStatus}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold px-3 py-1 rounded-full text-xs">
              <BadgeCheck className="w-4 h-4 text-amber-400" />
              Fixed-Price Evaluation Package: {VENDOR_DETAILS.fixedPrice}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-800 text-slate-300 border border-slate-700 font-mono px-3 py-1 rounded-full text-xs">
              Package Version: {VENDOR_DETAILS.packageVersion}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Title & Overview */}
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                VEK-7 Conformance Demonstrator
                <span className="block text-amber-400 text-2xl sm:text-3xl mt-1 font-semibold">
                  $14,500 Fixed-Price Government Evaluation Package
                </span>
              </h1>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                A standardized, air-gapped technical verification and evidence package engineered for federal Contracting Officers and Defense Technical Evaluators. Designed specifically for rapid procurement under Tradewinds Awardable status.
              </p>

              {/* Contracting Officer Purchasing Notice */}
              <div className="bg-slate-900/90 border-l-4 border-amber-500 rounded-r-lg p-4 mb-8 border border-slate-800 shadow-md">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-amber-300 text-xs uppercase tracking-wider mb-1">
                      Purchasing & Micro-Purchase Notice
                    </h3>
                    <p className="text-xs text-slate-300 leading-normal">
                      Proposed fixed-price evaluation: $14,500. The purchasing office determines whether the acquisition qualifies for micro-purchase procedures and which acquisition method applies.
                    </p>
                  </div>
                </div>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenQuote}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-3 rounded-lg shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Request Official Quote ($14,500)
                </button>

                <button
                  onClick={onPrint}
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold px-4 py-3 rounded-lg transition-all flex items-center gap-2 text-sm"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  Print Evaluation Summary
                </button>

                <button
                  onClick={() => setRoute('vectors')}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-medium px-4 py-3 rounded-lg transition-all flex items-center gap-2 text-sm"
                >
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Launch Vector Suite (33/33)
                </button>
              </div>
            </div>

            {/* Vendor Identification Card */}
            <div className="lg:col-span-4 bg-slate-900 rounded-xl p-5 border border-slate-800 shadow-xl space-y-4">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  Government Contracting Info
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-mono">
                  SAM.gov Active
                </span>
              </div>

              {/* CDAO Tradewinds Seal */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col items-center justify-center text-center space-y-2">
                <TradewindsAwardableBadge size={110} theme="dark" />
                <div className="text-xs font-bold text-slate-200 tracking-wide uppercase mt-1">
                  DoD CDAO Tradewinds Awardable
                </div>
                <div className="text-[10px] text-slate-400 max-w-[220px]">
                  Assessed & Certified for Direct Government Micro-Purchase Execution
                </div>
              </div>

              {/* UEI */}
              <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded border border-slate-800">
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">Unique Entity ID (UEI)</div>
                  <div className="font-mono text-sm font-bold text-amber-300">{VENDOR_DETAILS.uei}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(VENDOR_DETAILS.uei, 'uei')}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded flex items-center gap-1 transition-colors"
                  title="Copy UEI"
                >
                  <Copy className="w-3 h-3" />
                  {copiedUei ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {/* CAGE Code */}
              <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded border border-slate-800">
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">CAGE Code</div>
                  <div className="font-mono text-sm font-bold text-amber-300">{VENDOR_DETAILS.cage}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(VENDOR_DETAILS.cage, 'cage')}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded flex items-center gap-1 transition-colors"
                  title="Copy CAGE"
                >
                  <Copy className="w-3 h-3" />
                  {copiedCage ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {/* Contact Email */}
              <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                <div className="text-[10px] text-slate-400 font-medium">Point of Contact / Quotations</div>
                <button 
                  onClick={onOpenQuote}
                  className="text-xs font-mono text-amber-400 hover:underline break-all text-left block mt-0.5 flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span>{VENDOR_DETAILS.contactEmail}</span>
                </button>
              </div>

              {/* Tradewinds Marketplace Quick Note */}
              <div className="text-[11px] text-slate-300 bg-slate-950 p-3 rounded border border-amber-500/30 leading-relaxed">
                <strong className="text-amber-400 block font-semibold mb-0.5">Tradewinds Solution Awardable Assessment:</strong>
                {VENDOR_DETAILS.tradewindsNote}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">

        {/* Section 1: The 6 Clearly Defined Deliverables & Price Allocation */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Box className="w-5 h-5 text-amber-400" />
                Six (6) Deliverables & Itemized Price Allocation ($14,500 Total)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Fixed-price breakdown for the VEK-7 Conformance Demonstrator software evaluation package.
              </p>
            </div>
            <button
              onClick={() => setRoute('deliverables')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              Full Deliverable Specs
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Itemized Price Table / Schedule */}
          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 shadow-lg">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
              <BadgeCheck className="w-4 h-4" />
              Itemized Quotation Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/60">
                    <th className="py-2.5 px-3">Del #</th>
                    <th className="py-2.5 px-3">Item Description</th>
                    <th className="py-2.5 px-3 text-right">Fixed Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {VENDOR_DETAILS.priceAllocations.map((alloc) => (
                    <tr key={alloc.deliverableId} className="hover:bg-slate-950/40">
                      <td className="py-2 px-3 font-mono text-amber-400 font-bold">#{alloc.deliverableId}</td>
                      <td className="py-2 px-3 font-medium text-slate-200">{alloc.itemTitle}</td>
                      <td className="py-2 px-3 font-mono font-bold text-emerald-400 text-right">{alloc.amount}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-700 bg-slate-950 font-bold text-white text-xs">
                    <td colSpan={2} className="py-3 px-3 uppercase tracking-wider text-amber-300">Total Fixed-Price Evaluation Package</td>
                    <td className="py-3 px-3 font-mono text-emerald-400 text-right text-sm">{VENDOR_DETAILS.fixedPrice}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DELIVERABLES_DATA.map((d) => (
              <div 
                key={d.id} 
                className="bg-slate-900 rounded-xl p-5 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold text-xs flex items-center justify-center">
                      #{d.id}
                    </span>
                    <span className="text-[10px] bg-slate-800 text-amber-300 font-bold px-2 py-0.5 rounded font-mono border border-slate-700">
                      {VENDOR_DETAILS.priceAllocations.find(p => p.deliverableId === d.id)?.amount}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm mb-1">{d.title}</h3>
                  <div className="text-[11px] text-amber-400/90 font-medium mb-2">{d.subtitle}</div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{d.summary}</p>
                </div>

                <div className="border-t border-slate-800/80 pt-3 mt-2 text-[11px] text-slate-400 space-y-1">
                  <div><strong className="text-slate-300">Data Rights:</strong> {d.dataRights}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Technical Conformance Summary & Honest Architectural Scope */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Technical Conformance Engine Status
              </span>
              <h2 className="text-2xl font-extrabold text-white">
                33 Deterministic Vectors Verified in Reference Engine
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                33 deterministic vectors: 10 successful transitions, 10 typed halts, 8 U64 boundary cases, and 5 canonicalization rejection cases.
              </p>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">TypeScript Reference Engine Execution</span>
                  <span className="text-emerald-400 font-bold font-mono bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    VERIFIED (33/33 PASS)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Rust & WebAssembly Integration</span>
                  <span className="text-amber-400 font-bold font-mono bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                    ADAPTER ONLY
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setRoute('vectors')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded text-xs transition-colors flex items-center gap-1.5"
                >
                  <Terminal className="w-4 h-4" />
                  Run Live Vector Suite (33/33)
                </button>
                <button
                  onClick={() => setRoute('claims')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-4 py-2 rounded text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  Inspect Claims Matrix
                </button>
              </div>
            </div>

            {/* Honest Architectural Classification Callout */}
            <div className="lg:col-span-5 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                Honest Architectural Disclosures
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                In strict compliance with evaluation standards, the repository discloses:
              </p>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li>
                  <strong className="text-slate-100">TypeScript Engine:</strong> Evaluation-ready reference implementation with 33 deterministic test vectors.
                </li>
                <li>
                  <strong className="text-slate-100">Rust & WASM:</strong> Honestly classified as <span className="text-amber-400 font-semibold">ADAPTER ONLY</span> bindings rather than parallel native engines.
                </li>
                <li>
                  <strong className="text-slate-100">Cryptographic Hash Chaining:</strong> SHA-256 commitments form a deterministic tamper-evident chain. Cryptographic assurance remains subject to the security assumptions of SHA-256 and the deployment’s storage and anchoring controls.
                </li>
                <li>
                  <strong className="text-slate-100">JSON Canonicalization:</strong> VEK Canonical JSON Profile with deterministic key ordering, UTF-8 encoding, integer-only schema fields, and rejection of noncanonical values.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Rectified Claims Matrix Overview */}
        <section>
          <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-400" />
                Rectified CLAIMS-MATRIX (Commit 00764ef)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Summary of claim precision updates made in CLAIMS-MATRIX.md.
              </p>
            </div>
            <button
              onClick={() => setRoute('claims')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              Full Claims Matrix
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CLAIMS_MATRIX_DATA.slice(0, 4).map((claim) => (
              <div key={claim.id} className="bg-slate-900 rounded-xl p-5 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    {claim.id}
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-mono">
                    {claim.status}
                  </span>
                </div>
                <h3 className="font-bold text-slate-100 text-sm">{claim.claimTitle}</h3>
                
                {claim.previousText && (
                  <div className="text-[11px] bg-rose-950/40 border border-rose-800/40 p-2.5 rounded text-rose-300/90">
                    <strong className="text-rose-200">Superseded Statement:</strong> "{claim.previousText}"
                  </div>
                )}

                <div className="text-[11px] bg-emerald-950/40 border border-emerald-800/40 p-2.5 rounded text-emerald-200">
                  <strong className="text-emerald-300">Rectified Technical Statement:</strong> "{claim.correctedText}"
                </div>

                <div className="text-[11px] text-slate-400 pt-1">
                  <strong className="text-slate-300">Evidence:</strong> {claim.evidence}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: License, Data Rights & Delivery Terms */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-400" />
              Licensing, Terms & Quotation Schedule
            </h2>
            <button
              onClick={() => setRoute('license')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              Full License Document
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-slate-300">
            {/* License and Data Rights */}
            <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm text-amber-300 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                License and Data Rights Policy
              </h3>
              <p className="leading-relaxed">
                <strong>License and Data Rights:</strong> Government rights in software, documentation, technical data, and evaluation artifacts are determined solely by the final written order and incorporated license. No additional rights are granted by this webpage. Guts Deterministic Technology LLC retains all preexisting intellectual-property and patent rights.
              </p>
              <div className="pt-2 text-[11px] text-amber-200/90 bg-amber-500/10 p-2.5 rounded border border-amber-500/20">
                <strong className="text-amber-300">Source Code Delivery Protection:</strong> {VENDOR_DETAILS.sourceCodeProtection}
              </div>
            </div>

            {/* Quotation Schedule & Terms */}
            <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm text-amber-300 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Quotation Schedule & Support Period
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 font-medium">Quote Expiration:</span>{' '}
                  <strong className="text-slate-200">{VENDOR_DETAILS.quoteExpiration}</strong>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Delivery Schedule:</span>{' '}
                  <strong className="text-slate-200">{VENDOR_DETAILS.deliverySchedule}</strong>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Accepted Payment Methods:</span>{' '}
                  <strong className="text-slate-200">{VENDOR_DETAILS.paymentMethod}</strong>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Evaluator Support Period:</span>{' '}
                  <strong className="text-slate-200">{VENDOR_DETAILS.supportPeriod}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Explicit Package Exclusions Box */}
          <div className="bg-slate-950 p-4 rounded-lg border border-rose-900/40 text-xs text-slate-300 space-y-1">
            <div className="font-bold text-rose-300 uppercase tracking-wider text-[11px]">
              Explicit Package Scope Exclusions
            </div>
            <p className="text-slate-400 leading-relaxed">
              {VENDOR_DETAILS.packageExclusions}
            </p>
          </div>
        </section>

        {/* Bottom Procurement Quick Quote Box */}
        <section className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-slate-900 border border-amber-500/30 rounded-xl p-6 text-center space-y-4 shadow-lg">
          <h2 className="text-xl font-extrabold text-white">
            Procurement-Support Packet Prepared for Review
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Procurement-support packet prepared for review by an authorized purchaser or contracting activity. Provide your contracting officer with UEI (<strong className="text-amber-300 font-mono">FQJUJKVKSAS3</strong>) and CAGE Code (<strong className="text-amber-300 font-mono">1ZMG9</strong>).
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenQuote}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-lg shadow-md transition-all flex items-center gap-2 text-sm"
            >
              <Mail className="w-4 h-4" />
              Generate Quotation Request
            </button>
            <button
              onClick={onPrint}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-5 py-3 rounded-lg transition-all flex items-center gap-2 text-sm"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              Print Evaluator Summary
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
