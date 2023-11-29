import axios from 'axios'

const urlBack = "https://acentosapi.dis.eafit.edu.co/"
// const urlBack = "http://localhost:8000/"

const BooksApi = axios.create({
    baseURL: urlBack+'Books/api/v1/Book/'
});


export const getAllBooks = () => BooksApi.get('/');
    
export const createBooks = (book) => BooksApi.post('/', book );

export const getProductBook = () => BooksApi.get(urlBack+'Books/api/v1/Book_Product/');

export const updateBook = (id, updatedBookData) => BooksApi.put(`${id}/`, updatedBookData);

