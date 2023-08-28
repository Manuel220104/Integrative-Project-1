import React from 'react'
import styled from 'styled-components'

function BurguerButton() {
    return (
        <Burguer>
        <div className="icon nav-icon-5">
            <span></span>
            <span></span>
            <span></span>
        </div>
        </Burguer>
        )
        }


export default BurguerButton

const Burguer = styled.div`
    .nav-icon-5{
        width: 35px;
        height: 30px;
        margin: 10px 10px;
        position: relative;
        cursor: pointer;
        display: inline-block;
    }
    .nav-icon-5 span{
        background-color: #5ABCF4;
        position: absolute;
        border-radius: 3px;
        transition: .3s cubic-bezier(.8, .5, .2, 1.4);
        width:100%;
        height: 4px;
        transition-duration: 500ms
    }
    .nav-icon-5 span:nth-child(1){
        top:0px;
        left: 0px;
    }
    .nav-icon-5 span:nth-child(2){
        top:11px;
        left: 0px;
        opacity:1;
    }
    .nav-icon-5 span:nth-child(3){
        bottom:4px;
        left: 0px;
    }
    .nav-icon-5:not(.open):hover span:nth-child(1){
        transform: rotate(-3deg) scaleY(1.1);
    }
    .nav-icon-5:not(.open):hover span:nth-child(2){
        transform: rotate(3deg) scaleY(1.1);
    }
    .nav-icon-5:not(.open):hover span:nth-child(3){
        transform: rotate(-4deg) scaleY(1.1);
    }
    .nav-icon-5.open span:nth-child(1){
        transform: rotate(45deg);
        top: 13px;
    }
    .nav-icon-5.open span:nth-child(2){
        opacity:0;
    }
    .nav-icon-5.open span:nth-child(3){
        transform: rotate(-45deg);
        top: 13px;
    }

    `;