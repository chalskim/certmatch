-- Create Table
CREATE TABLE "UserFile" (
  "user_id"       VARCHAR(36) NOT NULL,
  "purpose"       VARCHAR(50) NOT NULL,
  "file_seq"      INTEGER NOT NULL,
  "file_id"       VARCHAR(36),
  "file_name"     VARCHAR(255),
  "file_path"     VARCHAR(500),
  "file_size"     BIGINT,
  "file_type"     VARCHAR(50),
  "file_url"      VARCHAR(500),
  "thumbnail_url" VARCHAR(500),
  "mime_type"     VARCHAR(100),
  "description"   TEXT,
  "is_active"     BOOLEAN NOT NULL DEFAULT true,
  "created_at"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"    TIMESTAMP(3) NOT NULL,

  CONSTRAINT "UserFile_pkey" PRIMARY KEY ("user_id","purpose","file_seq")
);
