#!/bin/bash
# dev-workflow.sh
# Dagligt udviklings-workflow for Heritage Navigator

# Farver til output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Funktion til at tjekke Supabase status
check_supabase_status() {
    status=$(supabase status)
    if [[ $status == *"online"* ]]; then
        return 0
    else
        return 1
    fi
}

echo "${YELLOW}Heritage Navigator - Development Workflow${NC}"
echo "----------------------------------------"

# 1. Tjek Supabase status og start hvis nødvendigt
if ! check_supabase_status; then
    echo "${YELLOW}Starter Supabase...${NC}"
    supabase start
fi

# 2. Kør type check
echo "${GREEN}Kører type check...${NC}"
npm run type-check

# 3. Kør tests
echo "${GREEN}Kører tests...${NC}"
npm run test

# 4. Vis ændringer i database
echo "${GREEN}Database ændringer siden sidste migration:${NC}"
supabase db diff

# 5. Spørg om migration skal oprettes
read -p "Vil du oprette en ny migration? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Beskriv ændringen (eks: add_user_preferences): " migration_name
    supabase migration new $migration_name
    echo "${GREEN}Migration oprettet: $migration_name${NC}"
fi

# 6. Deploy changes
read -p "Vil du deploye ændringer? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Tag backup før deployment
    timestamp=$(date +%Y%m%d_%H%M%S)
    supabase db dump --file "supabase/backups/pre_deploy_${timestamp}.sql"
    
    # Deploy til production
    echo "${YELLOW}Deployer ændringer...${NC}"
    supabase db push
    
    # Build og deploy frontend
    npm run build
    git add .
    git commit -m "Deploy: $timestamp"
    git push origin main
fi

echo "${GREEN}Workflow completed!${NC}"
