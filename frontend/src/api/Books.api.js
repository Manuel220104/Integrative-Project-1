import axios from 'axios'

const BooksApi = axios.create({
    baseURL: 'http://localhost:8000/Books/api/v1/Book/'
});


export const getAllBooks = () => BooksApi.get('/');
    
export const createBooks = (book) => BooksApi.post('/', book );

export const getProductBook = () => BooksApi.get('http://localhost:8000/Books/api/v1/Book_Product/');


