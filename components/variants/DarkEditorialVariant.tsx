'use client';

import React from 'react';
import Image from 'next/image';
import { LeadMagnetData } from '@/types/lead-magnet';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import { ShieldCheck, Sparkles, Layers } from 'lucide-react';

interface VariantProps {
  leadMagnet: LeadMagnetData;
  isSubmitted: boolean;
  onSuccess: (formData: { name: string; email: string }) => void;
  onReset: () => void;
  onOpenPreview?: () => void;
}

export function DarkEditorialVariant({
  leadMagnet,
  isSubmitted,
  onSuccess,
  onReset,
  onOpenPreview,
}: VariantProps) {
  return (
    <div className="w-full min-h-screen bg-[#070b14] text-slate-100 py-12 sm:py-20 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-4xl mx-auto relative z-10 space-y-12">
        {/* Top Masthead & Creator Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-blue-500/30 ring-2 ring-blue-500/10 shrink-0 bg-slate-900">
              <Image
                src={leadMagnet.creator.avatar}
                alt={leadMagnet.creator.name}
                width={48}
                height={48}
                className="object-cover w-full h-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-blue-400">
                {leadMagnet.creator.eyebrow}
              </p>
              <h2 className="text-sm font-bold text-white tracking-wide">
                {leadMagnet.creator.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700/60 text-xs font-semibold text-sky-300 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>{leadMagnet.category}</span>
          </div>
        </div>

        {/* 2-Column Editorial Grid: Left floating angled 3D card; Right copy & signup card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Floating Angled Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center [perspective:1000px]">
            <div
              onClick={onOpenPreview}
              className="relative w-full max-w-sm aspect-[4/3] rounded-xl overflow-hidden border border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] bg-slate-900 transform lg:-rotate-2 hover:rotate-0 transition-transform duration-500 cursor-pointer group hover:border-blue-500/60"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onOpenPreview?.()}
              aria-label="Enlarge resource preview"
            >
              {/* Back illumination glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-20 blur-md group-hover:opacity-40 transition-opacity" />

              <div className="relative w-full h-full bg-slate-900 rounded-xl overflow-hidden">
                <Image
                  src={leadMagnet.coverImage}
                  alt={leadMagnet.title}
                  fill
                  className="object-cover object-top"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 768px) 100vw, 380px"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300 font-medium">
                  <span className="flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800 backdrop-blur-sm">
                    <Layers className="w-3 h-3 text-cyan-400" />
                    {leadMagnet.pagesCount} Pages Dossier
                  </span>
                  <span className="bg-blue-900/60 px-2 py-0.5 rounded text-blue-200 border border-blue-700/50">
                    PDF format
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-400 font-medium text-center">
              {leadMagnet.previewBadge}
            </p>
          </div>

          {/* Right Column: Title, Subtitle, Bullets, and Dark Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-white tracking-tight leading-[1.15]">
                {leadMagnet.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {leadMagnet.subtitle}
              </p>
            </div>

            {/* Bullets */}
            <div className="space-y-2.5 py-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Inside the dossier
              </h3>
              <ul className="space-y-2.5">
                {leadMagnet.insideBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                    <span className="leading-snug">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dark form card */}
            <div className="bg-slate-900/80 border border-slate-800 p-5 sm:p-7 rounded-xl shadow-xl backdrop-blur-sm">
              <LeadCaptureForm
                leadMagnet={leadMagnet}
                isSubmitted={isSubmitted}
                onSuccess={onSuccess}
                onReset={onReset}
                theme="dark"
                onOpenPreview={onOpenPreview}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-8 border-t border-slate-800/80 text-center space-y-2 text-xs text-slate-400">
          <div className="flex items-center justify-center gap-2 font-medium flex-wrap">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>{leadMagnet.socialProof}</span>
          </div>
          <p className="text-[11px] text-slate-400">{leadMagnet.copyright}</p>
        </footer>
      </div>
    </div>
  );
}
