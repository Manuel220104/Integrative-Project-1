import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { updateProduct} from '../../../../api/Product.api.js'
import { updateGames } from '../../../../api/Games.api.js'
import { useNavigate, useParams, useLocation } from 'react-router-dom'


export function EditGames() {
    const location = useLocation();
    const product = location.state ? location.state.Product : null;
    console.log(product)
    const idgame = product.table_game.Table_GameId
    const idproduct = product.ProductId    

    const { register, handleSubmit, formState: { errors }, setValue, } = useForm();
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

    function GetDataOfGame(data) {
        const ProductData = {
            Maker: data.Maker,
            Players_Number: data.Players_Number
        };
        return ProductData
    }

    const onSubmitGame = handleSubmit(async (data) => {
        console.log(data)
        const ProductData = GetDataOfProduct(data)
        const GameData = GetDataOfGame(data)


        try {
            await updateProduct(idproduct, ProductData);
        } catch (error) {
            console.error('Error al crear el producto:', error);
            console.log('Respuesta del servidor:', error.response);
        }

        try {
            GameData.Product = idproduct;
            await updateGames(idgame, GameData);
        } catch (error) {
            console.error('Error al crear el tecnologia:', error);
            console.log('Respuesta del servidor:', error.response);
        }
    });

    return (
        <div className="CreateProductPage">
            <h1 className="Title mb-3">Editar producto</h1>
            <div className="form Bookform" id="BookForm" >
                <form onSubmit={onSubmitGame}>
                    <div className='Atributos'>
                        <div>
                            <label className="atributo" htmlFor="Name">Nombre:</label>
                            <input className="Ingresar-Dato" type="text" defaultValue={product.Name} {...register("Name", { required: true })} />
                            {errors.Name && <span className="error">Nombre es requerido</span>}
                        </div>
                        <div>
                            <label className="atributo" htmlFor="Maker" >Fabricante:</label>
                            <input className="Ingresar-Dato" type="text" defaultValue={product.table_game.Maker}{...register("Maker", { required: true })} />
                            {errors.Maker && <span className="error">Fabricante es requerida</span>}
                        </div>
                        <div>
                            <label className="atributo" htmlFor="Players_Number">Numero De Jugadores:</label>
                            <input className="Ingresar-Dato" type="number" step="1" defaultValue={product.table_game.Players_Number} {...register("Players_Number", { required: true })} />
                            {errors.Players_Number && <span className="error">Precio es requerido</span>}
                        </div>
                        <div>
                            <label className="atributo" htmlFor="Price">Precio:</label>
                            <input className="Ingresar-Dato" type="number" step="000.001" defaultValue={product.Price} {...register("Price", { required: true })} />
                            {errors.Price && <span className="error">Precio es requerido</span>}
                        </div>
                        <div>
                            <label className="atributo" htmlFor="Description">Descripcion:</label>
                            <textarea className="Ingresar-Descripcion" type="text" defaultValue={product.Description} {...register("Description", { required: true })} />
                            {errors.Description && <span className="error" >Descripcion es requerido</span>}
                        </div>
                        <div>
                            <label className="atributo" htmlFor="ImageUrl">Imagen URL:</label>
                            <input className="Ingresar-Dato" type="text" defaultValue={product.ImageUrl}{...register("ImageUrl", { required: true })} />
                            {errors.ImageUrl && <span className="error" >Imagen Url es requerido</span>}
                        </div>
                        <div>
                            <label className="atributo" htmlFor="Quantity">Cantidad:</label>
                            <input className="Ingresar-Dato" type="number" defaultValue={product.Quantity} {...register("Quantity", { required: true })} />
                            {errors.Quantity && <span className="error">Cantidad es requerido</span>}
                        </div>
                        <div>
                            <label className="atributo" htmlFor="Discount">Descuento:</label>
                            <input className="Ingresar-Dato" type="number" defaultValue={product.Discount}  {...register("Discount", { required: true })} />
                            {errors.Discount && <span className="error" >Descuento es requerido</span>}
                        </div>
                    </div>

                    <input type="hidden" name="ProductType" value="Juego de mesa" {...register("ProductType")} />

                    <button className="Boton-Guardar mb-5">Actualizar Juego De Mesa</button>
                </form>

            </div>
        </div>

    )
}