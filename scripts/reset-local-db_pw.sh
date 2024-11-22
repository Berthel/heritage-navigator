#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

show_status() {
    echo -e "${GREEN}==>${NC} $1"
}

show_warning() {
    echo -e "${YELLOW}WARNING:${NC} $1"
}

show_error() {
    echo -e "${RED}ERROR:${NC} $1"
    exit 1
}

export PGPASSWORD="postgres"

count_rows() {
    local table=$1
    local count=$(PGPASSWORD=postgres psql -h localhost -p 54322 -U postgres -d postgres -t -c "SELECT COUNT(*) FROM $table 2>/dev/null" | tr -d '[:space:]')
    if [ $? -eq 0 ]; then
        echo "$count"
    else
        echo "0"
    fi
}

# Check if in git root
if [ ! -d ".git" ]; then
    show_error "Script must be run from git root directory"
fi

# Create required directories
show_status "Preparing directories..."
DUMPS_DIR="supabase/dumps"
BACKUP_DIR="supabase/migrations_backup"
MIGRATIONS_DIR="supabase/migrations"
mkdir -p "$DUMPS_DIR"
mkdir -p "$BACKUP_DIR"
mkdir -p "$MIGRATIONS_DIR"

# Stash local changes
show_status "Stashing local changes..."
git stash

# Pull latest from main
show_status "Pulling latest changes from main..."
git pull origin main

# Backup existing migrations
show_status "Backing up existing migrations..."
if [ -d "$MIGRATIONS_DIR" ] && [ "$(ls -A $MIGRATIONS_DIR)" ]; then
    timestamp=$(date +%Y%m%d_%H%M%S)
    backup_path="$BACKUP_DIR/migrations_${timestamp}"
    mkdir -p "$backup_path"
    cp -r "$MIGRATIONS_DIR"/* "$backup_path"
fi

# Stop Supabase
show_status "Stopping Supabase..."
supabase stop || show_error "Could not stop Supabase"

# Remove existing database
show_status "Removing existing database..."
rm -rf .supabase/data

# Start Supabase
show_status "Starting Supabase..."
supabase start || show_error "Could not start Supabase"

# Generate timestamp for migration files
TIMESTAMP=$(date +%Y%m%d%H%M%S)

# Create migration files
SCHEMA_MIGRATION="${MIGRATIONS_DIR}/${TIMESTAMP}a_schema.sql"
DATA_MIGRATION="${MIGRATIONS_DIR}/${TIMESTAMP}b_data.sql"

# Dump production database
show_status "Dumping production database..."
supabase db dump -f "$SCHEMA_MIGRATION" --data-only=false || show_error "Could not dump schema"
supabase db dump -f "$DATA_MIGRATION" --data-only=true || show_error "Could not dump data"

# Also save dumps to dumps directory
cp "$SCHEMA_MIGRATION" "$DUMPS_DIR/schema_${TIMESTAMP}.sql"
cp "$DATA_MIGRATION" "$DUMPS_DIR/data_${TIMESTAMP}.sql"

# Clear local database
show_status "Clearing local database..."
psql -h localhost -p 54322 -U postgres -d postgres -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;" || show_error "Could not reset database"

# Import schema and data
show_status "Importing schema and data..."
psql -h localhost -p 54322 -U postgres -d postgres -f "$SCHEMA_MIGRATION" || show_error "Could not import schema"
psql -h localhost -p 54322 -U postgres -d postgres -f "$DATA_MIGRATION" || show_error "Could not import data"

# Verify multi-location tables
show_status "Verifying database structure..."
required_tables=("cities" "heritage_sites" "periods" "languages" "city_translations" "heritage_site_translations")
for table in "${required_tables[@]}"; do
    count=$(count_rows $table)
    echo "- $table: $count rows"
    if [ "$count" == "0" ]; then
        show_warning "No data in $table"
    fi
done

# Clean up old dumps (keep last 5)
show_status "Cleaning up old dumps..."
cd "$DUMPS_DIR" && ls -t schema_* | tail -n +6 | xargs -r rm
cd "$DUMPS_DIR" && ls -t data_* | tail -n +6 | xargs -r rm
cd - > /dev/null

# Pop stashed changes if any
if [ "$(git stash list)" != "" ]; then
    show_warning "There are stashed changes. Run 'git stash pop' to retrieve them."
fi

show_status "Reset complete! Your local database is now synchronized with production."
show_status "Dumps are saved in $DUMPS_DIR"
show_status "Migration backups are saved in $BACKUP_DIR"

# Show next steps
echo -e "\nNext steps:"
echo "1. Verify database import"
echo "2. Run 'npm run type-check' to ensure type compatibility"
echo "3. Run your tests to verify everything works"

# Show dump locations
echo -e "\nDumps from this run:"
echo "Schema migration: $SCHEMA_MIGRATION"
echo "Data migration: $DATA_MIGRATION"