"use client";

import { Box, Button, Container, Typography, Card, CardContent, Paper, Grid, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore, Layers, Speed, Memory, MemoryOutlined } from "@mui/icons-material";
import Link from "next/link";

export default function DeepDivePage() {
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
            Deep Dive: Browser Rendering Pipeline
          </Typography>
          <Typography variant="body1" className="text-gray-400 text-lg">
            A comprehensive exploration of how browsers render web pages, from HTML parsing to
            pixels on screen. Understand reflow, repaint, composition layers, and GPU acceleration.
          </Typography>
        </Box>

        {/* Browser Rendering Pipeline Overview */}
        <Card className="mb-8 bg-gray-800 border border-gray-700">
          <CardContent className="p-8">
            <Typography variant="h4" className="mb-6 text-white">
              The Complete Browser Rendering Pipeline
            </Typography>
            <Typography variant="body1" className="text-gray-300 mb-6 text-lg leading-relaxed">
              When you load a webpage, the browser goes through a complex process to convert HTML,
              CSS, and JavaScript into pixels on your screen. Understanding this pipeline is
              crucial for writing performant web applications.
            </Typography>

            <Box className="space-y-6">
              {/* Step 1 */}
              <Paper className="bg-gray-900 p-6 border-l-4 border-blue-500">
                <Typography variant="h5" className="text-blue-400 mb-3">
                  1. Parsing: HTML → DOM
                </Typography>
                <Typography variant="body2" className="text-gray-300 mb-3">
                  The browser parses HTML markup and creates the <strong>Document Object Model (DOM)</strong>.
                  The DOM is a tree structure representing the document's structure.
                </Typography>
                <Paper className="bg-black p-4 mt-3">
                  <pre className="text-xs text-gray-300">
                    <code>{`<html>
  <body>
    <div id="container">
      <p>Hello World</p>
    </div>
  </body>
</html>

↓ Parsed into DOM Tree

html
└── body
    └── div#container
        └── p
            └── "Hello World"`}</code>
                  </pre>
                </Paper>
              </Paper>

              {/* Step 2 */}
              <Paper className="bg-gray-900 p-6 border-l-4 border-purple-500">
                <Typography variant="h5" className="text-purple-400 mb-3">
                  2. Parsing: CSS → CSSOM
                </Typography>
                <Typography variant="body2" className="text-gray-300 mb-3">
                  The browser parses CSS and creates the <strong>CSS Object Model (CSSOM)</strong>.
                  The CSSOM represents all the styles that apply to the document.
                </Typography>
                <Paper className="bg-black p-4 mt-3">
                  <pre className="text-xs text-gray-300">
                    <code>{`/* CSS */
body { font-size: 16px; }
#container { width: 100%; }
p { color: blue; }

↓ Parsed into CSSOM

{
  body: { fontSize: '16px' },
  '#container': { width: '100%' },
  p: { color: 'blue' }
}`}</code>
                  </pre>
                </Paper>
              </Paper>

              {/* Step 3 */}
              <Paper className="bg-gray-900 p-6 border-l-4 border-green-500">
                <Typography variant="h5" className="text-green-400 mb-3">
                  3. Render Tree Construction
                </Typography>
                <Typography variant="body2" className="text-gray-300 mb-3">
                  The browser combines the DOM and CSSOM to create the <strong>Render Tree</strong>.
                  This tree only includes visible elements (excludes <code>display: none</code> elements)
                  and contains computed styles for each element.
                </Typography>
                <Typography variant="body2" className="text-gray-300">
                  <strong>Key Point:</strong> The render tree is different from the DOM tree because
                  it only includes what will be rendered and has computed styles applied.
                </Typography>
              </Paper>

              {/* Step 4 */}
              <Paper className="bg-gray-900 p-6 border-l-4 border-yellow-500">
                <Typography variant="h5" className="text-yellow-400 mb-3">
                  4. Layout (Reflow)
                </Typography>
                <Typography variant="body2" className="text-gray-300 mb-3">
                  The browser calculates the exact position and size of each element in the render
                  tree. This process is called <strong>Layout</strong> or <strong>Reflow</strong>.
                </Typography>
                <Box className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mt-3">
                  <Typography variant="body2" className="text-yellow-300 mb-2">
                    <strong>What happens during Layout:</strong>
                  </Typography>
                  <Box component="ul" className="space-y-1 text-gray-300 text-sm ml-4">
                    <li>• Calculate positions (x, y coordinates)</li>
                    <li>• Calculate sizes (width, height)</li>
                    <li>• Handle box model (margin, border, padding)</li>
                    <li>• Process flexbox/grid layouts</li>
                    <li>• Handle text wrapping and line breaks</li>
                  </Box>
                </Box>
                <Typography variant="body2" className="text-red-300 mt-4">
                  <strong>⚠️ This is expensive!</strong> Layout is one of the most costly operations
                  because it can affect the entire page. A change to one element can trigger layout
                  recalculation for its parent, siblings, and children.
                </Typography>
              </Paper>

              {/* Step 5 */}
              <Paper className="bg-gray-900 p-6 border-l-4 border-pink-500">
                <Typography variant="h5" className="text-pink-400 mb-3">
                  5. Paint (Repaint)
                </Typography>
                <Typography variant="body2" className="text-gray-300 mb-3">
                  The browser fills in the pixels for each element. This process is called{" "}
                  <strong>Paint</strong> or <strong>Repaint</strong>. It involves drawing text,
                  colors, images, borders, shadows, etc.
                </Typography>
                <Box className="bg-pink-900/20 border border-pink-700 rounded-lg p-4 mt-3">
                  <Typography variant="body2" className="text-pink-300 mb-2">
                    <strong>What happens during Paint:</strong>
                  </Typography>
                  <Box component="ul" className="space-y-1 text-gray-300 text-sm ml-4">
                    <li>• Fill background colors</li>
                    <li>• Draw borders and shadows</li>
                    <li>• Render text with fonts</li>
                    <li>• Draw images and gradients</li>
                    <li>• Apply visual effects</li>
                  </Box>
                </Box>
                <Typography variant="body2" className="text-gray-300 mt-4">
                  <strong>Note:</strong> Paint is less expensive than Layout, but still requires
                  CPU/GPU resources. Multiple paint operations can still cause performance issues.
                </Typography>
              </Paper>

              {/* Step 6 */}
              <Paper className="bg-gray-900 p-6 border-l-4 border-cyan-500">
                <Typography variant="h5" className="text-cyan-400 mb-3">
                  6. Compositing
                </Typography>
                <Typography variant="body2" className="text-gray-300 mb-3">
                  The browser combines all painted layers into the final image displayed on screen.
                  This is the <strong>Compositing</strong> stage, which happens on the{" "}
                  <strong>Compositor Thread</strong> (often GPU-accelerated).
                </Typography>
                <Box className="bg-cyan-900/20 border border-cyan-700 rounded-lg p-4 mt-3">
                  <Typography variant="body2" className="text-cyan-300 mb-2">
                    <strong>Compositing Layers:</strong>
                  </Typography>
                  <Typography variant="body2" className="text-gray-300 text-sm">
                    Elements can be promoted to their own compositing layers. These layers are
                    rendered separately and then combined. This allows the browser to update only
                    the changed layers without repainting everything.
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </CardContent>
        </Card>

        {/* Reflow Deep Dive */}
        <Card className="mb-8 bg-gray-800 border border-gray-700">
          <CardContent className="p-8">
            <Typography variant="h4" className="mb-6 text-white flex items-center gap-2">
              <Speed className="text-red-400" />
              Reflow (Layout) - In Depth
            </Typography>

            <Typography variant="body1" className="text-gray-300 mb-6 text-lg leading-relaxed">
              <strong>Reflow</strong> is the process of recalculating the positions and sizes of
              elements. It's triggered when the layout of the page changes.
            </Typography>

            <Accordion className="bg-gray-900 mb-3">
              <AccordionSummary expandIcon={<ExpandMore className="text-white" />}>
                <Typography variant="h6" className="text-white">
                  What Triggers Reflow?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box component="ul" className="space-y-2 text-gray-300">
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

            <Accordion className="bg-gray-900 mb-3">
              <AccordionSummary expandIcon={<ExpandMore className="text-white" />}>
                <Typography variant="h6" className="text-white">
                  Why is Reflow Expensive?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" className="text-gray-300 mb-3">
                  Reflow is expensive because:
                </Typography>
                <Box component="ul" className="space-y-2 text-gray-300">
                  <li>
                    <strong>Cascade Effect:</strong> Changing one element can affect its parent,
                    siblings, and children. The browser must recalculate the entire affected subtree.
                  </li>
                  <li>
                    <strong>Blocking Operation:</strong> Reflow happens on the main thread,
                    blocking JavaScript execution and user interactions.
                  </li>
                  <li>
                    <strong>CPU Intensive:</strong> Calculating positions and sizes for potentially
                    thousands of elements requires significant computation.
                  </li>
                  <li>
                    <strong>Can Trigger Repaint:</strong> After reflow, the browser often needs to
                    repaint the affected areas.
                  </li>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Paper className="bg-red-900/20 border border-red-700 p-4 mt-4">
              <Typography variant="h6" className="text-red-400 mb-2">
                Example: Reflow Cascade
              </Typography>
              <pre className="text-xs text-gray-300">
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
        <Card className="mb-8 bg-gray-800 border border-gray-700">
          <CardContent className="p-8">
            <Typography variant="h4" className="mb-6 text-white flex items-center gap-2">
              <Layers className="text-yellow-400" />
              Repaint - In Depth
            </Typography>

            <Typography variant="body1" className="text-gray-300 mb-6 text-lg leading-relaxed">
              <strong>Repaint</strong> occurs when the visual appearance of an element changes
              without affecting its layout. It's less expensive than reflow but still impacts
              performance.
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper className="bg-gray-900 p-4">
                  <Typography variant="h6" className="text-yellow-400 mb-3">
                    What Triggers Repaint?
                  </Typography>
                  <Box component="ul" className="space-y-1 text-gray-300 text-sm">
                    <li>• Changing background-color</li>
                    <li>• Changing color</li>
                    <li>• Changing visibility</li>
                    <li>• Changing opacity</li>
                    <li>• Changing box-shadow</li>
                    <li>• Changing outline</li>
                    <li>• Changing border-color</li>
                    <li>• Changing text-decoration</li>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper className="bg-gray-900 p-4">
                  <Typography variant="h6" className="text-green-400 mb-3">
                    Repaint vs Reflow
                  </Typography>
                  <Box className="space-y-2 text-gray-300 text-sm">
                    <Typography>
                      <strong>Repaint:</strong> Only updates pixels, doesn't recalculate layout.
                      Faster than reflow.
                    </Typography>
                    <Typography>
                      <strong>Reflow:</strong> Recalculates layout, then repaints. Much slower.
                    </Typography>
                    <Typography className="text-yellow-300 mt-2">
                      <strong>Note:</strong> Reflow always triggers repaint, but repaint doesn't
                      trigger reflow.
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Composition Layers */}
        <Card className="mb-8 bg-gray-800 border border-gray-700">
          <CardContent className="p-8">
            <Typography variant="h4" className="mb-6 text-white flex items-center gap-2">
              <MemoryOutlined className="text-cyan-400" />
              Composition Layers - The Key to Performance
            </Typography>

            <Typography variant="body1" className="text-gray-300 mb-6 text-lg leading-relaxed">
              <strong>Composition Layers</strong> are separate rendering surfaces that the browser
              can composite together. Elements promoted to their own layers can be updated
              independently without affecting other elements.
            </Typography>

            <Box className="bg-cyan-900/20 border border-cyan-700 rounded-lg p-6 mb-6">
              <Typography variant="h6" className="text-cyan-400 mb-3">
                How Composition Layers Work
              </Typography>
              <Box component="ol" className="space-y-3 text-gray-300">
                <li>
                  <strong>1. Layer Promotion:</strong> Elements with certain CSS properties are
                  automatically promoted to their own compositing layer.
                </li>
                <li>
                  <strong>2. Separate Rendering:</strong> Each layer is rendered independently,
                  often on the GPU.
                </li>
                <li>
                  <strong>3. Compositing:</strong> The compositor thread combines all layers into
                  the final image.
                </li>
                <li>
                  <strong>4. Independent Updates:</strong> When a layer changes, only that layer
                  needs to be repainted, not the entire page.
                </li>
              </Box>
            </Box>

            <Accordion className="bg-gray-900 mb-3">
              <AccordionSummary expandIcon={<ExpandMore className="text-white" />}>
                <Typography variant="h6" className="text-white">
                  Properties that Promote Elements to Layers
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" className="text-green-400 mb-2 font-bold">
                      Automatic Promotion:
                    </Typography>
                    <Box component="ul" className="space-y-1 text-gray-300 text-sm">
                      <li>• <code>transform</code> (any value except none)</li>
                      <li>• <code>opacity</code> (less than 1)</li>
                      <li>• <code>will-change</code> (transform, opacity)</li>
                      <li>• <code>position: fixed</code> or <code>sticky</code></li>
                      <li>• <code>filter</code> (blur, brightness, etc.)</li>
                      <li>• <code>backdrop-filter</code></li>
                      <li>• 3D transforms (<code>translateZ</code>, <code>perspective</code>)</li>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" className="text-blue-400 mb-2 font-bold">
                      Manual Promotion:
                    </Typography>
                    <Box component="ul" className="space-y-1 text-gray-300 text-sm">
                      <li>• <code>will-change: transform</code></li>
                      <li>• <code>will-change: opacity</code></li>
                      <li>• <code>transform: translateZ(0)</code></li>
                      <li>• <code>transform: translate3d(0,0,0)</code></li>
                    </Box>
                    <Typography variant="body2" className="text-yellow-300 mt-3 text-xs">
                      ⚠️ Use <code>will-change</code> sparingly - it consumes memory!
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Paper className="bg-gray-900 p-4 mt-4">
              <Typography variant="h6" className="text-cyan-400 mb-3">
                Example: Layer Promotion
              </Typography>
              <pre className="text-xs text-gray-300">
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
        <Card className="mb-8 bg-gray-800 border border-gray-700">
          <CardContent className="p-8">
            <Typography variant="h4" className="mb-6 text-white flex items-center gap-2">
              <Memory className="text-green-400" />
              How Transform Solves Reflow Problems
            </Typography>

            <Typography variant="body1" className="text-gray-300 mb-6 text-lg leading-relaxed">
              The <code className="bg-gray-900 px-2 py-1 rounded">transform</code> property is
              special because it operates in the <strong>compositing stage</strong>, completely
              bypassing layout and paint.
            </Typography>

            <Grid container spacing={4} className="mb-6">
              <Grid item xs={12} md={6}>
                <Paper className="bg-red-900/20 border border-red-700 p-4">
                  <Typography variant="h6" className="text-red-400 mb-3">
                    ❌ Using left/top (Causes Reflow)
                  </Typography>
                  <pre className="text-xs text-gray-300 mb-3">
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
                <Paper className="bg-green-900/20 border border-green-700 p-4">
                  <Typography variant="h6" className="text-green-400 mb-3">
                    ✅ Using transform (No Reflow)
                  </Typography>
                  <pre className="text-xs text-gray-300 mb-3">
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

            <Box className="bg-green-900/20 border border-green-700 rounded-lg p-6">
              <Typography variant="h6" className="text-green-400 mb-3">
                Why Transform is So Fast
              </Typography>
              <Box component="ul" className="space-y-2 text-gray-300">
                <li>
                  <strong>No Layout Calculation:</strong> Transform doesn't affect the document
                  flow. The element's layout position remains unchanged.
                </li>
                <li>
                  <strong>No Repaint:</strong> The browser doesn't need to repaint the element.
                  It just applies a matrix transformation to the existing layer.
                </li>
                <li>
                  <strong>GPU Acceleration:</strong> Transform operations are handled by the GPU,
                  which is optimized for matrix transformations.
                </li>
                <li>
                  <strong>Compositor Thread:</strong> The compositor runs on a separate thread,
                  so it doesn't block the main thread or JavaScript execution.
                </li>
                <li>
                  <strong>Layer Caching:</strong> The element is rendered once into a layer, then
                  that layer can be transformed without re-rendering.
                </li>
              </Box>
            </Box>

            <Paper className="bg-gray-900 p-4 mt-6">
              <Typography variant="h6" className="text-white mb-3">
                Visual Comparison
              </Typography>
              <Box className="space-y-4">
                <Box>
                  <Typography variant="body2" className="text-red-400 mb-2">
                    left/top Animation Pipeline:
                  </Typography>
                  <Box className="flex items-center gap-2 text-xs text-gray-300">
                    <span className="bg-red-500 px-2 py-1 rounded">JS</span>
                    <span>→</span>
                    <span className="bg-red-500 px-2 py-1 rounded">Reflow</span>
                    <span>→</span>
                    <span className="bg-red-500 px-2 py-1 rounded">Repaint</span>
                    <span>→</span>
                    <span className="bg-red-500 px-2 py-1 rounded">Composite</span>
                    <span className="text-red-400 ml-2">(~5-10ms)</span>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2" className="text-green-400 mb-2">
                    transform Animation Pipeline:
                  </Typography>
                  <Box className="flex items-center gap-2 text-xs text-gray-300">
                    <span className="bg-green-500 px-2 py-1 rounded">JS</span>
                    <span>→</span>
                    <span className="bg-green-500 px-2 py-1 rounded">Composite</span>
                    <span className="text-green-400 ml-2">(~0.1-0.5ms)</span>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </CardContent>
        </Card>

        {/* Browser Threads */}
        <Card className="mb-8 bg-gray-800 border border-gray-700">
          <CardContent className="p-8">
            <Typography variant="h4" className="mb-6 text-white">
              Browser Threads and Architecture
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper className="bg-gray-900 p-4">
                  <Typography variant="h6" className="text-blue-400 mb-3">
                    Main Thread
                  </Typography>
                  <Box component="ul" className="space-y-2 text-gray-300 text-sm">
                    <li>• JavaScript execution</li>
                    <li>• DOM manipulation</li>
                    <li>• Style calculation</li>
                    <li>• Layout (Reflow)</li>
                    <li>• Paint (Repaint)</li>
                  </Box>
                  <Typography variant="body2" className="text-yellow-300 mt-3 text-xs">
                    ⚠️ Blocking operations here cause jank!
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper className="bg-gray-900 p-4">
                  <Typography variant="h6" className="text-green-400 mb-3">
                    Compositor Thread
                  </Typography>
                  <Box component="ul" className="space-y-2 text-gray-300 text-sm">
                    <li>• Layer compositing</li>
                    <li>• Transform operations</li>
                    <li>• Opacity changes</li>
                    <li>• Scrolling (often)</li>
                    <li>• GPU-accelerated operations</li>
                  </Box>
                  <Typography variant="body2" className="text-green-300 mt-3 text-xs">
                    ✅ Non-blocking, runs in parallel!
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Box className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mt-6">
              <Typography variant="body2" className="text-blue-300">
                <strong>Key Insight:</strong> By using <code>transform</code> and <code>opacity</code>,
                you move work from the main thread to the compositor thread, achieving smooth
                60 FPS animations even when the main thread is busy.
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Performance Tips */}
        <Card className="mb-8 bg-gray-800 border border-gray-700">
          <CardContent className="p-8">
            <Typography variant="h4" className="mb-6 text-white">
              Performance Optimization Checklist
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box className="bg-gray-900 p-4 rounded-lg">
                  <Typography variant="h6" className="text-green-400 mb-3">
                    ✅ Best Practices
                  </Typography>
                  <Box component="ul" className="space-y-2 text-gray-300 text-sm">
                    <li>• Use <code>transform</code> for position changes</li>
                    <li>• Use <code>opacity</code> for fade effects</li>
                    <li>• Batch DOM reads and writes</li>
                    <li>• Use <code>requestAnimationFrame</code> for animations</li>
                    <li>• Minimize layout-triggering properties</li>
                    <li>• Use <code>will-change</code> for upcoming animations</li>
                    <li>• Avoid reading layout properties in loops</li>
                    <li>• Cache computed values when possible</li>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box className="bg-gray-900 p-4 rounded-lg">
                  <Typography variant="h6" className="text-red-400 mb-3">
                    ❌ Common Mistakes
                  </Typography>
                  <Box component="ul" className="space-y-2 text-gray-300 text-sm">
                    <li>• Using <code>left</code>/<code>top</code> for animations</li>
                    <li>• Interleaving reads and writes</li>
                    <li>• Using <code>setInterval</code> for animations</li>
                    <li>• Reading layout properties repeatedly</li>
                    <li>• Making style changes in loops</li>
                    <li>• Overusing <code>will-change</code></li>
                    <li>• Not batching DOM operations</li>
                    <li>• Ignoring mobile performance</li>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0">
          <CardContent className="p-8 text-center">
            <Typography variant="h4" className="mb-4 text-white">
              Key Takeaways
            </Typography>
            <Box className="max-w-3xl mx-auto space-y-3 text-white">
              <Typography>
                • <strong>Reflow</strong> is expensive - avoid triggering it unnecessarily
              </Typography>
              <Typography>
                • <strong>Transform</strong> and <strong>opacity</strong> bypass reflow/repaint
              </Typography>
              <Typography>
                • <strong>Composition layers</strong> enable GPU-accelerated animations
              </Typography>
              <Typography>
                • <strong>Batch operations</strong> to minimize layout thrashing
              </Typography>
              <Typography>
                • The <strong>compositor thread</strong> runs independently of the main thread
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

