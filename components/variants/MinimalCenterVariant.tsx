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

export function MinimalCenterVariant({
  leadMagnet,
  isSubmitted,
  onSuccess,
  onReset,
  onOpenPreview,
}: VariantProps) {
  return (
    <div className="w-full min-h-screen bg-white py-16 sm:py-24 px-4 flex flex-col items-center justify-center">
      {/* Centered column without card container — pure whitespace */}
      <div className="w-full max-w-xl mx-auto space-y-10 text-center">
        {/* Creator identity - clean, uncluttered */}
        <div className="flex items-center justify-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200">
            <Image
              src={leadMagnet.creator.avatar}
              alt={leadMagnet.creator.name}
              width={40}
              height={40}
              className="object-cover w-full h-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-left">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-[var(--primary)]">
              {leadMagnet.creator.eyebrow}
            </p>
            <p className="text-xs font-bold text-[var(--foreground)]">
              {leadMagnet.creator.name}
            </p>
          </div>
        </div>

        {/* Category kicker */}
        <p className="text-xs font-bold tracking-widest uppercase text-slate-400">
          {leadMagnet.category}
        </p>

        {/* Oversized display headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-[var(--foreground)] tracking-tight leading-[1.1] max-w-lg mx-auto">
          {leadMagnet.title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed max-w-md mx-auto">
          {leadMagnet.subtitle}
        </p>

        {/* Thin divider rule */}
        <div className="w-16 h-px bg-slate-200 mx-auto" />

        {/* Crisp compact preview image */}
        <div className="max-w-md mx-auto w-full">
          <div
            onClick={onOpenPreview}
            className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow bg-slate-50"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onOpenPreview?.()}
          >
            <Image
              src={leadMagnet.coverImage}
              alt={leadMagnet.title}
              fill
              className="object-cover object-top"
              referrerPolicy="no-referrer"
              sizes="(max-width: 768px) 100vw, 448px"
            />
          </div>
          <p className="mt-2 text-xs text-slate-400 font-medium">
            {leadMagnet.previewBadge}
          </p>
        </div>

        {/* Thin divider rule */}
        <div className="w-full max-w-md h-px bg-slate-200 mx-auto" />

        {/* Inside the guide bullets - clean editorial format */}
        <div className="text-left max-w-md mx-auto space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Included in this edition
          </p>
          <ul className="space-y-2.5">
            {leadMagnet.insideBullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                <span className="text-[var(--primary)] font-bold text-base leading-none mt-0.5">•</span>
                <span className="leading-snug">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tiny form */}
        <div className="max-w-md mx-auto w-full pt-2">
          <LeadCaptureForm
            leadMagnet={leadMagnet}
            isSubmitted={isSubmitted}
            onSuccess={onSuccess}
            onReset={onReset}
            theme="minimal"
            onOpenPreview={onOpenPreview}
          />
        </div>

        {/* Footer social-proof stats row and copyright */}
        <footer className="pt-6 border-t border-slate-100 text-xs text-slate-400 space-y-1.5">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-500" />
            <span>{leadMagnet.socialProof}</span>
          </div>
          <p className="text-[11px]">{leadMagnet.copyright}</p>
        </footer>
      </div>
    </div>
  );
}
