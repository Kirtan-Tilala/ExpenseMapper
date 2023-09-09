import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './pages/home/home';
import About from './pages/about/about';
import Contact from './pages/contacts/contact';
import Login from './components/login/login';
import Dashboard from './pages/dashboard/dashboard';
import Register from './components/login/register';
import { AuthProvider } from './components/auth/AuthContext';

function App() {
  return (
    <AuthProvider> {/* Wrap your entire app with AuthProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Protected route */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
