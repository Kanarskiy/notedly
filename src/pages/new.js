import React, { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { Navigate, useNavigate } from "react-router-dom";

import NoteForm from "../components/NoteForm";
import { GET_NOTES, GET_MY_NOTES } from "../gql/query";

const NEW_NOTE = gql`
    mutation newNote($content: String!) {
        newNote(content: $content) {
            id
            content
            createdAt
            favoriteCount
            favoritedBy {
                id
                username
            }
            author {
                id
                username
            }
        }
    }
`;

const NewNote = () => {
    let navigate = useNavigate();

    useEffect(() => {
        document.title = 'New Note - Notedly';
    });

    const [data, { loading, error }] = useMutation(NEW_NOTE, {
        // Повторно получаем запрос GET_NOTES, чтобы обновить кэш
        refetchQueries: [{ query: GET_NOTES }, { GET_MY_NOTES }],
        onCompleted: data => {
            navigate(`/note/${data.newNote.id}`, { replace: true });
        }
    });

    return (
        <React.Fragment>
            {loading && <p>Loading...</p>}
            {error && <p>Error saving the note</p>}
            {/* Компонент формы, передающий мутацию данных в качестве prop */}
            <NoteForm action={data} />
        </React.Fragment>
    );
};

export default NewNote;