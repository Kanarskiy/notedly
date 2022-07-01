// Импортируем React и зависимости //маршрутизации
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';

import Layout from "../components/Layout";

// Импортируем маршруты
import Home from "./home";
import MyNotes from "./mynotes";
import Favorites from "./favorites";
import NotePage from "./notes";
import SignUp from "./signup";
import SignIn from "./signin";
import NewNote from "./new";
import EditNote from "./edit";

import { IS_LOGGED_IN } from "../gql/query";

// Определяем маршруты
const Pages = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route exact path="/" element={<Home />} />

                    <Route path="mynotes" element={<PrivateRoute> <MyNotes /> </PrivateRoute>} />
                    <Route path="favorites" element={<PrivateRoute> <Favorites /> </PrivateRoute>} />
                    <Route path="new" element={<PrivateRoute> <NewNote /> </PrivateRoute>} />
                    <Route path="/edit/:id" element={<PrivateRoute> <EditNote /> </PrivateRoute>} />

                    <Route path="note/:id" element={<NotePage />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="signin" element={<SignIn />} />
                </Routes>
            </Layout>
        </Router >
    );
};


const PrivateRoute = ({ children }) => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    // Если данные загружаются, выводим сообщение о загрузке
    if (loading) return <p>Loading...</p>;
    // Если при получении данных произошел сбой, выводим сообщение об ошибке
    if (error) return <p>Error!</p>;
    // Если пользователь авторизован, направляем его к запрашиваемому компоненту
    // В противном случае перенаправляем на страницу авторизаци

    return (
        data.isLoggedIn ? children : <Navigate to='/signin' replace />
    );
};


export default Pages;