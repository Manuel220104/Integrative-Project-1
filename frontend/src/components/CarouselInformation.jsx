import React, { useState, useEffect, useRef } from 'react';
import { getAllInformationCarousel } from '../api/InformationCarousel.api';
import { CarouselInformationCard } from './CarouselInformationCard';

import { Carousel, Button } from 'react-bootstrap'; // Asegúrate de importar React-Bootstrap


export function CarruselDeImagenes() {
    const [ultimoProducto, setUltimoProducto] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

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
    const handleSelect = (selectedIndex) => {
        setActiveIndex(selectedIndex);
    };



    return (
        <div className="carruselInformacion">
            <Carousel activeIndex={activeIndex} onSelect={handleSelect} controls={false}>

                {ultimoProducto.map((product) => (
                    <Carousel.Item  key={product.id}>
                        <CarouselInformationCard Product={product} />
                    </Carousel.Item>
                ))}

            </Carousel>
            <div className="d-flex justify-content-center">
                {ultimoProducto.map((_, index) => (
                    <Button
                        key={index}
                        variant={index === activeIndex ? 'primary' : 'outline-primary'}
                        onClick={() => setActiveIndex(index)}
                        className={`carousel-button  ${index === activeIndex ? 'active' : ''}`}
                    >
                        {index + 1}
                    </Button>
                ))}
            </div>
        </div>
    );
}

