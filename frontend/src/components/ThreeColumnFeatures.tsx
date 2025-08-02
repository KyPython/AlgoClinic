import React from "react";
import { Container, Typography, Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import ComplexityIcon from "./icons/ComplexityIcon";
import MetricsIcon from "./icons/MetricsIcon";
import DebugIcon from "./icons/DebugIcon";
import RightArrowIcon from "./icons/RightArrowIcon";
import { useNavigate } from "react-router-dom";

const SectionContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
}));

const FeatureCard = styled(Stack)(({ theme }) => ({
  maxWidth: "395px",
  alignItems: "flex-start",
}));

const ActionButton = styled(Button)(({ theme }) => ({
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

const ThreeColumnFeatures: React.FC = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: <ComplexityIcon width={45} height={36} color="#000000" />,
      title:
        "Identify edge cases to ensure your solutions are robust and reliable.",
      description:
        "Our complexity analysis provides insights into time and space efficiency.",
      buttonText: "Learn More",
    },
    {
      icon: <MetricsIcon width={37} height={37} color="#000000" />,
      title:
        "Benchmark your algorithms against industry standards for optimal performance.",
      description:
        "Performance benchmarking helps you understand how your solutions stack up.",
      buttonText: "Sign Up",
    },
    {
      icon: <DebugIcon width={41} height={41} color="#000000" />,
      title:
        "Enhance your debugging process with detailed edge case handling insights.",
      description:
        "Our tools guide you through identifying and managing potential pitfalls.",
      buttonText: "Explore",
    },
  ];

  return (
    <SectionContainer maxWidth="xl">
      <Stack spacing={6} alignItems="center">
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          sx={{ maxWidth: "768px" }}
        >
          Unlock the power of your algorithms with our advanced analysis tools.
        </Typography>

        <Stack direction="row" spacing={6} justifyContent="center">
          {features.map((feature, index) => (
            <FeatureCard key={index} spacing={3}>
              <Stack spacing={2}>
                {feature.icon}
                <Typography variant="h5" component="h3">
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  {feature.description}
                </Typography>
              </Stack>

              <ActionButton
                endIcon={
                  <RightArrowIcon width={7} height={12} color="#000000" />
                }
                onClick={
                  feature.buttonText === "Sign Up"
                    ? () => navigate("/signup")
                    : feature.buttonText === "Explore"
                    ? () => navigate("/explore")
                    : () => navigate("/learn-more")
                }
              >
                {feature.buttonText}
              </ActionButton>
            </FeatureCard>
          ))}
        </Stack>
      </Stack>
    </SectionContainer>
  );
};

export default ThreeColumnFeatures;
