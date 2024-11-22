# Heritage Navigator Database Workflow

## Initial Setup
```bash
# Start local Supabase environment
supabase start

# Update .env.local with credentials
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<local-anon-key>
```

## Database Management Workflows

### Complete Reset (Clean Slate)
When you need to start fresh with a copy of the production database:

```bash
# From project root directory
./scripts/reset-local-db.sh
```

This script will:
1. Stash any local changes
2. Pull latest from main branch
3. Backup existing migrations
4. Reset local database
5. Import production schema and data
6. Create new initial migration

**Important**: Verify your database after reset:
```bash
# Check database connectivity
supabase status

# Verify data import
npm run type-check
npm run test:db
```

### Incremental Development Process

#### 1. Environment Preparation
```bash
# Sync with latest changes
git pull
supabase link --project-ref <project-ref>
supabase db remote commit # Save remote state
supabase db reset # Sync local database
```

#### 2. Development Process
```bash
# Create new migration
supabase migration new descriptive_name

# Implement and test changes
supabase db reset
npm run type-check
npm run test:db

# Verify changes
supabase db diff
```

#### 3. Data Validation
```bash
# Validate data structure
supabase db test

# Verify schema compatibility
npm run validate-schema

# Check automated ingestion compatibility
npm run test:make-integration
```

#### 4. Production Deployment
```bash
# Pre-deployment backup
supabase db dump --file backups/pre_deploy_$(date +%Y%m%d_%H%M%S).sql

# Deploy changes
supabase db push

# Post-deployment verification
npm run verify-deployment
```

## Database Synchronization

### Basic Sync (Production to Local)
```bash
# Export production
supabase db dump -f schema.sql --data-only=false
supabase db dump -f data.sql --data-only=true

# Reset local database
psql -h localhost -p 54322 -U postgres -d postgres -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

# Import to local
psql -h localhost -p 54322 -U postgres -d postgres -f schema.sql
psql -h localhost -p 54322 -U postgres -d postgres -f data.sql
```

### Known Challenges
- Circular foreign key constraints may cause warnings during data dump
- Local database must be cleared before new import to avoid duplicate key errors
- psql CLI tool must be installed (`brew install postgresql@14` on Mac)
- Default password for local database is "postgres"

### Best Practices
- Backup local changes before sync
- Verify data after import with select queries
- Run tests after synchronization
- Keep schema.sql and data.sql in .gitignore
- Use reset-local-db.sh for complete resets
- Make small, focused changes between synchronizations

## Backup Management

### Automated Backups
```bash
# Full backup
supabase db dump --file backups/full_$(date +%Y%m%d).sql

# Data-only backup
supabase db dump --data-only --file backups/data_$(date +%Y%m%d).sql

# Schema-only backup
supabase db dump --schema-only --file backups/schema_$(date +%Y%m%d).sql
```

### Retention Policy
- Daily: 7 days retention
- Weekly: 4 weeks retention
- Monthly: 6 months retention
- Yearly: Permanent retention

### Emergency Recovery

#### Rollback Process
```bash
# Revert to previous version
supabase db reset --version <previous_version>

# Restore from backup
psql -h localhost -p 54322 -U postgres -d postgres -f backups/[backup_file].sql
```

## CI/CD Integration

### GitHub Actions Workflow
```yaml
name: Database CI/CD

on:
  push:
    paths:
      - 'supabase/migrations/**'
      - 'models/**'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Supabase CLI
        uses: supabase/setup-cli@v1
      - name: Run Tests
        run: |
          supabase start
          npm run test:db
          npm run type-check
      - name: Verify Schema
        run: npm run validate-schema
```

## Make.com Integration Guidelines

### Data Validation Rules
- Verify required fields presence
- Check data format consistency
- Validate location coordinates
- Ensure image references exist
- Verify language field completeness (da, en, pt)
- Check period references validity

### Automated Ingestion Process
1. Data preprocessing and normalization
2. Schema validation
3. Staging table insertion
4. Data verification and cleanup
5. Production migration
6. Backup verification
7. Type checking

## Quick Reference Commands

### Environment Management
```bash
# Basic Controls
supabase start
supabase stop
supabase status

# Reset and Sync
./scripts/reset-local-db.sh    # Complete reset with production data
supabase db reset             # Reset to migrations state

# Database Operations
supabase db diff
supabase db push
supabase db dump

# Development Tools
supabase db test
npm run type-check
npm run test:db
npm run validate-schema
```

## Debugging Guidelines
1. Use Supabase Studio (http://localhost:54323)
   - Check data in tables
   - Verify foreign key relationships
   - Test queries directly
   
2. Check Logs
   - Migration logs
   - Database error logs
   - Type generation errors
   
3. Data Verification
   - Validat