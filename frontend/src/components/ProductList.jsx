import { useEffect, useState, useCallback, Fragment } from 'react'
import { ProductCard } from './ProductCard'
import { getAllProductsAndChild } from '../api/Product.api'
import { getAllCategories } from '../api/Categories.api.js'
import { getAllSubcategory } from '../api/Subcategories.api.js'
import { useLocation } from 'react-router-dom';


import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function ProductList() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // get categories and subcategories
    const [Categories, setCategories] = useState([]);
    const [Subcategories, setSubcategories] = useState([]);
    const [filters, setFilters] = useState([]);
    
    const loadCategories = useCallback(async () => {
        const res = await getAllCategories();
        setCategories(res.data);
    }, []);
    
    const loadSubcategories = useCallback(async () => {
        const res = await getAllSubcategory();
        setSubcategories(res.data);
    }, []);
    
    const loadFilters = useCallback(() => {
        
        const filteredCategories = Categories.filter((cat) => cat.Name !== 'General');
    
        const filtersData = filteredCategories.map((cat) => {
            return {
                id: cat.Name,
                name: cat.Name,
                options: [
                    {
                        value: "Todas",
                        label: "Todas",
                        checked: false,
                    },
                    ...Subcategories
                        .filter((subcat) => subcat.Category === cat.Name)
                        .map((subcat) => ({
                            value: subcat.Name,
                            label: subcat.Name,
                            checked: false,
                        })),
                ],
            };
        });
    
        setFilters(filtersData);
    }, [Categories, Subcategories]); 
    
    useEffect(() => {
        const fetchData = async () => {
            await loadCategories();
            await loadSubcategories();
        };
        fetchData();
    }, [location]);

    // set filters and categorys
    
    useEffect(() => {
        loadFilters();
    }, [Categories, Subcategories]);
    


    const sortOptions = [
        { name: 'Most Popular', href: '#', current: true },
        { name: 'Best Rating', href: '#', current: false },
        { name: 'Newest', href: '#', current: false },
        { name: 'Price: Low to High', href: '#', current: false },
        { name: 'Price: High to Low', href: '#', current: false },
        ]
    const typesOfProducts = [
        { name: 'General', href: '/Productos' },
        { name: 'Libros', href: '/Productos/Libros' },
        { name: 'Instrumentos Musicales', href: '/Productos/InstrumentosMusicales' },
        { name: 'Juegos De Mesa', href: '/Productos/JuegosDeMesa' },
        { name: 'Tecnología', href: '/Productos/Tecnologia' },
    ]



    // adicionar filtros locales 

    const [localFilters, setLocalFilters] = useState([]);

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);


    function handleCheckboxChange(event, section, option) {
        const checked = event.target.checked;
        
        // Actualiza el estado local de los filtros si se selecciona todos
        const updatedFilters = localFilters.map((filter) => {
            if (filter.id === section.id) {
                // Encuentra la categoría correspondiente
                return {
                    ...filter,
                    options: filter.options.map((opt) => {
                        if (option.label === "Todas") {
                            // Marca o desmarca todas las opciones de la categoría
                            return { ...opt, checked };
                        }
                        if (opt.value === option.value) {
                            // Actualiza la opción seleccionada
                            return { ...opt, checked };
                        }
                        return opt;
                    }),
                };
            }
            return filter;
        });

        // Actualiza el estado local de los filtros
        setLocalFilters(updatedFilters);

    }

    const [localFiltersToApply, setFiltersToApply] = useState([]);

    useEffect(() => {
        handlePageChange(1);
        const filterstoapply = []
        var flag = false
        localFilters.map((filter)=>{
            flag = false
            filter.options.map((subcat)=>{
                if(subcat.checked === true && flag === false){
                    const dict = {
                        Category: filter.id, 
                        Subcategory: subcat.label
                    }
                    filterstoapply.push(dict)
                    if(subcat.label === 'Todas'){
                        flag = true
                    }
                }
            })
        })
        
        setFiltersToApply(filterstoapply)

    }, [localFilters]);

    // get all products 
   
    const [ProductsAndChild, setProductsAndChild] = useState([]);
    useEffect(() => {
        async function loadProductsChild() {
            const res = await getAllProductsAndChild();
            setProductsAndChild(res.data);
            console.log(res.data);
        }
        loadProductsChild();
    }, [location]);
    
    
    const [searchTerm, setSearchTerm] = useState(searchParams.get('Busqueda'));
    useEffect(() => {
        setSearchTerm(searchParams.get('Busqueda'));
      }, [location.search]);

    
    // Set filters

    const filterProduct = (product) => {   
        // categoria y Subcategories
        var show = true
       
        if (localFiltersToApply.length != 0) {
            show = false
            localFiltersToApply.map((filter) => {
                if(filter.Subcategory === 'Todas'){
                    if (product.Category == filter.Category){
                        show = true
                    }
                }
                else if (product.Category == filter.Category && product.Subcategory == filter.Subcategory){
                    show = true
                }
            })
        } 
        if  (!show) {
            return false
        }

        // Busqueda
        if (searchTerm !== null){
            const searchTermLowerCase = searchTerm.toLowerCase();
            if (product.Name.toLowerCase().includes(searchTermLowerCase)) {
                return true
            }
            if (product.ProductType === "Libro"){
                if (product.book.Authors.toLowerCase().includes(searchTermLowerCase)) {
                    return true
                }
            }
            if (product.ProductType === "Libro"){
                if (product.book.ISBN === parseInt(searchTermLowerCase, 10)){
                    return true
                }
            }
        }
    
        // Filtros por tipo de producto

        else if (location.pathname.includes('/Libros')){
            if (product.ProductType == "Libro") {
                return true
            }
        }
        
        else if (location.pathname.includes('/InstrumentosMusicales')){
            if (product.ProductType == "Instrumento Musical") {
                return true
            }
        }

        else if (location.pathname.includes('/JuegosDeMesa')){
            if (product.ProductType == "Juego de mesa") {
                return true
            }
        }

        else if (location.pathname.includes('/Tecnologia')){
            if (product.ProductType == "Tecnologia") {
                return true
            }
        } 

        if (location.pathname === '/Productos' && searchTerm === null){
            return true
        }
        
        else {
            return false
        }
            
    };

    const filteredProducts = ProductsAndChild.filter(product => filterProduct(product));

    // paginacion
    
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 15;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);


    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        scrollToTop();
    };
 
    return(
        <div className="Category">
            <div className="Page-Category">
                <div className="bg-white">
            <div>
            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                    <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                    >
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                        <div className="flex items-center justify-between px-4">
                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                        <button
                            type="button"
                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                            onClick={() => setMobileFiltersOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        </div>

                        {/* Filters */}
                        <form className="mt-4 border-t border-gray-200">
                        <h3 className="sr-only">Categories</h3>
                        <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                            {typesOfProducts.map((category) => (
                            <li  key={category.name}>
                                <a href={category.href} className="block px-2 py-3">
                                {category.name}
                                </a>
                            </li>
                            ))}
                        </ul>

                        {localFilters.map((section) => (
                            <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                {({ open }) => (
                                    <>
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            <Disclosure.Button  className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                <span
                                                    className="ml-6 flex items-center"
                                                    onClick={() => open ? disclosure.close() : disclosure.open()}
                                                >
                                                    {open ? (
                                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                    ) : (
                                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                    )}
                                                </span>
                                            </Disclosure.Button>    
                                        </h3>

                                        <Disclosure.Panel className="pt-6">
                                            <div className="space-y-6">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex items-center">
                                                        <input
                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            defaultValue={option.value}
                                                            type="checkbox"
                                                            checked={option.checked}
                                                            data-category={section.id}
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            onChange={(e) => handleCheckboxChange(e, section, option)}
                                                        />
                                                        <label
                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                        >
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>

                        ))}

                        </form>
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </Dialog>
            </Transition.Root>
            {searchTerm !== null && searchTerm !== '' && (
                <div>
                    <h2 className='titulo text-4xl font-bold tracking-tight text-gray-900 ml-4'>Resultados para: <span className='spanSearch'>{searchTerm}</span></h2>
                </div>
            )}
            
            <main className="mx-auto px-4 sm:px-6 lg:px-8 diseño">
                <div className="texto flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 className="titulo text-4xl font-bold tracking-tight text-gray-900">FILTRA TU BÚSQUEDA</h1>

                <div className="flex items-center">
                    <Menu as="div" className="relative inline-block text-left">
                    {/* <div>
                        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sort
                        <ChevronDownIcon
                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                        />
                        </Menu.Button>
                    </div> */}

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                                {({ active }) => (
                                <a
                                    href={option.href}
                                    className={classNames(
                                    option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm'
                                    )}
                                >
                                    {option.name}
                                </a>
                                )}
                            </Menu.Item>
                            ))}
                        </div>
                        </Menu.Items>
                    </Transition>
                    </Menu>

                    {/* <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                    </button> */}
                    <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                    >
                    <span className="sr-only">Filters</span>
                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
                </div>

                <section aria-labelledby="products-heading" className="pb-24 pt-6">
                <h2 id="products-heading" className="sr-only">
                    Products
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    {/* Filters */}
                    <form className="hidden lg:block">
                    <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                        {typesOfProducts.map((category) => (
                        <li key={category.name}>
                            <a href={category.href}>{category.name}</a>
                        </li>
                        ))}
                    </ul>

                    {localFilters.map((section) => (
                        <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                        {({ open }) => (
                            <>
                            <h3 className="-my-3 flow-root">
                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                    <span className="text-gray-900">{section.name}</span>
                                        <span className="ml-6 flex items-center">
                                            {open ? (
                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                            ) : (
                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                            )}
                                        </span>
                                    </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                                <div className="space-y-4">
                                {section.options.map((option, optionIdx) => (
                                    <div key={option.value} className="flex items-center">
                                    <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        checked={option.checked}
                                        data-category={section.id}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        onChange={(e) => handleCheckboxChange(e, section, option)}
                                    />
                                    <label
                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                        className="ml-3 text-sm text-gray-600"
                                    >
                                        {option.label}
                                    </label>
                                    </div>
                                ))}
                                </div>
                            </Disclosure.Panel>
                            </>
                        )}
                        </Disclosure>
                    ))}

                    
                    </form>
                    
                    {/* Product grid */}
                    <div className="lg:col-span-3 productosOrganizados">
                        {currentProducts.map(product => {
                            return <ProductCard key={product.ProductId} Product={product} />;
                        })}
                    </div>

                </div>
                <div className="pagination">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Anterior
                    </button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Siguiente
                    </button>
                </div>

                </section>
            </main>
            </div>
        </div>
    </div>

</div>
    )
}
