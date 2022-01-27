import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { login } from '../api/axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { setUserInfos } from '../app/store';
import { useDispatch } from 'react-redux';

const Login = () => {

    //eslint-disable-next-line
    const [cookies, setCookie] = useCookies()
    const [infos, setInfos] = useState({
        email: "",
        password: ""
    })
    const [checkRemember, setCheckRemember] = useState(false)
    const [error, setError] = useState("")
    const [seePassword, setSeePassword] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault()
        if (infos.email !== "" && infos.password !== "")
            login(infos)
                .then(res => {
                    checkRemember === true ? setCookie('weblessons', res.data.id) : setCookie('weblessons', res.data.id, { expires: new Date(Date.now() + (3600 * 1000 * 25)) })
                    dispatch(setUserInfos(res.data))
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

    return <Container className="mt-5 d-flex align-items-center justify-content-center flex-column">
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
                    {seePassword ? <i onClick={handleEye} className="bi bi-eye eye-login"></i> : <i onClick={handleEye} className="bi bi-eye-slash eye-login"></i>}
                </div>
            </Form.Group>
            <Form.Group className="mb-3 w-50 mx-auto" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Se souvenir de moi" value={checkRemember} onChange={() => setCheckRemember(!checkRemember)} />
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
