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
            <Link to="/Editar-Productos">
                <p>Editar Producto</p>
            </Link>
        </div>
        <div className='module'>
            <Link to="/Borrar-Productos">
                <p>Borrar Producto</p>
            </Link>
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