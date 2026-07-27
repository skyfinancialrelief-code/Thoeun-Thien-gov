import React from 'react';
import { VENDOR_DETAILS } from '../data/vendor';
import { TradewindsAwardableBadge } from './TradewindsAwardableBadge';
import { Scale, ShieldCheck, Lock, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export const LicenseView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <TradewindsAwardableBadge size={60} theme="dark" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Scale className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-bold text-white">
                Proprietary Evaluation License & Patent Rights Reservation
              </h2>
            </div>
            <p className="text-xs text-slate-300">
              Governing legal terms for VEK-7 Conformance Demonstrator v0.1.0 distribution to United States Government agencies.
            </p>
          </div>
        </div>
      </div>

      {/* License Document Details */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-6">
        <div className="bg-amber-950/40 border border-amber-800/50 p-4 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-200/90 leading-relaxed">
            <strong className="text-amber-300 uppercase block mb-1">License Metadata Correction Notice:</strong>
            The LICENSE file in the repository root explicitly establishes the <span className="font-semibold text-white">Proprietary Evaluation License & Patent Rights Reservation</span>. Any third-party interface labeling (e.g. stale repository host tags) indicating generic MIT open-source terms is stale metadata and does not supersede the governing LICENSE file.
          </div>
        </div>

        {/* Core Terms */}
        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <section className="space-y-2 bg-slate-950 p-4 rounded-lg border border-slate-800">
            <h3 className="font-bold text-white text-sm text-amber-300">
              1. Grant of Evaluation Rights to Government Agencies
            </h3>
            <p>
              Subject to the terms herein, {VENDOR_DETAILS.companyName} grants to the United States Government, its departments, and defense agencies a non-exclusive, non-transferable evaluation license to compile, execute, and analyze the VEK-7 Conformance Demonstrator source code solely for internal government technical evaluation, micro-purchase testing, and Tradewinds assessment.
            </p>
          </section>

          <section className="space-y-2 bg-slate-950 p-4 rounded-lg border border-slate-800">
            <h3 className="font-bold text-white text-sm text-amber-300">
              2. Patent Rights Reservation & Intellectual Property Boundaries
            </h3>
            <p>
              All underlying patent rights, trade secrets, algorithm designs, and commercial proprietary architecture associated with the VEK-7 state engine and cryptographic canonicalization patterns are explicitly reserved by {VENDOR_DETAILS.companyName}. No commercial exploitation, sublicensing, or derivative product distribution rights are conveyed by this evaluation license.
            </p>
          </section>

          <section className="space-y-2 bg-slate-950 p-4 rounded-lg border border-slate-800">
            <h3 className="font-bold text-white text-sm text-amber-300">
              3. Government Software and Data Rights
            </h3>
            <p>
              <strong>License and Data Rights:</strong> Government rights in software, documentation, technical data, and evaluation artifacts are determined solely by the final written order and incorporated license. No additional rights are granted by this webpage. Guts Deterministic Technology LLC retains all preexisting intellectual-property and patent rights.
            </p>
          </section>

          <section className="space-y-2 bg-slate-950 p-4 rounded-lg border border-slate-800">
            <h3 className="font-bold text-white text-sm text-amber-300">
              4. Source Code Delivery Protection & Package Exclusions
            </h3>
            <p className="mb-2">
              <strong>Source Code Delivery Protection:</strong> {VENDOR_DETAILS.sourceCodeProtection}
            </p>
            <p className="text-slate-400">
              <strong>Explicit Package Exclusions:</strong> {VENDOR_DETAILS.packageExclusions}
            </p>
          </section>

          <section className="space-y-2 bg-slate-950 p-4 rounded-lg border border-slate-800">
            <h3 className="font-bold text-white text-sm text-amber-300">
              5. Warranties & Disclaimers
            </h3>
            <p>
              The VEK-7 Conformance Demonstrator is delivered "AS IS" for technical evaluation purposes. The vendor warrants that all 33 test vectors are verified within the TypeScript runtime and that Rust/WASM bindings are honestly classified as ADAPTER ONLY.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
