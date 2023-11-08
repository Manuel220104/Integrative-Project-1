import React, { useState, useEffect } from 'react';
import { updateUser } from '../../api/Accounts.api'; // Reemplaza con la ruta correcta a tu archivo de API
import { PaperClipIcon } from '@heroicons/react/20/solid'
import Profile from '../../assets/Images/Profile.png'


export function MyAccount() {
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Obtiene el nombre de usuario o correo electrónico del usuario desde localStorage
        const usernameOrEmail = localStorage.getItem('username_or_email');

        if (usernameOrEmail) {
            // Llama a la API para obtener la información del usuario
            fetchUserData(usernameOrEmail);
        }
    }, []);

    const fetchUserData = async (usernameOrEmail) => {
        try {
            const response = await updateUser(userData, usernameOrEmail);
            setUserData(response.data);
        } catch (error) {
            console.error('Error al obtener la información del usuario', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            // Llama a la API para actualizar la información del usuario
            const usernameOrEmail = localStorage.getItem('username_or_email');
            await updateUser(userData, usernameOrEmail);
            setIsEditing(false);
        } catch (error) {
            console.error('Error al actualizar la información del usuario', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <div className='MyAccountContainer'>
            <div class="container text-left">

                <div class="row">
                    <div class="col-sm-3">
                        <img class="Profile-logo" src={Profile} alt="Profile" />
                    </div>
                    <div class="col-sm-4">
                        <h3 class="Title_MyAccount">Hola !</h3>
                        <h3 class="Subtitle_MyAccount">Bienvenido a tu cuenta</h3>
                    </div>
                </div>



            </div>


            <div className="px-4 sm:px-0">
                <h3 className="Title">Tu Cuenta</h3>
            </div>

            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <label >Nombres: </label>
                        {isEditing ? (
                            <input
                                className="borderInput"
                                type="text"
                                name="first_name"
                                value={userData.first_name}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{userData.first_name}</span>
                        )}
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <label>Apellidos: </label>
                        {isEditing ? (
                            <input
                                className="borderInput"
                                type="text"
                                name="last_name"
                                value={userData.last_name}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{userData.last_name}</span>
                        )}
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <label>Correo electrónico: </label>
                        {isEditing ? (
                            <input
                                className="borderInput"
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{userData.email}</span>
                        )}
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <label>Nombre de usuario: </label>
                        {isEditing ? (
                            <input
                                className="borderInput"
                                type="text"
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{userData.username}</span>
                        )}
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <label>Departamento: </label>
                        {isEditing ? (
                            <input
                                className="borderInput"
                                type="text"
                                name="department"
                                value={userData.department}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{userData.department}</span>
                        )}
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <label>Ciudad: </label>
                        {isEditing ? (
                            <input
                                className="borderInput"
                                type="text"
                                name="city"
                                value={userData.city}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{userData.city}</span>
                        )}
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <label>Direccion: </label>
                        {isEditing ? (
                            <input
                                className="borderInput"
                                type="text"
                                name="address"
                                value={userData.address}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{userData.address}</span>
                        )}
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <label>Detalles de direccion: </label>
                        {isEditing ? (
                            <input
                                className="borderInput"
                                type="text"
                                name="details"
                                value={userData.details}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{userData.details}</span>
                        )}
                    </div>

                    {isEditing ? (
                        <button className="Boton-Guardar mb-5" onClick={handleSave}>Guardar</button>
                    ) : (
                        <button className="Boton-Guardar mb-5" onClick={handleEdit}>Editar</button>
                    )}
                </dl>
            </div>
        </div>
    );
}
