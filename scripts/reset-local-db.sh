#!/bin/bash
# reset-local-db.sh
# Reset lokal database til en ren slate ved start af nyt sprint

# Farver til output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "${YELLOW}Heritage Navigator - Database Reset Script${NC}"
echo "----------------------------------------"

# Tjek om vi er i rod-mappen
if [ ! -f "package.json" ]; then
    echo "${RED}Fejl: Kør venligst dette script fra projekt-roden${NC}"
    exit 1
fi

# 1. Stash eventuelle lokale ændringer
echo "${GREEN}1. Gemmer lokale ændringer...${NC}"
git stash

# 2. Hent seneste ændringer fra main
echo "${GREEN}2. Henter seneste ændringer...${NC}"
git checkout main
git pull origin main

# 3. Tag backup af eksisterende migrations
echo "${GREEN}3. Backup af eksisterende migrations...${NC}"
timestamp=$(date +%Y%m%d_%H%M%S)
if [ -d "supabase/migrations" ]; then
    mkdir -p "supabase/backups"
    zip -r "supabase/backups/migrations_${timestamp}.zip" supabase/migrations/
fi

# 4. Stop og start Supabase med ren slate
echo "${GREEN}4. Nulstiller lokal Supabase...${NC}"
supabase stop
rm -rf supabase/migrations/*
supabase start

# 5. Generer nye TypeScript types
echo "${GREEN}5. Genererer TypeScript types...${NC}"
supabase gen types typescript --local > src/types/supabase.ts

echo "${GREEN}Database er nulstillet og klar til nyt sprint!${NC}"
echo "----------------------------------------"

# Vis eventuelle fejl i migrations
if [ $? -ne 0 ]; then
    echo "${RED}Der opstod fejl under reset. Tjek output ovenfor.${NC}"
    exit 1
fi

echo "${GREEN}Success! Din lokale database er nu synkroniseret med production.${NC}"
echo "Du kan nu begynde dit nye sprint."
