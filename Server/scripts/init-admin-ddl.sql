CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION set_updated_at_ts() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS admin_permission (
  adm_perm_id      uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  adm_perm_key     varchar(64)  NOT NULL,
  adm_perm_name    varchar(255) NOT NULL,
  adm_perm_desc    text,
  adm_state        code_state_enum NOT NULL DEFAULT 'active',
  adm_remarks      text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  adm_deleted_at   timestamptz
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_admin_permission_key_active
  ON admin_permission (adm_perm_key)
  WHERE adm_deleted_at IS NULL;

DROP TRIGGER IF EXISTS trg_admin_permission_updated ON admin_permission;
CREATE TRIGGER trg_admin_permission_updated
BEFORE UPDATE ON admin_permission
FOR EACH ROW EXECUTE FUNCTION set_updated_at_ts();

CREATE TABLE IF NOT EXISTS admin_role (
  adm_role_id      uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  adm_role_key     varchar(64)  NOT NULL,
  adm_role_name    varchar(255) NOT NULL,
  adm_role_desc    text,
  adm_state        code_state_enum NOT NULL DEFAULT 'active',
  adm_remarks      text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  adm_deleted_at   timestamptz
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_admin_role_key_active
  ON admin_role (adm_role_key)
  WHERE adm_deleted_at IS NULL;

DROP TRIGGER IF EXISTS trg_admin_role_updated ON admin_role;
CREATE TRIGGER trg_admin_role_updated
BEFORE UPDATE ON admin_role
FOR EACH ROW EXECUTE FUNCTION set_updated_at_ts();

CREATE TABLE IF NOT EXISTS admin_role_permission (
  adm_rperm_id     uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  adm_role_id      uuid NOT NULL,
  adm_perm_id      uuid NOT NULL,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  adm_deleted_at   timestamptz,
  CONSTRAINT fk_admin_role_permission_role FOREIGN KEY (adm_role_id)
    REFERENCES admin_role(adm_role_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_admin_role_permission_perm FOREIGN KEY (adm_perm_id)
    REFERENCES admin_permission(adm_perm_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_admin_role_permission_unique_active
  ON admin_role_permission (adm_role_id, adm_perm_id)
  WHERE adm_deleted_at IS NULL;

DROP TRIGGER IF EXISTS trg_admin_role_permission_updated ON admin_role_permission;
CREATE TRIGGER trg_admin_role_permission_updated
BEFORE UPDATE ON admin_role_permission
FOR EACH ROW EXECUTE FUNCTION set_updated_at_ts();

CREATE TABLE IF NOT EXISTS admin_user_role (
  adm_urole_id     uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          uuid NOT NULL,
  adm_role_id      uuid NOT NULL,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  adm_deleted_at   timestamptz,
  CONSTRAINT fk_admin_user_role_user FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_admin_user_role_role FOREIGN KEY (adm_role_id)
    REFERENCES admin_role(adm_role_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_admin_user_role_unique_active
  ON admin_user_role (user_id, adm_role_id)
  WHERE adm_deleted_at IS NULL;

DROP TRIGGER IF EXISTS trg_admin_user_role_updated ON admin_user_role;
CREATE TRIGGER trg_admin_user_role_updated
BEFORE UPDATE ON admin_user_role
FOR EACH ROW EXECUTE FUNCTION set_updated_at_ts();

CREATE TABLE IF NOT EXISTS admin_menu (
  adm_menu_id      uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  adm_parent_id    uuid,
  adm_menu_code    varchar(64)  NOT NULL,
  adm_menu_name    varchar(255) NOT NULL,
  adm_route_path   varchar(255),
  adm_route_name   varchar(255),
  adm_icon         varchar(100),
  adm_display_order integer NOT NULL DEFAULT 0,
  adm_state        code_state_enum NOT NULL DEFAULT 'active',
  adm_perm_id      uuid,
  adm_remarks      text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  adm_deleted_at   timestamptz,
  CONSTRAINT fk_admin_menu_parent FOREIGN KEY (adm_parent_id)
    REFERENCES admin_menu(adm_menu_id)
    ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT fk_admin_menu_perm FOREIGN KEY (adm_perm_id)
    REFERENCES admin_permission(adm_perm_id)
    ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_admin_menu_code_active
  ON admin_menu (adm_menu_code)
  WHERE adm_deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_admin_menu_parent ON admin_menu (adm_parent_id);
CREATE INDEX IF NOT EXISTS idx_admin_menu_state  ON admin_menu (adm_state);
CREATE INDEX IF NOT EXISTS idx_admin_menu_order  ON admin_menu (adm_display_order);

DROP TRIGGER IF EXISTS trg_admin_menu_updated ON admin_menu;
CREATE TRIGGER trg_admin_menu_updated
BEFORE UPDATE ON admin_menu
FOR EACH ROW EXECUTE FUNCTION set_updated_at_ts();

CREATE TABLE IF NOT EXISTS admin_form (
  adm_form_id      uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  adm_menu_id      uuid,
  adm_form_code    varchar(64)  NOT NULL,
  adm_form_name    varchar(255) NOT NULL,
  adm_form_desc    text,
  adm_layout_gb    varchar(64) NOT NULL DEFAULT 'FORM_LAYOUT',
  adm_layout_key   varchar(64) NOT NULL,
  adm_state        code_state_enum NOT NULL DEFAULT 'active',
  adm_remarks      text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  adm_deleted_at   timestamptz,
  CONSTRAINT fk_admin_form_menu FOREIGN KEY (adm_menu_id)
    REFERENCES admin_menu(adm_menu_id)
    ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT fk_admin_form_layout_code FOREIGN KEY (adm_layout_gb, adm_layout_key)
    REFERENCES cert_code(code_gb, code_key)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT chk_admin_form_layout_gb CHECK (adm_layout_gb = 'FORM_LAYOUT')
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_admin_form_code_active
  ON admin_form (adm_form_code)
  WHERE adm_deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_admin_form_menu  ON admin_form (adm_menu_id);
CREATE INDEX IF NOT EXISTS idx_admin_form_state ON admin_form (adm_state);

DROP TRIGGER IF EXISTS trg_admin_form_updated ON admin_form;
CREATE TRIGGER trg_admin_form_updated
BEFORE UPDATE ON admin_form
FOR EACH ROW EXECUTE FUNCTION set_updated_at_ts();

CREATE TABLE IF NOT EXISTS admin_form_field (
  adm_field_id       uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  adm_form_id        uuid NOT NULL,
  adm_field_seq      int  NOT NULL DEFAULT 1,
  adm_field_key      varchar(64)  NOT NULL,
  adm_field_label    varchar(255) NOT NULL,
  adm_field_type_gb  varchar(64) NOT NULL DEFAULT 'FORM_FIELD_TYPE',
  adm_field_type_key varchar(64) NOT NULL,
  adm_widget_gb      varchar(64) DEFAULT 'FIELD_WIDGET',
  adm_widget_key     varchar(64),
  adm_required       boolean NOT NULL DEFAULT false,
  adm_placeholder    varchar(255),
  adm_help_text      text,
  adm_default_value  text,
  adm_options_json   jsonb,
  adm_validations_json jsonb,
  adm_state          code_state_enum NOT NULL DEFAULT 'active',
  adm_remarks        text,
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now(),
  adm_deleted_at     timestamptz,
  CONSTRAINT fk_admin_form_field_form FOREIGN KEY (adm_form_id)
    REFERENCES admin_form(adm_form_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_admin_form_field_type FOREIGN KEY (adm_field_type_gb, adm_field_type_key)
    REFERENCES cert_code(code_gb, code_key)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_admin_form_field_widget FOREIGN KEY (adm_widget_gb, adm_widget_key)
    REFERENCES cert_code(code_gb, code_key)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT chk_admin_form_field_type_gb CHECK (adm_field_type_gb = 'FORM_FIELD_TYPE'),
  CONSTRAINT chk_admin_form_field_widget_gb CHECK (adm_widget_gb IS NULL OR adm_widget_gb = 'FIELD_WIDGET'),
  CONSTRAINT chk_admin_form_field_options_array CHECK (adm_options_json IS NULL OR jsonb_typeof(adm_options_json) = 'array'),
  CONSTRAINT chk_admin_form_field_validations_array CHECK (adm_validations_json IS NULL OR jsonb_typeof(adm_validations_json) = 'array')
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_admin_form_field_key_active
  ON admin_form_field (adm_form_id, adm_field_key)
  WHERE adm_deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_admin_form_field_seq ON admin_form_field (adm_form_id, adm_field_seq);
CREATE INDEX IF NOT EXISTS idx_admin_form_field_state ON admin_form_field (adm_state);

DROP TRIGGER IF EXISTS trg_admin_form_field_updated ON admin_form_field;
CREATE TRIGGER trg_admin_form_field_updated
BEFORE UPDATE ON admin_form_field
FOR EACH ROW EXECUTE FUNCTION set_updated_at_ts();

INSERT INTO cert_code (code_gb, code_key, code_name, code_value, display_order, remarks) VALUES
('FORM_LAYOUT','one_column','단일열','1col',10,'단일 열 레이아웃'),
('FORM_LAYOUT','two_column','이열','2col',20,'두 열 레이아웃'),
('FORM_LAYOUT','tabs','탭','tabs',30,'탭 레이아웃'),
('FORM_LAYOUT','wizard','단계','wizard',40,'단계(Wizard) 레이아웃'),
('FORM_FIELD_TYPE','text','텍스트','text',10,NULL),
('FORM_FIELD_TYPE','textarea','텍스트영역','textarea',20,NULL),
('FORM_FIELD_TYPE','select','선택','select',30,NULL),
('FORM_FIELD_TYPE','checkbox','체크박스','checkbox',40,NULL),
('FORM_FIELD_TYPE','radio','라디오','radio',50,NULL),
('FORM_FIELD_TYPE','date','날짜','date',60,NULL),
('FORM_FIELD_TYPE','datetime','일시','datetime',70,NULL),
('FORM_FIELD_TYPE','number','숫자','number',80,NULL),
('FORM_FIELD_TYPE','file','파일','file',90,NULL),
('FORM_FIELD_TYPE','email','이메일','email',100,NULL),
('FORM_FIELD_TYPE','password','비밀번호','password',110,NULL),
('FIELD_WIDGET','input','인풋','input',10,NULL),
('FIELD_WIDGET','textarea','텍스트영역','textarea',20,NULL),
('FIELD_WIDGET','selectbox','셀렉트박스','select',30,NULL),
('FIELD_WIDGET','switch','스위치','switch',40,NULL),
('FIELD_WIDGET','radiogroup','라디오그룹','radio_group',50,NULL),
('FIELD_WIDGET','checkboxgroup','체크박스그룹','checkbox_group',60,NULL),
('FIELD_WIDGET','datepicker','데이트피커','datepicker',70,NULL),
('FIELD_WIDGET','uploader','업로더','uploader',80,NULL)
ON CONFLICT (code_gb, code_key) DO NOTHING;
