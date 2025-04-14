import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import UserList from './components/UserList';
import EditUser from './components/EditUser';
import Navbar from './components/Navbar';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/users" element={
                <ProtectedRoute>
                  <UserList />
                </ProtectedRoute>
              } />
              <Route path="/users/:id/edit" element={
                <ProtectedRoute>
                  <EditUser />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/users" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;