import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { getAllProductsAndChild } from '../../../api/Product.api'
import { useLocation } from 'react-router-dom';

export function Crud() {
    // categoria
    const [selectedCategory, setSelectedCategory] = useState('libro');
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    }
    // traer los productos 
    const [ProductsAndChild, setProductsAndChild] = useState([]);
    const location = useLocation();
    useEffect(() => {
        async function loadProductsChild() {
            const res = await getAllProductsAndChild();
            setProductsAndChild(res.data);
            // console.log(res.data);
        }
        loadProductsChild();
    }, [location]);

    console.log(ProductsAndChild)

    function formatNumberWithCommas(input) {
        if (typeof input !== 'number') {
            input = parseFloat(input.replace(/,/g, ''));
        }
        return input.toLocaleString('es-ES'); // Cambia 'es-ES' a tu localización si es diferente
    }
    
    return (
        <div className="max-w-[95%] mx-auto">
            <div className='flex justify-between'>
                <div className="selector">
                    <label className="Seleccionar" htmlFor="category">Tipo de producto</label>
                    <select className="Seleccionar-Dato" id="category" onChange={handleCategoryChange} value={selectedCategory}>
                        <option value="libro">Libro</option>
                        <option value="instrumentoMusical">Instrumento Musical</option>
                        <option value="tecnologia">Tecnología</option>
                        <option value="juego">Juego de Mesa</option>
                    </select>
                </div>
                <div>
                    <Link to="/Admin/Crear-Productos">
                        <button className="Boton-Guardar">Crear producto</button>
                    </Link>
                </div>
            </div>

            {selectedCategory == 'libro' && (
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">ISBN</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Descuento</th>
                                <th scope="col">Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ProductsAndChild.map((product, index) => {
                                if (product.ProductType === 'Libro') {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{product.ProductId}</th>
                                            <td>{product.Name}</td>
                                            <td>{product.book.ISBN}</td>
                                            <td>$ {formatNumberWithCommas(product.Price)}</td>
                                            <td>{product.Discount}</td>
                                            <td>{product.Quantity}</td>
                                            <td>
                                                <Link to={`/Editar-Libro/${product.ProductId}`} state={{ Product: product }}>
                                                    <span className='edit'>Editar</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                }

                            })}
                        </tbody>
                    </table>

                </div>
            )}

            {selectedCategory == 'instrumentoMusical' && (
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Descuento</th>
                                <th scope="col">Cantidad</th>

                            </tr>
                        </thead>
                        <tbody>
                            {ProductsAndChild.map((product, index) => {
                                if (product.ProductType === 'Instrumento Musical') {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{product.ProductId}</th>
                                            <td>{product.Name}</td>
                                            <td>$ {formatNumberWithCommas(product.Price)}</td>
                                            <td>{product.Discount}</td>
                                            <td>{product.Quantity}</td>
                                            <td>
                                                <Link to={`/Editar-Instrumentos-Musicales/${product.ProductId}`} state={{ Product: product }}>
                                                    <span className='edit'>Editar</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                }
                            })}
                        </tbody>
                    </table>

                </div>
            )}

            {selectedCategory == 'juego' && (
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Descuento</th>
                                <th scope="col">Cantidad</th>

                            </tr>
                        </thead>
                        <tbody>
                            {ProductsAndChild.map((product, index) => {
                                if (product.ProductType === 'Juego de mesa') {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{product.ProductId}</th>
                                            <td>{product.Name}</td>
                                            <td>$ {formatNumberWithCommas(product.Price)}</td>
                                            <td>{product.Discount}</td>
                                            <td>{product.Quantity}</td>
                                            <td>
                                                <Link to={`/Editar-Juegos-Mesa/${product.ProductId}`} state={{ Product: product }}>
                                                    <span className='edit'>Editar</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                }
                            })}
                        </tbody>
                    </table>

                </div>
            )}

            {selectedCategory == 'tecnologia' && (
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Descuento</th>
                                <th scope="col">Cantidad</th>

                            </tr>
                        </thead>
                        <tbody>
                            {ProductsAndChild.map((product, index) => {
                                if (product.ProductType === 'Tecnologia') {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{product.ProductId}</th>
                                            <td>{product.Name}</td>
                                            <td>$ {formatNumberWithCommas(product.Price)}</td>
                                            <td>{product.Discount}</td>
                                            <td>{product.Quantity}</td>
                                            <td>
                                                <Link to={`/Editar-Tecnologia/${product.ProductId}`} state={{ Product: product }}>
                                                    <span className='edit'>Editar</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                }
                            })}
                        </tbody>
                    </table>

                </div>
            )}
        </div>
    )

}