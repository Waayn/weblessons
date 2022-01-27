import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const QCMResponse = (props) => {

  const [response, setResponse] = useState({
    title: "",
    value: false
  })
  const [clicked, setClicked] = useState(false)

  const handleResponse = ({ target: { name, value } }) => {
    setResponse({
      ...response,
      [name]: value
    })
  }

  const handleCheck = () => {
    setResponse({
      ...response,
      value: !response.value
    })
  }

  const handleClick = () => {
    if (response.title !== '') {
      props.addResponse(response)
      setClicked(true)
    }
  }

  return <>
    <Form.Group className="mt-2 d-flex" controlId={'formBasicCheck'}>
      {!clicked && <Form.Check style={{ width: '10%' }} className="d-flex justify-content-center align-items-center" type={'checkbox'} checked={response.value} onChange={handleCheck} />}
      {clicked && <Form.Check style={{ width: '10%' }} className="d-flex justify-content-center align-items-center" type={'checkbox'} checked={response.value} disabled />}
      {!clicked && <Form.Control style={{ width: '90%' }} type="text" placeholder={"Réponse"} name={"title"} value={response.title} onChange={handleResponse} />}
      {clicked && <Form.Control style={{ width: '90%' }} type="text" placeholder={"Réponse"} name={"title"} value={response.title} disabled />}
      {!clicked && <Button className='ms-1' onClick={handleClick}><i className="bi bi-check"></i></Button>}
    </Form.Group>
  </>
};

export default QCMResponse;
