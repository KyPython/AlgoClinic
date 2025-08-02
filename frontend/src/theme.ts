import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
      contrastText: '#000000',
    },
    text: {
      primary: '#000000',
      secondary: 'rgba(0, 0, 0, 0.60)',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#666666',
      700: '#424242',
      800: '#212121',
      900: '#121212',
    },
    common: {
      black: '#000000',
      white: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontSize: '56px',
      fontWeight: 700,
      lineHeight: '67.20px',
    },
    h2: {
      fontSize: '48px',
      fontWeight: 700,
      lineHeight: '57.60px',
    },
    h3: {
      fontSize: '40px',
      fontWeight: 700,
      lineHeight: '48px',
    },
    h4: {
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: '41.60px',
    },
    h5: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: '33.60px',
    },
    h6: {
      fontSize: '20px',
      fontWeight: 700,
    },
    body1: {
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '27px',
    },
    body2: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
    },
    subtitle1: {
      fontSize: '16px',
      fontWeight: 600,
    },
    caption: {
      fontSize: '14px',
      fontWeight: 400,
    },
    overline: {
      fontSize: '12px',
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 0,
  },
});

export default theme;