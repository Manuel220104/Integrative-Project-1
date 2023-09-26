import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { CreateProducts, getLastProduct } from '../../../api/Product.api.js'
import { createBooks } from '../../../api/Books.api.js'
import { useNavigate, useLocation } from 'react-router-dom'

export function EditProduct() {

    const location = useLocation();
    const product = location.state ? location.state.Product : null;

    const [selectedCategory, setSelectedCategory] = useState('libro');
    useEffect(() => {
        if (product) {
          setSelectedCategory(product.ProductType);
        }
      }, [product]);

    const { register, handleSubmit, formState: { errors }, setValue, } = useForm();

    function GetDataOfProduct(data) {
        const ProductData = {
            Name: data.Name,
            Price: data.Price,
            Description: data.Description,
            ImageUrl: data.ImageUrl,
            Quantity: data.Quantity,
            Discount: data.Discount,
            ProductType: data.ProductType
        };
        return ProductData
    }

    function GetDataOfBook(data) {
        const ProductData = {
            ISBN: data.ISBN,
            Authors: data.Authors,
            Editorial: data.Editorial,
            Language: data.Language,
            YearPublication: data.YearPublication
        };
        return ProductData
    }

    const onSubmit = handleSubmit(async (data) => {
        console.log(data)
        const ProductData = GetDataOfProduct(data)
        const BookData = GetDataOfBook(data)
        console.log('product')
        console.log(ProductData)
        console.log('book')
        console.log(BookData)

        try {
            await CreateProducts(ProductData);
            // navigate('/Productos');
        } catch (error) {
            console.error('Error al crear el producto:', error);
            console.log('Respuesta del servidor:', error.response);
        }

        async function loadlastProducts() {
            const res = await getLastProduct();
            const id = res.data.ProductId;
            return id
        }

        try {
            const id = await loadlastProducts();
            console.log(id)
            BookData.Product = id;
            console.log(BookData)
            await createBooks(BookData);
        } catch (error) {
            console.error('Error al crear el libro:', error);
            console.log('Respuesta del servidor:', error.response);
        }
    });



    return (
        <div className="CreateProductPage">
            <div>

                <h1 className="Title mb-3">Editar producto</h1>

                {/* Para libro */}
                {selectedCategory == 'Libro' && (

                    <div className="form" id="BookForm" >
                        <form className="Atributos" onSubmit={onSubmit}>

                            <label className="atributo" htmlFor="Name" >Titulo:</label> 
                            <input className="Ingresar-Dato" type="text" value={product.Name} {...register("Name", { required: true })} />
                            {errors.Name && <span className="error">Titulo es requerido</span>}

                            <label className="atributo" htmlFor="ISBN" >ISBN:</label>
                            <input className="Ingresar-Dato" type="number" value={product.book.ISBN} {...register("ISBN", { required: true })} />
                            {errors.ISBN && <span className="error">ISBN es requerido</span>}

                            <label className="atributo" htmlFor="Authors" >Autores:</label>
                            <input className="Ingresar-Dato" type="text" value={product.book.Authors}{...register("Authors", { required: true })} />
                            {errors.Authors && <span className="error">Autores es requerido</span>}


                            <label className="atributo" htmlFor="Editorial" >Editorial:</label>
                            <input className="Ingresar-Dato" type="text" value={product.book.Editorial} {...register("Editorial", { required: true })} />
                            {errors.Editorial && <span className="error">Editorial es requerido</span>}

                            <label className="atributo" htmlFor="Language" >Lenguaje:</label>
                            <input className="Ingresar-Dato" type="text" value={product.book.Language}{...register("Language", { required: true })} />
                            {errors.Language && <span className="error">Lenguaje es requerido</span>}

                            <label className="atributo" htmlFor="YearPublication">Año de publicacion:</label>
                            <input className="Ingresar-Dato" type="number" value={product.book.YearPublication}{...register("YearPublication", { required: true })} />
                            {errors.YearPublication && <span className="error">Año de publicacion</span>}


                            <label className="atributo" htmlFor="Price">Precio:</label>
                            <input className="Ingresar-Dato" type="number" step="000.001" value={product.Price}{...register("Price", { required: true })} />
                            {errors.Price && <span className="error" >Precio es requerido</span>}

                            <label className="atributo" htmlFor="Description">Descripcion:</label>
                            <textarea className="Ingresar-Descripcion" type="text"  value={product.Description}  {...register("Description", { required: true })} />
                            {errors.Description && <span className="error" >Descripcion es requerido</span>}

                            <label className="atributo" htmlFor="ImageUrl">Imagen URL:</label>
                            <input className="Ingresar-Dato" type="text" value={product.ImageUrl} {...register("ImageUrl", { required: true })} />
                            {errors.ImageUrl && <span className="error" >Imagen Url es requerido</span>}

                            <label className="atributo" htmlFor="Quantity">Cantidad:</label>
                            <input className="Ingresar-Dato" type="number" value={product.Quantity} {...register("Quantity", { required: true })} />
                            {errors.Quantity && <span className="error">Cantidad es requerido</span>}

                            <label className="atributo" htmlFor="Discount">Descuento:</label>
                            <input className="Ingresar-Dato" type="number" value={product.Discount}{...register("Discount", { required: true })} />
                            {errors.Discount && <span className="error" >Descuento es requerido</span>}

                            <input type="hidden" name="ProductType" value="Libro" {...register("ProductType")} />

                            <button className="Boton-Guardar">Actualizar</button>

                        </form>

                    </div>
                )}


                {/* Para Tecnologia */}
                {selectedCategory == 'tecnologia' && (
                    <div className="form" id="technologyForm" >
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" id="nombre" name="nombre" required />

                        <label htmlFor="characteristics">Characteristics:</label>
                        <input type="text" id="characteristics" name="characteristics" maxlength="300" required />

                        <label htmlFor="brand">Brand:</label>
                        <input type="text" id="brand" name="brand" maxlength="50" required />

                        <label htmlFor="model">Model:</label>
                        <input type="text" id="model" name="model" maxlength="50" required />

                        <label htmlFor="price">Price:</label>
                        <input type="number" id="price" name="price" max="999.999" step="0.001" required />

                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" name="description" maxlength="500" required />

                        <label htmlFor="imageUrl">Image URL:</label>
                        <input type="url" id="imageUrl" name="imageUrl" maxlength="500" required />

                        <label htmlFor="quantity">Quantity:</label>
                        <input type="number" id="quantity" name="quantity" min="1" value="1" required />

                        <label htmlFor="discount">Discount:</label>
                        <input type="number" id="discount" name="discount" min="0" max="100" value="0" required />

                        <button>Save</button>
                    </div>
                )}



            </div>
        </div>
    )
}