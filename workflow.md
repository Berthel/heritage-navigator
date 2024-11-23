# Heritage Navigator Database Workflow

## Initial Sprint Setup
```bash
# Start hver sprint med en ren slate ved at køre vores reset script
./scripts/reset-local-db.sh
```

Dette script vil:
1. Stash eventuelle lokale ændringer
2. Hente seneste ændringer fra main
3. Tage backup af eksisterende migrations
4. Nulstille lokal database med produktionsdata
5. Generere nye TypeScript types

## Development Workflow

### 1. Daglig Development Process (LOKALT MILJØ)
```bash
# Start din lokale Supabase instans
supabase start

# Tjek status på services
supabase status

# Lav og test dine ændringer
npm run type-check
npm run test:db

# Se hvilke ændringer du har lavet
supabase db diff
```

### 2. Feature Branch Workflow
For at holde udviklingen organiseret:

```bash
# Opret ny feature branch
git checkout -b feature/beskrivende-navn

# Commit ofte med klare beskrivelser
git add .
git commit -m "feat: beskrivelse af ændring"

# Push til GitHub
git push origin feature/beskrivende-navn
```

### 3. Database Ændringer
Når du laver ændringer i databasen:

```bash
# Opret ny migration
supabase migration new add_beskrivende_navn

# Test migrationen lokalt
supabase db reset
npm run type-check
npm run test:db

# Verify ændringer
supabase db diff
```

### 4. Production Deployment
⚠️ **ADVARSEL: Disse kommandoer påvirker production miljøet** ⚠️

Før deployment:
1. Merge din feature branch til main
2. Tag backup af production database
3. Kør alle tests
4. Deploy kun når alt er grønt

```bash
# Backup production database
supabase db dump -f backups/pre_deploy_$(date +%Y%m%d_%H%M%S).sql

# Deploy database ændringer
supabase db push

# Deploy frontend (via GitHub/Netlify)
git push origin main
```

## Quick Reference

### Lokale Kommandoer
```bash
./scripts/reset-local-db.sh  # Reset til production state
supabase start              # Start lokal database
supabase status            # Tjek services
supabase db reset          # Reset lokal database
supabase db diff           # Se ændringer
npm run type-check         # Verificer types
npm run test:db           # Kør database tests
```

### Production Kommandoer
```bash
supabase db push          # ⚠️ Deploy til production
supabase db dump         # ⚠️ Backup production
```

## Best Practices
1. Start altid ny sprint med `reset-local-db.sh`
2. Arbejd i feature branches
3. Commit ofte med beskrivende messages
4. Test grundigt før production push
5. Tag altid backup før deployment
6. Hold øje med TypeScript errors
7. Dokumenter schema ændringer

## Troubleshooting

### Database ude af sync
```bash
./scripts/reset-local-db.sh
```

### Rulle ændringer tilbage lokalt
```bash
supabase db reset
```

### Type generation fejler
```bash
supabase gen types typescript --local > src/types/supabase.ts
```

### Database ændringer mangler
```bash
# Tjek diff
supabase db diff

# Se migrations status
supabase migration list
```
