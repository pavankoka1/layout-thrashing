"use client";

import { Box, Button, Container, Typography, Card, CardContent, Paper, Grid } from "@mui/material";
import { PlayArrow, Stop, Code, Warning } from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function ProblemPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [fps, setFps] = useState(60);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(0);
  const frameCountRef = useRef(0);

  // Layout Thrashing Example
  const runLayoutThrashing = () => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll(".thrash-item");
    
    // BAD: Read and write interleaved - causes layout thrashing
    items.forEach((item) => {
      const height = item.offsetHeight; // Read - forces reflow
      const width = item.offsetWidth; // Read - forces reflow
      item.style.height = `${height + 1}px`; // Write - invalidates layout
      item.style.width = `${width + 1}px`; // Write - invalidates layout
    });
  };

  // FPS Counter
  useEffect(() => {
    if (!isRunning) return;

    const measureFPS = (currentTime) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime;
      }

      frameCountRef.current++;
      const elapsed = currentTime - lastTimeRef.current;

      if (elapsed >= 1000) {
        const currentFPS = Math.round((frameCountRef.current * 1000) / elapsed);
        setFps(currentFPS);
        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;
      }

      if (isRunning) {
        runLayoutThrashing();
        animationFrameRef.current = requestAnimationFrame(measureFPS);
      }
    };

    animationFrameRef.current = requestAnimationFrame(measureFPS);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning]);

  const handleToggle = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      frameCountRef.current = 0;
      lastTimeRef.current = 0;
    }
  };

  return (
    <Box className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Container maxWidth="lg" className="py-16">
        {/* Header */}
        <Box className="mb-8">
          <Link href="/">
            <Button variant="text" className="text-gray-400 mb-4">
              ← Back to Home
            </Button>
          </Link>
          <Typography variant="h2" className="text-4xl font-bold mb-4 text-white">
            The Problem: Layout Thrashing
          </Typography>
          <Typography variant="body1" className="text-gray-400 text-lg">
            See layout thrashing in action. This example demonstrates how interleaving DOM reads
            and writes causes performance issues.
          </Typography>
        </Box>

        {/* FPS Monitor */}
        <Card className="mb-8 bg-gray-800 border border-gray-700">
          <CardContent className="p-6">
            <Box className="flex items-center justify-between">
              <Box>
                <Typography variant="h6" className="text-white mb-2">
                  Performance Monitor
                </Typography>
                <Typography variant="h4" className={fps >= 55 ? "text-green-400" : fps >= 30 ? "text-yellow-400" : "text-red-400"}>
                  {fps} FPS
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={handleToggle}
                startIcon={isRunning ? <Stop /> : <PlayArrow />}
                className={isRunning ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
              >
                {isRunning ? "Stop" : "Start"} Animation
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Interactive Demo */}
        <Card className="mb-8 bg-gray-800 border border-gray-700">
          <CardContent className="p-8">
            <Typography variant="h5" className="mb-4 text-white flex items-center gap-2">
              <Warning className="text-yellow-400" />
              Layout Thrashing Example
            </Typography>
            <Typography variant="body2" className="text-gray-400 mb-6">
              Watch the FPS drop as the browser is forced to recalculate layout on every frame.
              Notice the stuttering and performance degradation.
            </Typography>
            
            <Box
              ref={containerRef}
              className="grid grid-cols-4 gap-4 p-6 bg-gray-900 rounded-lg min-h-[300px]"
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <Box
                  key={i}
                  className="thrash-item bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold transition-all"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                >
                  {i + 1}
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Code Example */}
        <Card className="mb-8 bg-gray-800 border border-gray-700">
          <CardContent className="p-8">
            <Typography variant="h5" className="mb-4 text-white flex items-center gap-2">
              <Code className="text-blue-400" />
              Problematic Code
            </Typography>
            <Typography variant="body2" className="text-gray-400 mb-4">
              This code causes layout thrashing by interleaving reads and writes:
            </Typography>
            <Paper className="bg-gray-900 p-4 overflow-x-auto">
              <pre className="text-sm text-gray-300">
                <code>{`// ❌ BAD: Causes layout thrashing
const items = document.querySelectorAll('.item');

items.forEach(item => {
  // Read - forces browser to calculate layout
  const height = item.offsetHeight;
  const width = item.offsetWidth;
  
  // Write - invalidates layout, forces recalculation
  item.style.height = \`\${height + 1}px\`;
  item.style.width = \`\${width + 1}px\`;
  
  // This pattern repeats, causing multiple reflows per frame!
});`}</code>
              </pre>
            </Paper>
          </CardContent>
        </Card>

        {/* Explanation */}
        <Card className="mb-8 bg-gray-800 border border-gray-700">
          <CardContent className="p-8">
            <Typography variant="h5" className="mb-4 text-white">
              Why This is a Problem
            </Typography>
            <Box component="ul" className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                <span>
                  <strong>Forced Synchronous Reflow:</strong> Reading layout properties like{" "}
                  <code className="bg-gray-900 px-2 py-1 rounded">offsetHeight</code> or{" "}
                  <code className="bg-gray-900 px-2 py-1 rounded">offsetWidth</code> forces the
                  browser to immediately calculate the current layout.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                <span>
                  <strong>Layout Invalidation:</strong> Writing to style properties invalidates the
                  layout, requiring the browser to recalculate everything again.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                <span>
                  <strong>Cascade Effect:</strong> In a loop, this creates a read-write-read-write
                  pattern that causes multiple reflows per iteration, leading to severe performance
                  degradation.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                <span>
                  <strong>Frame Budget Exceeded:</strong> With 60 FPS, you have ~16.67ms per frame.
                  Multiple reflows can easily exceed this, causing dropped frames and janky
                  animations.
                </span>
              </li>
            </Box>
          </CardContent>
        </Card>

        {/* Common Triggers */}
        <Card className="mb-8 bg-gray-800 border border-gray-700">
          <CardContent className="p-8">
            <Typography variant="h5" className="mb-4 text-white">
              Common Layout Thrashing Triggers
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className="text-yellow-400 mb-2">
                  Properties that Trigger Reflow (Read)
                </Typography>
                <Box component="ul" className="space-y-1 text-gray-300 text-sm">
                  <li>• offsetWidth, offsetHeight</li>
                  <li>• offsetTop, offsetLeft</li>
                  <li>• scrollWidth, scrollHeight</li>
                  <li>• scrollTop, scrollLeft</li>
                  <li>• clientWidth, clientHeight</li>
                  <li>• clientTop, clientLeft</li>
                  <li>• getComputedStyle()</li>
                  <li>• getBoundingClientRect()</li>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className="text-red-400 mb-2">
                  Properties that Invalidate Layout (Write)
                </Typography>
                <Box component="ul" className="space-y-1 text-gray-300 text-sm">
                  <li>• width, height</li>
                  <li>• margin, padding</li>
                  <li>• border properties</li>
                  <li>• position, top, left, right, bottom</li>
                  <li>• display, visibility</li>
                  <li>• font-size, line-height</li>
                  <li>• Adding/removing DOM elements</li>
                  <li>• Changing class names</li>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-green-600 to-blue-600 border-0">
          <CardContent className="p-8 text-center">
            <Typography variant="h5" className="mb-4 text-white">
              Ready to Learn the Solution?
            </Typography>
            <Typography variant="body1" className="text-white mb-6">
              Discover how to optimize your code and prevent layout thrashing with proper batching
              techniques and CSS properties.
            </Typography>
            <Link href="/solution">
              <Button
                variant="contained"
                size="large"
                className="bg-white text-gray-900 hover:bg-gray-100"
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

