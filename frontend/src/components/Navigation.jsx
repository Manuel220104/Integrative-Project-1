import { Link } from 'react-router-dom'
import Logo from '../assets/Images/Logo.png'
import search from '../assets/icons/search.png'
import cart from '../assets/icons/cart.png'
import login from '../assets/icons/login.png'
import like from '../assets/icons/like.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from "react"


export function Navigation() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const [searchOpen, setSearchOpen] = useState(false);

    const toggleSearch = () => {
        setSearchOpen(!searchOpen)
    }


    return (
        <div>
            <div className="navbar">
                <div className="navbar-items">
                    <Link to="/">
                        <img className="navbar-logo" src={Logo} alt="Logo" />
                    </Link>

                    <Link to="/">
                        <div className="navbar-item ocultar enlace">Inicio</div>
                    </Link>

                    <Link to="/Productos">
                        <div className="navbar-item ocultar enlace">Productos</div>
                    </Link>

                    <Link to="/Nosotros">
                        <div className="navbar-item ocultar enlace">Acerca de nosotros</div>
                    </Link>
                </div>

                <div className="navbar-search">
                    <input className="navbar-item search-bar-fake button ocultar" style={{ color: "#5abcf4", }} type="button"  onClick={toggleSearch}/>
                
                    <a href="#" className="navbar-item search-icon" onClick={toggleSearch}><img src={search} alt="Buscar" /></a>

                    <img className="navbar-item cart-icon" src={cart} alt="Carrito" />
                    <Link to="/Mis-MeGusta">
                        <img className="navbar-item like-icon" src={like} alt="Me gusta" />
                    </Link>

                    <div className="navbar-login">
                        <a className="login" href="">
                            <img className="login-icon" src={login} alt="login" />
                            <span className="ocultar"> Iniciar sesión / Registrarse</span>
                        </a>
                    </div>

                    <div className="burguer">
                        <FontAwesomeIcon onClick={toggleSidebar} icon={faBars} style={{ color: "#5abcf4", }} />
                    </div>
                </div>
            </div>

            <div className={`side-bar ${sidebarOpen ? 'active' : ''}`}>
                <div className="flex justify-between items-center">
                    <span className="text-center ml-3">Menu</span>
                    <FontAwesomeIcon onClick={toggleSidebar} icon={faX} style={{ color: "#5abcf4", }} />
                </div>
                <hr className="my-4 border-t-2 border-gray-300" />
                <Link to="/">
                    <div className="navbar-item sidebar-item mt-3 enlace" >Inicio</div>
                </Link>

                <Link to="/Productos">
                    <div className="navbar-item sidebar-item enlace">Productos</div>
                </Link>

                <Link to="/Nosotros">
                    <div className="navbar-item sidebar-item enlace">Acerca de nosotros</div>
                </Link>
            </div>

        

            <div className={`search flex justify-content-start items-center justify-center ${searchOpen ? 'active'  : ''}`}>
                <img className="ml-3 mr-0 navbar-logo ocultar2" src={Logo} alt="Logo" />
                <div className='mid-search w-full h-full flex items-center justify-center'>
                    <input className="navbar-item search-bar" type="text" placeholder="" />
                    <a href="" className="navbar-item search-icon "><img src={search} alt="Buscar" /></a>
                </div>
                <FontAwesomeIcon  className="mr-10"icon={faX} onClick={toggleSearch} style={{ color: "#5abcf4", }} />
            </div>


        </div>
    )
}