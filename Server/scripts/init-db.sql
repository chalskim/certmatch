-- CertMatch Postgres initialization and grants
-- This script ensures UUID extension exists and grants permissions to the app user

-- 1) Ensure uuid-ossp extension (for uuid_generate_v4())
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2) Ensure application role exists (matches docker-compose defaults)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_roles WHERE rolname = 'certmatch'
  ) THEN
    CREATE ROLE certmatch LOGIN PASSWORD 'password';
  END IF;
END $$;

-- 3) Schema ownership and usage
ALTER SCHEMA public OWNER TO certmatch;
GRANT USAGE ON SCHEMA public TO certmatch;

-- 4) Table and sequence privileges for existing objects
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO certmatch;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO certmatch;

-- 5) Default privileges for future objects created in public schema
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO certmatch;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO certmatch;

-- 6) (Optional) If you need to run migrations that create functions, allow execute
-- ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO certmatch;