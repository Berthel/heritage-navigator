#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

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

# Database configuration
DB_HOST="localhost"
DB_PORT="54322"
DB_USER="postgres"
DB_NAME="postgres"

# Ensure PGPASSWORD is set externally or prompt the user
if [ -z "$PGPASSWORD" ]; then
    read -s -p "Enter PostgreSQL password: " PGPASSWORD
    export PGPASSWORD
    echo
fi

count_rows() {
    local table=$1
    local count
    count=$(psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -t -c "SELECT COUNT(*) FROM $table;" 2>/dev/null | tr -d '[:space:]')
    echo "${count:-0}"
}

# Check if in git root
if [ ! -d ".git" ]; then
    show_error "Script must be run from the git root directory."
fi

# Create required directories
show_status "Preparing directories..."
DUMPS_DIR="supabase/dumps"
BACKUP_DIR="supabase/migrations_backup"
MIGRATIONS_DIR="supabase/migrations"
mkdir -p "$DUMPS_DIR" || show_error "Failed to create dumps directory."
mkdir -p "$BACKUP_DIR" || show_error "Failed to create backup directory."
mkdir -p "$MIGRATIONS_DIR" || show_error "Failed to create migrations directory."

# Check for unstaged changes before stashing
if ! git diff-index --quiet HEAD --; then
    show_status "Stashing local changes..."
    git stash push -u || show_error "Failed to stash changes."
    STASHED=true
else
    STASHED=false
fi

# Pull latest from main
show_status "Pulling latest changes from main..."
git pull origin main || show_error "Failed to pull latest changes from main."

# Backup existing migrations
show_status "Backing up existing migrations..."
if [ -d "$MIGRATIONS_DIR" ] && [ "$(ls -A "$MIGRATIONS_DIR")" ]; then
    timestamp=$(date +%Y%m%d_%H%M%S)
    backup_path="$BACKUP_DIR/migrations_${timestamp}"
    mkdir -p "$backup_path" || show_error "Failed to create backup path."
    cp -r "$MIGRATIONS_DIR"/* "$backup_path" || show_error "Failed to backup migrations."
fi

# Stop Supabase
show_status "Stopping Supabase..."
supabase stop || show_error "Could not stop Supabase."

# Reset Supabase database
show_status "Resetting Supabase database..."
supabase db reset || show_error "Could not reset the Supabase database."

# Start Supabase
show_status "Starting Supabase..."
supabase start || show_error "Could not start Supabase."

# Generate timestamp for migration files with nanosecond precision
TIMESTAMP=$(date +%Y%m%d%H%M%S%N)

# Create migration files with adjusted filenames
SCHEMA_MIGRATION="${MIGRATIONS_DIR}/${TIMESTAMP}_a_schema.sql"
DATA_MIGRATION="${MIGRATIONS_DIR}/${TIMESTAMP}_b_data.sql"

# Dump production database
show_status "Dumping production database..."

# Ensure Supabase CLI is authenticated and points to the correct project
# Replace 'your-project-ref' with your actual project reference if needed
# supabase login
# supabase link --project-ref your-project-ref

supabase db dump -f "$SCHEMA_MIGRATION" --data-only=false || show_error "Could not dump schema."
supabase db dump -f "$DATA_MIGRATION" --data-only=true || show_error "Could not dump data."

# Also save dumps to dumps directory with adjusted filenames
cp "$SCHEMA_MIGRATION" "$DUMPS_DIR/${TIMESTAMP}_a_schema.sql" || show_error "Failed to copy schema dump."
cp "$DATA_MIGRATION" "$DUMPS_DIR/${TIMESTAMP}_b_data.sql" || show_error "Failed to copy data dump."

# Import schema and data
show_status "Importing schema and data..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f "$SCHEMA_MIGRATION" || show_error "Could not import schema."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f "$DATA_MIGRATION" || show_error "Could not import data."

# Verify essential tables
show_status "Verifying database structure..."
required_tables=("cities" "heritage_sites" "periods" "languages" "city_translations" "heritage_site_translations")
for table in "${required_tables[@]}"; do
    count=$(count_rows "$table")
    echo "- $table: $count rows"
    if [ "$count" == "0" ]; then
        show_warning "No data in $table."
    fi
done

# Clean up old dumps (keep last 5)
show_status "Cleaning up old dumps..."
cd "$DUMPS_DIR" || show_error "Failed to change directory to $DUMPS_DIR."

SCHEMA_FILES=(*_a_schema.sql)
if [ "${#SCHEMA_FILES[@]}" -gt 5 ]; then
    ls -t *_a_schema.sql | tail -n +6 | xargs -d '\n' rm -f --
fi

DATA_FILES=(*_b_data.sql)
if [ "${#DATA_FILES[@]}" -gt 5 ]; then
    ls -t *_b_data.sql | tail -n +6 | xargs -d '\n' rm -f --
fi

cd - > /dev/null || show_error "Failed to return to previous directory."

# Apply stashed changes if any
if [ "$STASHED" = true ]; then
    show_status "Applying stashed changes..."
    git stash pop || show_warning "Failed to apply stashed changes."
fi

show_status "Reset complete! Your local database is now synchronized with production."
show_status "Dumps are saved in $DUMPS_DIR."
show_status "Migration backups are saved in $BACKUP_DIR."

# Show next steps
echo -e "\nNext steps:"
echo "1. Verify database import."
echo "2. Run 'npm run type-check' to ensure type compatibility."
echo "3. Run your tests to verify everything works."

# Show dump locations
echo -e "\nDumps from this run:"
echo "Schema migration: $SCHEMA_MIGRATION"
echo "Data migration: $DATA_MIGRATION"
