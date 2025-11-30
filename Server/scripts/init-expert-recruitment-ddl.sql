CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'expr_posting_state') THEN
    CREATE TYPE expr_posting_state AS ENUM ('draft','active','closed');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'expr_salary_type') THEN
    CREATE TYPE expr_salary_type AS ENUM ('annual','monthly','daily','project','negotiable');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'expr_employment_type') THEN
    CREATE TYPE expr_employment_type AS ENUM ('full-time','contract','freelance','intern','project');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'expr_company_info_mode') THEN
    CREATE TYPE expr_company_info_mode AS ENUM ('registered','image','manual');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS user_expert_recruitment (
  expr_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  expr_posting_state expr_posting_state NOT NULL DEFAULT 'draft',
  expr_company_info_mode expr_company_info_mode NOT NULL DEFAULT 'manual',
  expr_position varchar(255) NOT NULL,
  expr_experience varchar(255) NOT NULL,
  expr_education varchar(255) NOT NULL,
  expr_requirements text NOT NULL,
  expr_preferences text NULL,
  expr_salary_type expr_salary_type NOT NULL,
  expr_salary_range varchar(255) NOT NULL,
  expr_employment_type expr_employment_type NOT NULL,
  expr_work_hours varchar(255) NULL,
  expr_work_days varchar(255) NULL,
  expr_work_location varchar(255) NULL,
  expr_deadline_date date NOT NULL,
  expr_is_urgent boolean NOT NULL DEFAULT false,
  expr_inquiry_enabled boolean NOT NULL DEFAULT true,
  expr_main_tasks text NOT NULL,
  expr_project_details text NULL,
  expr_comp_id uuid NULL,
  expr_comp_name varchar(255) NULL,
  expr_comp_website varchar(255) NULL,
  expr_comp_founded varchar(64) NULL,
  expr_comp_size varchar(64) NULL,
  expr_comp_verified boolean NOT NULL DEFAULT false,
  expr_certifications_json jsonb NOT NULL DEFAULT '[]'::jsonb,
  expr_tech_stack_json jsonb NOT NULL DEFAULT '[]'::jsonb,
  expr_benefits_json jsonb NOT NULL DEFAULT '[]'::jsonb,
  expr_extras_json jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz NULL,
  CONSTRAINT fk_user_expert_recruitment_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT fk_user_expert_recruitment_company FOREIGN KEY (expr_comp_id) REFERENCES user_company(comp_id) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT chk_expr_company_mode_registered_compid CHECK ((expr_company_info_mode <> 'registered') OR (expr_comp_id IS NOT NULL))
);

CREATE OR REPLACE FUNCTION set_user_expert_recruitment_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_user_expert_recruitment_updated_at ON user_expert_recruitment;
CREATE TRIGGER trg_user_expert_recruitment_updated_at BEFORE UPDATE ON user_expert_recruitment FOR EACH ROW EXECUTE FUNCTION set_user_expert_recruitment_updated_at();

CREATE INDEX IF NOT EXISTS idx_user_expert_recruitment_user_id ON user_expert_recruitment (user_id);
CREATE INDEX IF NOT EXISTS idx_user_expert_recruitment_state ON user_expert_recruitment (expr_posting_state);
CREATE INDEX IF NOT EXISTS idx_user_expert_recruitment_deadline ON user_expert_recruitment (expr_deadline_date);
CREATE INDEX IF NOT EXISTS idx_user_expert_recruitment_active ON user_expert_recruitment (expr_deadline_date) WHERE expr_posting_state = 'active' AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_expr_certifications_gin ON user_expert_recruitment USING GIN (expr_certifications_json);
CREATE INDEX IF NOT EXISTS idx_expr_tech_stack_gin ON user_expert_recruitment USING GIN (expr_tech_stack_json);
CREATE INDEX IF NOT EXISTS idx_expr_benefits_gin ON user_expert_recruitment USING GIN (expr_benefits_json);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'set_updated_at') THEN
    CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $func$
    BEGIN
      NEW.updated_at := NOW();
      RETURN NEW;
    END
    $func$ LANGUAGE plpgsql;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS user_expert_recruitment_experience (
  rexp_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  expr_id uuid NOT NULL,
  rexp_title varchar(150) NOT NULL,
  rexp_company varchar(150) NOT NULL,
  rexp_start_date date NULL,
  rexp_end_date date NULL,
  rexp_description text NULL,
  rexp_seq smallint NOT NULL DEFAULT 1,
  rexp_state code_state_enum NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz NULL,
  CONSTRAINT fk_rexp_expr FOREIGN KEY (expr_id) REFERENCES user_expert_recruitment(expr_id) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT chk_rexp_date_range CHECK (rexp_start_date IS NULL OR rexp_end_date IS NULL OR rexp_start_date <= rexp_end_date)
);

DROP TRIGGER IF EXISTS trg_user_expert_recruitment_experience_updated_at ON user_expert_recruitment_experience;
CREATE TRIGGER trg_user_expert_recruitment_experience_updated_at BEFORE UPDATE ON user_expert_recruitment_experience FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

CREATE INDEX IF NOT EXISTS idx_rexp_expr_id ON user_expert_recruitment_experience (expr_id);
CREATE INDEX IF NOT EXISTS idx_rexp_state ON user_expert_recruitment_experience (rexp_state);
CREATE UNIQUE INDEX IF NOT EXISTS uq_rexp_active_seq ON user_expert_recruitment_experience (expr_id, rexp_seq) WHERE deleted_at IS NULL;
