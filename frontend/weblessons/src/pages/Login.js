import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { login } from '../api/axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {

    //eslint-disable-next-line
    const [cookies, setCookie] = useCookies()
    const [infos, setInfos] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState("")
    const [seePassword, setSeePassword] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        if (infos.email !== "" && infos.password !== "")
            login(infos)
                .then(res => {
                    setCookie('weblessons', res.data, { expires: new Date(Date.now() + (3600 * 1000 * 25)) })
                    navigate('/')
                })
                .catch(err => setError("Mauvais email ou mot de passe"))
    }

    const handleInfos = ({ target: { name, value } }) => {
        setError("")
        setInfos({
            ...infos,
            [name]: value
        })
    }

    const handleEye = () => {
        setSeePassword(!seePassword)
    }

    return <Container className="min-vh-100 d-flex align-items-center justify-content-center flex-column">
        <h1 className="mb-5">Connexion</h1>
        <Form className="d-flex justify-content-center flex-column mb-5 w-100" style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Adresse email</Form.Label>
                <Form.Control type="email" placeholder="Entrez votre adresse email" name="email" value={infos.email} onChange={handleInfos} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mot de passe</Form.Label>
                <div className="position-relative">
                    <Form.Control type={seePassword ? "text" : "password"} placeholder="Entrez votre mot de passe" name="password" value={infos.password} onChange={handleInfos} />
                    {seePassword ? <i onClick={handleEye} className="bi bi-eye-slash eye-login"></i> : <i onClick={handleEye} className="bi bi-eye eye-login"></i>}
                </div>
            </Form.Group>
            {error !== "" && <Alert variant="danger" style={{ fontSize: "13px" }} className="w-100 text-center">{error}</Alert>}
            <Button variant="primary" type="submit">
                Se connecter
            </Button>
        </Form>
        <p>Vous n'avez pas de compte ? <Link to="/register">S'enregistrer</Link></p>
    </Container>
}

export default Login;
