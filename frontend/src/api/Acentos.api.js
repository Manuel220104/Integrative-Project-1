import axios from 'axios'


export const getAllAcentos = () => {
    return axios.get('http://localhost:8000/Acentos/api/v1/Book/') // funcion que pode al backend
}

