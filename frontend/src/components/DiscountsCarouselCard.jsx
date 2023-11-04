import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import like from '../assets/icons/like.png'
import likefull from '../assets/icons/likefull.png';
import { createLike, getUserLikes } from '../api/Likes.api';
import cart from '../assets/icons/cart.png'



const MaxLength = 30;
function formatNumberWithCommas(input) {
    if (typeof input !== 'number') {
        input = parseFloat(input.replace(/,/g, ''));
    }
    return input.toLocaleString('es-ES');
}

const token = localStorage.getItem('token');
const username_or_email = localStorage.getItem('username_or_email');

export function DiscountsCarouselCard({ Product }) {
    const truncatedName = Product.Name.length > MaxLength ? `${Product.Name.substring(0, MaxLength)}...` : Product.Name;

    const [liked, setLiked] = useState(false);
    const [isLikedProduct, setIsLikedProduct] = useState(false);

    const fetchUserLikes = () => {
        getUserLikes(username_or_email)
            .then((response) => {
                if (response.status === 200) {
                    const likes = response.data;
                    const productIds = likes.map(like => like.product);

                    // Verificar si el producto actual está en la lista de "Me gusta"
                    const currentProductIsLiked = productIds.includes(Product.ProductId);
                    setIsLikedProduct(currentProductIsLiked);

                    const numberOfLikes = likes.length;
                    console.log('Número de likes del usuario:', username_or_email, ":", numberOfLikes);
                    console.log('isLikedProduct:', currentProductIsLiked);
                }
            })
            .catch((error) => {
                console.error('Error al obtener los likes del usuario:', error);
            });
    };

    useEffect(() => {
        // Llamar a la función para obtener los likes del usuario cuando el componente se monta
        fetchUserLikes();
    }, []);

    const handleLikeClick = () => {
        if (token) {
            setLiked((currentLiked) => !currentLiked);

            const product_id = Product.ProductId;

            const data = {
                product_id: Product.ProductId,
                username: username_or_email,
            };
            console.log(data);

            createLike(data)
                .then((response) => {
                    if (response.status === 201) {
                        // "Me gusta" registrado con éxito
                        fetchUserLikes();
                    } else if (response.status === 204) {
                        // "Me gusta" eliminado con éxito
                        fetchUserLikes();
                    }
                })
                .catch((error) => {
                    console.error('Error al interactuar con la API:', error);
                });
        } else {
            console.log('El usuario no ha iniciado sesión');
        }
    };


    return (
        <div className="cardNews">
            <img className="imagencarrusel" src={Product.ImageUrl}></img>
            <div className="infoNews">
                <h2 className="Discount"> {Product.Discount}%</h2>
                <span className='TitleCardNews'>{truncatedName}</span>
                <span className='PriceCard'>$ {formatNumberWithCommas(Product.Price)}</span>
                <h2 className="tipoproducto">{Product.ProductType}</h2>

                <hr />
                <div className="iconsCard">
                    <img
                        className="navbar-item like-icon"
                        src={isLikedProduct ? likefull : like}
                        alt="Me gusta"
                        onClick={handleLikeClick}
                    />
                    <img className="navbar-item cart-icon" src={cart} alt="Carrito" />
                </div>
                <Link to={`/Productos/DetalleProducto/${Product.ProductId}`} state={{ Product: Product }}>
                    <span className="seeCard">Ver más</span>
                </Link>
            </div>



        </div>

    )
}
