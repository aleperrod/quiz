import { useEffect, useState } from 'react'
import Questionario from '../components/Questionario'
import QuestaoModel from '../model/questao'
import RespostaModel from '../model/resposta'
import { useRouter } from 'next/router'

const questaoMock = new QuestaoModel(1,'Melhor cor?',[
  RespostaModel.errada('Verde'),
  RespostaModel.errada('Vermelha'),
  RespostaModel.errada('Azul'),
  RespostaModel.certa('Preta')
])


export default function Home() {
  const router = useRouter()
  const BASE_URL = 'http://localhost:3000/api'
  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])
  const [questao,setQuestao] = useState<QuestaoModel>()
  const [respostasCertas,setRespostasCertas] = useState<number>(0)

  async function carregarIdsDasQquestoes() {
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsDasQuestoes = await resp.json()
    setIdsDasQuestoes(idsDasQuestoes)
  }

  async function carregarQquestao(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const json = await resp.json()
    const novaQuestao = QuestaoModel.criarUsandoObjeto(json)
    setQuestao(novaQuestao)
  }

   useEffect(() => {
    carregarIdsDasQquestoes()
  },[])

  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQquestao(idsDasQuestoes[0])
  },[idsDasQuestoes])

  function questaoRespondida(questaoRespondida: QuestaoModel){
    setQuestao(questaoRespondida)
    const acertou = questaoRespondida.acertou
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0))
  }

  function idProximaPergunta(){
      const proximoIndice = idsDasQuestoes.indexOf(questao.id) + 1
      return idsDasQuestoes[proximoIndice]
  }

  function irPraProximoPasso(){
    const proximoId = idProximaPergunta()
    proximoId ? irPraProximaQuestao(proximoId) : finalizar()
  }

  function irPraProximaQuestao(proximoId: number){
    carregarQquestao(proximoId)
  }

  function finalizar(){
    router.push({
      pathname: '/resultado',
      query: {
        total: idsDasQuestoes.length,
        certas: respostasCertas
      }
    })
  }

  return questao ? 
    (
      <Questionario
        questao={questao}
        ultima={idProximaPergunta() === undefined}
        questaoRespondida={questaoRespondida}
        irPraProximoPasso={irPraProximoPasso}
      />
    ) : false
}
