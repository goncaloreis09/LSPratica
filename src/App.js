import './App.css';

// Importação de Componentes
import Header from './componentes/Header';
import Game from './componentes/Game';

import { useState, useEffect } from 'react';

import { PALAVRAS, GAME_TIME } from './constantes/constantes';

function App() {

  const abecedario = ['A', 'B', 'C', 'D','E', 'F', 'G', 'H','I', 'J', 'K', 'L','M', 'N', 'O', 'P','Q', 'R', 'S', 'T','U', 'V', 'X', 'Z']

  let timerId = undefined

  //Para guardar a letra que vai em cada quadrado
  const [letra, setLetra] = useState([])

  //Constante para auxiliar no processo de armazenamento das letras
  const letrasSelecionadas = []

  //Guarda o tamanho do tabuleiro
  let tamTab

  //Guarda as palavras pelas quais o utilizador deve procurar
  const [palavras, setPalavras] = useState([])

  //constante para ajudar no processo de armazenamento das palavras
  const palavrasSelecionadas = []

  //Temporizador
  const [tempo, setTempo] = useState(GAME_TIME)

  //Jogo inicializado
  const [gameStarted, setGameStarted] = useState(false)

  //Tamanho do tabuleiro (div)
  const [tamanhoTabuleiro, setTamanhoTabuleiro] = useState()

  const tamTabuleiro = (e) => {
      let tb = parseInt(e.target.value)

      if(tb === 10)
        setTamanhoTabuleiro(state => {
          state = 25
          return state
        })
      else if(tb === 13)
        setTamanhoTabuleiro(state => {
          state = 32.5
          return state
        })
      else
        setTamanhoTabuleiro(state => {
          state = 37.5
          return state
        })

      console.log(tamanhoTabuleiro)
  }

  useEffect(() => {
    if (gameStarted) {
      timerId = setInterval(() => {
        let nextTime;
        setTempo((lastTime) => {
          nextTime = lastTime - 1;

          if (nextTime === -1) { //-1 para o timer conseguir ir a 0 segundos
            setGameStarted(false);
          }

          return nextTime;
        });

      }, 1000);
    } else if (tempo !== GAME_TIME) {
      setTempo(GAME_TIME);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [gameStarted]);

  const comecarJogo = () => {
    if(gameStarted)
      setGameStarted(false)
    else
      setGameStarted(true)
  }

  
  const escolherPalavras = () => {
    if(gameStarted){
      for(let i = 0; i < 5; i++){
        let random = Math.floor(Math.random() * 10)
        palavrasSelecionadas.push(PALAVRAS[random])
      }

    
      setPalavras(state => {
        state =   palavrasSelecionadas
        return state
      })
    }

      
    console.log(palavras)
  }

  const escolherLetras = (e) => {
    let tamSelecionado = e.target.value
    tamTab = tamSelecionado
    let realtam = tamTab * tamTab
    for(let i = 0; i < realtam; i++){
      let random = Math.floor(Math.random() * 10)
      palavrasSelecionadas.push(abecedario[random])
    }

    setLetra([...palavrasSelecionadas])
  }

  useEffect(() => {
    
  }, )

  return (
    <div className="App">
        <Header></Header>
        <Game timer={tempo} start={comecarJogo} gameStarted={gameStarted} palavras={palavras} escolhePalavras={escolherPalavras} escolheLetras={escolherLetras} letras={letra} tamTab={tamanhoTabuleiro}
              setTamanhoTabuleiro={tamTabuleiro}
        ></Game>
    </div>
  );
}

export default App;
