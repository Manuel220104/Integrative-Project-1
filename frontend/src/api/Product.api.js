import axios from 'axios';

const ProductApi = axios.create({
    baseURL: "http://localhost:8000/Products/api/v1/Product/"
});


export const getAllProducts = () => ProductApi.get('/')

export const CreateProducts = (product) => ProductApi.post('/', product)

export const getLastProduct = () => ProductApi.get('http://localhost:8000/Products/api/v1/ultimo_registro/');

export const getLast10Product = () => ProductApi.get('http://localhost:8000/Products/api/v1/Ultimo_registro_fecha/');

export const getAllProductsAndChild = () => ProductApi.get('http://localhost:8000/Products/api/v1/Product_and_child/');

export const getLastProductsDescount = () => ProductApi.get('http://localhost:8000/Products/api/v1/Ultimos_descuento/');

export const getLast10Products = () => ProductApi.get('http://localhost:8000/Products/api/v1/Last_Products_and_child/');


