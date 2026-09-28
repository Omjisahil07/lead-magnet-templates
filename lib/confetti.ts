import confetti from 'canvas-confetti';

/**
 * Fires a celebratory canvas-based confetti animation when a visitor
 * successfully captures a lead magnet.
 */
export function fireLeadCaptureConfetti() {
  if (typeof window === 'undefined') return;

  // Respect user preference for reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const count = 160;
  const defaults: confetti.Options = {
    origin: { y: 0.65 },
    colors: ['#2563eb', '#38bdf8', '#10b981', '#f59e0b', '#6366f1', '#06b6d4'],
    disableForReducedMotion: true,
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Multi-stage burst sequence for natural, realistic celebration arc
  fire(0.25, {
    spread: 30,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.85,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}
