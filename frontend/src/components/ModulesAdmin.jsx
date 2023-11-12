import React from 'react';
import {Link} from 'react-router-dom'

export function ModulesAdmin(){
    return(
    <div className="containermodules container">
        <div className='module'>
            <Link to="/Admin/Gestionar-Productos">
                <p>Gestionar Productos</p>
            </Link>
        </div>
        <div className='module'>
            <Link to="/Admin/Crear-Informacion-Carrusel">
                <p>Carrusel de Noticias</p>
            </Link>
        </div>
        <div className='module'>
            <Link to="/Admin/Crear-Categoria">
                <p>Gestionar Categorías</p>
            </Link>
        </div>
        <div className='module'>
            <Link to="/Admin/Crear-Librero">
                <p>Añadir un Librero</p>
            </Link>
        </div>
        <div className='module'>
            <Link to="/Admin/Analitica-de-Datos">
                <p>Analitica de datos</p>
            </Link>
        </div>

    </div>
    )
}