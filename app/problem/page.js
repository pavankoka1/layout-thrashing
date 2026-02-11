"use client";

import { Box, Button, Card, CardContent, Container, Typography } from "@mui/material";
import Link from "next/link";
import ProblemDemos from "../components/ProblemDemos";

export default function ProblemPage() {
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
            The Problem: Layout Thrashing
          </Typography>
          <Typography
            variant="body1"
            className="text-slate-600 text-lg leading-relaxed max-w-3xl"
          >
            See layout thrashing in action with real-world examples. These demos
            show how interleaving DOM reads and writes causes severe performance
            issues, stuttering animations, and dropped frames.
          </Typography>
        </Box>

        {/* Comprehensive Explanation */}
        <Card className="mb-12 bg-slate-50 border border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <Typography variant="h3" className="text-slate-900 font-bold mb-6 tracking-tight">
              Why Does FPS Drop? Understanding Layout Thrashing
            </Typography>
            
            <Box className="space-y-6">
              <Box className="bg-white rounded-lg p-6 border border-slate-200">
                <Typography variant="h5" className="text-slate-900 font-semibold mb-3">
                  1. What is Layout (Reflow)?
                </Typography>
                <Typography variant="body1" className="text-slate-700 leading-relaxed mb-3">
                  Layout (also called "reflow" in Firefox) is the browser's process of calculating 
                  element sizes and positions based on CSS, content, and parent constraints. It's 
                  expensive because:
                </Typography>
                <Box component="ul" className="space-y-2 text-slate-700 ml-4">
                  <li>• <strong>It's often global</strong> - changing one element can affect many others</li>
                  <li>• <strong>It requires tree traversal</strong> - the browser must walk through the DOM tree</li>
                  <li>• <strong>It's synchronous</strong> - blocks the main thread until complete</li>
                  <li>• <strong>Complexity scales with DOM size</strong> - more elements = more work</li>
                </Box>
              </Box>

              <Box className="bg-white rounded-lg p-6 border border-slate-200">
                <Typography variant="h5" className="text-slate-900 font-semibold mb-3">
                  2. What Causes Layout Thrashing?
                </Typography>
                <Typography variant="body1" className="text-slate-700 leading-relaxed mb-3">
                  Layout thrashing occurs when JavaScript forces the browser to recalculate layout 
                  multiple times within the same frame. This happens when:
                </Typography>
                <Box component="ul" className="space-y-2 text-slate-700 ml-4">
                  <li>• <strong>Reading layout properties</strong> (e.g., <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">offsetWidth</code>) forces immediate synchronous layout</li>
                  <li>• <strong>Writing layout properties</strong> (e.g., <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">style.width</code>) invalidates layout, requiring recalculation</li>
                  <li>• <strong>Interleaving reads and writes</strong> creates a read-write-read-write cycle</li>
                  <li>• <strong>In loops</strong>, this causes dozens of reflows per frame</li>
                </Box>
              </Box>

              <Box className="bg-white rounded-lg p-6 border border-slate-200">
                <Typography variant="h5" className="text-slate-900 font-semibold mb-3">
                  3. Why Does This Cause FPS Drops?
                </Typography>
                <Typography variant="body1" className="text-slate-700 leading-relaxed mb-3">
                  At 60fps, you have approximately <strong>16.67 milliseconds per frame</strong>. 
                  Here's what happens:
                </Typography>
                <Box component="ul" className="space-y-2 text-slate-700 ml-4">
                  <li>• <strong>Each layout calculation takes 1-5ms</strong> (depending on DOM complexity)</li>
                  <li>• <strong>Layout thrashing causes 20-100+ reflows per frame</strong> in bad cases</li>
                  <li>• <strong>Total time: 20-500ms</strong> - far exceeding the 16.67ms budget</li>
                  <li>• <strong>Result: Frame drops</strong> - browser can't render in time, causing jank</li>
                  <li>• <strong>CPU spikes</strong> - main thread is blocked doing layout calculations</li>
                </Box>
              </Box>

              <Box className="bg-red-50 border border-red-200 rounded-lg p-6">
                <Typography variant="h5" className="text-red-900 font-semibold mb-3">
                  Example: Read-Write Loop
                </Typography>
                <Typography variant="body1" className="text-slate-700 leading-relaxed mb-3">
                  Consider this code with 20 items:
                </Typography>
                <pre className="bg-slate-900 text-slate-300 p-4 rounded-lg text-sm overflow-x-auto mb-3">
                  <code>{`items.forEach(item => {
  const h = item.offsetHeight;  // READ: Forces reflow (1-5ms)
  const w = item.offsetWidth;    // READ: Forces reflow (1-5ms)
  item.style.height = h + 1;     // WRITE: Invalidates layout
  item.style.width = w + 1;      // WRITE: Forces reflow (1-5ms)
});
// 20 items × 4 operations = 80 reflows
// 80 reflows × 2ms average = 160ms total
// Frame budget: 16.67ms
// Result: 9.6 frames behind! FPS drops to ~6fps`}</code>
                </pre>
                <Typography variant="body2" className="text-slate-700">
                  This is why FPS drops dramatically - the browser simply can't keep up with all 
                  the layout calculations happening in a single frame.
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Tabbed Problem Demos */}
        <Card className="mb-12 bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <ProblemDemos />
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 border-0 shadow-lg rounded-xl">
          <CardContent className="p-10 text-center">
            <Typography variant="h4" className="mb-4 text-white font-bold">
              Ready to Learn the Solution?
            </Typography>
            <Typography
              variant="body1"
              className="text-white/90 mb-8 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Discover how to optimize your code and prevent layout thrashing
              forever with proper batching techniques, transform-based
              animations, and the scaleX() solution.
            </Typography>
            <Link href="/solution">
              <Button
                variant="contained"
                size="large"
                className="bg-white text-slate-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-xl"
              >
                View Solutions →
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
