import {Link} from 'react-router-dom'
import Logo from '../assets/Images/Logo.jpg'

export function Navigation(){
    return(
        <div>
            <img src={Logo}/>
            <Link to="/Books">
            <h1>Books App</h1>
            </Link>
            <Link to="/Books-create"> create task</Link>
        </div>



    )
}


