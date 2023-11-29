import axios from 'axios'

const urlBack = "https://acentosapi.dis.eafit.edu.co/"
// const urlBack = "http://localhost:8000/"

const CategoriesApi = axios.create({
    baseURL: urlBack+'Categories/api/v1/Category/'
});

export const getAllCategories = () => CategoriesApi.get('/'); 

export const createCategory = (Category) => CategoriesApi.post('/', Category);

export const deleteCategory = (categoryName) => CategoriesApi.delete(`${categoryName}/`)


