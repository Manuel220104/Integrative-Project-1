import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form'
import { createCategory, getAllCategories, deleteCategory } from '../../api/Categories.api.js'
import { createSubcategory, getAllSubcategory, deleteSubcategory } from '../../api/Subcategories.api.js'


import { useLocation } from 'react-router-dom';


export function CreateCategories() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { register: registerSubCategory, handleSubmit: handleSubmitSubCategory, formState: { errors: errorsSubCategory }, reset: resetSubCategory } = useForm();
    const { register: registerChaSubCategory, handleSubmit: handleChaSubmitSubCategory, formState: { errors: errorsChaSubCategory } } = useForm();
    const { register: registerChaCategory, handleSubmit: handleChaSubmitCategory, formState: { errors: errorsChaCategory } } = useForm();
    const [successMessageCategory, setSuccessMessageCategory] = useState('');
    const [errorMessageCategory, setErrorMessageCategory] = useState('');
    const [successMessageSubCategory, setSuccessMessageSubCategory] = useState('');
    const [errorMessageSubCategory, setErrorMessageSubCategory] = useState('');
    const [successMessageDeleteCategory, setSuccessMessageDeleteCategory] = useState('');
    const [errorMessageDeleteCategory, setErrorMessageDeleteCategory] = useState('');
    const [successMessageDeleteSubCategory, setSuccessMessageDeleteSubCategory] = useState('');
    const [errorMessageDeleteSubCategory, setErrorMessageDeleteSubCategory] = useState('');

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

    const onSubmitCategory = handleSubmit(async (data) => {
        try {
            await createCategory(data);
            await loadCategories();
            reset();
            setSuccessMessageCategory('Categoría creada correctamente');
            setErrorMessageCategory('');
            setTimeout(() => {
                setSuccessMessageCategory('');
            }, 5000);
        } catch (error) {
            console.error('Error al crear el categoria:', error);
            console.log('Respuesta del servidor:', error.response);
            setSuccessMessageCategory('');
            setErrorMessageCategory('Error al crear la categoría');
            setTimeout(() => {
                setErrorMessageCategory('');
            }, 5000);
        }
    });

    const deleteCategoryf = handleChaSubmitCategory(async (data) => {
        console.log(data);
        if (data.Category != 'General') {
            try {
                await deleteCategory(data.Category);
                await loadCategories();
                setSuccessMessageDeleteCategory('Categoría eliminada correctamente');
                setErrorMessageDeleteCategory('');
                setTimeout(() => {
                    setSuccessMessageDeleteCategory('');
                }, 5000);
            } catch (error) {
                console.error('Error al eliminar la categoría:', error);
                setSuccessMessageDeleteCategory('');
                setErrorMessageDeleteCategory('Error al eliminar la categoría');
                setTimeout(() => {
                    setErrorMessageDeleteCategory('');
                }, 5000);

            }
        }
    });

    const onSubmitSubCategory = handleSubmitSubCategory(async (data) => {
        try {
            await createSubcategory(data);
            await loadSubcategories();
            resetSubCategory();
            setSuccessMessageSubCategory('Subcategoria creada correctamente');
            setErrorMessageSubCategory('');
            setTimeout(() => {
                setSuccessMessageSubCategory('');
            }, 5000);
        } catch (error) {
            console.error('Error al crear el categoria:', error);
            setSuccessMessageSubCategory('');
            setErrorMessageSubCategory('Error al crear la subcategoría');
            setTimeout(() => {
                setErrorMessageSubCategory('');
            }, 5000);
        }
    });

    const deleteSubCategoryf = handleChaSubmitSubCategory(async (data) => {
        console.log(data)
        if (data.Category != 'General') {
            try {
                await deleteSubcategory(data.Subcategory);
                await loadSubcategories();
                setSuccessMessageDeleteSubCategory('Subcategoría eliminada correctamente');
                setErrorMessageDeleteSubCategory('');
                setTimeout(() => {
                    setSuccessMessageDeleteSubCategory('');
                }, 5000);
            } catch (error) {
                console.error('Error al crear la subcategoría:', error);
                setSuccessMessageDeleteSubCategory('');
                setErrorMessageDeleteSubCategory('Error al eliminar la Subcategoría');
                setTimeout(() => {
                    setErrorMessageDeleteSubCategory('');
                }, 5000);
            }
        }
    });

    const [selectedCategoryid, setSelectedCategory] = useState('');
    const handleCategoryChange = (e) => {
        const selectedCategoryInt = parseInt(e.target.value);
        console.log(selectedCategoryInt)
        setSelectedCategory(selectedCategoryInt);
    }

    const [selectedSubCategoryid, setSubCategory] = useState('');
    const handleSubCategoryChange = (e) => {
        const selected = parseInt(e.target.value);;
        console.log(selected)
        setSubCategory(selected);
    }


    return (
        <div className="FormCategory">
            <div>


                <form onSubmit={onSubmitCategory}>
                    <div>
                        <label className="Seleccionar" htmlFor="Name">Crear Categoría:</label>
                        <label className="atributo" htmlFor="Name">Nombre De Categoría:</label>
                        <input className="Ingresar-Dato mr-5" type="text" {...register("Name", { required: true })} />
                        <button className="Boton B-cat" type="submit">Crear Categoría</button>
                    </div>
                </form>

                <div>
                    {successMessageCategory && <div className="success-message confirmation-message">{successMessageCategory}</div>}
                    {errors.Name && <span className="error ecat">Nombre es requerido</span>}
                    {errorMessageCategory && <div className="fail-message error-message">{errorMessageCategory}</div>}
                </div>

                <form onSubmit={onSubmitSubCategory} className="flex flex-wrap">
                    <div>
                        <label className="Seleccionar" htmlFor="Name">Crear Subcategoría:</label>

                        <div className="selector ">
                            <label className="atributo" htmlFor="category">Tipo de Categoría</label>
                            <select className="Seleccionar-Dato" id="category" {...registerSubCategory("Category", { required: true })}>
                                <option value="">Seleccione una categoría</option>
                                {Categories.map((Category, index) => {
                                    return (
                                        <option key={index} value={Category.CategoryId}>{Category.Name}</option>
                                    );
                                })}
                            </select>
                            {errorsSubCategory.Category && <span className="error mt-2">Categoría es requerida</span>}
                        </div>
                        <div >
                        </div>

                        <label className="atributo" htmlFor="Name">Nombre De Subcategoría:</label>

                        <div>
                            <input className="Ingresar-Dato mr-5" type="text" {...registerSubCategory("Name", { required: true })} />
                            <button className="Boton B-sub" type="submit">Crear Subcategoría</button>
                        </div>
                        <div>
                            {successMessageSubCategory && <div className="success-message confirmation-message">{successMessageSubCategory}</div>}
                            {errors.Name && <span className="error ecat">Nombre es requerido</span>}
                            {errorMessageSubCategory && <div className="fail-message error-message">{errorMessageSubCategory}</div>}
                        </div>

                    </div>
                </form>

                <form onSubmit={deleteCategoryf} className="flex flex-wrap">
                    <div>
                        <label className="Seleccionar" htmlFor="Name">Eliminar Categoría:</label>

                        <div className="selector">
                            <label className="atributo" htmlFor="category">Tipo de Categoría</label>
                            <select
                                className="Seleccionar-Dato"
                                id="category"

                                defaultValue="General"
                                {...registerChaCategory("Category", { required: true })}
                            >

                                {Categories.map((Category, index) => {
                                    return (
                                        <option key={index} value={Category.CategoryId}>
                                            {Category.Name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <button className="Boton-Eliminar B-sub mb-5" type="submit">Eliminar Categoría</button>
                        <div>
                            {successMessageDeleteCategory && <div className="success-message confirmation-message">{successMessageDeleteCategory}</div>}
                            {errors.Name && <span className="error ecat">Nombre es requerido</span>}
                            {errorMessageDeleteCategory && <div className="fail-message error-message">{errorMessageDeleteCategory}</div>}
                        </div>
                    </div>


                </form>


                <form onSubmit={deleteSubCategoryf} className="flex flex-wrap">
                    <div>
                        <label className="Seleccionar" htmlFor="Name">Eliminar Subcategoría:</label>

                        <div className="selector">
                            <label className="atributo" htmlFor="category">Tipo de Categoría</label>
                            <select
                                className="Seleccionar-Dato"
                                id="category"
                                onChange={handleCategoryChange}
                                defaultValue="General"
                            >
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
                            <label className="atributo" htmlFor="subcategory">Subcategoría</label>
                            <select className="Seleccionar-Dato" id="subcategory" {...registerChaSubCategory("Subcategory")} onChange={handleSubCategoryChange}>
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

                        <button className="Boton-Eliminar B-sub mb-5" type="submit">Eliminar Subcategoría</button>
                        <div>
                            {successMessageDeleteSubCategory && <div className="success-message confirmation-message">{successMessageDeleteSubCategory}</div>}
                            {errors.Name && <span className="error ecat">Nombre es requerido</span>}
                            {errorMessageDeleteSubCategory && <div className="fail-message error-message">{errorMessageDeleteSubCategory}</div>}
                        </div>
                    </div>
                </form>


            </div>
        </div>

    );
}
