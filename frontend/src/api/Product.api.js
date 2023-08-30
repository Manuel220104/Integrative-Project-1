import axios from 'axios'

const BooksApi = axios.create({
    baseURL: "http://localhost:8000/Products/api/v1/Product/"
});


export const getAllProducts = () => BooksApi.get('/')

export const CreateProducts = (product) => BooksApi.post('/', product)
