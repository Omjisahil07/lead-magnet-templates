'use client';

import React from 'react';
import { X, Download, FileText, CheckCircle2 } from 'lucide-react';
import { LeadMagnetData } from '@/types/lead-magnet';
import { triggerSimulatedDownload } from '@/lib/lead-magnet-data';

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadMagnet: LeadMagnetData;
}

export function DocumentViewerModal({
  isOpen,
  onClose,
  leadMagnet,
}: DocumentViewerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[var(--primary)] flex items-center justify-center border border-blue-100">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 id="modal-title" className="text-sm font-bold text-slate-900 leading-tight">
                Document Inspection: {leadMagnet.title}
              </h3>
              <p className="text-xs text-slate-500">
                {leadMagnet.pagesCount} Pages · {leadMagnet.fileSize} · Verified Format
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerSimulatedDownload(leadMagnet, 'Visitor')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-200/60 transition-colors cursor-pointer"
              aria-label="Close document viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-800">
          {/* Cover highlight */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-5">
            <div className="w-28 aspect-[3/4] bg-slate-900 rounded-lg shadow-md overflow-hidden shrink-0 flex items-center justify-center p-3 text-center text-white border border-slate-800">
              <span className="text-[10px] font-mono leading-tight uppercase font-bold text-blue-300">
                101 VIRAL TEMPLATES
              </span>
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                {leadMagnet.category}
              </span>
              <h4 className="text-base font-bold text-slate-900">
                {leadMagnet.title}
              </h4>
              <p className="text-xs text-slate-600">
                Authored by {leadMagnet.creator.name} ({leadMagnet.creator.handle})
              </p>
            </div>
          </div>

          {/* Table of contents sample */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Table of Contents Breakdown
            </h5>
            <div className="space-y-2">
              {leadMagnet.insideBullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white border border-slate-100 shadow-2xs"
                >
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">
                    0{idx + 1}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{bullet}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Full breakdown with case studies, real screenshots, and swipe file.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Excerpt Section */}
          <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              Sample Excerpt — Hook Formula #04
            </div>
            <p className="text-xs font-mono bg-white p-3 rounded border border-blue-100 text-slate-700 leading-relaxed">
              &quot;If you have 15 minutes a day, stop doing [Routine Action]. Here is the 3-step flywheel I used to replace 4 hours of weekly grind with an automated asset...&quot;
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>{leadMagnet.socialProof}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
