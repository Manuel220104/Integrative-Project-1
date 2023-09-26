import React, { useState, useEffect } from 'react';
import {CreateBook} from './CreateBook.jsx'
import {CreateMusicalIns} from './CreateMusicalIns.jsx'
import {CreateGames} from './CreateGames.jsx'
import {CreateTechnology} from './CreateTechnology.jsx'


export function CreateProduct() {

    const [selectedCategory, setSelectedCategory] = useState('libro');
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    }

    return (
        <div className="CreateProductPage">
                <h1 className="Title">Crear producto</h1>

                <div className="selector">
                    <label className="Seleccionar" htmlFor="category">Tipo de producto</label>
                    <select className="Seleccionar-Dato" id="category" onChange={handleCategoryChange} value={selectedCategory}>
                        <option value="libro">Libro</option>
                        <option value="instrumentoMusical">Instrumento Musical</option>
                        <option value="tecnologia">Tecnología</option>
                        <option value="juego">Juego de Mesa</option>
                    </select>
                </div>


                {selectedCategory === 'libro' && <CreateBook />}
                {selectedCategory === 'instrumentoMusical' && <CreateMusicalIns />}
                {selectedCategory === 'juego' && <CreateGames />}
                {selectedCategory === 'tecnologia' && <CreateTechnology />}
        </div>
    )
}