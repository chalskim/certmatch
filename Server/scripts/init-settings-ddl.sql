CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS user_settings_def (
  usdf_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  usdf_key_gb varchar(64) NOT NULL DEFAULT 'SETTINGS_KEY',
  usdf_key varchar(64) NOT NULL,
  usdf_type_gb varchar(64) NOT NULL DEFAULT 'SETTINGS_TYPE',
  usdf_type_key varchar(64) NOT NULL,
  usdf_group_gb varchar(64) NOT NULL DEFAULT 'SETTINGS_GROUP',
  usdf_group_key varchar(64) NOT NULL,
  usdf_title varchar(255) NOT NULL,
  usdf_description varchar(500),
  usdf_icon varchar(50),
  usdf_default_bool boolean,
  usdf_default_text varchar(255),
  usdf_display_order integer NOT NULL DEFAULT 0,
  usdf_is_active boolean NOT NULL DEFAULT true,
  usdf_created_at timestamptz NOT NULL DEFAULT now(),
  usdf_updated_at timestamptz NOT NULL DEFAULT now(),
  usdf_deleted_at timestamptz NULL
);

ALTER TABLE user_settings_def ADD CONSTRAINT fk_usdf_key FOREIGN KEY (usdf_key_gb, usdf_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE user_settings_def ADD CONSTRAINT fk_usdf_type FOREIGN KEY (usdf_type_gb, usdf_type_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE user_settings_def ADD CONSTRAINT fk_usdf_group FOREIGN KEY (usdf_group_gb, usdf_group_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;

CREATE UNIQUE INDEX IF NOT EXISTS uq_user_settings_def_key_active ON user_settings_def (usdf_key_gb, usdf_key) WHERE usdf_deleted_at IS NULL AND usdf_is_active = true;
CREATE INDEX IF NOT EXISTS idx_user_settings_def_type ON user_settings_def (usdf_type_gb, usdf_type_key) WHERE usdf_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_settings_def_group ON user_settings_def (usdf_group_gb, usdf_group_key) WHERE usdf_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_settings_def_order ON user_settings_def (usdf_group_gb, usdf_group_key, usdf_display_order) WHERE usdf_deleted_at IS NULL AND usdf_is_active = true;

CREATE OR REPLACE FUNCTION set_updated_at_user_settings_def() RETURNS TRIGGER AS $$
BEGIN
  NEW.usdf_updated_at := now();
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_user_settings_def_updated ON user_settings_def;
CREATE TRIGGER trg_user_settings_def_updated BEFORE UPDATE ON user_settings_def FOR EACH ROW EXECUTE FUNCTION set_updated_at_user_settings_def();

CREATE TABLE IF NOT EXISTS user_settings (
  uset_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  uset_def_id uuid NOT NULL,
  uset_val_bool boolean,
  uset_val_text varchar(255),
  uset_created_at timestamptz NOT NULL DEFAULT now(),
  uset_updated_at timestamptz NOT NULL DEFAULT now(),
  uset_deleted_at timestamptz NULL
);

ALTER TABLE user_settings ADD CONSTRAINT fk_user_settings_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE user_settings ADD CONSTRAINT fk_user_settings_def FOREIGN KEY (uset_def_id) REFERENCES user_settings_def(usdf_id) ON DELETE RESTRICT ON UPDATE NO ACTION;

CREATE UNIQUE INDEX IF NOT EXISTS uq_user_settings_active ON user_settings (user_id, uset_def_id) WHERE uset_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_settings_user ON user_settings (user_id) WHERE uset_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_settings_def ON user_settings (uset_def_id) WHERE uset_deleted_at IS NULL;

CREATE OR REPLACE FUNCTION set_updated_at_user_settings() RETURNS TRIGGER AS $$
BEGIN
  NEW.uset_updated_at := now();
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_user_settings_updated ON user_settings;
CREATE TRIGGER trg_user_settings_updated BEFORE UPDATE ON user_settings FOR EACH ROW EXECUTE FUNCTION set_updated_at_user_settings();

