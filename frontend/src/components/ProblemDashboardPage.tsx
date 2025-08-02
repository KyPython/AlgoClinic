import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Stack,
  Button,
  Box,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const initialProblems = [
  {
    id: "digit-swap",
    title: "Digit Swap Problem",
    description:
      "Given two numbers, find the minimum swaps needed to make them equal by swapping digits.",
  },
  {
    id: "subset-sum",
    title: "Subset Sum",
    description:
      "Given a set of integers and a target, find all subsets that sum to the target.",
  },
  {
    id: "string-permutations",
    title: "String Permutations",
    description: "Generate all permutations of a given string.",
  },
];

const ProblemDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [problems, setProblems] = useState(initialProblems);

  // Add new problem if passed from CreateProblemPage
  useEffect(() => {
    if (location.state && location.state.newProblem) {
      setProblems((prev) => [
        ...prev,
        { ...location.state.newProblem, id: `custom-${Date.now()}` },
      ]);
      // Clear the state so it doesn't add again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <Container maxWidth="md" sx={{ my: 8 }}>
      <Typography variant="h4" gutterBottom>
        Problem Dashboard
      </Typography>
      <Stack spacing={2}>
        {problems.map((problem) => (
          <Paper
            key={problem.id}
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="h6">{problem.title}</Typography>
              <Typography variant="body2">{problem.description}</Typography>
            </Box>
            <Button
              variant="contained"
              onClick={() => navigate(`/submit/${problem.id}`)}
            >
              Solve
            </Button>
          </Paper>
        ))}
        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => navigate("/create-problem")}
        >
          + Create New Problem
        </Button>
      </Stack>
    </Container>
  );
};

export default ProblemDashboardPage;
