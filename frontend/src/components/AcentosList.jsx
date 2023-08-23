
import {useEffect, useState} from 'react'
import {getAllAcentos} from '../api/Acentos.api'
import {AcentosCard} from './AcentosCard'

export function AcentosList(){

const [Acentos, setAcentos] = useState([]);

    useEffect(()=>{
        async function loadAcentos(){
            const res = await getAllAcentos();
            setAcentos(res.data);
        }
        loadAcentos();
}, []);

    return <div>
        

        {Acentos.map(Book => (
            <AcentosCard key={Book.id} Book = {Book}  />
        ))}

        </div>;
        // De acentos vas a recorrer los libros
}
