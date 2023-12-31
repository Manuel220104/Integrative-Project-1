import React, { useState, useEffect, useRef } from 'react';
import { getAllProducts } from '../../api/Product.api';
import Chart from 'chart.js/auto';
import { getAllLikes } from '../../api/Likes.api';
import { Bar } from 'react-chartjs-2';
import { getAllCategories } from '../../api/Categories.api'
import { getAllAccounts } from '../../api/Accounts.api';

export function ProductAnalysis() {
    const [totalProducts, setTotalProducts] = useState(0);
    const [generalCategoryProducts, setGeneralCategoryProducts] = useState([]);
    const [productsWithDiscount, setProductsByDiscount] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);
    const chartRef = useRef(null);
    const [productCounts, setProductCounts] = useState({});
    const [showAllDiscountProducts, setShowAllDiscountProducts] = useState(false);
    const [selectedDays, setSelectedDays] = useState(7);
    const [showAllGeneralCategoryProducts, setShowAllGeneralCategoryProducts] = useState(false);
    const [generalCategoryTableSize, setGeneralCategoryTableSize] = useState(10);
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        // Utiliza la función getAllProducts para obtener los datos de la API
        getAllProducts()
            .then(response => {
                const data = response.data;
                // Calcula el número total de productos
                setTotalProducts(data.length);
                // Filtra los productos con Category igual a "general"
                const generalCategoryProducts = data.filter(product => product.Category === 34);
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

        getAllProducts()

        getAllCategories()
            .then(response => {
                const categoriesData = response.data;
                setCategories(categoriesData);
            })
            .catch(error => {
                console.error('Error al cargar datos de categorías:', error);
            });


    }, []);


    useEffect(() => {
        // Fetch user data on component mount
        getAllAccounts()
            .then(response => {
                setUsers(response.data);
                setFilteredUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    useEffect(() => {
        // Filter users based on search input
        const filtered = users.filter(
            user =>
                user.username.toLowerCase().includes(searchInput.toLowerCase()) ||
                user.email.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchInput, users]);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllLikes();
                const likesData = response.data;

                // Filtra los productos creados en los últimos "selectedDays" días
                const lastDate = new Date();
                lastDate.setDate(lastDate.getDate() - selectedDays);

                const filteredLikes = likesData.filter(like => new Date(like.created_at) > lastDate);

                const counts = {};
                filteredLikes.forEach(like => {
                    const productId = like.product;
                    counts[productId] = (counts[productId] || 0) + 1;
                });

                // Ordena los productos por frecuencia en orden descendente y selecciona los 10 primeros.
                const sortedProducts = Object.keys(counts).sort((a, b) => counts[b] - counts[a]).slice(0, 10);

                // Crea un objeto con los 10 productos más vendidos.
                const top10Counts = {};
                sortedProducts.forEach(product => {
                    top10Counts[product] = counts[product];
                });

                setProductCounts(top10Counts);
            } catch (error) {
                console.error('Error al obtener datos de la API:', error);
            }
        };

        fetchData();
    }, [selectedDays]);

    const data = {
        labels: Object.keys(productCounts),
        datasets: [
            {
                label: 'Cantidad',
                data: Object.values(productCounts),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'ID del producto',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Cantidad de likes',
                },
            },
        },
    };

    const handleDaysChange = (event) => {
        const newDays = event.target.value;
        setSelectedDays(newDays);
    };



    return (
        <div className="container">

            <div className=" gridAnalitic">
                <div className=".col-md-1">
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

            <div className="row gridAnalitic">
                <div className="col-md-6">
                    <h3 className="mt-4 SubtitleAnalitic Subtitle_Analitic">Últimos 10 Productos Agregados</h3>
                    <table className="table table-striped table-custom">
                        <thead>
                            <tr>
                                <th>Producto ID</th>
                                <th>Nombre</th>
                                <th>ProductType</th>
                            </tr>
                        </thead>
                        <tbody>
                            {latestProducts.map(product => (
                                <tr key={product.ProductId}>
                                    <td>{product.ProductId}</td>
                                    <td>{product.Name}</td>
                                    <td>{product.ProductType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                <div className="col-md-6">
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
                            {productsWithDiscount.slice(0, showAllDiscountProducts ? productsWithDiscount.length : 10).map(product => (
                                <tr key={product.ProductId}>
                                    <td>{product.ProductId}</td>
                                    <td>{product.Name}</td>
                                    <td>{product.Discount}%</td>
                                </tr>
                            ))}
                        </tbody>
                        <button
                            className="toggle-button"
                            style={{ fontWeight: 'bold', fontSize: '16px' }}
                            onClick={() => setShowAllDiscountProducts(!showAllDiscountProducts)}
                        >
                            {showAllDiscountProducts ? 'Ver menos' : 'Ver más'}
                        </button>
                    </table>
                </div>
            </div>



            <div className="row gridAnalitic">
                <div className="col-md-6 col-12">
                    <h3 className="mt-4 SubtitleAnalitic">Categorías</h3>
                    <table className="table table-striped table-custom">
                        <thead>
                            <tr>
                                <th>Categoría ID</th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(category => (
                                <tr key={category.CategoryId}>
                                    <td>{category.CategoryId}</td>
                                    <td>{category.Name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6 col-12">
                    <h3 className="mt-4 SubtitleAnalitic">Número De Productos Por Categoría</h3>
                    <div className="Diagrama-torta ml-10">
                        <canvas id="categoryPieChart"></canvas>
                    </div>
                </div>
            </div>

            <div className="row gridAnalitic">

                <div className="col-md-6 col-5">
                    <h3 className="mt-4 SubtitleAnalitic">Productos con Categoría "General"</h3>
                    <table className="table table-striped table-custom">
                        <thead>
                            <tr>
                                <th>Producto ID</th>
                                <th>Nombre</th>
                                <th>Categoría</th>
                            </tr>
                        </thead>
                        <tbody>
                            {generalCategoryProducts.slice(0, showAllGeneralCategoryProducts ? generalCategoryProducts.length : generalCategoryTableSize).map(product => (
                                <tr key={product.ProductId}>
                                    <td>{product.ProductId}</td>
                                    <td>{product.Name}</td>
                                    <td>General</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {generalCategoryProducts.length > generalCategoryTableSize && (
                        <button
                            className="toggle-button"
                            style={{ fontWeight: 'bold', fontSize: '16px' }}
                            onClick={() => setShowAllGeneralCategoryProducts(!showAllGeneralCategoryProducts)}
                        >
                            {showAllGeneralCategoryProducts ? 'Ver menos' : 'Ver más'}
                        </button>
                    )}
                </div>
            </div>

            <div className="row gridAnalitic">
                <div className="col-md-12">
                    <h3 className="mt-4 SubtitleAnalitic">Informacion de usuarios</h3>
                    <input
                        type="text"
                        placeholder="Buscar usuario o correo "
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                    />
                    <table className="table table-striped table-custom">
                        <thead>
                            <tr>
                                <th>Nombre De Usuario</th>
                                <th>Correo Electronico</th>
                                <th>Departamento</th>
                                <th>Ciudad</th>
                                <th>Direccion</th>
                                <th>Detalles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.department}</td>
                                    <td>{user.city}</td>
                                    <td>{user.address}</td>
                                    <td>{user.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            <div className='mb-7'>
                <h3 className="mt-4 SubtitleAnalitic">Los 10 productos con mas Likes</h3>
                <div style={{ width: '80%' }}>
                    <label htmlFor="selectedDays">Seleccionar días:</label>
                    <input className='Ingresar-Numero'
                        type="number"
                        id="selectedDays"
                        name="selectedDays"
                        value={selectedDays}
                        onChange={handleDaysChange}
                        min="1"
                    />
                    <Bar data={data} options={options} />
                </div>
            </div>


        </div>
    );
}
