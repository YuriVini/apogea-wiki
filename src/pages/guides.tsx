

interface GuideStep {
  title: string
  description: string
  hint?: string
  item?: string[]
  note?: string
  benefit?: string
  advice?: string
  image_url?:string
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
      "hint": "Explore o local com atenção, pois há baús contendo itens essenciais para sua aventura.",
      "image_url":"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2796220/ss_8808540740e011e15562ebe6f8e2efe518d89e1e.1920x1080.jpg?t=1736214449"
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
  return (
    <div>
      {/* Header */}
      <header className='bg-gray-800/50 p-4 shadow-lg'>
        <div className='max-w-7xl mx-auto flex justify-between items-center'>
          <h1 className='text-3xl font-bold text-white hover:text-blue-400 transition-colors duration-300'>Apogea Wiki</h1>
          <nav className='space-x-6'>
            <a href='#' className='text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 inline-block'>
              Guia Inicial
            </a>
            <a href='#' className='text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 inline-block'>
              Classes
            </a>
            <a href='#' className='text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 inline-block'>
              Dungeons
            </a>
            <a href='#' className='text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 inline-block'>
              Crafting
            </a>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-white mb-6 animate-fade-in-down">{guide.title}</h1>
        <p className="text-gray-300 mb-12 animate-fade-in-up">{guide.description}</p>

        <div className="space-y-12">
          {guide.steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-gray-800/30 rounded-lg p-6 transform hover:scale-[1.02] transition-all duration-300 hover:bg-gray-700/30 shadow-lg hover:shadow-xl"
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg">
                  {index + 1}
                </span>
                {step.title}
              </h2>
              <p className="text-gray-300 mb-4 leading-relaxed">{step.description}</p>

              {step.hint && (
                <div className="bg-blue-900/30 rounded p-4 mb-4 transform hover:translate-x-2 transition-transform duration-300">
                  <p className="text-blue-200 flex items-center">
                    <span className="font-bold mr-2">💡 Dica:</span> {step.hint}
                  </p>
                </div>
              )}

              {step.item && (
                <div className="bg-gray-700/30 rounded p-4 mb-4 hover:bg-gray-600/30 transition-colors duration-300">
                  <p className="font-bold text-white mb-2">🎒 Itens:</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {step.item.map((item, i) => (
                      <li key={i} className="hover:text-white transition-colors duration-200">{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {step.note && (
                <div className="bg-yellow-900/30 rounded p-4 mb-4 transform hover:translate-x-2 transition-transform duration-300">
                  <p className="text-yellow-200 flex items-center">
                    <span className="font-bold mr-2">📝 Nota:</span> {step.note}
                  </p>
                </div>
              )}

              {step.benefit && (
                <div className="bg-green-900/30 rounded p-4 mb-4 transform hover:translate-x-2 transition-transform duration-300">
                  <p className="text-green-200 flex items-center">
                    <span className="font-bold mr-2">✨ Benefício:</span> {step.benefit}
                  </p>
                </div>
              )}

              {step.advice && (
                <div className="bg-purple-900/30 rounded p-4 mb-4 transform hover:translate-x-2 transition-transform duration-300">
                  <p className="text-purple-200 flex items-center">
                    <span className="font-bold mr-2">🎯 Recomendação:</span> {step.advice}
                  </p>
                </div>
              )}

              {step.image_url && (
                <div className="mt-4 overflow-hidden rounded-lg">
                  <img 
                    src={step.image_url} 
                    alt={step.title}
                    className="w-full hover:scale-105 transition-transform duration-500 rounded-lg shadow-lg"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12 text-gray-400 italic">
          {guide.footer_text}
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-gray-800/50 text-gray-300 py-8 mt-12'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div>
              <h3 className='text-white text-lg font-bold mb-4'>
                Sobre WikiApogea
              </h3>
              <p className='text-sm text-justify'>
                Um mundo vasto de aventuras e descobertas aguarda por você em
                Apogea. Junte-se a milhares de jogadores nesta jornada épica.
              </p>
            </div>
            <div>
              <h3 className='text-white text-lg font-bold mb-4'>Links Úteis</h3>
              <ul className='space-y-2 text-sm'>
                <li>
                  <a href='#' className='hover:text-white'>
                    Regras do Jogo
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white'>
                    Suporte
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white'>
                    Fórum
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white'>
                    Notícias
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-white text-lg font-bold mb-4'>
                Redes Sociais
              </h3>
              <div className='flex space-x-4'>
                <a
                  href='https://discord.gg/2AcC8D9s'
                  className='hover:text-white flex items-center gap-2'
                >
                  <svg
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z' />
                  </svg>
                  Discord
                </a>
                <a
                  href='https://x.com/TrinitasGames'
                  className='hover:text-white flex items-center gap-2'
                >
                  <svg
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                  </svg>
                  Twitter
                </a>
                <a
                  href='https://www.patreon.com/Apogea'
                  className='hover:text-white flex items-center gap-2'
                >
                  <svg
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M14.82 2.41c3.96 0 7.18 3.24 7.18 7.21 0 3.96-3.22 7.18-7.18 7.18-3.97 0-7.21-3.22-7.21-7.18 0-3.97 3.24-7.21 7.21-7.21M2 21.6h3.5V2.41H2V21.6z' />
                  </svg>
                  Patreon
                </a>
              </div>
              <a
                href='https://store.steampowered.com/app/2796220/Apogea/'
                className='inline-flex items-center px-8 py-4 mt-6 bg-[#1b2838] hover:bg-[#2a475e] text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img
                  src='/social/steam.png'
                  alt='Steam icon'
                  className='w-7 h-7 mr-3 filter brightness-110'
                />
                <span className='font-medium text-lg'>Baixar na Steam</span>
              </a>
            </div>
          </div>
          <div className='text-center mt-8 pt-8 border-t border-gray-700'>
            <p className='text-sm'>
              &copy; 2024 Apogea Wiki. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
