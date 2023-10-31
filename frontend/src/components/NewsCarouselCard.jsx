    import React, { useState } from 'react';
    import { Link } from 'react-router-dom';

    import like from '../assets/icons/like.png';
    import likefull from '../assets/icons/likefull.png'; // Añade la imagen "likefull"
    import { createLike } from '../api/Likes.api';

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
        
            // Obtén el product_id de Product.ProductId y el username de la manera adecuada
            const product_id = Product.ProductId; // Asegúrate de obtenerlo de la forma correcta
            const username = "bb"; // Asegúrate de obtenerlo de la forma correcta
        
            // Crea el objeto de datos a enviar en el POST
            const data = {
                product_id: product_id,
                username: username,
            };
        
            createLike(data.product_id, data.username)
                .then((response) => {
                    if (response.status === 201) {
                        // El "Me gusta" se ha registrado con éxito, puedes hacer algo aquí si lo deseas
                    } else if (response.status === 204) {
                        // El "Me gusta" se ha eliminado con éxito, puedes hacer algo aquí si lo deseas
                    }
                })
                .catch((error) => {
                    // Manejar errores de la API, puedes mostrar un mensaje de error si lo deseas
                    console.error('Error al interactuar con la API:', error);
                    // Imprime el error completo para depuración
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
        
