import React from 'react';
import {Link} from 'react-router-dom'

export function ModulesAdmin(){
    return(
        
    <div className="containermodules container">
        <div className='module'>
            <Link to="/Crear-Productos">
                <p>Crear Producto</p>
            </Link>
        </div>
        <div className='module'>
            <p>Editar Producto</p>
        </div>
        <div className='module'>
            <p>Borrar Producto</p>
        </div>
        <div className='module'>
            <p>Crear Novedad</p>
        </div>
        <div className='module'>
            <p>Crear Usuario</p>
        </div>
    </div>
    )
}   