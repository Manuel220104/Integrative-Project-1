import React, { useState, useEffect, useRef } from 'react';
import { getLastProductDate } from '../api/Product.api';
import { NewsCarouselCard } from './NewsCarouselCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export function LastProductDate() {
    const [ultimoProducto, setUltimoProducto] = useState([]);
const sliderRef = useRef(null);

useEffect(() => {
    async function loadUltimoProducto() {
    const res = await getLastProductDate();
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
        <h1 className="titulocarrusel">Novedades</h1>
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