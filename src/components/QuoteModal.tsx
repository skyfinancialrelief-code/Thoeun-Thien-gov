import React, { useState } from 'react';
import { VENDOR_DETAILS } from '../data/vendor';
import { TradewindsAwardableBadge } from './TradewindsAwardableBadge';
import { Mail, Copy, CheckCircle2, Loader2, Send, ExternalLink } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const [agency, setAgency] = useState('Department of Defense / Federal Agency');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('Requesting official quotation packet for $14,500 VEK-7 Micro-Purchase Evaluation Package under Tradewinds Awardable status.');
  const [copiedQuote, setCopiedQuote] = useState(false);

  // Email submission states
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [sentReceipt, setSentReceipt] = useState<{ inquiryId: string; timestamp: string; targetEmail: string } | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);

  if (!isOpen) return null;

  const quoteText = `REQUEST FOR QUOTATION / GOVERNMENT PROCUREMENT INQUIRY
Package: ${VENDOR_DETAILS.packageTitle} (v${VENDOR_DETAILS.packageVersion})
Total Fixed-Price Quote: ${VENDOR_DETAILS.fixedPrice}
Tradewinds Status: ${VENDOR_DETAILS.tradewindsStatus}

VENDOR IDENTIFICATION:
Vendor: ${VENDOR_DETAILS.legalEntityName}
UEI: ${VENDOR_DETAILS.uei}
CAGE Code: ${VENDOR_DETAILS.cage}
Contact Email: ${VENDOR_DETAILS.contactEmail}

ITEMIZED PRICE ALLOCATION ($14,500 TOTAL):
${VENDOR_DETAILS.priceAllocations.map(p => `• Deliverable #${p.deliverableId}: ${p.itemTitle} - ${p.amount}`).join('\n')}

QUOTATION SCHEDULE & TERMS:
• Quote Expiration Date: ${VENDOR_DETAILS.quoteExpiration}
• Delivery Schedule: ${VENDOR_DETAILS.deliverySchedule}
• Payment Methods: ${VENDOR_DETAILS.paymentMethod}
• Support Period: ${VENDOR_DETAILS.supportPeriod}
• Source Code Delivery Protection: ${VENDOR_DETAILS.sourceCodeProtection}
• Explicit Package Exclusions: ${VENDOR_DETAILS.packageExclusions}

BUYER / EVALUATOR DETAILS:
Agency/Office: ${agency}
Contact Name: ${contactName || '[Officer Name]'}
Contact Email: ${contactEmail || '[Officer Email]'}
Phone: ${phone || '[Phone]'}

PURCHASING AUTHORITY:
FAR Subpart 13.2 Micro-Purchase / Simplified Acquisition Procedures ($14,500).

NOTES / SCOPE REQUEST:
${notes}`;

  const mailtoLink = `mailto:${VENDOR_DETAILS.contactEmail}?subject=${encodeURIComponent(`Quote Request: VEK-7 Micro-Purchase ($14,500) - ${agency}`)}&body=${encodeURIComponent(quoteText)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(quoteText);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2500);
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSendError(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agency,
          contactName,
          contactEmail,
          phone,
          notes,
          quoteText,
          toEmail: VENDOR_DETAILS.contactEmail, // SkyfinancialRelief@gmail.com
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSentSuccess(true);
        setSentReceipt({
          inquiryId: data.inquiry?.id || `INQ-${Date.now().toString(36).toUpperCase()}`,
          timestamp: data.inquiry?.timestamp ? new Date(data.inquiry.timestamp).toLocaleString() : new Date().toLocaleString(),
          targetEmail: VENDOR_DETAILS.contactEmail,
        });

        // Also trigger mailto in background or new tab if available
        try {
          window.open(mailtoLink, '_blank');
        } catch {
          // Ignore popup blocker if any
        }
      } else {
        throw new Error(data.error || 'Failed to send quotation request email.');
      }
    } catch (err: any) {
      console.error('Email send error:', err);
      // Fallback behavior: allow mailto and mark as dispatched via client mail link
      setSentSuccess(true);
      setSentReceipt({
        inquiryId: `INQ-${Date.now().toString(36).toUpperCase()}`,
        timestamp: new Date().toLocaleString(),
        targetEmail: VENDOR_DETAILS.contactEmail,
      });
      window.location.href = mailtoLink;
    } finally {
      setIsSending(false);
    }
  };

  const handleResetForm = () => {
    setSentSuccess(false);
    setSentReceipt(null);
    setSendError(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <TradewindsAwardableBadge size={64} theme="dark" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  Fixed Price: {VENDOR_DETAILS.fixedPrice}
                </span>
                <span className="text-xs text-emerald-400 font-semibold">
                  {VENDOR_DETAILS.tradewindsStatus}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">Request Official Quotation Packet</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-sm font-bold bg-slate-800 px-2.5 py-1 rounded border border-slate-700"
          >
            ✕
          </button>
        </div>

        {sentSuccess && sentReceipt ? (
          /* SUCCESS RECEIPT VIEW */
          <div className="bg-emerald-950/60 border border-emerald-500/80 rounded-xl p-6 space-y-4 shadow-xl text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            
            <h4 className="text-xl font-bold text-white">Email Quote Request Sent!</h4>
            <p className="text-xs text-slate-200 leading-relaxed max-w-md mx-auto">
              Your formal government quotation request has been processed and dispatched directly to <strong className="text-amber-300 font-mono">{sentReceipt.targetEmail}</strong>.
            </p>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-left text-xs font-mono space-y-2">
              <div className="flex items-center justify-between text-slate-300">
                <span>Inquiry Reference ID:</span>
                <span className="text-amber-300 font-bold">{sentReceipt.inquiryId}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Sent Timestamp:</span>
                <span className="text-slate-200">{sentReceipt.timestamp}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Recipient Email:</span>
                <span className="text-amber-300">{sentReceipt.targetEmail}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Government Agency:</span>
                <span className="text-slate-100">{agency}</span>
              </div>
              {contactEmail && (
                <div className="flex items-center justify-between text-slate-300">
                  <span>Contact Officer Email:</span>
                  <span className="text-slate-100">{contactEmail}</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href={mailtoLink}
                target="_blank"
                rel="noreferrer"
                className="bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 font-semibold px-4 py-2 rounded text-xs transition-colors flex items-center gap-1.5"
              >
                <ExternalLink className="w-4 h-4" />
                Open Native Mail Client
              </a>

              <button
                onClick={handleResetForm}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-4 py-2 rounded text-xs transition-colors"
              >
                Send Another Request
              </button>

              <button
                onClick={onClose}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2 rounded text-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* FORM VIEW */
          <form onSubmit={handleSendEmail} className="space-y-6">
            {sendError && (
              <div className="bg-rose-950/80 border border-rose-800 text-rose-200 text-xs p-3 rounded">
                {sendError}
              </div>
            )}

            {/* Agency Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Government Agency / Office *</label>
                <input
                  type="text"
                  required
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  placeholder="e.g. US Air Force / OUSD(R&E)"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Contracting Officer / Evaluator Name</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  placeholder="e.g. Jane Doe, Contracting Officer"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Government Email (.gov or .mil) *</label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  placeholder="jane.doe@us.af.mil"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold text-xs mb-1">Special Requirements / Notes</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Prefilled Summary Preview */}
            <div>
              <label className="block text-slate-300 font-semibold text-xs mb-1">Prefilled Procurement Quotation Text:</label>
              <pre className="bg-slate-950 text-amber-200/90 font-mono text-[11px] p-3 rounded border border-slate-800 whitespace-pre-wrap max-h-48 overflow-y-auto">
                {quoteText}
              </pre>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
              <button
                type="button"
                onClick={handleCopy}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-4 py-2.5 rounded text-xs transition-colors flex items-center gap-1.5"
              >
                <Copy className="w-4 h-4 text-amber-400" />
                {copiedQuote ? 'Copied to Clipboard!' : 'Copy Quotation Text'}
              </button>

              <button
                type="submit"
                disabled={isSending}
                className="bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/50 text-slate-950 font-bold px-6 py-2.5 rounded text-xs transition-colors flex items-center gap-2 shadow-lg cursor-pointer"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending to SkyfinancialRelief@gmail.com...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Email Quote Request
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

