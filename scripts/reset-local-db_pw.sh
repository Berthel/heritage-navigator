#!/bin/bash

# Farver til output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Funktion til at vise progress
show_status() {
    echo -e "${GREEN}==>${NC} $1"
}

# Funktion til at vise advarsler
show_warning() {
    echo -e "${YELLOW}WARNING:${NC} $1"
}

# Funktion til at vise fejl
show_error() {
    echo -e "${RED}ERROR:${NC} $1"
    exit 1
}

# Sæt database password
export PGPASSWORD="postgres"

# Funktion til at tælle rækker i en tabel
count_rows() {
    local table=$1
    local count=$(PGPASSWORD=postgres psql -h localhost -p 54322 -U postgres -d postgres -t -c "SELECT COUNT(*) FROM $table 2>/dev/null" | tr -d '[:space:]')
    if [ $? -eq 0 ]; then
        echo "$count"
    else
        echo "0"
    fi
}

# Tjek om vi er i git root
if [ ! -d ".git" ]; then
    show_error "Scriptet skal køres fra git root directory"
fi

# Opret nødvendige directories
show_status "Forbereder directories..."
DUMPS_DIR="supabase/dumps"
BACKUP_DIR="supabase/migrations_backup"
mkdir -p "$DUMPS_DIR"
mkdir -p "$BACKUP_DIR"

# Gem eventuelle lokale ændringer
show_status "Gemmer lokale ændringer..."
git stash

# Pull seneste ændringer fra main
show_status "Henter seneste ændringer fra main..."
git pull origin main

# Tag backup af nuværende migrations
show_status "Tager backup af eksisterende migrations..."
if [ -d "supabase/migrations" ]; then
    timestamp=$(date +%Y%m%d_%H%M%S)
    backup_path="$BACKUP_DIR/migrations_${timestamp}"
    mkdir -p "$backup_path"
    cp -r supabase/migrations/* "$backup_path"
fi

# Stop Supabase
show_status "Stopper Supabase..."
supabase stop || show_error "Kunne ikke stoppe Supabase"

# Fjern eksisterende database
show_status "Fjerner eksisterende database..."
rm -rf .supabase/data

# Start Supabase igen
show_status "Starter Supabase..."
supabase start || show_error "Kunne ikke starte Supabase"

# Dump produktionsdatabase med timestamp
show_status "Tager dump af produktionsdatabase..."
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
SCHEMA_FILE="$DUMPS_DIR/schema_${TIMESTAMP}.sql"
DATA_FILE="$DUMPS_DIR/data_${TIMESTAMP}.sql"

supabase db dump -f "$SCHEMA_FILE" --data-only=false || show_error "Kunne ikke dumpe schema"
supabase db dump -f "$DATA_FILE" --data-only=true || show_error "Kunne ikke dumpe data"

# Ryd den lokale database
show_status "Rydder lokal database..."
psql -h localhost -p 54322 -U postgres -d postgres -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;" || show_error "Kunne ikke nulstille database"

# Importer schema og data
show_status "Importerer schema og data..."
psql -h localhost -p 54322 -U postgres -d postgres -f "$SCHEMA_FILE" || show_error "Kunne ikke importere schema"
psql -h localhost -p 54322 -U postgres -d postgres -f "$DATA_FILE" || show_error "Kunne ikke importere data"

# Verificer multi-location tabeller
show_status "Verificerer database struktur..."
required_tables=("cities" "heritage_sites" "periods" "languages" "city_translations" "heritage_site_translations")
for table in "${required_tables[@]}"; do
    count=$(count_rows $table)
    echo "- $table: $count rækker"
    if [ "$count" == "0" ]; then
        show_warning "Ingen data i $table"
    fi
done

# Fjern gamle migrations
show_status "Fjerner gamle migrations..."
rm -rf supabase/migrations/*

# Opret ny initial migration
show_status "Opretter ny initial migration..."
supabase migration new initial_schema || show_error "Kunne ikke oprette ny migration"

# Kopier schema til den nye migrationsfil
show_status "Kopierer schema til ny migration..."
latest_migration=$(ls -t supabase/migrations/*.sql | head -1)
# Fjern Supabase's auto-genererede dele fra schema.sql og kopier til migration
sed '/-- Extensions/,/RESET ALL;/!d' "$SCHEMA_FILE" > "$latest_migration"

# Ryd gamle dumps (behold sidste 5)
show_status "Oprydning i gamle dumps..."
cd "$DUMPS_DIR" && ls -t schema_* | tail -n +6 | xargs -r rm
cd "$DUMPS_DIR" && ls -t data_* | tail -n +6 | xargs -r rm
cd - > /dev/null

# Pop stashed changes hvis der var nogen
if [ "$(git stash list)" != "" ]; then
    show_warning "Der er gemte ændringer i stash. Kør 'git stash pop' hvis du vil have dem tilbage."
fi

show_status "Reset komplet! Din lokale database er nu synkroniseret med produktion."
show_status "Dumps er gemt i $DUMPS_DIR"
show_status "Migration backups er gemt i $BACKUP_DIR"

# Vis ekstra information om næste skridt
echo -e "\nNæste skridt:"
echo "1. Verificer at databasen er korrekt importeret"
echo "2. Kør 'npm run type-check' for at sikre type-kompatibilitet"
echo "3. Kør dine tests for at verificere alt virker"

# Vis placering af dumps
echo -e "\nDumps fra denne kørsel:"
echo "Schema: $SCHEMA_FILE"
echo "Data: $DATA_FILE"
