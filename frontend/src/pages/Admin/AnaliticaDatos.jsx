import React, { useState, useEffect, useRef } from 'react';
import { getAllProducts } from '../../api/Product.api';
import Chart from 'chart.js/auto';

export function ProductAnalysis() {
    const [totalProducts, setTotalProducts] = useState(0);
    const [generalCategoryProducts, setGeneralCategoryProducts] = useState([]);
    const [productsWithDiscount, setProductsByDiscount] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        // Utiliza la función getAllProducts para obtener los datos de la API
        getAllProducts()
            .then(response => {
                const data = response.data;
                // Calcula el número total de productos
                setTotalProducts(data.length);
                // Filtra los productos con Category igual a "general"
                const generalCategoryProducts = data.filter(product => product.Category === "General");
                setGeneralCategoryProducts(generalCategoryProducts);
                // Filtra los productos con Discount diferente de 0
                const productsWithDiscount = data.filter(product => product.Discount !== 0);
                setProductsByDiscount(productsWithDiscount);

                // Filtra los últimos 10 productos
                const latestProducts = data.slice(-10);
                setLatestProducts(latestProducts);

                // Destruye el gráfico anterior si existe
                if (chartRef.current) {
                    chartRef.current.destroy();
                }

                // Obtén colores aleatorios
                const uniqueCategories = [...new Set(data.map(product => product.Category))];
                const randomColors = generateRandomColors(uniqueCategories.length);

                // Contar la cantidad de productos en cada categoría
                const productCountByCategory = uniqueCategories.map(category => {
                    const count = data.filter(product => product.Category === category).length;
                    return count;
                });

                // Crear un nuevo gráfico de pastel
                const ctx = document.getElementById('categoryPieChart').getContext('2d');
                const newChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: uniqueCategories,
                        datasets: [
                            {
                                data: productCountByCategory,
                                backgroundColor: randomColors,
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: true,
                                position: 'bottom',
                            },
                            tooltips: {
                                callbacks: {
                                    label: function (tooltipItem, data) {
                                        const dataset = data.datasets[0];
                                        const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                                        const currentValue = dataset.data[tooltipItem.index];
                                        const percent = ((currentValue / total) * 100).toFixed(2);
                                        return `${currentValue} productos (${percent}%)`;
                                    },
                                },
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
    }, []);

    // Función para generar colores aleatorios
    const generateRandomColors = (count) => {
        const randomColors = [];
        for (let i = 0; i < count; i++) {
            const color = getRandomColor();
            randomColors.push(color);
        }
        return randomColors;
    };

    // Función para obtener un color aleatorio en formato hexadecimal
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div className="container">

            <div className="row gridAnalitic">
                <div className="col-md-6 ">
                    <h3 className="mt-4 Subtitle_Analitic SubtitleAnalitic">Productos con Category "general"</h3>
                    <table className="table table-striped table-custom ">
                        <thead>
                            <tr>
                                <th>Producto ID</th>
                                <th>Nombre</th>
                                <th>Categoria</th>
                            </tr>
                        </thead>
                        <tbody>
                            {generalCategoryProducts.map(product => (
                                <tr key={product.ProductId}>
                                    <td>{product.ProductId}</td>
                                    <td>{product.Name}</td>
                                    <td>{product.Category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="col-md-6 ">
                    <h3 className="mt-4 Subtitle_Analitic SubtitleAnalitic">Lista de Productos con descuento</h3>
                    <table className="table table-striped table-custom">
                        <thead>
                            <tr>
                                <th>Producto ID</th>
                                <th>Nombre</th>
                                <th>Descuento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsWithDiscount.map(product => (
                                <tr key={product.ProductId}>
                                    <td>{product.ProductId}</td>
                                    <td>{product.Name}</td>
                                    <td>{product.Discount}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row gridAnalitic">


                <div className="col-sm-6">
                    <h3 className="mt-4 SubtitleAnalitic">Últimos 10 Productos Agregados</h3>
                    <table className="table table-striped table-custom">
                        <thead>
                            <tr>
                                <th>Producto ID</th>
                                <th>Nombre</th>
                                <th>Categoria</th>
                                <th>ProductType</th>
                            </tr>
                        </thead>
                        <tbody>
                            {latestProducts.map(product => (
                                <tr key={product.ProductId}>
                                    <td>{product.ProductId}</td>
                                    <td>{product.Name}</td>
                                    <td>{product.Category}</td>
                                    <td>{product.ProductType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-sm-4 offset-md-1 ">
                    <div className='Diagrama-torta'>
                        <canvas id="categoryPieChart"></canvas>
                    </div>
                </div>
                <div className="row gridAnalitic">
                    <div className="col-sm-1">
                        <div className="info-box">
                            <div className="content-wrapper">
                                <div className="circle">
                                    <p className="display-4 SubtitleAnalitic">Cantidad total de productos:</p>
                                    <p className="display-4 Number">{totalProducts}</p>
                                </div>
                            </div>
                        </div>

                    </div>



                </div>
            </div>
        </div>
    );
}
