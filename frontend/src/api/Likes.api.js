import axios from 'axios';

//const urlBack = "https://acentosapi.dis.eafit.edu.co/"
const urlBack = "http://localhost:8000/";


const LikesAPI = axios.create({
    baseURL: urlBack + 'Likes/api/v1/', // Define la URL base personalizada
});


export const getAllLikes = () => LikesAPI.get('likes/');

export const createLike = (likeData) => LikesAPI.post('like_product/', likeData);


export const getLikeDetail = (like_id) => LikesAPI.get(`Likes/${like_id}/`);

export const getUserLikes = (username) => LikesAPI.get(`user_likes/${username}/`);


