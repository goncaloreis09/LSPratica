import "../estilos/estilos.css"

import Tabuleiro from "./Tabuleiro"
import Controlos from "./Controlos"
import Palavras from "./Palavras"

function Game(props){
    return(
        <div className="gameArea">
            <div>
                <div className="tabuleiroArea">
                    <Tabuleiro letras={props.letras} tamTab={props.tamTab}></Tabuleiro>
                </div>
                <div className="controlosArea">
                    <Controlos timer={props.timer} start={props.start} gameStarted={props.gameStarted} escolhePalavras={props.escolhePalavras} escolheLetra={props.escolheLetras}
                            setTamanho={props.setTamanhoTabuleiro} definirPosicoes={props.definirPosicoes}
                    ></Controlos>
                    <Palavras palavras={props.palavras}></Palavras>
                </div>
            </div>

        </div>
    )
}

export default Game