import React from "react";
import { Box, Typography, Paper, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LearnMorePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ my: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h3" gutterBottom>
          Learn More About AlgoClinic
        </Typography>
        <Typography variant="body1" paragraph>
          AlgoClinic helps you analyze, debug, and optimize your algorithms with
          ease. Our platform provides:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              <b>Advanced Analysis Tools:</b> Unlock the power of your
              algorithms with our advanced analysis tools.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <b>Edge Case Detection:</b> Identify edge cases to ensure your
              solutions are robust and reliable.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <b>Complexity Insights:</b> Get insights into time and space
              efficiency.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <b>Performance Benchmarking:</b> Benchmark your algorithms against
              industry standards.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <b>Debugging Assistance:</b> Enhance your debugging process with
              detailed edge case handling insights.
            </Typography>
          </li>
        </ul>
        <Typography variant="body1" paragraph>
          Ready to get started? Sign up and unlock your code's full potential!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/signup")}
        >
          Sign Up / Log In
        </Button>
      </Paper>
    </Container>
  );
};

export default LearnMorePage;
