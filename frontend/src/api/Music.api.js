import axios from 'axios'

const urlBack = "https://acentosapi.dis.eafit.edu.co/"
// const urlBack = "http://localhost:8000/"

const MusicApi = axios.create({
    baseURL: urlBack+'Musical_Instruments/api/v1/Musical_Instrument/'
});

export const getAllMusic = () => MusicApi.get('/');

export const createMusic = (Games) => MusicApi.post('/', Games);

export const updateMusic = (id, updatedMusicData) => MusicApi.put(`${id}/`, updatedMusicData);


// export const getProductBook = () => BooksApi.get(urlBack+'Books/api/v1/Book_Product/');


