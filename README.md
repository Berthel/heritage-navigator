# Heritage Navigator

En interaktiv platform der forbinder mennesker med lokalhistorien gennem stedbaserede digitale oplevelser i Tavira, Portugal.

[![Build Status](https://github.com/Berthel/heritage-navigator/workflows/CI/badge.svg)]()
[![Version](https://img.shields.io/badge/version-0.8-blue)]()
[![License](https://img.shields.io/badge/license-Copyright%20%C2%A9%202024-red)]()

## Vision

Heritage Navigator skaber dybere forbindelser mellem besøgende og steder ved at kombinere:
- Traditionelle seværdigheder med personlige historier
- Skjulte perler og lokal viden
- Fleksibel, opdagelsesbaseret navigation
- Historisk kontekst og nutidige oplevelser

## Kernefunktioner

- Intuitiv kortnavigation med GPS og find-vej
- Historiske perioder og tematisk filtrering
- Flersprogssupport (Dansk, Engelsk, Portugisisk)
- Offline-kapable stedsbeskrivelser
- Historiske billeder og dokumentation
- Favorit-markering af steder
- Delingsmuligheder for lokationer

## Tech Stack

### Frontend
- Next.js 14 med App Router
- TypeScript
- Tailwind CSS
- shadcn/ui komponenter
- Server-Side Rendering
- Progressive Web App features

### Kort & Navigation
- Leaflet og react-leaflet
- Interaktive kort med custom markers
- GPS-integration
- Offline kort-tiles

### Backend (Supabase)
- PostgreSQL database med PostGIS
- Blob storage til medier
- Row Level Security
- Edge Functions (Phase 2)

### Internationalisering
- next-intl for flersproget support
- Database-drevet sproghåndtering
- Dynamisk tilføjelse af nye sprog
- Skalerbar oversættelsesstruktur

## Forudsætninger

- Node.js 18.17 eller nyere
- npm 9.x eller nyere
- Git

## Installation

```bash
git clone https://github.com/Berthel/heritage-navigator
cd heritage-navigator
npm install
```

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=din_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=din_supabase_anon_key
```

### Scripts
```bash
npm run dev    # Start udviklings-server
npm run build  # Byg produktions-version
npm start      # Start produktions-server
npm run lint   # Kør ESLint
```
### Process for databaseændringer med Supabase og Git integration:
Database Ændringer:

Alle database ændringer skal laves som migrations i supabase/migrations mappen
Hver migration er en SQL fil med format: YYYYMMDDHHMMSS_beskrivende_navn.sql
Du kører aldrig direkte SQL mod databasen, alt går gennem migrations


## Workflow for Ændringer:
Følg andvisningerne i dokumentet workflow-doc.md



## Browser Support

- Chrome (seneste 2 versioner)
- Firefox (seneste 2 versioner)
- Safari (seneste 2 versioner)
- Edge (seneste 2 versioner)
- Mobil Safari iOS 14+
- Chrome for Android

## Udviklingsstatus

Version 0.8 (Q1 2025) fokuserer på:
- MVP funktionalitet
- 20 kvalitetssikrede lokationer
- Flersprogssupport (DA, EN, PT)
- Performance optimering
- Offline funktionalitet
- PWA implementation

## Bidrag

Vi værdsætter bidrag der fokuserer på:
- Høj brugeroplevelse gennem PWA features
- Skalerbar og vedligeholdbar kodebase
- Effektiv data-håndtering
- Performance og tilgængelighed

For at bidrage:
1. Fork projektet
2. Opret en feature branch
3. Commit dine ændringer
4. Push til branch
5. Åbn en Pull Request

## Ophavsret

Copyright © 2024 Flemming Berthelsen. Alle rettigheder forbeholdes.

Dette software og tilhørende dokumentation er beskyttet af ophavsret. Uautoriseret kopiering, modifikation, distribution eller brug er ikke tilladt.

## Kontakt

flemming.berthelsen@gmail.com