import React, { useState, useEffect, useCallback} from 'react';
import { useForm } from 'react-hook-form'
import { createCategory, getAllCategories } from '../../api/Categories.api.js'
import { createSubcategory } from '../../api/Subcategories.api.js'


import { useLocation } from 'react-router-dom';


export function CreateCategories() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { register: registerSubCategory, handleSubmit: handleSubmitSubCategory, formState: { errors: errorsSubCategory } } = useForm();

    const [Categories, setCategories] = useState([]);
    const location = useLocation();

    const loadCategories = useCallback(async () => {
        const res = await getAllCategories();
        setCategories(res.data);
        console.log(res.data)
    }, []);

    useEffect(() => {
        loadCategories();
    }, [location, loadCategories]);

    const onSubmitCategory = handleSubmit(async (data) => {
        try {
            await createCategory(data);
            loadCategories();
        } catch (error) {
            console.error('Error al crear el categoria:', error);
            console.log('Respuesta del servidor:', error.response);
        }
    });

    const onSubmitSubCategory = handleSubmitSubCategory(async (data) => {
        try {
            await createSubcategory(data);
        } catch (error) {
            console.error('Error al crear la subcategoría:', error);
            console.log('Respuesta del servidor:', error.response);
        }
    });

    return (
        <div className="FormCategory">
            <form onSubmit={onSubmitCategory}>
                <div>
                    <label className="Seleccionar" htmlFor="Name">Crear Categoría:</label>
                    <label className="atributo" htmlFor="Name">Nombre De Categoría:</label>
                    <input className="Ingresar-Dato mr-5" type="text" {...register("Name", { required: true })} />
                    {errors.Name && <span className="error">Nombre es requerido</span>}
                    <button className="Boton" type="submit">Crear Categoría</button>
                </div>
            </form>

            <form onSubmit={onSubmitSubCategory} className="flex flex-wrap">
                <div>
                    <label className="Seleccionar" htmlFor="Name">Crear Subcategoría:</label>

                    <div className="selector">
                        <label className="atributo" htmlFor="category">Tipo de Categoría</label>
                        <select className="Seleccionar-Dato" id="category" {...registerSubCategory("Category", { required: true })}>
                            <option value="">Seleccione una categoría</option>
                            {Categories.map((Category) => {
                                return (
                                    <option key={Category.CategoryId} value={Category.CategoryId}>{Category.Name}</option>
                                );
                            })}
                        </select>
                        {errorsSubCategory.Category && <span className="error">Categoría es requerida</span>}
                    </div>

                    <label className="atributo" htmlFor="Name">Nombre De Subcategoría:</label>

                    <div>
                        <input className="Ingresar-Dato mr-5" type="text" {...registerSubCategory("Name", { required: true })} />
                        {errorsSubCategory.Name && <span className="error">Nombre es requerido</span>}
                        <button className="Boton" type="submit">Crear Subcategoría</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
