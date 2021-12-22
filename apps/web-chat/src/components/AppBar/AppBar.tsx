import React from 'react';
import { default as MuiAppBar } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'firebaseConf';

const pages = [
  {
    label: 'Home',
    url: '/',
  },
];

export const AppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleOpenNavMenu = (event: React.SyntheticEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (url?: string) => {
    setAnchorElNav(null);
    url && navigate(url);
  };

  return (
    <MuiAppBar position="static" className={'appBar'} sx={{ bgcolor: 'primary.light' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            Web chat
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu()}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(({ label, url }) => (
                <MenuItem key={label} onClick={() => handleCloseNavMenu(url)}>
                  <Typography textAlign="center">{label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            Web chat
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ label, url }) => (
              <Button
                key={label}
                onClick={() => handleCloseNavMenu(url)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {label}
              </Button>
            ))}
          </Box>
          {user && (
            <Button onClick={logout} sx={{ my: 2, color: 'white', display: 'block' }}>
              Logout
            </Button>
          )}
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};
