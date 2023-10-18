import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form'
import { updateProduct, deleteProduct } from '../../../../api/Product.api.js'
import { updateGames } from '../../../../api/Games.api.js'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { getAllCategories } from '../../../../api/Categories.api.js'
import { getAllSubcategory } from '../../../../api/Subcategories.api.js'


export function EditGames() {
    const navigate = useNavigate();

    const location = useLocation();
    const product = location.state ? location.state.Product : null;
    console.log(product)
    const idgame = product.table_game.Table_GameId
    const idproduct = product.ProductId

    const { register, handleSubmit, formState: { errors }, setValue, } = useForm();

    const [Categories, setCategories] = useState([]);

    const loadCategories = useCallback(async () => {
        const res = await getAllCategories();
        setCategories(res.data);
        console.log(res.data)
    }, []);

    const [Subcategories, setSubcategories] = useState([]);

    const loadSubcategories = useCallback(async () => {
        const res = await getAllSubcategory();
        setSubcategories(res.data);
        console.log(res.data)
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            await loadCategories();
            await loadSubcategories();
        };

        fetchData();
    }, [location]);


    function GetDataOfProduct(data) {
        const formData = new FormData();
        formData.append("Name", data.Name);
        formData.append("Price", data.Price);
        formData.append("Description", data.Description);

        if (data.ImageUrl != "") {
            formData.append("ImageUrl", data.ImageUrl);
        }

        formData.append("Quantity", data.Quantity);
        formData.append("Discount", data.Discount);
        formData.append("ProductType", data.ProductType);

        formData.append("Category", data.Category);

        if (data.Subcategory != 'General') {
            formData.append("Subcategory", data.Subcategory);
        }

        if (data.image.length > 0) {
            formData.append("Image", data.image[0]);
        }

        return formData;
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

    const [selectedCategoryid, setSelectedCategory] = useState('');
    const handleCategoryChange = (e) => {
        const selectedCategoryInt = e.target.value;
        setSelectedCategory(selectedCategoryInt);
    }

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
                            <label className="atributo" htmlFor="ImageUrl">
                                Imagen URL:
                            </label>
                            <input
                                className="Ingresar-Dato"
                                type="url"
                                defaultValue={product.ImageUrl}
                                {...register("ImageUrl", {
                                    pattern: {
                                        value: /^(ftp|http|https):\/\/[^ "]+$/,
                                        message: "Ingrese una URL válida",
                                    },
                                })}
                            />
                        </div>

                        <div>
                            <label className="atributo" htmlFor="image">Imagen:</label>
                            <input type="file" name="image" id="image" accept="image/*" defaultValue={product.image}{...register("image")} />
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

                        <div className="selector">
                            <label className="atributo" htmlFor="category">Tipo de Categoría</label>
                            <select
                                defaultValue={product.Category}
                                className="Seleccionar-Dato"
                                id="category"
                                {...register("Category")}
                                onChange={handleCategoryChange}
                            >
                                {Categories.map((Category, index) => {
                                    return (
                                        <option key={index} value={Category.Name}>
                                            {Category.Name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <div className="selector">
                            <label className="atributo" htmlFor="subcategory">Tipo de subcategoría si desea</label>
                            <select className="Seleccionar-Dato" id="subcategory" defaultValue={product.Subcategory} {...register("Subcategory")}>
                                <option value="General">Seleccione una subcategoría</option>
                                {
                                    Subcategories.map((Subcategory, index) => {
                                        if (Subcategory.Category === selectedCategoryid) {
                                            return (
                                                <option key={index} value={Subcategory.Name}>
                                                    {Subcategory.Name}
                                                </option>
                                            );
                                        }
                                        return
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <input type="hidden" name="ProductType" value="Juego de mesa" {...register("ProductType")} />

                    <button className="Boton-Guardar mb-5">Actualizar Juego De Mesa</button>
                </form>
                <button className="Boton-Eliminar mb-5" onClick={async () => {
                    try {
                        await deleteProduct(product.ProductId);
                        navigate('/Admin/Gestionar-Productos');
                    } catch (error) {
                        console.error('Error deleting product:', error);
                    }
                }}>Eliminar Juego De Mesa</button>

            </div>
        </div>

    )
}