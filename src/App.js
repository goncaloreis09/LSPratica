import './App.css';
import './estilos/estilos.css'

// Importação de Componentes
import Header from './componentes/Header';
import Game from './componentes/Game';

import { useState, useEffect } from 'react';

import { PALAVRAS, GAME_TIME, DEFAULT_SIZE } from './constantes/constantes';


function App() {

  const abecedario = ['A', 'B', 'C', 'D','E', 'F', 'G', 'H','I', 'J', 'K', 'L','M', 'N', 'O', 'P','Q', 'R', 'S', 'T','U', 'V', 'X', 'Z']

  let timerId = undefined

  let palavrasVerticais = []
  
  const [render, setRender] = useState(0)

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
  const [tamanhoTabuleiro, setTamanhoTabuleiro] = useState(25)

  const [tamTabQuadrados, setTamTabQuadrados] = useState(DEFAULT_SIZE)


  let posicoes = []


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
    
    if(render === 0 || gameStarted){
      let realtam = tamTabQuadrados * tamTabQuadrados
      let randomword = Math.floor(Math.random() * 5)
      let linha = 1;
      
      //Direcao = 0  Esquerda ->Direita
      //Direcao = 1  Direita -> esquerda
      //Direcao = 2  cima ->baixo
      //Direcao = 3  baixo -> cima
      if(palavras.length !== 0)
        for(let i = 0; i < 5; i++){
          let randomPos = Math.floor(Math.random() * (realtam-1))
          let randomDir = Math.floor(Math.random() * 4)
          let randomWord = Math.floor(Math.random() * 5)

          let mPosicoes = []
          let mLetras = []

          if(posicoes.length !== 0){
            for(let pos of posicoes){
              if(palavras[randomWord] === pos.palavra){
                while(palavras[randomWord] === pos.palavra){
                  randomWord = Math.floor(Math.random() * 5)
                }
              }
            }
          }


          if(randomDir === 0 || randomDir === 1){
            let linha = 1;

            

            for(let i = 0; i < tamTabQuadrados; i++){
              for(let p of posicoes){
                if(p.direcao === 0 || p.direcao === 1){
                  while(p.posicoes[0] + (p.palavra.length - 1) > ((tamTabQuadrados-1) * linha)){
                    p.posicoes[0] = Math.floor(Math.random() * (realtam-1))
                    console.log(p.palavra)
                  }
                  
                  for(let k = 0; k < p.palavra.length ; k++){
                    if(k !== 0) p.posicoes[k] = p.posicoes[k-1] + 1
                  }
  
                 }else if(p.direcao === 2 || p.direcao === 3){
                  while(p.posicoes[0] + ((p.palavra.length - 1) * tamTabQuadrados) > (realtam - 1)){
                    p.posicoes[0] = p.posicoes[0] - tamTabQuadrados
                    console.log(p.palavra)
                  }

                  for(let k = 0; k < p.palavra.length ; k++){
                    if(k !== 0) p.posicoes[k] = p.posicoes[0] + (k * tamTabQuadrados)
                  }
  
                }
              }
              linha++;
            }
            linha = 1
            let firstIteration = true
            for(let c of palavras[randomWord]){
              mLetras.push(c)
              if(firstIteration) mPosicoes.push(randomPos)
              else{
                randomPos++
                mPosicoes.push(randomPos)
              }
              firstIteration = false
            }
          }else{
            let firstIteration = true
            for(let c of palavras[randomWord]){
              mLetras.push(c)
              if(firstIteration) mPosicoes.push(randomPos)
              else{
                randomPos = randomPos + tamTabQuadrados
                mPosicoes.push(randomPos)
              }
              firstIteration = false
            }
          }

          posicoes.push({palavra: palavras[randomWord], letras: mLetras, posicoes: mPosicoes, direcao: randomDir, escrito: 0})
        }

      console.log(posicoes)

      for(let i = 0; i < realtam; i++){
        let r = Math.floor(Math.random() * 24)
        if(posicoes.length !== 0){
          let writen = false
          for(let pos of posicoes){
            if(i === pos.posicoes[pos.escrito] && pos.escrito < pos.letras.length ){
              palavrasSelecionadas.push(pos.letras[pos.escrito].toUpperCase())
              pos.escrito = pos.escrito + 1
             // i = i + 1
              writen = true
              break
            }
          }
          if(writen === false)
            palavrasSelecionadas.push("-")

        }else{
          palavrasSelecionadas.push("-")
        }
      }

      setLetra([...palavrasSelecionadas])
      palavrasSelecionadas.length = 0

    //   if(palavras.length !== 0)
    //     for(let palavra of palavras){
    //       let randomPosWord = Math.floor(Math.random() * (realtam-1))
    //       let randomDir = Math.floor(Math.random() * 4)
    //       let str = palavra;
    //       if(randomDir === 1){
    //         str = ''
    //         for(let i = palavra.length - 1; i>=0; i--){
    //           str = str + palavra[i]
    //         }
    //       }
    //       posicoes.push({word: str, posicao: randomPosWord, direcao: randomDir})
    //     }

    //     for(let n of posicoes){
    //       if(n.direcao === 2 || n.direcao === 3){
    //           palavrasVerticais.push({palavra: n.word, tamanho: n.word.length, posicaoInicial: n.posicao, escrito: 0})

    //           for(let i = 0; i < posicoes.length; i++){
    //             if(posicoes[i].word === n.word) posicoes.splice(i, 1);
    //           }
    //       }
    //     }

    //     console.log(palavrasVerticais)

    //     // for(let i = 0; i < realtam; i++){
          
    //     //     for(let posicao of posicoes){
    //     //       if((posicao.posicao + posicao.word.length)/(tamTabQuadrados*linha) > 1){
    //     //         while((posicao.posicao + posicao.word.length)/(tamTabQuadrados*linha) > 1){
    //     //           console.log("ui")
    //     //           posicao.posicao = Math.floor(Math.random() * (realtam-1))
    //     //         }
    //     //       }
    //     //   }
    //     //   if((i+1)%tamTabQuadrados === 0) linha++
    //     // }
    //     console.log(posicoes)
    //     linha = 1

    //   for(let i = 0; i < realtam; i++){
    //     let chosenWord = "";

    //     if(palavrasVerticais.length !== 0){
    //       for(let pv of palavrasVerticais){
    //         if(i === pv.posicaoInicial && (pv.posicaoInicial+(tamTabQuadrados * pv.tamanho)) <= tamTabQuadrados*tamTabQuadrados && pv.escrito < pv.tamanho){
    //           palavrasSelecionadas.push(pv.palavra[pv.escrito].toUpperCase())
    //           console.log("oi"+palavrasSelecionadas)
    //           // let i;
    //           // for(let letra of pv.word){
    //           //   if(i === pv.escrito) palavrasSelecionadas.push(letra.toUpperCase())
    //           //   i++
    //           // }
    //            i++
    //            pv.escrito = pv.escrito + 1;
    //            pv.posicaoInicial = pv.posicaoInicial + tamTabQuadrados
    //            console.log(tamTabQuadrados)
    //            console.log(pv)
    //         }
    //       }
    //     }

    //     if(posicoes.length !== 0){
    //       for(let posicao of posicoes){
    //         if(i === posicao.posicao && (posicao.posicao + posicao.word.length)/(tamTabQuadrados*linha) <= 1){
    //           chosenWord = posicao.word
    //         }
    //       }
    //       if(chosenWord.length > 0){
    //         for(let letra of chosenWord)
    //           palavrasSelecionadas.push(letra.toUpperCase())

    //         i = i + (chosenWord.length - 1)
    //         chosenWord = ""
    //       }else{
    //         let random = Math.floor(Math.random() * 24)
    //         palavrasSelecionadas.push(abecedario[random])
    //       }
          
    //     }else{
    //       let random = Math.floor(Math.random() * 24)
    //       palavrasSelecionadas.push(abecedario[random])
    //     }

    //     if((i+1)%tamTabQuadrados === 0) linha++
    //   }

    //   setLetra([...palavrasSelecionadas])
      
    //   palavrasSelecionadas.length = 0
     }

    setRender(prev => prev + 1)

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [gameStarted]);

  const comecarJogo = () => {
    if(gameStarted)
      setGameStarted(state => {
        state = false
        return state
      })
    else
      setGameStarted(state => {
        state = true
        return state
      })
  }

 

  const escolherPalavras = () => {
    if(!gameStarted){
      for(let i = 0; i < 5; i++){
        let random = Math.floor(Math.random() * 10)
        let i
        for(random, i = 0; palavrasSelecionadas.length !== 0 && i < palavrasSelecionadas.length && palavrasSelecionadas.includes(PALAVRAS[random]); i++, random = Math.floor(Math.random() * 10));
        
        palavrasSelecionadas.push(PALAVRAS[random])
      }
    
      setPalavras([...palavrasSelecionadas])
    }else{
      palavrasSelecionadas.length = 0
      setPalavras([...palavrasSelecionadas])
    }

      
  }

  const escolherLetras = (e) => {
    let tamSelecionado = e.target.value
    tamTab = tamSelecionado
    setTamTabQuadrados(parseInt(tamSelecionado))
    let realtam = tamTab * tamTab
    for(let i = 0; i < realtam; i++){
      let random = Math.floor(Math.random() * 10)
      palavrasSelecionadas.push(abecedario[random])
    }

    setLetra([...palavrasSelecionadas])
  }



  const guardarPosicoes = () =>{
    let tam = tamTabQuadrados
    // if(palavras.length !== 0 && !gameStarted)
    //   for(let i = 0; i < palavras.length; i++){
    //       let random = Math.floor(Math.random() * (tam-1))
          // let randomPosWord = Math.floor(Math.random() * (tam-1))
          // console.log(randomPosWord)
          // Esquerda -> Direita  direcao = 0
          // DIreita  -> Esquerda direcao = 1
          // Cima     -> Baixo    direcao = 2
          // Baixo    -> Cima     direcao = 3
       //   let direcao =0// Math.floor(Math.random() * 4
      //}
  }

  return (
    <div className="App">
        <Header></Header>
        <Game timer={tempo} start={comecarJogo} gameStarted={gameStarted} palavras={palavras} escolhePalavras={escolherPalavras} escolheLetras={escolherLetras} letras={letra} tamTab={tamanhoTabuleiro}
              setTamanhoTabuleiro={tamTabuleiro} definirPosicoes={guardarPosicoes}
        ></Game>
        <a className="ver-autores" href="/" onClick={(e) => e.preventDefault()}>Ver autores do projeto</a>
    </div>
  );
}

export default App;
