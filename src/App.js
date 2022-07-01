import React from "react";
import { createRoot } from 'react-dom/client';
// Импортируем библиотеки Apollo Client
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, gql } from '@apollo/client';
import { setContext } from 'apollo-link-context';

// Импортируем глобальные стили
import GlobalStyle from '/components/GlobalStyle';

import Pages from "./pages";
import { IS_LOGGED_IN } from "./gql/query";
// Настраиваем API URI и кэш
const uri = process.env.API_URI;
const httplink = createHttpLink({ uri });
const cache = new InMemoryCache({
    typePolicies: {
        User: {
            fields: {
                isLoggedIn: Boolean
            }
        }
    }
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || ''
        }
    };
});

// Настраиваем Apollo Client
const client = new ApolloClient({
    link: authLink.concat(httplink),
    uri,
    cache,
    resolvers: {},
    connectToDevTools: true
});

// Проверяем наличие локального токена
const data = {
    isLoggedIn: !!localStorage.getItem('token')
};
console.log('data: ', data);

// Записываем данные кэша при начальной загрузке
cache.writeQuery({
    query: IS_LOGGED_IN,
    data: data,
});

// Записываем данные кэша после его сброса
client.onResetStore(() => {
    cache.writeQuery({
        query: IS_LOGGED_IN,
        data: data,
    });
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle />
            <Pages />
        </ApolloProvider>
    );
};

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
