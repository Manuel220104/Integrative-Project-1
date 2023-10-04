import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { updateProduct } from '../../../../api/Product.api.js'
import { updateBook } from '../../../../api/Books.api.js'
import { useNavigate, useLocation } from 'react-router-dom'

export function EditBook() {

    const location = useLocation();
    const product = location.state ? location.state.Product : null;
    console.log(product)
    const idbook = product.book.ISBN
    const idproduct = product.ProductId 

    const { register, handleSubmit, formState: { errors }, setValue, } = useForm();

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

    const onSubmit = handleSubmit(async (data) => {
        console.log(data)
        const ProductData = GetDataOfProduct(data)
        const BookData = GetDataOfBook(data)
        console.log(ProductData)
        console.log(BookData)

        try {
            await updateProduct(idproduct, ProductData);
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            console.log('Respuesta del servidor:', error.response);
        }

        try {
            BookData.Product = idproduct;
            await updateBook(idbook, BookData);
        } catch (error) {
            console.error('Error al actualizar el libro:', error);
            console.log('Respuesta del servidor:', error.response);
        }
    });


    return (
        <div className="CreateProductPage">
            
                <h1 className="Title mb-3">Editar producto</h1>

                <div className="form" id="BookForm" >
                    <form onSubmit={onSubmit}>
                        <div className='Atributos'>

                            <div>
                                <label className="atributo" htmlFor="Name" >Titulo:</label>
                                <input className="Ingresar-Dato" type="text" defaultValue={product.Name} {...register("Name", { required: true })} />
                                {errors.Name && <span className="error">Titulo es requerido</span>}
                            </div>

                            <div>
                                <label className="atributo" htmlFor="ISBN" >ISBN:</label>
                                <input className="Ingresar-Dato" type="number" defaultValue={product.book.ISBN} {...register("ISBN", { required: true })} />
                                {errors.ISBN && <span className="error">ISBN es requerido</span>}
                            </div>

                            <div>
                                <label className="atributo" htmlFor="Authors" >Autores:</label>
                                <input className="Ingresar-Dato" type="text" defaultValue={product.book.Authors}{...register("Authors", { required: true })} />
                                {errors.Authors && <span className="error">Autores es requerido</span>}
                            </div>


                            <div>
                                <label className="atributo" htmlFor="Editorial" >Editorial:</label>
                                <input className="Ingresar-Dato" type="text" defaultValue={product.book.Editorial} {...register("Editorial", { required: true })} />
                                {errors.Editorial && <span className="error">Editorial es requerido</span>}
                            </div>

                            <div>
                                <label className="atributo" htmlFor="Language" >Lenguaje:</label>
                                <input className="Ingresar-Dato" type="text" defaultValue={product.book.Language}{...register("Language", { required: true })} />
                                {errors.Language && <span className="error">Lenguaje es requerido</span>}
                            </div>

                            <div>
                                <label className="atributo" htmlFor="YearPublication">Año de publicacion:</label>
                                <input className="Ingresar-Dato" type="number" defaultValue={product.book.YearPublication}{...register("YearPublication", { required: true })} />
                                {errors.YearPublication && <span className="error">Año de publicacion</span>}
                            </div>

                            <div>
                                <label className="atributo" htmlFor="Price">Precio:</label>
                                <input className="Ingresar-Dato" type="number" step="000.001" defaultValue={product.Price}{...register("Price", { required: true })} />
                                {errors.Price && <span className="error" >Precio es requerido</span>}
                            </div>

                            <div>
                                <label className="atributo" htmlFor="Description">Descripcion:</label>
                                <textarea className="Ingresar-Descripcion" type="text" defaultValue={product.Description}  {...register("Description", { required: true })} />
                                {errors.Description && <span className="error" >Descripcion es requerido</span>}
                            </div>

                            <div>
                                <label className="atributo" htmlFor="ImageUrl">Imagen URL:</label>
                                <input className="Ingresar-Dato" type="text" defaultValue={product.ImageUrl} {...register("ImageUrl", { required: true })} />
                                {errors.ImageUrl && <span className="error" >Imagen Url es requerido</span>}
                            </div>

                            <div>
                                <label className="atributo" htmlFor="Quantity">Cantidad:</label>
                                <input className="Ingresar-Dato" type="number" defaultValue={product.Quantity} {...register("Quantity", { required: true })} />
                                {errors.Quantity && <span className="error">Cantidad es requerido</span>}
                            </div>

                            <div>
                                <label className="atributo" htmlFor="Discount">Descuento:</label>
                                <input className="Ingresar-Dato" type="number" defaultValue={product.Discount}{...register("Discount", { required: true })} />
                                {errors.Discount && <span className="error" >Descuento es requerido</span>}
                            </div>

                        </div>

                        <input type="hidden" name="ProductType" value="Libro" {...register("ProductType")} />

                        <button className="Boton-Guardar mb-5">Actualizar Libro</button>

                    </form>
                </div>

            
        </div>
    )
}