# Workflow for database ændringer

## Initial Setup
```bash
# Start lokal Supabase development miljø
supabase start

# Opdater .env.local med lokale credentials:
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<din-lokale-anon-key>  # Fra supabase start output
```

## Database Ændringer Workflow

### 1. Forberedelse
```bash
# Ensure du har seneste ændringer
git pull
supabase db reset  # Sync lokal database med migrations
```

### 2. Lav ny migration
```bash
# Opret ny migration fil
supabase migration new navn_på_ændring
```

### 3. Udvikling og Test
```bash
# Skriv SQL ændringer i den nye migrations fil
# Test ændringer lokalt
supabase db reset  # Nulstiller lokal database og kører alle migrations

# Verificer ændringer
supabase db diff   # Se ændringer før du committer
```

### 4. Deploy til Produktion
```bash
# Når alt virker lokalt, tag backup af produktion
supabase db dump -f backup_YYYYMMDD.sql

# Push ændringer til produktion
supabase db push   # Pusher nye migrations til produktions database
```

### 5. Type Opdatering
```bash
# Efter database ændringer, generer nye types
npm run update-types
```

### 6. Git Workflow
```bash
# Commit både migrations og de genererede types
git add supabase/migrations/YYYYMMDDHHMMSS_navn.sql
git add types/supabase.ts
git commit -m "feat: beskrivelse af database ændring"
git push
```

## Komplet Proces Opsummering:
1. Start/verificer lokal Supabase (`supabase start`)
2. Lav migration fil
3. Implementer ændringer i SQL
4. Test lokalt med `db reset` og `db diff`
5. Tag backup og push til produktion
6. Generer nye types
7. Commit alt til Git

## Nyttige Commands
```bash
# Start/stop lokalt miljø
supabase start
supabase stop

# Database management
supabase db reset    # Nulstil og kør alle migrations
supabase db diff     # Se ændringer
supabase db push     # Push til produktion
supabase db dump     # Tag backup

# Studio (admin interface)
supabase status      # Se URLs og credentials
```

## Debugging Tips
- Brug Supabase Studio UI på `http://localhost:54323` til at inspicere data
- Check migrations folder for rækkefølge af ændringer
- Brug `db diff` til at verificere ændringer før push
- Tag altid backup før push til produktion
