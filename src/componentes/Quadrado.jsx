import "../estilos/tabuleiro.css"


function Quadrado({letra}){
    return(
        <div>
            <div className="quadrado">
                <p>{letra}</p>
            </div>
        
        </div>
    )
}

export default Quadrado