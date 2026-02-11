"use client";

import { Box, Button, Paper, Typography } from "@mui/material";
import { PlayArrow, Stop, Code } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import useFPS from "../hooks/useFPS";

/**
 * Problem Demo 1: Classic Read-Write Loop
 * This demonstrates the most common layout thrashing pattern:
 * Reading layout properties (offsetHeight, offsetWidth) and then
 * immediately writing layout properties (width, height) in a loop.
 */
export default function ProblemDemo1() {
  const [isRunning, setIsRunning] = useState(false);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const fps = useFPS({ enabled: isRunning });

  // BAD: Read and write interleaved - causes layout thrashing
  const runLayoutThrashing = () => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll(".thrash-item");

    // This is the PROBLEM: Each iteration does:
    // 1. Read offsetHeight → Forces synchronous layout calculation
    // 2. Read offsetWidth → Forces another layout calculation
    // 3. Write height → Invalidates layout, queues reflow
    // 4. Write width → Invalidates layout again, queues another reflow
    // Result: 4 layout calculations per item × 20 items = 80 reflows per frame!
    items.forEach((item) => {
      const height = item.offsetHeight; // READ: Forces reflow
      const width = item.offsetWidth; // READ: Forces reflow
      item.style.height = `${height + 1}px`; // WRITE: Invalidates layout
      item.style.width = `${width + 1}px`; // WRITE: Invalidates layout
    });
  };

  // Animation loop
  useEffect(() => {
    if (!isRunning) return;

    const animate = () => {
      if (isRunning) {
        runLayoutThrashing();
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

  return (
    <Box>
      {/* Explanation */}
      <Box className="mb-6 bg-red-50 border border-red-200 rounded-lg p-5">
        <Typography
          variant="h6"
          className="text-red-900 font-semibold mb-3"
        >
          Why Does FPS Drop Here?
        </Typography>
        <Box component="ul" className="space-y-2 text-slate-700 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1 font-bold">1.</span>
            <span>
              <strong>Reading layout properties</strong> (
              <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-red-200 text-red-700">
                offsetHeight
              </code>
              ,{" "}
              <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-red-200 text-red-700">
                offsetWidth
              </code>
              ) forces the browser to <strong>immediately calculate layout</strong> synchronously.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1 font-bold">2.</span>
            <span>
              <strong>Writing layout properties</strong> (
              <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-red-200 text-red-700">
                width
              </code>
              ,{" "}
              <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-red-200 text-red-700">
                height
              </code>
              ) <strong>invalidates the layout</strong>, requiring recalculation.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1 font-bold">3.</span>
            <span>
              In a loop, this creates a <strong>read-write-read-write cycle</strong>: Each iteration triggers multiple reflows.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1 font-bold">4.</span>
            <span>
              <strong>Layout calculation is expensive</strong>: It traverses the entire DOM tree, calculates positions and sizes for all elements. With 20 items × 4 operations = 80 reflows per frame!
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1 font-bold">5.</span>
            <span>
              <strong>Frame budget exceeded</strong>: At 60fps, you have ~16.67ms per frame. 80 reflows can take 50-200ms, causing massive frame drops and jank.
            </span>
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
            <Typography variant="body2" className="text-slate-500 text-sm">
              {fps < 30
                ? "Severe performance degradation - layout thrashing in action!"
                : fps < 55
                ? "Noticeable performance impact"
                : "Good performance"}
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={() => setIsRunning(!isRunning)}
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

      {/* Demo */}
      <Box
        ref={containerRef}
        className="grid grid-cols-4 gap-4 p-8 bg-slate-50 rounded-xl border border-slate-200 min-h-[350px] mb-6"
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <Box
            key={i}
            className="thrash-item bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg"
            style={{
              width: "100px",
              height: "100px",
            }}
          >
            {i + 1}
          </Box>
        ))}
      </Box>

      {/* Code */}
      <Paper className="bg-slate-900 p-6 rounded-xl border border-slate-800">
        <Typography
          variant="h6"
          className="text-red-400 mb-4 font-semibold flex items-center gap-2"
        >
          <Code className="text-xl" />
          Problematic Code
        </Typography>
        <pre className="text-sm text-slate-300 overflow-x-auto bg-slate-950 p-5 rounded-lg border border-slate-800 leading-relaxed">
          <code>{`// ❌ BAD: Causes layout thrashing
const items = document.querySelectorAll('.item');

items.forEach(item => {
  // READ: Forces browser to calculate layout synchronously (REFLOW #1)
  const height = item.offsetHeight;
  const width = item.offsetWidth; // REFLOW #2
  
  // WRITE: Invalidates layout, forces recalculation (REFLOW #3)
  item.style.height = \`\${height + 1}px\`;
  item.style.width = \`\${width + 1}px\`; // REFLOW #4
  
  // For 20 items: 20 × 4 = 80 reflows per frame!
  // Each reflow takes 1-5ms → 80-400ms total → Frame budget (16.67ms) exceeded!
});

// Result: FPS drops to 10-30, causing severe jank`}</code>
        </pre>
      </Paper>
    </Box>
  );
}

