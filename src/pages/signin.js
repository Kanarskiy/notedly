import React, { useEffect } from "react";
import { useMutation, useApolloClient, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import UserForm from '../components/UserForm';
import { IS_LOGGED_IN } from "../gql/query";


const SIGNIN_USER = gql`
    mutation signIn($email: String, $password: String!) {
        signIn(email: $email, password: $password)
    }
`;

const SignIn = () => {
    let navigate = useNavigate();

    useEffect(() => {
        document.title = 'Sign In - Notedly';
    });

    const client = useApolloClient();
    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            // Сохраняем токен
            localStorage.setItem('token', data.signIn);
            // Обновляем локальный кэш
            client.writeQuery({
                query: IS_LOGGED_IN,
                data: { isLoggedIn: true }
            });
            // Перенаправляем пользователя на домашнюю страницу
            navigate('/', { replace: true });
        }
    });

    return (
        <React.Fragment>
            <UserForm action={signIn} formType='signIn'></UserForm>
            {/* Если данные загружаются, отображаем сообщение о загрузке */}
            {loading && <p>Loading...</p>}
            {/* Если при загрузке произошел сбой, отображаем сообщение об ошибке */}
            {error && <p>Error signing in!</p>}
        </React.Fragment>
    );
};

export default SignIn;