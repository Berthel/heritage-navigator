# Heritage Navigator Database Workflow

## Initial Setup
```bash
# Start local Supabase environment
supabase start

# Update .env.local with credentials
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<local-anon-key>
```

## Database Change Workflow

### 1. Environment Preparation
```bash
# Sync with latest changes
git pull
supabase link --project-ref <project-ref>
supabase db remote commit # Save remote state
supabase db reset # Sync local database
```

### 2. Development Process
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

### 3. Data Validation
```bash
# Validate data structure
supabase db test

# Verify schema compatibility
npm run validate-schema

# Check automated ingestion compatibility
npm run test:make-integration
```

### 4. Production Deployment
```bash
# Pre-deployment backup
supabase db dump --file backups/pre_deploy_$(date +%Y%m%d_%H%M%S).sql

# Deploy changes
supabase db push

# Post-deployment verification
npm run verify-deployment
```

### 5. Type Generation
```bash
# Update TypeScript types
npm run update-types

# Verify type compatibility
npm run type-check
```

### 6. Documentation Update
```bash
# Update API documentation
npm run update-api-docs

# Update OpenAPI specification
npm run generate-openapi
```

## Database Sync Process

### Synkronisering mellem produktion og lokal udvikling
1. **Export produktion**:
```bash
supabase db dump -f schema.sql --data-only=false
supabase db dump -f data.sql --data-only=true
```

2. **Ryd lokal database**:
```bash
psql -h localhost -p 54322 -U postgres -d postgres -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
```

3. **Import til lokal**:
```bash
psql -h localhost -p 54322 -U postgres -d postgres -f schema.sql
psql -h localhost -p 54322 -U postgres -d postgres -f data.sql
```

### Kendte udfordringer
- Cirkulære foreign key constraints kan give advarsler ved data dump
- Lokal database skal ryddes før ny import for at undgå duplicate key fejl
- psql CLI værktøj skal være installeret (`brew install postgresql@14` på Mac)
- Standard password for lokal database er "postgres"

### God praksis
- Tag backup af lokale ændringer før sync
- Verificer data efter import med select queries
- Kør tests efter synkronisering
- Hold schema.sql og data.sql i .gitignore

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

### Emergency Procedures

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
- Ensure image references existence

### Automated Ingestion Process
1. Data preprocessing
2. Schema validation
3. Staging table insertion
4. Data verification
5. Production migration
6. Backup verification

## Quick Reference Commands
```bash
# Environment Management
supabase start
supabase stop
supabase status

# Database Operations
supabase db reset
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
2. Check migration logs
3. Verify data consistency
4. Monitor type generation
5. Validate make.com webhooks
