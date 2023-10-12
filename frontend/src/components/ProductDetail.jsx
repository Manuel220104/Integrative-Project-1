import React from 'react';
import { useLocation } from 'react-router-dom';
import like from '../assets/icons/like.png'


export function ProductDetail() {
  const location = useLocation();
  const { Product } = location.state || {};

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

            <p className="leading-relaxed mb-4 text-xl text-gray-900">
              {Product.Description}
            </p>
            <div className="flex">
              <span className="lg:text-2xl md:text-2xl sm:text-2xl title-font font-medium mt-2  text-gray-900">
              $ {Product.Price}
              </span>
              <button className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">
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
              Autor: {}
            </h2>
            <div className="flex">
              <h3 className="text-sm title-font text-gray-500 tracking-widest mb-2">
                Editorial: {}
              </h3>
              <h3 className="text-sm title-font text-gray-500 tracking-widest ml-3">
                Año De Publicación: {}
              </h3>
              <h3 className="text-sm title-font text-gray-500 tracking-widest ml-3">
                Idioma: {}
              </h3>
            </div>

            <p className="leading-relaxed mb-4 text-xl text-gray-900">
              {Product.Description}
            </p>
            <div className="flex">
              <span className="lg:text-2xl md:text-2xl sm:text-2xl title-font font-medium mt-2  text-gray-900">
              $ {Product.Price}
              </span>
              <button className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">
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
              Autor: {}
            </h2>
            <div className="flex">
              <h3 className="text-sm title-font text-gray-500 tracking-widest mb-2">
                Editorial: {}
              </h3>
              <h3 className="text-sm title-font text-gray-500 tracking-widest ml-3">
                Año De Publicación: {}
              </h3>
              <h3 className="text-sm title-font text-gray-500 tracking-widest ml-3">
                Idioma: {}
              </h3>
            </div>

            <p className="leading-relaxed mb-4 text-xl text-gray-900">
              {Product.Description}
            </p>
            <div className="flex">
              <span className="lg:text-2xl md:text-2xl sm:text-2xl title-font font-medium mt-2  text-gray-900">
              $ {Product.Price}
              </span>
              <button className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">
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
              Autor: {}
            </h2>
            <div className="flex">
              <h3 className="text-sm title-font text-gray-500 tracking-widest mb-2">
                Editorial: {}
              </h3>
              <h3 className="text-sm title-font text-gray-500 tracking-widest ml-3">
                Año De Publicación: {}
              </h3>
              <h3 className="text-sm title-font text-gray-500 tracking-widest ml-3">
                Idioma: {}
              </h3>
            </div>

            <p className="leading-relaxed mb-4 text-xl text-gray-900">
              {Product.Description}
            </p>
            <div className="flex">
              <span className="lg:text-2xl md:text-2xl sm:text-2xl title-font font-medium mt-2  text-gray-900">
              $ {Product.Price}
              </span>
              <button className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">
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




