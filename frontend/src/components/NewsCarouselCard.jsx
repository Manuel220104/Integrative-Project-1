
export function NewsCarouselCard({Product}) {
    return (
        <div>
            <img className="imagencarrusel" src={Product.ImageUrl}></img>
            <h2>${Product.Price}</h2>
            <h2>Tipo: {Product.ProductType}</h2>
            <hr/>
        </div>
        
        )
}
