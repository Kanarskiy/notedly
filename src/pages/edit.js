import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

import NoteForm from "../components/NoteForm";

import { GET_NOTE, GET_ME } from "../gql/query";
import { EDIT_NOTE } from "../gql/mutation";

const EditNote = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    const [editNote] = useMutation(EDIT_NOTE, {
        variables: {
            id
        },
        onCompleted: () => {
            navigate(`/note/${id}`, { replace: true });
        }
    });

    const { loading: noteLoading, error: noteError, data: noteData } = useQuery(GET_NOTE, { variables: { id } });
    const { loading: userLoading, error: userError, data: userData } = useQuery(GET_ME);


    if (noteLoading || userLoading) return 'Loading...';
    if (noteError || userError) return `Error! ${error.message}`;

    if (userData.me.id !== noteData.note.author.id) {
        navigate(`/note/${id}`, { replace: true });
        return;
    }

    return <NoteForm content={noteData.note.content} action={editNote} />;



};

export default EditNote;