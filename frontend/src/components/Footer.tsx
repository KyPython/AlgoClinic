import React from 'react';
import { Container, Typography, TextField, Button, Stack, Box, Divider, Link, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LogoIcon from './icons/LogoIcon';

const FooterContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(5),
}));

const FooterColumn = styled(Stack)(({ theme }) => ({
  minWidth: '158px',
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: 400,
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const SubscribeTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.grey[300],
    },
    '&:hover fieldset': {
      borderColor: theme.palette.grey[400],
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const JoinButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 400,
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: theme.palette.grey[800],
  },
}));

const Footer: React.FC = () => {
  const quickLinks = [
    'About Us',
    'Contact Us', 
    'Help Center',
    'Blog Posts',
    'FAQs',
  ];

  const resources = [
    'Documentation',
    'API Access',
    'Webinars',
    'Case Studies',
    'User Guides',
  ];

  const stayConnected = [
    'Social Media',
    'Feedback',
    'Partnerships',
    'Careers',
    'Events',
  ];

  const legalLinks = [
    'Privacy Policy',
    'Terms of Use',
    'Cookie Settings',
  ];

  return (
    <FooterContainer maxWidth="xl">
      <Stack spacing={8}>
        <Stack direction="row" spacing={16} justifyContent="space-between">
          <Stack direction="row" spacing={5}>
            <LogoIcon width={70} height={36} color="#000000" />
            
            <FooterColumn spacing={2}>
              <Typography variant="subtitle1">Quick Links</Typography>
              <Stack spacing={1}>
                {quickLinks.map((link, index) => (
                  <FooterLink key={index} href="#">
                    {link}
                  </FooterLink>
                ))}
              </Stack>
            </FooterColumn>
            
            <FooterColumn spacing={2}>
              <Typography variant="subtitle1">Resources</Typography>
              <Stack spacing={1}>
                {resources.map((link, index) => (
                  <FooterLink key={index} href="#">
                    {link}
                  </FooterLink>
                ))}
              </Stack>
            </FooterColumn>
            
            <FooterColumn spacing={2}>
              <Typography variant="subtitle1">Stay Connected</Typography>
              <Stack spacing={1}>
                {stayConnected.map((link, index) => (
                  <FooterLink key={index} href="#">
                    {link}
                  </FooterLink>
                ))}
              </Stack>
            </FooterColumn>
          </Stack>
          
          <Stack spacing={3} sx={{ maxWidth: '400px' }}>
            <Stack spacing={1}>
              <Typography variant="subtitle1">Subscribe</Typography>
              <Typography variant="body2" color="text.primary">
                Join our newsletter for the latest updates and features.
              </Typography>
            </Stack>
            
            <Stack direction="row" spacing={1}>
              <SubscribeTextField
                placeholder="Your Email"
                variant="outlined"
                size="small"
                sx={{ flex: 1 }}
              />
              <JoinButton>Join</JoinButton>
            </Stack>
            
            <Typography variant="caption" color="text.primary">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </Typography>
          </Stack>
        </Stack>
        
        <Stack spacing={2}>
          <Divider />
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={3} alignItems="center">
              <Typography variant="caption" color="text.primary">
                © 2024 AlgoClinic. All rights reserved.
              </Typography>
              {legalLinks.map((link, index) => (
                <FooterLink key={index} href="#" sx={{ textDecoration: 'underline' }}>
                  {link}
                </FooterLink>
              ))}
            </Stack>
            
            <Stack direction="row" spacing={1}>
              <IconButton size="small" sx={{ color: 'black' }}>
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: 'black' }}>
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: 'black' }}>
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: 'black' }}>
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: 'black' }}>
                <YouTubeIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </FooterContainer>
  );
};

export default Footer;