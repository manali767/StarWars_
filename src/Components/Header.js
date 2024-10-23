import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { logout } from '../redux/authSlice'; 

export default function Header() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); 
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Star Wars
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
