import axios from 'axios'

import { urlBack } from './url';

const Subcategories = axios.create({
    baseURL: urlBack+'Subcategories/api/v1/Subcategory/'
});

export const getAllSubcategory = () => Subcategories.get('/'); 

export const createSubcategory = (Subcategory) => Subcategories.post('/', Subcategory);

export const deleteSubcategory = (subcategoryName) => Subcategories.delete(`${subcategoryName}/`)

