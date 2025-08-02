import React from "react";
import { Container, Typography, Button, Stack, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import RightArrowIcon from "./icons/RightArrowIcon";
import { useNavigate } from "react-router-dom";

const SectionContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
}));

const FeatureImage = styled("img")({
  width: "600px",
  height: "640px",
  objectFit: "cover",
});

const FeatureItem = styled(Stack)(({ theme }) => ({
  maxWidth: "288px",
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

const PrimaryButton = styled(Button)(({ theme }) => ({
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

const OptimizeSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <SectionContainer maxWidth="xl">
      <Stack direction="row" spacing={8} alignItems="center">
        <Stack spacing={4} sx={{ flex: 1, maxWidth: "600px" }}>
          <Stack spacing={2}>
            <Typography variant="subtitle1" color="text.primary">
              Optimize
            </Typography>
            <Typography variant="h2" component="h2">
              Unlock Your Algorithm's Full Potential Today
            </Typography>
            <Typography variant="body1" color="text.primary">
              AlgoClinic empowers developers to enhance their coding efficiency.
              With our insights, you can debug and optimize your algorithms
              effortlessly.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={6}>
            <FeatureItem spacing={2}>
              <Typography variant="h6" component="h3">
                Performance Insights
              </Typography>
              <Typography variant="body2" color="text.primary">
                Gain clarity on your algorithm's performance and optimize for
                better results.
              </Typography>
            </FeatureItem>

            <FeatureItem spacing={2}>
              <Typography variant="h6" component="h3">
                Edge Case Handling
              </Typography>
              <Typography variant="body2" color="text.primary">
                Identify and manage edge cases to ensure robust solutions.
              </Typography>
            </FeatureItem>
          </Stack>

          <Stack direction="row" spacing={2}>
            <SecondaryButton onClick={() => navigate("/learn-more")}>
              Learn More
            </SecondaryButton>
            <PrimaryButton onClick={() => navigate("/signup")}>
              Sign Up / Log In
            </PrimaryButton>
          </Stack>
        </Stack>

        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <FeatureImage
            src="/images/feature-analysis.png"
            alt="Algorithm Optimization Interface"
          />
        </Box>
      </Stack>
    </SectionContainer>
  );
};

export default OptimizeSection;
