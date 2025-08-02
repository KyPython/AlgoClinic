import React from 'react';
import { Container, Typography, Stack, Avatar, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarRatingIcon from './icons/StarRatingIcon';
import WebflowLogoIcon from './icons/WebflowLogoIcon';

const SectionContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
}));

const TestimonialCard = styled(Stack)(({ theme }) => ({
  maxWidth: '608px',
  alignItems: 'flex-start',
}));

const TestimonialAvatar = styled(Avatar)({
  width: 56,
  height: 56,
});

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      rating: <StarRatingIcon width={116} height={19} color="#000000" />,
      quote: '"Using AlgoClinic, I found solutions I couldn\'t see before. It\'s a game changer for developers!"',
      name: 'Jane Doe',
      title: 'Lead Developer, TechCorp',
      avatar: '/images/jane-doe-avatar.jpg',
      logo: <WebflowLogoIcon width={116} height={19} color="#000000" />,
    },
    {
      rating: <StarRatingIcon width={116} height={19} color="#000000" />,
      quote: '"The insights provided by AlgoClinic are invaluable. It has significantly improved our algorithm efficiency!"',
      name: 'John Smith',
      title: 'CTO, DevSolutions',
      avatar: '/images/jane-doe-avatar.jpg', // Using same avatar as placeholder
      logo: <WebflowLogoIcon width={116} height={19} color="#000000" />,
    },
  ];

  return (
    <SectionContainer maxWidth="xl">
      <Stack spacing={4} alignItems="center">
        <Stack spacing={2} alignItems="center" sx={{ maxWidth: '768px' }}>
          <Typography variant="h2" component="h2" textAlign="center">
            Customer Testimonials
          </Typography>
          <Typography variant="body1" color="text.primary" textAlign="center">
            AlgoClinic transformed my debugging process completely!
          </Typography>
        </Stack>
        
        <Stack direction="row" spacing={8} justifyContent="center">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} spacing={3}>
              {testimonial.rating}
              
              <Typography variant="h6" component="blockquote" sx={{ lineHeight: '28px' }}>
                {testimonial.quote}
              </Typography>
              
              <Stack direction="row" spacing={2.5} alignItems="center" sx={{ width: '100%' }}>
                <TestimonialAvatar src={testimonial.avatar} alt={testimonial.name} />
                
                <Stack spacing={0.5}>
                  <Typography variant="subtitle1" component="h4">
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    {testimonial.title}
                  </Typography>
                </Stack>
                
                <Divider orientation="vertical" flexItem sx={{ mx: 2, borderColor: '#000000' }} />
                
                {testimonial.logo}
              </Stack>
            </TestimonialCard>
          ))}
        </Stack>
      </Stack>
    </SectionContainer>
  );
};

export default TestimonialsSection;