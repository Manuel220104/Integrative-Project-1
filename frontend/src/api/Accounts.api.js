import axios from 'axios';

// const urlBack = "https://acentosapi.dis.eafit.edu.co/"
const urlBack = "http://localhost:8000/"

const AccountsApi = axios.create({
    baseURL: urlBack+"accounts/api/v1/"

    //baseserver
});

export const getAllAccounts = () => AccountsApi.get('users/')

export const registerUser = (userData) => AccountsApi.post('register/', userData);

export const loginUser = (userData) => AccountsApi.post('login/', userData);
