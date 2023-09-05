import axios from 'axios';

const ProductApi = axios.create({
    baseURL: "http://localhost:8000/Products/api/v1/Product/"
});


export const getAllProducts = () => ProductApi.get('/')

export const CreateProducts = (product) => ProductApi.post('/', product)

export const getLastProduct = () => ProductApi.get('http://localhost:8000/Products/api/v1/ultimo_registro/');

export const getLastProductDate = () => ProductApi.get('http://localhost:8000/Products/api/v1/Ultimo_registro_fecha/');

