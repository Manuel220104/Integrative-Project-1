import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form'
import { updateProduct, deleteProduct } from '../../../../api/Product.api.js'
import { updateBook } from '../../../../api/Books.api.js'
import { useNavigate, useLocation } from 'react-router-dom'
import { getAllCategories } from '../../../../api/Categories.api.js'
import { getAllSubcategory } from '../../../../api/Subcategories.api.js'

export function EditBook() {
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state ? location.state.Product : null;
    console.log(product)
    const idbook = product.book.ISBN
    const idproduct = product.ProductId

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

    const { register, handleSubmit, formState: { errors }, setValue, } = useForm();

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

        if (data.Category != product.Category) {
            const foundItem = Subcategories.find(item => item.Name === data.Subcategory && item.Category === data.Category);
            if (foundItem) {
                formData.append("Subcategory", data.Subcategory);
            }
            else if (data.Subcategory != null && data.Subcategory != "Seleccione una subcategoría") {
                formData.append("Subcategory", "");
            }
        } else {
            if (data.Subcategory != null && data.Subcategory != "Seleccione una subcategoría") {
                formData.append("Subcategory", data.Subcategory);
            }
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
            navigate('/Admin/Gestionar-Productos')
        } catch (error) {
            console.error('Error al actualizar el libro:', error);
            console.log('Respuesta del servidor:', error.response);
        }
    });

    const [selectedCategoryid, setSelectedCategory] = useState(product.Category);
    const handleCategoryChange = (e) => {
        const selectedCategoryInt = e.target.value;
        setSelectedCategory(selectedCategoryInt);
    }

    return (
        <div className="CreateProductPage">

            <h1 className="Title mb-3">Editar producto</h1>

            <div className="form" id="BookForm" >
                <form onSubmit={onSubmit}>
                    <div className='Atributos'>
                        <div>
                            <label className="atributo" htmlFor="Name" >Titulo:</label>
                            <input className="Ingresar-Dato" type="text" defaultValue={product.Name} {...register("Name", {
                                required: {
                                    value: true,
                                    message: "Titulo es requerido",
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
                                defaultValue={product.book.ISBN}
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
                            <input className="Ingresar-Dato" type="text" defaultValue={product.book.Authors} {...register("Authors", {
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
                            <label className="atributo" htmlFor="Editorial">Editorial:</label>
                            <input className="Ingresar-Dato" type="text" defaultValue={product.book.Editorial}  {...register("Editorial", {
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
                            <input className="Ingresar-Dato" type="text" defaultValue={product.book.Language} {...register("Language", {
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
                                defaultValue={product.book.YearPublication}
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
                                defaultValue={product.Price}
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
                                defaultValue={product.Description}
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
                            <input type="file" className="mb-3" name="image" id="image" accept="image/*" defaultValue={product.image}{...register("image")} />
                        </div>

                        <div>
                            <label className="atributo" htmlFor="Quantity">
                                Cantidad:
                            </label>
                            <input
                                className="Ingresar-Dato"
                                type="number"
                                defaultValue={product.Quantity}
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
                            <input className="Ingresar-Dato" type="number" min="0" max="100" defaultValue={product.Discount} {...register("Discount", { required: true })} />
                            {errors.Discount && <span className="error" >Descuento es requerido</span>}
                        </div>

                        <div className='flex items-center'>
                            <div>Categoría: {product.Category} <br /> Subcategoría: {product.Subcategory}</div>
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
                                <option value={product.Category}>Seleccione una Categoría</option>
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
                                <option value={product.Subcategory}>Seleccione una subcategoría</option>
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

                    <input type="hidden" name="ProductType" value="Libro" {...register("ProductType")} />

                    <button className="Boton-Guardar mb-5">Actualizar Libro</button>

                </form>
                <button className="Boton-Eliminar mb-5" onClick={async () => {
                    try {
                        await deleteProduct(product.ProductId);
                        navigate('/Admin/Gestionar-Productos');
                    } catch (error) {
                        console.error('Error deleting product:', error);
                    }
                }}>Eliminar Libro</button>
            </div>
        </div>
    )
}