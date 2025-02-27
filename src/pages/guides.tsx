

interface GuideStep {
  title: string
  description: string
  hint?: string
  item?: string[]
  note?: string
  benefit?: string
  advice?: string
}

interface GuideProps {
  title: string
  description: string
  steps: GuideStep[]
  footer_text: string
}

const guide: GuideProps = {
  "title": "Primeiros Passos em Apogea",
  "description": "Seja bem-vindo ao mundo de Apogea! Este guia vai te ajudar a dar os primeiros passos no jogo, entender as mecânicas iniciais e começar sua jornada com eficiência.",
  "steps": [
    {
      "title": "O Início da Jornada",
      "description": "Assim que você iniciar o jogo, será transportado para a Catedral das Planícies, localizada no centro do mapa. Esse é seu ponto de partida, onde você poderá pegar seus primeiros equipamentos e aprender o básico da jogabilidade.",
      "hint": "Explore o local com atenção, pois há baús contendo itens essenciais para sua aventura."
    },
    {
      "title": "Pegando Seus Primeiros Equipamentos",
      "description": "Dentro da catedral, você encontrará um baú com seus primeiros itens.",
      "item": [
        "Uma espada enferrujada",
        "Uma chave"
      ],
      "note": "A chave é essencial para abrir a próxima sala, então não se esqueça de pegá-la!"
    },
    {
      "title": "Interagindo com NPCs",
      "description": "Na próxima sala, você encontrará um soldado ferido. Converse com ele para obter informações e liberar o acesso a novas áreas.",
      "hint": "Muitos NPCs em Apogea fornecem dicas valiosas e quests. Sempre interaja com eles para não perder conteúdos importantes."
    },
    {
      "title": "A Primeira Caçada",
      "description": "Ao avançar pelo mapa, você encontrará uma passagem subterrânea que leva a uma caverna. Ali, poderá enfrentar seus primeiros inimigos: ratos.",
      "hint": "Derrotar esses inimigos iniciais é uma ótima forma de ganhar experiência e coletar recursos para a jornada.",
      "advice": "Recomenda-se farmar até juntar 100 de ouro antes de sair para explorar o mundo aberto."
    },
    {
      "title": "Explorando o Mundo de Apogea",
      "description": "Ao avançar pelas primeiras salas, você encontrará uma escada que leva a um cômodo superior da catedral. A partir deste ponto, o jogo te dá liberdade para explorar o mundo aberto.",
      "hint": "No início, é interessante seguir as missões principais para aprender mais sobre o jogo e desbloquear novas áreas."
    },
    {
      "title": "A Primeira Missão (Quest)",
      "description": "Um dos primeiros NPCs importantes que você encontrará é Edmund. Fale com ele e diga 'quest' para iniciar sua primeira missão.",
      "benefit": "Além disso, Edmund pode curar seu personagem caso seu HP esteja abaixo de 50%.",
      "hint": "Sempre atualize seu mapa conversando com NPCs e interagindo com placas espalhadas pelo jogo. Isso ajuda a marcar locais importantes e facilita a navegação."
    },
    {
      "title": "Seguindo para Novos Desafios",
      "description": "Após aceitar sua primeira missão, você poderá seguir para um novo local indicado no mapa, onde encontrará mais desafios e recompensas, como sua primeira mochila.",
      "hint": "Sempre verifique baús e interaja com o ambiente para encontrar equipamentos úteis."
    }
  ],
  "footer_text": "Esse guia cobre as principais mecânicas iniciais do jogo e te prepara para explorar Apogea com mais segurança. Boa aventura! 🚀"
}


export const Guides = () => {

  return <div>{guide.title}  </div>
}
