import React, { useState } from 'react';
import {Carousel} from '../components/Carousel'
import {LastProductDate} from '../components/NewsCarousel'
import {CarruselDeImagenes} from '../components/CarouselInformation'


export function Main() {
    return(
        <div>

            <CarruselDeImagenes/>
            <LastProductDate/>

        </div>
    
    )
}