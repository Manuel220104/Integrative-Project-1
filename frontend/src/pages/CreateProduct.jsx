import React, { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { CreateProducts, getAllProducts } from '../api/Product.api.js'
import { useNavigate, useParams } from 'react-router-dom'

export function CreateProduct() {
    const { register, handleSubmit, formState: { errors }, setValue, } = useForm();
    const navigate = useNavigate()
    const params = useParams()


    const [selectedCategory, setSelectedCategory] = useState('libro');

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);

    }

    return (
        <div>
            <h1>Crear producto</h1>
            <div class="selector">
                <label for="category">Selecciona una categoría:</label>
                <select id="category" onChange={handleCategoryChange} value={selectedCategory}>
                    <option value="libro">Libro</option>
                    <option value="instrumento">Instrumento Musical</option>
                    <option value="tecnologia">Tecnología</option>
                    <option value="juego">Juego de Mesa</option>
                </select>
            </div>

            {/* Para libro */}
            {selectedCategory == 'libro' && (
                <div class="form" id="BookForm" >
                    <form onSubmit={onSubmit}>

                        <label for="title" >Titulo:</label>
                        <input type="text" {...register("title", {required: true})}/>
                        {errors.title && <span>Titulo es requerido</span>}

                        <label for="isbn">ISBN:</label>
                        <input type="number" />

                        <label for="authors">Authors:</label>
                        <input type="text"/>

                        <label for="editorial">Editorial:</label>
                        <input type="text"/>

                        <label for="language">Language:</label>
                        <input type="text" />

                        <label for="yearPublication">Year Publication:</label>
                        <input type="number"  />

                        <label for="price">Price:</label>
                        <input type="number"  />

                        <label for="description">Description:</label>
                        <input type="text"  />

                        <label for="imageUrl">Image URL:</label>
                        <input type="url"  />

                        <label for="quantity">Quantity:</label>
                        <input type="number"  />

                        <label for="discount">Discount:</label>
                        <input type="number" />

                        <button>Save</button>

                    </form>

                </div>
            )}


            {/* Para Tecnologia */}
            {selectedCategory == 'tecnologia' && (
                <div class="form" id="technologyForm" >
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required />

                    <label for="characteristics">Characteristics:</label>
                    <input type="text" id="characteristics" name="characteristics" maxlength="300" required />

                    <label for="brand">Brand:</label>
                    <input type="text" id="brand" name="brand" maxlength="50" required />

                    <label for="model">Model:</label>
                    <input type="text" id="model" name="model" maxlength="50" required />

                    <label for="price">Price:</label>
                    <input type="number" id="price" name="price" max="999.999" step="0.001" required />

                    <label for="description">Description:</label>
                    <input type="text" id="description" name="description" maxlength="500" required />

                    <label for="imageUrl">Image URL:</label>
                    <input type="url" id="imageUrl" name="imageUrl" maxlength="500" required />

                    <label for="quantity">Quantity:</label>
                    <input type="number" id="quantity" name="quantity" min="1" value="1" required />

                    <label for="discount">Discount:</label>
                    <input type="number" id="discount" name="discount" min="0" max="100" value="0" required />

                    <button>Save</button>
                </div>
            )}

        </div>
    )
}