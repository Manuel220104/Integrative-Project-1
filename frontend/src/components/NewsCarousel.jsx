import React, { useState, useEffect, useRef } from 'react';
import { getLast10Product } from '../api/Product.api';
import { NewsCarouselCard } from './NewsCarouselCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export function LastProductDate() {
    const [ultimoProducto, setUltimoProducto] = useState([]);
    const sliderRef = useRef(null);

    useEffect(() => {
        async function loadUltimoProducto() {
            const res = await getLast10Product();
            setUltimoProducto(res.data);
        }
        loadUltimoProducto();
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
                <h1 className="title">Novedades</h1>
                <div className="line right-line"></div>
            </div>
            <div className="carousel-container">
                <Slider {...settings} ref={sliderRef}>
                    {ultimoProducto.map((product) => (
                        <NewsCarouselCard key={product.ProductId} Product={product} />
                    ))}
                </Slider>

            </div>
        </div>

    );
}