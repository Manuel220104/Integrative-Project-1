import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { CreateInformationCarousel} from '../../api/InformationCarousel.api.js'
import { createBooks } from '../../api/Books.api.js'
import { useNavigate, useParams } from 'react-router-dom'



export function CreateCarouselInfo() {

    const { register, handleSubmit, formState: { errors }, setValue, } = useForm();


    function GetInfoCarrusel(data) {
        const InformationData = {
            image: data.image[0],
            Text: data.Text
        };
        return InformationData
    }


    const onSubmit = handleSubmit(async (data) => {
        console.log(data)
        console.log(data.image[0])
        const InfoData = GetInfoCarrusel(data)
        console.log(InfoData)
        
        try {
            await CreateInformationCarousel(InfoData);
            // navigate('/Productos');
        } catch (error) {
            console.error('Error al crear la informacion del carrusel:', error);
            console.log('Respuesta del servidor:', error.response);
        }
    });

    

    return (
        <div className="CreateProductPage">
    <div>
        <h1 className="Title">Crear Información Carrusel</h1>
        <div className="form" id="CarouselForm">
        <form className="Atributos" onSubmit={onSubmit}  encType="multipart/form-data">


                <label className="atributo" htmlFor="image">Imagen:</label>
                <input type="file" name="image" id="image" accept="image/*" {...register("image", { required: true })}/>

                {errors.Image && <span className="error">Imagen es requerida</span>}

                <label className="atributo" htmlFor="Text">Texto:</label>
                <input className="Ingresar-Dato" type="Text" name="Text" id="Text" {...register("Text", { required: true })} />
                {errors.Text && <span className="error">Texto es requerido</span>}

                <button className="Boton-Guardar">Crear</button>
            </form>
        </div>
    </div>
</div>

                )
}