import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getAllInformationCarousel } from '../api/InformationCarousel.api'; // Asegúrate de importar la función adecuada
import {CarouselInformationCard} from './CarouselInformationCard'; // Asegúrate de importar tu componente NewsCarouselCard

export function CarruselDeImagenes() {
const [ultimoProducto, setUltimoProducto] = useState([]);
const sliderRef = useRef(null);

useEffect(() => {
async function loadUltimoProducto() {
    try {
    const res = await getAllInformationCarousel();
    setUltimoProducto(res.data);
    } catch (error) {
    console.error('Error al cargar el último producto', error);
    }
}
loadUltimoProducto();
}, []);

const settings = {
dots: true,
infinite: true,
speed: 500,
slidesToShow: 1,
slidesToScroll: 1,
};

return (
<div>
    <h1 className="titulocarrusel">Novedades</h1>
    <div className="carousel-container">
    <Slider {...settings} ref={sliderRef}>
        {ultimoProducto.map((product) => (
        <CarouselInformationCard key={product.ProductId} Product={product} />
        ))}
    </Slider>
    </div>
</div>
);
}

