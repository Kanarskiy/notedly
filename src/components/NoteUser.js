import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import DeleteNote from './DelteNote';
import FavoriteNote from './FavoriteNote';

import { GET_ME } from '../gql/query';

const NoteUser = props => {
    const { loading, error, data } = useQuery(GET_ME);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;

    return (
        <React.Fragment>
            <FavoriteNote me={data.me} noteId={props.note.id} favoriteCount={props.note.favoriteCount}></FavoriteNote>
            <br />
            {data.me.id === props.note.author.id && (
                <React.Fragment>
                    <Link to={`/edit/${props.note.id}`}>Edit</Link>
                    <br />
                    <DeleteNote noteId={props.note.id} />
                </React.Fragment>
            )}
            <br />
            Favorites: {props.note.favoriteCount}
        </React.Fragment>
    );
};

export default NoteUser;