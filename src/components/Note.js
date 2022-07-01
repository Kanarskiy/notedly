import React from "react";
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import ReactMarkdown from 'react-markdown';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import NoteUser from "./NoteUser";

import { IS_LOGGED_IN } from "../gql/query";

// Ограничиваем расширение заметок до 800 пикселей
const StyledNote = styled.article`
    max-width: 800px;
    margin: 0 auto;
`;

// Стилизуем метаданные заметки
const MetaData = styled.div`
    @media (min-width: 500px) {
        display: flex;
        align-items: top;
    }
`;

// Добавляем пространство между аватаром и метаданными
const MetaInfo = styled.div`
    padding-right: 1em;
`;

// Выравниваем 'UserActions' по правой стороне на больших экранах
const UserActions = styled.div`
    margin-left: auto;
`;

const Note = ({ note }) => {
    const { data } = useQuery(IS_LOGGED_IN);

    return (
        <StyledNote>
            <MetaData>
                <MetaInfo>
                    <img
                        src={note.author.avatar}
                        alt="{note.author.username} avatar"
                        height="50px"
                    />
                </MetaInfo>
                <MetaInfo>
                    <em>by</em> {note.author.username} <br />
                    {format(parseISO(note.createdAt), 'dd MMM yyyy')}
                </MetaInfo>
                {(data.isLoggedIn) ? (
                    <UserActions>
                        <NoteUser note={note} />
                    </UserActions>
                ) : (
                    <UserActions>
                        <em>Favorites:</em> {note.favoriteCount}
                    </UserActions>
                )}
            </MetaData>
            <ReactMarkdown children={note.content} />
        </StyledNote>
    );
};

export default Note;