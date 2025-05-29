export type CharacterClassType = 
    | 'knight'
    | 'mage'
    | 'rogue'
    | 'squire'

export interface CharacterClass {
    name: string;
    description?: string;
    imageUrl?: string;
    type: CharacterClassType;

    stats?: {
        title: string;
        value: number;
        color: string;
    }[];

    playstyle?: {
        title: string;
        description: string;
    }[];

    abilities?: {
        name: string;
        description: string;
    }[];

    recommendedEquipment?: {
        name: string;
        description: string;
    }[];

    strategy?: {
        do: string[];
        dont: string[];
    };

    builds?: {
        name: string;
        author: string;
        rating: number;
        description: string;
        skills: {
            label: string;
            level: number;
        }[];
    }[];
}

export const CHARACTER_CLASS_DATABASE: CharacterClass[] = [

    //knight
    {
        name: 'Knight',
        description: 'Guerreiro resistente especializado em combate corpo a corpo e proteção de aliados',
        imageUrl: '/knight.png',
        type: 'knight',
        stats: [
            { title: 'Skill', value: 125, color: 'text-green-400' },
            { title: 'Magic', value: 50, color: 'text-red-400' },
            { title: 'Armor', value: 150, color: 'text-green-400' },
            { title: 'Defense', value: 150, color: 'text-green-400' },
            { title: 'Health', value: 200, color: 'text-green-400' },
            { title: 'Mana', value: 50, color: 'text-red-400' },
            { title: 'Capacity', value: 150, color: 'text-green-400' },
            { title: 'Hp Regen', value: 125, color: 'text-green-400' },
            { title: 'Mp Regen', value: 50, color: 'text-red-400' },
            { title: 'Attack Speed', value: 100, color: 'text-yellow-400' },
        ],
        playstyle: [
            {
                title: 'Tank/Defensor',
                description: 'O Knight é a linha de frente do grupo, absorvendo dano e protegendo aliados mais frágeis.',
            },
            {
                title: 'Controle de Campo',
                description: 'Usa habilidades para controlar o posicionamento dos inimigos e manter a atenção deles.',
            },
        ],
        abilities: [
            {
                name: 'Shield Bash',
                description: 'Atordoa inimigos com um golpe poderoso do escudo, causando dano e deixando-os vulneráveis por alguns segundos.',
            },
            {
                name: 'Taunt',
                description: 'Força todos os inimigos próximos a atacar o Knight, protegendo aliados e mantendo o controle da batalha.',
            },
        ],
        recommendedEquipment: [
            {
                name: 'Espadas Pesadas',
                description: 'Alto dano e durabilidade para combate prolongado',
            },
            {
                name: 'Escudos',
                description: 'Proteção essencial e habilidades defensivas',
            },
            {
                name: 'Armaduras Pesadas',
                description: 'Máxima proteção contra ataques físicos',
            },
            {
                name: 'Machados',
                description: 'Alternativa para maior dano bruto',
            },
        ],
        strategy: {
            do: [
                'Sempre mantenha a atenção dos inimigos em você',
                'Use Guardian Stance em situações críticas',
                'Posicione-se entre inimigos e aliados frágeis',
                'Combine Shield Bash com Heavy Strike',
                'Mantenha seu equipamento sempre reparado',
            ],
            dont: [
                'Perseguir inimigos que fogem',
                'Usar Heavy Strike sem proteção',
                'Ignorar a posição dos aliados',
                'Ficar isolado do grupo',
                'Esquecer de usar Taunt regularmente',
            ],
        },
        builds: [
            {
                name: 'Guerreiro Híbrido',
                author: 'WarriorPro',
                rating: 4.5,
                description: 'Equilibrio entre dano e defesa. Perfeita para jogadores solo e grupos pequenos.',
                skills: [
                    { label: 'Heavy Strike', level: 10 },
                    { label: 'Shield Bash', level: 7 },
                    { label: 'Guardian Stance', level: 10 },
                ],
            },
        ],
    },

    //mage
    {
        name: 'Mage',
        description: 'Mago especializado em magia e controle de campo',
        imageUrl: '/mage.png',
        type: 'mage',
        stats: [
            { title: 'Skill', value: 75, color: 'text-red-400' },
            { title: 'Magic', value: 200, color: 'text-green-400' },
            { title: 'Armor', value: 75, color: 'text-red-400' },
            { title: 'Defense', value: 75, color: 'text-red-400' },
            { title: 'Health', value: 75, color: 'text-red-400' },
            { title: 'Mana', value: 200, color: 'text-green-400' },
            { title: 'Capacity', value: 75, color: 'text-red-400' },
            { title: 'Hp Regen', value: 75, color: 'text-red-400' },
            { title: 'Mp Regen', value: 200, color: 'text-green-400' },
            { title: 'Attack Speed', value: 100, color: 'text-yellow-400' },
        ],
        playstyle: [
            {
                title: 'Mago Ofensivo',
                description: 'O Mage é especialista em causar dano à distância com magias poderosas e controlar o campo de batalha.',
            },
            {
                title: 'Controle de Campo',
                description: 'Utiliza feitiços para manipular o posicionamento dos inimigos e proteger aliados com magias de controle.',
            },
        ],
        abilities: [
            {
                name: 'Fireball',
                description: 'Lança uma bola de fogo que explode ao atingir o alvo, causando dano em área aos inimigos próximos.',
            },
            {
                name: 'Frost Nova',
                description: 'Libera uma onda de gelo ao redor do mago, congelando inimigos próximos e reduzindo sua velocidade.',
            },
        ],
        recommendedEquipment: [
            {
                name: 'Cajados Mágicos',
                description: 'Aumenta o poder das magias e permite conjuração à distância',
            },
            {
                name: 'Livros de Feitiços',
                description: 'Essenciais para ampliar o repertório de magias e aumentar a eficiência mágica',
            },
            {
                name: 'Robes Arcanos',
                description: 'Oferecem proteção contra magias e aumentam a regeneração de mana',
            },
            {
                name: 'Amuletos Místicos',
                description: 'Aprimoram o controle de mana e a resistência a feitiços inimigos',
            },
        ],
        strategy: {
            do: [
                'Mantenha distância dos inimigos e ataque de longe',
                'Use Frost Nova para controlar grupos de inimigos',
                'Gerencie sua mana para não ficar vulnerável',
                'Combine diferentes magias para maximizar o dano',
                'Esteja sempre atento ao posicionamento para evitar ser surpreendido',
            ],
            dont: [
                'Entrar em combate corpo a corpo',
                'Gastar toda a mana rapidamente',
                'Ignorar a proteção mágica',
                'Ficar parado durante a batalha',
                'Esquecer de usar magias de controle',
            ],
        },
        builds: [
            {
                name: 'Mago Elemental',
                author: 'SpellMaster',
                rating: 4.7,
                description: 'Build focada em maximizar o dano elemental e o controle de campo. Ideal para grupos e dungeons.',
                skills: [
                    { label: 'Fireball', level: 10 },
                    { label: 'Frost Nova', level: 8 },
                    { label: 'Arcane Blast', level: 10 },
                ],
            },
        ],
    },
    
    //rogue
    {
        name: 'Rogue',
        description: 'Rogue especializado em furtividade e dano crítico',
        imageUrl: '/rogue.png',
        type: 'rogue',
        stats: [
            { title: 'Skill', value: 150, color: 'text-green-400' },
            { title: 'Magic', value: 150, color: 'text-green-400' },
            { title: 'Armor', value: 100, color: 'text-yellow-400' },
            { title: 'Defense', value: 100, color: 'text-yellow-400' },
            { title: 'Health', value: 100, color: 'text-yellow-400' },
            { title: 'Mana', value: 125, color: 'text-green-400' },
            { title: 'Capacity', value: 100, color: 'text-green-400' },
            { title: 'Hp Regen', value: 100, color: 'text-green-400' },
            { title: 'Mp Regen', value: 100, color: 'text-green-400' },
            { title: 'Attack Speed', value: 125, color: 'text-green-400' },
        ],
        playstyle: [
            {
                title: 'Assassino/Furtivo',
                description: 'O Rogue é mestre em furtividade, emboscadas e ataques críticos rápidos, preferindo atacar de surpresa e evitar confrontos diretos.',
            },
            {
                title: 'Mobilidade e Evasão',
                description: 'Utiliza sua agilidade para se mover rapidamente pelo campo de batalha, evitando ataques e buscando sempre a melhor posição para atacar.',
            },
        ],
        abilities: [
            {
                name: 'Backstab',
                description: 'Ataca o inimigo pelas costas, causando dano crítico aumentado e podendo aplicar efeitos de sangramento.',
            },
            {
                name: 'Vanish',
                description: 'Desaparece nas sombras, tornando-se invisível por alguns segundos e permitindo reposicionamento estratégico.',
            },
        ],
        recommendedEquipment: [
            {
                name: 'Adagas',
                description: 'Permitem ataques rápidos e críticos, ideais para emboscadas e combate ágil.',
            },
            {
                name: 'Arcos Curtos',
                description: 'Oferecem dano à distância e versatilidade para atacar sem ser visto.',
            },
            {
                name: 'Roupas Leves',
                description: 'Aumentam a mobilidade e facilitam a furtividade, permitindo esquivar de ataques.',
            },
            {
                name: 'Anéis de Evasão',
                description: 'Aprimoram a chance de esquiva e a resistência a efeitos negativos.',
            },
        ],
        strategy: {
            do: [
                'Aproveite a furtividade para atacar inimigos desatentos',
                'Use habilidades de evasão para evitar dano',
                'Busque sempre atacar pelas costas para maximizar o dano',
                'Mantenha-se em movimento para não ser alvo fácil',
                'Utilize armadilhas e venenos para enfraquecer os inimigos',
            ],
            dont: [
                'Enfrentar grupos grandes de inimigos de frente',
                'Ficar parado durante o combate',
                'Ignorar a importância da mobilidade',
                'Desperdiçar habilidades de fuga sem necessidade',
                'Subestimar a importância do posicionamento',
            ],
        },
        builds: [
            {
                name: 'Assassino Sombrio',
                author: 'ShadowBlade',
                rating: 4.8,
                description: 'Build focada em maximizar o dano crítico e a furtividade, ideal para eliminar alvos prioritários rapidamente.',
                skills: [
                    { label: 'Backstab', level: 10 },
                    { label: 'Vanish', level: 8 },
                    { label: 'Poison Blade', level: 10 },
                ],
            },
        ],
    },

    //squire
    {
        name: 'Squire',
        description: 'Squire especializado em combate corpo a corpo e defesa',
        imageUrl: '/squire.png',
        type: 'squire', 
        stats: [
            { title: 'Skill', value: 100, color: 'text-green-400' },
            { title: 'Magic', value: 100, color: 'text-green-400' },
            { title: 'Armor', value: 100, color: 'text-green-400' },
            { title: 'Defense', value: 100, color: 'text-green-400' },
            { title: 'Health', value: 100, color: 'text-green-400' },
            { title: 'Mana', value: 100, color: 'text-green-400' },
            { title: 'Capacity', value: 100, color: 'text-green-400' },
            { title: 'Hp Regen', value: 100, color: 'text-green-400' },
            { title: 'Mp Regen', value: 100, color: 'text-green-400' },
            { title: 'Attack Speed', value: 100, color: 'text-green-400' },
        ],
        playstyle: [
            {
                title: 'Aprendiz de Cavaleiro',
                description: 'O Squire é um guerreiro em treinamento, focado em aprender técnicas de combate e defesa para evoluir para classes mais avançadas.',
            },
            {
                title: 'Versatilidade',
                description: 'Pode atuar tanto na linha de frente quanto em suporte, adaptando-se conforme a necessidade do grupo.',
            },
        ],
        abilities: [
            {
                name: 'Golpe de Coragem',
                description: 'Desfere um ataque motivado pela determinação, causando dano adicional quando a vida está baixa.',
            },
            {
                name: 'Postura Defensiva',
                description: 'Adota uma postura que reduz o dano recebido por um curto período.',
            },
        ],
        recommendedEquipment: [
            {
                name: 'Espadas Curtas',
                description: 'Fáceis de manejar e ideais para quem está aprendendo técnicas de combate.',
            },
            {
                name: 'Escudos Leves',
                description: 'Oferecem proteção sem comprometer a mobilidade.',
            },
            {
                name: 'Armaduras de Couro',
                description: 'Boa defesa inicial sem pesar demais.',
            },
        ],
        strategy: {
            do: [
                'Aproveite a versatilidade para apoiar aliados em diferentes situações',
                'Treine diferentes armas para descobrir seu estilo preferido',
                'Use habilidades defensivas para sobreviver a ataques perigosos',
                'Busque sempre aprender com guerreiros mais experientes',
            ],
            dont: [
                'Se expor desnecessariamente ao perigo',
                'Ignorar a importância do trabalho em equipe',
                'Focar apenas em ataque e esquecer a defesa',
                'Desistir diante das dificuldades iniciais',
            ],
        },
        builds: [
            {
                name: 'Escudeiro Resiliente',
                author: 'SirNovato',
                rating: 4.2,
                description: 'Build voltada para resistência e aprendizado, ideal para quem está começando a jornada como guerreiro.',
                skills: [
                    { label: 'Golpe de Coragem', level: 7 },
                    { label: 'Postura Defensiva', level: 8 },
                ],
            },
        ],
    }
];
