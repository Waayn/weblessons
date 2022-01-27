import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';

const Home = () => {

    const user = useSelector(state => state.user)
    const [pagination, setPagination] = useState({
        start: 0,
        end: 10,
    })

    const articles = [
        'article1', 'article2', 'article3', 'article4', 'article5', 'article6', 'article7',
        'article8', 'article9', 'article10', 'article11', 'article12', 'article13', 'article14',
        'article15', 'article16', 'article17', 'article18', 'article19', 'article20', 'article21',
        'article22', 'article23', 'article24', 'article25', 'article26', 'article27', 'article28'
    ]

    const changePage = (page) => {
        setPagination({ start: page * 10 - 10, end: page * 10 })
    }

    return <>
        <h1>Hello {user.username} !</h1>
        {articles.slice(pagination.start, pagination.end).map(article => {
            return <Link className="mb-2 d-block" to={`/article/${article}`}>{article}</Link>
        })}
        <Pagination items={articles.length} itemsPerPage={10} onChange={changePage} />
    </>
}

export default Home