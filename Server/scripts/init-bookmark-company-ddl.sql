CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS user_bookmark_company (
  ubmc_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  ubmc_owner_type VARCHAR(50) NOT NULL,
  ubmc_owner_id UUID NOT NULL,
  ubmc_category_group VARCHAR(64) NOT NULL DEFAULT 'BOOKMARK_CATEGORY',
  ubmc_category_code VARCHAR(64) NOT NULL,
  ubmc_subtype_group VARCHAR(64),
  ubmc_subtype_code VARCHAR(64),
  ubmc_title VARCHAR(255) NOT NULL,
  ubmc_source_text VARCHAR(100),
  ubmc_location_text VARCHAR(100),
  ubmc_date TIMESTAMPTZ,
  ubmc_tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  ubmc_star BOOLEAN NOT NULL DEFAULT FALSE,
  ubmc_note TEXT,
  ubmc_rating NUMERIC(2,1),
  ubmc_reviews INTEGER,
  ubmc_projects INTEGER,
  ubmc_experience_text VARCHAR(50),
  ubmc_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ubmc_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ubmc_deleted_at TIMESTAMPTZ
);

ALTER TABLE user_bookmark_company ADD CONSTRAINT fk_user_bookmark_company_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE user_bookmark_company ADD CONSTRAINT fk_user_bookmark_company_category FOREIGN KEY (ubmc_category_group, ubmc_category_code) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE user_bookmark_company ADD CONSTRAINT fk_user_bookmark_company_subtype FOREIGN KEY (ubmc_subtype_group, ubmc_subtype_code) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE user_bookmark_company ADD CONSTRAINT chk_user_bookmark_company_tags_array CHECK (jsonb_typeof(ubmc_tags) = 'array');

CREATE UNIQUE INDEX IF NOT EXISTS uq_user_bookmark_company_target_active ON user_bookmark_company (user_id, ubmc_owner_type, ubmc_owner_id) WHERE ubmc_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_bookmark_company_user_active ON user_bookmark_company (user_id) WHERE ubmc_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_bookmark_company_category_active ON user_bookmark_company (ubmc_category_group, ubmc_category_code) WHERE ubmc_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_bookmark_company_subtype_active ON user_bookmark_company (ubmc_subtype_group, ubmc_subtype_code) WHERE ubmc_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_bookmark_company_owner_active ON user_bookmark_company (ubmc_owner_type, ubmc_owner_id) WHERE ubmc_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_bookmark_company_date_active ON user_bookmark_company (ubmc_date) WHERE ubmc_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_bookmark_company_star_active ON user_bookmark_company (ubmc_star) WHERE ubmc_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_bookmark_company_metrics_active ON user_bookmark_company (ubmc_rating, ubmc_reviews, ubmc_projects) WHERE ubmc_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS gin_user_bookmark_company_tags ON user_bookmark_company USING GIN (ubmc_tags);

CREATE OR REPLACE FUNCTION set_updated_at_user_bookmark_company() RETURNS TRIGGER AS $$
BEGIN
  NEW.ubmc_updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_user_bookmark_company_updated ON user_bookmark_company;
CREATE TRIGGER trg_user_bookmark_company_updated BEFORE UPDATE ON user_bookmark_company FOR EACH ROW EXECUTE FUNCTION set_updated_at_user_bookmark_company();

