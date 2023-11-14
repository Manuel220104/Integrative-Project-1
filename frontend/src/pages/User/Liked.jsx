import React, { useEffect, useState } from 'react';
import { getAllProductsAndChild } from '../../api/Product.api';
import { ProductCard } from '../../components/ProductCard';
import { getUserLikes } from '../../api/Likes.api';

export function Liked() {
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    const username_or_email = localStorage.getItem('username_or_email');

    async function loadLikedProducts() {
      try {
        // Obtener los likes del usuario
        const userLikesResponse = await getUserLikes(username_or_email);

        if (userLikesResponse.status === 200) {
          const likedProductsIds = userLikesResponse.data.map(like => like.product);

          // Filtrar los productos que coinciden con los likes del usuario
          const productsResponse = await getAllProductsAndChild();
          const allProducts = productsResponse.data;

          const filteredProducts = allProducts.filter(product => likedProductsIds.includes(product.ProductId));
          setLikedProducts(filteredProducts);
        }
      } catch (error) {
        console.error('Error al cargar los productos favoritos:', error);
      }
    }

    loadLikedProducts();
  }, []);

  return (
    <div className="CarouselNews">
      <div className="title-container">
        <h1 className="title space">Mis Productos Favoritos</h1>
      </div>
      <div className="lg:col-span-3 productosOrganizados">
        {likedProducts.map((product) => (
          <ProductCard key={product.ProductId} Product={product} />
        ))}
      </div>
    </div>
  );
}
