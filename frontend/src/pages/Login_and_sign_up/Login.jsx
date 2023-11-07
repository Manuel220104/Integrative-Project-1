import { loginUser } from './../../api/Accounts.api';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export function Login() {
    const [loginData, setLoginData] = useState({
        username_or_email: '',
        password: '',
        user_type: '',
    });

    const [loginSuccess, setLoginSuccess] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        // Muestra el JSON que se enviará en la solicitud POST
        console.log('Datos a enviar:', loginData);
    
        try {
            const response = await loginUser(loginData);
    
            // Comprobar si la respuesta indica un inicio de sesión exitoso
            if (response.status === 200) {
                console.log('Inicio de sesión exitoso');
    
                const token = response.data.token;
                const username_or_email = response.data.username_or_email;
                const user_type = response.data.user_type;
                console.log('Token:', token);
                console.log('username_or_email:', username_or_email);
                console.log('user_type:', user_type);
                localStorage.setItem('token', token);
                localStorage.setItem('username_or_email', username_or_email);
                localStorage.setItem('user_type', user_type);
    
                setLoginSuccess(true);
                navigate('/');
                window.location.reload();
            } else {
                setLoginSuccess(false);
                console.log('Inicio de sesión fallido');
    
                const responseData = await response.json();
                setResponseMessage(responseData.error);
    
                // Limpia los campos de entrada en caso de error
                setLoginData({
                    username_or_email: '',
                    password: '',
                    user_type: '',
                });
            }
        } catch (error) {
            // Manejar errores
            setError("Hubo un error en el inicio de sesión. Por favor, inténtalo de nuevo.");
            console.error('Error en el inicio de sesión:', error);
    
            // Limpia los campos de entrada en caso de error
            setLoginData({
                username_or_email: '',
                password: '',
                user_type: '',
            });
        }
    };

    const handleInputChange = (e) => {
        // Limpiar el mensaje de error al cambiar el valor de los campos de entrada
        setError('');

        // Actualizar el estado loginData según el campo de entrada modificado
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };


    

    return (
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Inicio de sesión</h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="username_or_email" className="block text-sm font-medium text-gray-700">
                                Dirección de correo o Nombre de usuario
                            </label>
                            <div className="mt-1">
                                <input
                                    id="username_or_email"
                                    name="username_or_email"
                                    type="username_or_email"
                                    autoComplete="username_or_email"
                                    required
                                    value={loginData.username_or_email}
                                    onChange={(e) => setLoginData({ ...loginData, username_or_email: e.target.value })}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        {/* <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div> */}
                        <div>
                            <button
                                type="submit"
                                className="Boton-InicioSesion w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Iniciar Sesion
                            </button>
                            <Link to="/Registro-Usuario">
                                <button
                                    type="button"
                                    className="Boton-InicioSesion w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Registrate
                                </button>
                            </Link>
                        </div>
                    </form>
                    {loginSuccess && <p className="text-green-600">Inicio de sesión exitoso</p>}
                    {error && <p className="text-red-600">Error: {error}</p>}

                    
                </div>
            </div>
        </div>
    );
}


