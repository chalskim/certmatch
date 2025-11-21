-- CertMatch Postgres initialization and grants
-- This script ensures UUID extension exists and grants permissions to the app user

-- 1) Ensure uuid-ossp extension (for uuid_generate_v4()) in primary DB
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2) Ensure application role exists (matches docker-compose defaults)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_roles WHERE rolname = 'certmatch_dev'
  ) THEN
    CREATE ROLE certmatch_dev LOGIN PASSWORD 'a770405z';
  END IF;
END $$;

-- 3) Schema ownership and usage
ALTER SCHEMA public OWNER TO certmatch_dev;
GRANT USAGE ON SCHEMA public TO certmatch_dev;

-- 4) Table and sequence privileges for existing objects
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO certmatch_dev;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO certmatch_dev;

-- 5) Default privileges for future objects created in public schema
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO certmatch_dev;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO certmatch_dev;

-- 6) (Optional) If you need to run migrations that create functions, allow execute
-- ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO certmatch_dev;

-- 7) Create shadow database and ensure uuid-ossp there too
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_database WHERE datname = 'certmatch_shadow'
  ) THEN
    CREATE DATABASE certmatch_shadow OWNER certmatch_dev;
  END IF;
END $$;

\connect certmatch_shadow
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";