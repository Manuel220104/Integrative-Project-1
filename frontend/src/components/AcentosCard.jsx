
export function AcentosCard({Book}) {
    return (
        <div>
            <img src={Book.image}/>
            <h1>{Book.image}</h1>
            <h1>{Book.title}</h1>
            <p>{Book.description}</p>
            <hr/>
        </div>    )
}

