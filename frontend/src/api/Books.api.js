import axios from 'axios'

const BooksApi = axios.create({
    baseURL: 'http://localhost:8000/Books/api/v1/Book/'
});


export const getAllBooks = () => BooksApi.get('/');
    // return axios.get('http://localhost:8000/Books/api/v1/Book/') // funcion que pode al backend
    

export const createBook = (book) => BooksApi.post('/', book );

