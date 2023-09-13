import axios from 'axios'

const BooksApi = axios.create({
    baseURL: 'https://acentosapi.dis.eafit.edu.co/Books/api/v1/Book/'
});


export const getAllBooks = () => BooksApi.get('/');
    
export const createBooks = (book) => BooksApi.post('/', book );

export const getProductBook = () => BooksApi.get('https://acentosapi.dis.eafit.edu.co/Books/api/v1/Book_Product/');


