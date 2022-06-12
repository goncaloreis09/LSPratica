import "../estilos/tabuleiro.css"

import { useState } from "react"

import Quadrado from "./Quadrado"

function Tabuleiro({letras}){

    // 42.188rem = 675px = (2.5rem + 5px) * 15 quadrados
    const [tamanhoTabuleiro, setTamanhoTabuleiro] = useState(37.5)



    return(
        <div className="tabuleiro" style={{width : `${tamanhoTabuleiro}rem`}}>
            {
                letras.map((letra, index) =>
                    <Quadrado key={index} letra={letra}></Quadrado>
                )
            }
        </div>
    )
}

export default Tabuleiro