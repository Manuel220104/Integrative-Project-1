import { Carousel } from 'react-bootstrap'; // Asegúrate de importar React-Bootstrap

export function CarouselInformationCard({ Product }) {
    return (
        <div>
            <div>
                <img className="d-block w-100" src={Product.image}></img>
            </div>

        </div>
    )
}

