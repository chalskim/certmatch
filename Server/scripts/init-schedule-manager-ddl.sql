CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS user_schedule_event (
  usce_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  usce_title VARCHAR(100) NOT NULL,
  usce_type_group VARCHAR(64) NOT NULL DEFAULT 'EVENT_TYPE',
  usce_type_code VARCHAR(64) NOT NULL,
  usce_start_at TIMESTAMPTZ NOT NULL,
  usce_end_at TIMESTAMPTZ,
  usce_location_text VARCHAR(100),
  usce_region_group VARCHAR(64) NOT NULL DEFAULT 'REGION',
  usce_region_code VARCHAR(64),
  usce_memo TEXT,
  usce_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  usce_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  usce_deleted_at TIMESTAMPTZ
);

ALTER TABLE user_schedule_event ADD CONSTRAINT fk_user_schedule_event_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE user_schedule_event ADD CONSTRAINT fk_user_schedule_event_type FOREIGN KEY (usce_type_group, usce_type_code) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE user_schedule_event ADD CONSTRAINT fk_user_schedule_event_region FOREIGN KEY (usce_region_group, usce_region_code) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE user_schedule_event ADD CONSTRAINT chk_user_schedule_event_time_range CHECK (usce_end_at IS NULL OR usce_end_at >= usce_start_at);

CREATE OR REPLACE FUNCTION set_updated_at_user_schedule_event() RETURNS TRIGGER AS $$
BEGIN
  NEW.usce_updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_user_schedule_event_updated ON user_schedule_event;
CREATE TRIGGER trg_user_schedule_event_updated BEFORE UPDATE ON user_schedule_event FOR EACH ROW EXECUTE FUNCTION set_updated_at_user_schedule_event();

CREATE INDEX IF NOT EXISTS idx_user_schedule_event_user_active ON user_schedule_event (user_id) WHERE usce_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_schedule_event_type_active ON user_schedule_event (usce_type_group, usce_type_code) WHERE usce_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_schedule_event_time_active ON user_schedule_event (usce_start_at, usce_end_at) WHERE usce_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_schedule_event_region_active ON user_schedule_event (usce_region_group, usce_region_code) WHERE usce_deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS user_schedule_deadline (
  usdl_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  usdl_title VARCHAR(100) NOT NULL,
  usdl_type_group VARCHAR(64) NOT NULL DEFAULT 'DEADLINE_TYPE',
  usdl_type_code VARCHAR(64) NOT NULL,
  usdl_date DATE NOT NULL,
  usdl_description TEXT,
  usdl_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  usdl_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  usdl_deleted_at TIMESTAMPTZ
);

ALTER TABLE user_schedule_deadline ADD CONSTRAINT fk_user_schedule_deadline_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE user_schedule_deadline ADD CONSTRAINT fk_user_schedule_deadline_type FOREIGN KEY (usdl_type_group, usdl_type_code) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;

CREATE OR REPLACE FUNCTION set_updated_at_user_schedule_deadline() RETURNS TRIGGER AS $$
BEGIN
  NEW.usdl_updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_user_schedule_deadline_updated ON user_schedule_deadline;
CREATE TRIGGER trg_user_schedule_deadline_updated BEFORE UPDATE ON user_schedule_deadline FOR EACH ROW EXECUTE FUNCTION set_updated_at_user_schedule_deadline();

CREATE INDEX IF NOT EXISTS idx_user_schedule_deadline_user_active ON user_schedule_deadline (user_id) WHERE usdl_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_schedule_deadline_type_active ON user_schedule_deadline (usdl_type_group, usdl_type_code) WHERE usdl_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_schedule_deadline_date_active ON user_schedule_deadline (usdl_date) WHERE usdl_deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS user_schedule_setting (
  uscs_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  uscs_notifications BOOLEAN NOT NULL DEFAULT TRUE,
  uscs_sharing BOOLEAN NOT NULL DEFAULT FALSE,
  uscs_google_calendar BOOLEAN NOT NULL DEFAULT FALSE,
  uscs_education_deadlines BOOLEAN NOT NULL DEFAULT TRUE,
  uscs_recruitment_deadlines BOOLEAN NOT NULL DEFAULT TRUE,
  uscs_important_deadlines BOOLEAN NOT NULL DEFAULT TRUE,
  uscs_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  uscs_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  uscs_deleted_at TIMESTAMPTZ
);

ALTER TABLE user_schedule_setting ADD CONSTRAINT fk_user_schedule_setting_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE NO ACTION;
CREATE UNIQUE INDEX IF NOT EXISTS uq_user_schedule_setting_user_active ON user_schedule_setting (user_id) WHERE uscs_deleted_at IS NULL;

CREATE OR REPLACE FUNCTION set_updated_at_user_schedule_setting() RETURNS TRIGGER AS $$
BEGIN
  NEW.uscs_updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_user_schedule_setting_updated ON user_schedule_setting;
CREATE TRIGGER trg_user_schedule_setting_updated BEFORE UPDATE ON user_schedule_setting FOR EACH ROW EXECUTE FUNCTION set_updated_at_user_schedule_setting();

