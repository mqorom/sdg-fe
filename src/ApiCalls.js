
import axios from 'axios';

// -------------------- Book API ----------------------- //
export const getBooks = async () => {
    const result = await axios.get('/library/books');
    return result.data
}

export const getBookDetails = async (bookId) => {
    try {
        const result = await axios.get(`/library/book/${bookId}`);
        console.log(result.data)
        return result
    } catch (error) {
        console.log(error)
    }
}

export const editBook = async (book) => {
    try {
        const response = await axios({
            method: "put",
            url: `/library/book/${book.id}`,
            data: book,
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

export const createBook = async (book) => {
    try {
        const response = await axios({
            method: "post",
            url: `/library/book`,
            data: book,
        });
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// ---------------- Author API -------------------- //

export const getAuthors = async () => {
    const result = await axios.get('library/authors')
    return result.data
}

export const getAutherDetails = async (authorId) => {
    try {
        const result = await axios.get(`/library/author/${authorId}`)
        return result.data
    } catch (error) {
        console.log(error)
    }
}

export const editAuthor = async (author) => {
    try {
        const response = await axios({
            method: "put",
            url: `/library/author/${author.id}`,
            data: author,
        });
        return response
    } catch (error) {
        console.log(error)
    }
}

export const createAuthor = async (author) => {
    try {
        const response = await axios({
            method: "post",
            url: `/library/author`,
            data: author,
        })
        return response
    } catch (error) {
        console.log(error)
    }
}
