import axios from 'axios'

const InformationCarouselApi = axios.create({
    baseURL: 'http://localhost:8000/InformationCarousel/api/v1/InformationCarousel/'
});

export const getAllInformationCarousel = () => InformationCarouselApi.get('/');

export const createInformationCarousel = (book) => BooksApi.post('/', book );



