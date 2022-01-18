import React, { useState, useEffect } from 'react';
import { getAuthors } from "../../ApiCalls";
import { AddAuthor } from './AddAuthor';
import { Author } from './Author';

export const AuthorList = () => {
    const [authors, setAuthors] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(async () => {
        const RESULT = await getAuthors()
        setAuthors(RESULT);
    }, [reload])

    return (
        <div>
            <AddAuthor setReload={setReload} reload={reload}></AddAuthor>
            <ul style={{ listStyleType: "none" }}>
                {authors.map(author => {
                    return <Author setReload={setReload} reload={reload} author={author} key={author._id} />;
                })}
            </ul>
        </div>
    );
};