import React from 'react';
import { useCookies } from 'react-cookie';
import favicon from '../assets/favicon.ico';
import { Navbar, Container, Button } from 'react-bootstrap';

const Header = () => {

    const [cookies, setCookie] = useCookies()

    const logout = () => {
        setCookie('weblessons', '', { expires: new Date(Date.now() - (3600 * 1000 * 25)) })
    }

    return <Navbar bg="dark">
        <Container className="w-100 mw-100">
            <div className="d-flex flex-row">
                <Navbar.Brand href="/">
                    <img src={favicon} width="30" height="30" className="d-inline-block align-top" alt="React logo" />
                </Navbar.Brand>
                <Navbar.Brand href="/">
                    <div className="fw-bold" style={{ color: "white", fontSize: "25px" }}>WebLessons</div>
                </Navbar.Brand>
            </div>
            {typeof cookies['weblessons'] !== 'undefined' &&
                <Button variant="light" onClick={logout}>Déconnexion<i className="bi bi-box-arrow-right ms-2"></i></Button>
            }
        </Container>
    </Navbar>
};

export default Header;
