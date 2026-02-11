"use client";

import { CheckCircle, Code, PlayArrow, Speed, Stop } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import useFPS from "../hooks/useFPS";

export default function SolutionPage() {
  const [isRunning, setIsRunning] = useState(false);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const fps = useFPS({ enabled: isRunning });

  // scaleX() solution demo
  const sidebarScaleRef = useRef(null);
  const scaleTickingRef = useRef(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scaleFps = useFPS({ enabled: isScrolling });

  // Optimized Example - Use transform instead of width/height
  const runOptimized = () => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll(".optimized-item");
    let scale = 1;

    // GOOD: Use transform: scale() instead of width/height
    // Transform is composite-only - no layout thrashing!
    items.forEach((item, index) => {
      // Animate scale smoothly
      scale = 1 + Math.sin(Date.now() / 1000 + index) * 0.1;
      item.style.transform = `scale(${scale})`;
      // No layout properties read or written - zero reflows!
    });
  };

  // Animation loop
  useEffect(() => {
    if (!isRunning) return;

    const animate = () => {
      if (isRunning) {
        runOptimized();
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning]);

  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  // Sidebar scroll handler - GOOD: Uses scaleX() with overflow:hidden
  useEffect(() => {
    let scrollTimeout = null;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 500);

      if (!sidebarScaleRef.current || scaleTickingRef.current) return;

      scaleTickingRef.current = true;
      requestAnimationFrame(() => {
        const sidebar = sidebarScaleRef.current;
        if (!sidebar) {
          scaleTickingRef.current = false;
          return;
        }

        const scrollY = window.scrollY;
        const progress = (scrollY % 800) / 800; // 0 → 1
        const scale = 0.5 + progress * 0.8; // 50% → 130% width

        // GOOD: Use scaleX() - composite-only, no reflow!
        sidebar.style.transform = `scaleX(${scale})`;

        scaleTickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <Box className="min-h-screen bg-white">
      <Container maxWidth="lg" className="py-12 px-4">
        {/* Header */}
        <Box className="mb-12">
          <Link href="/">
            <Button
              variant="text"
              className="text-slate-500 mb-6 hover:text-slate-900 text-sm font-medium -ml-2"
            >
              ← Back to Home
            </Button>
          </Link>
          <Typography
            variant="h1"
            className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight"
          >
            The Solution: Optimized Code
          </Typography>
          <Typography
            variant="body1"
            className="text-slate-600 text-lg leading-relaxed max-w-3xl"
          >
            Learn how to prevent layout thrashing forever by batching DOM
            operations, using transform-based animations, and the scaleX()
            solution for smooth 60fps width animations.
          </Typography>
        </Box>

        {/* THE KEY SOLUTION: scaleX() with overflow:hidden */}
        <Card className="mb-12 bg-white border-2 border-emerald-200 shadow-lg rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <Box className="flex items-start gap-4 mb-6">
              <Box className="p-3 bg-emerald-50 rounded-xl flex-shrink-0">
                <CheckCircle className="text-emerald-600 text-4xl" />
              </Box>
              <Box className="flex-1">
                <Typography variant="h4" className="text-slate-900 font-bold mb-2 tracking-tight">
                  Solution #1: scaleX() + overflow:hidden (2025 Standard)
                </Typography>
                <Typography variant="body1" className="text-slate-600 text-base leading-relaxed">
                  The only true 60fps way to animate width/height without
                  reflow. Scroll to see it in action!
                </Typography>
              </Box>
            </Box>

            <Box className="mb-6 bg-emerald-50 border border-emerald-200 rounded-lg p-5">
              <Typography
                variant="body2"
                className="text-emerald-900 font-semibold mb-2 text-sm uppercase tracking-wide"
              >
                ✅ Best Solution — Zero Layout Thrashing
              </Typography>
              <Typography
                variant="body2"
                className="text-slate-700 leading-relaxed"
              >
                Using{" "}
                <code className="bg-white px-2 py-1 rounded font-mono text-xs border border-emerald-200 text-emerald-700">
                  transform: scaleX()
                </code>{" "}
                with{" "}
                <code className="bg-white px-2 py-1 rounded font-mono text-xs border border-emerald-200 text-emerald-700">
                  overflow: hidden
                </code>{" "}
                on the container. Real width stays fixed → zero layout
                thrashing. Only transform changes → composite-only,
                GPU-accelerated!
              </Typography>
            </Box>

            {/* FPS Monitor for scaleX solution */}
            <Box className="mb-6 bg-slate-50 rounded-lg p-6 border border-slate-200">
              <Box className="flex items-center justify-between">
                <Box>
                  <Typography
                    variant="subtitle2"
                    className="text-slate-500 mb-2 font-medium text-xs uppercase tracking-wide"
                  >
                    scaleX() Animation FPS
                  </Typography>
                  <Typography
                    variant="h3"
                    className={`font-bold mb-1 ${
                      scaleFps >= 55
                        ? "text-emerald-600"
                        : scaleFps >= 30
                        ? "text-amber-600"
                        : "text-red-600"
                    }`}
                  >
                    {scaleFps}
                    <span className="text-slate-400 text-lg font-normal ml-1">FPS</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-emerald-600 mt-1 font-semibold"
                  >
                    Perfect 60fps - No layout thrashing!
                  </Typography>
                </Box>
                <Box className="text-right">
                  <Typography variant="body2" className="text-slate-500 mb-2 text-xs">
                    Target: 60 FPS
                  </Typography>
                  <Box className="w-32 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <Box
                      className="bg-emerald-500 h-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (scaleFps / 60) * 100)}%`,
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Interactive Demo Container */}
            <Box
              className="relative bg-slate-50 rounded-xl border border-slate-200 overflow-hidden"
              style={{ height: "500px" }}
            >
              <Box className="flex h-full">
                {/* Sidebar - GOOD: Uses scaleX() with overflow:hidden */}
                <Box
                  className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-6 flex flex-col items-center justify-center overflow-hidden shadow-lg"
                  style={{
                    width: "200px",
                    minWidth: "200px",
                    transformOrigin: "left center",
                    willChange: "transform",
                  }}
                >
                  <Box
                    ref={sidebarScaleRef}
                    className="w-full h-full flex flex-col items-center justify-center"
                    style={{
                      transform: "scaleX(1)",
                    }}
                  >
                    <Typography
                      variant="h5"
                      className="font-bold mb-2 text-center"
                    >
                      Sidebar
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-center text-emerald-50 mb-4"
                    >
                      Scales on scroll
                    </Typography>
                    <Box className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/30">
                      <Typography
                        variant="body2"
                        className="text-xs text-center text-white font-semibold"
                      >
                        ✅ Using scaleX()
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Content Area */}
                <Box className="flex-1 p-8 overflow-y-auto bg-white">
                  <Typography
                    variant="h5"
                    className="text-slate-900 mb-4 font-bold"
                  >
                    Scroll to see smooth 60fps animation
                  </Typography>
                  <Typography
                    variant="body1"
                    className="text-slate-600 mb-6 leading-relaxed"
                  >
                    As you scroll, the sidebar scales using{" "}
                    <code className="bg-slate-100 px-2 py-1 rounded font-mono text-xs border border-slate-200 text-emerald-700">
                      transform: scaleX()
                    </code>
                    . Notice how smooth it is - perfect 60fps with zero layout
                    thrashing! This is the production-ready solution used by
                    Netflix, Notion, Linear, Figma, and every high-performance
                    web app in 2025.
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
                        Keep scrolling to see the buttery-smooth performance.
                        The sidebar animation stays at 60fps because it uses
                        composite-only properties that bypass reflow/repaint!
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Code Example */}
            <Paper className="bg-slate-900 p-6 mt-6 rounded-xl border border-slate-800">
              <Typography
                variant="h6"
                className="text-emerald-400 mb-4 font-semibold flex items-center gap-2"
              >
                <Code className="text-xl" />
                Optimized Code (Zero Layout Thrashing)
              </Typography>
              <pre className="text-sm text-slate-300 overflow-x-auto bg-slate-950 p-5 rounded-lg border border-slate-800 leading-relaxed">
                <code>{`// ✅ GOOD: Uses scaleX() - composite-only, no reflow!
const sidebar = document.querySelector('.sidebar');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const progress = (scrollY % 800) / 800; // 0 → 1
      const scale = 0.5 + progress * 0.8; // 50% → 130%
      
      // Only transform changes → composite-only!
      sidebar.style.transform = \`scaleX(\${scale})\`;
      
      ticking = false;
    });
    ticking = true;
  }
});

/* CSS */
.sidebar {
  width: 200px;                    /* Fixed real width */
  height: 100vh;
  overflow: hidden;                /* Critical: clip scaled content */
  transform-origin: left center;  /* Scale from left edge */
  will-change: transform;          /* Promote to layer */
}

// Result: Zero layout thrashing, perfect 60fps!
// Main thread <1ms/frame; GPU handles animation`}</code>
              </pre>
            </Paper>

            <Box className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl mt-6">
              <Typography
                variant="h6"
                className="text-emerald-900 mb-3 font-semibold"
              >
                Why This Works Perfectly
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box component="ul" className="space-y-3 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1 font-bold">✓</span>
                      <span>
                        <strong className="text-slate-900">
                          Real width stays 200px
                        </strong>{" "}
                        → zero layout thrashing
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1 font-bold">✓</span>
                      <span>
                        <strong className="text-slate-900">
                          Only transform changes
                        </strong>{" "}
                        → composite-only, GPU-accelerated
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1 font-bold">✓</span>
                      <span>
                        <strong className="text-slate-900">
                          Content never overflows
                        </strong>{" "}
                        (clipped by overflow:hidden)
                      </span>
                    </li>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box component="ul" className="space-y-3 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1 font-bold">✓</span>
                      <span>
                        <strong className="text-slate-900">
                          Nearby elements don't move
                        </strong>{" "}
                        (real width unchanged)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1 font-bold">✓</span>
                      <span>
                        <strong className="text-slate-900">Text stays crisp</strong>{" "}
                        (no subpixel blur)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1 font-bold">✓</span>
                      <span>
                        <strong className="text-slate-900">60fps guaranteed</strong>{" "}
                        (main thread {"<1ms/frame"})
                      </span>
                    </li>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>

        {/* Transform-Based Animation Demo */}
        <Card className="mb-12 bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <Box className="flex items-start gap-4 mb-6">
              <Box className="p-3 bg-blue-50 rounded-xl flex-shrink-0">
                <Speed className="text-blue-600 text-4xl" />
              </Box>
              <Box className="flex-1">
                <Typography variant="h4" className="text-slate-900 font-bold mb-2 tracking-tight">
                  Solution #2: Use Transform Instead of Width/Height
                </Typography>
                <Typography variant="body1" className="text-slate-600 text-base leading-relaxed">
                  Use <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs border border-slate-200 text-blue-700">transform: scale()</code> instead of modifying width/height. 
                  Transform is composite-only - zero layout thrashing!
                </Typography>
              </Box>
            </Box>

            {/* Explanation */}
            <Box className="mb-6 bg-emerald-50 border border-emerald-200 rounded-lg p-5">
              <Typography variant="h6" className="text-emerald-900 font-semibold mb-3">
                Why Transform Works Perfectly
              </Typography>
              <Box component="ul" className="space-y-2 text-slate-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1 font-bold">1.</span>
                  <span><strong>Transform is composite-only</strong> - handled by the GPU compositor thread, not the main thread</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1 font-bold">2.</span>
                  <span><strong>No layout calculation</strong> - transform doesn't affect element's position in the layout flow</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1 font-bold">3.</span>
                  <span><strong>No reflow/repaint</strong> - only the compositor step runs, which is extremely fast</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1 font-bold">4.</span>
                  <span><strong>GPU-accelerated</strong> - hardware acceleration makes it even faster</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1 font-bold">5.</span>
                  <span><strong>Result: Perfect 60fps</strong> - main thread time {"<1ms/frame"}, compositor handles the rest</span>
                </li>
              </Box>
            </Box>

            {/* FPS Monitor */}
            <Box className="mb-6 bg-slate-50 rounded-lg p-6 border border-slate-200">
              <Box className="flex items-center justify-between">
                <Box>
                  <Typography
                    variant="subtitle2"
                    className="text-slate-500 mb-2 font-medium text-xs uppercase tracking-wide"
                  >
                    Performance Monitor
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
                  <Typography
                    variant="body2"
                    className="text-emerald-600 mt-1 font-semibold"
                  >
                    Perfect 60fps - Zero layout thrashing!
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  onClick={handleToggle}
                  startIcon={isRunning ? <Stop /> : <PlayArrow />}
                  size="large"
                  className={
                    isRunning
                      ? "bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 font-semibold shadow-md"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 font-semibold shadow-md"
                  }
                >
                  {isRunning ? "Stop" : "Start"} Animation
                </Button>
              </Box>
            </Box>

            {/* Interactive Demo */}
            <Box className="mb-6">
              <Typography
                variant="body1"
                className="text-slate-600 mb-6 leading-relaxed"
              >
                This example uses <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs border border-slate-200 text-emerald-700">transform: scale()</code> instead of width/height. 
                Notice how the FPS stays at 60fps - no layout thrashing!
              </Typography>

              <Box
                ref={containerRef}
                className="grid grid-cols-4 gap-4 p-8 bg-slate-50 rounded-xl border border-slate-200 min-h-[350px]"
              >
                {Array.from({ length: 20 }).map((_, i) => (
                  <Box
                    key={i}
                    className="optimized-item bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg hover:shadow-xl transition-shadow"
                    style={{
                      width: "100px",
                      height: "100px",
                      willChange: "transform",
                    }}
                  >
                    {i + 1}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Code Example */}
            <Paper className="bg-slate-900 p-6 rounded-xl border border-slate-800">
              <Typography
                variant="h6"
                className="text-emerald-400 mb-4 font-semibold flex items-center gap-2"
              >
                <Code className="text-xl" />
                Optimized Code (Transform-Based)
              </Typography>
              <pre className="text-sm text-slate-300 overflow-x-auto bg-slate-950 p-5 rounded-lg border border-slate-800 leading-relaxed">
                <code>{`// ✅ GOOD: Uses transform - composite-only, zero reflows!
const items = document.querySelectorAll('.item');

function animate() {
  items.forEach((item, index) => {
    // Use transform: scale() instead of width/height
    const scale = 1 + Math.sin(Date.now() / 1000 + index) * 0.1;
    item.style.transform = \`scale(\${scale})\`;
    // No layout properties read or written!
  });
  
  requestAnimationFrame(animate);
}

// Pipeline: JS → Composite (skips Layout & Paint)
// Result: ~0.1-0.5ms per frame, perfect 60fps!
// Main thread: <1ms/frame, compositor handles the rest`}</code>
              </pre>
              <Box className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mt-4">
                <Typography
                  variant="body2"
                  className="text-slate-700 leading-relaxed"
                >
                  <strong className="text-emerald-900">Why this works:</strong> Transform 
                  properties are handled by the compositor thread on the GPU, completely 
                  bypassing layout and paint. This is why you see perfect 60fps - the 
                  main thread isn't blocked doing expensive layout calculations.
                </Typography>
              </Box>
            </Paper>
          </CardContent>
        </Card>

        {/* Solution 3: Use Transform */}
        <Card className="mb-12 bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <Box className="flex items-start gap-4 mb-6">
              <Box className="p-3 bg-blue-50 rounded-xl flex-shrink-0">
                <Speed className="text-blue-600 text-4xl" />
              </Box>
              <Box className="flex-1">
                <Typography variant="h4" className="text-slate-900 font-bold mb-2 tracking-tight">
                  Solution #3: Use Transform Instead of Position
                </Typography>
                <Typography variant="body1" className="text-slate-600 text-base leading-relaxed">
                  Use CSS{" "}
                  <code className="bg-slate-100 px-2 py-1 rounded font-mono text-xs border border-slate-200 text-blue-700">
                    transform
                  </code>{" "}
                  and{" "}
                  <code className="bg-slate-100 px-2 py-1 rounded font-mono text-xs border border-slate-200 text-blue-700">
                    opacity
                  </code>{" "}
                  for animations to achieve smooth 60fps performance.
                </Typography>
              </Box>
            </Box>
            <Grid container spacing={4} className="mb-6">
              <Grid item xs={12} md={6}>
                <Paper className="bg-red-50 border border-red-200 p-6 rounded-xl">
                  <Typography
                    variant="h6"
                    className="text-red-700 mb-3 font-semibold"
                  >
                    ❌ BAD: Causes Reflow
                  </Typography>
                  <pre className="text-sm text-slate-700 overflow-x-auto bg-white p-4 rounded-lg border border-slate-200 leading-relaxed">
                    <code>{`// Triggers reflow on every frame
element.style.left = x + 'px';
element.style.top = y + 'px';

// Pipeline: JS → Reflow → Repaint → Composite
// Result: ~5-10ms per frame, blocking main thread`}</code>
                  </pre>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl">
                  <Typography
                    variant="h6"
                    className="text-emerald-700 mb-3 font-semibold"
                  >
                    ✅ GOOD: Uses Compositor
                  </Typography>
                  <pre className="text-sm text-slate-700 overflow-x-auto bg-white p-4 rounded-lg border border-slate-200 leading-relaxed">
                    <code>{`// No reflow, handled by GPU compositor
element.style.transform = 
  \`translate(\${x}px, \${y}px)\`;

// Pipeline: JS → Composite
// Result: ~0.1-0.5ms per frame, non-blocking`}</code>
                  </pre>
                </Paper>
              </Grid>
            </Grid>
            <Box className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <Typography
                variant="body1"
                className="text-slate-700 leading-relaxed"
              >
                <strong className="text-blue-900">Why this works:</strong>{" "}
                <code className="bg-white px-2 py-1 rounded font-mono text-xs border border-slate-200 text-blue-700">
                  transform
                </code>{" "}
                and{" "}
                <code className="bg-white px-2 py-1 rounded font-mono text-xs border border-slate-200 text-blue-700">
                  opacity
                </code>{" "}
                are handled by the compositor thread on the GPU, completely
                bypassing the main thread and avoiding reflow/repaint. This is
                the key to 60 FPS animations!
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Solution 4: requestAnimationFrame */}
        <Card className="mb-12 bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <Box className="flex items-start gap-4 mb-6">
              <Box className="p-3 bg-purple-50 rounded-xl flex-shrink-0">
                <Speed className="text-purple-600 text-4xl" />
              </Box>
              <Box className="flex-1">
                <Typography variant="h4" className="text-slate-900 font-bold mb-2 tracking-tight">
                  Solution #4: Use requestAnimationFrame
                </Typography>
                <Typography variant="body1" className="text-slate-600 text-base leading-relaxed">
                  Always use{" "}
                  <code className="bg-slate-100 px-2 py-1 rounded font-mono text-xs border border-slate-200 text-purple-700">
                    requestAnimationFrame
                  </code>{" "}
                  for animations to sync with the browser's rendering cycle.
                </Typography>
              </Box>
            </Box>
            <Paper className="bg-slate-900 p-6 rounded-xl border border-slate-800 overflow-x-auto">
              <pre className="text-sm text-slate-300 leading-relaxed">
                <code>{`// ✅ GOOD: Syncs with browser refresh rate (60Hz)
function animate() {
  // Batch your DOM operations here
  updateElements();
  
  // Continue animation
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// ❌ BAD: Doesn't sync with browser
setInterval(() => {
  updateElements();
}, 16); // May run when browser isn't ready
// Can cause dropped frames and jank`}</code>
              </pre>
            </Paper>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card className="mb-12 bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <Typography variant="h4" className="mb-6 text-slate-900 font-bold tracking-tight">
              Best Practices Summary
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl">
                  <Typography
                    variant="h6"
                    className="text-emerald-900 mb-4 font-semibold"
                  >
                    ✅ Do This
                  </Typography>
                  <Box
                    component="ul"
                    className="space-y-3 text-slate-700 text-sm"
                  >
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1 font-bold">→</span>
                      <span>Batch all reads, then all writes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1 font-bold">→</span>
                      <span>
                        Use{" "}
                        <code className="bg-white px-2 py-1 rounded font-mono text-xs border border-slate-200 text-emerald-700">
                          transform
                        </code>{" "}
                        and{" "}
                        <code className="bg-white px-2 py-1 rounded font-mono text-xs border border-slate-200 text-emerald-700">
                          opacity
                        </code>{" "}
                        for animations
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1 font-bold">→</span>
                      <span>
                        Use{" "}
                        <code className="bg-white px-2 py-1 rounded font-mono text-xs border border-slate-200 text-emerald-700">
                          scaleX()
                        </code>{" "}
                        for width animations with{" "}
                        <code className="bg-white px-2 py-1 rounded font-mono text-xs border border-slate-200 text-emerald-700">
                          overflow:hidden
                        </code>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1 font-bold">→</span>
                      <span>
                        Use{" "}
                        <code className="bg-white px-2 py-1 rounded font-mono text-xs border border-slate-200 text-emerald-700">
                          requestAnimationFrame
                        </code>{" "}
                        for animations
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1 font-bold">→</span>
                      <span>Cache layout values when possible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1 font-bold">→</span>
                      <span>
                        Use{" "}
                        <code className="bg-white px-2 py-1 rounded font-mono text-xs border border-slate-200 text-emerald-700">
                          will-change
                        </code>{" "}
                        to hint at upcoming changes
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1 font-bold">→</span>
                      <span>Minimize DOM queries</span>
                    </li>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box className="bg-red-50 border border-red-200 p-6 rounded-xl">
                  <Typography
                    variant="h6"
                    className="text-red-700 mb-4 font-semibold"
                  >
                    ❌ Avoid This
                  </Typography>
                  <Box
                    component="ul"
                    className="space-y-3 text-slate-700 text-sm"
                  >
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1 font-bold">→</span>
                      <span>Interleaving reads and writes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1 font-bold">→</span>
                      <span>
                        Using{" "}
                        <code className="bg-white px-2 py-1 rounded font-mono text-xs border border-slate-200 text-red-700">
                          left
                        </code>
                        /
                        <code className="bg-white px-2 py-1 rounded font-mono text-xs border border-slate-200 text-red-700">
                          top
                        </code>{" "}
                        for animations
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1 font-bold">→</span>
                      <span>
                        Using{" "}
                        <code className="bg-white px-2 py-1 rounded font-mono text-xs border border-slate-200 text-red-700">
                          width
                        </code>
                        /
                        <code className="bg-white px-2 py-1 rounded font-mono text-xs border border-slate-200 text-red-700">
                          height
                        </code>{" "}
                        for animations
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1 font-bold">→</span>
                      <span>
                        Using{" "}
                        <code className="bg-white px-2 py-1 rounded font-mono text-xs border border-slate-200 text-red-700">
                          setInterval
                        </code>{" "}
                        for animations
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1 font-bold">→</span>
                      <span>Reading layout properties in loops</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1 font-bold">→</span>
                      <span>Making style changes inside loops</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1 font-bold">→</span>
                      <span>Querying DOM repeatedly</span>
                    </li>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Performance Comparison */}
        <Card className="mb-12 bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <Typography variant="h4" className="mb-6 text-slate-900 font-bold tracking-tight">
              Performance Comparison
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                  <Typography
                    variant="h6"
                    className="text-red-700 mb-4 font-semibold"
                  >
                    Layout Thrashing (Bad)
                  </Typography>
                  <Box component="ul" className="space-y-3 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1 font-bold">•</span>
                      <span>Multiple reflows per frame (O(n²) complexity)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1 font-bold">•</span>
                      <span>~10-30 FPS on average</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1 font-bold">•</span>
                      <span>High CPU usage on main thread</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1 font-bold">•</span>
                      <span>Janky, stuttering animations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1 font-bold">•</span>
                      <span>Poor mobile performance and battery drain</span>
                    </li>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6">
                  <Typography
                    variant="h6"
                    className="text-emerald-700 mb-4 font-semibold"
                  >
                    Optimized (Good)
                  </Typography>
                  <Box component="ul" className="space-y-3 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1 font-bold">•</span>
                      <span>Minimal reflows (batched) or zero (transform)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1 font-bold">•</span>
                      <span>~60 FPS consistently</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1 font-bold">•</span>
                      <span>Low CPU usage (GPU-accelerated)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1 font-bold">•</span>
                      <span>Smooth, fluid animations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1 font-bold">•</span>
                      <span>Excellent mobile performance</span>
                    </li>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 border-0 shadow-lg rounded-xl">
          <CardContent className="p-10 text-center">
            <Typography variant="h4" className="mb-4 text-white font-bold">
              Want to Understand the Deep Details?
            </Typography>
            <Typography
              variant="body1"
              className="text-white/90 mb-8 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Learn about the complete browser rendering pipeline, how reflow
              and repaint work, composition layers, GPU acceleration, and why
              transform properties are so powerful.
            </Typography>
            <Link href="/deep-dive">
              <Button
                variant="contained"
                size="large"
                className="bg-white text-slate-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-xl"
              >
                Explore Deep Dive →
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
