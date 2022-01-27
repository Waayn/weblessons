import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { createUser } from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Register = () => {

    const [infos, setInfos] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [password2, setPassword2] = useState("")
    const [error, setError] = useState("")
    const [seePassword, setSeePassword] = useState(false)
    const [seePassword2, setSeePassword2] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        if (infos.username !== "" && infos.email !== "" && infos.password !== "" && password2 !== "") {
            if (infos.password === password2) {
                createUser(infos)
                    .then(res => {
                        NotificationManager.success(`Compte ${infos.username} créé`, 'Succès')
                        setTimeout(() => { navigate('/login') }, 2000)
                    })
            } else setError("Les mots de passe ne concordent pas")
        } else setError("Veuillez remplir les champs")
    }

    const handleInfos = ({ target: { name, value } }) => {
        setError("")
        setInfos({
            ...infos,
            [name]: value
        })
    }

    const handlePassword2 = (event) => {
        setPassword2(event.target.value)
        setError("")
    }

    const handleEye = () => {
        setSeePassword(!seePassword)
    }

    const handleEye2 = () => {
        setSeePassword2(!seePassword2)
    }

    return <Container className="mt-5 d-flex align-items-center justify-content-center flex-column">
        <NotificationContainer />
        <h1 className="mb-5">Inscription</h1>
        <Form className="d-flex justify-content-center flex-column mb-5 w-100" style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Adresse email</Form.Label>
                <Form.Control type="email" placeholder="Entrez votre adresse email" name="email" value={infos.email} onChange={handleInfos} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Pseudo</Form.Label>
                <Form.Control type="text" placeholder="Entrez votre adresse pseudo" name="username" value={infos.username} onChange={handleInfos} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mot de passe</Form.Label>
                <div className="position-relative">
                    <Form.Control type={seePassword ? "text" : "password"} placeholder="Entrez votre mot de passe" name="password" value={infos.password} onChange={handleInfos} />
                    {seePassword ? <i onClick={handleEye} className="bi bi-eye eye-login"></i> : <i onClick={handleEye} className="bi bi-eye-slash eye-login"></i>}
                </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword2">
                <Form.Label>Validez le mot de passe</Form.Label>
                <div className="position-relative">
                    <Form.Control type={seePassword2 ? "text" : "password"} placeholder="Entrez votre mot de passe" name="password2" value={infos.password2} onChange={handlePassword2} />
                    {seePassword2 ? <i onClick={handleEye2} className="bi bi-eye eye-login"></i> : <i onClick={handleEye2} className="bi bi-eye-slash eye-login"></i>}
                </div>
            </Form.Group>
            {error !== "" && <Alert variant="danger" style={{ fontSize: "13px" }} className="w-100 text-center">{error}</Alert>}
            <Button variant="primary" type="submit">
                S'enregister
            </Button>
        </Form>
        <p>Vous avez déjà un compte ? <Link to="/login">Se connecter</Link></p>
    </Container>
};

export default Register;
