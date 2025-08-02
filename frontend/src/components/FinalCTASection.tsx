import React from "react";
import { Container, Typography, Button, Stack, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; // <-- Add this import

const SectionContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
}));

const CTAImage = styled("img")({
  width: "600px",
  height: "400px",
  objectFit: "cover",
});

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

const FinalCTASection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <SectionContainer maxWidth="xl">
      <Stack direction="row" spacing={8} alignItems="center">
        <Stack spacing={4} sx={{ flex: 1, maxWidth: "600px" }}>
          <Stack spacing={3}>
            <Typography variant="h2" component="h2">
              Unlock Your Algorithm's Potential
            </Typography>
            <Typography variant="body1" color="text.primary">
              Join us today and optimize your algorithms with powerful insights
              and expert guidance.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
            <PrimaryButton onClick={() => navigate("/signup")}>
              Sign Up / Log In
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate("/learn-more")}>
              Learn More
            </SecondaryButton>
          </Stack>
        </Stack>

        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <CTAImage
            src="/images/optimization-results.png"
            alt="Algorithm Optimization Results"
          />
        </Box>
      </Stack>
    </SectionContainer>
  );
};

export default FinalCTASection;
