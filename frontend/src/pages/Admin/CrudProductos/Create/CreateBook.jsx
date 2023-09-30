
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { CreateProducts, getLastProduct } from '../../../../api/Product.api.js'
import { createBooks } from '../../../../api/Books.api.js'
import { useNavigate, useParams } from 'react-router-dom'

export function CreateBook(){
    const {register, handleSubmit, formState: { errors }, setValue, } = useForm();

    function GetDataOfProduct(data) {
        const ProductData = {
            Name: data.Name,
            Price: data.Price,
            Description: data.Description,
            ImageUrl: data.ImageUrl,
            Quantity: data.Quantity,
            Discount: data.Discount,
            ProductType: data.ProductType
        };
        return ProductData
    }

    function GetDataOfBook(data) {
        const ProductData = {
            ISBN: data.ISBN,
            Authors: data.Authors,
            Editorial: data.Editorial,
            Language: data.Language,
            YearPublication: data.YearPublication
        };
        return ProductData
    }

    const onSubmitBook = handleSubmit(async (data) => {
        console.log(data)
        const ProductData = GetDataOfProduct(data)
        const BookData = GetDataOfBook(data)
        console.log('product')
        console.log(ProductData)
        console.log('book')
        console.log(BookData)

        try {
            await CreateProducts(ProductData);
            // navigate('/Productos');
        } catch (error) {
            console.error('Error al crear el producto:', error);
            console.log('Respuesta del servidor:', error.response);
        }

        async function loadlastProducts() {
            const res = await getLastProduct();
            const id = res.data.ProductId;
            return id
        }

        try {
            const id = await loadlastProducts();
            console.log(id)
            BookData.Product = id;
            console.log(BookData)
            await createBooks(BookData);
        } catch (error) {
            console.error('Error al crear el libro:', error);
            console.log('Respuesta del servidor:', error.response);
        }
    });


    return(
        <div className="form Bookform" id="BookForm" >
        <form onSubmit={onSubmitBook}>
            <div className='Atributos'>
                <div>
                    <label className="atributo" htmlFor="Name" >Titulo:</label>
                    <input className="Ingresar-Dato" type="text" {...register("Name", { required: true })} />
                    {errors.Name && <span className="error">Titulo es requerido</span>}
                </div>
                <div>
                    <label className="atributo" htmlFor="ISBN" >ISBN:</label>
                    <input className="Ingresar-Dato" type="number" {...register("ISBN", { required: true })} />
                    {errors.ISBN && <span className="error">ISBN es requerido</span>}
                </div>
                <div>
                    <label className="atributo" htmlFor="Authors" >Autores:</label>
                    <input className="Ingresar-Dato" type="text" {...register("Authors", { required: true })} />
                    {errors.Authors && <span className="error">Autores es requerido</span>}
                </div>
                <div>
                    <label className="atributo" htmlFor="Editorial" >Editorial:</label>
                    <input className="Ingresar-Dato" type="text" {...register("Editorial", { required: true })} />
                    {errors.Editorial && <span className="error">Editorial es requerido</span>}
                </div>
                <div>
                    <label className="atributo" htmlFor="Language" >Lenguaje:</label>
                    <input className="Ingresar-Dato" type="text" {...register("Language", { required: true })} />
                    {errors.Language && <span className="error">Lenguaje es requerido</span>}
                </div>
                <div>
                    <label className="atributo" htmlFor="YearPublication">Año de publicacion:</label>
                    <input className="Ingresar-Dato" type="number" {...register("YearPublication", { required: true })} />
                    {errors.YearPublication && <span className="error">Año de publicacion</span>}
                </div>
                <div>
                    <label className="atributo" htmlFor="Price">Precio:</label>
                    <input className="Ingresar-Dato" type="number" step="000.001" {...register("Price", { required: true })} />
                    {errors.Price && <span className="error" >Precio es requerido</span>}
                </div>
                <div>
                    <label className="atributo" htmlFor="Description">Descripcion:</label>
                    <textarea className="Ingresar-Descripcion" type="text"  {...register("Description", { required: true })} />
                    {errors.Description && <span className="error" >Descripcion es requerido</span>}
                </div>
                <div>
                    <label className="atributo" htmlFor="ImageUrl">Imagen URL:</label>
                    <input className="Ingresar-Dato" type="text"  {...register("ImageUrl", { required: true })} />
                    {errors.ImageUrl && <span className="error" >Imagen Url es requerido</span>}
                </div>
                <div>
                    <label className="atributo" htmlFor="Quantity">Cantidad:</label>
                    <input className="Ingresar-Dato" type="number" {...register("Quantity", { required: true })} />
                    {errors.Quantity && <span className="error">Cantidad es requerido</span>}
                </div>
                <div>
                    <label className="atributo" htmlFor="Discount">Descuento:</label>
                    <input className="Ingresar-Dato" type="number" {...register("Discount", { required: true })} />
                    {errors.Discount && <span className="error" >Descuento es requerido</span>}
                </div>
            </div>

            <input type="hidden" name="ProductType" value="Libro" {...register("ProductType")} />

            <button className="Boton-Guardar mb-5">Crear Libro</button>

        </form>

    </div>

    )
}