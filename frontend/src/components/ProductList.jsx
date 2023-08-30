import { useEffect, useState } from 'react'
import { getAllProducts } from '../api/Product.api'
import { ProductCard } from './ProductCard'

export function ProductList() {

    const [Products, setProducts] = useState([]);
    useEffect(() => {
        async function loadProducts() {
            const res = await getAllProducts();
            setProducts(res.data);
            console.log(res.data);
        }
        loadProducts();
    }, []);

    return <div className="grid grid-cols-3 gap-3">
        {Products.map(product => (
            <ProductCard key={product.ProductId} Product={product} />
        ))}
    </div>;
}
