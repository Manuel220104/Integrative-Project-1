import mapa from '../assets/Images/mapa.png'

export function AboutUs() {
    return(
        <div>
            <div className="Page-About">
                <h1 className= "Title"> Acerca de Libreria Acentos</h1>
                <h1 className= "Subtitle">En sus vitrinas se pueden observar títulos nacionales
                e internacionales. Se trata de la Librería EAFIT, el espacio en el que se encuentra una
                amplia variedad de títulos del Fondo Editorial y de las más importantes editoriales nacionales
                e internacionales. </h1>
                <h1 className= "Text-About">Tiene la misión de apoyar el desarrollo intelectual y cultural
                de la comunidad universitaria y de la comunidad en general, a través de una excelente y variada
                oferta de libros en las distintas áreas académicas y literarias, editados por el Fondo Editorial
                EAFIT y las más importantes editoriales nacionales e internacionales.</h1>
            

                <h1 className= "Title">Servicios que prestamos</h1>
                <h1 className= "Subtitle">​​La librería cuenta con una variada oferta académica y literaria para los 
                diferentes grupos de interés, nuestros clientes pueden:</h1>
                <h1 className= "Text-About">
                    <ul class="custom-marker-list">
                        <li>Solicitar títulos que se encuentran catalogados en las diferentes editoriales, caso en el cual la Librería se encarga de realizar los trámites para obtenerlos.</li>
                        <li>Solicitar títulos importados.</li>
                        <li>Tarjetas y bonos para regalar y redimir en la Librería.</li>
                        <li>Docentes y empleados pueden obtener los títulos por deducción de nómina.</li>
                    
                    </ul>
                </h1>
                


                <h1 className="Title">Ubicacion</h1>
                <img className="Map" src={mapa} alt="Mapa"/>
                
                
            </div>
            

        </div>
        
        
    )
}