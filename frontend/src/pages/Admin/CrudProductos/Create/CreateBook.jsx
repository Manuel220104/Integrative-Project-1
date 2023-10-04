
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { CreateProducts, getLastProduct } from '../../../../api/Product.api.js'
import { createBooks } from '../../../../api/Books.api.js'
import { useNavigate, useParams } from 'react-router-dom'

export function CreateBook() {
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


    return (
        <div className="form Bookform" id="BookForm" >
            <form onSubmit={onSubmitBook}>
                <div className='Atributos'>
                    <div>
                        <label className="atributo" htmlFor="Name" >Titulo:</label>
                        <input className="Ingresar-Dato" type="text" {...register("Name", {
                            required: {
                                value: true,
                                message: "Titulo es requerido",
                            },
                            maxLength: {
                                value: 200,
                                message: "El nombre no debe tener más de 200 caracteres"
                            }
                        })} />
                        {errors.Name && <span className="error">{errors.Name.message}</span>}
                    </div>

                    <div>
                        <label className="atributo" htmlFor="ISBN" >ISBN:</label>
                        <input className="Ingresar-Dato" type="number" {...register("ISBN", {
                            required: {
                                value: true,
                                message: "ISBN es requerido",
                            }
                        })} />
                        {errors.ISBN && <span className="error">{errors.ISBN.message}</span>}
                    </div>

                    <div>
                        <label className="atributo" htmlFor="Authors" >Autores:</label>
                        <input className="Ingresar-Dato" type="text" {...register("Authors", {
                            required: {
                                value: true,
                                message: "Autores es requerido",
                            },
                            maxLength: {
                                value: 200,
                                message: "Los Autores no debe tener más de 200 caracteres"
                            }
                        })} />
                        {errors.Authors && <span className="error">{errors.Authors.message}</span>}
                    </div>

                    <div>
                        <label className="atributo" htmlFor="Editorial" >Editorial:</label>
                        <input className="Ingresar-Dato" type="text" {...register("Editorial", {
                            required: {
                                value: true,
                                message: "Editorial es requerido",
                            },
                            maxLength: {
                                value: 200,
                                message: "La Editorial no debe tener más de 200 caracteres"
                            }
                        })} />
                        {errors.Editorial && <span className="error">{errors.Editorial.message}</span>}
                    </div>

                    <div>
                        <label className="atributo" htmlFor="Language" >Lenguaje:</label>
                        <input className="Ingresar-Dato" type="text" {...register("Language", {
                            required: {
                                value: true,
                                message: "Lenguaje es requerido",
                            },
                            maxLength: {
                                value: 50,
                                message: "La Lenguaje no debe tener más de 50 caracteres"
                            }
                        })} />
                        {errors.Language && <span className="error">{errors.Language.message}</span>}
                    </div>

                    <div>
                        <label className="atributo" htmlFor="YearPublication">Año de publicación:</label>
                        <input
                            className="Ingresar-Dato"
                            type="number"
                            {...register("YearPublication", {
                                required: "El año de publicación es requerido",
                                min: {
                                    value: 1000,
                                    message: "El año de publicación debe ser mayor o igual a 1000",
                                },
                                max: {
                                    value: new Date().getFullYear(),
                                    message: `El año de publicación debe ser menor o igual a ${new Date().getFullYear()}`,
                                },
                                pattern: {
                                    value: /^[0-9]{4}$/,
                                    message: "Ingrese un año válido (formato: YYYY)",
                                },
                            })}
                        />
                        {errors.YearPublication && (
                            <span className="error">{errors.YearPublication.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="atributo" htmlFor="Price">
                            Precio:
                        </label>
                        <input
                            className="Ingresar-Dato"
                            type="int" 
                            {...register("Price", {
                                required: "El precio es requerido",
                                validate: {
                                    validPrice: (value) => {
                                        // Validar que el precio tenga un máximo de 7 dígitos en la parte entera
                                        const priceRegex = /^[0-9]{1,7}$/;
                                        return priceRegex.test(value);
                                    },
                                },
                            })}

                        />
                        {errors.Price && (
                            <span className="error">{errors.Price.message}</span>
                        )}
                    </div>



                    <div>
                        <label className="atributo" htmlFor="Description"> Descripción: </label>
                        <textarea className="Ingresar-Descripcion"
                            {...register("Description", {
                                required: "La descripción es requerida",
                                maxLength: {
                                    value: 500,
                                    message: "La descripción no debe superar los 500 caracteres",
                                },
                            })}
                        />
                        {errors.Description && (
                            <span className="error">{errors.Description.message}</span>
                        )}
                    </div>


                    <div>
                        <label className="atributo" htmlFor="ImageUrl">
                            Imagen URL:
                        </label>
                        <input
                            className="Ingresar-Dato"
                            type="url"
                            {...register("ImageUrl", {
                                required: "La URL de la imagen es requerida",
                                pattern: {
                                    value: /^(ftp|http|https):\/\/[^ "]+$/,
                                    message: "Ingrese una URL válida",
                                },
                            })}
                        />
                        {errors.ImageUrl && (
                            <span className="error">{errors.ImageUrl.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="atributo" htmlFor="Quantity">Cantidad:</label>
                        <input className="Ingresar-Dato" type="number" {...register("Quantity", { required: true })} />
                        {errors.Quantity && <span className="error">Cantidad es requerido</span>}
                    </div>

                    <div>
                        <label className="atributo" htmlFor="Discount">Descuento:</label>
                        <input className="Ingresar-Dato" type="number" min="0" max="100" {...register("Discount", { required: true })} />
                        {errors.Discount && <span className="error" >Descuento es requerido</span>}
                    </div>

                </div>

                <input type="hidden" name="ProductType" value="Libro" {...register("ProductType")} />

                <button className="Boton-Guardar mb-5">Crear Libro</button>

            </form>

        </div>

    )
}