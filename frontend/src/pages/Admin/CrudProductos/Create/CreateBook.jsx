
import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form'
import { CreateProducts, getLastProduct } from '../../../../api/Product.api.js'
import { createBooks } from '../../../../api/Books.api.js'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllCategories } from '../../../../api/Categories.api.js'
import { useLocation } from 'react-router-dom';
import { getAllSubcategory } from '../../../../api/Subcategories.api.js'




export function CreateBook() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

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

        if (data.Category !== 'General') {
            formData.append("Category", data.Category);
        }

        if (data.Subcategory !== 'General') {
            formData.append("Subcategory", data.Subcategory);
        }

        if (data.image.length > 0) {
            formData.append("Image", data.image[0]);
        }

        return formData;
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

    const [isCreated, setIsCreated] = useState(false);
    const [message, setMessage] = useState('');

    const onSubmitBook = handleSubmit(async (data) => {
        console.log(data)
        if (data.image.length > 0 || data.ImageUrl != "") {
            const ProductData = GetDataOfProduct(data)
            const BookData = GetDataOfBook(data)
            console.log('product')
            console.log(ProductData)
            console.log('book')
            console.log(BookData)

            try {
                await CreateProducts(ProductData);

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

                reset();
                setIsCreated(true);
                setMessage('Producto creado con éxito.')
                // reset()
            } catch (error) {
                console.error('Error al crear el libro:', error);
                console.log('Respuesta del servidor:', error.response);
            }
        }
        else {
            alert('Se requiere una imagen para crear producto')
        }
    });

    const [selectedCategoryid, setSelectedCategory] = useState('');
    const handleCategoryChange = (e) => {
        const selectedCategoryInt = parseInt(e.target.value);
        setSelectedCategory(selectedCategoryInt);
    }

    return (
        <div className="form Bookform" id="BookForm" >
            <form onSubmit={onSubmitBook}>
                <div className='Atributos' encType="multipart/form-data">

                    <div>
                        <label className="atributo" htmlFor="Name" >Título:</label>
                        <input className="Ingresar-Dato" type="text" {...register("Name", {
                            required: {
                                value: true,
                                message: "Título es requerido",
                            },
                            maxLength: {
                                value: 1000,
                                message: "El nombre no debe tener más de 1000 caracteres"
                            }
                        })} />
                        {errors.Name && <span className="error">{errors.Name.message}</span>}
                    </div>

                    <div>
                        <label className="atributo" htmlFor="ISBN">ISBN:</label>
                        <input
                            className="Ingresar-Dato"
                            type="number"
                            {...register("ISBN", {
                                required: {
                                    value: true,
                                    message: "ISBN es requerido",
                                },
                                pattern: {
                                    value: /^[1-9]\d*$/,
                                    message: "Ingrese un número entero positivo para el ISBN",
                                },
                            })}
                        />
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
                                    <option key={index} value={Category.CategoryId}>
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
                                            <option key={index} value={Subcategory.SubcategoryId}>
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

                <input type="hidden" name="ProductType" value="Libro" {...register("ProductType")} />

                <button className="Boton-Guardar mb-5">Crear Libro</button>

                {isCreated && (
                    <div className="success-message confirmation-message mb-5 to-blue-600" onClick={() => reset()}>
                        {message}
                    </div>
                )}

            </form>
        </div>
    )
}