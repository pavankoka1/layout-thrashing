"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Accurate FPS measurement hook that measures actual frame timing
 * Uses requestAnimationFrame timestamps to calculate real FPS
 */
export default function useFPS({ enabled = true, sampleSize = 60 } = {}) {
  const [fps, setFps] = useState(60);
  const timesRef = useRef([]);
  const lastTsRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      setFps(60);
      return;
    }

    function tick(ts) {
      if (lastTsRef.current != null) {
        const dt = ts - lastTsRef.current;
        if (dt > 0) {
          // Calculate instantaneous FPS from frame delta
          const instFps = 1000 / dt;
          timesRef.current.push(instFps);
          
          // Keep only last N samples
          if (timesRef.current.length > sampleSize) {
            timesRef.current.shift();
          }

          // Calculate average FPS from samples
          if (timesRef.current.length >= 10) {
            const avg =
              timesRef.current.reduce((a, b) => a + b, 0) /
              timesRef.current.length;
            const smooth = Math.round(avg * 10) / 10;
            setFps(Math.min(60, Math.max(0, smooth)));
          }
        }
      }
      lastTsRef.current = ts;
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      timesRef.current = [];
      lastTsRef.current = null;
    };
  }, [enabled, sampleSize]);

  return fps;
}

