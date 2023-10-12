
import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form'
import { CreateProducts, getLastProduct } from '../../../../api/Product.api.js'
import { createBooks } from '../../../../api/Books.api.js'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllCategories } from '../../../../api/Categories.api.js'
import { useLocation } from 'react-router-dom';
import { getAllSubcategory } from '../../../../api/Subcategories.api.js'



export function CreateBook() {
    const { register, handleSubmit, formState: { errors }, setValue, } = useForm();

    const [Categories, setCategories] = useState([]);

    const location = useLocation();
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

    const [selectedCategoryName, setSelectedCategoryName] = useState('General');

    
    function GetDataOfProduct(data) {
        const formData = new FormData();
        formData.append("Name", data.Name);
        formData.append("Price", data.Price);
        formData.append("Description", data.Description);
        formData.append("ImageUrl", data.ImageUrl);
        formData.append("Image", data.image[0]);
        formData.append("Quantity", data.Quantity);
        formData.append("Discount", data.Discount);
        formData.append("ProductType", data.ProductType);
        return formData
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
                <div className='Atributos' encType="multipart/form-data">
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
                        <label className="atributo" htmlFor="image">Imagen:</label>
                        <input type="file" name="image" id="image" accept="image/*" {...register("image", { required: true })} />

                        {errors.Image && <span className="error">Imagen es requerida</span>}
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

                    <div className="selector">
                        <label className="atributo" htmlFor="category">Tipo de Categoría</label>
                        <select className="Seleccionar-Dato" id="category" onChange={(e) => {console.log(e.target.value); setSelectedCategoryName(e.target.value)}} {...register("Category")}>
                            <option value="General">Seleccione una categoría</option>
                            {Categories.map((Category) => {
                                return (
                                    <option key={Category.CategoryId} value={Category.Name}>
                                        {Category.Name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    

                    <p> {selectedCategoryName}</p>

                    <div className="selector">
                        <label className="atributo" htmlFor="subcategory">Tipo de subcategoría</label>
                        <select className="Seleccionar-Dato" id="subcategory" {...register("Subcategory", { required: false })}>
                            <option value="General">Seleccione una categoría</option>
                            {Subcategories.map((Subcategory) => {
                                return (
                                    <option key={Subcategory.SubcategoryId} value={Subcategory.Name}>{Subcategory.Name}</option>
                                );
                            })}
                        </select>
                    </div>


                </div>

                <input type="hidden" name="ProductType" value="Libro" {...register("ProductType")} />

                <button className="Boton-Guardar mb-5">Crear Libro</button>

            </form>

        </div>

    )
}