import React, { useState, useEffect, useRef } from 'react';
import { getLastProductsDescount } from '../api/Product.api';
import { DiscountsCarouselCard } from './DiscountsCarouselCard';
import Slider from 'react-slick';
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
                breakpoint: 1530, // Cambia la configuración en pantallas más pequeñas
                settings: {
                    slidesToShow: 4, // Muestra 2 elementos en pantallas pequeñas
                },
            },
            {
                breakpoint: 1350, // Cambia la configuración en pantallas más pequeñas
                settings: {
                    slidesToShow: 3, // Muestra 3 elementos en pantallas medianas
                },
            },
            {
                breakpoint: 970, // Cambia la configuración en pantallas más pequeñas
                settings: {
                    slidesToShow: 2, // Muestra 2 elementos en pantallas pequeñas
                },
            },
            {
                breakpoint: 700, // Cambia la configuración en pantallas aún más pequeñas
                settings: {
                    slidesToShow: 1, // Muestra 1 elemento en pantallas muy pequeñas
                },
            },
        ],
    };

    return (
        <div className="CarouselNews" >
            <div className="title-container">
                <div className="line left-line"></div>
                <h1 className="title">Descuentos</h1>
                <div className="line right-line"></div>
            </div>
            <div className="carousel-container">
                <Slider {...settings} ref={sliderRef}>
                    {ultimoProductoDescuento.map((product) => (
                        <DiscountsCarouselCard key={product.ProductId} Product={product} />
                    ))}
                </Slider>

            </div>

        </div>
    );
}