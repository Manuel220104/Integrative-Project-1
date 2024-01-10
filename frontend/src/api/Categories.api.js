import axios from 'axios'

import { urlBack } from './url';

const CategoriesApi = axios.create({
    baseURL: urlBack+'Categories/api/v1/Category/'
});

export const getAllCategories = () => CategoriesApi.get('/'); 

export const createCategory = (Category) => CategoriesApi.post('/', Category);

export const deleteCategory = (categoryName) => CategoriesApi.delete(`${categoryName}/`)


