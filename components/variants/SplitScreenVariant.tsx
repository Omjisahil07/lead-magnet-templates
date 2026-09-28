'use client';

import React from 'react';
import Image from 'next/image';
import { LeadMagnetData } from '@/types/lead-magnet';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import { ShieldCheck, BookOpen, Check } from 'lucide-react';

interface VariantProps {
  leadMagnet: LeadMagnetData;
  isSubmitted: boolean;
  onSuccess: (formData: { name: string; email: string }) => void;
  onReset: () => void;
  onOpenPreview?: () => void;
}

export function SplitScreenVariant({
  leadMagnet,
  isSubmitted,
  onSuccess,
  onReset,
  onOpenPreview,
}: VariantProps) {
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-[var(--page-surface)]">
      {/* Left half: Bold color/gradient panel with the offer + portrait */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-[#0c192c] via-[#102a4e] to-[#0a1322] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
        {/* Subtle background glow */}
        <div
          className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Creator identity row at top */}
        <div className="relative z-10 flex items-center gap-3.5 mb-8">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-400/40 shadow-lg shrink-0 bg-slate-800">
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
            <span className="text-xs uppercase font-bold tracking-widest text-sky-400 block">
              {leadMagnet.creator.eyebrow}
            </span>
            <span className="text-base font-bold text-white">
              {leadMagnet.creator.name}
            </span>
            <span className="text-xs text-slate-400 block">
              {leadMagnet.creator.role}
            </span>
          </div>
        </div>

        {/* Offer headline & preview in the middle */}
        <div className="relative z-10 my-auto space-y-6 py-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider border border-blue-400/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{leadMagnet.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
            {leadMagnet.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
            {leadMagnet.subtitle}
          </p>

          {/* Floating interactive resource preview */}
          <div
            onClick={onOpenPreview}
            className="group relative max-w-md aspect-[4/3] rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 cursor-pointer hover:border-sky-400/50 transition-all duration-300 transform hover:-translate-y-1"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onOpenPreview?.()}
          >
            <Image
              src={leadMagnet.coverImage}
              alt={leadMagnet.title}
              fill
              className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
              referrerPolicy="no-referrer"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
              <span className="text-xs font-semibold text-sky-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {leadMagnet.previewBadge}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom stats badge */}
        <div className="relative z-10 pt-8 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>{leadMagnet.socialProof}</span>
        </div>
      </div>

      {/* Right half: Clean white column with the form and bullets */}
      <div className="w-full lg:w-1/2 bg-white p-8 sm:p-12 lg:p-20 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[var(--foreground)] tracking-tight">
              Get Instant Access
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] mt-1.5">
              Fill in your details below to receive the complete digital edition immediately.
            </p>
          </div>

          {/* Inside the guide bullets */}
          <div className="space-y-3 p-5 rounded-xl bg-[var(--muted)] border border-[var(--border)]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
              What you&apos;ll get inside:
            </h3>
            <ul className="space-y-3">
              {leadMagnet.insideBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[var(--foreground)]">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-[var(--primary)] flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span className="leading-snug">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sign up form */}
          <div className="pt-2">
            <LeadCaptureForm
              leadMagnet={leadMagnet}
              isSubmitted={isSubmitted}
              onSuccess={onSuccess}
              onReset={onReset}
              theme="light"
              onOpenPreview={onOpenPreview}
            />
          </div>

          {/* Footer note */}
          <div className="pt-6 border-t border-slate-100 text-center">
            <p className="text-[11px] text-[var(--muted-foreground)]">
              {leadMagnet.copyright}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
