import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Character from './Pages/Character';
import Login from './Pages/Login';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="characters" element={<Character />} />
      </Route>
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  </Router>
);

export default App;
