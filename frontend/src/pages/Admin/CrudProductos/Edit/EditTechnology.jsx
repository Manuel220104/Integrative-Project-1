
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { updateProduct } from '../../../../api/Product.api.js'
import { updateTechnologys } from '../../../../api/Tech.api.js'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

export function EditTechnology() {
    const location = useLocation();
    const product = location.state ? location.state.Product : null;
    console.log(product)
    const idtech = product.technology.TechnologyId
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
        // console.log('product')
        // console.log(ProductData)
        // console.log('tech')
        // console.log(TechData)

        try {
            await updateProduct(idproduct, ProductData);
        } catch (error) {
            console.error('Error al crear el producto:', error);
            console.log('Respuesta del servidor:', error.response);
        }

        console.log(TechData)

        try {
            TechData.Product = idproduct;
            console.log(TechData)
            await updateTechnologys(idtech, TechData);
        } catch (error) {
            console.error('Error al crear el tecnologia:', error);
            console.log('Respuesta del servidor:', error.response);
        }
    });

    return (
        <div className="CreateProductPage">
            <h1 className="Title mb-3">Editar producto</h1>
            <div className="form Bookform" id="BookForm" >
                <form onSubmit={onSubmitTech}>
                    <div className='Atributos'>
                        <div>
                            <label className="atributo" htmlFor="Name">Nombre:</label>
                            <input className="Ingresar-Dato" type="text" defaultValue={product.Name} {...register("Name", { required: true })} />
                            {errors.Name && <span className="error">Nombre es requerido</span>}
                        </div>
                        <div>
                            <label className="atributo" htmlFor="Brand" >Marca:</label>
                            <input className="Ingresar-Dato" type="text" defaultValue={product.technology.Brand} {...register("Brand", { required: true })} />
                            {errors.Brand && <span className="error">Marca es requerida</span>}
                        </div>
                        <div>
                            <label className="atributo" htmlFor="Model" >Modelo:</label>
                            <input className="Ingresar-Dato" type="text" defaultValue={product.technology.Model} {...register("Model", { required: true })} />
                            {errors.Model && <span className="error">Modelo es requerida</span>}
                        </div>
                        <div>
                            <label className="atributo" htmlFor="Price">Precio:</label>
                            <input className="Ingresar-Dato" type="number" step="000.001" defaultValue={product.Price}  {...register("Price", { required: true })} />
                            {errors.Price && <span className="error">Precio es requerido</span>}
                        </div>
                        <div>
                            <label className="atributo" htmlFor="Description">Descripcion:</label>
                            <textarea className="Ingresar-Descripcion" type="text"  defaultValue={product.Description} {...register("Description", { required: true })} />
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
                            <input className="Ingresar-Dato" type="number" defaultValue={product.Discount} {...register("Discount", { required: true })} />
                            {errors.Discount && <span className="error" >Descuento es requerido</span>}
                        </div>

                    </div>

                    <input type="hidden" name="ProductType" value="Tecnologia" {...register("ProductType")} />

                    <button className="Boton-Guardar mb-5">Actualizar Artículo Tecnológico</button>

                </form>

            </div>
        </div>

    )
}