import React, { useState, useEffect } from 'react';

export function Crud() {
    const [selectedCategory, setSelectedCategory] = useState('libro');
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    }
    return (
        <div className="max-w-[95%] mx-auto">
            <div className="selector">
                <label className="Seleccionar" htmlFor="category">Tipo de producto</label>
                <select className="Seleccionar-Dato" id="category" onChange={handleCategoryChange} value={selectedCategory}>
                    <option value="libro">Libro</option>
                    <option value="instrumentoMusical">Instrumento Musical</option>
                    <option value="tecnologia">Tecnología</option>
                    <option value="juego">Juego de Mesa</option>
                </select>
            </div>
            <div>
                <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry the Bird</td>
                        <td>Thornton</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>

            </div>
        </div>
    )

}