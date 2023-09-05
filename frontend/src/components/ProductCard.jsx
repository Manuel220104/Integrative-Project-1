
export function ProductCard({Product}) {
    return (
        <div>
            <h1>{Product.ISBN}</h1>
            <img src={Product.Product.ImageUrl}></img>
            <h2>{Product.Product.Price}</h2>
            
            <hr/>
        </div>
        
        )
}