import React, { useState, useEffect, useRef } from 'react';
import { getAllProducts } from '../../api/Product.api';
import Chart from 'chart.js/auto';

export function ProductAnalysis() {
    const [totalProducts, setTotalProducts] = useState(0);
    const [generalCategoryProducts, setGeneralCategoryProducts] = useState([]);
    const [productsWithDiscount, setProductsByDiscount] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        // Utiliza la función getAllProducts para obtener los datos de la API
        getAllProducts()
            .then(response => {
                const data = response.data;
                // Calcula el número total de productos
                setTotalProducts(data.length);
                // Filtra los productos con Category igual a "general"
                const generalCategoryProducts = data.filter(product => product.Category === 3);
                setGeneralCategoryProducts(generalCategoryProducts);
                // Filtra los productos con Discount diferente de 0
                const productsWithDiscount = data.filter(product => product.Discount !== 0);
                setProductsByDiscount(productsWithDiscount);

                // Destruye el gráfico anterior si existe
                if (chartRef.current) {
                    chartRef.current.destroy();
                }

                // Crear un nuevo gráfico de pastel
                const ctx = document.getElementById('categoryPieChart').getContext('2d');
                const newChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['Categoría "general"', 'Otras categorías'],
                        datasets: [
                            {
                                data: [
                                    generalCategoryProducts.length,
                                    totalProducts - generalCategoryProducts.length,
                                ],
                                backgroundColor: ['#FF5733', '#36A2EB'], // Personaliza los colores
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: true,
                                position: 'bottom',
                            },
                        },
                        animation: {
                            animateRotate: true,
                            animateScale: true,
                        },
                        responsive: true,
                    },
                });
                chartRef.current = newChart;
            })
            .catch(error => {
                console.error('Error al cargar datos de productos:', error);
            });
    }, [totalProducts]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2 className="display-4">Información de Productos</h2>
                    <p>Cantidad total de productos: {totalProducts}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                <h3 className="mt-4 Subtitle">Productos con Category "general"</h3>
                    <table className="table table-striped table-custom">
                        <thead>
                            <tr>
                                <th>Producto ID</th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {generalCategoryProducts.map(product => (
                                <tr key={product.ProductId}>
                                    <td>{product.ProductId}</td>
                                    <td>{product.Name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6 ">
                    <h3 className="mt-4 Subtitle">Lista de Productos con descuento</h3>
                    <table className="table table-striped able table-custom">
                        <thead>
                            <tr>
                                <th>Producto ID</th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsWithDiscount.map(product => (
                                <tr key={product.ProductId}>
                                    <td>{product.ProductId}</td>
                                    <td>{product.Name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className='Diagrama-torta' >
                        <canvas id="categoryPieChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
}