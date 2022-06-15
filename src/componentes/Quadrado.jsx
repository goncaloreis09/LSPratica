import "../estilos/tabuleiro.css"


function Quadrado({letra}){

    var selecionado = false
    
    

    return(
        <div>
            <div className={`quadrado ${selecionado ? "selecionado" : ""}`} onClick={() => {}}>
                <p>{letra}</p>
            </div>
        
        </div>
    )
}

export default Quadrado 