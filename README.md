# Heritage Navigator - Tavira Kulturarvsguide

En Progressive Web App der guider besøgende gennem Taviras historiske steder og kulturarv.

## Funktioner

- Interaktivt kort med historiske lokationer (via OpenStreetMap)
- Liste over seværdigheder med detaljerede informationer
- Filtrering efter historiske perioder
- Offline tilgængelighed
- Flersproget support (dansk, engelsk, portugisisk)

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui komponenter
- Leaflet for kort integration
- Supabase for database
- PWA funktionalitet

## Installation

1. Klon projektet
```bash
git clone [repository-url]
```

2. Installer dependencies
```bash
npm install
```

3. Start udviklings-server
```bash
npm run dev
```

## Environment Variables

Opret en `.env.local` fil i rod-mappen med følgende variabler:
```
NEXT_PUBLIC_SUPABASE_URL=din_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=din_supabase_anon_key
```

## Scripts

- `npm run dev` - Start udviklings-server
- `npm run build` - Byg produktions-version
- `npm start` - Start produktions-server
- `npm run lint` - Kør ESLint
