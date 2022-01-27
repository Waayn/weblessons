import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../api/axios';

const Article = () => {

    const params = useParams()
    const [article, setArticle] = useState({})

    useEffect(() => {
        getArticleById(params.articleId)
            .then(res => setArticle(res.data))
        //eslint-disable-next-line
    }, [])


    return <div>
        {console.log(article)}
    </div>;
};

export default Article;
