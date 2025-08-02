import React from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const problems = [
  {
    id: "digit-swap",
    title: "Digit Swap Problem",
    description: "Swap digits to match target number.",
  },
  {
    id: "subset-sum",
    title: "Subset Sum",
    description: "Find subsets that sum to a target.",
  },
  {
    id: "string-permutations",
    title: "String Permutations",
    description: "Generate all permutations of a string.",
  },
];

const ProblemSelectSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ my: 6 }}>
      <Typography variant="h4" gutterBottom>
        Select a Problem to Analyze
      </Typography>
      <List>
        {problems.map((problem) => (
          <ListItem
            key={problem.id}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <ListItemText
              primary={problem.title}
              secondary={problem.description}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/submit/${problem.id}`)}
            >
              Analyze
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ProblemSelectSection;
