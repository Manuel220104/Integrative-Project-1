import React, { useState, useEffect, useRef } from 'react';
import { getLastProductsDescount } from '../api/Product.api';
import { DiscountsCarouselCard } from './DiscountsCarouselCard';


import { Link } from 'react-router-dom'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export function LastProductDiscount() {
    const [ultimoProductoDescuento, setUltimoProductoDescuento] = useState([]);
    const sliderRef = useRef(null);

    useEffect(() => {
        async function loadUltimoProductoDescuento() {
            const res = await getLastProductsDescount();
            setUltimoProductoDescuento(res.data);
        }
        loadUltimoProductoDescuento();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5, // Muestra 4 imágenes a la vez
        slidesToScroll: 1, // Avanza de a 1 imagen
        responsive: [
            {
                breakpoint: 1024, // Cambia la configuración en pantallas más pequeñas
                settings: {
                    slidesToShow: 3, // Muestra 3 elementos en pantallas medianas
                },
            },
            {
                breakpoint: 768, // Cambia la configuración en pantallas más pequeñas
                settings: {
                    slidesToShow: 2, // Muestra 2 elementos en pantallas pequeñas
                },
            },
            {
                breakpoint: 480, // Cambia la configuración en pantallas aún más pequeñas
                settings: {
                    slidesToShow: 1, // Muestra 1 elemento en pantallas muy pequeñas
                },
            },
        ],
    };

    const nextSlide = () => {
        sliderRef.current.slickNext();
    };

    const prevSlide = () => {
        sliderRef.current.slickPrev();
    };

    return (
        <div>
            <h1 className="titulocarruselDescuentos">Descuentos</h1>
            
            <div className="DiscountsGrid">
                <div className="product-grid">
                    {ultimoProductoDescuento.map((product) => (
                        <DiscountsCarouselCard key={product.ProductId} Product={product} />
                    ))}
                </div>

            </div>
            <div className="allDiscounts">
                <Link to={`/Productos/DetalleProducto`}>
                    <span className="seeCard">Mas Descuentos</span>
                </Link>
            </div>

        </div>

    );
}