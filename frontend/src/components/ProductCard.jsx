import { Link } from 'react-router-dom'

import like from '../assets/icons/like.png'
import cart from '../assets/icons/cart.png'
export function ProductCard({ Product }) {
    return (
        <div>
            {Product.ProductType == 'Libro' && (
                <div className="CardP">
                    <div className='imageProduct'>
                        <img src={Product.ImageUrl}></img>
                    </div>
                    <div className="info">
                        <span className='TitleCard'>{Product.Name}</span>
                        <span className='AuthorsCard'>{Product.book.Authors}</span>
                        <span className='PriceCard'>$ {Product.Price}</span>
                        <div className="iconsCard">
                            <Link to="/Mis-MeGusta">
                                <img className="navbar-item like-icon" src={like} alt="Me gusta" />
                            </Link>
                            <img className="navbar-item cart-icon" src={cart} alt="Carrito" />
                        </div>
                        <div>
                            <a className="seeCard" href="">Ver mas</a>
                        </div>

                    </div>
                </div>
            )}
        </div>

    )
}