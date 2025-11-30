CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'comp_profile_state') THEN
    CREATE TYPE comp_profile_state AS ENUM ('draft','submitted','pending_review','approved','rejected');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS user_company (
  comp_id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id                   UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  comp_name                 TEXT NOT NULL,
  comp_biz_reg_no           TEXT NOT NULL,
  comp_ceo_name             TEXT NOT NULL,
  comp_establish_date       DATE NOT NULL,
  comp_industry_gb          TEXT NOT NULL DEFAULT 'INDUSTRY',
  comp_industry_key         TEXT NOT NULL,
  comp_employees_gb         TEXT NOT NULL DEFAULT 'EMP_SIZE',
  comp_employees_key        TEXT NOT NULL,
  comp_postcode             TEXT,
  comp_address              TEXT NOT NULL,
  comp_address_detail       TEXT,
  comp_contact_person       TEXT NOT NULL,
  comp_contact_email        TEXT NOT NULL,
  comp_contact_phone        TEXT NOT NULL,
  comp_contact_persons_json JSONB NOT NULL DEFAULT '[]',
  comp_industry_tags_json         JSONB NOT NULL DEFAULT '[]',
  comp_selected_cert_types_json   JSONB NOT NULL DEFAULT '[]',
  comp_cert_infos_json            JSONB NOT NULL DEFAULT '[]',
  comp_terms1               BOOLEAN NOT NULL DEFAULT FALSE,
  comp_terms2               BOOLEAN NOT NULL DEFAULT FALSE,
  comp_terms3               BOOLEAN NOT NULL DEFAULT FALSE,
  comp_terms_agreed_at      TIMESTAMPTZ,
  comp_profile_state        comp_profile_state NOT NULL DEFAULT 'draft',
  comp_created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  comp_updated_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT fk_user_company_industry_code FOREIGN KEY (comp_industry_gb, comp_industry_key) REFERENCES cert_code (code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_user_company_employees_code FOREIGN KEY (comp_employees_gb, comp_employees_key) REFERENCES cert_code (code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT uq_user_company_biz_reg_no UNIQUE (comp_biz_reg_no),
  CONSTRAINT chk_user_company_contact_email_format CHECK (comp_contact_email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  CONSTRAINT chk_user_company_biz_reg_no_format CHECK (comp_biz_reg_no ~ '^\d{3}-\d{2}-\d{5}$'),
  CONSTRAINT chk_user_company_contact_phone_format CHECK (comp_contact_phone ~ '^\+?[0-9\-]{7,}$')
);

CREATE INDEX IF NOT EXISTS idx_user_company_user_id ON user_company(user_id);
CREATE INDEX IF NOT EXISTS idx_user_company_industry_code ON user_company(comp_industry_gb, comp_industry_key);
CREATE INDEX IF NOT EXISTS idx_user_company_employees_code ON user_company(comp_employees_gb, comp_employees_key);
CREATE INDEX IF NOT EXISTS idx_user_company_cert_infos_gin ON user_company USING GIN (comp_cert_infos_json);
CREATE INDEX IF NOT EXISTS idx_user_company_industry_tags_gin ON user_company USING GIN (comp_industry_tags_json);
CREATE INDEX IF NOT EXISTS idx_user_company_selected_cert_types_gin ON user_company USING GIN (comp_selected_cert_types_json);
CREATE INDEX IF NOT EXISTS idx_user_company_contact_persons_gin ON user_company USING GIN (comp_contact_persons_json);

CREATE OR REPLACE FUNCTION set_updated_at_user_company() RETURNS TRIGGER AS $$
BEGIN
  NEW.comp_updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_user_company_updated ON user_company;
CREATE TRIGGER trg_user_company_updated BEFORE UPDATE ON user_company FOR EACH ROW EXECUTE FUNCTION set_updated_at_user_company();

CREATE TABLE IF NOT EXISTS user_company_contact_person (
  cper_id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  comp_id              UUID NOT NULL REFERENCES user_company(comp_id) ON DELETE CASCADE,
  cper_name            TEXT NOT NULL,
  cper_position        TEXT,
  cper_email           TEXT NOT NULL,
  cper_phone           TEXT NOT NULL,
  cper_is_primary      BOOLEAN NOT NULL DEFAULT FALSE,
  cper_seq             INTEGER NOT NULL DEFAULT 1,
  created_by           UUID NULL REFERENCES users(user_id),
  updated_by           UUID NULL REFERENCES users(user_id),
  cper_created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  cper_updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  cper_deleted_at      TIMESTAMPTZ,
  CONSTRAINT chk_cper_email_format CHECK (cper_email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  CONSTRAINT chk_cper_phone_format CHECK (cper_phone ~ '^\+?[0-9\-]{7,}$')
);

CREATE OR REPLACE FUNCTION set_cper_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.cper_updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_cper_updated_at ON user_company_contact_person;
CREATE TRIGGER trg_cper_updated_at BEFORE UPDATE ON user_company_contact_person FOR EACH ROW EXECUTE FUNCTION set_cper_updated_at();

CREATE INDEX IF NOT EXISTS idx_cper_comp_id ON user_company_contact_person(comp_id);
CREATE UNIQUE INDEX IF NOT EXISTS uk_cper_active_seq ON user_company_contact_person(comp_id, cper_seq) WHERE cper_deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS uk_cper_primary ON user_company_contact_person(comp_id) WHERE cper_is_primary AND cper_deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS user_company_certification (
  ccert_id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  comp_id              UUID NOT NULL REFERENCES user_company(comp_id) ON DELETE CASCADE,
  ccert_type_gb        TEXT NOT NULL DEFAULT 'CERT_TYPE',
  ccert_type_key       TEXT NOT NULL,
  ccert_type_label     TEXT,
  ccert_level_gb       TEXT NOT NULL DEFAULT 'CERT_LEVEL',
  ccert_level_key      TEXT,
  ccert_level_label    TEXT,
  ccert_audit_type_gb  TEXT NOT NULL DEFAULT 'AUDIT_TYPE',
  ccert_audit_type_key TEXT,
  ccert_audit_type_label TEXT,
  ccert_scope          TEXT,
  ccert_desired_date   DATE,
  ccert_seq            INTEGER NOT NULL DEFAULT 1,
  created_by           UUID NULL REFERENCES users(user_id),
  updated_by           UUID NULL REFERENCES users(user_id),
  ccert_created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  ccert_updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  ccert_deleted_at     TIMESTAMPTZ
);

ALTER TABLE user_company_certification ADD CONSTRAINT fk_ccert_type_code FOREIGN KEY (ccert_type_gb, ccert_type_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE user_company_certification ADD CONSTRAINT fk_ccert_level_code FOREIGN KEY (ccert_level_gb, ccert_level_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE user_company_certification ADD CONSTRAINT fk_ccert_audit_type_code FOREIGN KEY (ccert_audit_type_gb, ccert_audit_type_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE SET NULL;

CREATE OR REPLACE FUNCTION set_ccert_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.ccert_updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_ccert_updated_at ON user_company_certification;
CREATE TRIGGER trg_ccert_updated_at BEFORE UPDATE ON user_company_certification FOR EACH ROW EXECUTE FUNCTION set_ccert_updated_at();

CREATE INDEX IF NOT EXISTS idx_ccert_comp_id    ON user_company_certification(comp_id);
CREATE INDEX IF NOT EXISTS idx_ccert_type_code  ON user_company_certification(ccert_type_gb, ccert_type_key);
CREATE INDEX IF NOT EXISTS idx_ccert_level_code ON user_company_certification(ccert_level_gb, ccert_level_key);
CREATE INDEX IF NOT EXISTS idx_ccert_audit_code ON user_company_certification(ccert_audit_type_gb, ccert_audit_type_key);
CREATE UNIQUE INDEX IF NOT EXISTS uk_ccert_active_seq ON user_company_certification(comp_id, ccert_seq) WHERE ccert_deleted_at IS NULL;
