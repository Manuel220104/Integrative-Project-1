import React from 'react';
import {Link} from 'react-router-dom'

export function ModulesAdmin(){
    return(
    <div className="containermodules container">
        <div className='module'>
            <Link to="/Gestionar-Productos">
                <p>Gestionar Productos</p>
            </Link>
        </div>
        <div className='module'>
            <Link to="/Crear-Informacion-Carrusel">
                <p>Carrusel de Noticias</p>
            </Link>
        </div>
        <div className='module'>
            <Link to="/Crear-Categoria">
                <p>Crear Categoría</p>
            </Link>
        </div>
        <div className='module'>
            <Link to="/Crear-Librero">
                <p>Añadir un Librero</p>
            </Link>
        </div>

    </div>
    )
}