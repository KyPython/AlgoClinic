import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Stack,
  Box,
  TextField,
  Button,
} from "@mui/material";
import ComplexityIcon from "./icons/ComplexityIcon";
import MetricsIcon from "./icons/MetricsIcon";
import DebugIcon from "./icons/DebugIcon";

const ExplorePage: React.FC = () => {
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleAnalyze = () => {
    // Mock analysis result
    setAnalysis(
      "Time Complexity: O(n)\nSpace Complexity: O(1)\nNo critical edge cases detected."
    );
  };

  return (
    <Container maxWidth="md" sx={{ my: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h3" gutterBottom>
          Explore AlgoClinic Features
        </Typography>
        <Typography variant="body1" paragraph>
          Try out our interactive code analyzer! Paste your algorithm below and
          get instant feedback.
        </Typography>
        <Stack spacing={2} mb={4}>
          <TextField
            label="Paste your code here"
            multiline
            minRows={4}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAnalyze}
            disabled={!code.trim()}
          >
            Analyze Code
          </Button>
          {analysis && (
            <Paper sx={{ p: 2, background: "#f5f5f5" }}>
              <Typography variant="subtitle1">Analysis Result:</Typography>
              <pre style={{ margin: 0 }}>{analysis}</pre>
            </Paper>
          )}
        </Stack>
        <Typography variant="h5" gutterBottom>
          More Features
        </Typography>
        <Stack spacing={4}>
          <Box display="flex" alignItems="center" gap={2}>
            <ComplexityIcon width={45} height={36} color="#000000" />
            <Box>
              <Typography variant="h6">Complexity Analysis</Typography>
              <Typography variant="body2">
                Instantly analyze your code for time and space complexity. Get
                actionable feedback to optimize your algorithms.
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <MetricsIcon width={37} height={37} color="#000000" />
            <Box>
              <Typography variant="h6">Performance Benchmarking</Typography>
              <Typography variant="body2">
                Benchmark your solutions against industry standards and see how
                your code stacks up in real-world scenarios.
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <DebugIcon width={41} height={41} color="#000000" />
            <Box>
              <Typography variant="h6">
                Edge Case & Debugging Insights
              </Typography>
              <Typography variant="body2">
                Discover hidden edge cases and get detailed debugging guidance
                to make your code robust and reliable.
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ExplorePage;
