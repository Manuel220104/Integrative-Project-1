import axios from 'axios'

const urlBack = "https://acentosapi.dis.eafit.edu.co/"
// const urlBack = "http://localhost:8000/"

const InformationCarouselApi = axios.create({
    baseURL: urlBack+'InformationCarousel/api/v1/InformationCarousel/'
});

export const getAllInformationCarousel = () => InformationCarouselApi.get('/');

export const CreateInformationCarousel = (information) => InformationCarouselApi.post('/', information );

export const getLastCarouselInfo = () => InformationCarouselApi.get(urlBack+'InformationCarousel/api/v1/ultimo_registro_CarouselInfo/');

export const deleteCarouselInfo = (id) => InformationCarouselApi.delete(`${id}/`)



