'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LayoutVariantId, LeadMagnetData, LeadSubmission } from '@/types/lead-magnet';
import { DEFAULT_LEAD_MAGNET, PRESET_LEAD_MAGNETS } from '@/lib/lead-magnet-data';
import { fireLeadCaptureConfetti } from '@/lib/confetti';
import { FieldGuideVariant } from '@/components/variants/FieldGuideVariant';
import { SplitScreenVariant } from '@/components/variants/SplitScreenVariant';
import { MinimalCenterVariant } from '@/components/variants/MinimalCenterVariant';
import { DarkEditorialVariant } from '@/components/variants/DarkEditorialVariant';
import { MagazineVariant } from '@/components/variants/MagazineVariant';
import { CreatorPreviewBar } from '@/components/CreatorPreviewBar';
import { DocumentViewerModal } from '@/components/DocumentViewerModal';

let nextLeadNumber = 1;
function createLeadSubmission(formData: { name: string; email: string }, variant: LayoutVariantId, resourceId: string): LeadSubmission {
  return {
    id: `lead-${Date.now()}-${nextLeadNumber++}`,
    name: formData.name,
    email: formData.email,
    timestamp: new Date().toISOString(),
    variant,
    resourceId,
  };
}

function LeadMagnetPageContent() {
  const searchParams = useSearchParams();

  // Selected variant: read from URL search param or default to 'field-guide'
  const [variant, setVariant] = useState<LayoutVariantId>(() => {
    const vParam = searchParams.get('variant') || searchParams.get('v');
    if (
      vParam &&
      ['field-guide', 'split-screen', 'minimal-center', 'dark-editorial', 'magazine'].includes(vParam)
    ) {
      return vParam as LayoutVariantId;
    }
    return 'field-guide';
  });

  // Selected lead magnet preset: read from URL or default
  const [presetId, setPresetId] = useState<string>(() => {
    const pParam = searchParams.get('preset');
    if (pParam && PRESET_LEAD_MAGNETS[pParam]) {
      return pParam;
    }
    return 'viral-templates-101';
  });

  // Viewport mode
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  // Submission state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [, setSubmittedLead] = useState<LeadSubmission | null>(null);
  // Document viewer modal
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  // Trigger canvas-based confetti animation only when isSubmitted becomes true
  useEffect(() => {
    if (isSubmitted) {
      fireLeadCaptureConfetti();
    }
  }, [isSubmitted]);

  // Update URL search param when variant changes
  const handleVariantChange = (newVariant: LayoutVariantId) => {
    setVariant(newVariant);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('variant', newVariant);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const handlePresetChange = (newPresetId: string) => {
    setPresetId(newPresetId);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('preset', newPresetId);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const currentLeadMagnet: LeadMagnetData =
    PRESET_LEAD_MAGNETS[presetId] || DEFAULT_LEAD_MAGNET;

  const handleSuccess = (formData: { name: string; email: string }) => {
    const newLead = createLeadSubmission(formData, variant, currentLeadMagnet.id);
    setSubmittedLead(newLead);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedLead(null);
  };

  const handleSimulateSubmission = () => {
    handleSuccess({
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@creatorgrowth.io',
    });
  };

  // Render the selected variant
  const renderVariantContent = () => {
    const props = {
      leadMagnet: currentLeadMagnet,
      isSubmitted,
      onSuccess: handleSuccess,
      onReset: handleReset,
      onOpenPreview: () => setIsPreviewOpen(true),
    };

    switch (variant) {
      case 'split-screen':
        return <SplitScreenVariant {...props} />;
      case 'minimal-center':
        return <MinimalCenterVariant {...props} />;
      case 'dark-editorial':
        return <DarkEditorialVariant {...props} />;
      case 'magazine':
        return <MagazineVariant {...props} />;
      case 'field-guide':
      default:
        return <FieldGuideVariant {...props} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 font-sans selection:bg-blue-200 selection:text-blue-900">
      {/* Creator Top Studio Bar */}
      <CreatorPreviewBar
        currentVariant={variant}
        onVariantChange={handleVariantChange}
        currentPresetId={presetId}
        onPresetChange={handlePresetChange}
        viewport={viewport}
        onViewportChange={setViewport}
        leadMagnet={currentLeadMagnet}
        isSubmitted={isSubmitted}
        onSimulateSubmission={handleSimulateSubmission}
        onResetSubmission={handleReset}
      />

      {/* Main Preview Container (supports Desktop 100%, Tablet 768px, Mobile 390px simulation) */}
      <main className="flex-1 flex items-center justify-center p-0 md:p-0 transition-all bg-[var(--page-surface)]">
        {viewport === 'desktop' ? (
          <div className="w-full min-h-screen">{renderVariantContent()}</div>
        ) : (
          <div className="py-8 px-4 flex flex-col items-center justify-center w-full min-h-[calc(100vh-60px)] bg-slate-900/60">
            <div
              className={`transition-all duration-300 rounded-3xl overflow-hidden border-8 border-slate-800 shadow-2xl bg-white relative ${
                viewport === 'tablet' ? 'w-[768px] max-w-full' : 'w-[390px] max-w-full'
              }`}
            >
              {/* Fake mobile/tablet camera notch indicator */}
              <div className="w-full h-5 bg-slate-800 flex items-center justify-center">
                <div className="w-12 h-2.5 rounded-full bg-slate-950/80" />
              </div>
              <div className="max-h-[820px] overflow-y-auto">
                {renderVariantContent()}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Document Inspection & Details Modal */}
      <DocumentViewerModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        leadMagnet={currentLeadMagnet}
      />
    </div>
  );
}

export default function LeadMagnetPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-sans">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
            <p className="text-xs uppercase tracking-widest font-semibold text-slate-400">
              Loading Lead Magnet...
            </p>
          </div>
        </div>
      }
    >
      <LeadMagnetPageContent />
    </Suspense>
  );
}
