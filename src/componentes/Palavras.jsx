import "../estilos/controlos.css"


function Palavras({palavras}){
    return (
        <div className="palavras">
            <p>Palavras a encontrar</p>
            {
                palavras.map((palavra, index) => 
                    <p key={index}>{palavra}</p>    
                
                )
            }
            {/* {palavras} */}
        </div>
    )
}

export default Palavras