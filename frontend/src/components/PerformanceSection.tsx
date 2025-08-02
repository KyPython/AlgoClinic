import React from 'react';
import { Container, Typography, Stack, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import AnalysisIcon from './icons/AnalysisIcon';
import OptimizationIcon from './icons/OptimizationIcon';
import DebugIcon from './icons/DebugIcon';

const SectionContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
}));

const FeatureImage = styled('img')({
  width: '600px',
  height: '640px',
  objectFit: 'cover',
});

const FeatureItem = styled(Stack)(({ theme }) => ({
  alignItems: 'flex-start',
}));

const PerformanceSection: React.FC = () => {
  const features = [
    {
      icon: <AnalysisIcon width={12} height={12} color="#000000" />,
      text: 'Analyze your algorithms with precision and clarity.',
    },
    {
      icon: <OptimizationIcon width={13} height={13} color="#000000" />,
      text: 'Optimize performance with actionable insights and benchmarks.',
    },
    {
      icon: <DebugIcon width={13} height={13} color="#000000" />,
      text: 'Debug effectively by identifying edge case vulnerabilities.',
    },
  ];

  return (
    <SectionContainer maxWidth="xl">
      <Stack direction="row" spacing={8} alignItems="center">
        <Stack spacing={4} sx={{ flex: 1, maxWidth: '600px' }}>
          <Stack spacing={2}>
            <Typography variant="h3" component="h2">
              Unlock the power of performance insights with AlgoClinic's optimization tools.
            </Typography>
            <Typography variant="body1" color="text.primary">
              AlgoClinic offers comprehensive performance benchmarking to enhance your algorithm's efficiency. Gain valuable insights into time and space complexity to streamline your solutions.
            </Typography>
          </Stack>
          
          <Stack spacing={2}>
            {features.map((feature, index) => (
              <FeatureItem key={index} direction="row" spacing={2} alignItems="center">
                {feature.icon}
                <Typography variant="body2" color="text.primary">
                  {feature.text}
                </Typography>
              </FeatureItem>
            ))}
          </Stack>
        </Stack>
        
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <FeatureImage 
            src="/images/feature-analysis.png" 
            alt="Performance Optimization Interface"
          />
        </Box>
      </Stack>
    </SectionContainer>
  );
};

export default PerformanceSection;