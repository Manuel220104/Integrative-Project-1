import { Link } from 'react-router-dom'

import like from '../assets/icons/like.png'
import cart from '../assets/icons/cart.png'
const MaxLength = 30;

export function DiscountsCarouselCard({Product}) {
    const truncatedName = Product.Name.length > MaxLength ? `${Product.Name.substring(0, MaxLength)}...` : Product.Name;
    return (
        <div className="cardNews">
                <img className="imagencarrusel" src={Product.ImageUrl}></img>
                <div className="infoNews">
                    <h2 className="Discount"> {Product.Discount}%</h2>
                <span className='TitleCardNews'>{truncatedName}</span>
                <h2>${Product.Price}</h2>
                <h2 className="tipoproducto">{Product.ProductType}</h2>
                
                <hr/>
                <div className="iconsCard">
                            <Link to="/Mis-MeGusta">
                                <img className="navbar-item like-icon" src={like} alt="Me gusta" />
                            </Link>
                            <img className="navbar-item cart-icon" src={cart} alt="Carrito" />
                        </div>
                        <Link to={`/Productos/DetalleProducto`}>
                            <span className="seeCard">Ver más</span>
                        </Link>
            </div>
            

            
        </div>
        
        )
}
