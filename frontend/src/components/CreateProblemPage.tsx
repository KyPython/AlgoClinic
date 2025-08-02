import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateProblemPage: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputSpec, setInputSpec] = useState("");
  const [outputSpec, setOutputSpec] = useState("");
  const [sampleInput, setSampleInput] = useState("");
  const [sampleOutput, setSampleOutput] = useState("");
  const [error, setError] = useState("");

  // In CreateProblemPage.tsx
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      setError("Title and description are required.");
      return;
    }
    // Pass the new problem back to the dashboard
    navigate("/dashboard", {
      state: {
        newProblem: {
          title,
          description,
        },
      },
    });
  };

  return (
    <Container maxWidth="sm" sx={{ my: 8 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Create New Problem
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            required
          />
          <TextField
            label="Input Specification"
            value={inputSpec}
            onChange={(e) => setInputSpec(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Output Specification"
            value={outputSpec}
            onChange={(e) => setOutputSpec(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Sample Input"
            value={sampleInput}
            onChange={(e) => setSampleInput(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Sample Output"
            value={sampleOutput}
            onChange={(e) => setSampleOutput(e.target.value)}
            fullWidth
            margin="normal"
          />
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
            <Button variant="outlined" onClick={() => navigate("/dashboard")}>
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateProblemPage;
