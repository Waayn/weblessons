import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../api/axios';
import { Container } from 'react-bootstrap';

const Article = () => {

    const params = useParams()
    const [article, setArticle] = useState()

    useEffect(() => {
        getArticleById(params.articleId)
            .then(res => setArticle(res.data))
        //eslint-disable-next-line
    }, [])


    return <Container className="mt-3">
        {typeof article !== 'undefined' ?
            <>
                <h1 className="text-center" style={{ fontSize: '25px' }}>{article.title}</h1>
                <p className="mt-5" style={{ fontSize: '18px' }}>{article.content}</p>
                <div className="mt-4 pt-4">
                    <h2 className="fw-bold mb-4" style={{ fontSize: '20px' }}>QCM</h2>
                    {article.questions.map((question, index) => {
                        return <>
                            <p key={index}>{question.title}</p>
                            {question.responses.map((response, index) => {
                                return <div className="d-flex">
                                    <input type={'radio'} checked={response.value} />
                                    <p key={index} className="ms-4">{response.title}</p>
                                </div>
                            })}
                        </>
                    })}
                </div>
            </>
            : <p className="mt-3">Impossible d'afficher l'article, veuillez vérifier votre conenexion</p>}
    </Container>
};

export default Article;
