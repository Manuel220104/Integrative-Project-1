import axios from 'axios';

const urlBack = "http://localhost:8000/";


const LikesAPI = axios.create({
    baseURL: urlBack + 'Likes/api/v1/', // Define la URL base personalizada
});


export const getAllLikes = () => LikesAPI.get('/likes/');

export const createLike = (likeData) => LikesAPI.post('like_product/', likeData);


export const getLikeDetail = (like_id) => LikesAPI.get(`Likes/${like_id}/`);
