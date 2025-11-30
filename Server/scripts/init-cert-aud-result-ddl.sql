CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'caan_status_enum') THEN
    CREATE TYPE caan_status_enum AS ENUM ('recruiting','closed');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'caap_status_enum') THEN
    CREATE TYPE caap_status_enum AS ENUM ('applied','accepted','rejected','requested','scheduled','in_progress','reporting','completed');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS cert_audit_announcement (
  caan_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  caan_company_name TEXT NOT NULL,
  caan_project_title TEXT NOT NULL,
  caan_cert_type_group TEXT NOT NULL DEFAULT 'cert_type',
  caan_cert_type_code TEXT NOT NULL,
  caan_status caan_status_enum NOT NULL DEFAULT 'recruiting',
  caan_deadline DATE NOT NULL,
  caan_region_group TEXT NOT NULL DEFAULT 'region',
  caan_region_code TEXT,
  caan_budget_min NUMERIC(12,2) NOT NULL,
  caan_budget_max NUMERIC(12,2) NOT NULL,
  caan_currency_code TEXT NOT NULL DEFAULT 'KRW',
  caan_duration_text TEXT NOT NULL,
  caan_duration_days INTEGER,
  caan_description TEXT NOT NULL,
  caan_requirements JSONB NOT NULL DEFAULT '[]',
  caan_applications_count INTEGER NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by UUID,
  updated_by UUID,
  deleted_at timestamptz
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_caan_user') THEN
    ALTER TABLE cert_audit_announcement ADD CONSTRAINT fk_caan_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE RESTRICT;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_caan_cert_type') THEN
    ALTER TABLE cert_audit_announcement ADD CONSTRAINT fk_caan_cert_type FOREIGN KEY (caan_cert_type_group, caan_cert_type_code) REFERENCES cert_code(code_gb, code_key) ON DELETE RESTRICT;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_caan_region') THEN
    ALTER TABLE cert_audit_announcement ADD CONSTRAINT fk_caan_region FOREIGN KEY (caan_region_group, caan_region_code) REFERENCES cert_code(code_gb, code_key) ON DELETE RESTRICT;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_caan_budget_range') THEN
    ALTER TABLE cert_audit_announcement ADD CONSTRAINT chk_caan_budget_range CHECK (caan_budget_min >= 0 AND caan_budget_max >= caan_budget_min);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_caan_currency_code') THEN
    ALTER TABLE cert_audit_announcement ADD CONSTRAINT chk_caan_currency_code CHECK (caan_currency_code ~ '^[A-Z]{3}$');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_caan_requirements_is_array') THEN
    ALTER TABLE cert_audit_announcement ADD CONSTRAINT chk_caan_requirements_is_array CHECK (jsonb_typeof(caan_requirements) = 'array');
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS uq_caan_user_project_active ON cert_audit_announcement (user_id, caan_project_title) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_caan_status_active ON cert_audit_announcement (caan_status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_caan_deadline_active ON cert_audit_announcement (caan_deadline) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_caan_cert_type_active ON cert_audit_announcement (caan_cert_type_group, caan_cert_type_code) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_caan_region_active ON cert_audit_announcement (caan_region_group, caan_region_code) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_caan_requirements_gin ON cert_audit_announcement USING GIN (caan_requirements);

CREATE TABLE IF NOT EXISTS cert_audit_application (
  caap_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  caan_id UUID NOT NULL,
  user_id UUID NOT NULL,
  caap_status caap_status_enum NOT NULL DEFAULT 'applied',
  caap_application_date DATE NOT NULL DEFAULT NOW(),
  caap_decision_date DATE,
  caap_applied_budget NUMERIC(12,2),
  caap_currency_code TEXT NOT NULL DEFAULT 'KRW',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by UUID,
  updated_by UUID,
  deleted_at timestamptz
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_caap_caan') THEN
    ALTER TABLE cert_audit_application ADD CONSTRAINT fk_caap_caan FOREIGN KEY (caan_id) REFERENCES cert_audit_announcement(caan_id) ON DELETE CASCADE;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_caap_user') THEN
    ALTER TABLE cert_audit_application ADD CONSTRAINT fk_caap_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE RESTRICT;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_caap_currency_code') THEN
    ALTER TABLE cert_audit_application ADD CONSTRAINT chk_caap_currency_code CHECK (caap_currency_code ~ '^[A-Z]{3}$');
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS uq_caap_caan_user_active ON cert_audit_application (caan_id, user_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_caap_status_active ON cert_audit_application (caap_status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_caap_application_date_active ON cert_audit_application (caap_application_date) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_caap_user_active ON cert_audit_application (user_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_caap_caan_active ON cert_audit_application (caan_id) WHERE deleted_at IS NULL;

CREATE OR REPLACE FUNCTION tgr_update_timestamp() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_timestamp_caan ON cert_audit_announcement;
CREATE TRIGGER trg_update_timestamp_caan BEFORE UPDATE ON cert_audit_announcement FOR EACH ROW EXECUTE PROCEDURE tgr_update_timestamp();

DROP TRIGGER IF EXISTS trg_update_timestamp_caap ON cert_audit_application;
CREATE TRIGGER trg_update_timestamp_caap BEFORE UPDATE ON cert_audit_application FOR EACH ROW EXECUTE PROCEDURE tgr_update_timestamp();
