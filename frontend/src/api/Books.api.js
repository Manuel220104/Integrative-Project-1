import axios from 'axios'

const BooksApi = axios.create({
    baseURL: 'http://localhost:8000/Books/api/v1/Book/'
});


export const getAllBooks = () => BooksApi.get('/');
    
    
export const createBook = (book) => BooksApi.post('/', book );


