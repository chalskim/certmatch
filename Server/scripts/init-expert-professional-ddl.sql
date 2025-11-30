CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'expert_rate_type_enum') THEN
    CREATE TYPE expert_rate_type_enum AS ENUM ('hourly','daily','project');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS user_expert_professional_info (
  expf_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  expf_name VARCHAR(100) NOT NULL,
  expf_introduction TEXT NOT NULL,
  expf_expertise JSONB NOT NULL DEFAULT '[]',
  expf_other_expertise VARCHAR(100),
  expf_services JSONB NOT NULL DEFAULT '[]',
  expf_experience_years_text VARCHAR(50) NOT NULL,
  expf_experience_years_min SMALLINT,
  expf_experience_years_max SMALLINT,
  expf_prev_workplaces JSONB DEFAULT '[]',
  expf_portfolio_desc TEXT,
  expf_rate_type expert_rate_type_enum NOT NULL,
  expf_hourly_rate NUMERIC(12,2),
  expf_daily_rate NUMERIC(12,2),
  expf_project_rate NUMERIC(12,2),
  expf_currency_code CHAR(3) NOT NULL DEFAULT 'KRW',
  expf_regions JSONB DEFAULT '[]',
  expf_availability_days JSONB DEFAULT '[]',
  expf_time_slots JSONB DEFAULT '[]',
  expf_languages JSONB DEFAULT '[]',
  expf_state code_state_enum NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

ALTER TABLE user_expert_professional_info ADD CONSTRAINT fk_expf_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uq_expf_user_unique') THEN
    ALTER TABLE user_expert_professional_info ADD CONSTRAINT uq_expf_user_unique UNIQUE (user_id);
  END IF;
END $$;

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
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_user_expert_professional_info_updated_at') THEN
    CREATE TRIGGER trg_user_expert_professional_info_updated_at BEFORE UPDATE ON user_expert_professional_info FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_expf_user ON user_expert_professional_info(user_id);
CREATE INDEX IF NOT EXISTS idx_expf_state ON user_expert_professional_info(expf_state);
CREATE INDEX IF NOT EXISTS idx_expf_expertise_gin ON user_expert_professional_info USING GIN (expf_expertise);
CREATE INDEX IF NOT EXISTS idx_expf_services_gin ON user_expert_professional_info USING GIN (expf_services);
CREATE INDEX IF NOT EXISTS idx_expf_prev_workplaces_gin ON user_expert_professional_info USING GIN (expf_prev_workplaces);
CREATE INDEX IF NOT EXISTS idx_expf_regions_gin ON user_expert_professional_info USING GIN (expf_regions);
CREATE INDEX IF NOT EXISTS idx_expf_availability_days_gin ON user_expert_professional_info USING GIN (expf_availability_days);
CREATE INDEX IF NOT EXISTS idx_expf_time_slots_gin ON user_expert_professional_info USING GIN (expf_time_slots);
CREATE INDEX IF NOT EXISTS idx_expf_languages_gin ON user_expert_professional_info USING GIN (expf_languages);

ALTER TABLE user_expert_professional_info ADD CONSTRAINT chk_expf_years_range CHECK (expf_experience_years_min IS NULL OR expf_experience_years_max IS NULL OR expf_experience_years_min <= expf_experience_years_max);
ALTER TABLE user_expert_professional_info ADD CONSTRAINT chk_expf_currency_code CHECK (expf_currency_code ~ '^[A-Z]{3}$');
