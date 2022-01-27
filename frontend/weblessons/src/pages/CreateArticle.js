import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Form, Container } from 'react-bootstrap';
import QCMQuestion from '../components/QCMQuestion';
import { createArticle } from '../api/axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const CreateArticle = () => {

    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const [article, setArticle] = useState({
        title: "",
        content: "",
        questions: []
    })
    const [error, setError] = useState("")
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        if (user.role !== 'admin') navigate('/')
        //eslint-disable-next-line
    }, [])

    const handleArticle = ({ target: { name, value } }) => {
        setError("")
        setArticle({
            ...article,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        createArticle(article)
            .then(res => {
                NotificationManager.success(`Article créé`, 'Succès')
                navigate('/')
            })
    }

    const addQuestionForm = () => {
        setQuestions([...questions, <QCMQuestion addQuestion={addQuestion} />])
    }

    const addQuestion = (question) => {
        setArticle({
            ...article,
            questions: [...article.questions, question]
        })
    }

    return <Container className="mt-5 d-flex align-items-center justify-content-center flex-column">
        <NotificationContainer />
        <Form className="d-flex justify-content-center flex-column mb-5 w-100" style={{ maxWidth: "800px" }} onSubmit={handleSubmit}>
            <p className="fw-bold" style={{ fontSize: "20px" }}>Article</p>
            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Control type="text" placeholder="Titre de l'article" name="title" value={article.title} onChange={handleArticle} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicContent">
                <Form.Control as="textarea" rows={10} name="content" placeholder="Contenu de l'article" value={article.content} onChange={handleArticle} />
            </Form.Group>

            <p className="fw-bold" style={{ fontSize: "20px" }}>QCM</p>
            {questions.map(question => question)}
            <Button className="mx-4 my-1" variant="success" onClick={addQuestionForm}>Créer nouvelle question</Button>

            {error !== "" && <Alert variant="danger" style={{ fontSize: "13px" }} className="w-100 text-center">{error}</Alert>}
            <Button variant="primary" type="submit" className="mt-4">Publier article</Button>
        </Form>
    </Container>
};

export default CreateArticle;
