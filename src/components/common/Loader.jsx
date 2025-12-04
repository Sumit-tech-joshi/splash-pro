import React, { useEffect, useRef, useState } from "react";

/**
 * Fancy Loader for Splash Pro
 *
 * Props:
 *  - durationMs: total max duration (ms)
 *  - logoSrc: imported logo asset or url (pass the same used in Navbar)
 *  - preloadImages: array of image URLs to preload before finishing (optional)
 *  - onFinish: callback when loader ends
 */
export default function Loader({
  durationMs = 1700,
  logoSrc = "/images/logo.svg",
  preloadImages = [],
  onFinish,
}) {
  const overlayRef = useRef(null);
  const sparklesRef = useRef([]);
  const cloneRef = useRef(null);
  const timers = useRef([]);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onFinish?.();
      return;
    }

    // Helper - preload images + fonts
    const preload = async () => {
      const promises = preloadImages.map(src => new Promise(res => {
        const i = new Image();
        i.onload = i.onerror = () => res();
        i.src = src;
      }));
      promises.push(document.fonts ? document.fonts.ready : Promise.resolve());
      await Promise.all(promises);
    };

    let aborted = false;

    (async () => {
      await preload();

      if (aborted) return;

      // show overlay
      if (overlayRef.current) overlayRef.current.style.opacity = "1";

      // small staged timeline
      const now = Date.now();
      const max = Math.max(1000, durationMs);

      // create clone for pixel-perfect flight
      const createClone = () => {
        const clone = document.createElement("img");
        clone.src = logoSrc;
        clone.style.position = "fixed";
        clone.style.zIndex = 80;
        clone.style.willChange = "transform, top, left, width, height, opacity";
        clone.style.pointerEvents = "none";
        clone.style.borderRadius = "6px";
        clone.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";
        document.body.appendChild(clone);
        cloneRef.current = clone;
        return clone;
      };

      // compute center start state
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      const startSize = Math.min(120, Math.max(64, Math.round(Math.min(vw, vh) * 0.12)));
      const startLeft = Math.round(vw / 2 - startSize / 2);
      const startTop = Math.round(vh / 2 - startSize / 2);

      const clone = createClone();
      clone.style.width = `${startSize}px`;
      clone.style.height = `${startSize}px`;
      clone.style.left = `${startLeft}px`;
      clone.style.top = `${startTop}px`;
      clone.style.opacity = "1";
      clone.style.transform = "translate(0,0) scale(1)";
      clone.style.transition = `all ${Math.round(max * 0.45)}ms cubic-bezier(.2,.9,.3,1)`;

      // shimmer: add class to central hidden img (we use CSS shimmer on a hidden center element)
      const shimmerStart = () => {
        const el = document.querySelector(".loader-center-shimmer");
        if (el) el.classList.add("logo-shimmer");
        timers.current.push(setTimeout(() => {
          if (el) el.classList.remove("logo-shimmer");
        }, 650));
      };

      // pop sparkles quickly (CSS animations do visual work)
      const sparklePop = () => {
        // CSS handles initial pop. We'll also occasionally nudge sparkles for trail later.
        // No JS needed for pop itself.
      };

      // After sparkle pop, make some sparkles drift toward clone (trail)
      const sparkleTrail = () => {
        // pick a few sparkles and animate them toward clone center
        const chosen = sparklesRef.current.slice(0, Math.min(4, sparklesRef.current.length));
        if (!clone) return;
        const targetRect = clone.getBoundingClientRect();
        chosen.forEach((s, index) => {
          if (!s) return;
          // make absolute transform relative to viewport
          const rect = s.getBoundingClientRect();
          const dx = targetRect.left + targetRect.width / 2 - (rect.left + rect.width / 2);
          const dy = targetRect.top + targetRect.height / 2 - (rect.top + rect.height / 2);
          // set transition and transform to move
          s.style.transition = `transform ${220 + index * 60}ms cubic-bezier(.2,.9,.3,1), opacity 260ms ease`;
          s.style.transform = `translate(${dx}px, ${dy}px) scale(0.2)`;
          s.style.opacity = "0.95";
        });
      };

      // compute when to fly: after pop + shimmer + trail
      const flyDelay = 480; // ms after showing overlay
      const trailDelay = flyDelay + 260;
      const finishAt = max; // total time from now

      // schedule sequence
      timers.current.push(setTimeout(() => {
        shimmerStart();
        sparklePop();
      }, 120));

      timers.current.push(setTimeout(() => {
        sparkleTrail();
      }, trailDelay));

      timers.current.push(setTimeout(() => {
        // measure header logo
        const headerLogo = document.getElementById("site-logo");
        let finalLeft = 12;
        let finalTop = 12;
        let finalW = 40;
        let finalH = 40;
        if (headerLogo) {
          const r = headerLogo.getBoundingClientRect();
          finalLeft = Math.round(r.left);
          finalTop = Math.round(r.top);
          finalW = Math.round(r.width);
          finalH = Math.round(r.height);
        }

        // animate clone to header rect
        requestAnimationFrame(() => {
          clone.style.width = `${finalW}px`;
          clone.style.height = `${finalH}px`;
          clone.style.left = `${finalLeft}px`;
          clone.style.top = `${finalTop}px`;
          clone.style.transform = `translate(0,0) scale(.94)`;
        });
      }, flyDelay + 200));

      // reveal header logo, pop it, fade overlay, remove clone
      timers.current.push(setTimeout(() => {
        // reveal header logo
        const headerLogo = document.getElementById("site-logo");
        if (headerLogo) {
          headerLogo.classList.remove("hidden-during-loader");
          // add landing pop animation
          headerLogo.classList.add("header-logo-landing");
          // remove pop after it finishes
          setTimeout(() => headerLogo.classList.remove("header-logo-landing"), 420);
        }

        // fade overlay
        if (overlayRef.current) {
          overlayRef.current.style.transition = "opacity 260ms ease";
          overlayRef.current.style.opacity = "0";
        }

        // remove clone after fade
        setTimeout(() => {
          try {
            clone.remove();
          } catch (e) {}
          onFinish?.();
        }, 260);
      }, finishAt));

    })();

    // cleanup on unmount or skip
    return () => {
      timers.current.forEach(t => clearTimeout(t));
      timers.current = [];
      if (cloneRef.current) {
        try { cloneRef.current.remove(); } catch (e) {}
      }
      aborted = true;
    };
  }, [durationMs, logoSrc, preloadImages, onFinish]);

  // Skip handler
  const handleSkip = () => {
    setSkipped(true);
    // clear timers and finish immediately
    // remove clone and reveal header logo
    if (overlayRef.current) overlayRef.current.style.opacity = "0";
    const headerLogo = document.getElementById("site-logo");
    if (headerLogo) headerLogo.classList.remove("hidden-during-loader");
    // remove clone
    if (cloneRef.current) {
      try { cloneRef.current.remove(); } catch (e) {}
    }
    // clear any remaining timers
    // (timers may be cleared by cleanup in effect; we remove explicitly)
    onFinish?.();
  };

  // Render DOM: overlay + invisible centered logo (for shimmer effect) + sparkles + skip button
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      style={{ opacity: 0, transition: "opacity 220ms ease" }}
      aria-hidden="true"
    >
      {/* backdrop */}
      <div className="absolute inset-0 loader-backdrop" />

      {/* skip button */}
      <button
        onClick={handleSkip}
        aria-label="Skip intro"
        className="absolute top-4 right-4 z-60 text-xs sm:text-sm px-3 py-1 bg-white/80 backdrop-blur-sm rounded-md pointer-events-auto hover:bg-white"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        Skip
      </button>

      {/* center: invisible actual img for shimmer class toggling (logo-shimmer) */}
      <div className="relative z-40 flex items-center justify-center w-full h-full">
        <img
          src={logoSrc}
          alt="Splash Pro"
          className="loader-center-shimmer w-48 h-48 sm:w-28 sm:h-28 opacity-0 pointer-events-none"
        />
      </div>

      {/* sparkles */}
      <div className="absolute w-[220px] h-[220px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
        {Array.from({ length: (typeof window !== "undefined" && window.innerWidth < 640) ? 6 : 12 }).map((_, i) => (
          <span
            key={i}
            ref={el => sparklesRef.current[i] = el}
            className={`block absolute sparkle sparkle-${i}`}
            style={{ opacity: 0 }}
          />
        ))}
      </div>
    </div>
  );
}