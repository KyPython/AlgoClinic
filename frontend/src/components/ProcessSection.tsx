import React from "react";
import { Container, Typography, Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import UploadIcon from "./icons/UploadIcon";
import MetricsIcon from "./icons/MetricsIcon";
import OptimizeDebugIcon from "./icons/OptimizeDebugIcon";
import RightArrowIcon from "./icons/RightArrowIcon";
import { useNavigate } from "react-router-dom";

const SectionContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
}));

const ProcessCard = styled(Stack)(({ theme }) => ({
  maxWidth: "395px",
  alignItems: "flex-start",
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

const ProcessSection: React.FC = () => {
  const navigate = useNavigate();
  const steps = [
    {
      icon: <UploadIcon width={33} height={32} color="#000000" />,
      title: "Step 1: Upload Your Code",
      description: "Easily upload your algorithmic code for analysis.",
    },
    {
      icon: <MetricsIcon width={37} height={37} color="#000000" />,
      title: "Step 2: Analyze Performance Metrics",
      description: "Receive detailed insights on time and space complexity.",
    },
    {
      icon: <OptimizeDebugIcon width={39} height={23} color="#000000" />,
      title: "Step 3: Optimize and Debug",
      description: "Utilize our recommendations to enhance your code.",
    },
  ];

  return (
    <SectionContainer maxWidth="xl">
      <Stack spacing={6} alignItems="center">
        <Stack spacing={3} alignItems="center" sx={{ maxWidth: "768px" }}>
          <Typography variant="subtitle1" color="text.primary">
            Analyze
          </Typography>
          <Typography variant="h2" component="h2" textAlign="center">
            Unlock the Power of Your Algorithms
          </Typography>
          <Typography variant="body1" color="text.primary" textAlign="center">
            AlgoClinic simplifies the process of analyzing and optimizing your
            code. With our intuitive interface, you can quickly identify
            performance bottlenecks and improve your algorithms.
          </Typography>
        </Stack>

        <Stack direction="row" spacing={6} justifyContent="center">
          {steps.map((step, index) => (
            <ProcessCard key={index} spacing={3}>
              {step.icon}
              <Typography variant="h4" component="h3">
                {step.title}
              </Typography>
              <Typography variant="body2" color="text.primary">
                {step.description}
              </Typography>
            </ProcessCard>
          ))}
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
    </SectionContainer>
  );
};

export default ProcessSection;
