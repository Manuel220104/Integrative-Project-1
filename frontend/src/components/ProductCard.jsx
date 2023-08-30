export function ProductCard({Product}) {
    return (
        <div>
            <h1>{Product.ProductId}</h1>
            <h2>{Product.Price}</h2>
            <p>{Product.Description}</p>
            <hr/>
        </div>    )
}

