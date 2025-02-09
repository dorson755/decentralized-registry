import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AppNavbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import OffenderSearch from './pages/OffenderSearch'; // View Offenders
import OffenderDetails from './pages/OffenderDetails'; // Submit Offender
import Login from './pages/Login';
import UserManagement from './pages/UserManagement';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppNavbar />
                <Container className="mt-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/offenders" element={<OffenderSearch />} />
                        <Route path="/submit-offender" element={<OffenderDetails />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/user-management" element={<UserManagement />} />
                    </Routes>
                </Container>
            </Router>
        </AuthProvider>
    );
}

export default App;
