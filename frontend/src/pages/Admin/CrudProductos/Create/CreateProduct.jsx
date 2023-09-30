import React, { useState, useEffect } from 'react';
import {CreateBook} from './CreateBook.jsx'
import {CreateMusicalIns} from './CreateMusicalIns.jsx'
import {CreateGames} from './CreateGames.jsx'
import {CreateTechnology} from './CreateTechnology.jsx'


export function CreateProduct() {

    const [selectedCategory, setSelectedCategory] = useState('Libro');
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    }

    return (
        <div className="CreateProductPage">
                <h1 className="Title">Crear producto : {selectedCategory}</h1>

                <div className="selector">
                    <label className="Seleccionar" htmlFor="category">Tipo de producto</label>
                    <select className="Seleccionar-Dato" id="category" onChange={handleCategoryChange} value={selectedCategory}>
                        <option value="Libro">Libro</option>
                        <option value="Instrumento Musical">Instrumento Musical</option>
                        <option value="Tecnología">Tecnología</option>
                        <option value="Juego de Mesa">Juego de Mesa</option>
                    </select>
                </div>


                {selectedCategory === 'Libro' && <CreateBook />}
                {selectedCategory === 'Instrumento Musical' && <CreateMusicalIns />}
                {selectedCategory === 'Juego de Mesa' && <CreateGames />}
                {selectedCategory === 'Tecnología' && <CreateTechnology />}
        </div>
    )
}