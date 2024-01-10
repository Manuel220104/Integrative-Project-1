import axios from 'axios'

import { urlBack } from './url';

const GamesApi = axios.create({
    baseURL: urlBack+'Table_Games/api/v1/Table_Game/'
});


export const getAllGames = () => GamesApi.get('/');
    
export const createGames = (Games) => GamesApi.post('/', Games);

export const updateGames = (id, updatedGamesData) => GamesApi.put(`${id}/`, updatedGamesData);


// export const getProductBook = () => BooksApi.get(urlBack+'Books/api/v1/Book_Product/');


