import {Link} from 'react-router-dom'
import Logo from '../assets/Images/Logo.jpg'

export function Navigation(){
    return(
        <div>
            <img src={Logo}/>
            <Link to="/Acentos">
            <h1>Acentos App</h1>
            </Link>
            <Link to="/Acentos-create"> create task</Link>
        </div>



    )
}


