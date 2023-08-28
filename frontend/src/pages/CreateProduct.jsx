import React, { useState } from 'react';

export function CreateProduct() {

    const [selectedCategory, setSelectedCategory] = useState('libro');

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);

    }
    
    return(
        
        <div>
            <h1>Crear producto</h1>
            <div class="selector">
            <label for="category">Selecciona una categoría:</label>
            <select id="category" onChange={handleCategoryChange} value={selectedCategory}>
                <option value="libro">Libro</option>
                <option value="instrumento">Instrumento Musical</option>
                <option value="tecnologia">Tecnología</option>
                <option value="juego">Juego de Mesa</option>
            </select>
            </div>

            {/* Para libro */}
            {selectedCategory == 'libro' &&(
                <div class="form" id="BookForm" >

                    <label for="title">Title:</label>
                    <input type="text" id="title" required/>

                    <label for="isbn">ISBN:</label>
                    <input type="number" id="isbn" required/>

                    <label for="authors">Authors:</label>
                    <input type="text" id="authors" required/>

                    <label for="editorial">Editorial:</label>
                    <input type="text" id="editorial" required/>

                    <label for="language">Language:</label>
                    <input type="text" id="language" required/>

                    <label for="yearPublication">Year Publication:</label>
                    <input type="number" id="yearPublication" required/>

                    <label for="price">Price:</label>
                    <input type="number" step="0.001" id="price" required/>

                    <label for="description">Description:</label>
                    <input type="text" id="description" required/>

                    <label for="imageUrl">Image URL:</label>
                    <input type="url" id="imageUrl" required/>

                    <label for="quantity">Quantity:</label>
                    <input type="number" id="quantity" required/>

                    <label for="discount">Discount:</label>
                    <input type="number" id="discount" required/>

                </div>
            )}
            

             {/* Para Tecnologia */}
             {selectedCategory == 'tecnologia' &&(
                <div class="form" id="technologyForm" >
                <label for="nombre">Nombre:</label>
                   <input type="text" id="nombre" name="nombre" required/>
   
                   <label for="characteristics">Characteristics:</label>
                   <input type="text" id="characteristics" name="characteristics" maxlength="300" required/>
   
                   <label for="brand">Brand:</label>
                   <input type="text" id="brand" name="brand" maxlength="50" required/>
   
                   <label for="model">Model:</label>
                   <input type="text" id="model" name="model" maxlength="50" required/>
   
                   <label for="price">Price:</label>
                   <input type="number" id="price" name="price" max="999.999" step="0.001" required/>
   
                   <label for="description">Description:</label>
                   <input type="text" id="description" name="description" maxlength="500" required/>
   
                   <label for="imageUrl">Image URL:</label>
                   <input type="url" id="imageUrl" name="imageUrl" maxlength="500" required/>
   
                   <label for="quantity">Quantity:</label>
                   <input type="number" id="quantity" name="quantity" min="1" value="1" required/>
   
                   <label for="discount">Discount:</label>
                   <input type="number" id="discount" name="discount" min="0" max="100" value="0" required/>
               </div>
             )}
             
        </div>
    )
}