import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import QCMResponse from './QCMResponse';

const QCMQuestion = (props) => {

    const [question, setQuestion] = useState({
        title: "",
        responses: []
    })
    const [responses, setResponses] = useState([])
    const [clicked, setClicked] = useState(false)


    const handleQuestion = ({ target: { name, value } }) => {
        setQuestion({
            ...question,
            [name]: value
        })
    }

    const addResponse = () => {
        setResponses([...responses, <QCMResponse addResponse={addResponseToQuestion} />])
    }

    const addResponseToQuestion = (response) => {
        question.responses.push(response);
    }

    const handleClick = () => {
        if (question.title !== '') {
            props.addQuestion(question)
            setClicked(true)
        }
    }

    return <>
        <Form.Group className="mb-3" controlId={'formBasicQuestion'}>
            <div className="d-flex">
                {!clicked && <Form.Control type="text" placeholder={"Question"} name={'title'} value={question.title} onChange={handleQuestion} />}
                {clicked && <Form.Control type="text" placeholder={"Question"} name={'title'} value={question.title} onChange={handleQuestion} disabled />}
                {!clicked && <Button className='ms-1' onClick={handleClick}><i className="bi bi-check"></i></Button>}
            </div>
            {responses.map(res => res)}
            {!clicked && <Button className="mx-auto mt-2" variant="success" onClick={addResponse}>Créer nouvelle réponse</Button>}
        </Form.Group>
    </>
};

export default QCMQuestion;
