import React from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import ButtonAsLink from './ButtonAsLink';

import { DELETE_NOTE } from '../gql/mutation';
// Импортируем запросы для их повторного получения после удаления заметки
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';

const DeleteNote = props => {
    const navigate = useNavigate();

    const [deleteNote] = useMutation(DELETE_NOTE, {
        variables: {
            id: props.noteId
        },
        // Повторно получаем запросы списка заметок, чтобы обновить кэш
        refetchQueries: [{ query: GET_MY_NOTES, GET_NOTES }],
        onCompleted: data => {
            // Перенаправляем пользователя на страницу "my notes"
            navigate('/mynotes');
        }
    });

    return <ButtonAsLink onClick={deleteNote}>Delete Note</ButtonAsLink>;
};

export default DeleteNote;