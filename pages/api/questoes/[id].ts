import questoes from '../bancoDeQuestoes'

export default function handler(req, res) {
    const idSelecionado = +req.query.id
    //Retorna um vetor mesmo que seja um elemento só.
    const unicaQuestaoOuNada = questoes.filter(questao => questao.id === idSelecionado)

    if(unicaQuestaoOuNada.length === 1){
        const questaoSelecionada = unicaQuestaoOuNada[0]
        res.status(200).json(questaoSelecionada.paraObjeto())
    } else {
        res.status(204).send()
    }

  }
  