"use client";

import { Box, Button, Container, Typography, Card, CardContent, Paper, Grid, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore, Layers, Speed, Memory, MemoryOutlined } from "@mui/icons-material";
import Link from "next/link";

export default function DeepDivePage() {
  return (
    <Box className="min-h-screen bg-white">
      <Container maxWidth="lg" className="py-12 px-4">
        {/* Header */}
        <Box className="mb-12">
          <Link href="/">
            <Button variant="text" className="text-slate-500 mb-6 hover:text-slate-900 text-sm font-medium -ml-2">
              ← Back to Home
            </Button>
          </Link>
          <Typography variant="h1" className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight">
            Deep Dive: Browser Rendering Pipeline
          </Typography>
          <Typography variant="body1" className="text-slate-600 text-lg leading-relaxed max-w-3xl">
            A comprehensive exploration of how browsers render web pages, from HTML parsing to
            pixels on screen. Understand the complete rendering pipeline, reflow vs repaint, composition layers, 
            GPU acceleration, and how to build performant animations.
          </Typography>
        </Box>

        {/* Browser Rendering Pipeline Overview */}
        <Card className="mb-8 bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <Box className="flex items-center gap-3 mb-4">
              <Box className="p-2 bg-blue-100 rounded-lg border border-blue-200 flex-shrink-0">
                <Layers className="text-blue-600 text-2xl" />
              </Box>
              <Typography variant="h4" className="text-slate-900 font-bold tracking-tight">
                How the Browser Renders the Document
              </Typography>
            </Box>
            <Typography variant="body1" className="text-slate-700 mb-6 leading-relaxed text-base">
              When you load a webpage, the browser goes through a complex process to convert HTML,
              CSS, and JavaScript into pixels on your screen. Understanding this complete pipeline is
              crucial for writing performant web applications and avoiding layout thrashing.
            </Typography>
            
            {/* Video Reference */}
            <Box className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
              <Typography variant="h6" className="text-blue-900 font-semibold mb-2">
                📺 Learn More About Reflow
              </Typography>
              <Typography variant="body2" className="text-slate-700 mb-3 leading-relaxed">
                Watch this comprehensive video explaining how reflow works in detail:
              </Typography>
              <Box className="bg-white rounded-lg p-3 border border-blue-200">
                <a 
                  href="https://www.youtube.com/watch?v=dndeRnzkJDU" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  YouTube: Understanding Reflow in Browser Rendering
                </a>
              </Box>
            </Box>
            <Box className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-6">
              <Typography variant="body2" className="text-blue-800 font-semibold mb-2">
                Frame Budget: 16.7ms for 60fps
              </Typography>
              <Typography variant="body2" className="text-slate-700 leading-relaxed text-sm">
                Each frame (typically 16.7ms for 60fps) aims to complete this pipeline. Disruptions here cause{" "}
                <strong className="text-rose-600">jank</strong> (dropped frames, stuttery UI). Tools like Chrome DevTools' Performance panel can profile this.
              </Typography>
            </Box>

            <Box className="space-y-4">
              {/* Step 1: Receiving Data */}
              <Paper className="bg-green-50 p-5 border-l-4 border-green-400 rounded-r-lg">
                <Typography variant="h6" className="text-green-700 mb-2 font-semibold">
                  1. Receives Data (Bytes) from Server
                </Typography>
                <Typography variant="body2" className="text-slate-700 leading-relaxed">
                  The browser receives raw bytes (HTML, CSS, JavaScript) from the server over the network.
                  This is the starting point of the rendering process.
                </Typography>
              </Paper>

              {/* Step 2: Parsing */}
              <Paper className="bg-blue-50 p-5 border-l-4 border-blue-400 rounded-r-lg">
                <Typography variant="h6" className="text-blue-700 mb-3 font-semibold">
                  2. Parsing: Converts Bytes into Tokens and Nodes
                </Typography>
                <Typography variant="body2" className="text-slate-700 mb-3 leading-relaxed">
                  The browser parses the received data:
                </Typography>
                <Box component="ul" className="space-y-2 text-slate-700 ml-4 mb-3">
                  <li>• <strong>Converts bytes into tokens</strong>: <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-blue-200">&lt;</code>, <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-blue-200">TagName</code>, <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-blue-200">Attribute</code>, <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-blue-200">AttributeValue</code>, <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-blue-200">&gt;</code></li>
                  <li>• <strong>Turns tokens into nodes</strong>: Each token becomes a node in the document structure</li>
                  <li>• <strong>Turns nodes into DOM tree</strong>: Nodes are organized into a hierarchical tree structure</li>
                </Box>
                <Paper className="bg-slate-100 p-3 rounded border border-slate-200">
                  <pre className="text-xs text-slate-700 font-mono">
                    <code>{`HTML Bytes: "<div><p>Hello</p></div>"
         ↓
Tokens: <, div, >, <, p, >, Hello, </, p, >, </, div, >
         ↓
Nodes: [div, [p, "Hello"]]
         ↓
DOM Tree: div
           └── p
               └── "Hello"`}</code>
                  </pre>
                </Paper>
              </Paper>

              {/* Step 3: Building CSSOM */}
              <Paper className="bg-purple-50 p-5 border-l-4 border-purple-400 rounded-r-lg">
                <Typography variant="h6" className="text-purple-700 mb-3 font-semibold">
                  3. Builds CSSOM Tree from CSS Rules
                </Typography>
                <Typography variant="body2" className="text-slate-700 mb-3 leading-relaxed">
                  CSS is parsed and organized into the <strong className="text-purple-600">CSS Object Model (CSSOM)</strong> - 
                  a tree structure similar to the DOM, but for CSS rules.
                </Typography>
                <Paper className="bg-slate-100 p-3 rounded border border-slate-200">
                  <pre className="text-xs text-slate-700 font-mono">
                    <code>{`/* CSS */
body { font-size: 16px; }
#container { width: 100%; }
p { color: blue; }

↓ Parsed into CSSOM Tree

CSSOM:
  body
    └── fontSize: '16px'
  #container
    └── width: '100%'
  p
    └── color: 'blue'`}</code>
                  </pre>
                </Paper>
              </Paper>

              {/* Step 4: Render Tree */}
              <Paper className="bg-indigo-50 p-5 border-l-4 border-indigo-400 rounded-r-lg">
                <Typography variant="h6" className="text-indigo-700 mb-3 font-semibold">
                  4. CSSOM and DOM Trees Combined into Render Tree
                </Typography>
                <Typography variant="body2" className="text-slate-700 mb-3 leading-relaxed">
                  The browser merges the DOM and CSSOM to create the <strong className="text-indigo-600">Render Tree</strong>:
                </Typography>
                <Box component="ul" className="space-y-2 text-slate-700 ml-4 mb-3">
                  <li>• <strong>Computes which elements are visible</strong> and their computed styles</li>
                  <li>• <strong>Starting from the root</strong> of the DOM tree</li>
                  <li>• <strong>Not visible elements are omitted</strong>: <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-indigo-200">&lt;meta&gt;</code>, <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-indigo-200">&lt;script&gt;</code>, <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-indigo-200">&lt;link&gt;</code>, and <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-indigo-200">display: none</code> elements</li>
                  <li>• <strong>For each visible node</strong>, finds the appropriate matching CSSOM rules and applies them</li>
                </Box>
                <Box className="bg-indigo-100 border border-indigo-200 rounded-lg p-3 mt-3">
                  <Typography variant="body2" className="text-indigo-800 font-semibold mb-2 text-xs">
                    ⚠️ Important: <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-indigo-200">display: none</code> elements are NOT in the render tree, but <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-indigo-200">visibility: hidden</code> elements ARE (they just aren't painted).
                  </Typography>
                </Box>
              </Paper>

              {/* Step 5: Reflow (Layout) */}
              <Paper className="bg-amber-50 p-5 border-l-4 border-amber-400 rounded-r-lg">
                <Typography variant="h6" className="text-amber-700 mb-3 font-semibold">
                  5. Reflow: Compute Layout of Each Visible Element
                </Typography>
                <Typography variant="body2" className="text-slate-700 mb-3 leading-relaxed">
                  The browser calculates the exact <strong className="text-amber-600">position and size</strong> of every element 
                  in the viewport. This is also called <strong className="text-amber-600">Layout</strong> or <strong className="text-amber-600">Layout Calculation</strong>.
                </Typography>
                <Box className="bg-amber-100 border border-amber-200 rounded-lg p-4 mt-3 mb-3">
                  <Typography variant="body2" className="text-amber-800 mb-2 font-semibold">
                    What happens during Reflow:
                  </Typography>
                  <Box component="ul" className="space-y-2 text-slate-700 ml-4">
                    <li>• Calculate positions (x, y coordinates) for each element</li>
                    <li>• Calculate sizes (width, height) based on content, CSS, and constraints</li>
                    <li>• Handle box model (margin, border, padding)</li>
                    <li>• Process flexbox/grid layouts</li>
                    <li>• Handle text wrapping and line breaks</li>
                    <li>• Recalculate positions and dimensions when changes occur</li>
                  </Box>
                </Box>
                <Box className="bg-red-50 border border-red-200 rounded-lg p-4 mt-3">
                  <Typography variant="body2" className="text-red-800 mb-2 font-semibold">
                    ⚠️ This is EXPENSIVE!
                  </Typography>
                  <Typography variant="body2" className="text-slate-700 leading-relaxed text-sm">
                    Layout is one of the most costly operations because:
                  </Typography>
                  <Box component="ul" className="space-y-1 text-slate-700 text-sm ml-4 mt-2">
                    <li>• <strong>It can affect the entire page</strong> - changing one element can trigger layout recalculation for its parent, siblings, and children</li>
                    <li>• <strong>Has a bigger impact</strong> - changing a single element can affect all children, ancestors, and siblings or the whole document</li>
                    <li>• <strong>O(n) complexity</strong> - scales with the number of elements</li>
                    <li>• <strong>Blocking operation</strong> - happens on the main thread, blocking JavaScript execution</li>
                  </Box>
                </Box>
              </Paper>

              {/* Step 6: Repaint */}
              <Paper className="bg-pink-50 p-5 border-l-4 border-pink-400 rounded-r-lg">
                <Typography variant="h6" className="text-pink-700 mb-3 font-semibold">
                  6. Repaint: Renders Pixels to Screen
                </Typography>
                <Typography variant="body2" className="text-slate-700 mb-3 leading-relaxed">
                  The browser rasterizes (draws) the pixels for each element, filling in colors, borders, text, shadows, etc.
                  This creates <strong className="text-pink-600">paint layers</strong> or bitmaps that will be displayed on screen.
                </Typography>
                <Box className="bg-pink-100 border border-pink-200 rounded-lg p-4 mt-3 mb-3">
                  <Typography variant="body2" className="text-pink-800 mb-2 font-semibold">
                    What happens during Repaint:
                  </Typography>
                  <Box component="ul" className="space-y-2 text-slate-700 ml-4">
                    <li>• Fill background colors</li>
                    <li>• Draw borders and shadows</li>
                    <li>• Render text with fonts</li>
                    <li>• Draw images and gradients</li>
                    <li>• Apply visual effects</li>
                  </Box>
                </Box>
                <Box className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-3">
                  <Typography variant="body2" className="text-amber-800 mb-2 font-semibold">
                    Repaint Occurs When:
                  </Typography>
                  <Typography variant="body2" className="text-slate-700 leading-relaxed text-sm mb-2">
                    Changes affect the <strong>visibility</strong> of elements:
                  </Typography>
                  <Box component="ul" className="space-y-1 text-slate-700 text-sm ml-4">
                    <li>• <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-amber-200">opacity</code>, <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-amber-200">color</code>, <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-amber-200">background-color</code></li>
                    <li>• <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-amber-200">visibility</code> changes</li>
                    <li>• <strong>Note:</strong> Paint is less expensive than Layout, but still requires CPU/GPU resources</li>
                  </Box>
                </Box>
              </Paper>

              {/* Step 7: Composite */}
              <Paper className="bg-cyan-50 p-5 border-l-4 border-cyan-400 rounded-r-lg">
                <Typography variant="h6" className="text-cyan-700 mb-3 font-semibold">
                  7. Composite: Assembles Layers for Final Display
                </Typography>
                <Typography variant="body2" className="text-slate-700 mb-3 leading-relaxed">
                  The browser assembles the painted layers into the final image, applying transformations 
                  (e.g., scrolling, animations) via the compositor. This can offload to the <strong className="text-cyan-600">GPU</strong> for speed.
                </Typography>
                <Box className="bg-cyan-100 border border-cyan-200 rounded-lg p-4 mt-3">
                  <Typography variant="body2" className="text-cyan-800 mb-2 font-semibold">
                    Compositing Layers:
                  </Typography>
                  <Typography variant="body2" className="text-slate-700 leading-relaxed text-sm">
                    Elements can be promoted to their own <strong className="text-cyan-600">compositing layers</strong>. These layers are
                    rendered separately and then combined. This allows the browser to update only
                    the changed layers without repainting everything. Layers stack like Photoshop—cheap to move/scale.
                  </Typography>
                </Box>
              </Paper>
            </Box>

            {/* Visual Flow Diagram Reference */}
            <Box className="bg-slate-50 border border-slate-200 rounded-lg p-5 mt-6">
              <Typography variant="h6" className="text-slate-900 mb-3 font-semibold">
                Visual Flow Diagram
              </Typography>
              <Typography variant="body2" className="text-slate-700 mb-3 leading-relaxed">
                The rendering pipeline flows like this:
              </Typography>
              <Box className="bg-white rounded-lg p-4 border border-slate-200">
                <pre className="text-sm text-slate-700 font-mono leading-relaxed">
                  <code>{`HTML (Bytes)          CSS (Bytes)
    │                    │
    ├─ Parsing ──────────┤
    │                    │
    ▼                    ▼
   DOM                 CSSOM
    │                    │
    └──── Merging ───────┘
            │
            ▼
      Render Tree
            │
            ▼
        Reflow
    (Layout Calculation)
            │
            ▼
        Repaint
    (Pixel Rendering)
            │
            ▼
       Composite
    (Layer Assembly)
            │
            ▼
      Screen Display`}</code>
                </pre>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Reflow vs Repaint Comparison Table */}
        <Card className="mb-8 bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <Typography variant="h4" className="mb-6 text-slate-900 font-bold tracking-tight">
              Reflow vs. Repaint: Complete Comparison
            </Typography>
            
            <Box className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 p-3 text-left text-slate-700 font-semibold text-sm">Aspect</th>
                    <th className="border border-slate-200 p-3 text-left text-rose-600 font-semibold text-sm">Reflow (Layout)</th>
                    <th className="border border-slate-200 p-3 text-left text-amber-600 font-semibold text-sm">Repaint (Paint)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-slate-200 p-3 text-slate-700 font-semibold text-sm">Scope</td>
                    <td className="border border-slate-200 p-3 text-slate-700 text-sm">Geometry (size/position)</td>
                    <td className="border border-slate-200 p-3 text-slate-700 text-sm">Visuals (colors, borders)</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 p-3 text-slate-700 font-semibold text-sm">Cost</td>
                    <td className="border border-slate-200 p-3 text-rose-700 text-sm">High (tree traversal, O(n))</td>
                    <td className="border border-slate-200 p-3 text-amber-700 text-sm">Medium (pixel rasterization)</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-slate-200 p-3 text-slate-700 font-semibold text-sm">Triggers</td>
                    <td className="border border-slate-200 p-3 text-slate-700 text-sm">Layout props, DOM changes</td>
                    <td className="border border-slate-200 p-3 text-slate-700 text-sm">Visual props, post-reflow</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 p-3 text-slate-700 font-semibold text-sm">Cascade</td>
                    <td className="border border-slate-200 p-3 text-rose-700 text-sm">Yes (affects children)</td>
                    <td className="border border-slate-200 p-3 text-amber-700 text-sm">Partial (affects visuals only)</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-slate-200 p-3 text-slate-700 font-semibold text-sm">Optimization</td>
                    <td className="border border-slate-200 p-3 text-slate-700 text-sm">Batch changes, use transforms</td>
                    <td className="border border-slate-200 p-3 text-slate-700 text-sm">Use layers for GPU offload</td>
                  </tr>
                </tbody>
              </table>
            </Box>

            <Box className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <Typography variant="body2" className="text-amber-800 leading-relaxed text-sm">
                <strong className="text-amber-700">Key Difference:</strong> Reflow → always repaint. Repaint → no reflow (if no geometry changes). 
                Optimize by avoiding reflows first.
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Visibility Hidden vs Display None */}
        <Card className="mb-8 bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <Typography variant="h4" className="text-slate-900 font-bold mb-6 tracking-tight">
              visibility: hidden vs display: none - Critical Performance Difference
            </Typography>
            
            <Grid container spacing={4} className="mb-6">
              <Grid item xs={12} md={6}>
                <Box className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
                  <Typography variant="h5" className="text-amber-700 mb-3 font-semibold">
                    visibility: hidden
                  </Typography>
                  <Box component="ul" className="space-y-2 text-slate-700 mb-4">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1 font-bold">•</span>
                      <span><strong>Element is in the Render Tree</strong> - layout is calculated</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1 font-bold">•</span>
                      <span><strong>Only triggers Repaint</strong> - no reflow needed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1 font-bold">•</span>
                      <span><strong>Space is reserved</strong> - element takes up space in layout</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1 font-bold">•</span>
                      <span><strong>Cheaper operation</strong> - just hides pixels, doesn't recalculate layout</span>
                    </li>
                  </Box>
                  <Paper className="bg-white p-4 rounded border border-amber-200">
                    <pre className="text-xs text-slate-700 font-mono">
                      <code>{`element.style.visibility = 'hidden';
// Result: Only repaint
// Layout unchanged
// Space still reserved`}</code>
                    </pre>
                  </Paper>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                  <Typography variant="h5" className="text-red-700 mb-3 font-semibold">
                    display: none
                  </Typography>
                  <Box component="ul" className="space-y-2 text-slate-700 mb-4">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1 font-bold">•</span>
                      <span><strong>Element is NOT in the Render Tree</strong> - completely removed from layout</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1 font-bold">•</span>
                      <span><strong>Triggers Reflow of entire DOM</strong> - layout must be recalculated</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1 font-bold">•</span>
                      <span><strong>No space reserved</strong> - element doesn't take up any space</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1 font-bold">•</span>
                      <span><strong>Expensive operation</strong> - can affect parent, siblings, and children</span>
                    </li>
                  </Box>
                  <Paper className="bg-white p-4 rounded border border-red-200">
                    <pre className="text-xs text-slate-700 font-mono">
                      <code>{`element.style.display = 'none';
// Result: Reflow + Repaint
// Layout recalculated
// Affects entire document
// Space removed`}</code>
                    </pre>
                  </Paper>
                </Box>
              </Grid>
            </Grid>

            <Box className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <Typography variant="h6" className="text-blue-900 mb-3 font-semibold">
                Performance Tip: Minimizing Repaints and Reflows
              </Typography>
              <Typography variant="body2" className="text-slate-700 mb-3 leading-relaxed">
                When you need to hide an element temporarily:
              </Typography>
              <Box component="ul" className="space-y-2 text-slate-700 ml-4">
                <li>• <strong>Use <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-blue-200">visibility: hidden</code></strong> if you need to hide but keep space - only triggers repaint</li>
                <li>• <strong>Use <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-blue-200">display: none</code></strong> if you need to completely remove from layout - triggers reflow</li>
                <li>• <strong>For batch DOM changes:</strong> Hide with <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-blue-200">display: none</code> (1 reflow, 1 repaint), make 100 changes, restore display (total: 2 reflows, 2 repaints) - much better than 100+ reflows!</li>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Reflow Deep Dive */}
        <Card className="mb-8 bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <Box className="flex items-center gap-3 mb-4">
              <Box className="p-2 bg-rose-100 rounded-lg border border-rose-200 flex-shrink-0">
                <Speed className="text-rose-600 text-2xl" />
              </Box>
              <Typography variant="h4" className="text-slate-900 font-bold tracking-tight">
                Reflow (Layout) - In Depth
              </Typography>
            </Box>

            <Typography variant="body1" className="text-slate-700 mb-4 leading-relaxed">
              <strong className="text-rose-600">Reflow</strong> (also called <strong>Layout</strong> or <strong>Layout Calculation</strong>) 
              is a computationally expensive recalculation of the document's layout tree. It determines <em>where and how big</em> elements 
              are (geometry). Every element's position/size may need recomputation, cascading down the DOM tree.
            </Typography>

            <Box className="bg-rose-50 border border-rose-200 rounded-lg p-5 mb-4">
              <Typography variant="h6" className="text-rose-900 mb-3 font-semibold">
                When Does Reflow Occur?
              </Typography>
              <Typography variant="body2" className="text-slate-700 mb-3 leading-relaxed">
                Reflow occurs when changes affect the <strong>layout</strong> of the document:
              </Typography>
              <Box component="ul" className="space-y-2 text-slate-700 ml-4">
                <li>• <strong>Triggers:</strong> <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-rose-200">width</code>, <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-rose-200">position</code>, <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-rose-200">float</code></li>
                <li>• <strong>Recalculation:</strong> Recalculate of positions and dimensions</li>
                <li>• <strong>Has a bigger impact:</strong> Changing a single element can affect all children, ancestors, and siblings or the whole document</li>
                <li>• <strong>Triggers include:</strong> Change DOM or CSS, scrolling, user actions like focus</li>
              </Box>
              <Box className="bg-red-100 border border-red-200 rounded-lg p-4 mt-4">
                <Typography variant="body2" className="text-red-900 font-semibold mb-2">
                  ⚠️ Critical Understanding:
                </Typography>
                <Typography variant="body2" className="text-slate-700 leading-relaxed text-sm">
                  <strong>Reflow only has a cost if the document has changed and invalidated the layout.</strong>
                </Typography>
                <Typography variant="body2" className="text-slate-700 leading-relaxed text-sm mt-2">
                  <strong>Something Invalidates + Something Triggers = Costly Reflow</strong>
                </Typography>
              </Box>
            </Box>

            <Box className="bg-rose-50 border border-rose-200 p-4 rounded-lg mb-4">
              <Typography variant="subtitle2" className="text-rose-700 mb-2 font-semibold">
                Cost: Very High
              </Typography>
              <Typography variant="body2" className="text-slate-700 leading-relaxed text-sm">
                O(n) time complexity for n elements. It invalidates the entire layout subtree. 
                This is why layout thrashing is so expensive—multiple reflows per frame easily exceed the 16ms budget.
              </Typography>
            </Box>

            <Accordion className="bg-slate-50 mb-2 border border-slate-200">
              <AccordionSummary expandIcon={<ExpandMore className="text-slate-600" />}>
                <Typography variant="subtitle2" className="text-slate-800 font-semibold">
                  What Triggers Reflow?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box component="ul" className="space-y-1.5 text-slate-700 text-sm">
                  <li>• Changing element dimensions (width, height)</li>
                  <li>• Changing positioning (top, left, right, bottom, position)</li>
                  <li>• Changing margins, padding, borders</li>
                  <li>• Adding or removing DOM elements</li>
                  <li>• Changing font properties (font-size, font-family)</li>
                  <li>• Changing content (text changes, image loading)</li>
                  <li>• Window resizing</li>
                  <li>• Reading layout properties (offsetWidth, offsetHeight, etc.)</li>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion className="bg-slate-50 mb-2 border border-slate-200">
              <AccordionSummary expandIcon={<ExpandMore className="text-slate-600" />}>
                <Typography variant="subtitle2" className="text-slate-800 font-semibold">
                  Why is Reflow Expensive?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" className="text-slate-700 mb-2 text-sm">
                  Reflow is expensive because:
                </Typography>
                <Box component="ul" className="space-y-1.5 text-slate-700 text-sm">
                  <li>
                    <strong className="text-slate-800">Cascade Effect:</strong> Changing one element can affect its parent,
                    siblings, and children. The browser must recalculate the entire affected subtree.
                  </li>
                  <li>
                    <strong className="text-slate-800">Blocking Operation:</strong> Reflow happens on the main thread,
                    blocking JavaScript execution and user interactions.
                  </li>
                  <li>
                    <strong className="text-slate-800">CPU Intensive:</strong> Calculating positions and sizes for potentially
                    thousands of elements requires significant computation.
                  </li>
                  <li>
                    <strong className="text-slate-800">Can Trigger Repaint:</strong> After reflow, the browser often needs to
                    repaint the affected areas.
                  </li>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Paper className="bg-rose-50 border border-rose-200 p-4 mt-4 rounded-lg">
              <Typography variant="subtitle2" className="text-rose-700 mb-2 font-semibold">
                Example: Reflow Cascade
              </Typography>
              <pre className="text-xs text-slate-700 font-mono bg-slate-100 p-3 rounded border border-slate-200 overflow-x-auto">
                <code>{`// Changing one element can trigger reflow for many others
const container = document.getElementById('container');
container.style.width = '500px'; // Triggers reflow

// This reflow affects:
// 1. The container itself
// 2. All children (they need to recalculate their positions)
// 3. Siblings (if using flexbox/grid)
// 4. Parent (if container affects parent's layout)
// 5. Any absolutely positioned elements within

// Result: Potentially hundreds of elements need recalculation!`}</code>
              </pre>
            </Paper>
          </CardContent>
        </Card>

        {/* Repaint Deep Dive */}
        <Card className="mb-8 bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <Box className="flex items-center gap-3 mb-4">
              <Box className="p-2 bg-amber-100 rounded-lg border border-amber-200 flex-shrink-0">
                <Layers className="text-amber-600 text-2xl" />
              </Box>
              <Typography variant="h4" className="text-slate-900 font-bold tracking-tight">
                Repaint - In Depth
              </Typography>
            </Box>

            <Typography variant="body2" className="text-slate-700 mb-4 leading-relaxed">
              <strong className="text-amber-600">Repaint</strong> is drawing (rasterizing) the visual representation of elements after layout is finalized. 
              It updates pixels for non-geometric changes but <em>relies on a valid layout</em>.
            </Typography>

            <Box className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-4">
              <Typography variant="subtitle2" className="text-amber-700 mb-2 font-semibold">
                Cost: Medium
              </Typography>
              <Typography variant="body2" className="text-slate-700 leading-relaxed text-sm">
                Cheaper than reflow since it doesn't recompute geometry, but still scans the paint tree. 
                Any reflow automatically triggers a repaint.
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <Typography variant="subtitle2" className="text-amber-700 mb-3 font-semibold">
                    What Triggers Repaint?
                  </Typography>
                  <Box component="ul" className="space-y-1.5 text-slate-700 text-xs">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">→</span>
                      <span>Visual-only changes: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">color</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">background-color</code></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">→</span>
                      <span><code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">visibility</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">outline</code></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">→</span>
                      <span><code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">box-shadow</code> (if not layer-promoting)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">→</span>
                      <span>Any reflow automatically triggers a repaint</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">→</span>
                      <span>Scrolling or focusing elements</span>
                    </li>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
                  <Typography variant="subtitle2" className="text-slate-800 mb-3 font-semibold">
                    Repaint vs Reflow
                  </Typography>
                  <Box className="space-y-2 text-slate-700 text-xs">
                    <Box className="bg-amber-100 p-2.5 rounded border border-amber-200">
                      <Typography className="font-semibold text-amber-800 mb-1 text-xs">Repaint:</Typography>
                      <Typography className="text-xs">Only updates pixels, doesn't recalculate layout. Faster than reflow.</Typography>
                    </Box>
                    <Box className="bg-rose-100 p-2.5 rounded border border-rose-200">
                      <Typography className="font-semibold text-rose-800 mb-1 text-xs">Reflow:</Typography>
                      <Typography className="text-xs">Recalculates layout, then repaints. Much slower.</Typography>
                    </Box>
                    <Box className="bg-blue-100 p-2.5 rounded border border-blue-200">
                      <Typography className="font-semibold text-blue-800 text-xs">
                        Key: Reflow → always repaint. Repaint → no reflow (if no geometry changes).
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Composition Layers */}
        <Card className="mb-8 bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <Box className="flex items-center gap-3 mb-4">
              <Box className="p-2 bg-cyan-100 rounded-lg border border-cyan-200 flex-shrink-0">
                <MemoryOutlined className="text-cyan-600 text-2xl" />
              </Box>
              <Typography variant="h4" className="text-slate-900 font-bold tracking-tight">
                Composition Layers - The Key to Smooth Animations
              </Typography>
            </Box>

            <Typography variant="body2" className="text-slate-700 mb-4 leading-relaxed">
              After paint, the browser creates a <strong className="text-cyan-600">layer tree</strong> for compositing. 
              Elements can be "promoted" to their own <strong className="text-cyan-600">compositing layer</strong>—a separate bitmap handled by the GPU compositor thread.
            </Typography>

            <Box className="bg-cyan-50 border border-cyan-200 p-4 rounded-lg mb-4">
              <Typography variant="subtitle2" className="text-cyan-700 mb-2 font-semibold">
                What is a Composition Layer?
              </Typography>
              <Typography variant="body2" className="text-slate-700 leading-relaxed mb-2 text-sm">
                A self-contained paint layer that the browser composites independently. It bypasses main-thread layout/paint for transformations.
              </Typography>
              <Box component="ul" className="space-y-1.5 text-slate-700 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 mt-0.5">•</span>
                  <span><strong className="text-slate-800">Benefits:</strong> GPU-accelerated (parallel to main thread), no reflow/repaint on animate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 mt-0.5">•</span>
                  <span><strong className="text-slate-800">Cost:</strong> Each layer uses ~4-8MB VRAM; too many (e.g., 100+) cause OOM or fallback to CPU</span>
                </li>
              </Box>
            </Box>

            <Grid container spacing={3} className="mb-4">
              <Grid item xs={12} md={6}>
                <Box className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
                  <Typography variant="subtitle2" className="text-cyan-700 mb-3 font-semibold">
                    Layer Creation
                  </Typography>
                  <Box component="ul" className="space-y-2 text-slate-700 text-xs">
                    <li>
                      <strong className="text-slate-800">Automatic:</strong> <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">transform: translateZ(0)</code> or{" "}
                      <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">backface-visibility: hidden</code> hacks promote layers (creates 3D context)
                    </li>
                    <li>
                      <strong className="text-slate-800">Explicit:</strong> <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">will-change: transform</code> (hints browser; use sparingly to avoid memory bloat)
                    </li>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
                  <Typography variant="subtitle2" className="text-cyan-700 mb-3 font-semibold">
                    Rendering Impact
                  </Typography>
                  <Box component="ul" className="space-y-2 text-slate-700 text-xs">
                    <li>
                      <strong className="text-rose-600">Without layers:</strong> Animating <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">left</code> → reflow → repaint → composite (main thread bottleneck)
                    </li>
                    <li>
                      <strong className="text-emerald-600">With layers:</strong> Animating <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">transform: translateX()</code> → only composite (GPU, sub-ms)
                    </li>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Accordion className="bg-slate-50 mb-2 border border-slate-200">
              <AccordionSummary expandIcon={<ExpandMore className="text-slate-600" />}>
                <Typography variant="subtitle2" className="text-slate-800 font-semibold">
                  Properties that Promote Elements to Layers
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" className="text-emerald-700 mb-2 font-semibold text-xs">
                      Automatic Promotion:
                    </Typography>
                    <Box component="ul" className="space-y-1 text-slate-700 text-xs">
                      <li>• <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">transform</code> (any value except none)</li>
                      <li>• <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">opacity</code> (less than 1)</li>
                      <li>• <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">will-change</code> (transform, opacity)</li>
                      <li>• <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">position: fixed</code> or <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">sticky</code></li>
                      <li>• <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">filter</code> (blur, brightness, etc.)</li>
                      <li>• <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">backdrop-filter</code></li>
                      <li>• 3D transforms (<code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">translateZ</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">perspective</code>)</li>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" className="text-blue-700 mb-2 font-semibold text-xs">
                      Manual Promotion:
                    </Typography>
                    <Box component="ul" className="space-y-1 text-slate-700 text-xs">
                      <li>• <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">will-change: transform</code></li>
                      <li>• <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">will-change: opacity</code></li>
                      <li>• <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">transform: translateZ(0)</code></li>
                      <li>• <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">transform: translate3d(0,0,0)</code></li>
                    </Box>
                    <Typography variant="body2" className="text-amber-700 mt-3 text-xs font-semibold">
                      ⚠️ Use <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">will-change</code> sparingly - it consumes memory!
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Paper className="bg-cyan-50 border border-cyan-200 p-4 mt-4 rounded-lg">
              <Typography variant="subtitle2" className="text-cyan-700 mb-2 font-semibold">
                Example: Layer Promotion
              </Typography>
              <pre className="text-xs text-slate-700 font-mono bg-slate-100 p-3 rounded border border-slate-200 overflow-x-auto">
                <code>{`// This element will be promoted to its own layer
.element {
  transform: translateX(100px);
  /* Browser creates a separate layer for this element */
}

// When you animate transform:
.element {
  animation: slide 1s;
}

@keyframes slide {
  from { transform: translateX(0); }
  to { transform: translateX(100px); }
}

// The browser can update ONLY this layer's transform
// No reflow, no repaint of other elements!
// Animation runs on GPU compositor thread - smooth 60 FPS!`}</code>
              </pre>
            </Paper>
          </CardContent>
        </Card>

        {/* How Transform Solves Reflow */}
        <Card className="mb-8 bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <Box className="flex items-center gap-3 mb-4">
              <Box className="p-2 bg-emerald-100 rounded-lg border border-emerald-200 flex-shrink-0">
                <Memory className="text-emerald-600 text-2xl" />
              </Box>
              <Typography variant="h4" className="text-slate-900 font-bold tracking-tight">
                How Transform Solves Reflow Problems
              </Typography>
            </Box>

            <Typography variant="body2" className="text-slate-700 mb-4 leading-relaxed">
              The <code className="bg-slate-100 px-2 py-0.5 rounded font-mono text-sm">transform</code> property is
              special because it operates in the <strong className="text-emerald-600">compositing stage</strong>, completely
              bypassing layout and paint.
            </Typography>

            <Grid container spacing={3} className="mb-4">
              <Grid item xs={12} md={6}>
                <Paper className="bg-rose-50 border border-rose-200 p-4 rounded-lg">
                  <Typography variant="subtitle2" className="text-rose-700 mb-2 font-semibold">
                    ❌ Using left/top (Causes Reflow)
                  </Typography>
                  <pre className="text-xs text-slate-700 font-mono bg-slate-100 p-3 rounded border border-slate-200 overflow-x-auto">
                    <code>{`// Main Thread Operations:
element.style.left = '100px';
element.style.top = '50px';

1. JavaScript executes (main thread)
2. Style change invalidates layout
3. Browser recalculates layout (REFLOW)
4. Browser repaints element (REPAINT)
5. Compositor combines layers

Result: ~5-10ms per frame
       Blocking main thread
       Can cause jank`}</code>
                  </pre>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
                  <Typography variant="subtitle2" className="text-emerald-700 mb-2 font-semibold">
                    ✅ Using transform (No Reflow)
                  </Typography>
                  <pre className="text-xs text-slate-700 font-mono bg-slate-100 p-3 rounded border border-slate-200 overflow-x-auto">
                    <code>{`// Compositor Thread Operations:
element.style.transform = 
  'translate(100px, 50px)';

1. JavaScript executes (main thread)
2. Transform change sent to compositor
3. Compositor updates layer transform
4. GPU composites layers

Result: ~0.1-0.5ms per frame
       Non-blocking
       Smooth 60 FPS!`}</code>
                  </pre>
                </Paper>
              </Grid>
            </Grid>

            <Box className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
              <Typography variant="subtitle2" className="text-emerald-700 mb-3 font-semibold">
                Why Transform is So Fast
              </Typography>
              <Box component="ul" className="space-y-1.5 text-slate-700 text-sm">
                <li>
                  <strong className="text-slate-800">No Layout Calculation:</strong> Transform doesn't affect the document
                  flow. The element's layout position remains unchanged.
                </li>
                <li>
                  <strong className="text-slate-800">No Repaint:</strong> The browser doesn't need to repaint the element.
                  It just applies a matrix transformation to the existing layer.
                </li>
                <li>
                  <strong className="text-slate-800">GPU Acceleration:</strong> Transform operations are handled by the GPU,
                  which is optimized for matrix transformations.
                </li>
                <li>
                  <strong className="text-slate-800">Compositor Thread:</strong> The compositor runs on a separate thread,
                  so it doesn't block the main thread or JavaScript execution.
                </li>
                <li>
                  <strong className="text-slate-800">Layer Caching:</strong> The element is rendered once into a layer, then
                  that layer can be transformed without re-rendering.
                </li>
              </Box>
            </Box>

            <Paper className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
              <Typography variant="subtitle2" className="text-slate-800 mb-3 font-semibold">
                Visual Comparison
              </Typography>
              <Box className="space-y-3">
                <Box>
                  <Typography variant="body2" className="text-rose-700 mb-2 font-medium text-xs">
                    left/top Animation Pipeline:
                  </Typography>
                  <Box className="flex items-center gap-2 text-xs text-slate-700 flex-wrap">
                    <span className="bg-rose-500 text-white px-2 py-1 rounded text-xs">JS</span>
                    <span>→</span>
                    <span className="bg-rose-500 text-white px-2 py-1 rounded text-xs">Reflow</span>
                    <span>→</span>
                    <span className="bg-rose-500 text-white px-2 py-1 rounded text-xs">Repaint</span>
                    <span>→</span>
                    <span className="bg-rose-500 text-white px-2 py-1 rounded text-xs">Composite</span>
                    <span className="text-rose-600 ml-2 font-medium">(~5-10ms)</span>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2" className="text-emerald-700 mb-2 font-medium text-xs">
                    transform Animation Pipeline:
                  </Typography>
                  <Box className="flex items-center gap-2 text-xs text-slate-700">
                    <span className="bg-emerald-500 text-white px-2 py-1 rounded text-xs">JS</span>
                    <span>→</span>
                    <span className="bg-emerald-500 text-white px-2 py-1 rounded text-xs">Composite</span>
                    <span className="text-emerald-600 ml-2 font-medium">(~0.1-0.5ms)</span>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </CardContent>
        </Card>

        {/* Browser Threads */}
        <Card className="mb-8 bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <Typography variant="h4" className="mb-6 text-slate-900 font-bold tracking-tight">
              Browser Threads and Architecture
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <Typography variant="subtitle2" className="text-blue-700 mb-3 font-semibold">
                    Main Thread
                  </Typography>
                  <Box component="ul" className="space-y-1.5 text-slate-700 text-sm">
                    <li>• JavaScript execution</li>
                    <li>• DOM manipulation</li>
                    <li>• Style calculation</li>
                    <li>• Layout (Reflow)</li>
                    <li>• Paint (Repaint)</li>
                  </Box>
                  <Typography variant="body2" className="text-amber-700 mt-3 text-xs font-semibold">
                    ⚠️ Blocking operations here cause jank!
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
                  <Typography variant="subtitle2" className="text-emerald-700 mb-3 font-semibold">
                    Compositor Thread
                  </Typography>
                  <Box component="ul" className="space-y-1.5 text-slate-700 text-sm">
                    <li>• Layer compositing</li>
                    <li>• Transform operations</li>
                    <li>• Opacity changes</li>
                    <li>• Scrolling (often)</li>
                    <li>• GPU-accelerated operations</li>
                  </Box>
                  <Typography variant="body2" className="text-emerald-700 mt-3 text-xs font-semibold">
                    ✅ Non-blocking, runs in parallel!
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Box className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mt-4">
              <Typography variant="body2" className="text-blue-800 text-sm leading-relaxed">
                <strong className="text-blue-700">Key Insight:</strong> By using <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">transform</code> and <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">opacity</code>,
                you move work from the main thread to the compositor thread, achieving smooth
                60 FPS animations even when the main thread is busy.
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Minimizing Repaints and Reflows */}
        <Card className="mb-8 bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <Typography variant="h4" className="mb-6 text-slate-900 font-bold tracking-tight">
              Minimizing Repaints and Reflows
            </Typography>

            <Box className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
              <Typography variant="h6" className="text-blue-900 mb-3 font-semibold">
                General Principles
              </Typography>
              <Box component="ul" className="space-y-2 text-slate-700 ml-4">
                <li>• <strong>Don't change styles by multiple statements</strong> - instead add a class or change <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-blue-200">cssText</code></li>
                <li>• <strong>Batch DOM changes</strong> - make all changes at once</li>
                <li>• <strong>Don't ask for computed styles repeatedly</strong> - cache them into variables</li>
                <li>• <strong>Avoid multiple reads/writes</strong> - read everything first, then write everything</li>
              </Box>
            </Box>

            <Grid container spacing={4} className="mb-6">
              <Grid item xs={12}>
                <Box className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                  <Typography variant="h5" className="text-red-700 mb-4 font-semibold">
                    ❌ Bad Code: 6 Costly Reflows
                  </Typography>
                  <Typography variant="body2" className="text-slate-700 mb-4 leading-relaxed">
                    This code causes 6 separate reflows because it interleaves reads and writes:
                  </Typography>
                  <Paper className="bg-slate-900 p-5 rounded-lg border border-slate-800">
                    <pre className="text-sm text-slate-300 font-mono overflow-x-auto leading-relaxed">
                      <code>{`// ❌ BAD: 6 costly reflows (layout)
var box1Height = document.getElementById('box1').clientHeight;
document.getElementById('box1').style.height = box1Height + 10 + 'px';

var box2Height = document.getElementById('box2').clientHeight;
document.getElementById('box2').style.height = box2Height + 10 + 'px';

var box3Height = document.getElementById('box3').clientHeight;
document.getElementById('box3').style.height = box3Height + 10 + 'px';

var box4Height = document.getElementById('box4').clientHeight;
document.getElementById('box4').style.height = box4Height + 10 + 'px';

var box5Height = document.getElementById('box5').clientHeight;
document.getElementById('box5').style.height = box5Height + 10 + 'px';

var box6Height = document.getElementById('box6').clientHeight;
document.getElementById('box6').style.height = box6Height + 10 + 'px';

// Pattern: Read (forces reflow) → Write (invalidates layout) × 6
// Result: 6 reflows, each taking 1-5ms = 6-30ms total
// Frame budget exceeded!`}</code>
                    </pre>
                  </Paper>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-6">
                  <Typography variant="h5" className="text-emerald-700 mb-4 font-semibold">
                    ✅ Optimized Code: 1 Reflow
                  </Typography>
                  <Typography variant="body2" className="text-slate-700 mb-4 leading-relaxed">
                    This code causes only 1 reflow by batching all reads first, then all writes:
                  </Typography>
                  <Paper className="bg-slate-900 p-5 rounded-lg border border-slate-800">
                    <pre className="text-sm text-slate-300 font-mono overflow-x-auto leading-relaxed">
                      <code>{`// ✅ GOOD: Only 1 reflow (layout)
// Step 1: Read all layout properties first
var box1Height = document.getElementById('box1').clientHeight;
var box2Height = document.getElementById('box2').clientHeight;
var box3Height = document.getElementById('box3').clientHeight;
var box4Height = document.getElementById('box4').clientHeight;
var box5Height = document.getElementById('box5').clientHeight;
var box6Height = document.getElementById('box6').clientHeight;

// Step 2: Write all style changes together
document.getElementById('box1').style.height = box1Height + 10 + 'px';
document.getElementById('box2').style.height = box2Height + 10 + 'px';
document.getElementById('box3').style.height = box3Height + 10 + 'px';
document.getElementById('box4').style.height = box4Height + 10 + 'px';
document.getElementById('box5').style.height = box5Height + 10 + 'px';
document.getElementById('box6').style.height = box6Height + 10 + 'px';

// Pattern: Read all (1 reflow) → Write all (1 reflow)
// Result: 2 reflows total, ~2-10ms
// Stays within frame budget!`}</code>
                    </pre>
                  </Paper>
                </Box>
              </Grid>
            </Grid>

            <Box className="bg-indigo-50 border border-indigo-200 rounded-lg p-5">
              <Typography variant="h6" className="text-indigo-900 mb-3 font-semibold">
                Options to Batch DOM Changes
              </Typography>
              <Box component="ul" className="space-y-3 text-slate-700 ml-4">
                <li>
                  <strong>1. Use a documentFragment</strong> to hold temp changes:
                  <pre className="bg-white p-2 rounded border border-indigo-200 mt-2 text-xs font-mono">
                    <code>{`const fragment = document.createDocumentFragment();
// Make changes to fragment
// Append fragment to DOM once`}</code>
                  </pre>
                </li>
                <li>
                  <strong>2. Clone, update, replace the node:</strong>
                  <pre className="bg-white p-2 rounded border border-indigo-200 mt-2 text-xs font-mono">
                    <code>{`const clone = element.cloneNode(true);
// Modify clone
element.parentNode.replaceChild(clone, element);`}</code>
                  </pre>
                </li>
                <li>
                  <strong>3. Hide element with display: none</strong> (1 reflow, 1 repaint), add 100 changes, restore display (total: 2 reflows, 2 repaints):
                  <pre className="bg-white p-2 rounded border border-indigo-200 mt-2 text-xs font-mono">
                    <code>{`element.style.display = 'none';
// Make 100 changes
element.style.display = 'block';
// Total: 2 reflows, 2 repaints (vs 100+ reflows)`}</code>
                  </pre>
                </li>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Performance Tips */}
        <Card className="mb-8 bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <Typography variant="h4" className="mb-6 text-slate-900 font-bold tracking-tight">
              Performance Optimization Checklist
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box className="bg-emerald-50 border border-emerald-200 p-5 rounded-lg">
                  <Typography variant="h6" className="text-emerald-700 mb-4 font-semibold">
                    ✅ Best Practices
                  </Typography>
                  <Box component="ul" className="space-y-2 text-slate-700">
                    <li>• Use <code className="bg-white px-1.5 py-0.5 rounded font-mono text-xs border border-emerald-200">transform</code> for position changes</li>
                    <li>• Use <code className="bg-white px-1.5 py-0.5 rounded font-mono text-xs border border-emerald-200">opacity</code> for fade effects</li>
                    <li>• Batch DOM reads and writes (read all, then write all)</li>
                    <li>• Use <code className="bg-white px-1.5 py-0.5 rounded font-mono text-xs border border-emerald-200">requestAnimationFrame</code> for animations</li>
                    <li>• Minimize layout-triggering properties</li>
                    <li>• Use <code className="bg-white px-1.5 py-0.5 rounded font-mono text-xs border border-emerald-200">will-change</code> for upcoming animations</li>
                    <li>• Avoid reading layout properties in loops</li>
                    <li>• Cache computed values when possible</li>
                    <li>• Use <code className="bg-white px-1.5 py-0.5 rounded font-mono text-xs border border-emerald-200">documentFragment</code> for batch DOM changes</li>
                    <li>• Optimize selectors (ID-based selectors are fastest)</li>
                    <li>• Cache length during loops</li>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box className="bg-rose-50 border border-rose-200 p-5 rounded-lg">
                  <Typography variant="h6" className="text-rose-700 mb-4 font-semibold">
                    ❌ Common Mistakes
                  </Typography>
                  <Box component="ul" className="space-y-2 text-slate-700">
                    <li>• Using <code className="bg-white px-1.5 py-0.5 rounded font-mono text-xs border border-rose-200">left</code>/<code className="bg-white px-1.5 py-0.5 rounded font-mono text-xs border border-rose-200">top</code> for animations</li>
                    <li>• Interleaving reads and writes (read-write-read-write cycle)</li>
                    <li>• Using <code className="bg-white px-1.5 py-0.5 rounded font-mono text-xs border border-rose-200">setInterval</code> for animations</li>
                    <li>• Reading layout properties repeatedly</li>
                    <li>• Making style changes in loops</li>
                    <li>• Overusing <code className="bg-white px-1.5 py-0.5 rounded font-mono text-xs border border-rose-200">will-change</code></li>
                    <li>• Not batching DOM operations</li>
                    <li>• Using complex selectors (jQuery extensions like :even, :has, :gt)</li>
                    <li>• Inspecting large numbers of nodes without caching</li>
                    <li>• Not caching DOM values in script variables</li>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box className="bg-slate-50 border border-slate-200 rounded-lg p-5 mt-6">
              <Typography variant="h6" className="text-slate-900 mb-3 font-semibold">
                Chrome DevTools Performance Panel
              </Typography>
              <Typography variant="body2" className="text-slate-700 mb-3 leading-relaxed">
                Chrome provides a great tool that helps us figure out what's going on with our code:
              </Typography>
              <Box component="ul" className="space-y-2 text-slate-700 ml-4">
                <li>• <strong>How many reflows (layout) and repaints</strong> we have</li>
                <li>• <strong>Memory usage</strong> and performance metrics</li>
                <li>• <strong>Event timing</strong> and call stacks</li>
                <li>• <strong>Frame rate</strong> and jank detection</li>
                <li>• <strong>Forced synchronous layout</strong> warnings</li>
              </Box>
              <Typography variant="body2" className="text-slate-700 mt-3 leading-relaxed">
                Use the Performance panel to record your page and identify layout thrashing issues. Look for:
              </Typography>
              <Box component="ul" className="space-y-1 text-slate-700 ml-4 mt-2">
                <li>• Purple "Layout" bars stacked in the timeline</li>
                <li>• "Forced reflow" warnings in the console</li>
                <li>• Frame drops (red triangles in the FPS graph)</li>
                <li>• High CPU usage during animations</li>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 border-0 shadow-lg rounded-xl">
          <CardContent className="p-10 text-center">
            <Typography variant="h4" className="mb-6 text-white font-bold">
              Key Takeaways
            </Typography>
            <Box className="max-w-3xl mx-auto space-y-3 text-white">
              <Typography className="text-base">
                • <strong>Reflow</strong> is expensive - avoid triggering it unnecessarily. Use <code className="bg-white/20 px-2 py-1 rounded text-xs">transform</code> instead of layout properties.
              </Typography>
              <Typography className="text-base">
                • <strong>Transform</strong> and <strong>opacity</strong> bypass reflow/repaint - they're composite-only properties.
              </Typography>
              <Typography className="text-base">
                • <strong>Composition layers</strong> enable GPU-accelerated animations for smooth 60fps.
              </Typography>
              <Typography className="text-base">
                • <strong>Batch operations</strong> - read all first, then write all to minimize layout thrashing.
              </Typography>
              <Typography className="text-base">
                • <strong>visibility: hidden</strong> only repaints, while <strong>display: none</strong> triggers reflow.
              </Typography>
              <Typography className="text-base">
                • The <strong>compositor thread</strong> runs independently of the main thread, enabling non-blocking animations.
              </Typography>
              <Typography className="text-base">
                • Use <strong>Chrome DevTools Performance panel</strong> to identify layout thrashing issues.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

