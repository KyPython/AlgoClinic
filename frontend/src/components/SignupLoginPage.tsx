import React from "react";
import { Box, Typography, Paper, TextField, Button } from "@mui/material";

const SignupLoginPage: React.FC = () => (
  <Box sx={{ maxWidth: 400, mx: "auto", my: 8 }}>
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Sign Up / Log In
      </Typography>
      <TextField label="Email" fullWidth sx={{ mb: 2 }} />
      <TextField label="Password" type="password" fullWidth sx={{ mb: 2 }} />
      <Button variant="contained" color="primary" fullWidth sx={{ mb: 1 }}>
        Log In
      </Button>
      <Button variant="outlined" color="primary" fullWidth>
        Sign Up
      </Button>
    </Paper>
  </Box>
);

export default SignupLoginPage;
