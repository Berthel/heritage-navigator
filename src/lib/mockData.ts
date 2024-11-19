import { HeritageSite, Period, Tag } from '@/types/models';

// Perioder
export const periods: Period[] = [
  {
    id: 'medieval',
    name: {
      da: 'Middelalder',
      en: 'Medieval',
      pt: 'Medieval'
    },
    description: {
      da: 'Perioden fra det 5. til det 15. århundrede',
      en: 'The period from the 5th to the 15th century',
      pt: 'O período do século V ao século XV'
    },
    startYear: 500,
    endYear: 1500,
    color: '#724B34',
    order: 1
  },
  {
    id: 'roman',
    name: {
      da: 'Romersk',
      en: 'Roman',
      pt: 'Romano'
    },
    description: {
      da: 'Den romerske periode i Portugal',
      en: 'The Roman period in Portugal',
      pt: 'O período romano em Portugal'
    },
    startYear: -200,
    endYear: 500,
    color: '#8B0000',
    order: 0
  }
];

// Tags
export const tags: Tag[] = [
  {
    id: 'castle',
    name: {
      da: 'Slot',
      en: 'Castle',
      pt: 'Castelo'
    }
  },
  {
    id: 'church',
    name: {
      da: 'Kirke',
      en: 'Church',
      pt: 'Igreja'
    }
  },
  {
    id: 'bridge',
    name: {
      da: 'Bro',
      en: 'Bridge',
      pt: 'Ponte'
    }
  }
];

export const mockSites: HeritageSite[] = [
  {
    id: '1',
    name: {
      da: 'Tavira Slot',
      en: 'Tavira Castle',
      pt: 'Castelo de Tavira'
    },
    description: {
      da: 'Historisk slot fra det 8. århundrede, oprindeligt bygget af maurerne',
      en: 'Historic castle from the 8th century, originally built by the Moors',
      pt: 'Castelo histórico do século VIII, originalmente construído pelos mouros'
    },
    detailedInfo: {
      da: 'Tavira Slot blev genopbygget i det 13. århundrede efter den kristne generobring',
      en: 'Tavira Castle was rebuilt in the 13th century after the Christian reconquest',
      pt: 'O Castelo de Tavira foi reconstruído no século XIII após a reconquista cristã'
    },
    location: {
      id: 'tavira-castle-loc',
      latitude: 37.12548631187557,
      longitude: -7.651247332301158,
      address: {
        da: 'Calçada D. Paio Peres Correia, Tavira',
        en: 'Calçada D. Paio Peres Correia, Tavira',
        pt: 'Calçada D. Paio Peres Correia, Tavira'
      },
      accessibility: {
        da: 'Trapper og ujævnt terræn. Begrænset adgang for kørestolsbrugere',
        en: 'Stairs and uneven terrain. Limited wheelchair access',
        pt: 'Escadas e terreno irregular. Acesso limitado para cadeiras de rodas'
      }
    },
    periods: [periods[0]], // Medieval
    primaryPeriod: 'medieval',
    images: [
      {
        id: 'castle-1',
        url: '/images/tavira-castle-1.jpg',
        alt: {
          da: 'Tavira Slot set fra oven',
          en: 'Aerial view of Tavira Castle',
          pt: 'Vista aérea do Castelo de Tavira'
        },
        caption: {
          da: 'Slottets mure og tårne set fra luften',
          en: 'The castle walls and towers from above',
          pt: 'As muralhas e torres do castelo vistas de cima'
        },
        credit: 'Tavira Tourism Board',
        year: 2022,
        order: 1
      }
    ],
    openingHours: [
      {
        weekday: 1, // Monday
        slots: [{ open: '09:00', close: '17:00' }]
      },
      {
        weekday: 2, // Tuesday
        slots: [{ open: '09:00', close: '17:00' }]
      },
      {
        weekday: 3, // Wednesday
        slots: [{ open: '09:00', close: '17:00' }]
      },
      {
        weekday: 4, // Thursday
        slots: [{ open: '09:00', close: '17:00' }]
      },
      {
        weekday: 5, // Friday
        slots: [{ open: '09:00', close: '17:00' }]
      },
      {
        weekday: 6, // Saturday
        slots: [{ open: '10:00', close: '16:00' }]
      },
      {
        weekday: 0, // Sunday
        slots: [{ open: '10:00', close: '16:00' }]
      }
    ],
    tags: [tags[0]], // Castle tag
    status: 'active',
    lastUpdated: '2024-01-15T12:00:00Z'
  },
  {
    id: '2',
    name: {
      da: 'Igreja de Santa Maria do Castelo',
      en: 'Church of Santa Maria do Castelo',
      pt: 'Igreja de Santa Maria do Castelo'
    },
    description: {
      da: 'Gotisk kirke fra det 13. århundrede, bygget på ruinerne af en moské',
      en: 'Gothic church from the 13th century, built on the ruins of a mosque',
      pt: 'Igreja gótica do século XIII, construída sobre as ruínas de uma mesquita'
    },
    detailedInfo: {
      da: 'Kirken blev grundlagt af Kong Afonso III efter den kristne generobring af Tavira',
      en: 'The church was founded by King Afonso III after the Christian reconquest of Tavira',
      pt: 'A igreja foi fundada pelo Rei Afonso III após a reconquista cristã de Tavira'
    },
    location: {
      id: 'santa-maria-loc',
      latitude: 37.12536221217024,
      longitude: -7.651937103464756,
      address: {
        da: 'Largo de Santa Maria, Tavira',
        en: 'Largo de Santa Maria, Tavira',
        pt: 'Largo de Santa Maria, Tavira'
      },
      accessibility: {
        da: 'Trapper og ujævnt terræn. Begrænset adgang for kørestolsbrugere',
        en: 'Stairs and uneven terrain. Limited wheelchair access',
        pt: 'Escadas e terreno irregular. Acesso limitado para cadeiras de rodas'
      }
    },
    periods: [periods[0]], // Medieval
    primaryPeriod: 'medieval',
    images: [
      {
        id: 'santa-maria-1',
        url: '/images/santa-maria-1.jpg',
        alt: {
          da: 'Igreja de Santa Maria do Castelo',
          en: 'Church of Santa Maria do Castelo',
          pt: 'Igreja de Santa Maria do Castelo'
        },
        caption: {
          da: 'Kirken set fra gaden',
          en: 'The church from the street',
          pt: 'A igreja vista da rua'
        },
        credit: 'Tavira Tourism Board',
        year: 2022,
        order: 1
      }
    ],
    openingHours: [
      {
        weekday: 1, // Monday
        slots: [{ open: '10:00', close: '13:00' }]
      },
      {
        weekday: 2, // Tuesday
        slots: [{ open: '10:00', close: '13:00' }]
      },
      {
        weekday: 3, // Wednesday
        slots: [{ open: '10:00', close: '13:00' }]
      },
      {
        weekday: 4, // Thursday
        slots: [{ open: '10:00', close: '13:00' }]
      },
      {
        weekday: 5, // Friday
        slots: [{ open: '10:00', close: '13:00' }]
      },
      {
        weekday: 6, // Saturday
        slots: [{ open: '10:00', close: '13:00' }]
      },
      {
        weekday: 0, // Sunday
        slots: [{ open: '11:00', close: '13:00' }]
      }
    ],
    tags: [tags[1]], // Church tag
    status: 'active',
    lastUpdated: '2024-01-15T12:00:00Z'
  },
  {
    id: '3',
    name: {
      da: 'Romersk Bro',
      en: 'Roman Bridge',
      pt: 'Ponte Romana'
    },
    description: {
      da: 'Ikonisk bro over floden Gilão, der forbinder de to dele af Taviras historiske centrum',
      en: 'Iconic bridge over the Gilão river, connecting the two parts of Tavira\'s historic center',
      pt: 'Ponte icônica sobre o rio Gilão, ligando as duas partes do centro histórico de Tavira'
    },
    detailedInfo: {
      da: 'Den oprindelige romerske bro blev erstattet af en maurisk konstruktion, som senere blev genopbygget i det 17. århundrede',
      en: 'The original Roman bridge was replaced by a Moorish construction, which was later rebuilt in the 17th century',
      pt: 'A ponte romana original foi substituída por uma construção moura, que foi posteriormente reconstruída no século XVII'
    },
    location: {
      id: 'roman-bridge-loc',
      latitude: 37.12699915416825,
      longitude: -7.649895603464685,
      address: {
        da: 'Ponte Romana, Tavira',
        en: 'Ponte Romana, Tavira',
        pt: 'Ponte Romana, Tavira'
      },
      accessibility: {
        da: 'Trapper og ujævnt terræn. Begrænset adgang for kørestolsbrugere',
        en: 'Stairs and uneven terrain. Limited wheelchair access',
        pt: 'Escadas e terreno irregular. Acesso limitado para cadeiras de rodas'
      }
    },
    periods: [periods[1]], // Roman
    primaryPeriod: 'roman',
    images: [
      {
        id: 'roman-bridge-1',
        url: '/images/roman-bridge-1.jpg',
        alt: {
          da: 'Romersk Bro',
          en: 'Roman Bridge',
          pt: 'Ponte Romana'
        },
        caption: {
          da: 'Broen set fra floden',
          en: 'The bridge from the river',
          pt: 'A ponte vista do rio'
        },
        credit: 'Tavira Tourism Board',
        year: 2022,
        order: 1
      }
    ],
    openingHours: [
      {
        weekday: 1, // Monday
        slots: [{ open: '00:00', close: '24:00' }]
      },
      {
        weekday: 2, // Tuesday
        slots: [{ open: '00:00', close: '24:00' }]
      },
      {
        weekday: 3, // Wednesday
        slots: [{ open: '00:00', close: '24:00' }]
      },
      {
        weekday: 4, // Thursday
        slots: [{ open: '00:00', close: '24:00' }]
      },
      {
        weekday: 5, // Friday
        slots: [{ open: '00:00', close: '24:00' }]
      },
      {
        weekday: 6, // Saturday
        slots: [{ open: '00:00', close: '24:00' }]
      },
      {
        weekday: 0, // Sunday
        slots: [{ open: '00:00', close: '24:00' }]
      }
    ],
    tags: [tags[2]], // Bridge tag
    status: 'active',
    lastUpdated: '2024-01-15T12:00:00Z'
  }
];
