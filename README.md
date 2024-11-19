# Heritage Navigator

En interaktiv platform der forbinder mennesker med lokalhistorien gennem stedbaserede digitale oplevelser. Projektet starter i Tavira, Portugal, med fokus på at gøre lokalhistorie tilgængelig og engagerende.

## Vision

Heritage Navigator skaber dybere forbindelser mellem besøgende og steder ved at kombinere:
- Traditionelle seværdigheder
- Personlige historier
- Skjulte perler
- Fleksibel, opdagelsesbaseret navigation

## Kernefunktioner

- GPS-baseret kortnavigation med find-vej funktionalitet
- Filtrering efter historiske perioder og temaer
- Stedbaserede historier og information
- Historiske billeder og dokumentation
- Fleksibel navigation frem for faste ruter
- Skalerbar flersproget support via database

## Tech Stack

### Frontend
- Next.js 14 med App Router
- TypeScript
- Tailwind CSS
- shadcn/ui komponenter
- Server-Side Rendering og statisk generering

### Kort & Navigation
- Leaflet og react-leaflet
- Interaktive kort med custom overlays
- GPS-integration

### Backend & Data
- Supabase som backend-as-a-service
- Authentication
- Asset hosting
- Dynamisk sprogkonfiguration via database

### Internationalisering
- next-intl for flersproget support
- Databasedrevet sproghåndtering der tillader:
  - Tilføjelse af nye sprog uden kodeændringer
  - Dynamisk opdatering af oversættelser
  - Skalerbar sprogstruktur

## Installation

1. Klon projektet
```bash
git clone https://github.com/Berthel/heritage-navigator

Installer dependencies

bashCopynpm install

Start udviklings-server

bashCopynpm run dev
Environment Variables
Opret en .env.local fil i rod-mappen:
CopyNEXT_PUBLIC_SUPABASE_URL=din_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=din_supabase_anon_key
Scripts

npm run dev - Start udviklings-server
npm run build - Byg produktions-version
npm start - Start produktions-server
npm run lint - Kør ESLint

Udviklingsstatus
Dette er version 0.8 (planlagt release januar 2025) med fokus på:

Funktionel demo-version
Grundlæggende funktionalitet
Initielt indhold for Tavira
Præsentationsklar version for interessenter

Bidrag
Vi værdsætter bidrag der fokuserer på:

Høj brugeroplevelse gennem PWA features
Skalerbar og vedligeholdbar kodebase
Effektiv data-håndtering
Performance og tilgængelighed

## Ophavsret

Copyright © 2024 Flemming Berthelsen. Alle rettigheder forbeholdes.

Dette software og tilhørende dokumentation er beskyttet af ophavsret. Uautoriseret kopiering, modifikation, distribution eller brug er ikke tilladt.

Kontakt
flemming.berthelsen@gmail.com