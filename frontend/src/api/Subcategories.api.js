import axios from 'axios'

// const urlBack = "https://acentosapi.dis.eafit.edu.co/"
const urlBack = "http://localhost:8000/"

const Subcategories = axios.create({
    baseURL: urlBack+'Subcategories/api/v1/Subcategory/'
});

export const getAllSubcategory = () => Subcategories.get('/'); 

export const createSubcategory = (Subcategory) => Subcategories.post('/', Subcategory);

export const deleteSubcategory = (subcategoryName) => Subcategories.delete(`${subcategoryName}/`)

