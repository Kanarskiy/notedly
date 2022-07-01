import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import UserForm from '../components/UserForm';
import { IS_LOGGED_IN } from "../gql/query";


const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

// Добавляем props(didn't work forr redissecting in react-dom v6), передаваемый в компонент для дальнейшего использования
const SignUp = () => {
    let navigate = useNavigate();

    useEffect(() => {
        document.title = 'Sign Up - Notedly';
    });

    const client = useApolloClient();
    //Добавляем хук мутации
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            // Сохраняем JWT в localStorage
            localStorage.setItem('token', data.signUp);
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
            <UserForm action={signUp} formType="signup"></UserForm>
            {/* Если данные загружаются, отображаем сообщение о загрузке */}
            {loading && <p>Loading...</p>}
            {/* Если при загрузке произошел сбой, отображаем сообщение об ошибке */}
            {error && <p>Error creating an account!</p>}
        </React.Fragment>
    );
};

export default SignUp;