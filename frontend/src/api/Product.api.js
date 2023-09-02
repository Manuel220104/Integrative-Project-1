import axios from 'axios'

const ProductApi = axios.create({
    baseURL: "http://localhost:8000/Products/api/v1/Product/"
});


export const getAllProducts = () => ProductApi.get('/')

export const CreateProducts = (product) => ProductApi.post('/', product)

export const obtenerUltimoIdProducto = () => {
    return ProductApi.get('/ultimo_registro/')
        .then((response) => {
            return response.data.ultimo_id;
        })
        .catch((error) => {
            console.error('Error al obtener el último ID de producto:', error);
            throw error;
        });
    };
