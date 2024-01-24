import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import OverlaySidePanel from '../components/OverlaySidePanel';
import LoginForm from '../components/LoginForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/overlay-side-panel" element={<OverlaySidePanel />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
