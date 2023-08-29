import {Link} from 'react-router-dom'
import Logo from '../assets/Images/Logo.png'
import search from '../assets/icons/search.png'
import cart from '../assets/icons/cart.png'
import login from '../assets/icons/login.png'
import like from '../assets/icons/like.png'
import BurguerButton from './BurguerButton'

export function Navigation(){
    return(

            <div class="navbar">
                <div class="navbar-items">
                    <Link to="/">
                        <img class="navbar-logo" src={Logo} alt="Logo"/>
                    </Link>


                        <Link to="/">
                            <div class="navbar-item ocultar"><a>Inicio</a></div>
                        </Link>

                        <Link to="/Productos">
                            <div class="navbar-item ocultar"><a>Productos</a></div>
                        </Link>
                    
                        <Link to="/Nosotros">
                            <div class="navbar-item ocultar"><a>Acerca de nosotros</a></div>
                        </Link>
                    
                </div>

                <div class="navbar-search">
                    <input class="navbar-item search-bar ocultar" type="text" placeholder=""/>
                    <a href="" class="navbar-item search-icon" ><img  src={search} alt="Buscar"/></a>
                    <img class="navbar-item cart-icon" src={cart} alt="Carrito"/>
                    <Link to="/Mis-MeGusta">
                    <img class="navbar-item like-icon" src={like} alt="Me gusta"/>
                    </Link>

                    
                        <div class="navbar-login">
                            <a class="login" href="">
                            <img class="login-icon ocultar" src={login} alt="login"/>
                            <span class="ocultar"> Iniciar sesión / Registrarse</span>
                            </a>
                        </div>
                    
                        <div className="burguer">
                    <BurguerButton/>
                    </div>
                    
                </div>
                
            </div>


    )
}