"use client";

import { Box, Button, Container, Typography, Card, CardContent, Grid } from "@mui/material";
import { ArrowForward, Speed, BugReport, Lightbulb, School } from "@mui/icons-material";
import Link from "next/link";

export default function Home() {
  return (
    <Box className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Container maxWidth="lg" className="py-16">
        {/* Hero Section */}
        <Box className="text-center mb-16">
          <Typography
            variant="h1"
            className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Layout Thrashing
          </Typography>
          <Typography variant="h4" className="text-gray-300 mb-8">
            Understanding Browser Rendering Performance
          </Typography>
          <Typography variant="body1" className="text-gray-400 text-lg max-w-3xl mx-auto mb-8">
            A comprehensive guide to understanding layout thrashing, browser rendering pipeline,
            reflow, repaint, composition layers, and how to optimize your web applications for
            smooth, performant animations.
          </Typography>
        </Box>

        {/* What is Layout Thrashing */}
        <Card className="mb-12 bg-gray-800 border border-gray-700">
          <CardContent className="p-8">
            <Typography variant="h3" className="mb-4 text-blue-400">
              What is Layout Thrashing?
            </Typography>
            <Typography variant="body1" className="text-gray-300 mb-4 text-lg leading-relaxed">
              <strong>Layout thrashing</strong>, also known as <strong>forced synchronous reflow</strong>,
              occurs when JavaScript code forces the browser to repeatedly recalculate the layout of
              a webpage. This happens when scripts read from and write to the DOM in rapid succession,
              causing the browser to continuously recalculate styles and layouts.
            </Typography>
            <Typography variant="body1" className="text-gray-300 mb-4 text-lg leading-relaxed">
              This pattern can lead to significant performance issues, including:
            </Typography>
            <Box component="ul" className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Sluggish and unresponsive user interfaces</li>
              <li>Janky animations and stuttering</li>
              <li>High CPU usage and battery drain</li>
              <li>Poor user experience, especially on mobile devices</li>
            </Box>
          </CardContent>
        </Card>

        {/* Navigation Cards */}
        <Grid container spacing={4} className="mb-12">
          <Grid item xs={12} md={6}>
            <Card className="h-full bg-gray-800 border border-gray-700 hover:border-blue-500 transition-colors">
              <CardContent className="p-6">
                <BugReport className="text-red-400 mb-4 text-5xl" />
                <Typography variant="h5" className="mb-3 text-white">
                  The Problem
                </Typography>
                <Typography variant="body2" className="text-gray-400 mb-4">
                  See real examples of layout thrashing in action. Understand how inefficient
                  DOM operations can cause performance issues.
                </Typography>
                <Link href="/problem">
                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    View Examples
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className="h-full bg-gray-800 border border-gray-700 hover:border-green-500 transition-colors">
              <CardContent className="p-6">
                <Lightbulb className="text-green-400 mb-4 text-5xl" />
                <Typography variant="h5" className="mb-3 text-white">
                  The Solution
                </Typography>
                <Typography variant="body2" className="text-gray-400 mb-4">
                  Learn how to optimize your code to prevent layout thrashing. Discover best
                  practices and techniques for smooth animations.
                </Typography>
                <Link href="/solution">
                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Learn Solutions
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card className="bg-gray-800 border border-gray-700 hover:border-purple-500 transition-colors">
              <CardContent className="p-6">
                <School className="text-purple-400 mb-4 text-5xl" />
                <Typography variant="h5" className="mb-3 text-white">
                  Deep Dive: Browser Rendering Pipeline
                </Typography>
                <Typography variant="body2" className="text-gray-400 mb-4">
                  Explore the complete browser rendering process. Understand reflow, repaint,
                  composition layers, GPU acceleration, and how transform properties solve
                  reflow problems.
                </Typography>
                <Link href="/deep-dive">
                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Explore Deep Dive
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Key Concepts Preview */}
        <Card className="bg-gray-800 border border-gray-700">
          <CardContent className="p-8">
            <Typography variant="h4" className="mb-6 text-center text-white">
              Key Concepts Covered
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Box className="p-4 bg-gray-900 rounded-lg">
                  <Speed className="text-blue-400 mb-2" />
                  <Typography variant="h6" className="text-white mb-2">
                    Browser Rendering Pipeline
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    DOM → CSSOM → Render Tree → Layout → Paint → Composite
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box className="p-4 bg-gray-900 rounded-lg">
                  <Speed className="text-red-400 mb-2" />
                  <Typography variant="h6" className="text-white mb-2">
                    Reflow (Layout)
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Recalculation of element positions and sizes
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box className="p-4 bg-gray-900 rounded-lg">
                  <Speed className="text-yellow-400 mb-2" />
                  <Typography variant="h6" className="text-white mb-2">
                    Repaint
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Updating pixels when visual styles change
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box className="p-4 bg-gray-900 rounded-lg">
                  <Speed className="text-green-400 mb-2" />
                  <Typography variant="h6" className="text-white mb-2">
                    Composition Layers
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    GPU-accelerated layers for efficient rendering
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box className="p-4 bg-gray-900 rounded-lg">
                  <Speed className="text-purple-400 mb-2" />
                  <Typography variant="h6" className="text-white mb-2">
                    Transform & Opacity
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Properties that avoid reflow and use compositor
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box className="p-4 bg-gray-900 rounded-lg">
                  <Speed className="text-pink-400 mb-2" />
                  <Typography variant="h6" className="text-white mb-2">
                    Batch Operations
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Separating reads and writes to prevent thrashing
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

