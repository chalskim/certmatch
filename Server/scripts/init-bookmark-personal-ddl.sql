CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS user_bookmark_personal (
  ubmp_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  ubmp_owner_type VARCHAR(50) NOT NULL,
  ubmp_owner_id UUID NOT NULL,
  ubmp_category_group VARCHAR(64) NOT NULL DEFAULT 'BOOKMARK_CATEGORY',
  ubmp_category_code VARCHAR(64) NOT NULL,
  ubmp_subtype_group VARCHAR(64),
  ubmp_subtype_code VARCHAR(64),
  ubmp_status_group VARCHAR(64),
  ubmp_status_code VARCHAR(64),
  ubmp_title VARCHAR(255) NOT NULL,
  ubmp_source_text VARCHAR(100),
  ubmp_location_text VARCHAR(100),
  ubmp_amount_text VARCHAR(100),
  ubmp_date TIMESTAMPTZ,
  ubmp_tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  ubmp_star BOOLEAN NOT NULL DEFAULT FALSE,
  ubmp_note TEXT,
  ubmp_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ubmp_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ubmp_deleted_at TIMESTAMPTZ
);

ALTER TABLE user_bookmark_personal ADD CONSTRAINT fk_user_bookmark_personal_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE user_bookmark_personal ADD CONSTRAINT fk_user_bookmark_personal_category FOREIGN KEY (ubmp_category_group, ubmp_category_code) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE user_bookmark_personal ADD CONSTRAINT fk_user_bookmark_personal_subtype FOREIGN KEY (ubmp_subtype_group, ubmp_subtype_code) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE user_bookmark_personal ADD CONSTRAINT fk_user_bookmark_personal_status FOREIGN KEY (ubmp_status_group, ubmp_status_code) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE user_bookmark_personal ADD CONSTRAINT chk_user_bookmark_personal_tags_array CHECK (jsonb_typeof(ubmp_tags) = 'array');

CREATE UNIQUE INDEX IF NOT EXISTS uq_user_bookmark_personal_target_active ON user_bookmark_personal (user_id, ubmp_owner_type, ubmp_owner_id) WHERE ubmp_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_bookmark_personal_user_active ON user_bookmark_personal (user_id) WHERE ubmp_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_bookmark_personal_category_active ON user_bookmark_personal (ubmp_category_group, ubmp_category_code) WHERE ubmp_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_bookmark_personal_subtype_active ON user_bookmark_personal (ubmp_subtype_group, ubmp_subtype_code) WHERE ubmp_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_bookmark_personal_owner_active ON user_bookmark_personal (ubmp_owner_type, ubmp_owner_id) WHERE ubmp_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_bookmark_personal_date_active ON user_bookmark_personal (ubmp_date) WHERE ubmp_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_bookmark_personal_star_active ON user_bookmark_personal (ubmp_star) WHERE ubmp_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS gin_user_bookmark_personal_tags ON user_bookmark_personal USING GIN (ubmp_tags);

CREATE OR REPLACE FUNCTION set_updated_at_user_bookmark_personal() RETURNS TRIGGER AS $$
BEGIN
  NEW.ubmp_updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_user_bookmark_personal_updated ON user_bookmark_personal;
CREATE TRIGGER trg_user_bookmark_personal_updated BEFORE UPDATE ON user_bookmark_personal FOR EACH ROW EXECUTE FUNCTION set_updated_at_user_bookmark_personal();

