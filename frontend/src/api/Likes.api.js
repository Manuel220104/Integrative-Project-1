import axios from 'axios';

const urlBack = "http://localhost:8000/";

const API_BASE_URL = urlBack + "api/v1/";

const LikesAPI = axios.create({
    baseURL: API_BASE_URL + "Like/",
});

export const getAllLikes = () => LikesAPI.get('/');

export const createLike = (product_id, username) => {
    return LikesAPI.post('like_product/', {
        product_id: product_id,
        username: username,
    });
};

export const getLikeDetail = (like_id) => LikesAPI.get(`Likes/${like_id}/`);
