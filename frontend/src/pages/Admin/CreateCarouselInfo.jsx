import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form'
import { CreateInformationCarousel, getAllInformationCarousel, deleteCarouselInfo } from '../../api/InformationCarousel.api.js'
import { useNavigate, useLocation } from 'react-router-dom';

export function CreateCarouselInfo() {
    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [novedades, setNovedades] = useState([]);

    const loadnovedades = useCallback(async () => {
        const res = await getAllInformationCarousel();
        setNovedades(res.data);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await loadnovedades();
        };
        fetchData();
    }, [location, loadnovedades]);

    const onSubmit = handleSubmit(async (data) => {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        formData.append("Text", data.Text);

        try {
            await CreateInformationCarousel(formData);
            await loadnovedades();
        } catch (error) {
            console.error('Error al crear la información del carrusel:', error);
            console.log('Respuesta del servidor:', error.response);
        }
    });

    const deletenove = async (id) => {
        try {
            await deleteCarouselInfo(id);
            await loadnovedades();
        } catch (error) {
            console.error('Error al eliminar la novedad:', error);
            console.log('Respuesta del servidor:', error.response);
        }
    };

    return (

        <div className="CreateProductPage">
            <div>
                <h1 className="Title mb-3">Crear Información Carrusel</h1>
                <div className="form" id="CarouselForm">
                    <form className="" onSubmit={onSubmit} encType="multipart/form-data">

                        <label className="atributo" htmlFor="image">Imagen:</label>
                        <input className="mb-4" type="file" name="image" id="image" accept="image/*" {...register("image", { required: true })} />

                        {errors.Image && <span className="error">Imagen es requerida</span>}

                        <label className="atributo" htmlFor="Text">Texto:</label>
                        <input className="Ingresar-Dato" type="Text" name="Text" id="Text" {...register("Text", { required: true })} />
                        {errors.Text && <span className="error">Texto es requerido</span>}

                        <button className="Boton-Guardar">Crear</button>
                    </form>
                </div>
            </div>

            <table className="table mt-5" style={{ maxWidth: "800px" }}>
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Imagen</th>
                        <th scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {novedades.map((nove, index) => (
                        <tr key={index}>
                            <th scope="row">{nove.id}</th>
                            <td>
                                <img src={nove.image} alt="novedad" />
                            </td>
                            <td>
                                <span
                                    className='seeCard'
                                    onClick={() => deletenove(nove.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Delete
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>


    );
}
