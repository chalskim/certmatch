CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS user_payment_personal (
  upmp_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  upmp_owner_type VARCHAR(50) NOT NULL,
  upmp_owner_id UUID NOT NULL,
  upmp_status_group VARCHAR(64) NOT NULL DEFAULT 'PAYMENT_STATUS',
  upmp_status_code VARCHAR(64) NOT NULL,
  upmp_method_group VARCHAR(64),
  upmp_method_code VARCHAR(64),
  upmp_type_group VARCHAR(64) NOT NULL DEFAULT 'PAYMENT_TYPE',
  upmp_type_code VARCHAR(64) NOT NULL,
  upmp_service_title VARCHAR(255) NOT NULL,
  upmp_description TEXT,
  upmp_amount NUMERIC(12,2) NOT NULL,
  upmp_currency CHAR(3) NOT NULL DEFAULT 'KRW',
  upmp_date TIMESTAMPTZ NOT NULL,
  upmp_txn_ref VARCHAR(100),
  upmp_tags JSONB NOT NULL DEFAULT '[]'::JSONB,
  upmp_note TEXT,
  upmp_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  upmp_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  upmp_deleted_at TIMESTAMPTZ
);

ALTER TABLE user_payment_personal ADD CONSTRAINT fk_user_payment_personal_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE user_payment_personal ADD CONSTRAINT fk_user_payment_personal_status FOREIGN KEY (upmp_status_group, upmp_status_code) REFERENCES public.cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE user_payment_personal ADD CONSTRAINT fk_user_payment_personal_method FOREIGN KEY (upmp_method_group, upmp_method_code) REFERENCES public.cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE user_payment_personal ADD CONSTRAINT fk_user_payment_personal_type FOREIGN KEY (upmp_type_group, upmp_type_code) REFERENCES public.cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE user_payment_personal ADD CONSTRAINT chk_user_payment_personal_amount_pos CHECK (upmp_amount >= 0);
ALTER TABLE user_payment_personal ADD CONSTRAINT chk_user_payment_personal_currency_code CHECK (upmp_currency ~ '^[A-Z]{3}$');
ALTER TABLE user_payment_personal ADD CONSTRAINT chk_user_payment_personal_tags_array CHECK (jsonb_typeof(upmp_tags) = 'array');

CREATE UNIQUE INDEX IF NOT EXISTS uq_user_payment_personal_txn_ref_notnull ON user_payment_personal (upmp_txn_ref) WHERE upmp_txn_ref IS NOT NULL AND upmp_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_payment_personal_user_active ON user_payment_personal (user_id) WHERE upmp_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_payment_personal_status_active ON user_payment_personal (upmp_status_group, upmp_status_code) WHERE upmp_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_payment_personal_method_active ON user_payment_personal (upmp_method_group, upmp_method_code) WHERE upmp_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_payment_personal_type_active ON user_payment_personal (upmp_type_group, upmp_type_code) WHERE upmp_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_payment_personal_owner_active ON user_payment_personal (upmp_owner_type, upmp_owner_id) WHERE upmp_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_payment_personal_date_active ON user_payment_personal (upmp_date) WHERE upmp_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_payment_personal_amount_active ON user_payment_personal (upmp_amount) WHERE upmp_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_payment_personal_currency_active ON user_payment_personal (upmp_currency) WHERE upmp_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS gin_user_payment_personal_tags ON user_payment_personal USING GIN (upmp_tags);

CREATE OR REPLACE FUNCTION set_updated_at_user_payment_personal() RETURNS TRIGGER AS $$
BEGIN
  NEW.upmp_updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_user_payment_personal_updated ON user_payment_personal;
CREATE TRIGGER trg_user_payment_personal_updated BEFORE UPDATE ON user_payment_personal FOR EACH ROW EXECUTE FUNCTION set_updated_at_user_payment_personal();

