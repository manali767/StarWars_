import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
    tokenExpiration: null, 
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.tokenExpiration = action.payload.expiration;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.tokenExpiration = null;
    },
    refreshToken: (state, action) => {
      state.token = action.payload.token;
      state.tokenExpiration = action.payload.expiration;
    },
  },
});

export const { login, logout, refreshToken } = authSlice.actions;
export default authSlice.reducer;
