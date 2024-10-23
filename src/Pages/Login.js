import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, refreshToken } from '../redux/authSlice';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MOCK_CREDENTIALS = { username: 'user', password: 'pass' };

const generateFakeToken = () => ({
  token: 'fake-jwt-token',
  expiration: Date.now() + 10000, // 10-second expiration
});

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { tokenExpiration, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle silent token refresh
  useEffect(() => {
    if (!tokenExpiration) return; // Exit if there's no token expiration

    const timeLeft = tokenExpiration - Date.now() - 1000; // Refresh 1 sec before expiration

    if (timeLeft > 0) {
      const refreshTimer = setTimeout(() => {
        const newToken = generateFakeToken();
        dispatch(refreshToken(newToken));
        console.log('Token refreshed');
      }, timeLeft);

      return () => clearTimeout(refreshTimer); // Cleanup on unmount
    } else {
      console.log('Token expired, logging out...');
      dispatch(logout()); // Logout if token already expired
    }
  }, [tokenExpiration, dispatch]);

  const handleLogin = () => {
    if (username === MOCK_CREDENTIALS.username && password === MOCK_CREDENTIALS.password) {
      const tokenData = generateFakeToken();
      dispatch(login(tokenData));
      navigate('/characters');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        {
          error ?
            <Box sx={{ backgroundColor: 'gray', marginBottom: '20px', color: 'red', display: 'flex', justifyContent: 'center', opacity: '0.7', textAlign: 'center' }}>
              <p>{error}</p>
            </Box> : ''
        }
        <Box display="flex" flexDirection="column" gap={2}>
          <>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              onChange={(e) => { setError(''); setUsername(e.target.value) }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              onChange={(e) => { setError(''); setPassword(e.target.value) }}
            />
            <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
              Login
            </Button>
          </>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
