CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TYPE IF EXISTS code_state_enum;
CREATE TYPE code_state_enum AS ENUM ('active','inactive','deprecated');

CREATE TABLE IF NOT EXISTS users (
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_email varchar(255) NOT NULL,
  user_password_hash text NOT NULL,
  user_password_algo varchar(32) NOT NULL DEFAULT 'argon2id',
  user_display_name varchar(100),
  user_email_verified boolean NOT NULL DEFAULT false,
  user_state code_state_enum NOT NULL DEFAULT 'active',
  user_last_login timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  user_deleted_at timestamptz,
  CONSTRAINT chk_users_email_format CHECK (user_email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);

DROP TRIGGER IF EXISTS trg_users_updated ON users;
CREATE OR REPLACE FUNCTION set_updated_at_ts() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trg_users_updated BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION set_updated_at_ts();

CREATE TABLE IF NOT EXISTS cert_code (
  code_gb VARCHAR(64) NOT NULL,
  code_key VARCHAR(64) NOT NULL,
  code_name VARCHAR(255) NOT NULL,
  code_value TEXT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  code_state code_state_enum NOT NULL DEFAULT 'active',
  remarks TEXT NULL,
  code_crt_dt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  code_udt_dt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  code_del_dt TIMESTAMPTZ NULL,
  created_by UUID NULL REFERENCES users(user_id) ON DELETE SET NULL,
  updated_by UUID NULL REFERENCES users(user_id) ON DELETE SET NULL,
  PRIMARY KEY (code_gb, code_key)
);

CREATE INDEX IF NOT EXISTS idx_cert_code_gb ON cert_code (code_gb);
CREATE INDEX IF NOT EXISTS idx_cert_code_state ON cert_code (code_state);
CREATE INDEX IF NOT EXISTS idx_cert_code_active ON cert_code (code_gb, display_order)
  WHERE code_state = 'active' AND code_del_dt IS NULL;

CREATE OR REPLACE FUNCTION set_cert_code_udt_dt() RETURNS TRIGGER AS $$
BEGIN
  NEW.code_udt_dt := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_cert_code_udt ON cert_code;
CREATE TRIGGER trg_cert_code_udt BEFORE UPDATE ON cert_code FOR EACH ROW EXECUTE FUNCTION set_cert_code_udt_dt();

INSERT INTO cert_code (code_gb, code_key, code_name, code_value, display_order, remarks) VALUES
('INDUSTRY','all','전체','all',0,'모든 산업 필터'),
('INDUSTRY','finance','금융','finance',10,NULL),
('INDUSTRY','medical','의료','medical',20,NULL),
('INDUSTRY','manufacturing','제조','manufacturing',30,NULL),
('INDUSTRY','it','IT','it',40,NULL),
('INDUSTRY','public','공공','public',50,NULL),
('INDUSTRY','distribution','유통','distribution',60,NULL),
('INDUSTRY','education','교육','education',70,NULL),
('INDUSTRY','logistics','물류','logistics',80,NULL),
('INDUSTRY','environment','환경','environment',90,NULL),
('INDUSTRY','food','식품','food',100,NULL),
('CERT_TYPE','all','전체','all',0,'모든 인증 유형 필터'),
('CERT_TYPE','isms','ISMS','isms',10,NULL),
('CERT_TYPE','isms_p','ISMS-P','isms_p',20,NULL),
('CERT_TYPE','iso_27001','ISO 27001','iso_27001',30,NULL),
('CERT_TYPE','iso_9001','ISO 9001','iso_9001',40,NULL),
('CERT_TYPE','iso_14001','ISO 14001','iso_14001',50,NULL),
('CERT_TYPE','gs_cert','GS 인증','gs_cert',60,NULL),
('CERT_TYPE','cppg','CPPG','cppg',70,NULL),
('CERT_TYPE','csap','CSAP','csap',80,NULL),
('CERT_TYPE','gdpr','GDPR','gdpr',90,NULL),
('CERT_TYPE','espm','ESPM','espm',100,NULL),
('CERT_TYPE','hipaa','HIPAA','hipaa',110,NULL),
('ACTIVITY','all','전체','all',0,'모든 활동 영역 필터'),
('ACTIVITY','certification','인증','certification',10,NULL),
('ACTIVITY','consulting','컨설팅','consulting',20,NULL),
('ACTIVITY','mock_cert','모의인증','mock_cert',30,NULL),
('ACTIVITY','gov_support','정부지원','gov_support',40,NULL)
ON CONFLICT (code_gb, code_key) DO NOTHING;
