-- SuperSlice Postgres initialization and grants
-- This script ensures UUID extension exists and grants permissions to the app user

-- 1) Ensure uuid-ossp extension (for uuid_generate_v4()) in primary DB
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2) Ensure application role exists (matches docker-compose defaults)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_roles WHERE rolname = 'superslice_dev'
  ) THEN
    CREATE ROLE superslice_dev LOGIN PASSWORD 'a770405z';
  END IF;
END $$;

-- 3) Schema ownership and usage
ALTER SCHEMA public OWNER TO superslice_dev;
GRANT USAGE ON SCHEMA public TO superslice_dev;

-- 4) Table and sequence privileges for existing objects
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO superslice_dev;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO superslice_dev;

-- 5) Default privileges for future objects created in public schema
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO superslice_dev;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO superslice_dev;

-- 6) (Optional) If you need to run migrations that create functions, allow execute
-- ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO superslice_dev;

-- 7) Create shadow database and ensure uuid-ossp there too
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_database WHERE datname = 'superslice_shadow'
  ) THEN
    CREATE DATABASE superslice_shadow OWNER superslice_dev;
  END IF;
END $$;

\connect superslice_shadow
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    EXECUTE format('DROP TABLE IF EXISTS %I.%I CASCADE', 'public', r.tablename);
  END LOOP;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_database WHERE datname = 'superslice_stg'
  ) THEN
    CREATE DATABASE superslice_stg OWNER superslice_dev;
  END IF;
END $$;

\connect superslice_stg
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    EXECUTE format('DROP TABLE IF EXISTS %I.%I CASCADE', 'public', r.tablename);
  END LOOP;
END $$;
ALTER SCHEMA public OWNER TO superslice_dev;
GRANT USAGE ON SCHEMA public TO superslice_dev;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO superslice_dev;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO superslice_dev;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO superslice_dev;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO superslice_dev;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_database WHERE datname = 'superslice_db'
  ) THEN
    CREATE DATABASE superslice_db OWNER superslice_dev;
  END IF;
END $$;

\connect superslice_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    EXECUTE format('DROP TABLE IF EXISTS %I.%I CASCADE', 'public', r.tablename);
  END LOOP;
END $$;
ALTER SCHEMA public OWNER TO superslice_dev;
GRANT USAGE ON SCHEMA public TO superslice_dev;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO superslice_dev;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO superslice_dev;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO superslice_dev;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO superslice_dev;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_database WHERE datname = 'superslice_shadow_2'
  ) THEN
    CREATE DATABASE superslice_shadow_2 OWNER superslice_dev;
  END IF;
END $$;

\connect superslice_shadow_2
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    EXECUTE format('DROP TABLE IF EXISTS %I.%I CASCADE', 'public', r.tablename);
  END LOOP;
END $$;
ALTER SCHEMA public OWNER TO superslice_dev;
GRANT USAGE ON SCHEMA public TO superslice_dev;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO superslice_dev;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO superslice_dev;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO superslice_dev;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO superslice_dev;
