"use client";

import { Box, Button, Container, Typography, Card, CardContent, Grid } from "@mui/material";
import { ArrowForward, Speed, BugReport, Lightbulb, School, Memory, Layers, Animation } from "@mui/icons-material";
import Link from "next/link";

export default function Home() {
  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Container maxWidth="lg" className="py-12">
        {/* Hero Section */}
        <Box className="text-center mb-12">
          <Typography
            variant="h1"
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight"
          >
            Layout Thrashing
          </Typography>
          <Typography variant="h5" className="text-slate-700 mb-4 font-medium">
            Master Browser Rendering Performance
          </Typography>
          <Typography variant="body1" className="text-slate-600 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            A comprehensive, interactive guide to understanding layout thrashing, the browser rendering pipeline,
            reflow vs repaint, composition layers, and how to build buttery-smooth 60fps web applications.
          </Typography>
          <Box className="flex gap-3 justify-center flex-wrap">
            <Link href="/problem">
              <Button
                variant="contained"
                size="medium"
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-6 py-2.5 text-base font-medium shadow-md hover:shadow-lg transition-all"
              >
                See The Problem →
              </Button>
            </Link>
            <Link href="/solution">
              <Button
                variant="contained"
                size="medium"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-2.5 text-base font-medium shadow-md hover:shadow-lg transition-all"
              >
                Learn Solutions →
              </Button>
            </Link>
          </Box>
        </Box>

        {/* What is Layout Thrashing */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg">
          <CardContent className="p-6">
            <Box className="flex items-center gap-3 mb-4">
              <Box className="p-2 bg-rose-100 rounded-lg border border-rose-200 flex-shrink-0">
                <BugReport className="text-rose-600 text-2xl" />
              </Box>
              <Typography variant="h4" className="text-slate-800 font-semibold">
                What is Layout Thrashing?
              </Typography>
            </Box>
            <Typography variant="body1" className="text-slate-700 mb-4 leading-relaxed">
              <strong className="text-rose-600">Layout thrashing</strong>, also known as <strong className="text-orange-600">forced synchronous reflow</strong> or <strong className="text-orange-600">read-write-read-write cycles</strong>,
              occurs when JavaScript code forces the browser to repeatedly recalculate the layout of
              a webpage within the same frame. This happens when scripts interleave DOM reads and writes
              in rapid succession, causing the browser to continuously recalculate styles and layouts.
            </Typography>
            <Box className="bg-rose-50 border-l-4 border-rose-400 p-4 rounded-r-lg mb-4">
              <Typography variant="body2" className="text-rose-800 font-semibold mb-2">
                Core Issue:
              </Typography>
              <Typography variant="body2" className="text-slate-700 leading-relaxed">
                Reading a layout property (e.g., <code className="bg-slate-100 px-2 py-0.5 rounded text-rose-700 font-mono text-sm">element.offsetWidth</code>) 
                <strong className="text-rose-600"> forces</strong> an immediate reflow to compute the value synchronously. 
                If you then write a layout property (e.g., <code className="bg-slate-100 px-2 py-0.5 rounded text-rose-700 font-mono text-sm">element.style.width</code>), 
                it queues another reflow. In a loop, this alternates read/write, triggering <strong className="text-rose-600">dozens of reflows per frame</strong>—exceeding the 16ms budget, causing jank.
              </Typography>
            </Box>
            <Typography variant="body2" className="text-slate-600 mb-3 font-medium">
              This pattern can lead to significant performance issues:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <Box component="ul" className="space-y-2 text-slate-700 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 mt-0.5">•</span>
                      <span><strong className="text-slate-800">Stuttery scrolling/animations</strong> (jank score &gt;5 in DevTools)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 mt-0.5">•</span>
                      <span><strong className="text-slate-800">High CPU usage</strong> on main thread</span>
                    </li>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <Box component="ul" className="space-y-2 text-slate-700 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 mt-0.5">•</span>
                      <span><strong className="text-slate-800">Dropped frames</strong> (use chrome://flags/#show-fps-counter)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 mt-0.5">•</span>
                      <span><strong className="text-slate-800">Poor mobile performance</strong> and battery drain</span>
                    </li>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Navigation Cards */}
        <Grid container spacing={3} className="mb-8">
          <Grid item xs={12} md={6}>
            <Card className="h-full bg-white/80 backdrop-blur-sm border border-slate-200/50 hover:border-rose-300 hover:shadow-lg transition-all">
              <CardContent className="p-5">
                <Box className="mb-4 flex items-center gap-3">
                  <Box className="p-2 bg-rose-100 rounded-lg border border-rose-200 flex-shrink-0">
                    <BugReport className="text-rose-600 text-2xl" />
                  </Box>
                  <Typography variant="h5" className="text-slate-800 font-semibold">
                    The Problem
                  </Typography>
                </Box>
                <Typography variant="body2" className="text-slate-600 mb-4 leading-relaxed text-sm">
                  See real examples of layout thrashing in action. Interactive demos showing how inefficient
                  DOM operations cause performance issues, stuttering animations, and dropped frames.
                </Typography>
                <Box component="ul" className="space-y-1.5 text-slate-600 text-xs mb-4">
                  <li className="flex items-center gap-2">
                    <span className="text-rose-500">→</span>
                    <span>Sidebar width animation demo (thrashing)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rose-500">→</span>
                    <span>Real-time FPS monitoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rose-500">→</span>
                    <span>Common triggers and patterns</span>
                  </li>
                </Box>
                <Link href="/problem">
                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    size="small"
                    className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white w-full font-medium shadow-sm"
                  >
                    View Examples
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className="h-full bg-white/80 backdrop-blur-sm border border-slate-200/50 hover:border-emerald-300 hover:shadow-lg transition-all">
              <CardContent className="p-5">
                <Box className="mb-4 flex items-center gap-3">
                  <Box className="p-2 bg-emerald-100 rounded-lg border border-emerald-200 flex-shrink-0">
                    <Lightbulb className="text-emerald-600 text-2xl" />
                  </Box>
                  <Typography variant="h5" className="text-slate-800 font-semibold">
                    The Solution
                  </Typography>
                </Box>
                <Typography variant="body2" className="text-slate-600 mb-4 leading-relaxed text-sm">
                  Learn how to optimize your code to prevent layout thrashing. Discover best
                  practices, transform-based animations, and techniques for smooth 60fps animations.
                </Typography>
                <Box component="ul" className="space-y-1.5 text-slate-600 text-xs mb-4">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">→</span>
                    <span>scaleX() solution with overflow:hidden</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">→</span>
                    <span>Transform vs position comparison</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">→</span>
                    <span>Production-ready patterns</span>
                  </li>
                </Box>
                <Link href="/solution">
                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    size="small"
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white w-full font-medium shadow-sm"
                  >
                    Learn Solutions
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 hover:border-indigo-300 hover:shadow-lg transition-all">
              <CardContent className="p-5">
                <Box className="flex items-center gap-4 mb-4">
                  <Box className="p-2 bg-indigo-100 rounded-lg border border-indigo-200 flex-shrink-0">
                    <School className="text-indigo-600 text-2xl" />
                  </Box>
                  <Box className="flex-1">
                    <Typography variant="h5" className="mb-2 text-slate-800 font-semibold">
                      Deep Dive: Browser Rendering Pipeline
                    </Typography>
                    <Typography variant="body2" className="text-slate-600 leading-relaxed text-sm">
                      Explore the complete browser rendering process. Understand reflow, repaint,
                      composition layers, GPU acceleration, and how transform properties solve
                      reflow problems forever.
                    </Typography>
                  </Box>
                </Box>
                <Grid container spacing={2} className="mb-4">
                  <Grid item xs={12} md={4}>
                    <Box className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <Typography variant="body2" className="text-indigo-700 font-semibold mb-1 text-xs">Rendering Pipeline</Typography>
                      <Typography variant="body2" className="text-slate-600 text-xs">DOM → CSSOM → Layout → Paint → Composite</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <Typography variant="body2" className="text-indigo-700 font-semibold mb-1 text-xs">Composition Layers</Typography>
                      <Typography variant="body2" className="text-slate-600 text-xs">GPU-accelerated layers for smooth animations</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <Typography variant="body2" className="text-indigo-700 font-semibold mb-1 text-xs">Transform Magic</Typography>
                      <Typography variant="body2" className="text-slate-600 text-xs">Why transform bypasses reflow/repaint</Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Link href="/deep-dive">
                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    size="small"
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white w-full font-medium shadow-sm"
                  >
                    Explore Deep Dive
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Key Concepts Preview */}
        <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg">
          <CardContent className="p-6">
            <Typography variant="h4" className="mb-1 text-center text-slate-800 font-semibold">
              Key Concepts Covered
            </Typography>
            <Typography variant="body2" className="text-center text-slate-600 mb-6 text-sm">
              Master these concepts to build performant web applications
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Box className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <Box className="mb-3">
                    <Box className="p-2 bg-blue-100 rounded-lg inline-block border border-blue-200">
                      <Speed className="text-blue-600 text-xl" />
                    </Box>
                  </Box>
                  <Typography variant="subtitle2" className="text-slate-800 mb-1.5 font-semibold">
                    Browser Rendering Pipeline
                  </Typography>
                  <Typography variant="body2" className="text-slate-600 leading-relaxed text-xs">
                    JavaScript → Style Calculation → Layout → Paint → Composite
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box className="p-4 bg-rose-50 rounded-lg border border-rose-200 hover:border-rose-300 hover:shadow-md transition-all">
                  <Box className="mb-3">
                    <Box className="p-2 bg-rose-100 rounded-lg inline-block border border-rose-200">
                      <Layers className="text-rose-600 text-xl" />
                    </Box>
                  </Box>
                  <Typography variant="subtitle2" className="text-slate-800 mb-1.5 font-semibold">
                    Reflow (Layout)
                  </Typography>
                  <Typography variant="body2" className="text-slate-600 leading-relaxed text-xs">
                    Expensive recalculation of element positions and sizes (O(n) complexity)
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box className="p-4 bg-amber-50 rounded-lg border border-amber-200 hover:border-amber-300 hover:shadow-md transition-all">
                  <Box className="mb-3">
                    <Box className="p-2 bg-amber-100 rounded-lg inline-block border border-amber-200">
                      <Layers className="text-amber-600 text-xl" />
                    </Box>
                  </Box>
                  <Typography variant="subtitle2" className="text-slate-800 mb-1.5 font-semibold">
                    Repaint
                  </Typography>
                  <Typography variant="body2" className="text-slate-600 leading-relaxed text-xs">
                    Updating pixels when visual styles change (cheaper than reflow)
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 hover:border-emerald-300 hover:shadow-md transition-all">
                  <Box className="mb-3">
                    <Box className="p-2 bg-emerald-100 rounded-lg inline-block border border-emerald-200">
                      <Memory className="text-emerald-600 text-xl" />
                    </Box>
                  </Box>
                  <Typography variant="subtitle2" className="text-slate-800 mb-1.5 font-semibold">
                    Composition Layers
                  </Typography>
                  <Typography variant="body2" className="text-slate-600 leading-relaxed text-xs">
                    GPU-accelerated layers for efficient rendering and smooth animations
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box className="p-4 bg-purple-50 rounded-lg border border-purple-200 hover:border-purple-300 hover:shadow-md transition-all">
                  <Box className="mb-3">
                    <Box className="p-2 bg-purple-100 rounded-lg inline-block border border-purple-200">
                      <Animation className="text-purple-600 text-xl" />
                    </Box>
                  </Box>
                  <Typography variant="subtitle2" className="text-slate-800 mb-1.5 font-semibold">
                    Transform & Opacity
                  </Typography>
                  <Typography variant="body2" className="text-slate-600 leading-relaxed text-xs">
                    Composite-only properties that bypass reflow/repaint for 60fps animations
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 hover:border-indigo-300 hover:shadow-md transition-all">
                  <Box className="mb-3">
                    <Box className="p-2 bg-indigo-100 rounded-lg inline-block border border-indigo-200">
                      <Speed className="text-indigo-600 text-xl" />
                    </Box>
                  </Box>
                  <Typography variant="subtitle2" className="text-slate-800 mb-1.5 font-semibold">
                    Batch Operations
                  </Typography>
                  <Typography variant="body2" className="text-slate-600 leading-relaxed text-xs">
                    Separating reads and writes to prevent layout thrashing
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

