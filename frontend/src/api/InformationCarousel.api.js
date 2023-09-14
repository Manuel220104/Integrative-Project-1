import axios from 'axios'

const InformationCarouselApi = axios.create({
    baseURL: 'http://localhost:8000/InformationCarousel/api/v1/InformationCarousel/'
});

export const getAllInformationCarousel = () => InformationCarouselApi.get('/');

export const CreateInformationCarousel = (information) => InformationCarouselApi.post('/', information );

export const getLastCarouselInfo = () => InformationCarouselApi.get('http://localhost:8000/InformationCarousel/api/v1/ultimo_registro_CarouselInfo/');


