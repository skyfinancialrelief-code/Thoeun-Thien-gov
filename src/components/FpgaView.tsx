import React, { useState } from 'react';
import { FPGA_PACKAGE_DATA } from '../data/fpgaPackage';
import { Cpu, CheckCircle2, Copy, Check, ShieldAlert, FileCode2, Layers, HardDrive, Terminal, Info, ExternalLink } from 'lucide-react';

interface FpgaViewProps {
  onOpenQuote?: () => void;
}

export const FpgaView: React.FC<FpgaViewProps> = ({ onOpenQuote }) => {
  const [copiedSha, setCopiedSha] = useState(false);

  const copySha = () => {
    navigator.clipboard.writeText(FPGA_PACKAGE_DATA.archiveSha256);
    setCopiedSha(true);
    setTimeout(() => setCopiedSha(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/30 rounded-xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400">
              <Cpu className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-800">
                Hardware Demonstrator • FPGA Evaluation Package
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {FPGA_PACKAGE_DATA.title} <span className="text-amber-400 text-lg font-mono">v{FPGA_PACKAGE_DATA.version}</span>
              </h1>
            </div>
          </div>

          {onOpenQuote && (
            <button
              onClick={onOpenQuote}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs transition-all shadow-md flex items-center gap-2 shrink-0"
            >
              Request Evaluation Package
            </button>
          )}
        </div>

        {/* SHA-256 Archive Verification Strip */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-slate-400 font-medium">Verified Package Archive:</span>
            <span className="font-mono text-slate-200 font-bold">{FPGA_PACKAGE_DATA.archiveFilename}</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded border border-slate-800 w-full sm:w-auto">
            <span className="text-[10px] text-slate-400 font-mono font-semibold uppercase shrink-0">SHA-256:</span>
            <span className="font-mono text-[11px] text-amber-300 truncate max-w-[280px] sm:max-w-[360px]">
              {FPGA_PACKAGE_DATA.archiveSha256}
            </span>
            <button
              onClick={copySha}
              className="p-1 text-slate-400 hover:text-amber-400 transition-colors ml-auto shrink-0"
              title="Copy Archive SHA-256"
            >
              {copiedSha ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Resource Utilization & Synthesis Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-1">
          <div className="text-[10px] uppercase font-medium text-slate-400">Target FPGA Device</div>
          <div className="text-sm font-bold text-amber-300 font-mono">{FPGA_PACKAGE_DATA.targetFpga}</div>
          <div className="text-[11px] text-slate-400">UP5K-class (too large for HX1K)</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-1">
          <div className="text-[10px] uppercase font-medium text-slate-400">Matrix Configuration</div>
          <div className="text-sm font-bold text-white font-mono">{FPGA_PACKAGE_DATA.matrixDimensions}</div>
          <div className="text-[11px] text-slate-400">32 State Bits × 40 Rule Matrix</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-1">
          <div className="text-[10px] uppercase font-medium text-slate-400">iCE40 Synthesis Utilization</div>
          <div className="text-sm font-bold text-emerald-400 font-mono">{FPGA_PACKAGE_DATA.synthesisStats.lut4s}</div>
          <div className="text-[11px] text-slate-400">{FPGA_PACKAGE_DATA.synthesisStats.carryCells} • {FPGA_PACKAGE_DATA.synthesisStats.sequentialCells}</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-1">
          <div className="text-[10px] uppercase font-medium text-slate-400">Yosys Netlist Status</div>
          <div className="text-sm font-bold text-emerald-400 font-mono">ZERO STRUCTURAL ERRORS</div>
          <div className="text-[11px] text-slate-400">{FPGA_PACKAGE_DATA.synthesisStats.yosysStatus}</div>
        </div>
      </div>

      {/* Verification Checklist & Results */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          Hardware Evaluation Verification Results
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {FPGA_PACKAGE_DATA.verificationResults.map((res, idx) => (
            <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-200 font-mono">{res}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Included Artifacts Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            Packaged Hardware Deliverable Artifacts
          </h2>
          <span className="text-xs text-slate-400 font-mono">10 Packaged Components</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FPGA_PACKAGE_DATA.includedArtifacts.map((art, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-4 space-y-2 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-900">
                  ARTIFACT #{i + 1}
                </span>
                <FileCode2 className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="font-bold text-slate-100 text-sm">{art.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{art.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Important Architectural Boundaries */}
      <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-6 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">
            Explicit Hardware & Architectural Scope Boundaries
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {FPGA_PACKAGE_DATA.boundaryNotices.map((b, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-1">
              <strong className="text-amber-300 font-bold block">{b.title}</strong>
              <p className="text-slate-300 leading-relaxed">{b.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
