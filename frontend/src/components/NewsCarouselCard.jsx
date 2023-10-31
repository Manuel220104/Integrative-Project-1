import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dislike from '../assets/icons/like.png';
import like from '../assets/icons/likefull.png';
import { createLike } from '../api/Likes.api';
import cart from '../assets/icons/cart.png';
import { getAllLikes } from '../api/Likes.api';



const MaxLength = 30;
function formatNumberWithCommas(input) {
    if (typeof input !== 'number') {
        input = parseFloat(input.replace(/,/g, ''));
    }
    return input.toLocaleString('es-ES');
}

export function NewsCarouselCard({ Product }) {
    const truncatedName =
        Product.Name.length > MaxLength
            ? `${Product.Name.substring(0, MaxLength)}...`
            : Product.Name;

    const [liked, setLiked] = useState(false); // Inicialmente, no se ha hecho "like"

    useEffect(() => {
        // Obtener el nombre de usuario o email del almacenamiento local
        const username_or_email = localStorage.getItem('username_or_email');

        // Realizar una solicitud para obtener los "likes" del usuario
        getAllLikes()
            .then((response) => {
                if (response.status === 200) {
                    // Verificar si el usuario ha dado "like" al producto actual
                    const userLikes = response.data;
                    const hasLiked = userLikes.some((dislike) => dislike.product_id === Product.ProductId);
                    setLiked(hasLiked);
                }
            })
            .catch((error) => {
                console.error('Error al obtener los "likes":', error);
            });
    }, [Product.ProductId]); // Ejecutar cuando cambie el ID del producto
    const handleLikeClick = () => {
        setLiked((currentLiked) => !currentLiked);

        const product_id = Product.ProductId;

        const data = {
            product_id: Product.ProductId,
            username: "bb", // Puedes reemplazar "bb" con el valor del nombre de usuario que desees
        };
        console.log(data);
        // Envía una solicitud POST a la API de Likes con el token de autenticación en los encabezados
        createLike(data)
            .then((response) => {
                if (response.status === 201) {
                    // "Me gusta" registrado con éxito
                } else if (response.status === 204) {
                    // "Me gusta" eliminado con éxito
                }
            })
            .catch((error) => {
                console.error('Error al interactuar con la API:', error);
                console.error(error);
            });
    };

    return (
        <div className="cardNews">
            <img className="imagencarrusel" src={Product.ImageUrl} alt={truncatedName} />
            <div className="infoNews">
                <span className="TitleCardNews">{truncatedName}</span>
                <span className="PriceCard">$ {formatNumberWithCommas(Product.Price)}</span>
                <h2 className="tipoproducto">{Product.ProductType}</h2>
                <hr />
                <div className="iconsCard">
                    <img
                        className="navbar-item like-icon"
                        src={liked ? like : dislike}
                        alt="Me gusta"
                        onClick={handleLikeClick}
                    />
                    <img className="navbar-item cart-icon" src={cart} alt="Carrito" />
                </div>
                <Link to={`/Productos/DetalleProducto/${Product.ProductId}`} state={{ Product }}>
                    <span className="seeCard">Ver más</span>
                </Link>
            </div>
        </div>
    );
}
