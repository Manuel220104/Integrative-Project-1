import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form'
import { createCategory, getAllCategories, deleteCategory } from '../../api/Categories.api.js'
import { createSubcategory, getAllSubcategory, deleteSubcategory } from '../../api/Subcategories.api.js'


import { useLocation } from 'react-router-dom';


export function CreateCategories() {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const { register: registerSubCategory, handleSubmit: handleSubmitSubCategory, formState: { errors: errorsSubCategory } } = useForm();
    const { register: registerChaSubCategory, handleSubmit: handleChaSubmitSubCategory, formState: { errors: errorsChaSubCategory } } = useForm();
    const { register: registerChaCategory, handleSubmit: handleChaSubmitCategory, formState: { errors: errorsChaCategory } } = useForm();
    const [successMessage, setSuccessMessage] = useState('');

    
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
            Object.keys(data).forEach((key) => {
                setValue(key, ''); // Reset each field to an empty string
            });
        } catch (error) {
            console.error('Error al crear el categoria:', error);
            console.log('Respuesta del servidor:', error.response);
        }
    });

    const deleteCategoryf = handleChaSubmitCategory(async (data) => {
        console.log(data);
        if (data.Category != 'General') {
            try {
                await deleteCategory(data.Category);
                await loadCategories();

            } catch (error) {
                console.error('Error al actualizar la categoria:', error);
                console.log('Respuesta del servidor:', error.response);
            }
        }
    });

    const onSubmitSubCategory = handleSubmitSubCategory(async (data) => {
        try {
            await createSubcategory(data);
            await loadSubcategories();
            Object.keys(data).forEach((key) => {
                setValue(key, ''); // Reset each field to an empty string
            });
        } catch (error) {
            console.error('Error al crear la subcategoría:', error);
            console.log('Respuesta del servidor:', error.response);
        }
    });

    const deleteSubCategoryf = handleChaSubmitSubCategory(async (data) => {
        console.log(data)
        if (data.Category != 'General') {
            try {
                await deleteSubcategory(data.Subcategory);
                await loadSubcategories();
            } catch (error) {
                console.error('Error al crear la subcategoría:', error);
                console.log('Respuesta del servidor:', error.response);
            }
        }
    });

    const [selectedCategoryid, setSelectedCategory] = useState('');
    const handleCategoryChange = (e) => {
        const selectedCategoryInt = e.target.value;
        console.log(selectedCategoryInt)
        setSelectedCategory(selectedCategoryInt);
    }

    const [selectedSubCategoryid, setSubCategory] = useState('');
    const handleSubCategoryChange = (e) => {
        const selected = e.target.value;
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
                    <div >
                        {errors.Name && <span className="error ecat">Nombre es requerido</span>}
                    </div>
                </form>

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
                        <div >
                            {errorsSubCategory.Name && <span className="error">Nombre es requerido</span>}
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
                                        <option key={index} value={Category.Name}>
                                            {Category.Name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <button className="Boton-Eliminar B-sub mb-5" type="submit">Eliminar Categoría</button>
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
                                        <option key={index} value={Category.Name}>
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

                        <button className="Boton-Eliminar B-sub mb-5" type="submit">Eliminar Subcategoría</button>
                    </div>
                </form>


            </div>
        </div>

    );
}
