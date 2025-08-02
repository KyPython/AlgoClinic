import React from 'react';
import { Container, Typography, TextField, Button, Stack, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const NewsletterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[600],
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
}));

const NewsletterTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'transparent',
    color: theme.palette.common.white,
    '& fieldset': {
      borderColor: theme.palette.common.white,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.common.white,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.common.white,
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.65)',
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'rgba(255, 255, 255, 0.65)',
    opacity: 1,
  },
}));

const JoinButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 400,
  padding: '12px 24px',
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

const NewsletterSection: React.FC = () => {
  return (
    <NewsletterContainer>
      <Container maxWidth="xl">
        <Stack spacing={4} alignItems="center" sx={{ maxWidth: '768px', mx: 'auto' }}>
          <Stack spacing={2} alignItems="center">
            <Typography variant="h2" component="h2" color="white" textAlign="center">
              Stay Updated with AlgoClinic
            </Typography>
            <Typography variant="body1" color="white" textAlign="center">
              Subscribe to our newsletter for the latest insights and tips on algorithm optimization.
            </Typography>
          </Stack>
          
          <Stack direction="row" spacing={2} sx={{ width: '100%', maxWidth: '600px' }}>
            <NewsletterTextField
              placeholder="Your Email Here"
              variant="outlined"
              fullWidth
              sx={{ flex: 1 }}
            />
            <JoinButton>Join Now</JoinButton>
          </Stack>
          
          <Typography variant="caption" color="white" textAlign="center">
            By clicking Join Now, you agree to our Terms and Conditions.
          </Typography>
        </Stack>
      </Container>
    </NewsletterContainer>
  );
};

export default NewsletterSection;