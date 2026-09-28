'use client';

import React, { useState } from 'react';
import { CheckCircle2, Download, ArrowRight, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { LeadMagnetData } from '@/types/lead-magnet';
import { triggerSimulatedDownload } from '@/lib/lead-magnet-data';

interface LeadCaptureFormProps {
  leadMagnet: LeadMagnetData;
  isSubmitted: boolean;
  onSuccess: (formData: { name: string; email: string }) => void;
  onReset: () => void;
  theme?: 'light' | 'dark' | 'minimal' | 'sidebar';
  className?: string;
  onOpenPreview?: () => void;
}

export function LeadCaptureForm({
  leadMagnet,
  isSubmitted,
  onSuccess,
  onReset,
  theme = 'light',
  className = '',
  onOpenPreview,
}: LeadCaptureFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean }>({});

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};

    // Name validation: required, max 100 chars
    const trimmedName = name.trim();
    if (!trimmedName) {
      newErrors.name = 'Full name is required';
    } else if (trimmedName.length > 100) {
      newErrors.name = 'Name must be 100 characters or less';
    }

    // Email validation: required, max 255 chars, regex
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      newErrors.email = 'Email address is required';
    } else if (trimmedEmail.length > 255) {
      newErrors.email = 'Email must be 255 characters or less';
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true });

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    // Simulate brief responsive network processing
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess({ name: name.trim(), email: email.trim() });
    }, 450);
  };

  const handleDownload = () => {
    triggerSimulatedDownload(leadMagnet, name.trim() || 'Reader');
  };

  const isDark = theme === 'dark';
  const isMinimal = theme === 'minimal';

  if (isSubmitted) {
    return (
      <div
        className={`p-6 sm:p-7 rounded-lg border text-center transition-all ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 text-slate-100 shadow-xl shadow-black/40'
            : isMinimal
            ? 'bg-emerald-50/70 border-emerald-200/80 text-slate-900'
            : 'bg-emerald-50/60 border-emerald-200/80 text-slate-900'
        } ${className}`}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3.5">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <h3
            className={`text-xl font-bold font-display tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Your guide is ready
          </h3>

          <p
            className={`mt-1.5 text-sm max-w-sm ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Check your inbox for the download link.
          </p>

          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs">
            <button
              type="button"
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-md shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download PDF now
            </button>

            {onOpenPreview && (
              <button
                type="button"
                onClick={onOpenPreview}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md border transition-colors cursor-pointer ${
                  isDark
                    ? 'border-slate-700 hover:bg-slate-800 text-slate-200'
                    : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Sparkles className="w-4 h-4 text-emerald-500" />
                Inspect doc
              </button>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-emerald-200/60 w-full flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                setName('');
                setEmail('');
                setTouched({});
                setErrors({});
                onReset();
              }}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              Reset & test again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Input styles according to specifications:
  // h-11, rounded, focus ring primary/15, placeholder text, aria-invalid + inline error messages
  const baseInputStyles = `w-full h-11 px-3.5 rounded-md text-sm transition-colors outline-none border font-sans ${
    isDark
      ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/15'
      : isMinimal
      ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/15'
      : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/15'
  }`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`space-y-4 ${className}`}
    >
      {/* Full name field */}
      <div className="space-y-1.5 text-left">
        <label
          htmlFor={`lead-name-${theme}`}
          className={`block text-xs font-semibold uppercase tracking-wider ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          Full name
        </label>
        <input
          id={`lead-name-${theme}`}
          type="text"
          value={name}
          maxLength={100}
          onChange={(e) => {
            setName(e.target.value);
            if (touched.name && errors.name) {
              setErrors((prev) => ({ ...prev, name: undefined }));
            }
          }}
          onBlur={() => {
            setTouched((prev) => ({ ...prev, name: true }));
            if (!name.trim()) {
              setErrors((prev) => ({ ...prev, name: 'Full name is required' }));
            }
          }}
          placeholder="e.g. Sarah Jenkins"
          aria-invalid={touched.name && !!errors.name}
          aria-describedby={errors.name ? `name-error-${theme}` : undefined}
          className={`${baseInputStyles} ${
            touched.name && errors.name
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/15'
              : ''
          }`}
        />
        {touched.name && errors.name && (
          <p
            id={`name-error-${theme}`}
            className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1"
          >
            <span>•</span> {errors.name}
          </p>
        )}
      </div>

      {/* Email address field */}
      <div className="space-y-1.5 text-left">
        <label
          htmlFor={`lead-email-${theme}`}
          className={`block text-xs font-semibold uppercase tracking-wider ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          Email address
        </label>
        <input
          id={`lead-email-${theme}`}
          type="email"
          value={email}
          maxLength={255}
          onChange={(e) => {
            setEmail(e.target.value);
            if (touched.email && errors.email) {
              setErrors((prev) => ({ ...prev, email: undefined }));
            }
          }}
          onBlur={() => {
            setTouched((prev) => ({ ...prev, email: true }));
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.trim()) {
              setErrors((prev) => ({ ...prev, email: 'Email address is required' }));
            } else if (!emailRegex.test(email.trim())) {
              setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
            }
          }}
          placeholder="sarah@example.com"
          aria-invalid={touched.email && !!errors.email}
          aria-describedby={errors.email ? `email-error-${theme}` : undefined}
          className={`${baseInputStyles} ${
            touched.email && errors.email
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/15'
              : ''
          }`}
        />
        {touched.email && errors.email && (
          <p
            id={`email-error-${theme}`}
            className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1"
          >
            <span>•</span> {errors.email}
          </p>
        )}
      </div>

      {/* Primary submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full h-11 px-5 rounded-md font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
          isDark
            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/30'
            : 'bg-[oklch(0.537_0.151_248.4)] hover:bg-[oklch(0.47_0.143_249.2)] text-white'
        } disabled:opacity-75 disabled:cursor-not-allowed`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Preparing your download...
          </>
        ) : (
          <>
            {leadMagnet.buttonText}
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      {/* Privacy microcopy */}
      <p
        className={`text-[12px] leading-relaxed text-center ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}
      >
        Zero spam. You&apos;ll receive the PDF and occasional high-value insights.
      </p>
    </form>
  );
}
