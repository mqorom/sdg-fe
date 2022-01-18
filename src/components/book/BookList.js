import { Book } from "./Book";
import React, { useState, useEffect } from 'react';
import { getBooks } from "../../ApiCalls";
import { AddBook } from "./AddBook";

export const BookList = () => {
    const [books, setBooks] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(async () => {
        const RESULT = await getBooks()
        setBooks(RESULT);
    }, [reload])


    return (
        <div>
            <AddBook setReload={setReload} reload={reload}></AddBook>
            <ul style={{ listStyleType: "none" }}>
                {books.map(book => {
                    return <Book setReload={setReload} reload={reload} book={{ ...book }} key={book._id} />;
                })}
            </ul>
        </div>

    );
};