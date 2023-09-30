
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { CreateProducts, getLastProduct } from '../../../../api/Product.api.js'
import { createTechnologys } from '../../../../api/Tech.api.js'
import { useNavigate, useParams } from 'react-router-dom'

export function CreateTechnology(){
    const {register, handleSubmit, formState: { errors }, setValue, } = useForm();
    const navigate = useNavigate()

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

    function GetDataOfTech(data) {
        const ProductData = {
            Brand: data.Brand,
            Model: data.Model,
        };
        return ProductData
    }

    const onSubmitTech = handleSubmit(async (data) => {
        console.log(data)
        const ProductData = GetDataOfProduct(data)
        const TechData = GetDataOfTech(data)

        console.log('product')
        console.log(ProductData)
        console.log('tech')
        console.log(TechData)

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
            TechData.Product = id;
            console.log(TechData)
            await createTechnologys(TechData);
        } catch (error) {
            console.error('Error al crear el libro:', error);
            console.log('Respuesta del servidor:', error.response);
        }
    });

    return(
        <div className="form Bookform" id="BookForm" >
        <form onSubmit={onSubmitTech}>
            <div className='Atributos'>
                            <div>
                                <label className="atributo" htmlFor="Name">Nombre:</label>
                                <input className="Ingresar-Dato" type="text" {...register("Name", { required: true })} />
                                {errors.Name && <span className="error">Nombre es requerido</span>}
                            </div>
                            <div>
                                <label className="atributo" htmlFor="Brand" >Marca:</label>
                                <input className="Ingresar-Dato" type="text" {...register("Brand", { required: true })} />
                                {errors.Brand && <span className="error">Marca es requerida</span>}
                            </div>
                            <div>
                                <label className="atributo" htmlFor="Model" >Modelo:</label>
                                <input className="Ingresar-Dato" type="text" {...register("Model", { required: true })} />
                                {errors.Model && <span className="error">Modelo es requerida</span>}
                            </div>
                            <div>
                                <label className="atributo" htmlFor="Price">Precio:</label>
                                <input className="Ingresar-Dato" type="number" step="000.001" {...register("Price", { required: true })} />
                                {errors.Price && <span className="error">Precio es requerido</span>}
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

                        <input type="hidden" name="ProductType" value="Tecnologia" {...register("ProductType")} />

                        <button className="Boton-Guardar mb-5">Crear Artículo Tecnológico</button>

        </form>

    </div>

    )
}