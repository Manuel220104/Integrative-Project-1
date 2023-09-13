import axios from 'axios';

const ProductApi = axios.create({
    baseURL: "https://acentosapi.dis.eafit.edu.co/Products/api/v1/Product/"
});


export const getAllProducts = () => ProductApi.get('/')

export const CreateProducts = (product) => ProductApi.post('/', product)

export const getLastProduct = () => ProductApi.get('https://acentosapi.dis.eafit.edu.co/Products/api/v1/ultimo_registro/');

export const getLastProductDate = () => ProductApi.get('https://acentosapi.dis.eafit.edu.co/Products/api/v1/Ultimo_registro_fecha/');

export const getAllProductsAndChild = () => ProductApi.get('https://acentosapi.dis.eafit.edu.co/Products/api/v1/Product_and_child/');

export const getLastProductsDescount = () => ProductApi.get('https://acentosapi.dis.eafit.edu.co/Products/api/v1/Ultimos_descuento/');

