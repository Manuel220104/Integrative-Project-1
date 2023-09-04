import React, { useState, useEffect } from 'react';
import { getLastProductDate } from '../api/Product.api';
import {NewsCarouselCard} from './NewsCarouselCard'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



export function LastProductDate() {
const [ultimoProducto, setUltimoProducto] = useState([]);
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Cambia el número de elementos a mostrar en cada slide
    slidesToScroll: 1,
    autoplay: true, // Activa la reproducción automática
    autoplaySpeed: 3000, // Velocidad de reproducción automática en milisegundos
};

    useEffect(() => {
        async function loadUltimoProducto() {
            const res = await getLastProductDate();
            setUltimoProducto(res.data);
            console.log(res.data);
    }
    loadUltimoProducto();
}, []);

return (

            <div>
            {ultimoProducto.map(product => (
                    <NewsCarouselCard key={product.ProductId} Product={product} />
                    ))}
            </div>
)
}