
export function CarouselInformationCard({Product}) {
    return (
        <div>
            <img className="imagencarrusel" src={Product.image}></img>
            <h2>{Product.Text}</h2>
        </div>
        
        )
}
