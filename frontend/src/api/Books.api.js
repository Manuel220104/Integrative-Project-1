import axios from 'axios'

import { urlBack } from './url';

const BooksApi = axios.create({
    baseURL: urlBack+'Books/api/v1/Book/'
});


export const getAllBooks = () => BooksApi.get('/');
    
export const createBooks = (book) => BooksApi.post('/', book );

export const getProductBook = () => BooksApi.get(urlBack+'Books/api/v1/Book_Product/');

export const updateBook = (id, updatedBookData) => BooksApi.put(`${id}/`, updatedBookData);

