
import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form'
import { CreateProducts, getLastProduct } from '../../../../api/Product.api.js'
import { createMusic } from '../../../../api/Music.api.js'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllCategories } from '../../../../api/Categories.api.js'
import { useLocation } from 'react-router-dom';
import { getAllSubcategory } from '../../../../api/Subcategories.api.js'

export function CreateMusicalIns() {
    const { register, handleSubmit, formState: { errors }, reset, setValue, } = useForm();

    const location = useLocation();

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

    function GetDataOfMusic(data) {
        const ProductData = {
            Brand: data.Brand,
            Model: data.Model,
        };
        return ProductData
    }

    const [isCreated, setIsCreated] = useState(false);
    const [message, setMessage] = useState('');

    const onSubmitMusic = handleSubmit(async (data) => {
        console.log(data)
        if (data.image.length > 0 || data.ImageUrl != "") {
            const ProductData = GetDataOfProduct(data)
            const MusicData = GetDataOfMusic(data)
            console.log(ProductData)
            console.log(MusicData)

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
                MusicData.Product = id;
                console.log(MusicData)
                await createMusic(MusicData);
                setIsCreated(true);
                setMessage('Producto creado con éxito.')
                
                Object.keys(data).forEach((key) => {
                    setValue(key, ''); // Reset each field to an empty string
                });
            } catch (error) {
                console.error('Error al crear el music:', error);
                console.log('Respuesta del servidor:', error.response);
            }
        }
        else {
            alert('Se requiere una imagen para crear producto')
        }
    });

    const [selectedCategoryid, setSelectedCategory] = useState('');
    const handleCategoryChange = (e) => {
        const selectedCategoryInt = e.target.value;
        setSelectedCategory(selectedCategoryInt);
    }


    return (
        <div className="form Bookform" id="BookForm" >
            <form onSubmit={onSubmitMusic}>
                <div className='Atributos'>
                    <div>
                        <label className="atributo" htmlFor="Name">Nombre:</label>
                        <input className="Ingresar-Dato" type="text" {...register("Name", {
                            required: {
                                value: true,
                                message: "Nombre es requerido",
                            },
                            maxLength: {
                                value: 1000,
                                message: "El nombre no debe tener más de 1000 caracteres"
                            }
                        })} />
                        {errors.Name && <span className="error">Nombre es requerido</span>}
                    </div>

                    <div>
                        <label className="atributo" htmlFor="Brand">Marca:</label>
                        <input
                            className="Ingresar-Dato"
                            type="text"
                            {...register("Brand", {
                                required: "La marca es requerida",
                                maxLength: {
                                    value: 100,
                                    message: "La marca no debe tener más de 100 caracteres",
                                },
                            })}
                        />
                        {errors.Brand && <span className="error">{errors.Brand.message}</span>}
                    </div>

                    <div>
                        <label className="atributo" htmlFor="Model">Modelo:</label>
                        <input
                            className="Ingresar-Dato"
                            type="text"
                            {...register("Model", {
                                required: "El modelo es requerido",
                                maxLength: {
                                    value: 100,
                                    message: "El modelo no debe tener más de 100 caracteres",
                                },
                            })}
                        />
                        {errors.Model && <span className="error">{errors.Model.message}</span>}
                    </div>


                    <div>
                        <label className="atributo" htmlFor="Price">
                            Precio:
                        </label>
                        <input
                            className="Ingresar-Dato"
                            type="number"
                            {...register("Price", {
                                required: "El precio es requerido",
                                pattern: {
                                    value: /^[1-9]\d*$/,
                                    message: "Ingrese un número entero positivo para el precio",
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
                                    value: 10000,
                                    message: "La descripción no debe superar los 10000 caracteres",
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
                                pattern: {
                                    value: /^(ftp|http|https):\/\/[^ "]+$/,
                                    message: "Ingrese una URL válida",
                                },
                            })}
                        />
                    </div>

                    <div>
                        <label className="atributo" htmlFor="image">Imagen:</label>
                        <input className="mb-3" type="file" name="image" id="image" accept="image/*" {...register("image")} />
                    </div>

                    <div>
                        <label className="atributo" htmlFor="Quantity">
                            Cantidad:
                        </label>
                        <input
                            className="Ingresar-Dato"
                            type="number"
                            {...register("Quantity", {
                                required: "La cantidad es requerida",
                                pattern: {
                                    value: /^[0-9]\d*$/,
                                    message: "Ingrese un número entero positivo para la cantidad",
                                },
                            })}
                        />
                        {errors.Quantity && (
                            <span className="error">{errors.Quantity.message}</span>
                        )}
                    </div>


                    <div>
                        <label className="atributo" htmlFor="Discount">Descuento:</label>
                        <input className="Ingresar-Dato" type="number" min="0" max="100" {...register("Discount", { required: true })} />
                        {errors.Discount && <span className="error">Descuento es requerido</span>}
                    </div>


                    <div className="selector">
                        <label className="atributo" htmlFor="category">Tipo de Categoría</label>
                        <select
                            className="Seleccionar-Dato"
                            id="category"
                            {...register("Category")}
                            onChange={handleCategoryChange}
                            defaultValue="General"
                        >
                            <option value="General">Seleccione una Categoría</option>
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
                        <select className="Seleccionar-Dato" id="subcategory" {...register("Subcategory")}>
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

                <input type="hidden" name="ProductType" value="Instrumento Musical" {...register("ProductType")} />

                <button className="Boton-Guardar mb-5">Crear Instrumento Musical</button>

                {isCreated && (
                    <div className="confirmation-message mb-5 to-blue-600" onClick={() => reset()}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    )
}