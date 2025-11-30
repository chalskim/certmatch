CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'pers_profile_state') THEN
    CREATE TYPE pers_profile_state AS ENUM ('draft','active','inactive','suspended');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS user_personal (
  pers_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL UNIQUE,
  pers_name varchar(100) NOT NULL,
  pers_email varchar(255) NOT NULL,
  pers_phone varchar(20) NOT NULL,
  pers_location varchar(100) NOT NULL,
  pers_bio text NOT NULL,
  pers_experience_years smallint NOT NULL DEFAULT 0,
  pers_hourly_rate_raw varchar(50),
  pers_hourly_rate_min integer,
  pers_hourly_rate_max integer,
  pers_hourly_rate_currency char(3) NOT NULL DEFAULT 'KRW',
  pers_is_verified boolean NOT NULL DEFAULT false,
  pers_verified_at timestamp(6),
  pers_profile_state pers_profile_state NOT NULL DEFAULT 'draft',
  created_by uuid NULL REFERENCES users(user_id),
  updated_by uuid NULL REFERENCES users(user_id),
  pers_created_at timestamp(6) NOT NULL DEFAULT now(),
  pers_updated_at timestamp(6) NOT NULL DEFAULT now(),
  pers_deleted_at timestamp(6),
  CONSTRAINT fk_user_personal_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT chk_pers_experience_years CHECK (pers_experience_years >= 0 AND pers_experience_years <= 50),
  CONSTRAINT chk_pers_bio_length CHECK (char_length(pers_bio) >= 100),
  CONSTRAINT chk_pers_hourly_range CHECK (pers_hourly_rate_min IS NULL OR pers_hourly_rate_max IS NULL OR pers_hourly_rate_min <= pers_hourly_rate_max),
  CONSTRAINT chk_pers_email_format CHECK (pers_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT chk_pers_phone_format CHECK (pers_phone ~* '^\+?[0-9\-() ]{7,20}$')
);

CREATE OR REPLACE FUNCTION set_user_personal_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.pers_updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_user_personal_updated_at ON user_personal;
CREATE TRIGGER trg_user_personal_updated_at BEFORE UPDATE ON user_personal FOR EACH ROW EXECUTE FUNCTION set_user_personal_updated_at();

CREATE INDEX IF NOT EXISTS idx_pers_user_id ON user_personal (user_id);
CREATE INDEX IF NOT EXISTS idx_pers_state ON user_personal (pers_profile_state);
CREATE INDEX IF NOT EXISTS idx_pers_location ON user_personal (pers_location);
CREATE INDEX IF NOT EXISTS idx_pers_verified ON user_personal (pers_is_verified);

CREATE TABLE IF NOT EXISTS user_personal_experience (
  pexp_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  pers_id uuid NOT NULL REFERENCES user_personal(pers_id) ON DELETE CASCADE,
  pexp_title varchar(100) NOT NULL,
  pexp_company varchar(100),
  pexp_period_text varchar(100),
  pexp_start_date date,
  pexp_end_date date,
  pexp_is_current boolean NOT NULL DEFAULT false,
  pexp_description text,
  pexp_seq integer NOT NULL DEFAULT 1,
  created_by uuid NULL REFERENCES users(user_id),
  updated_by uuid NULL REFERENCES users(user_id),
  pexp_created_at timestamp(6) NOT NULL DEFAULT now(),
  pexp_updated_at timestamp(6) NOT NULL DEFAULT now(),
  pexp_deleted_at timestamp(6),
  CONSTRAINT chk_pexp_date_range CHECK (pexp_start_date IS NULL OR pexp_end_date IS NULL OR pexp_start_date <= pexp_end_date)
);

CREATE OR REPLACE FUNCTION set_pexp_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.pexp_updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_pexp_updated_at ON user_personal_experience;
CREATE TRIGGER trg_pexp_updated_at BEFORE UPDATE ON user_personal_experience FOR EACH ROW EXECUTE FUNCTION set_pexp_updated_at();

CREATE INDEX IF NOT EXISTS idx_pexp_pers_id ON user_personal_experience (pers_id);
CREATE UNIQUE INDEX IF NOT EXISTS uk_pexp_active_seq ON user_personal_experience (pers_id, pexp_seq) WHERE pexp_deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS user_personal_certificate (
  pcert_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  pers_id uuid NOT NULL REFERENCES user_personal(pers_id) ON DELETE CASCADE,
  pcert_name varchar(150) NOT NULL,
  pcert_code_gb varchar(64) NOT NULL DEFAULT 'CERT_TYPE',
  pcert_code_key varchar(64),
  pcert_status_gb varchar(64) NOT NULL DEFAULT 'CERT_STATUS',
  pcert_status_key varchar(64),
  pcert_issue_date date,
  pcert_expiry_date date,
  pcert_issuer varchar(150),
  pcert_number varchar(100),
  pcert_description text,
  pcert_seq integer NOT NULL DEFAULT 1,
  created_by uuid NULL REFERENCES users(user_id),
  updated_by uuid NULL REFERENCES users(user_id),
  pcert_created_at timestamp(6) NOT NULL DEFAULT now(),
  pcert_updated_at timestamp(6) NOT NULL DEFAULT now(),
  pcert_deleted_at timestamp(6),
  CONSTRAINT chk_pcert_date_range CHECK (pcert_issue_date IS NULL OR pcert_expiry_date IS NULL OR pcert_issue_date <= pcert_expiry_date)
);

ALTER TABLE user_personal_certificate ADD CONSTRAINT fk_pcert_type_code FOREIGN KEY (pcert_code_gb, pcert_code_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE user_personal_certificate ADD CONSTRAINT fk_pcert_status_code FOREIGN KEY (pcert_status_gb, pcert_status_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE SET NULL;

CREATE OR REPLACE FUNCTION set_pcert_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.pcert_updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_pcert_updated_at ON user_personal_certificate;
CREATE TRIGGER trg_pcert_updated_at BEFORE UPDATE ON user_personal_certificate FOR EACH ROW EXECUTE FUNCTION set_pcert_updated_at();

CREATE INDEX IF NOT EXISTS idx_pcert_pers_id ON user_personal_certificate (pers_id);
CREATE INDEX IF NOT EXISTS idx_pcert_code ON user_personal_certificate (pcert_code_gb, pcert_code_key);
CREATE INDEX IF NOT EXISTS idx_pcert_status ON user_personal_certificate (pcert_status_gb, pcert_status_key);
CREATE UNIQUE INDEX IF NOT EXISTS uk_pcert_active_seq ON user_personal_certificate (pers_id, pcert_seq) WHERE pcert_deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS user_personal_code (
  pcode_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  pers_id uuid NOT NULL REFERENCES user_personal(pers_id) ON DELETE CASCADE,
  pcode_gb varchar(64) NOT NULL,
  pcode_key varchar(64) NOT NULL,
  pcode_label varchar(255),
  pcode_seq integer NOT NULL DEFAULT 1,
  created_by uuid NULL REFERENCES users(user_id),
  updated_by uuid NULL REFERENCES users(user_id),
  pcode_created_at timestamp(6) NOT NULL DEFAULT now(),
  pcode_updated_at timestamp(6) NOT NULL DEFAULT now(),
  pcode_deleted_at timestamp(6)
);

ALTER TABLE user_personal_code ADD CONSTRAINT fk_pcode_cert_code FOREIGN KEY (pcode_gb, pcode_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;

CREATE OR REPLACE FUNCTION set_pcode_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.pcode_updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_pcode_updated_at ON user_personal_code;
CREATE TRIGGER trg_pcode_updated_at BEFORE UPDATE ON user_personal_code FOR EACH ROW EXECUTE FUNCTION set_pcode_updated_at();

CREATE INDEX IF NOT EXISTS idx_pcode_pers_id ON user_personal_code (pers_id);
CREATE INDEX IF NOT EXISTS idx_pcode_gb_key ON user_personal_code (pcode_gb, pcode_key);
CREATE UNIQUE INDEX IF NOT EXISTS uk_pcode_active_unique ON user_personal_code (pers_id, pcode_gb, pcode_key) WHERE pcode_deleted_at IS NULL;
