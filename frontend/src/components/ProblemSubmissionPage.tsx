import React, { useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import Editor from "@monaco-editor/react";
import { useParams } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000";

const problemData: Record<string, any> = {
  "digit-swap": {
    title: "Digit Swap Problem",
    description:
      "Given two numbers, find the minimum swaps needed to make them equal by swapping digits.",
    inputSpec: "Two integers, A and B.",
    outputSpec: "Minimum number of swaps, or -1 if not possible.",
    sampleInput: "123 321",
    sampleOutput: "2",
    defaultCode: `def min_swaps(a, b):\n    # Write your solution here\n    pass\n`,
  },
  "subset-sum": {
    title: "Subset Sum",
    description:
      "Given a set of integers and a target, find all subsets that sum to the target.",
    inputSpec: "A list of integers and a target integer.",
    outputSpec: "All subsets that sum to the target.",
    sampleInput: "[2, 3, 5, 7], 10",
    sampleOutput: "[[3, 7], [2, 3, 5]]",
    defaultCode: `def subset_sum(nums, target):\n    # Write your solution here\n    pass\n`,
  },
  "string-permutations": {
    title: "String Permutations",
    description: "Generate all permutations of a given string.",
    inputSpec: "A string.",
    outputSpec: "A list of all unique permutations.",
    sampleInput: "abc",
    sampleOutput: "['abc', 'acb', 'bac', 'bca', 'cab', 'cba']",
    defaultCode: `def string_permutations(s):\n    # Write your solution here\n    pass\n`,
  },
};

const ProblemSubmissionPage: React.FC = () => {
  const { problemId } = useParams();
  const problem = problemData[problemId as string] || problemData["digit-swap"];

  const [code, setCode] = useState(problem.defaultCode);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Helper to call backend endpoints
  async function callEndpoint(endpoint: string, body: any) {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return response.json();
  }

  // Submit handler: call all endpoints and combine results
  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    try {
      // Run all endpoints in parallel, including /test if implemented
      const [execRes, benchRes, analyzeRes, optimizeRes, testRes] =
        await Promise.all([
          callEndpoint("execute", { code }),
          callEndpoint("benchmark", { code }),
          callEndpoint("analyze", { code }),
          callEndpoint("optimize", { code }),
          callEndpoint("test", { code }),
        ]);
      // Merge all results
      setResult({
        ...execRes,
        ...benchRes,
        ...analyzeRes,
        ...optimizeRes,
        ...testRes,
      });
    } catch (err) {
      setResult({ error: "Failed to connect to backend." });
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", my: 6 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {problem.title}
        </Typography>
        <Typography>{problem.description}</Typography>
        <Typography sx={{ mt: 2 }}>
          <b>Input:</b> {problem.inputSpec}
        </Typography>
        <Typography>
          <b>Output:</b> {problem.outputSpec}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <b>Sample Input:</b> {problem.sampleInput}
        </Typography>
        <Typography>
          <b>Sample Output:</b> {problem.sampleOutput}
        </Typography>
      </Paper>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Editor
          height="200px"
          defaultLanguage="python"
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{ fontSize: 16 }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Running..." : "Submit Solution"}
        </Button>
      </Paper>

      {result && (
        <Paper sx={{ p: 2 }}>
          <Typography>
            <b>Complexity:</b> {result.complexity || "N/A"}
          </Typography>
          <Typography>
            <b>Runtime:</b>{" "}
            {result.runtime_seconds !== undefined
              ? result.runtime_seconds + " s"
              : "N/A"}
          </Typography>
          <Typography>
            <b>Optimizer Suggestions:</b>{" "}
            {result.suggestions && result.suggestions.length > 0
              ? result.suggestions.join(", ")
              : "N/A"}
          </Typography>
          <Typography>
            <b>Output:</b>
          </Typography>
          <pre style={{ background: "#f5f5f5", padding: 8 }}>
            {result.output || result.stdout || ""}
          </pre>
          {/* Test Results */}
          {result.output && result.output.includes("==") && (
            <>
              <Typography>
                <b>Test Results:</b>
              </Typography>
              <pre style={{ background: "#f5f5f5", padding: 8 }}>
                {result.output}
              </pre>
            </>
          )}
          {result.test_output && (
            <>
              <Typography>
                <b>Test Results:</b>
              </Typography>
              <pre style={{ background: "#f5f5f5", padding: 8 }}>
                {result.test_output}
              </pre>
            </>
          )}
          {result.stderr && (
            <>
              <Typography color="error">
                <b>Errors:</b>
              </Typography>
              <pre style={{ background: "#f5f5f5", padding: 8 }}>
                {result.stderr}
              </pre>
            </>
          )}
          {result.error && (
            <>
              <Typography color="error">
                <b>Error:</b>
              </Typography>
              <pre style={{ background: "#f5f5f5", padding: 8 }}>
                {result.error}
              </pre>
            </>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default ProblemSubmissionPage;
