import axios from 'axios';

import { urlBack } from './url';

const AccountsApi = axios.create({
    baseURL: urlBack+"accounts/api/v1/"

    //baseserver
});

export const getAllAccounts = () => AccountsApi.get('users/')

export const registerUser = (userData) => AccountsApi.post('register/', userData);

export const loginUser = (userData) => AccountsApi.post('login/', userData);

export const updateUser = (userData, username) => AccountsApi.patch(`user/${username}/`, userData);

