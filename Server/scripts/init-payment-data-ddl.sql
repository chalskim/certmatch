CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION set_updated_at_ts() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS pay_order (
  pord_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid,
  pord_code varchar(64) UNIQUE,
  pord_title varchar(255),
  pord_status_gb varchar(64) NOT NULL DEFAULT 'ORDER_STATUS',
  pord_status_key varchar(64) NOT NULL,
  pord_currency char(3) NOT NULL,
  pord_total_amount numeric(12,2) NOT NULL DEFAULT 0,
  pord_discount_amount numeric(12,2) NOT NULL DEFAULT 0,
  pord_tax_amount numeric(12,2) NOT NULL DEFAULT 0,
  pord_meta_json jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  pord_deleted_at timestamptz,
  CONSTRAINT chk_pord_currency_format CHECK (pord_currency ~ '^[A-Z]{3}$')
);

ALTER TABLE pay_order ADD CONSTRAINT fk_pay_order_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE pay_order ADD CONSTRAINT fk_pay_order_status FOREIGN KEY (pord_status_gb, pord_status_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE pay_order ADD CONSTRAINT chk_pay_order_status_gb CHECK (pord_status_gb = 'ORDER_STATUS');

CREATE INDEX IF NOT EXISTS idx_pay_order_user ON pay_order (user_id);
CREATE INDEX IF NOT EXISTS idx_pay_order_status ON pay_order (pord_status_key) WHERE pord_deleted_at IS NULL;

DROP TRIGGER IF EXISTS trg_pay_order_updated ON pay_order;
CREATE TRIGGER trg_pay_order_updated BEFORE UPDATE ON pay_order FOR EACH ROW EXECUTE FUNCTION set_updated_at_ts();

CREATE TABLE IF NOT EXISTS pay_order_item (
  poit_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  pord_id uuid NOT NULL,
  poit_seq int NOT NULL DEFAULT 1,
  poit_name varchar(255) NOT NULL,
  poit_desc text,
  poit_qty int NOT NULL DEFAULT 1,
  poit_unit_price numeric(12,2) NOT NULL DEFAULT 0,
  poit_currency char(3) NOT NULL,
  poit_total_amount numeric(12,2) NOT NULL DEFAULT 0,
  poit_meta_json jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  poit_deleted_at timestamptz,
  CONSTRAINT chk_poit_currency_format CHECK (poit_currency ~ '^[A-Z]{3}$')
);

ALTER TABLE pay_order_item ADD CONSTRAINT fk_pay_order_item_order FOREIGN KEY (pord_id) REFERENCES pay_order(pord_id) ON UPDATE CASCADE ON DELETE CASCADE;

CREATE UNIQUE INDEX IF NOT EXISTS ux_pay_order_item_seq_active ON pay_order_item (pord_id, poit_seq) WHERE poit_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_pay_order_item_order ON pay_order_item (pord_id);

DROP TRIGGER IF EXISTS trg_pay_order_item_updated ON pay_order_item;
CREATE TRIGGER trg_pay_order_item_updated BEFORE UPDATE ON pay_order_item FOR EACH ROW EXECUTE FUNCTION set_updated_at_ts();

CREATE TABLE IF NOT EXISTS pay_payment (
  pay_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  pord_id uuid NOT NULL,
  pay_method_gb varchar(64) NOT NULL DEFAULT 'PAYMENT_METHOD',
  pay_method_key varchar(64) NOT NULL,
  pay_status_gb varchar(64) NOT NULL DEFAULT 'PAYMENT_STATUS',
  pay_status_key varchar(64) NOT NULL,
  pay_amount numeric(12,2) NOT NULL,
  pay_currency char(3) NOT NULL,
  pay_provider varchar(64),
  pay_external_id varchar(255),
  pay_confirmed_at timestamptz,
  pay_meta_json jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  pay_deleted_at timestamptz,
  CONSTRAINT chk_pay_currency_format CHECK (pay_currency ~ '^[A-Z]{3}$')
);

ALTER TABLE pay_payment ADD CONSTRAINT fk_pay_payment_order FOREIGN KEY (pord_id) REFERENCES pay_order(pord_id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE pay_payment ADD CONSTRAINT fk_pay_payment_method FOREIGN KEY (pay_method_gb, pay_method_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE pay_payment ADD CONSTRAINT fk_pay_payment_status FOREIGN KEY (pay_status_gb, pay_status_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE pay_payment ADD CONSTRAINT chk_pay_payment_method_gb CHECK (pay_method_gb = 'PAYMENT_METHOD');
ALTER TABLE pay_payment ADD CONSTRAINT chk_pay_payment_status_gb CHECK (pay_status_gb = 'PAYMENT_STATUS');

CREATE UNIQUE INDEX IF NOT EXISTS ux_pay_payment_external_id_active ON pay_payment (pay_provider, pay_external_id) WHERE pay_external_id IS NOT NULL AND pay_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_pay_payment_order ON pay_payment (pord_id);
CREATE INDEX IF NOT EXISTS idx_pay_payment_status ON pay_payment (pay_status_key) WHERE pay_deleted_at IS NULL;

DROP TRIGGER IF EXISTS trg_pay_payment_updated ON pay_payment;
CREATE TRIGGER trg_pay_payment_updated BEFORE UPDATE ON pay_payment FOR EACH ROW EXECUTE FUNCTION set_updated_at_ts();

CREATE TABLE IF NOT EXISTS pay_transaction (
  ptxn_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  pay_id uuid NOT NULL,
  ptxn_type_gb varchar(64) NOT NULL DEFAULT 'PAYMENT_TXN_TYPE',
  ptxn_type_key varchar(64) NOT NULL,
  ptxn_amount numeric(12,2) NOT NULL,
  ptxn_currency char(3) NOT NULL,
  ptxn_external_id varchar(255),
  ptxn_message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  ptxn_deleted_at timestamptz,
  CONSTRAINT chk_ptxn_currency_format CHECK (ptxn_currency ~ '^[A-Z]{3}$')
);

ALTER TABLE pay_transaction ADD CONSTRAINT fk_pay_transaction_payment FOREIGN KEY (pay_id) REFERENCES pay_payment(pay_id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE pay_transaction ADD CONSTRAINT fk_pay_transaction_type FOREIGN KEY (ptxn_type_gb, ptxn_type_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE pay_transaction ADD CONSTRAINT chk_pay_transaction_type_gb CHECK (ptxn_type_gb = 'PAYMENT_TXN_TYPE');

CREATE UNIQUE INDEX IF NOT EXISTS ux_pay_transaction_external_id_active ON pay_transaction (ptxn_external_id) WHERE ptxn_external_id IS NOT NULL AND ptxn_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_pay_transaction_payment ON pay_transaction (pay_id);

DROP TRIGGER IF EXISTS trg_pay_transaction_updated ON pay_transaction;
CREATE TRIGGER trg_pay_transaction_updated BEFORE UPDATE ON pay_transaction FOR EACH ROW EXECUTE FUNCTION set_updated_at_ts();

CREATE TABLE IF NOT EXISTS pay_refund (
  pref_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  pay_id uuid NOT NULL,
  ptxn_id uuid,
  pref_amount numeric(12,2) NOT NULL,
  pref_currency char(3) NOT NULL,
  pref_reason_gb varchar(64) NOT NULL DEFAULT 'REFUND_REASON',
  pref_reason_key varchar(64) NOT NULL,
  pref_status_gb varchar(64) NOT NULL DEFAULT 'REFUND_STATUS',
  pref_status_key varchar(64) NOT NULL,
  pref_external_id varchar(255),
  pref_requested_at timestamptz NOT NULL DEFAULT now(),
  pref_processed_at timestamptz,
  pref_meta_json jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  pref_deleted_at timestamptz,
  CONSTRAINT chk_pref_currency_format CHECK (pref_currency ~ '^[A-Z]{3}$')
);

ALTER TABLE pay_refund ADD CONSTRAINT fk_pay_refund_payment FOREIGN KEY (pay_id) REFERENCES pay_payment(pay_id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE pay_refund ADD CONSTRAINT fk_pay_refund_transaction FOREIGN KEY (ptxn_id) REFERENCES pay_transaction(ptxn_id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE pay_refund ADD CONSTRAINT fk_pay_refund_reason FOREIGN KEY (pref_reason_gb, pref_reason_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE pay_refund ADD CONSTRAINT fk_pay_refund_status FOREIGN KEY (pref_status_gb, pref_status_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE pay_refund ADD CONSTRAINT chk_pay_refund_reason_gb CHECK (pref_reason_gb = 'REFUND_REASON');
ALTER TABLE pay_refund ADD CONSTRAINT chk_pay_refund_status_gb CHECK (pref_status_gb = 'REFUND_STATUS');

CREATE UNIQUE INDEX IF NOT EXISTS ux_pay_refund_external_id_active ON pay_refund (pref_external_id) WHERE pref_external_id IS NOT NULL AND pref_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_pay_refund_payment ON pay_refund (pay_id);

DROP TRIGGER IF EXISTS trg_pay_refund_updated ON pay_refund;
CREATE TRIGGER trg_pay_refund_updated BEFORE UPDATE ON pay_refund FOR EACH ROW EXECUTE FUNCTION set_updated_at_ts();

CREATE TABLE IF NOT EXISTS pay_invoice (
  pinv_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  pord_id uuid NOT NULL,
  pinv_code varchar(64) UNIQUE,
  pinv_amount numeric(12,2) NOT NULL,
  pinv_currency char(3) NOT NULL,
  pinv_issue_date timestamptz NOT NULL DEFAULT now(),
  pinv_due_date timestamptz,
  pinv_status_gb varchar(64) NOT NULL DEFAULT 'INVOICE_STATUS',
  pinv_status_key varchar(64) NOT NULL,
  pinv_meta_json jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  pinv_deleted_at timestamptz,
  CONSTRAINT chk_pinv_currency_format CHECK (pinv_currency ~ '^[A-Z]{3}$')
);

ALTER TABLE pay_invoice ADD CONSTRAINT fk_pay_invoice_order FOREIGN KEY (pord_id) REFERENCES pay_order(pord_id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE pay_invoice ADD CONSTRAINT fk_pay_invoice_status FOREIGN KEY (pinv_status_gb, pinv_status_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE pay_invoice ADD CONSTRAINT chk_pay_invoice_status_gb CHECK (pinv_status_gb = 'INVOICE_STATUS');

CREATE INDEX IF NOT EXISTS idx_pay_invoice_order ON pay_invoice (pord_id);

DROP TRIGGER IF EXISTS trg_pay_invoice_updated ON pay_invoice;
CREATE TRIGGER trg_pay_invoice_updated BEFORE UPDATE ON pay_invoice FOR EACH ROW EXECUTE FUNCTION set_updated_at_ts();

