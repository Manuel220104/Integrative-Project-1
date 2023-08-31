
export function ProductCard({Product}) {
    return (
        <div>

            <></>
            <img src={Product.ImageUrl}></img>
            
            <h2>{Product.Price}</h2>
            <p>{Product.Description}</p>

            <hr/>
        </div>
        
        )
}
