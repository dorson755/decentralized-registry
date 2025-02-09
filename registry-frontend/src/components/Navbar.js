import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';

const AppNavbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Sex Offender Registry</Navbar.Brand>
                <Nav>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/about">About</Nav.Link>
                    <Nav.Link as={Link} to="/offenders">View Offenders</Nav.Link>
                    <Nav.Link as={Link} to="/submit-offender">Submit Offender</Nav.Link>
                    {!user?.isAuthenticated ? (
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/user-management">User Management</Nav.Link>
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
