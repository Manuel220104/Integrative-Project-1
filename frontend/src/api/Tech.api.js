import axios from 'axios'

const urlBack = "https://acentosapi.dis.eafit.edu.co/"
// const urlBack = "http://localhost:8000/"

const TechApi = axios.create({
    baseURL: urlBack+'Technologys/api/v1/Technology/'
});


export const getAllTechnologys = () => TechApi.get('/');
    
export const createTechnologys = (Technology) => TechApi.post('/', Technology);

export const updateTechnologys = (id, updatedTechnologyData) => TechApi.put(`${id}/`, updatedTechnologyData);

// export const getProductBook = () => BooksApi.get(urlBack+'Books/api/v1/Book_Product/');


    