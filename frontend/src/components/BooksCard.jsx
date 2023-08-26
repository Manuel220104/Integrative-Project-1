import './BooksCard.css'

export function BooksCard({Book}) {
    return (
        <div>
            <img src={Book.ImageUrl}/>
            <h1>{Book.Title}</h1>
            <p>{Book.Description}</p>
            <hr/>
        </div>    )
}

