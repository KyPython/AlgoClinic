import React from "react";
import { AppBar, Toolbar, Button, Stack, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import LogoIcon from "./icons/LogoIcon";
import { useNavigate } from "react-router-dom";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: "none",
  borderBottom: "none",
  color: theme.palette.text.primary,
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  textTransform: "none",
  fontSize: "18px",
  fontWeight: 600,
  padding: "10px 24px",
  letterSpacing: "0.5px",
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
  },
}));

const StartButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 400,
  padding: "12px 24px",
  "&:hover": {
    backgroundColor: theme.palette.grey[800],
  },
}));

const Navigation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StyledAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between", py: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <NavButton onClick={() => navigate("/")}>Home Page</NavButton>
            <NavButton onClick={() => navigate("/dashboard")}>
              Dashboard
            </NavButton>
          </Stack>

          <LogoIcon width={70} height={36} color="#000000" />

          <StartButton onClick={() => navigate("/signup")}>
            Sign Up / Log In
          </StartButton>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navigation;
