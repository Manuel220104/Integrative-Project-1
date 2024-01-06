import axios from 'axios'

import { urlBack } from './url';

const TechApi = axios.create({
    baseURL: urlBack+'Technologys/api/v1/Technology/'
});


export const getAllTechnologys = () => TechApi.get('/');
    
export const createTechnologys = (Technology) => TechApi.post('/', Technology);

export const updateTechnologys = (id, updatedTechnologyData) => TechApi.put(`${id}/`, updatedTechnologyData);

// export const getProductBook = () => BooksApi.get(urlBack+'Books/api/v1/Book_Product/');


    