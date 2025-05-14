import { Footer } from "../components/footer"

interface GuideStep {
  title: string
  description: string
  hint?: string
  item?: string[]
  note?: string
  benefit?: string
  advice?: string
  image_url?: string
}

interface GuideProps {
  title: string
  description: string
  steps: GuideStep[]
  footer_text: string
}

const guide: GuideProps = {
  title: 'Primeiros Passos em Apogea',
  description:
    'Seja bem-vindo ao mundo de Apogea! Este guia vai te ajudar a dar os primeiros passos no jogo, entender as mecânicas iniciais e começar sua jornada com eficiência.',
  steps: [
    {
      title: 'O Início da Jornada',
      description:
        'Assim que você iniciar o jogo, será transportado para a Catedral das Planícies, localizada no centro do mapa. Esse é seu ponto de partida, onde você poderá pegar seus primeiros equipamentos e aprender o básico da jogabilidade.',
      hint: 'Explore o local com atenção, pois há baús contendo itens essenciais para sua aventura.',
      image_url:
        'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2796220/ss_8808540740e011e15562ebe6f8e2efe518d89e1e.1920x1080.jpg?t=1736214449',
    },
    {
      title: 'Pegando Seus Primeiros Equipamentos',
      description:
        'Dentro da catedral, você encontrará um baú com seus primeiros itens.',
      item: ['Uma espada enferrujada', 'Uma chave'],
      note: 'A chave é essencial para abrir a próxima sala, então não se esqueça de pegá-la!',
    },
    {
      title: 'Interagindo com NPCs',
      description:
        'Na próxima sala, você encontrará um soldado ferido. Converse com ele para obter informações e liberar o acesso a novas áreas.',
      hint: 'Muitos NPCs em Apogea fornecem dicas valiosas e quests. Sempre interaja com eles para não perder conteúdos importantes.',
    },
    {
      title: 'A Primeira Caçada',
      description:
        'Ao avançar pelo mapa, você encontrará uma passagem subterrânea que leva a uma caverna. Ali, poderá enfrentar seus primeiros inimigos: ratos.',
      hint: 'Derrotar esses inimigos iniciais é uma ótima forma de ganhar experiência e coletar recursos para a jornada.',
      advice:
        'Recomenda-se farmar até juntar 100 de ouro antes de sair para explorar o mundo aberto.',
    },
    {
      title: 'Explorando o Mundo de Apogea',
      description:
        'Ao avançar pelas primeiras salas, você encontrará uma escada que leva a um cômodo superior da catedral. A partir deste ponto, o jogo te dá liberdade para explorar o mundo aberto.',
      hint: 'No início, é interessante seguir as missões principais para aprender mais sobre o jogo e desbloquear novas áreas.',
    },
    {
      title: 'A Primeira Missão (Quest)',
      description:
        "Um dos primeiros NPCs importantes que você encontrará é Edmund. Fale com ele e diga 'quest' para iniciar sua primeira missão.",
      benefit:
        'Além disso, Edmund pode curar seu personagem caso seu HP esteja abaixo de 50%.',
      hint: 'Sempre atualize seu mapa conversando com NPCs e interagindo com placas espalhadas pelo jogo. Isso ajuda a marcar locais importantes e facilita a navegação.',
    },
    {
      title: 'Seguindo para Novos Desafios',
      description:
        'Após aceitar sua primeira missão, você poderá seguir para um novo local indicado no mapa, onde encontrará mais desafios e recompensas, como sua primeira mochila.',
      hint: 'Sempre verifique baús e interaja com o ambiente para encontrar equipamentos úteis.',
    },
  ],
  footer_text:
    'Esse guia cobre as principais mecânicas iniciais do jogo e te prepara para explorar Apogea com mais segurança. Boa aventura! 🚀',
}

export const Guides = () => {
  return (
    <div>
      {/* Header */}
      <header className='bg-gray-800/50 p-4 shadow-lg'>
        <div className='max-w-7xl mx-auto flex justify-between items-center'>
          <h1 className='text-3xl font-bold text-white hover:text-blue-400 transition-colors duration-300'>
            Apogea Wiki
          </h1>
          <nav className='space-x-6'>
            <a
              href='#'
              className='text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 inline-block'
            >
              Guia Inicial
            </a>
            <a
              href='#'
              className='text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 inline-block'
            >
              Classes
            </a>
            <a
              href='#'
              className='text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 inline-block'
            >
              Dungeons
            </a>
            <a
              href='#'
              className='text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 inline-block'
            >
              Crafting
            </a>
          </nav>
        </div>
      </header>

      <div className='max-w-4xl mx-auto p-8'>
        <h1 className='text-4xl font-bold text-white mb-6 animate-fade-in-down'>
          {guide.title}
        </h1>
        <p className='text-gray-300 mb-12 animate-fade-in-up'>
          {guide.description}
        </p>

        <div className='space-y-12'>
          {guide.steps.map((step, index) => (
            <div
              key={index}
              className='bg-gray-800/30 rounded-lg p-6 transform hover:scale-[1.02] transition-all duration-300 hover:bg-gray-700/30 shadow-lg hover:shadow-xl'
            >
              <h2 className='text-2xl font-bold text-white mb-4 flex items-center'>
                <span className='bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg'>
                  {index + 1}
                </span>
                {step.title}
              </h2>
              <p className='text-gray-300 mb-4 leading-relaxed'>
                {step.description}
              </p>

              {step.hint && (
                <div className='bg-blue-900/30 rounded p-4 mb-4 transform hover:translate-x-2 transition-transform duration-300'>
                  <p className='text-blue-200 flex items-center'>
                    <span className='font-bold mr-2'>💡 Dica:</span> {step.hint}
                  </p>
                </div>
              )}

              {step.item && (
                <div className='bg-gray-700/30 rounded p-4 mb-4 hover:bg-gray-600/30 transition-colors duration-300'>
                  <p className='font-bold text-white mb-2'>🎒 Itens:</p>
                  <ul className='list-disc list-inside text-gray-300 space-y-1'>
                    {step.item.map((item, i) => (
                      <li
                        key={i}
                        className='hover:text-white transition-colors duration-200'
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {step.note && (
                <div className='bg-yellow-900/30 rounded p-4 mb-4 transform hover:translate-x-2 transition-transform duration-300'>
                  <p className='text-yellow-200 flex items-center'>
                    <span className='font-bold mr-2'>📝 Nota:</span> {step.note}
                  </p>
                </div>
              )}

              {step.benefit && (
                <div className='bg-green-900/30 rounded p-4 mb-4 transform hover:translate-x-2 transition-transform duration-300'>
                  <p className='text-green-200 flex items-center'>
                    <span className='font-bold mr-2'>✨ Benefício:</span>{' '}
                    {step.benefit}
                  </p>
                </div>
              )}

              {step.advice && (
                <div className='bg-purple-900/30 rounded p-4 mb-4 transform hover:translate-x-2 transition-transform duration-300'>
                  <p className='text-purple-200 flex items-center'>
                    <span className='font-bold mr-2'>🎯 Recomendação:</span>{' '}
                    {step.advice}
                  </p>
                </div>
              )}

              {step.image_url && (
                <div className='mt-4 overflow-hidden rounded-lg'>
                  <img
                    src={step.image_url}
                    alt={step.title}
                    className='w-full hover:scale-105 transition-transform duration-500 rounded-lg shadow-lg'
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className='text-center mt-12 text-gray-400 italic'>
          {guide.footer_text}
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  )
}
