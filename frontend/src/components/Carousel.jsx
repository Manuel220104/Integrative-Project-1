import React from 'react';
import slide1 from '../assets/ImagesCarousel/Slide1.png';
import slide2 from '../assets/ImagesCarousel/Slide2.png';
import slide3 from '../assets/ImagesCarousel/Slide3.png';


export function Carousel() {
    return (
        <div className="Carousel">
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src={slide1} alt="First slide"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src={slide2} alt="Second slide"/>
                    </div>
                    <div class=" carousel-item">
                        <img class="d-block w-100" src={slide3} alt="Third slide"/>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
    );
}
