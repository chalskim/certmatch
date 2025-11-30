CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS site_banner (
  bnr_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  bnr_title varchar(255) NOT NULL,
  bnr_description varchar(1000),
  bnr_button_text varchar(100),
  bnr_link_url varchar(1024),
  bnr_image_url varchar(1024),
  bnr_image_ref varchar(64),
  bnr_start_date date NOT NULL,
  bnr_end_date date NOT NULL,
  bnr_slot integer NOT NULL DEFAULT 1,
  bnr_channel_gb varchar(64) DEFAULT 'BANNER_CHANNEL',
  bnr_channel_key varchar(64),
  bnr_location_gb varchar(64) DEFAULT 'BANNER_LOCATION',
  bnr_location_key varchar(64),
  bnr_state_gb varchar(64) DEFAULT 'BANNER_STATE',
  bnr_state_key varchar(64),
  bnr_display_order integer NOT NULL DEFAULT 0,
  bnr_is_active boolean NOT NULL DEFAULT true,
  created_by uuid NULL REFERENCES users(user_id) ON DELETE SET NULL,
  updated_by uuid NULL REFERENCES users(user_id) ON DELETE SET NULL,
  bnr_created_at timestamptz NOT NULL DEFAULT now(),
  bnr_updated_at timestamptz NOT NULL DEFAULT now(),
  bnr_deleted_at timestamptz NULL,
  CONSTRAINT chk_site_banner_date_range CHECK (bnr_start_date <= bnr_end_date),
  CONSTRAINT chk_site_banner_slot CHECK (bnr_slot BETWEEN 1 AND 4)
);

ALTER TABLE site_banner ADD CONSTRAINT fk_site_banner_channel FOREIGN KEY (bnr_channel_gb, bnr_channel_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE site_banner ADD CONSTRAINT fk_site_banner_location FOREIGN KEY (bnr_location_gb, bnr_location_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE site_banner ADD CONSTRAINT fk_site_banner_state FOREIGN KEY (bnr_state_gb, bnr_state_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;

CREATE INDEX IF NOT EXISTS idx_site_banner_active ON site_banner (bnr_is_active) WHERE bnr_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_site_banner_date ON site_banner (bnr_start_date, bnr_end_date) WHERE bnr_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_site_banner_slot_date ON site_banner (bnr_slot, bnr_start_date, bnr_end_date) WHERE bnr_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_site_banner_channel ON site_banner (bnr_channel_gb, bnr_channel_key) WHERE bnr_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_site_banner_location ON site_banner (bnr_location_gb, bnr_location_key) WHERE bnr_deleted_at IS NULL;

CREATE OR REPLACE FUNCTION set_updated_at_site_banner() RETURNS TRIGGER AS $$
BEGIN
  NEW.bnr_updated_at := now();
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_site_banner_updated ON site_banner;
CREATE TRIGGER trg_site_banner_updated BEFORE UPDATE ON site_banner FOR EACH ROW EXECUTE FUNCTION set_updated_at_site_banner();

