import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { CreateProducts, getAllProducts } from '../api/Product.api.js'
import { useNavigate, useParams } from 'react-router-dom'

export function CreateProduct() {
    const { register, handleSubmit, formState: { errors }, setValue, } = useForm();
    const navigate = useNavigate()

    const onSubmit = handleSubmit(async (data) => {
        try {
            await CreateProducts(data);
            navigate('/Productos');
        } catch (error) {
            console.error('Error al crear el producto:', error);
            console.log('Respuesta del servidor:', error.response);
        }
    });
    const [selectedCategory, setSelectedCategory] = useState('libro');

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    }

    return (
        <div>
            <h1>Crear producto</h1>
            <div className="selector">
                <label htmlFor="category">Selecciona una categoría:</label>
                <select id="category" onChange={handleCategoryChange} value={selectedCategory}>
                    <option value="libro">Libro</option>
                    <option value="instrumento">Instrumento Musical</option>
                    <option value="tecnologia">Tecnología</option>
                    <option value="juego">Juego de Mesa</option>
                </select>
            </div>

            {/* Para libro */}
            {selectedCategory == 'libro' && (
                <div className="form" id="BookForm" >
                    <form onSubmit={onSubmit}>

                        {/* <label htmlFor="title" >Titulo:</label>
                        <input type="text" {...register("title", {required: true})}/>
                        {errors.title && <span>Titulo es requerido</span>}

                        <label htmlFor="isbn">ISBN:</label>
                        <input type="number" />

                        <label htmlFor="authors">Authors:</label>
                        <input type="text"/>

                        <label htmlFor="editorial">Editorial:</label>
                        <input type="text"/>

                        <label htmlFor="language">Language:</label>
                        <input type="text" />

                        <label htmlFor="yearPublication">Year Publication:</label>
                        <input type="number"  /> */}


                        <label htmlFor="Price">Price:</label>
                        <input type="number" {...register("Price", { required: true })} />
                        {errors.Price && <span>Price es requerido</span>}

                        <label htmlFor="Description">Descricion:</label>
                        <input type="text"  {...register("Description", { required: true })} />
                        {errors.Description && <span>Description es requerido</span>}

                        <label htmlFor="ImageUrl">Imagen URL:</label>
                        <input type="text"  {...register("ImageUrl", { required: true })} />
                        {errors.ImageUrl && <span>ImageUrl es requerido</span>}

                        <label htmlFor="Quantity">Quantity:</label>
                        <input type="number" {...register("Quantity", { required: true })} />
                        {errors.Quantity && <span>ImageUrl es requerido</span>}

                        <label htmlFor="Discount">Discount:</label>
                        <input type="number" {...register("Discount", { required: true })} />
                        {errors.Discount && <span>Discount es requerido</span>}

                        <label htmlFor="ProductType">Tipo de producto:</label>
                        <select {...register("ProductType", { required: true })}>
                            <option value="Book">Libro</option>
                            <option value="MusicalInstrument">Instrumento Musical</option>
                            <option value="TableGames">Juego de Mesa</option>
                            <option value="Technology">Tecnología</option>
                        </select>
                        {errors.ProductType && <span>Tipo de producto es requerido</span>}


                        <button>Save</button>

                    </form>

                </div>
            )}


            {/* Para Tecnologia */}
            {selectedCategory == 'tecnologia' && (
                <div className="form" id="technologyForm" >
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required />

                    <label htmlFor="characteristics">Characteristics:</label>
                    <input type="text" id="characteristics" name="characteristics" maxlength="300" required />

                    <label htmlFor="brand">Brand:</label>
                    <input type="text" id="brand" name="brand" maxlength="50" required />

                    <label htmlFor="model">Model:</label>
                    <input type="text" id="model" name="model" maxlength="50" required />

                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" max="999.999" step="0.001" required />

                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" name="description" maxlength="500" required />

                    <label htmlFor="imageUrl">Image URL:</label>
                    <input type="url" id="imageUrl" name="imageUrl" maxlength="500" required />

                    <label htmlFor="quantity">Quantity:</label>
                    <input type="number" id="quantity" name="quantity" min="1" value="1" required />

                    <label htmlFor="discount">Discount:</label>
                    <input type="number" id="discount" name="discount" min="0" max="100" value="0" required />

                    <button>Save</button>
                </div>
            )}

        </div>
    )
}