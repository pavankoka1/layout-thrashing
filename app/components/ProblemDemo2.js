"use client";

import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import useFPS from "../hooks/useFPS";

/**
 * Problem Demo 2: Scroll-Based Width Animation
 * This demonstrates layout thrashing in scroll handlers,
 * a very common real-world scenario.
 */
export default function ProblemDemo2() {
  const sidebarRef = useRef(null);
  const tickingRef = useRef(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const fps = useFPS({ enabled: isScrolling });

  useEffect(() => {
    let scrollTimeout = null;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 500);

      if (!sidebarRef.current || tickingRef.current) return;

      tickingRef.current = true;
      requestAnimationFrame(() => {
        const sidebar = sidebarRef.current;
        if (!sidebar) {
          tickingRef.current = false;
          return;
        }

        // BAD: Reading scrollY and writing width causes layout thrashing
        // Every scroll event triggers:
        // 1. Read scrollY (may force layout if browser needs to calculate)
        // 2. Write width → Invalidates layout → Forces reflow
        // Result: Multiple reflows per scroll event!
        const scrollY = window.scrollY;
        const newWidth = 200 + (scrollY % 100);
        sidebar.style.width = newWidth + "px"; // WRITE: Triggers reflow!

        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <Box>
      {/* Explanation */}
      <Box className="mb-6 bg-red-50 border border-red-200 rounded-lg p-5">
        <Typography
          variant="h6"
          className="text-red-900 font-semibold mb-3"
        >
          Why Does FPS Drop During Scroll?
        </Typography>
        <Box component="ul" className="space-y-2 text-slate-700 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1 font-bold">1.</span>
            <span>
              <strong>Scroll events fire rapidly</strong> (often 60+ times per second during fast scrolling).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1 font-bold">2.</span>
            <span>
              Each scroll event <strong>writes to width</strong>, which invalidates layout and triggers reflow.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1 font-bold">3.</span>
            <span>
              <strong>Layout recalculation is expensive</strong>: The browser must recalculate positions of all elements affected by the width change.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1 font-bold">4.</span>
            <span>
              <strong>Main thread blocked</strong>: Layout happens on the main thread, blocking JavaScript execution and causing frame drops.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1 font-bold">5.</span>
            <span>
              <strong>Frame budget exceeded</strong>: Multiple reflows per scroll event × 60 scroll events/second = hundreds of reflows, far exceeding the 16.67ms frame budget.
            </span>
          </li>
        </Box>
      </Box>

      {/* FPS Monitor */}
      <Box className="mb-6 bg-slate-50 rounded-lg p-6 border border-slate-200">
        <Box>
          <Typography
            variant="subtitle2"
            className="text-slate-500 mb-2 font-medium text-xs uppercase tracking-wide"
          >
            Scroll Performance Monitor
          </Typography>
          <Typography
            variant="h3"
            className={`font-bold mb-1 ${
              fps >= 55
                ? "text-emerald-600"
                : fps >= 30
                ? "text-amber-600"
                : "text-red-600"
            }`}
          >
            {fps}
            <span className="text-slate-400 text-lg font-normal ml-1">FPS</span>
          </Typography>
          <Typography variant="body2" className="text-slate-500 text-sm">
            {isScrolling
              ? "Scroll the page to see performance impact"
              : "Start scrolling to see layout thrashing"}
          </Typography>
        </Box>
      </Box>

      {/* Demo */}
      <Box
        className="relative bg-slate-50 rounded-xl border border-slate-200 overflow-hidden"
        style={{ height: "500px" }}
      >
        <Box className="flex h-full">
          <Box
            ref={sidebarRef}
            className="bg-gradient-to-br from-red-500 to-rose-600 text-white p-6 flex flex-col items-center justify-center transition-all shadow-lg"
            style={{
              width: "200px",
              minWidth: "200px",
            }}
          >
            <Typography variant="h5" className="font-bold mb-2 text-center">
              Sidebar
            </Typography>
            <Typography variant="body2" className="text-center text-red-50 mb-4">
              Resizes on scroll
            </Typography>
            <Box className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/30">
              <Typography
                variant="body2"
                className="text-xs text-center text-white font-semibold"
              >
                ❌ Using width
              </Typography>
            </Box>
          </Box>

          <Box className="flex-1 p-8 overflow-y-auto bg-white">
            <Typography variant="h5" className="text-slate-900 mb-3 font-bold">
              Scroll to see layout thrashing
            </Typography>
            <Typography variant="body1" className="text-slate-600 mb-6 leading-relaxed">
              As you scroll, the sidebar width changes based on scroll position.
              This triggers layout recalculation on every scroll event, causing
              the FPS to drop significantly.
            </Typography>
            {Array.from({ length: 30 }).map((_, i) => (
              <Box
                key={i}
                className="mb-5 p-5 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <Typography variant="h6" className="text-slate-900 mb-2 font-semibold">
                  Content Section {i + 1}
                </Typography>
                <Typography variant="body2" className="text-slate-600 leading-relaxed">
                  Keep scrolling to see the performance impact. Notice how the
                  sidebar animation becomes stuttery and the FPS drops. This is
                  layout thrashing in action!
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

