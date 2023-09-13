import axios from 'axios'

const InformationCarouselApi = axios.create({
    baseURL: 'https://acentosapi.dis.eafit.edu.co/InformationCarousel/api/v1/InformationCarousel/'
});

export const getAllInformationCarousel = () => InformationCarouselApi.get('/');

export const createInformationCarousel = (book) => BooksApi.post('/', book );



