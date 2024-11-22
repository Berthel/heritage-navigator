#!/bin/bash

# Farver til output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Funktion til at vise progress
show_status() {
    echo -e "${GREEN}==>${NC} $1"
}

# Funktion til at vise advarsler
show_warning() {
    echo -e "${YELLOW}WARNING:${NC} $1"
}

# Tjek om vi er i git root
if [ ! -d ".git" ]; then
    echo "Scriptet skal køres fra git root directory"
    exit 1
fi

# Gem eventuelle lokale ændringer
show_status "Gemmer lokale ændringer..."
git stash

# Pull seneste ændringer fra main
show_status "Henter seneste ændringer fra main..."
git pull origin main

# Tag backup af nuværende migrations (bare for en sikkerheds skyld)
show_status "Tager backup af eksisterende migrations..."
if [ -d "supabase/migrations" ]; then
    timestamp=$(date +%Y%m%d_%H%M%S)
    backup_dir="supabase/migrations_backup_${timestamp}"
    mkdir -p "$backup_dir"
    cp -r supabase/migrations/* "$backup_dir"
fi

# Stop Supabase
show_status "Stopper Supabase..."
supabase stop

# Fjern eksisterende database
show_status "Fjerner eksisterende database..."
rm -rf .supabase/data

# Start Supabase igen
show_status "Starter Supabase..."
supabase start

# Dump produktionsdatabase
show_status "Tager dump af produktionsdatabase..."
supabase db dump -f schema.sql --data-only=false
supabase db dump -f data.sql --data-only=true

# Ryd den lokale database
show_status "Rydder lokal database..."
psql -h localhost -p 54322 -U postgres -d postgres -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

# Importer schema og data
show_status "Importerer schema og data..."
psql -h localhost -p 54322 -U postgres -d postgres -f schema.sql
psql -h localhost -p 54322 -U postgres -d postgres -f data.sql

# Fjern gamle migrations
show_status "Fjerner gamle migrations..."
rm -rf supabase/migrations/*

# Opret ny initial migration
show_status "Opretter ny initial migration..."
supabase migration new initial_schema

# Kopier schema til den nye migrationsfil
show_status "Kopierer schema til ny migration..."
# Find den nyeste migrations-fil
latest_migration=$(ls -t supabase/migrations/*.sql | head -1)
# Fjern Supabase's auto-genererede dele fra schema.sql og kopier til migration
sed '/-- Extensions/,/RESET ALL;/!d' schema.sql > "$latest_migration"

# Oprydning
show_status "Fjerner midlertidige filer..."
rm schema.sql data.sql

# Pop stashed changes hvis der var nogen
if [ "$(git stash list)" != "" ]; then
    show_warning "Der er gemte ændringer i stash. Kør 'git stash pop' hvis du vil have dem tilbage."
fi

show_status "Reset komplet! Din lokale database er nu synkroniseret med produktion."
show_status "Du kan nu starte med at lave nye ændringer ovenpå denne base."

# Vis ekstra information om næste skridt
echo -e "\nNæste skridt:"
echo "1. Verificer at databasen er korrekt importeret"
echo "2. Kør 'npm run type-check' for at sikre type-kompatibilitet"
echo "3. Kør dine tests for at verificere alt virker"
