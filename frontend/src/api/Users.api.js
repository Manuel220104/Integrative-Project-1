import axios from 'axios';

// const urlBack = "https://acentosapi.dis.eafit.edu.co/"
const urlBack = "http://localhost:8000/"

const UserApi = axios.create({
    baseURL: urlBack+"UsersAcentos/api/v1/UserAcentos/"

    //baseserver
});

axios.post('/accounts/api/login/', {
    username: username,
    password: password
})
.then(response => {
    // Maneja la respuesta exitosa (por ejemplo, guarda el token en el almacenamiento local)
})
.catch(error => {
    // Maneja los errores de inicio de sesión (por ejemplo, muestra un mensaje de error)
});
