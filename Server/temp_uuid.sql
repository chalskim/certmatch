DROP TABLE IF EXISTS "UserFile"; CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- UUID 확장 생성
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- UserFile 테이블 생성
CREATE TABLE "UserFile" (
  "user_id"       UUID NOT NULL,
  "purpose"       VARCHAR(50) NOT NULL,
  "file_seq"      INTEGER NOT NULL,
  "file_id"       UUID,
  "file_name"     VARCHAR(255),
  "file_path"     VARCHAR(500),
  "file_size"     BIGINT,
  "file_type"     VARCHAR(50),
  "file_url"      VARCHAR(500),
  "thumbnail_url" VARCHAR(500),
  "mime_type"     VARCHAR(100),
  "description"   TEXT,
  "is_active"     BOOLEAN NOT NULL DEFAULT true,
  "created_at"    TIMESTAMP(6) NOT NULL DEFAULT now(),
  "updated_at"    TIMESTAMP(6) NOT NULL,

  -- 복합 기본키: user_id + purpose + file_seq
  CONSTRAINT "UserFile_pkey" PRIMARY KEY ("user_id","purpose","file_seq")
);

-- 인덱스 생성
CREATE INDEX "idx_user_files_user" ON "UserFile" ("user_id");
CREATE INDEX "idx_user_files_purpose" ON "UserFile" ("purpose");
CREATE INDEX "idx_user_files_file" ON "UserFile" ("file_id");
CREATE INDEX "idx_user_files_created" ON "UserFile" ("created_at");

-- 외래 키 제약조건
ALTER TABLE "UserFile" ADD CONSTRAINT "fk_user_files_user"
  FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE "UserFile" ADD CONSTRAINT "fk_user_files_file_attachment"
  FOREIGN KEY ("file_id") REFERENCES "FileAttachment"("file_id") ON DELETE SET NULL ON UPDATE NO ACTION;