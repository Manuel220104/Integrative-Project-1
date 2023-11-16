import axios from 'axios';

//const urlBack = "https://acentosapi.dis.eafit.edu.co/"
const urlBack = "http://localhost:8000/"

const ProductApi = axios.create({
    baseURL: urlBack+"Products/api/v1/Product/"

    //baseserver
});



export const getAllProducts = () => ProductApi.get('/')

export const CreateProducts = (product) => ProductApi.post('/', product)

export const getLastProduct = () => ProductApi.get(urlBack+'Products/api/v1/ultimo_registro/');

export const getLast10Product = () => ProductApi.get(urlBack+'Products/api/v1/Ultimo_registro_fecha/');

export const getAllProductsAndChild = () => ProductApi.get(urlBack+'Products/api/v1/Product_and_child/');

export const getLastProductsDescount = () => ProductApi.get(urlBack+'Products/api/v1/Ultimos_descuento/');

export const getLast10Products = () => ProductApi.get(urlBack+'Products/api/v1/Last_Products_and_child/');

export const updateProduct = (id, updateProductData) => ProductApi.put(`${id}/`, updateProductData);

export const deleteProduct = (id) => ProductApi.delete(`${id}/`);




