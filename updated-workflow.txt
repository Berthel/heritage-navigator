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

### 2. Løbende Deployment Process (LOKALT MILJØ)
For at fange og rette fejl tidligt bør du lave hyppige deployments til dit lokale miljø:

```bash
# Gem dine ændringer i en ny migration
supabase migration new descriptive_name

# Test migrationen lokalt
supabase db reset  # KUN LOKALT - nulstiller din lokale db
npm run type-check
npm run test:db

# Verify ændringer
supabase db diff  # Tjek at ændringerne er som forventet
```

### 3. Production Deployment Process (KUN NÅR ALT ER TESTET)
⚠️ **ADVARSEL: Disse kommandoer påvirker production miljøet** ⚠️

Før du deployer til production:
1. Sørg for alle tests er grønne
2. Lav en backup af production
3. Hav en rollback plan klar

```bash
# Tag backup før deployment
supabase db dump --file backups/pre_deploy_$(date +%Y%m%d_%H%M%S).sql

# Deploy ændringer til production
supabase db push  # ⚠️ DETTE PÅVIRKER PRODUCTION ⚠️

# Verificer deployment
npm run verify-deployment
```

## Quick Reference

### Lokale Kommandoer (Sikre at bruge)
- `./scripts/reset-local-db.sh` - Reset lokal database til production state
- `supabase start` - Start lokal Supabase
- `supabase status` - Tjek status
- `supabase db reset` - Reset lokal database
- `supabase db diff` - Se ændringer
- `npm run type-check` - Verificer types
- `npm run test:db` - Kør database tests

### Production Kommandoer (Brug med forsigtighed)
- `supabase db push` - ⚠️ Deploy til production
- `supabase db dump` - ⚠️ Backup production
- `npm run verify-deployment` - ⚠️ Tjek production deployment

## Best Practices
1. Start altid en ny sprint med `reset-local-db.sh`
2. Lav hyppige lokale deployments
3. Test grundigt før production deployment
4. Tag altid backup før production ændringer
5. Dokumenter alle schema ændringer
6. Hold øje med type errors
7. Kør tests ofte

## Common Issues & Solutions
1. Hvis din lokale database er ude af sync:
   ```bash
   ./scripts/reset-local-db.sh
   ```

2. Hvis du har lavet ændringer du vil rulle tilbage:
   ```bash
   # LOKALT
   supabase db reset
   ```

3. Type errors efter schema ændringer:
   ```bash
   supabase gen types typescript --local > src/types/supabase.ts
   ```