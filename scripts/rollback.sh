#!/bin/bash
# rollback.sh
# Ruller tilbage til en tidligere version af appen

# Farver til output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "${YELLOW}Heritage Navigator - Rollback Script${NC}"
echo "----------------------------------------"

# Liste seneste commits
echo "${GREEN}Seneste commits:${NC}"
git log --oneline -n 5

# Få commit hash fra bruger
read -p "Indtast commit hash du vil rulle tilbage til: " commit_hash

# Tjek om det er en database rollback
read -p "Skal databasen også rulles tilbage? (y/n) " -n 1 -r
echo

# Udfør rollback
echo "${YELLOW}Ruller tilbage til commit $commit_hash...${NC}"

if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Database rollback
    echo "${YELLOW}Finder seneste database backup...${NC}"
    latest_backup=$(ls -t supabase/backups/pre_deploy_* | head -n 1)
    
    if [ -n "$latest_backup" ]; then
        echo "${GREEN}Ruller database tilbage til $latest_backup...${NC}"
        supabase db reset --db-url $latest_backup
    else
        echo "${RED}Ingen database backups fundet!${NC}"
        exit 1
    fi
fi

# Frontend rollback
git reset --hard $commit_hash
git push -f origin main

echo "${GREEN}Rollback completed!${NC}"
echo "Du har nu rullet tilbage til commit $commit_hash"
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Database er også rullet tilbage til seneste backup før denne commit"
fi
