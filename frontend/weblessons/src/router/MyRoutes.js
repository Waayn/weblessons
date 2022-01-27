import { useCookies } from 'react-cookie';
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from "../pages/Home";
import Redirect from "../pages/Redirect";
import Login from "../pages/Login";
import Register from '../pages/Register';
import CreateArticle from '../pages/CreateArticle';
import Article from '../pages/Article';
import { getUserById } from '../api/axios';
import { useDispatch } from 'react-redux';
import { setUserInfos } from '../app/store';

const MyRoutes = () => {

    const [cookies, setCookie] = useCookies()
    const dispatch = useDispatch()

    useEffect(() => {
        if (typeof cookies['weblessons'] !== 'undefined') {
            getUserById(cookies['weblessons'])
                .then(res => dispatch(setUserInfos(res.data)))
                .catch(() => setCookie('weblessons', '', { expires: new Date(Date.now() - (3600 * 1000 * 25)) }))
        }
        //eslint-disable-next-line
    }, [])

    return <Routes>
        {typeof cookies['weblessons'] === 'undefined' && <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Redirect path="/login" />} />
        </>}
        {typeof cookies['weblessons'] !== 'undefined' && <>
            <Route exact path='/article/:articleId' element={<Article />} />
            <Route exact path='/create/article' element={<CreateArticle />} />
            <Route exact path='/' element={<Home />} />
            <Route path="*" element={<Redirect path="/" />} />
        </>}
    </Routes>
}

export default MyRoutes