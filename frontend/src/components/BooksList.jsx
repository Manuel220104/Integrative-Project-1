import {useEffect, useState} from 'react'
import {getAllBooks} from '../api/Books.api'
import {BooksCard} from './BooksCard'

export function BooksList(){

const [Books, setBooks] = useState([]);

    useEffect(()=>{
        async function loadBooks(){
            const res = await getAllBooks();
            setBooks(res.data);
        }
        loadBooks();
}, []);

    return <div>
        

        {Books.map(Book => (
            <BooksCard key={Book.id} Book = {Book}  />
        ))}

        </div>;
        // De Books vas a recorrer los libros
}
