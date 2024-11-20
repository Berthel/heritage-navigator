import { HeritageSite, Period, Image, OpeningHours, Tag, City } from '@/types/models';

const mockPeriods: Period[] = [
  {
    id: 'roman',
    name: {
      da: 'Romersk',
      en: 'Roman',
      pt: 'Romano'
    },
    description: {
      da: 'Den romerske periode i Tavira',
      en: 'The Roman period in Tavira',
      pt: 'O período romano em Tavira'
    },
    order: 1,
    color: '#FF9800',
    startYear: -27,  // 27 BC
    endYear: 476     // AD 476
  },
  {
    id: 'islamic',
    name: {
      da: 'Islamisk',
      en: 'Islamic',
      pt: 'Islâmico'
    },
    description: {
      da: 'Den islamiske periode i Tavira',
      en: 'The Islamic period in Tavira',
      pt: 'O período islâmico em Tavira'
    },
    order: 2,
    color: '#4CAF50',
    startYear: 711,  // AD 711
    endYear: 1249   // AD 1249
  },
  {
    id: 'medieval',
    name: {
      da: 'Middelalder',
      en: 'Medieval',
      pt: 'Medieval'
    },
    description: {
      da: 'Middelalderen i Tavira',
      en: 'The Medieval period in Tavira',
      pt: 'O período medieval em Tavira'
    },
    order: 3,
    color: '#9C27B0',
    startYear: 1249,  // AD 1249
    endYear: 1500    // AD 1500
  }
];

const mockImages: Image[] = [
  {
    id: 'castle1',
    url: '/images/sites/castle.jpg',
    thumbnailUrl: '/images/sites/castle.jpg',
    mediumUrl: '/images/sites/castle.jpg',
    largeUrl: '/images/sites/castle.jpg',
    alt: {
      da: 'Tavira Slot set fra nord',
      en: 'Tavira Castle viewed from the north',
      pt: 'Castelo de Tavira visto do norte'
    },
    caption: {
      da: 'Tavira Slot blev bygget i det 13. århundrede',
      en: 'Tavira Castle was built in the 13th century',
      pt: 'O Castelo de Tavira foi construído no século XIII'
    },
    credit: 'Tavira Municipality',
    year: 2023,
    periodId: 'medieval',
    order: 1,
    contexts: ['thumbnail', 'gallery', 'banner'],
    dimensions: {
      width: 120,
      height: 90
    }
  },
  {
    id: 'roman-bridge1',
    url: '/images/sites/bridge.jpg',
    thumbnailUrl: '/images/sites/bridge.jpg',
    mediumUrl: '/images/sites/bridge.jpg',
    largeUrl: '/images/sites/bridge.jpg',
    alt: {
      da: 'Den romerske bro i Tavira',
      en: 'The Roman Bridge in Tavira',
      pt: 'A Ponte Romana em Tavira'
    },
    credit: 'Tavira Municipality',
    year: 2023,
    periodId: 'roman',
    order: 2,
    contexts: ['thumbnail', 'gallery', 'description'],
    dimensions: {
      width: 120,
      height: 90
    }
  },
  {
    id: 'islamic1',
    url: '/images/sites/islamic.jpg',
    thumbnailUrl: '/images/sites/islamic.jpg',
    mediumUrl: '/images/sites/islamic.jpg',
    largeUrl: '/images/sites/islamic.jpg',
    alt: {
      da: 'Det islamiske kvarter i Tavira',
      en: 'The Islamic Quarter in Tavira',
      pt: 'O Bairro Islâmico em Tavira'
    },
    credit: 'Tavira Municipality',
    year: 2023,
    periodId: 'islamic',
    order: 3,
    contexts: ['thumbnail', 'gallery', 'description'],
    dimensions: {
      width: 120,
      height: 90
    }
  }
];

const mockTags: Tag[] = [
  {
    id: 'castle',
    name: {
      da: 'Slot',
      en: 'Castle',
      pt: 'Castelo'
    },
    type: 'building'
  },
  {
    id: 'museum',
    name: {
      da: 'Museum',
      en: 'Museum',
      pt: 'Museu'
    },
    type: 'activity'
  }
];

const regularOpeningHours: OpeningHours = {
  type: 'regular',
  slots: [
    { dayOfWeek: 1, opens: "09:00", closes: "17:00" },
    { dayOfWeek: 2, opens: "09:00", closes: "17:00" },
    { dayOfWeek: 3, opens: "09:00", closes: "17:00" },
    { dayOfWeek: 4, opens: "09:00", closes: "17:00" },
    { dayOfWeek: 5, opens: "09:00", closes: "17:00" }
  ]
};

const summerOpeningHours: OpeningHours = {
  type: 'seasonal',
  validFrom: '2023-06-01',
  validTo: '2023-09-30',
  slots: [
    { dayOfWeek: 1, opens: "09:00", closes: "20:00" },
    { dayOfWeek: 2, opens: "09:00", closes: "20:00" },
    { dayOfWeek: 3, opens: "09:00", closes: "20:00" },
    { dayOfWeek: 4, opens: "09:00", closes: "20:00" },
    { dayOfWeek: 5, opens: "09:00", closes: "20:00" },
    { dayOfWeek: 6, opens: "10:00", closes: "18:00" },
    { dayOfWeek: 0, opens: "10:00", closes: "18:00" }
  ]
};

export const mockCities: City[] = [
  {
    id: 'tavira',
    name: {
      da: 'Tavira',
      en: 'Tavira',
      pt: 'Tavira'
    },
    description: {
      da: 'En charmerende historisk by i Algarve, Portugal, kendt for sin rige kulturarv og arkitektur',
      en: 'A charming historical town in Algarve, Portugal, known for its rich cultural heritage and architecture',
      pt: 'Uma encantadora cidade histórica no Algarve, Portugal, conhecida pelo seu rico património cultural e arquitectura'
    },
    country: 'Portugal',
    region: 'Algarve',
    location: {
      latitude: 37.1283,
      longitude: -7.6506
    },
    bounds: {
      northeast: {
        latitude: 37.1383,
        longitude: -7.6406
      },
      southwest: {
        latitude: 37.1183,
        longitude: -7.6606
      }
    },
    defaultZoom: 15,
    primaryImage: 'tavira-aerial',  // Reference til et image ID
    images: [],  // Ville normalt indeholde byens overordnede billeder
    historicalPeriods: mockPeriods,
    tags: [],
    status: 'active',
    lastUpdated: '2024-01-15T12:00:00Z'
  }
];

export const mockSites: HeritageSite[] = [
  {
    id: 'tavira-castle',
    cityId: 'tavira',
    name: {
      da: 'Tavira Slot',
      en: 'Tavira Castle',
      pt: 'Castelo de Tavira'
    },
    description: {
      da: 'Middelalderslot med fantastisk udsigt over byen',
      en: 'Medieval castle with stunning views over the city',
      pt: 'Castelo medieval com vistas deslumbrantes sobre a cidade'
    },
    thumbnailImage: 'castle1',
    detailedInfo: {
      sections: [
        {
          type: 'text',
          content: {
            da: 'Tavira Slot blev bygget i 1200-tallet af de mauriske indbyggere. Efter den kristne reconquista blev slottet ombygget og tjente som kongelig residens. Fra toppen af slottet har man en enestående panoramaudsigt over Taviras historiske centrum, floden Gilão og helt ud til Atlanterhavet.',
            en: 'Tavira Castle was built in the 13th century by the Moorish inhabitants. After the Christian reconquista, the castle was rebuilt and served as a royal residence. From the top of the castle, there is an outstanding panoramic view of Tavira\'s historic center, the Gilão river, and all the way to the Atlantic Ocean.',
            pt: 'O Castelo de Tavira foi construído no século XIII pelos habitantes mouros. Após a reconquista cristã, o castelo foi reconstruído e serviu como residência real. Do topo do castelo, há uma vista panorâmica excepcional do centro histórico de Tavira, do rio Gilão e até ao Oceano Atlântico.'
          }
        },
        {
          type: 'image',
          content: 'castle1',
          imageLayout: 'full'
        },
        {
          type: 'gallery',
          content: ['castle1', 'roman-bridge1']
        }
      ],
      gallery: ['castle1', 'roman-bridge1']
    },
    location: {
      latitude: 37.125486311869814,
      longitude: -7.6512044168311535,
      address: 'Calçada D. Paio Peres Correia, Tavira',
      accessibility: {
        da: 'Trapper og ujævnt terræn. Ikke egnet til kørestole.',
        en: 'Stairs and uneven terrain. Not suitable for wheelchairs.',
        pt: 'Escadas e terreno irregular. Não adequado para cadeiras de rodas.'
      }
    },
    periods: [mockPeriods[2]], // Medieval
    primaryPeriod: 'medieval',
    images: mockImages,
    openingHours: [regularOpeningHours, summerOpeningHours],
    tags: [mockTags[0]], // Castle tag
    status: 'active',
    lastUpdated: '2023-11-22T12:00:00Z'
  },
  {
    id: 'roman-bridge',
    cityId: 'tavira',
    name: {
      da: 'Romersk Bro',
      en: 'Roman Bridge',
      pt: 'Ponte Romana'
    },
    description: {
      da: 'Antik romersk bro over floden Gilão',
      en: 'Ancient Roman bridge over the Gilão River',
      pt: 'Antiga ponte romana sobre o Rio Gilão'
    },
    thumbnailImage: 'roman-bridge1',
    detailedInfo: {
      sections: [
        {
          type: 'text',
          content: {
            da: 'Den Romerske Bro er et af Taviras mest ikoniske vartegn. Selvom den nuværende bro faktisk stammer fra middelalderen, er den bygget på fundamentet af en oprindelig romersk bro fra det 3. århundrede. Broen har syv buer og forbinder byens to halvdele over floden Gilão. Den har gennem århundreder været vital for byens handel og udvikling, og er stadig i dag en vigtig del af byens infrastruktur og kulturarv.',
            en: 'The Roman Bridge is one of Tavira\'s most iconic landmarks. Although the current bridge actually dates from medieval times, it is built on the foundation of an original Roman bridge from the 3rd century. The bridge has seven arches and connects the two halves of the city across the Gilão River. It has been vital to the city\'s trade and development for centuries and remains an important part of the city\'s infrastructure and cultural heritage today.',
            pt: 'A Ponte Romana é um dos marcos mais icônicos de Tavira. Embora a ponte atual date da época medieval, foi construída sobre a fundação de uma ponte romana original do século III. A ponte tem sete arcos e conecta as duas metades da cidade através do Rio Gilão. Foi vital para o comércio e desenvolvimento da cidade durante séculos e continua sendo uma parte importante da infraestrutura e do patrimônio cultural da cidade hoje.'
          }
        },
        {
          type: 'image',
          content: 'roman-bridge1',
          imageLayout: 'full'
        }
      ],
      gallery: ['roman-bridge1']
    },
    location: {
      latitude: 37.12700770825847,
      longitude: -7.649938518678061,
      address: 'Ponte Romana, Tavira',
      accessibility: {
        da: 'Let tilgængelig. Jævn overflade.',
        en: 'Easily accessible. Even surface.',
        pt: 'Facilmente acessível. Superfície plana.'
      }
    },
    periods: [mockPeriods[0]], // Roman
    primaryPeriod: 'roman',
    images: [mockImages[1]], // Roman bridge image
    openingHours: [
      {
        type: 'regular',
        slots: [
          { dayOfWeek: 0, opens: "00:00", closes: "23:59" },
          { dayOfWeek: 1, opens: "00:00", closes: "23:59" },
          { dayOfWeek: 2, opens: "00:00", closes: "23:59" },
          { dayOfWeek: 3, opens: "00:00", closes: "23:59" },
          { dayOfWeek: 4, opens: "00:00", closes: "23:59" },
          { dayOfWeek: 5, opens: "00:00", closes: "23:59" },
          { dayOfWeek: 6, opens: "00:00", closes: "23:59" }
        ]
      }
    ],
    tags: [],
    status: 'active',
    lastUpdated: '2023-11-22T12:00:00Z'
  },
  {
    id: 'islamic-museum',
    cityId: 'tavira',
    name: {
      da: 'Islamisk Museum',
      en: 'Islamic Museum',
      pt: 'Museu Islâmico'
    },
    description: {
      da: 'Museum med en rig samling af islamisk kunst og artefakter',
      en: 'Museum with a rich collection of Islamic art and artifacts',
      pt: 'Museu com uma rica coleção de arte e artefatos islâmicos'
    },
    thumbnailImage: 'islamic1',
    detailedInfo: {
      sections: [
        {
          type: 'text',
          content: {
            da: 'Det Islamiske Museum er indrettet i en restaureret bygning fra den mauriske periode. Museet huser en omfattende samling af islamiske artefakter og kunstværker fra den tid, hvor Tavira var under maurisk herredømme (711-1249). Særligt bemærkelsesværdige er samlingerne af keramik, mønter og arkitektoniske elementer, der vidner om byens rige islamiske arv. Museet tilbyder også interaktive udstillinger og regelmæssige særudstillinger om islamisk kultur og historie.',
            en: 'The Islamic Museum is housed in a restored building from the Moorish period. The museum contains an extensive collection of Islamic artifacts and artworks from the time when Tavira was under Moorish rule (711-1249). Particularly noteworthy are the collections of ceramics, coins, and architectural elements that testify to the city\'s rich Islamic heritage. The museum also offers interactive exhibitions and regular special exhibitions on Islamic culture and history.',
            pt: 'O Museu Islâmico está instalado num edifício restaurado do período mourisco. O museu contém uma extensa coleção de artefatos e obras de arte islâmicas da época em que Tavira estava sob domínio mourisco (711-1249). Particularmente notáveis são as coleções de cerâmica, moedas e elementos arquitetônicos que testemunham o rico patrimônio islâmico da cidade. O museu também oferece exposições interativas e exposições especiais regulares sobre cultura e história islâmica.'
          }
        },
        {
          type: 'image',
          content: 'islamic1',
          imageLayout: 'full'
        },
        {
          type: 'gallery',
          content: ['islamic1']
        }
      ],
      gallery: ['islamic1']
    },
    location: {
      latitude: 37.12602951058043,
      longitude: -7.650243716831138,
      address: 'Rua da Galeria, Tavira',
      accessibility: {
        da: 'Fuldt tilgængelig med elevator og ramper',
        en: 'Fully accessible with elevator and ramps',
        pt: 'Totalmente acessível com elevador e rampas'
      }
    },
    periods: [mockPeriods[1]], // Islamic
    primaryPeriod: 'islamic',
    images: [mockImages[2]],
    openingHours: [regularOpeningHours],
    tags: [mockTags[1]], // Museum tag
    status: 'active',
    lastUpdated: '2023-11-22T12:00:00Z'
  }
];
