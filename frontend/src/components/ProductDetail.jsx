import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import like from '../assets/icons/like.png'
import likefull from '../assets/icons/likeFull.png';
import { createLike, getUserLikes } from '../api/Likes.api';
const token = localStorage.getItem('token');
const username_or_email = localStorage.getItem('username_or_email');


export function ProductDetail() {
  const location = useLocation();
  const { Product } = location.state || {};
  function formatNumberWithCommas(input) {
    if (typeof input !== 'number') {
      input = parseFloat(input.replace(/,/g, ''));
    }
    return input.toLocaleString('es-ES');
  }


  const [liked, setLiked] = useState(false);
  const [isLikedProduct, setIsLikedProduct] = useState(false);

  const fetchUserLikes = () => {
    getUserLikes(username_or_email)
      .then((response) => {
        if (response.status === 200) {
          const likes = response.data;
          const productIds = likes.map(like => like.product);

          // Verificar si el producto actual está en la lista de "Me gusta"
          const currentProductIsLiked = productIds.includes(Product.ProductId);
          setIsLikedProduct(currentProductIsLiked);

          const numberOfLikes = likes.length;
          // console.log('Número de likes del usuario:', username_or_email, ":", numberOfLikes);
          // console.log('isLikedProduct:', currentProductIsLiked);
        }
      })
      .catch((error) => {
        console.error('Error al obtener los likes del usuario:', error);
      });
  };

  useEffect(() => {
    fetchUserLikes();
  }, []);

  const handleLikeClick = () => {
    if (token) {
      setLiked((currentLiked) => !currentLiked);

      const product_id = Product.ProductId;

      const data = {
        product_id: Product.ProductId,
        identifier: username_or_email,
      };
      console.log(data);

      createLike(data)
        .then((response) => {
          if (response.status === 201) {
            // "Me gusta" registrado con éxito
            fetchUserLikes();
          } else if (response.status === 204) {
            // "Me gusta" eliminado con éxito
            fetchUserLikes();
          }
        })
        .catch((error) => {
          console.error('Error al interactuar con la API:', error);
        });
    } else {
      console.log('El usuario no ha iniciado sesión');
      alert('Debes iniciar sesión para dar "Me gusta"');
    }
  };



  const handleClickCart = (Product) => {
    const phoneNumber = '+573003462864';
    const message = `¡Hola Acentos! Estoy interesado en el producto ${Product.Name} - ${Product.ProductType}`;
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };
  return (
    <div>
      {Product.ProductType == 'Libro' && (
        <section className="text-gray-700 body-font bg-white">
          <div className="container px-5 py-20 mx-auto">
            <div className="mx-auto flex flex-wrap justify-center">
              <img
                alt="ecommerce"
                className="lg:w-1/4 md:w-1/2 sm:w-1/2 object-cover object-center rounded border border-gray-200"
                src={Product.ImageUrl != null ? Product.ImageUrl : Product.Image}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

                <h1 className="text-gray-900 text-3xl title-font font-medium mb-3">
                  {Product.Name}
                </h1>
                <h2 style={{ color: "#5ABCF4" }} className="text-xl title-font text-gray-500 tracking-widest mb-2">
                  Autor: {Product.book.Authors}
                </h2>
                <div className="flex">
                  <h3 className="text-sm title-font text-gray-500 tracking-widest mb-2">
                    Editorial: {Product.book.Editorial}
                  </h3>
                  <h3 className="text-sm title-font text-gray-500 tracking-widest ml-3">
                    Año De Publicación: {Product.book.YearPublication}
                  </h3>
                  <h3 className="text-sm title-font text-gray-500 tracking-widest ml-3">
                    Idioma: {Product.book.Language}
                  </h3>
                </div>

                <div className="flex">
                  <h3 className="text-sm title-font text-gray-500 tracking-widest mb-2">
                    ISBN: {Product.book.ISBN}
                  </h3>
                </div>

                <p className="leading-relaxed mb-4 text-xl text-gray-900">
                  {Product.Description}
                </p>
                <div className="flex">
                  <span className="lg:text-2xl md:text-2xl sm:text-2xl title-font font-medium mt-2  text-gray-900">
                    $ {formatNumberWithCommas(Product.Price)}
                  </span>


                  <button onClick={() => handleClickCart(Product)} className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">
                    Obtener
                  </button>
                  <button
                    className="rounded-full w-10 h-10 bg-gray-100 p-0 border-0 inline-flex items-center justify-center ml-4"
                    style={{ outline: 'none' }}
                    onClick={handleLikeClick}
                  >
                    {token ? (
                      <img
                        className="like-icon"
                        src={isLikedProduct ? likefull : like}
                        alt="Me gusta"
                      />
                    ) : (
                      <img
                        className="like-icon"
                        src={like}
                        alt="Me gusta"
                      />
                    )}
                  </button>


                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {Product.ProductType == "Instrumento Musical" && (
        <section className="text-gray-700 body-font bg-white">
          <div className="container px-5 py-20 mx-auto">
            <div className="mx-auto flex flex-wrap justify-center">
              <img
                alt="ecommerce"
                className="lg:w-1/4 md:w-1/2 sm:w-1/2 object-cover object-center rounded border border-gray-200"
                src={Product.ImageUrl != null ? Product.ImageUrl : Product.Image}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

                <h1 className="text-gray-900 text-3xl title-font font-medium mb-3">
                  {Product.Name}
                </h1>
                <h2 style={{ color: "#5ABCF4" }} className="text-xl title-font text-gray-500 tracking-widest mb-2">
                  Autor: { }
                </h2>
                <div className="flex">
                  <h3 className="text-sm title-font text-gray-500 tracking-widest mb-2">
                    Marca: {Product.musical_instrument.Brand}
                  </h3>
                  <h3 className="text-sm title-font text-gray-500 tracking-widest ml-3">
                    Modelo: {Product.musical_instrument.Model}
                  </h3>
                </div>

                <p className="leading-relaxed mb-4 text-xl text-gray-900">
                  {Product.Description}
                </p>
                <div className="flex">
                  <span className="lg:text-2xl md:text-2xl sm:text-2xl title-font font-medium mt-2  text-gray-900">
                    $ {formatNumberWithCommas(Product.Price)}
                  </span>
                  <button onClick={() => handleClickCart(Product)} className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">
                    Obtener
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-100 p-0 border-0 inline-flex items-center justify-center  ml-4">
                    <img className="like-icon" src={like} alt="Me gusta" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {Product.ProductType == "Juego de mesa" && (
        <section className="text-gray-700 body-font bg-white">
          <div className="container px-5 py-20 mx-auto">
            <div className="mx-auto flex flex-wrap justify-center">
              <img
                alt="ecommerce"
                className="lg:w-1/4 md:w-1/2 sm:w-1/2 object-cover object-center rounded border border-gray-200"
                src={Product.ImageUrl != null ? Product.ImageUrl : Product.Image}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

                <h1 className="text-gray-900 text-3xl title-font font-medium mb-3">
                  {Product.Name}
                </h1>
                <h2 style={{ color: "#5ABCF4" }} className="text-xl title-font text-gray-500 tracking-widest mb-2">
                  Autor: { }
                </h2>
                <div className="flex">
                  <h3 className="text-sm title-font text-gray-500 tracking-widest mb-2">
                    Numero De Jugadores: {Product.table_game.Players_Number}
                  </h3>
                  <h3 className="text-sm title-font text-gray-500 tracking-widest ml-3">
                    Fabricante: {Product.table_game.Maker}
                  </h3>
                </div>

                <p className="leading-relaxed mb-4 text-xl text-gray-900">
                  {Product.Description}
                </p>
                <div className="flex">
                  <span className="lg:text-2xl md:text-2xl sm:text-2xl title-font font-medium mt-2  text-gray-900">
                    $ {formatNumberWithCommas(Product.Price)}
                  </span>
                  <button onClick={() => handleClickCart(Product)} className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">
                    Obtener
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-100 p-0 border-0 inline-flex items-center justify-center  ml-4">
                    <img className="like-icon" src={like} alt="Me gusta" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {Product.ProductType == "Tecnologia" && (
        <section className="text-gray-700 body-font bg-white">
          <div className="container px-5 py-20 mx-auto">
            <div className="mx-auto flex flex-wrap justify-center">
              <img
                alt="ecommerce"
                className="lg:w-1/4 md:w-1/2 sm:w-1/2 object-cover object-center rounded border border-gray-200"
                src={Product.ImageUrl != null ? Product.ImageUrl : Product.Image}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

                <h1 className="text-gray-900 text-3xl title-font font-medium mb-3">
                  {Product.Name}
                </h1>
                <h2 style={{ color: "#5ABCF4" }} className="text-xl title-font text-gray-500 tracking-widest mb-2">
                  Autor: { }
                </h2>
                <div className="flex">
                  <h3 className="text-sm title-font text-gray-500 tracking-widest mb-2">
                    Marca: {Product.technology.Brand}
                  </h3>
                  <h3 className="text-sm title-font text-gray-500 tracking-widest ml-3">
                    Modelo: {Product.technology.Model}
                  </h3>
                </div>

                <p className="leading-relaxed mb-4 text-xl text-gray-900">
                  {Product.Description}
                </p>
                <div className="flex">
                  <span className="lg:text-2xl md:text-2xl sm:text-2xl title-font font-medium mt-2  text-gray-900">
                    $ {formatNumberWithCommas(Product.Price)}
                  </span>
                  <button onClick={() => handleClickCart(Product)} className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">
                    Obtener
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-100 p-0 border-0 inline-flex items-center justify-center  ml-4">
                    <img className="like-icon" src={like} alt="Me gusta" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}




