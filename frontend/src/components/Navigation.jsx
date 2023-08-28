import {Link} from 'react-router-dom'
import Logo from '../assets/Images/Logo.png'
import search from '../assets/icons/search.png'
import cart from '../assets/icons/cart.png'
import login from '../assets/icons/login.png'
import like from '../assets/icons/like.png'
import styled from 'styled-components'
import BurguerButton from './BurguerButton'

export function Navigation(){
    return(
        <>
            <NavContainer>
                <div class="navbar">
                    
                        <div class="navbar-items">
                            <Link to="/">
                                <img class="navbar-logo" src={Logo} alt="Logo"/>
                            </Link>
                            
                            <div className="Links activate">
                            <Link to="/">
                                <div class="navbar-item"><a>Inicio</a></div>
                            </Link>
                            
                            <Link to="/Productos">
                                <div class="navbar-item"><a>Productos</a></div>
                            </Link>

                            <Link to="/Nosotros">
                                <div class="navbar-item"><a>Acerca de nosotros</a></div>
                            </Link>
                            </div>
                        </div>
                
                        <div class="navbar-search">
                            <input class="navbar-item search-bar" type="text" placeholder=""/>
                            <a href="" class="navbar-item search-icon" ><img  src={search} alt="Buscar"/></a>
                            <img class="navbar-item cart-icon" src={cart} alt="Carrito"/>
                            <Link to="/Mis-MeGusta">
                            <img class="navbar-item like-icon" src={like} alt="Me gusta"/>
                            </Link>
                            
                            <div className="Links activate">
                                <div class="navbar-login">
                                    <a class="login" href="">
                                    <img class="login-icon" src={login} alt="login"/>
                                    Iniciar sesión / Registrarse </a>
                                </div>
                            </div>
                        </div>
                </div>

            <div className="burguer">
            <BurguerButton/>
            </div>
            </NavContainer>
            
        </>
            
        
        
    )
}


const NavContainer = styled.nav`
h2{
    color: white;
    font-weight: 400;
    span{
        font-weight:bold;
    }
}
padding: .4rem;

display: flex;
align-items: center;
justify-content: space-between;
`


