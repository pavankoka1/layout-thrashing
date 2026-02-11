"use client";

import { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import ProblemDemo1 from "./ProblemDemo1";
import ProblemDemo2 from "./ProblemDemo2";
import ProblemDemo3 from "./ProblemDemo3";

export default function ProblemDemos() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box>
      <Box className="mb-6">
        <Typography variant="h5" className="text-slate-900 font-bold mb-4">
          Different Layout Thrashing Scenarios
        </Typography>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          className="border-b border-slate-200"
        >
          <Tab
            label="Scenario 1: Read-Write Loop"
            className="text-slate-600 font-medium"
          />
          <Tab
            label="Scenario 2: Scroll-Based Width"
            className="text-slate-600 font-medium"
          />
          <Tab
            label="Scenario 3: Dynamic Grid"
            className="text-slate-600 font-medium"
          />
        </Tabs>
      </Box>

      <Box>
        {activeTab === 0 && <ProblemDemo1 />}
        {activeTab === 1 && <ProblemDemo2 />}
        {activeTab === 2 && <ProblemDemo3 />}
      </Box>
    </Box>
  );
}

