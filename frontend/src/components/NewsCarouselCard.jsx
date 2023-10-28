import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import like from '../assets/icons/like.png';
import likefull from '../assets/icons/likefull.png'; // Añade la imagen "likefull"

import cart from '../assets/icons/cart.png';

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

    // Iniciar el estado como true si la imagen inicial es "likefull", de lo contrario, false
    const [liked, setLiked] = useState(Product.ImageUrl === likefull);

    const handleLikeClick = () => {
        // Cambiar el estado en función de la imagen actual
        setLiked((currentLiked) => !currentLiked);
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
                        src={liked ? likefull : like} // Cambia la imagen en función del estado "liked"
                        alt="Me gusta"
                        onClick={handleLikeClick} // Agregar un controlador de clic para cambiar el estado
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
    
