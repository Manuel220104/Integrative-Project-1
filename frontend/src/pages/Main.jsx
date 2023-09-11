import React, { useState } from 'react';
import {Carousel} from '../components/Carousel'
import {LastProductDate} from '../components/NewsCarousel'
import {CarruselDeImagenes} from '../components/CarouselInformation'
import {LastProductDiscount} from '../components/DiscountsCarousel'

export function Main() {
    return(
        <div>
                
            <CarruselDeImagenes/>
            <LastProductDate/>
            <LastProductDiscount/>

        </div>
    
    )
}