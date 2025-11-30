CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS user_payment_company (
  upmc_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  upmc_owner_type VARCHAR(50) NOT NULL,
  upmc_owner_id UUID NOT NULL,
  upmc_service_group VARCHAR(64),
  upmc_service_code VARCHAR(64),
  upmc_status_group VARCHAR(64) NOT NULL DEFAULT 'PAYMENT_STATUS',
  upmc_status_code VARCHAR(64) NOT NULL,
  upmc_method_group VARCHAR(64),
  upmc_method_code VARCHAR(64),
  upmc_service_title VARCHAR(255) NOT NULL,
  upmc_description TEXT,
  upmc_amount NUMERIC(12,2) NOT NULL,
  upmc_currency CHAR(3) NOT NULL DEFAULT 'KRW',
  upmc_date TIMESTAMPTZ NOT NULL,
  upmc_txn_ref VARCHAR(100),
  upmc_tags JSONB NOT NULL DEFAULT '[]'::JSONB,
  upmc_note TEXT,
  upmc_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  upmc_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  upmc_deleted_at TIMESTAMPTZ
);

ALTER TABLE user_payment_company ADD CONSTRAINT fk_user_payment_company_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE user_payment_company ADD CONSTRAINT fk_user_payment_company_service FOREIGN KEY (upmc_service_group, upmc_service_code) REFERENCES public.cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE user_payment_company ADD CONSTRAINT fk_user_payment_company_status FOREIGN KEY (upmc_status_group, upmc_status_code) REFERENCES public.cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE user_payment_company ADD CONSTRAINT fk_user_payment_company_method FOREIGN KEY (upmc_method_group, upmc_method_code) REFERENCES public.cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE user_payment_company ADD CONSTRAINT chk_user_payment_company_amount_pos CHECK (upmc_amount >= 0);
ALTER TABLE user_payment_company ADD CONSTRAINT chk_user_payment_company_currency_code CHECK (upmc_currency ~ '^[A-Z]{3}$');
ALTER TABLE user_payment_company ADD CONSTRAINT chk_user_payment_company_tags_array CHECK (jsonb_typeof(upmc_tags) = 'array');

CREATE UNIQUE INDEX IF NOT EXISTS uq_user_payment_company_txn_ref_notnull ON user_payment_company (upmc_txn_ref) WHERE upmc_txn_ref IS NOT NULL AND upmc_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_payment_company_user_active ON user_payment_company (user_id) WHERE upmc_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_payment_company_status_active ON user_payment_company (upmc_status_group, upmc_status_code) WHERE upmc_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_payment_company_method_active ON user_payment_company (upmc_method_group, upmc_method_code) WHERE upmc_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_payment_company_service_active ON user_payment_company (upmc_service_group, upmc_service_code) WHERE upmc_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_payment_company_owner_active ON user_payment_company (upmc_owner_type, upmc_owner_id) WHERE upmc_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_payment_company_date_active ON user_payment_company (upmc_date) WHERE upmc_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_payment_company_amount_active ON user_payment_company (upmc_amount) WHERE upmc_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_payment_company_currency_active ON user_payment_company (upmc_currency) WHERE upmc_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS gin_user_payment_company_tags ON user_payment_company USING GIN (upmc_tags);

CREATE OR REPLACE FUNCTION set_updated_at_user_payment_company() RETURNS TRIGGER AS $$
BEGIN
  NEW.upmc_updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_user_payment_company_updated ON user_payment_company;
CREATE TRIGGER trg_user_payment_company_updated BEFORE UPDATE ON user_payment_company FOR EACH ROW EXECUTE FUNCTION set_updated_at_user_payment_company();

