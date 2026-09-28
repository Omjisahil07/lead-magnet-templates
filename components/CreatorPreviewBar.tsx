'use client';

import React, { useState } from 'react';
import {
  LayoutVariantId,
  LeadMagnetData,
} from '@/types/lead-magnet';
import {
  Layers,
  Monitor,
  Tablet,
  Smartphone,
  Share2,
  Download,
  Eye,
  EyeOff,
  Check,
  Copy,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { PRESET_LEAD_MAGNETS, triggerSimulatedDownload } from '@/lib/lead-magnet-data';

interface CreatorPreviewBarProps {
  currentVariant: LayoutVariantId;
  onVariantChange: (variant: LayoutVariantId) => void;
  currentPresetId: string;
  onPresetChange: (presetId: string) => void;
  viewport: 'desktop' | 'tablet' | 'mobile';
  onViewportChange: (viewport: 'desktop' | 'tablet' | 'mobile') => void;
  leadMagnet: LeadMagnetData;
  isSubmitted: boolean;
  onSimulateSubmission: () => void;
  onResetSubmission: () => void;
}

const VARIANTS: { id: LayoutVariantId; label: string; icon: string; desc: string }[] = [
  { id: 'field-guide', label: 'Field Guide', icon: '📘', desc: 'Editorial document card with accent tab' },
  { id: 'split-screen', label: 'Split Screen', icon: '🌓', desc: 'High-contrast 50/50 offer panel' },
  { id: 'minimal-center', label: 'Minimal Center', icon: '📄', desc: 'Swiss typographic whitespace' },
  { id: 'dark-editorial', label: 'Dark Editorial', icon: '🌑', desc: 'Nocturnal floating angled 3D card' },
  { id: 'magazine', label: 'Magazine', icon: '📰', desc: 'Masthead with sticky sidebar form' },
];

export function CreatorPreviewBar({
  currentVariant,
  onVariantChange,
  currentPresetId,
  onPresetChange,
  viewport,
  onViewportChange,
  leadMagnet,
  isSubmitted,
  onSimulateSubmission,
  onResetSubmission,
}: CreatorPreviewBarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}?variant=${currentVariant}&preset=${currentPresetId}`;
    }
    return `https://leadmagnet.com/${leadMagnet.creator.handle.replace('@', '')}/${leadMagnet.id}?variant=${currentVariant}`;
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(getShareUrl());
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopyEmbed = () => {
    const embedCode = `<iframe src="${getShareUrl()}" width="100%" height="800" frameborder="0"></iframe>`;
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  if (isCollapsed) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsCollapsed(false)}
          className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 text-white rounded-full shadow-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold cursor-pointer transition-transform hover:scale-105"
          title="Open Layout Switcher Toolbar"
        >
          <Eye className="w-3.5 h-3.5 text-blue-400" />
          <span>Variant Switcher ({VARIANTS.find((v) => v.id === currentVariant)?.label})</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-200 px-3 sm:px-6 py-2.5 shadow-lg select-none">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Variant Selector */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 pr-2 border-r border-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-black tracking-tight font-display text-white uppercase">
                Lead Magnet
              </span>
            </div>

            {/* Variant segment tabs */}
            <div className="flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60 overflow-x-auto">
              {VARIANTS.map((v) => {
                const isActive = currentVariant === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => onVariantChange(v.id)}
                    title={v.desc}
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                    }`}
                  >
                    <span>{v.icon}</span>
                    <span className="hidden sm:inline">{v.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls: Preset Switcher, Viewports, Test action & Collapse */}
          <div className="flex items-center gap-2 flex-wrap ml-auto">
            {/* Lead Magnet Presets */}
            <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700/60 text-xs">
              <BookOpen className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              <select
                value={currentPresetId}
                onChange={(e) => onPresetChange(e.target.value)}
                className="bg-transparent text-slate-200 text-xs outline-none cursor-pointer pr-1"
                aria-label="Select lead magnet content preset"
              >
                {Object.values(PRESET_LEAD_MAGNETS).map((preset) => (
                  <option key={preset.id} value={preset.id} className="bg-slate-900 text-white">
                    {preset.creator.name}: {preset.title.slice(0, 24)}...
                  </option>
                ))}
              </select>
            </div>

            {/* Viewport responsive toggles */}
            <div className="hidden md:flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60">
              <button
                onClick={() => onViewportChange('desktop')}
                title="Desktop 100%"
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  viewport === 'desktop' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onViewportChange('tablet')}
                title="Tablet 768px"
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  viewport === 'tablet' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onViewportChange('mobile')}
                title="Mobile 390px"
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  viewport === 'mobile' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Test Submission Button */}
            {!isSubmitted ? (
              <button
                onClick={onSimulateSubmission}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-sky-300 border border-sky-500/30 rounded-lg text-xs font-medium cursor-pointer transition-colors"
                title="Fill sample lead to test the success state"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Simulate Lead</span>
              </button>
            ) : (
              <button
                onClick={onResetSubmission}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-medium cursor-pointer transition-colors"
                title="Reset submission"
              >
                <span>Reset form</span>
              </button>
            )}

            {/* Share / Embed Modal trigger */}
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 rounded-lg text-xs font-medium cursor-pointer transition-colors"
              title="Share or embed this variant"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>

            {/* Minimize bar */}
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer ml-1"
              title="Hide toolbar to inspect raw visitor page"
            >
              <EyeOff className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Share & Embed Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 p-6 space-y-5 text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Share &amp; Embed This Landing Page
                </h3>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>

            <div className="space-y-4">
              {/* Direct Link */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Public Landing Page Link
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={getShareUrl()}
                    className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-md p-2 text-slate-700 outline-none"
                  />
                  <button
                    onClick={handleCopyUrl}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    {copiedUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedUrl ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Embed Code */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Responsive Embed Iframe
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`<iframe src="${getShareUrl()}" width="100%" height="800" frameborder="0"></iframe>`}
                    className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-md p-2 text-slate-700 outline-none"
                  />
                  <button
                    onClick={handleCopyEmbed}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-md text-xs font-medium flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    {copiedEmbed ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedEmbed ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Instant test PDF download */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Need the resource file?</span>
                <button
                  onClick={() => triggerSimulatedDownload(leadMagnet, 'Creator Preview')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Test sample download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
