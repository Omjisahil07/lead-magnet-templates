'use client';

import React from 'react';
import Image from 'next/image';
import { LeadMagnetData } from '@/types/lead-magnet';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import { ShieldCheck } from 'lucide-react';

interface VariantProps {
  leadMagnet: LeadMagnetData;
  isSubmitted: boolean;
  onSuccess: (formData: { name: string; email: string }) => void;
  onReset: () => void;
  onOpenPreview?: () => void;
}

export function FieldGuideVariant({
  leadMagnet,
  isSubmitted,
  onSuccess,
  onReset,
  onOpenPreview,
}: VariantProps) {
  return (
    <div className="w-full min-h-screen py-10 sm:py-16 px-4 flex flex-col items-center justify-center bg-[var(--page-surface)]">
      {/* Centered max-w-2xl column */}
      <div className="w-full max-w-2xl mx-auto">
        {/* Article card with top-right vertical blue accent tab */}
        <article className="relative bg-white rounded-2xl border border-[var(--border)] shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)] overflow-hidden transition-all">
          {/* Top-right vertical blue accent tab */}
          <div
            className="absolute top-0 right-6 w-3 h-8 bg-[var(--primary)] rounded-b-md shadow-sm z-10"
            aria-hidden="true"
          />

          <div className="p-6 sm:p-10 space-y-8">
            {/* Header Section */}
            <header className="space-y-4">
              {/* Creator identity row */}
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-slate-200 shadow-sm shrink-0 bg-slate-100">
                  <Image
                    src={leadMagnet.creator.avatar}
                    alt={leadMagnet.creator.name}
                    width={44}
                    height={44}
                    className="object-cover w-full h-full"
                    referrerPolicy="no-referrer"
                    priority
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-[var(--primary)]">
                    {leadMagnet.creator.eyebrow}
                  </p>
                  <h3 className="text-sm font-bold text-[var(--foreground)]">
                    {leadMagnet.creator.name}
                  </h3>
                </div>
              </div>

              {/* Category chip */}
              <div className="inline-flex items-center px-2.5 py-1 rounded bg-[oklch(0.837_0.079_241.3)]/25 text-[oklch(0.40_0.14_248.4)] text-[11px] font-bold uppercase tracking-wider">
                {leadMagnet.category}
              </div>

              {/* Display H1 */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-display text-[var(--foreground)] leading-[1.15]">
                {leadMagnet.title}
              </h1>

              {/* One-line value-prop subtitle */}
              <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
                {leadMagnet.subtitle}
              </p>
            </header>

            {/* Resource preview band */}
            <section
              aria-label="Resource preview"
              className="bg-[var(--preview-surface)] p-4 sm:p-6 rounded-xl border border-[var(--border)] relative flex flex-col items-center justify-center animate-resource-reveal group"
            >
              <div
                onClick={onOpenPreview}
                className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-slate-200/90 shadow-md bg-white cursor-pointer hover:shadow-lg transition-shadow"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onOpenPreview?.()}
                aria-label="Enlarge resource preview"
              >
                <Image
                  src={leadMagnet.coverImage}
                  alt={leadMagnet.title}
                  fill
                  className="object-cover object-top"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 768px) 100vw, 640px"
                  priority
                />
              </div>

              {/* Dark pill badge overlapping image bottom edge */}
              <div className="-mt-3.5 z-10 inline-flex items-center gap-1.5 px-3.5 py-1 bg-slate-900/90 text-white rounded-full text-xs font-medium shadow-md backdrop-blur-sm border border-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                <span>{leadMagnet.previewBadge}</span>
              </div>
            </section>

            {/* Inside the guide list */}
            <section className="space-y-3.5 pt-1">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                Inside the guide
              </h2>
              <ul className="space-y-3">
                {leadMagnet.insideBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[var(--foreground)]">
                    {/* Small dot-in-circle primary marker */}
                    <div className="mt-1 flex items-center justify-center w-4 h-4 rounded-full border border-[var(--primary)]/40 shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                    </div>
                    <span className="leading-snug">{bullet}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Signup form card: bordered, bg-muted inset card */}
            <section
              aria-label="Get access"
              className="bg-[var(--muted)] p-5 sm:p-7 rounded-xl border border-[var(--border)] shadow-inner"
            >
              <LeadCaptureForm
                leadMagnet={leadMagnet}
                isSubmitted={isSubmitted}
                onSuccess={onSuccess}
                onReset={onReset}
                theme="light"
                onOpenPreview={onOpenPreview}
              />
            </section>
          </div>
        </article>

        {/* Footer: social-proof stats row & copyright */}
        <footer className="mt-8 text-center space-y-2 text-xs text-[var(--muted-foreground)]">
          <div className="flex items-center justify-center gap-2 font-medium flex-wrap">
            <ShieldCheck className="w-4 h-4 text-[var(--primary)]" />
            <span>{leadMagnet.socialProof}</span>
          </div>
          <p className="text-[11px] opacity-75">{leadMagnet.copyright}</p>
        </footer>
      </div>
    </div>
  );
}
