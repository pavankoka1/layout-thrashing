"use client";

import { Box, Button, Container, Typography, Card, CardContent, Paper, Grid } from "@mui/material";
import { PlayArrow, Stop, Code, CheckCircle, Speed } from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function SolutionPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [fps, setFps] = useState(60);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(0);
  const frameCountRef = useRef(0);

  // Optimized Example - Batch reads and writes
  const runOptimized = () => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll(".optimized-item");
    
    // GOOD: Batch all reads first, then all writes
    const dimensions = [];
    items.forEach((item) => {
      dimensions.push({
        height: item.offsetHeight,
        width: item.offsetWidth,
      });
    });

    // Now batch all writes
    items.forEach((item, index) => {
      item.style.height = `${dimensions[index].height + 1}px`;
      item.style.width = `${dimensions[index].width + 1}px`;
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
        runOptimized();
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
            The Solution: Optimized Code
          </Typography>
          <Typography variant="body1" className="text-gray-400 text-lg">
            Learn how to prevent layout thrashing by batching DOM operations and using CSS
            properties that leverage the compositor.
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
                <Typography variant="body2" className="text-green-400 mt-2">
                  Notice the smooth performance with batched operations!
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
              <CheckCircle className="text-green-400" />
              Optimized Example
            </Typography>
            <Typography variant="body2" className="text-gray-400 mb-6">
              This example uses batched reads and writes. Notice how the FPS stays high and the
              animation is smooth.
            </Typography>
            
            <Box
              ref={containerRef}
              className="grid grid-cols-4 gap-4 p-6 bg-gray-900 rounded-lg min-h-[300px]"
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <Box
                  key={i}
                  className="optimized-item bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold transition-all"
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

        {/* Solution 1: Batch Operations */}
        <Card className="mb-8 bg-gray-800 border border-gray-700">
          <CardContent className="p-8">
            <Typography variant="h5" className="mb-4 text-white flex items-center gap-2">
              <Code className="text-green-400" />
              Solution 1: Batch Reads and Writes
            </Typography>
            <Typography variant="body2" className="text-gray-400 mb-4">
              Separate all read operations from write operations:
            </Typography>
            <Paper className="bg-gray-900 p-4 overflow-x-auto mb-4">
              <pre className="text-sm text-gray-300">
                <code>{`// ✅ GOOD: Batch reads, then batch writes
const items = document.querySelectorAll('.item');

// Step 1: Read all layout properties first
const dimensions = [];
items.forEach(item => {
  dimensions.push({
    height: item.offsetHeight,
    width: item.offsetWidth,
  });
});

// Step 2: Write all style changes together
items.forEach((item, index) => {
  item.style.height = \`\${dimensions[index].height + 1}px\`;
  item.style.width = \`\${dimensions[index].width + 1}px\`;
});

// Browser can now optimize: one reflow for all reads,
// one reflow for all writes, instead of N reflows!`}</code>
              </pre>
            </Paper>
            <Box className="bg-green-900/20 border border-green-700 rounded-lg p-4">
              <Typography variant="body2" className="text-green-300">
                <strong>Why this works:</strong> By batching reads and writes separately, the
                browser can optimize the rendering process. It performs all reads in one pass,
                calculates the layout once, then applies all writes together, minimizing reflows.
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Solution 2: Use Transform */}
        <Card className="mb-8 bg-gray-800 border border-gray-700">
          <CardContent className="p-8">
            <Typography variant="h5" className="mb-4 text-white flex items-center gap-2">
              <Speed className="text-blue-400" />
              Solution 2: Use Transform Instead of Position
            </Typography>
            <Typography variant="body2" className="text-gray-400 mb-4">
              Use CSS <code className="bg-gray-900 px-2 py-1 rounded">transform</code> and{" "}
              <code className="bg-gray-900 px-2 py-1 rounded">opacity</code> for animations:
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper className="bg-gray-900 p-4 overflow-x-auto">
                  <Typography variant="h6" className="text-red-400 mb-2 text-sm">
                    ❌ BAD: Causes Reflow
                  </Typography>
                  <pre className="text-xs text-gray-300">
                    <code>{`// Triggers reflow on every frame
element.style.left = x + 'px';
element.style.top = y + 'px';`}</code>
                  </pre>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper className="bg-gray-900 p-4 overflow-x-auto">
                  <Typography variant="h6" className="text-green-400 mb-2 text-sm">
                    ✅ GOOD: Uses Compositor
                  </Typography>
                  <pre className="text-xs text-gray-300">
                    <code>{`// No reflow, handled by GPU compositor
element.style.transform = 
  \`translate(\${x}px, \${y}px)\`;`}</code>
                  </pre>
                </Paper>
              </Grid>
            </Grid>
            <Box className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mt-4">
              <Typography variant="body2" className="text-blue-300">
                <strong>Why this works:</strong> <code>transform</code> and <code>opacity</code> are
                handled by the compositor thread on the GPU, completely bypassing the main thread
                and avoiding reflow/repaint. This is the key to 60 FPS animations!
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Solution 3: requestAnimationFrame */}
        <Card className="mb-8 bg-gray-800 border border-gray-700">
          <CardContent className="p-8">
            <Typography variant="h5" className="mb-4 text-white flex items-center gap-2">
              <Speed className="text-purple-400" />
              Solution 3: Use requestAnimationFrame
            </Typography>
            <Typography variant="body2" className="text-gray-400 mb-4">
              Always use <code className="bg-gray-900 px-2 py-1 rounded">requestAnimationFrame</code> for
              animations to sync with the browser's rendering cycle:
            </Typography>
            <Paper className="bg-gray-900 p-4 overflow-x-auto">
              <pre className="text-sm text-gray-300">
                <code>{`// ✅ GOOD: Syncs with browser refresh rate
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
}, 16); // May run when browser isn't ready`}</code>
              </pre>
            </Paper>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card className="mb-8 bg-gray-800 border border-gray-700">
          <CardContent className="p-8">
            <Typography variant="h5" className="mb-4 text-white">
              Best Practices Summary
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box className="bg-gray-900 p-4 rounded-lg">
                  <Typography variant="h6" className="text-green-400 mb-3">
                    ✅ Do This
                  </Typography>
                  <Box component="ul" className="space-y-2 text-gray-300 text-sm">
                    <li>• Batch all reads, then all writes</li>
                    <li>• Use <code>transform</code> and <code>opacity</code> for animations</li>
                    <li>• Use <code>requestAnimationFrame</code> for animations</li>
                    <li>• Cache layout values when possible</li>
                    <li>• Use <code>will-change</code> to hint at upcoming changes</li>
                    <li>• Minimize DOM queries</li>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box className="bg-gray-900 p-4 rounded-lg">
                  <Typography variant="h6" className="text-red-400 mb-3">
                    ❌ Avoid This
                  </Typography>
                  <Box component="ul" className="space-y-2 text-gray-300 text-sm">
                    <li>• Interleaving reads and writes</li>
                    <li>• Using <code>left</code>/<code>top</code> for animations</li>
                    <li>• Using <code>setInterval</code> for animations</li>
                    <li>• Reading layout properties in loops</li>
                    <li>• Making style changes inside loops</li>
                    <li>• Querying DOM repeatedly</li>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Performance Comparison */}
        <Card className="mb-8 bg-gray-800 border border-gray-700">
          <CardContent className="p-8">
            <Typography variant="h5" className="mb-4 text-white">
              Performance Comparison
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box className="bg-red-900/20 border border-red-700 rounded-lg p-6">
                  <Typography variant="h6" className="text-red-400 mb-4">
                    Layout Thrashing (Bad)
                  </Typography>
                  <Box component="ul" className="space-y-2 text-gray-300">
                    <li>• Multiple reflows per frame</li>
                    <li>• ~10-30 FPS on average</li>
                    <li>• High CPU usage</li>
                    <li>• Janky, stuttering animations</li>
                    <li>• Poor mobile performance</li>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box className="bg-green-900/20 border border-green-700 rounded-lg p-6">
                  <Typography variant="h6" className="text-green-400 mb-4">
                    Optimized (Good)
                  </Typography>
                  <Box component="ul" className="space-y-2 text-gray-300">
                    <li>• Minimal reflows (batched)</li>
                    <li>• ~60 FPS consistently</li>
                    <li>• Low CPU usage</li>
                    <li>• Smooth, fluid animations</li>
                    <li>• Excellent mobile performance</li>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0">
          <CardContent className="p-8 text-center">
            <Typography variant="h5" className="mb-4 text-white">
              Want to Understand the Deep Details?
            </Typography>
            <Typography variant="body1" className="text-white mb-6">
              Learn about the complete browser rendering pipeline, how reflow and repaint work,
              composition layers, and why transform properties are so powerful.
            </Typography>
            <Link href="/deep-dive">
              <Button
                variant="contained"
                size="large"
                className="bg-white text-gray-900 hover:bg-gray-100"
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

