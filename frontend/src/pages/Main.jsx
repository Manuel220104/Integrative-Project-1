import React, { useState } from 'react';
import {Carousel} from '../components/Carousel'
import {LastProductDate} from '../components/NewsCarousel'

export function Main() {
    return(
        <div>
            <Carousel/>
            <LastProductDate/>
        </div>
    
    )
}