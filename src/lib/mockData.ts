import { HeritageSite } from '@/types/models';

export const mockSites: HeritageSite[] = [
  {
    id: '1',
    name: {
      da: 'Tavira Slot',
      en: 'Tavira Castle',
      pt: 'Castelo de Tavira'
    },
    description: {
      da: 'Historisk slot fra det 8. århundrede, oprindeligt bygget af maurerne. Slottet byder på en fantastisk udsigt over Taviras gamle bydel og floden Gilão.',
      en: 'Historic castle from the 8th century, originally built by the Moors. The castle offers spectacular views over Tavira\'s old town and the Gilão river.',
      pt: 'Castelo histórico do século VIII, originalmente construído pelos mouros. O castelo oferece vistas espetaculares sobre a cidade velha de Tavira e o rio Gilão.'
    },
    detailedInfo: {
      da: 'Tavira Slot blev genopbygget i det 13. århundrede efter den kristne generobring. De originale mauriske mure og tårne er stadig synlige. Slottet har spillet en vigtig rolle i byens forsvar gennem århundrederne.',
      en: 'Tavira Castle was rebuilt in the 13th century after the Christian reconquest. The original Moorish walls and towers are still visible. The castle has played a crucial role in the city\'s defense throughout the centuries.',
      pt: 'O Castelo de Tavira foi reconstruído no século XIII após a reconquista cristã. As muralhas e torres mouriscas originais ainda são visíveis. O castelo desempenhou um papel crucial na defesa da cidade ao longo dos séculos.'
    },
    period: {
      id: '1',
      name: 'Medieval',
      color: '#724B34'
    },
    location: {
      latitude: 37.12548631187557,
      longitude: -7.651247332301158,
      address: 'Calçada D. Paio Peres Correia, Tavira'
    },
    openingHours: {
      monday: '09:00-17:00',
      tuesday: '09:00-17:00',
      wednesday: '09:00-17:00',
      thursday: '09:00-17:00',
      friday: '09:00-17:00',
      saturday: '09:00-17:00',
      sunday: '09:00-17:00'
    },
    images: [
      'tavira-castle-1.jpg',
      'tavira-castle-2.jpg'
    ]
  },
  {
    id: '2',
    name: {
      da: 'Igreja de Santa Maria do Castelo',
      en: 'Church of Santa Maria do Castelo',
      pt: 'Igreja de Santa Maria do Castelo'
    },
    description: {
      da: 'Gotisk kirke fra det 13. århundrede, bygget på ruinerne af en moské. Kirken er kendt for sine smukke azulejos og gravmæler.',
      en: 'Gothic church from the 13th century, built on the ruins of a mosque. The church is known for its beautiful azulejos and tombs.',
      pt: 'Igreja gótica do século XIII, construída sobre as ruínas de uma mesquita. A igreja é conhecida pelos seus belos azulejos e túmulos.'
    },
    detailedInfo: {
      da: 'Kirken blev grundlagt af Kong Afonso III efter den kristne generobring af Tavira. Den indeholder gravene af syv kristne riddere, der døde under et maurisk baghold i 1242.',
      en: 'The church was founded by King Afonso III after the Christian reconquest of Tavira. It contains the tombs of seven Christian knights who died during a Moorish ambush in 1242.',
      pt: 'A igreja foi fundada pelo Rei Afonso III após a reconquista cristã de Tavira. Contém os túmulos de sete cavaleiros cristãos que morreram durante uma emboscada moura em 1242.'
    },
    period: {
      id: '2',
      name: 'Gothic',
      color: '#4B4B4B'
    },
    location: {
      latitude: 37.12536221217024,
      longitude: -7.651937103464756,
      address: 'Largo de Santa Maria, Tavira'
    },
    openingHours: {
      monday: '10:00-13:00',
      tuesday: '10:00-13:00',
      wednesday: '10:00-13:00',
      thursday: '10:00-13:00',
      friday: '10:00-13:00',
      saturday: '10:00-13:00',
      sunday: '11:00-13:00'
    },
    images: [
      'santa-maria-1.jpg',
      'santa-maria-2.jpg'
    ]
  },
  {
    id: '3',
    name: {
      da: 'Romersk Bro',
      en: 'Roman Bridge',
      pt: 'Ponte Romana'
    },
    description: {
      da: 'Ikonisk bro over floden Gilão, der forbinder de to dele af Taviras historiske centrum. På trods af navnet stammer den nuværende struktur fra det 17. århundrede.',
      en: 'Iconic bridge over the Gilão river, connecting the two parts of Tavira\'s historic center. Despite its name, the current structure dates from the 17th century.',
      pt: 'Ponte icônica sobre o rio Gilão, ligando as duas partes do centro histórico de Tavira. Apesar do nome, a estrutura atual data do século XVII.'
    },
    detailedInfo: {
      da: 'Den oprindelige romerske bro blev erstattet af en maurisk konstruktion, som senere blev genopbygget i det 17. århundrede. Broen har syv buer og er et populært fotomotiv.',
      en: 'The original Roman bridge was replaced by a Moorish construction, which was later rebuilt in the 17th century. The bridge has seven arches and is a popular photography spot.',
      pt: 'A ponte romana original foi substituída por uma construção moura, que foi posteriormente reconstruída no século XVII. A ponte tem sete arcos e é um local popular para fotografia.'
    },
    period: {
      id: '3',
      name: 'Early Modern',
      color: '#8B4513'
    },
    location: {
      latitude: 37.12699915416825,
      longitude: -7.649895603464685,
      address: 'Ponte Romana, Tavira'
    },
    openingHours: {
      monday: '00:00-24:00',
      tuesday: '00:00-24:00',
      wednesday: '00:00-24:00',
      thursday: '00:00-24:00',
      friday: '00:00-24:00',
      saturday: '00:00-24:00',
      sunday: '00:00-24:00'
    },
    images: [
      'roman-bridge-1.jpg',
      'roman-bridge-2.jpg'
    ]
  }
];
