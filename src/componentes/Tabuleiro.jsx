import "../estilos/tabuleiro.css"

import { useState } from "react"

import Quadrado from "./Quadrado"

function Tabuleiro({letras, tamTab}){

    // 42.188rem = 675px = (2.5rem + 5px) * 15 quadrados
    



    return(
        <div className="tabuleiro" style={{width : `${tamTab}rem`}}>
            {
                letras.map((letra, index) =>
                    <Quadrado key={index} letra={letra}></Quadrado>
                )
            }
        </div>
    )
}

export default Tabuleiro