import React from 'react';
import { Container, Typography, Stack, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ComplexityIcon from './icons/ComplexityIcon';
import EdgeCasesIcon from './icons/EdgeCasesIcon';

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
  maxWidth: '288px',
}));

interface FeatureSectionProps {
  title: string;
  description: string;
  features?: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  description,
  features,
  imageSrc,
  imageAlt,
  reverse = false,
}) => {
  const content = (
    <Stack spacing={4} sx={{ flex: 1, maxWidth: '600px' }}>
      <Stack spacing={2}>
        <Typography variant="h3" component="h2">
          {title}
        </Typography>
        <Typography variant="body1" color="text.primary">
          {description}
        </Typography>
      </Stack>
      
      {features && (
        <Stack direction="row" spacing={6}>
          {features.map((feature, index) => (
            <FeatureItem key={index} spacing={2}>
              {feature.icon}
              <Typography variant="h6" component="h3">
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.primary">
                {feature.description}
              </Typography>
            </FeatureItem>
          ))}
        </Stack>
      )}
    </Stack>
  );

  const image = (
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
      <FeatureImage src={imageSrc} alt={imageAlt} />
    </Box>
  );

  return (
    <SectionContainer maxWidth="xl">
      <Stack 
        direction="row" 
        spacing={8} 
        alignItems="center"
        sx={{ flexDirection: reverse ? 'row-reverse' : 'row' }}
      >
        {content}
        {image}
      </Stack>
    </SectionContainer>
  );
};

// First Feature Section Component
export const FirstFeatureSection: React.FC = () => {
  const features = [
    {
      icon: <ComplexityIcon width={40} height={40} color="#000000" />,
      title: 'Complexity Insights',
      description: 'Analyze performance metrics to optimize your algorithms effectively and efficiently.',
    },
    {
      icon: <EdgeCasesIcon width={45} height={36} color="#000000" />,
      title: 'Edge Cases',
      description: 'Identify and handle edge cases to ensure robust algorithm performance.',
    },
  ];

  return (
    <FeatureSection
      title="Unlock the power of your algorithms with AlgoClinic's insightful analysis tools."
      description="AlgoClinic empowers developers to dissect their algorithms with precision. Gain clarity on time and space complexity to enhance your coding efficiency."
      features={features}
      imageSrc="/images/feature-analysis.png"
      imageAlt="Algorithm Analysis Interface"
    />
  );
};

export default FeatureSection;