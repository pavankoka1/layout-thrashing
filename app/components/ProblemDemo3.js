"use client";

import { Box, Button, Typography } from "@mui/material";
import { PlayArrow, Stop, Code } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import useFPS from "../hooks/useFPS";

/**
 * Problem Demo 3: Dynamic Grid Layout
 * This demonstrates layout thrashing when dynamically
 * calculating grid item positions based on other items.
 */
export default function ProblemDemo3() {
  const [isRunning, setIsRunning] = useState(false);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const fps = useFPS({ enabled: isRunning });

  // BAD: Calculating positions based on previous items causes layout thrashing
  const runDynamicGrid = () => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll(".grid-item");
    let currentTop = 0;
    let currentLeft = 0;
    const rowHeight = 100;
    const itemsPerRow = 4;

    // This is the PROBLEM: Each iteration reads layout properties
    // of previous items to calculate current position
    items.forEach((item, index) => {
      if (index > 0) {
        // READ: Get position of previous item - forces layout calculation
        const prevItem = items[index - 1];
        const prevTop = prevItem.offsetTop; // Forces reflow
        const prevLeft = prevItem.offsetLeft; // Forces reflow
        const prevHeight = prevItem.offsetHeight; // Forces reflow

        // Calculate position based on previous item
        if (index % itemsPerRow === 0) {
          currentTop = prevTop + prevHeight + 10;
          currentLeft = 0;
        } else {
          currentTop = prevTop;
          currentLeft = prevLeft + prevItem.offsetWidth + 10; // Forces another reflow
        }
      }

      // WRITE: Set position - invalidates layout, triggers reflow
      item.style.top = currentTop + "px";
      item.style.left = currentLeft + "px";
    });
  };

  useEffect(() => {
    if (!isRunning) return;

    const animate = () => {
      if (isRunning) {
        runDynamicGrid();
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
          Why Does FPS Drop in Dynamic Grids?
        </Typography>
        <Box component="ul" className="space-y-2 text-slate-700 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1 font-bold">1.</span>
            <span>
              <strong>Position calculations depend on previous items</strong>: To calculate where item N should be, we need to read the position of item N-1.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1 font-bold">2.</span>
            <span>
              <strong>Each read forces layout</strong>: Reading <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-red-200 text-red-700">offsetTop</code>, <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-red-200 text-red-700">offsetLeft</code>, <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-red-200 text-red-700">offsetWidth</code> forces synchronous layout calculation.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1 font-bold">3.</span>
            <span>
              <strong>Cascade effect</strong>: When we write to item N's position, it invalidates layout. Then when we read item N+1, we force another layout calculation.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1 font-bold">4.</span>
            <span>
              <strong>Exponential cost</strong>: For N items, we do N reads and N writes = 2N layout calculations, but each write invalidates layout, so subsequent reads trigger additional calculations.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1 font-bold">5.</span>
            <span>
              <strong>Result</strong>: O(n²) complexity in worst case, causing severe performance degradation with many items.
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
                ? "Severe performance degradation"
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
        className="relative bg-slate-50 rounded-xl border border-slate-200 p-8 min-h-[400px] mb-6"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <Box
            key={i}
            className="grid-item bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg absolute"
            style={{
              width: "150px",
              height: "100px",
            }}
          >
            {i + 1}
          </Box>
        ))}
      </Box>

      {/* Code */}
      <Box className="bg-slate-900 p-6 rounded-xl border border-slate-800">
        <Typography
          variant="h6"
          className="text-red-400 mb-4 font-semibold flex items-center gap-2"
        >
          <Code className="text-xl" />
          Problematic Code
        </Typography>
        <pre className="text-sm text-slate-300 overflow-x-auto bg-slate-950 p-5 rounded-lg border border-slate-800 leading-relaxed">
          <code>{`// ❌ BAD: Causes layout thrashing in dynamic grids
const items = document.querySelectorAll('.grid-item');

items.forEach((item, index) => {
  if (index > 0) {
    // READ: Forces layout calculation for each previous item
    const prevItem = items[index - 1];
    const prevTop = prevItem.offsetTop;      // REFLOW
    const prevLeft = prevItem.offsetLeft;    // REFLOW
    const prevHeight = prevItem.offsetHeight; // REFLOW
    const prevWidth = prevItem.offsetWidth;   // REFLOW
    
    // Calculate position based on previous item
    // ... calculation logic ...
  }
  
  // WRITE: Invalidates layout, triggers reflow
  item.style.top = calculatedTop + 'px';   // REFLOW
  item.style.left = calculatedLeft + 'px'; // REFLOW
});

// For 12 items: ~24-48 reflows per frame!
// Each reflow: 1-5ms → 24-240ms total → Frame budget exceeded!`}</code>
        </pre>
      </Box>
    </Box>
  );
}

