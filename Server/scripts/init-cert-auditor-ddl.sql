CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'caui_fee_type_enum') THEN
    CREATE TYPE caui_fee_type_enum AS ENUM ('daily','project');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS user_cert_auditor_info (
  caui_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  caui_certifications jsonb NOT NULL DEFAULT '[]',
  caui_expertise_codes jsonb NOT NULL DEFAULT '[]',
  caui_experiences jsonb NOT NULL DEFAULT '[]',
  caui_regions jsonb NOT NULL DEFAULT '[]',
  caui_fee_type caui_fee_type_enum NOT NULL,
  caui_min_fee integer NOT NULL CHECK (caui_min_fee >= 0),
  caui_max_fee integer NOT NULL CHECK (caui_max_fee >= caui_min_fee),
  caui_fee_currency char(3) NOT NULL DEFAULT 'KRW' CHECK (caui_fee_currency ~ '^[A-Z]{3}$'),
  caui_created_at timestamptz NOT NULL DEFAULT now(),
  caui_updated_at timestamptz NOT NULL DEFAULT now(),
  caui_deleted_at timestamptz NULL,
  CONSTRAINT fk_user_cert_auditor_info_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT chk_user_cert_auditor_info_certifications_array CHECK (jsonb_typeof(caui_certifications) = 'array'),
  CONSTRAINT chk_user_cert_auditor_info_expertise_array CHECK (jsonb_typeof(caui_expertise_codes) = 'array'),
  CONSTRAINT chk_user_cert_auditor_info_experiences_array CHECK (jsonb_typeof(caui_experiences) = 'array'),
  CONSTRAINT chk_user_cert_auditor_info_regions_array CHECK (jsonb_typeof(caui_regions) = 'array')
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_user_cert_auditor_info_user_active ON user_cert_auditor_info (user_id) WHERE caui_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_cert_auditor_info_user ON user_cert_auditor_info (user_id);
CREATE INDEX IF NOT EXISTS idx_user_cert_auditor_info_fee_type ON user_cert_auditor_info (caui_fee_type);
CREATE INDEX IF NOT EXISTS gin_user_cert_auditor_info_certifications ON user_cert_auditor_info USING gin (caui_certifications);
CREATE INDEX IF NOT EXISTS gin_user_cert_auditor_info_expertise ON user_cert_auditor_info USING gin (caui_expertise_codes);
CREATE INDEX IF NOT EXISTS gin_user_cert_auditor_info_experiences ON user_cert_auditor_info USING gin (caui_experiences);
CREATE INDEX IF NOT EXISTS gin_user_cert_auditor_info_regions ON user_cert_auditor_info USING gin (caui_regions);

CREATE OR REPLACE FUNCTION set_updated_at_user_cert_auditor_info() RETURNS TRIGGER AS $$
BEGIN
  NEW.caui_updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_user_cert_auditor_info_updated ON user_cert_auditor_info;
CREATE TRIGGER trg_user_cert_auditor_info_updated BEFORE UPDATE ON user_cert_auditor_info FOR EACH ROW EXECUTE FUNCTION set_updated_at_user_cert_auditor_info();
