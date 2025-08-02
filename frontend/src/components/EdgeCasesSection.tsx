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

const EdgeCasesSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <SectionContainer maxWidth="xl">
      <Stack direction="row" spacing={8} alignItems="center">
        <Stack spacing={4} sx={{ flex: 1, maxWidth: "600px" }}>
          <Stack spacing={2}>
            <Typography variant="subtitle1" color="text.primary">
              Precision
            </Typography>
            <Typography variant="h2" component="h2">
              Master Edge Cases with Confidence and Clarity
            </Typography>
            <Typography variant="body1" color="text.primary">
              Our edge case handling capabilities ensure that your algorithms
              are robust and reliable. With detailed insights, you can
              anticipate and address potential pitfalls in your solutions.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={6}>
            <FeatureItem spacing={2}>
              <Typography variant="h6" component="h3">
                Robust Solutions
              </Typography>
              <Typography variant="body2" color="text.primary">
                Identify and resolve edge cases before they become critical
                issues.
              </Typography>
            </FeatureItem>

            <FeatureItem spacing={2}>
              <Typography variant="h6" component="h3">
                Performance Insights
              </Typography>
              <Typography variant="body2" color="text.primary">
                Optimize your algorithms with comprehensive performance
                benchmarks and analysis.
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
            alt="Edge Cases Analysis Interface"
          />
        </Box>
      </Stack>
    </SectionContainer>
  );
};

export default EdgeCasesSection;
