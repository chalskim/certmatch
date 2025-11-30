CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'exed_method_enum') THEN
    CREATE TYPE exed_method_enum AS ENUM ('online','offline','hybrid');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'exed_level_enum') THEN
    CREATE TYPE exed_level_enum AS ENUM ('beginner','intermediate','advanced');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS user_expert_education_info (
  exed_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  exed_institution_name VARCHAR(255) NOT NULL,
  exed_representative_name VARCHAR(100),
  exed_contact_number VARCHAR(20) NOT NULL,
  exed_address VARCHAR(255),
  exed_institution_intro TEXT,
  exed_course_name VARCHAR(255) NOT NULL,
  exed_course_overview TEXT,
  exed_curriculum TEXT NOT NULL,
  exed_location VARCHAR(100),
  exed_total_hours INTEGER NOT NULL,
  exed_duration VARCHAR(50),
  exed_method exed_method_enum NOT NULL,
  exed_level exed_level_enum NOT NULL,
  exed_tuition_fee NUMERIC(12,2) NOT NULL,
  exed_currency_code CHAR(3) NOT NULL DEFAULT 'KRW',
  exed_government_support BOOLEAN NOT NULL DEFAULT FALSE,
  exed_capacity INTEGER NOT NULL,
  exed_schedules JSONB NOT NULL DEFAULT '[]',
  exed_instructors JSONB NOT NULL DEFAULT '[]',
  exed_cert_issuance BOOLEAN NOT NULL DEFAULT FALSE,
  exed_state code_state_enum NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

ALTER TABLE user_expert_education_info ADD CONSTRAINT fk_exed_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;
ALTER TABLE user_expert_education_info ADD CONSTRAINT chk_exed_currency_code CHECK (exed_currency_code ~ '^[A-Z]{3}$');
ALTER TABLE user_expert_education_info ADD CONSTRAINT chk_exed_contact_phone CHECK (exed_contact_number ~ '^\+?[0-9\-]{7,}$');
ALTER TABLE user_expert_education_info ADD CONSTRAINT chk_exed_schedules_array CHECK (jsonb_typeof(exed_schedules) = 'array');
ALTER TABLE user_expert_education_info ADD CONSTRAINT chk_exed_instructors_array CHECK (jsonb_typeof(exed_instructors) = 'array');

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'set_updated_at') THEN
    CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $func$
    BEGIN
      NEW.updated_at := NOW();
      RETURN NEW;
    END
    $func$ LANGUAGE plpgsql;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_user_expert_education_info_updated_at') THEN
    CREATE TRIGGER trg_user_expert_education_info_updated_at BEFORE UPDATE ON user_expert_education_info FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_exed_user ON user_expert_education_info(user_id);
CREATE INDEX IF NOT EXISTS idx_exed_state ON user_expert_education_info(exed_state);
CREATE INDEX IF NOT EXISTS gin_exed_schedules ON user_expert_education_info USING GIN (exed_schedules);
CREATE INDEX IF NOT EXISTS gin_exed_instructors ON user_expert_education_info USING GIN (exed_instructors);
