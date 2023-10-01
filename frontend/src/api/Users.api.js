import axios from 'axios';

// const urlBack = "https://acentosapi.dis.eafit.edu.co/"
const urlBack = "http://localhost:8000/"

const UserApi = axios.create({
    baseURL: urlBack+"UsersAcentos/api/v1/UserAcentos/"

    //baseserver
});

export const getAllUsers = () => UserApi.get('/')

export const getRegister = () => UserApi.get(urlBack+'UsersAcentos/api/v1/register/');


