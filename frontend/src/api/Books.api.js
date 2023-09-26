import axios from 'axios'

// const urlBack = "https://acentosapi.dis.eafit.edu.co/"
const urlBack = "http://localhost:8000/"

const BooksApi = axios.create({
    baseURL: urlBack+'Table_Games/api/v1/Table_Game/'
});


export const getAllBooks = () => BooksApi.get('/');
    
export const createBooks = (book) => BooksApi.post('/', book );

export const getProductBook = () => BooksApi.get(urlBack+'Books/api/v1/Book_Product/');


