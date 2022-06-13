import "../estilos/controlos.css"


function Controlos({timer, start, gameStarted, escolhePalavras, escolheLetra, setTamanho}){

    var time_almost_ending = timer <= 30
    var time_ending = timer <= 10

    const comecarJogo = () => {
        start()
        escolhePalavras()
    }

    const defenirTabuleiro = (e) => {
        escolheLetra(e)
        setTamanho(e)
    }

    return(
        <div>
            <h2 className="title">Controlos</h2>
            <div className="controlos">
                <div className="dificuldade-box">
                    <p>Dificuldade</p>
                    <select name="" id="" className="dificuldadeControl" onInput={e => defenirTabuleiro(e)}>
                        <option value="10">Fácil (10x10)</option>
                        <option value="13">Médio (13x13)</option>
                        <option value="15">Fácil (15x15)</option>
                    </select>
                </div>
                <div className="start">
                    <button className={`${gameStarted ? "stop-clock" : "" }`} onClick={comecarJogo}>
                        {gameStarted ? "Parar" : "Começar"}
                    </button>
                </div>
            </div>
            <div className="timer">
                <h4>Tempo: </h4>
                <p className={`${time_almost_ending ? "time-almost-ending" : ""} ${time_ending ? "time-ending" : ""}`}>
                    {timer}
                </p>
                <p>s</p>
            </div>
        </div>
    )
}

export default Controlos