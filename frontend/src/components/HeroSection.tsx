import React from "react";
import { Container, Typography, Button, Stack, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; // <-- Add this import

const HeroContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 400,
  padding: "12px 24px",
  "&:hover": {
    backgroundColor: theme.palette.grey[800],
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  color: theme.palette.text.primary,
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 400,
  padding: "12px 24px",
  border: "1px solid #000000",
  "&:hover": {
    backgroundColor: theme.palette.grey[50],
  },
}));

const HeroImage = styled("img")({
  width: "100%",
  height: "720px",
  objectFit: "cover",
  marginTop: "80px",
});

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <HeroContainer maxWidth="xl">
      <Stack spacing={4} sx={{ maxWidth: "768px" }}>
        <Typography variant="h1" component="h1">
          Unlock Your Code's Potential with AlgoClinic's Smart Analysis Tools
        </Typography>

        <Typography variant="body1" color="text.primary">
          Analyze, debug, and optimize your algorithms effortlessly with our
          intuitive web application.
        </Typography>

        <Stack direction="row" spacing={2}>
          <PrimaryButton onClick={() => navigate("/signup")}>
            Sign Up
          </PrimaryButton>
          <SecondaryButton onClick={() => navigate("/learn-more")}>
            Learn More
          </SecondaryButton>
          <SecondaryButton onClick={() => navigate("/dashboard")}>
            Try a Problem
          </SecondaryButton>
        </Stack>
      </Stack>

      <HeroImage
        src="/images/hero-dashboard.png"
        alt="AlgoClinic Dashboard Interface"
      />
    </HeroContainer>
  );
};

export default HeroSection;
