import { HeritageSite, Period, Image, OpeningHours, Tag } from '@/types/models';

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
    url: '/images/castle1.jpg',
    thumbnailUrl: '/images/castle1-thumb.jpg',
    mediumUrl: '/images/castle1-medium.jpg',
    largeUrl: '/images/castle1-large.jpg',
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
      width: 1920,
      height: 1080
    }
  },
  {
    id: 'roman-ruins1',
    url: '/images/roman-ruins1.jpg',
    thumbnailUrl: '/images/roman-ruins1-thumb.jpg',
    mediumUrl: '/images/roman-ruins1-medium.jpg',
    largeUrl: '/images/roman-ruins1-large.jpg',
    alt: {
      da: 'Romerske ruiner',
      en: 'Roman ruins',
      pt: 'Ruínas romanas'
    },
    credit: 'Archaeological Museum of Tavira',
    year: 2022,
    periodId: 'roman',
    order: 2,
    contexts: ['gallery', 'description'],
    dimensions: {
      width: 1600,
      height: 900
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

export const mockSites: HeritageSite[] = [
  {
    id: 'tavira-castle',
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
          content: 'Tavira Castle was built in the 13th century...'
        },
        {
          type: 'image',
          content: 'castle1',
          imageLayout: 'full'
        },
        {
          type: 'gallery',
          content: ['castle1', 'roman-ruins1']
        }
      ],
      gallery: ['castle1', 'roman-ruins1']
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
    thumbnailImage: 'roman-ruins1',
    detailedInfo: {
      sections: [
        {
          type: 'text',
          content: 'The Roman bridge was built in...'
        },
        {
          type: 'image',
          content: 'roman-ruins1',
          imageLayout: 'full'
        }
      ],
      gallery: ['roman-ruins1']
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
    images: [mockImages[1]], // Roman ruins image
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
    thumbnailImage: 'roman-ruins1',
    detailedInfo: {
      sections: [
        {
          type: 'text',
          content: 'The Islamic Museum houses a remarkable collection showcasing the Islamic period of Tavira...'
        },
        {
          type: 'image',
          content: 'roman-ruins1',
          imageLayout: 'full'
        },
        {
          type: 'gallery',
          content: ['roman-ruins1']
        }
      ],
      gallery: ['roman-ruins1']
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
    images: [mockImages[1]],
    openingHours: [regularOpeningHours],
    tags: [mockTags[1]], // Museum tag
    status: 'active',
    lastUpdated: '2023-11-22T12:00:00Z'
  }
];
