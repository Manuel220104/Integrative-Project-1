
import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form'
import { updateProduct, deleteProduct } from '../../../../api/Product.api.js'
import { updateTechnologys } from '../../../../api/Tech.api.js'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { getAllCategories } from '../../../../api/Categories.api.js'
import { getAllSubcategory } from '../../../../api/Subcategories.api.js'

export function EditTechnology() {
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state ? location.state.Product : null;
    console.log(product)
    const idtech = product.technology.TechnologyId
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

    const [selectedCategoryid, setSelectedCategory] = useState('');
    const handleCategoryChange = (e) => {
        const selectedCategoryInt = e.target.value;
        setSelectedCategory(selectedCategoryInt);
    }

    return (
        <div className="CreateProductPage">
            <h1 className="Title mb-3">Editar producto</h1>
            <div className="form Bookform" id="BookForm" >
                <form onSubmit={onSubmitTech}>
                    <div className='Atributos'>
                        <div>
                            <label className="atributo" htmlFor="Name">Nombre:</label>
                            <input className="Ingresar-Dato" type="text" defaultValue={product.Name} {...register("Name", {
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
                            <input className="Ingresar-Dato" type="number" defaultValue={product.Discount} {...register("Discount", { required: true })} />
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

                    <input type="hidden" name="ProductType" value="Tecnologia" {...register("ProductType")} />

                    <button className="Boton-Guardar mb-5">Actualizar Artículo Tecnológico</button>

                </form>

                <button className="Boton-Eliminar mb-5" onClick={async () => {
                    try {
                        await deleteProduct(product.ProductId);
                        navigate('/Admin/Gestionar-Productos');
                    } catch (error) {
                        console.error('Error deleting product:', error);
                    }
                }}>Eliminar Artículo Tecnológico</button>

            </div>
        </div>

    )
}