import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';
import { getAllArticles } from './../api/axios';

const Home = () => {

    const user = useSelector(state => state.user)
    const [pagination, setPagination] = useState({
        start: 0,
        end: 10
    })

    const [articles, setArticles] = useState([])
    const changePage = (page) => {
        setPagination({ start: page * 10 - 10, end: page * 10 })
    }

    useEffect(() => {
        getAllArticles()
            .then(res => setArticles(res.data))
        //eslint-disable-next-line
    }, [])

    return <>
        <h1>Hello {user.username} !</h1>
        {articles.length === 0 ? <p>Oups, nous ne pouvons par afficher les articles, veuillez vérifier votre connexion</p> : <>
            {user.role === 'admin' && <Link className="btn btn-primary mt-3 mb-5" to='/create/article'>Créer article</Link>}
            {articles.slice(pagination.start, pagination.end).map(article => {
                return <Link key={article._id} className="mb-2 d-block" to={`/article/${article._id}`}>{article.title}</Link>
            })}
            <Pagination items={articles.length} itemsPerPage={10} onChange={changePage} />
        </>}
    </>
}

export default Home