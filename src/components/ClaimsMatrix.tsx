import React, { useState } from 'react';
import { CLAIMS_MATRIX_DATA } from '../data/claims';
import { ClaimItem } from '../types';
import { TradewindsAwardableBadge } from './TradewindsAwardableBadge';
import { CheckCircle2, ShieldCheck, AlertCircle, FileCode2, Search, GitCommit, ArrowRight, Info, Check } from 'lucide-react';

export const ClaimsMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['ALL', 'Cryptographic Security', 'JSON Canonicalization', 'Multi-Language Architecture', 'Performance & Scope'];

  const filteredClaims = CLAIMS_MATRIX_DATA.filter(c => {
    const matchesCategory = selectedCategory === 'ALL' || c.category === selectedCategory;
    const matchesSearch = 
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.claimTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.correctedText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <TradewindsAwardableBadge size={60} theme="dark" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-5 h-5 text-amber-400" />
                <h2 className="text-xl font-bold text-white">
                  Rectified CLAIMS-MATRIX Inspector (CLAIMS-MATRIX.md)
                </h2>
              </div>
              <p className="text-xs text-slate-300">
                Formal audit matrix documenting engineering precision updates committed in repository history.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono">
            <GitCommit className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-400">Latest Revision Commit:</span>
            <span className="text-amber-400 font-bold">00764ef</span>
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <strong className="text-slate-100">Audit & Rectification Summary:</strong> Commit <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded border border-slate-800">00764ef</code> updated two key claims in CLAIMS-MATRIX.md: (1) Cryptographic hash chain description was updated from non-rigorous "unbreakably chained" to SHA-256 commitments forming a deterministic tamper-evident chain; (2) Canonicalization description was updated to the VEK Canonical JSON Profile with deterministic key ordering, UTF-8 encoding, integer-only schema fields, and rejection of noncanonical values.
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5 bg-slate-900 p-1.5 rounded-lg border border-slate-800">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search claims..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 text-xs rounded-lg pl-9 pr-3 py-2 border border-slate-800 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Claims List */}
      <div className="space-y-4">
        {filteredClaims.map((claim) => (
          <div 
            key={claim.id}
            className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4 shadow-sm hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30">
                  {claim.id}
                </span>
                <h3 className="text-base font-bold text-white">{claim.claimTitle}</h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700">
                  {claim.category}
                </span>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2.5 py-1 rounded border border-emerald-800 font-bold">
                  {claim.status}
                </span>
              </div>
            </div>

            {/* Superseded vs Rectified Statements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {claim.previousText ? (
                <div className="bg-rose-950/30 border border-rose-900/50 p-3.5 rounded-lg space-y-1">
                  <div className="text-[11px] uppercase tracking-wider text-rose-400 font-bold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Superseded Initial Statement
                  </div>
                  <p className="text-xs text-rose-200/90 leading-relaxed font-sans italic">
                    "{claim.previousText}"
                  </p>
                </div>
              ) : (
                <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-xs text-slate-400 flex items-center justify-center">
                  <span>Standard Verified Baseline Specification</span>
                </div>
              )}

              <div className="bg-emerald-950/30 border border-emerald-800/50 p-3.5 rounded-lg space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Rectified & Verified Technical Claim
                </div>
                <p className="text-xs text-emerald-200 leading-relaxed font-medium">
                  "{claim.correctedText}"
                </p>
              </div>
            </div>

            {/* Technical Pointers and Evidence */}
            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-2 text-xs">
              <div>
                <strong className="text-slate-200">Verification Evidence:</strong>{' '}
                <span className="text-slate-300">{claim.evidence}</span>
              </div>
              <div className="text-[11px] text-amber-300/90 border-t border-slate-800 pt-2 mt-2">
                <strong>Technical Revision Note:</strong> {claim.technicalNote}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
