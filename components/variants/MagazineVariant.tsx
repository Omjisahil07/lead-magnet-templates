'use client';

import React from 'react';
import Image from 'next/image';
import { LeadMagnetData } from '@/types/lead-magnet';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import { ShieldCheck, Bookmark, ArrowDownRight, Newspaper } from 'lucide-react';

interface VariantProps {
  leadMagnet: LeadMagnetData;
  isSubmitted: boolean;
  onSuccess: (formData: { name: string; email: string }) => void;
  onReset: () => void;
  onOpenPreview?: () => void;
}

export function MagazineVariant({
  leadMagnet,
  isSubmitted,
  onSuccess,
  onReset,
  onOpenPreview,
}: VariantProps) {
  return (
    <div className="w-full min-h-screen bg-[#fafaf9] text-[#1c1917] py-8 sm:py-14 px-4 flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto space-y-8">
        {/* Magazine Masthead */}
        <header className="border-b-2 border-stone-900 pb-4">
          <div className="flex items-center justify-between text-[11px] font-bold tracking-widest uppercase text-stone-500 mb-2">
            <span className="flex items-center gap-1.5">
              <Newspaper className="w-3.5 h-3.5 text-stone-700" />
              SPECIAL MONOGRAPH ISSUE · NO. 42
            </span>
            <span>PUBLISHED 2026</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-1">
            <div className="text-2xl sm:text-3xl font-black font-display tracking-tighter uppercase text-stone-900">
              LEAD MAGNET <span className="font-light text-stone-500">DISPATCH</span>
            </div>

            {/* Creator Byline */}
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-stone-300">
                <Image
                  src={leadMagnet.creator.avatar}
                  alt={leadMagnet.creator.name}
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-stone-500 block">
                  {leadMagnet.creator.eyebrow}
                </span>
                <span className="text-xs font-bold text-stone-900">
                  {leadMagnet.creator.name}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Full-width Hero Visual with Overlapping Headline */}
        <div className="relative rounded-xl overflow-hidden border border-stone-200 bg-stone-900 shadow-lg">
          <div
            onClick={onOpenPreview}
            className="relative w-full h-64 sm:h-96 cursor-pointer group"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onOpenPreview?.()}
            aria-label="Enlarge resource cover"
          >
            <Image
              src={leadMagnet.coverImage}
              alt={leadMagnet.title}
              fill
              className="object-cover object-center opacity-85 group-hover:scale-[1.01] transition-transform duration-500"
              referrerPolicy="no-referrer"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />

            {/* Overlapping Headline inside hero bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 space-y-2">
              <span className="inline-block px-2.5 py-0.5 rounded bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider">
                {leadMagnet.category}
              </span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight leading-[1.1] max-w-3xl">
                {leadMagnet.title}
              </h1>
              <p className="text-sm sm:text-base text-stone-300 max-w-2xl font-medium">
                {leadMagnet.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid: Columns of Bullets (left 7 cols) + Sticky Sidebar Form (right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Columns of bullets & editorial excerpt */}
          <div className="lg:col-span-7 space-y-8">
            <div className="border-t-2 border-stone-900 pt-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500 flex items-center gap-1.5 mb-4">
                <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                Table of Contents &amp; Core Takeaways
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                {leadMagnet.insideBullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-white border border-stone-200/80 shadow-xs hover:border-stone-400 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold font-display text-blue-700 uppercase mb-1">
                      <span>SECTION 0{idx + 1}</span>
                      <ArrowDownRight className="w-3.5 h-3.5 text-stone-400" />
                    </div>
                    <p className="text-sm text-stone-800 leading-relaxed font-medium">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Editorial Creator Callout Note */}
            <div className="p-5 rounded-xl bg-stone-100/90 border border-stone-200 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-600">
                A Note from the Author
              </div>
              <blockquote className="text-sm italic text-stone-700 leading-relaxed border-l-2 border-blue-600 pl-3">
                &ldquo;Great lead magnets don&apos;t just capture emails; they establish unmistakable authority before your reader spends a single dollar. These templates are the exact blueprints I use daily.&rdquo;
              </blockquote>
              <div className="text-xs font-semibold text-stone-800 pt-1">
                — {leadMagnet.creator.name}, {leadMagnet.creator.role}
              </div>
            </div>
          </div>

          {/* Right: Sticky Sidebar Form on Desktop */}
          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <div className="bg-white p-6 sm:p-7 rounded-xl border border-stone-300 shadow-md space-y-5">
              <div className="border-b border-stone-100 pb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">
                  DIGITAL EDITION
                </span>
                <h3 className="text-lg font-bold font-display text-stone-900 tracking-tight">
                  Claim Your Copy
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Deliverable as instant PDF ({leadMagnet.fileSize}, {leadMagnet.pagesCount} pages)
                </p>
              </div>

              <LeadCaptureForm
                leadMagnet={leadMagnet}
                isSubmitted={isSubmitted}
                onSuccess={onSuccess}
                onReset={onReset}
                theme="light"
                onOpenPreview={onOpenPreview}
              />
            </div>
          </div>
        </div>

        {/* Social Proof Footer */}
        <footer className="pt-8 border-t border-stone-200 text-center space-y-2 text-xs text-stone-500">
          <div className="flex items-center justify-center gap-2 font-medium flex-wrap">
            <ShieldCheck className="w-4 h-4 text-stone-700" />
            <span>{leadMagnet.socialProof}</span>
          </div>
          <p className="text-[11px] text-stone-400">{leadMagnet.copyright}</p>
        </footer>
      </div>
    </div>
  );
}
