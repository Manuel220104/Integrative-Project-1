import React, { useState } from 'react';
import { PaperClipIcon } from '@heroicons/react/20/solid';

export function MyAccount() {
    const [liked, setLiked] = useState(false);
    const productId = 123; // Reemplaza con el ID del producto deseado
    const token = localStorage.getItem('token');
    const handleLikeClick = async () => {
        try {
            const response = await fetch(`http://localhost:8000/Likes/api/v1/products/${productId}/like/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Reemplaza con el token de autenticación del usuario
                },
            });
            if (response.status === 200) {
                setLiked(!liked); // Cambia el estado del botón
            }
        } catch (error) {
            console.error('Error al dar like: ', error);
        }
    };

    return (
        <div className='MyAccountContainer'>
            <button onClick={handleLikeClick}>
                {liked ? 'Unlike' : 'Like'} <PaperClipIcon className='w-6 h-6' />
            </button>
        </div>
    );
}
