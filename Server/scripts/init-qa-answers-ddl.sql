CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS user_qna_question (
  uqna_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  uqna_category_gb varchar(64) NOT NULL DEFAULT 'QA_CATEGORY',
  uqna_category_key varchar(64) NOT NULL,
  uqna_status_gb varchar(64) NOT NULL DEFAULT 'QA_QUESTION_STATUS',
  uqna_status_key varchar(64) NOT NULL,
  uqna_title varchar(255) NOT NULL,
  uqna_content text NOT NULL,
  uqna_author_display varchar(100),
  uqna_view_count integer NOT NULL DEFAULT 0 CHECK (uqna_view_count >= 0),
  uqna_like_count integer NOT NULL DEFAULT 0 CHECK (uqna_like_count >= 0),
  uqna_answer_count integer NOT NULL DEFAULT 0 CHECK (uqna_answer_count >= 0),
  uqna_best_answer_id uuid NULL,
  uqna_tags jsonb,
  uqna_created_at timestamptz NOT NULL DEFAULT now(),
  uqna_updated_at timestamptz NOT NULL DEFAULT now(),
  uqna_deleted_at timestamptz NULL
);

ALTER TABLE user_qna_question ADD CONSTRAINT fk_user_qna_question_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE user_qna_question ADD CONSTRAINT fk_uqna_category FOREIGN KEY (uqna_category_gb, uqna_category_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE user_qna_question ADD CONSTRAINT fk_uqna_status FOREIGN KEY (uqna_status_gb, uqna_status_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE user_qna_question ADD CONSTRAINT chk_uqna_tags_array CHECK (uqna_tags IS NULL OR jsonb_typeof(uqna_tags) = 'array');

CREATE INDEX IF NOT EXISTS idx_user_qna_question_user ON user_qna_question (user_id);
CREATE INDEX IF NOT EXISTS idx_user_qna_question_category ON user_qna_question (uqna_category_gb, uqna_category_key);
CREATE INDEX IF NOT EXISTS idx_user_qna_question_status ON user_qna_question (uqna_status_gb, uqna_status_key);
CREATE INDEX IF NOT EXISTS idx_user_qna_question_created ON user_qna_question (uqna_created_at DESC) WHERE uqna_deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS gin_user_qna_question_tags ON user_qna_question USING GIN (uqna_tags);

CREATE OR REPLACE FUNCTION set_updated_at_user_qna_question() RETURNS TRIGGER AS $$
BEGIN
  NEW.uqna_updated_at := now();
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_user_qna_question_updated ON user_qna_question;
CREATE TRIGGER trg_user_qna_question_updated BEFORE UPDATE ON user_qna_question FOR EACH ROW EXECUTE FUNCTION set_updated_at_user_qna_question();

CREATE TABLE IF NOT EXISTS user_qna_answer (
  uans_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  uans_question_id uuid NOT NULL,
  user_id uuid NOT NULL,
  uans_status_gb varchar(64) NOT NULL DEFAULT 'QA_ANSWER_STATE',
  uans_status_key varchar(64) NOT NULL DEFAULT 'published',
  uans_body text NOT NULL,
  uans_like_count integer NOT NULL DEFAULT 0 CHECK (uans_like_count >= 0),
  uans_is_best boolean NOT NULL DEFAULT false,
  uans_adopted_by_id uuid NULL REFERENCES users(user_id),
  uans_adopted_at timestamptz NULL,
  uans_created_at timestamptz NOT NULL DEFAULT now(),
  uans_updated_at timestamptz NOT NULL DEFAULT now(),
  uans_deleted_at timestamptz NULL
);

ALTER TABLE user_qna_answer ADD CONSTRAINT fk_user_qna_answer_question FOREIGN KEY (uans_question_id) REFERENCES user_qna_question(uqna_id) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE user_qna_answer ADD CONSTRAINT fk_user_qna_answer_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE user_qna_answer ADD CONSTRAINT fk_uans_status FOREIGN KEY (uans_status_gb, uans_status_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;

CREATE INDEX IF NOT EXISTS idx_user_qna_answer_question ON user_qna_answer (uans_question_id);
CREATE INDEX IF NOT EXISTS idx_user_qna_answer_user ON user_qna_answer (user_id);
CREATE INDEX IF NOT EXISTS idx_user_qna_answer_created ON user_qna_answer (uans_created_at DESC) WHERE uans_deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS uq_best_answer_per_question ON user_qna_answer (uans_question_id) WHERE uans_is_best = true AND uans_deleted_at IS NULL;

CREATE OR REPLACE FUNCTION set_updated_at_user_qna_answer() RETURNS TRIGGER AS $$
BEGIN
  NEW.uans_updated_at := now();
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_user_qna_answer_updated ON user_qna_answer;
CREATE TRIGGER trg_user_qna_answer_updated BEFORE UPDATE ON user_qna_answer FOR EACH ROW EXECUTE FUNCTION set_updated_at_user_qna_answer();

ALTER TABLE user_qna_question ADD CONSTRAINT fk_uqna_best_answer FOREIGN KEY (uqna_best_answer_id) REFERENCES user_qna_answer(uans_id) ON DELETE SET NULL ON UPDATE NO ACTION;

CREATE TABLE IF NOT EXISTS user_qna_private (
  uqnp_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  uqnp_expert_user_id uuid NULL,
  uqnp_expert_display varchar(100),
  uqnp_status_gb varchar(64) NOT NULL DEFAULT 'QA_PRIVATE_STATUS',
  uqnp_status_key varchar(64) NOT NULL DEFAULT 'pending',
  uqnp_title varchar(255) NOT NULL,
  uqnp_content text NULL,
  uqnp_last_message_preview varchar(500),
  uqnp_view_count integer NOT NULL DEFAULT 0 CHECK (uqnp_view_count >= 0),
  uqnp_created_at timestamptz NOT NULL DEFAULT now(),
  uqnp_updated_at timestamptz NOT NULL DEFAULT now(),
  uqnp_deleted_at timestamptz NULL
);

ALTER TABLE user_qna_private ADD CONSTRAINT fk_user_qna_private_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE user_qna_private ADD CONSTRAINT fk_uqnp_status FOREIGN KEY (uqnp_status_gb, uqnp_status_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE user_qna_private ADD CONSTRAINT fk_user_qna_private_expert FOREIGN KEY (uqnp_expert_user_id) REFERENCES users(user_id) ON DELETE SET NULL ON UPDATE NO ACTION;

CREATE INDEX IF NOT EXISTS idx_user_qna_private_user ON user_qna_private (user_id);
CREATE INDEX IF NOT EXISTS idx_user_qna_private_expert ON user_qna_private (uqnp_expert_user_id);
CREATE INDEX IF NOT EXISTS idx_user_qna_private_status ON user_qna_private (uqnp_status_gb, uqnp_status_key);
CREATE INDEX IF NOT EXISTS idx_user_qna_private_created ON user_qna_private (uqnp_created_at DESC) WHERE uqnp_deleted_at IS NULL;

CREATE OR REPLACE FUNCTION set_updated_at_user_qna_private() RETURNS TRIGGER AS $$
BEGIN
  NEW.uqnp_updated_at := now();
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_user_qna_private_updated ON user_qna_private;
CREATE TRIGGER trg_user_qna_private_updated BEFORE UPDATE ON user_qna_private FOR EACH ROW EXECUTE FUNCTION set_updated_at_user_qna_private();

CREATE TABLE IF NOT EXISTS user_qna_expert_request (
  uqer_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  uqer_question_id uuid NOT NULL,
  requested_by_user_id uuid NOT NULL,
  expert_user_id uuid NOT NULL,
  uqer_reason text NOT NULL,
  uqer_status_gb varchar(64) NOT NULL DEFAULT 'QA_REQUEST_STATUS',
  uqer_status_key varchar(64) NOT NULL DEFAULT 'requested',
  uqer_created_at timestamptz NOT NULL DEFAULT now(),
  uqer_updated_at timestamptz NOT NULL DEFAULT now(),
  uqer_deleted_at timestamptz NULL
);

ALTER TABLE user_qna_expert_request ADD CONSTRAINT fk_user_qna_expert_request_question FOREIGN KEY (uqer_question_id) REFERENCES user_qna_question(uqna_id) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE user_qna_expert_request ADD CONSTRAINT fk_user_qna_expert_request_requested_by FOREIGN KEY (requested_by_user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE user_qna_expert_request ADD CONSTRAINT fk_user_qna_expert_request_expert FOREIGN KEY (expert_user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE user_qna_expert_request ADD CONSTRAINT fk_uqer_status FOREIGN KEY (uqer_status_gb, uqer_status_key) REFERENCES cert_code(code_gb, code_key) ON UPDATE CASCADE ON DELETE RESTRICT;

CREATE INDEX IF NOT EXISTS idx_user_qna_expert_request_question ON user_qna_expert_request (uqer_question_id);
CREATE INDEX IF NOT EXISTS idx_user_qna_expert_request_expert ON user_qna_expert_request (expert_user_id);
CREATE INDEX IF NOT EXISTS idx_user_qna_expert_request_status ON user_qna_expert_request (uqer_status_gb, uqer_status_key);
CREATE INDEX IF NOT EXISTS idx_user_qna_expert_request_created ON user_qna_expert_request (uqer_created_at DESC) WHERE uqer_deleted_at IS NULL;

