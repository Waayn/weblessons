import React from 'react';
import { useCookies } from 'react-cookie';
import favicon from '../assets/favicon.ico';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

const Header = () => {

    const [cookies, setCookie] = useCookies()

    const logout = () => {
        setCookie('weblessons', '', { expires: new Date(Date.now() - (3600 * 1000 * 25)) })
    }

    return <Navbar bg="dark">
        <Container className="w-100 mw-100">
            <div className="d-flex flex-row">
                <Navbar.Brand href="#home">
                    <img src={favicon} width="30" height="30" className="d-inline-block align-top" alt="React logo" />
                </Navbar.Brand>
                <div className="fw-bold" style={{ color: "white", fontSize: "25px" }}>WebLessons</div>
            </div>
            {typeof cookies['weblessons'] !== 'undefined' &&
                <Nav.Link className="p-0">
                    <Button variant="light" onClick={logout}>Déconnexion<i className="bi bi-box-arrow-right ms-2"></i></Button>
                </Nav.Link>
            }
        </Container>
    </Navbar>
};

export default Header;
