import React from 'react';
import Logo from '../assets/Images/Logo-removebg.png'
import facebook from '../assets/icons/facebook.svg'
import instagram from '../assets/icons/instagram.svg'

export function Footer() {
    return (
        <div>
            <footer className="pie-pagina">
                <div className="group-1">
                    <div className="box">
                        <figure>
                            <a href="#">
                                <img src={Logo} alt="Logo Acentos" />
                            </a>
                        </figure>
                    </div>
                    <div className="box">
                        <h2>Contacto</h2>
                        <p> (57) 604​ 2619500 Ext. 9406 - 9272</p>
                        <p> libreria@eafit.edu.co ​​​​​</p>
                        <p> 300 3462864 </p>
                    </div>
                    <div className="box">
                        <h2>Horarios de atención</h2>
                        <p>Lunes a viernes de 7:30 a.m. a  7:00 p.m.  jornada continua. </p>
                        <p>Sábados de 8:00 a.m. a 12:00 a.m.</p>
                    </div>
                    <div className="box redes-sociales">
                        <h2>Redes Sociales</h2>
                        <a className='red-social' href='https://www.instagram.com/libreria_acentos_eafit/'>
                            <img src={instagram} alt="" />
                            <span>@libreriaacentos</span>
                        </a>

                        <a className='red-social' href='https://www.facebook.com/libreriaacentos'>
                            <img src={facebook} alt="" />
                            <span>@libreria_acentos_eafit</span>
                         ​</a>
                    </div>
                </div>
                <div className="group-2">
                    <small>&copy; <script>document.write(new Date().getFullYear())</script> <b>Acentos</b> - All rights reserved</small>
                </div>
            </footer>
        </div>

    )
}

