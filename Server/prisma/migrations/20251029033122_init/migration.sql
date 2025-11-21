/*
  Warnings:

  - The primary key for the `companies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `companies` table. All the data in the column will be lost.
  - You are about to alter the column `industry` on the `companies` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - The `size` column on the `companies` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `website` on the `companies` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - The primary key for the `reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `comment` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `expertId` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `reviews` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `phone` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to drop the `applications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `experts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `schedules` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[contract_id,reviewer_id]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contract_id` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewee_id` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewer_id` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_type` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- Ensure UUID extension exists for uuid_generate_v4()
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "cert_type_enum" AS ENUM ('ISMS', 'ISMS-P', 'ISO27001', 'GS', 'CPPG', 'ISO27701', 'GDPR');

-- CreateEnum
CREATE TYPE "company_size_enum" AS ENUM ('small', 'medium', 'large', 'enterprise');

-- CreateEnum
CREATE TYPE "contract_status_enum" AS ENUM ('pending', 'signed', 'active', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "notification_type_enum" AS ENUM ('matching', 'message', 'payment', 'settlement', 'community', 'system');

-- CreateEnum
CREATE TYPE "payment_method_enum" AS ENUM ('card', 'transfer', 'virtual', 'mobile');

-- CreateEnum
CREATE TYPE "payment_status_enum" AS ENUM ('pending', 'success', 'failed', 'refunded', 'cancelled');

-- CreateEnum
CREATE TYPE "post_category_enum" AS ENUM ('qa', 'success', 'tips', 'news');

-- CreateEnum
CREATE TYPE "proposal_status_enum" AS ENUM ('pending', 'accepted', 'rejected', 'expired', 'completed');

-- CreateEnum
CREATE TYPE "review_status_enum" AS ENUM ('pending', 'approved', 'rejected', 'hidden');

-- CreateEnum
CREATE TYPE "settlement_status_enum" AS ENUM ('pending', 'transferred', 'failed');

-- CreateEnum
CREATE TYPE "user_type_enum" AS ENUM ('company', 'consultant', 'educator', 'admin');

-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_companyId_fkey";

-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_expertId_fkey";

-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_userId_fkey";

-- DropForeignKey
ALTER TABLE "experts" DROP CONSTRAINT "experts_userId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_expertId_fkey";

-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_companyId_fkey";

-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_expertId_fkey";

-- DropIndex
DROP INDEX "companies_userId_key";

-- AlterTable
ALTER TABLE "companies" DROP CONSTRAINT "companies_pkey",
DROP COLUMN "address",
DROP COLUMN "companyName",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "budget" DECIMAL(15,2),
ADD COLUMN     "business_reg_no" VARCHAR(50),
ADD COLUMN     "cert_type" "cert_type_enum"[],
ADD COLUMN     "company_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
ADD COLUMN     "contact_email" VARCHAR(255),
ADD COLUMN     "contact_name" VARCHAR(100),
ADD COLUMN     "contact_phone" VARCHAR(20),
ADD COLUMN     "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "desired_timeline" VARCHAR(50),
ADD COLUMN     "employee_count" INTEGER,
ADD COLUMN     "location" VARCHAR(255),
ADD COLUMN     "logo_url" TEXT,
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD COLUMN     "status" VARCHAR(50) DEFAULT 'preparing',
ADD COLUMN     "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" UUID NOT NULL,
ALTER COLUMN "industry" SET DATA TYPE VARCHAR(100),
DROP COLUMN "size",
ADD COLUMN     "size" "company_size_enum",
ALTER COLUMN "website" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "companies_pkey" PRIMARY KEY ("company_id");

-- AlterTable
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_pkey",
DROP COLUMN "comment",
DROP COLUMN "companyId",
DROP COLUMN "createdAt",
DROP COLUMN "expertId",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
ADD COLUMN     "contract_id" UUID NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "published_at" TIMESTAMP(6),
ADD COLUMN     "rating_by_category" JSONB,
ADD COLUMN     "response" TEXT,
ADD COLUMN     "response_at" TIMESTAMP(6),
ADD COLUMN     "review_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
ADD COLUMN     "reviewee_id" UUID NOT NULL,
ADD COLUMN     "reviewer_id" UUID NOT NULL,
ADD COLUMN     "status" "review_status_enum" DEFAULT 'pending',
ADD COLUMN     "text" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "reviews_pkey" PRIMARY KEY ("review_id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "isActive",
DROP COLUMN "password",
DROP COLUMN "role",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(6),
ADD COLUMN     "email_verified" BOOLEAN DEFAULT false,
ADD COLUMN     "email_verified_at" TIMESTAMP(6),
ADD COLUMN     "is_active" BOOLEAN DEFAULT true,
ADD COLUMN     "last_login_at" TIMESTAMP(6),
ADD COLUMN     "org_id" UUID,
ADD COLUMN     "password_hash" VARCHAR(255) NOT NULL,
ADD COLUMN     "profile_complete_pct" INTEGER DEFAULT 0,
ADD COLUMN     "profile_image_url" TEXT,
ADD COLUMN     "two_factor_enabled" BOOLEAN DEFAULT false,
ADD COLUMN     "two_factor_secret" VARCHAR(32),
ADD COLUMN     "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
ADD COLUMN     "user_type" "user_type_enum" NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(20),
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("user_id");

-- DropTable
DROP TABLE "applications";

-- DropTable
DROP TABLE "experts";

-- DropTable
DROP TABLE "schedules";

-- CreateTable
CREATE TABLE "comments" (
    "comment_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "post_id" UUID NOT NULL,
    "parent_comment_id" UUID,
    "author_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "like_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "comments_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "contracts" (
    "contract_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "company_id" UUID NOT NULL,
    "consultant_id" UUID NOT NULL,
    "proposal_id" UUID,
    "amount" DECIMAL(15,2) NOT NULL,
    "fee" DECIMAL(15,2),
    "net_amount" DECIMAL(15,2),
    "items" JSONB,
    "terms" TEXT,
    "status" "contract_status_enum" DEFAULT 'pending',
    "contract_pdf_url" TEXT,
    "sign_url" TEXT,
    "signed_by_company_at" TIMESTAMP(6),
    "signed_by_consultant_at" TIMESTAMP(6),
    "start_date" DATE,
    "end_date" DATE,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(6),

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("contract_id")
);

-- CreateTable
CREATE TABLE "course_enrollments" (
    "enrollment_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "course_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "status" VARCHAR(20) DEFAULT 'enrolled',
    "progress" INTEGER DEFAULT 0,
    "completed_at" TIMESTAMP(6),
    "certificate_url" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "course_enrollments_pkey" PRIMARY KEY ("enrollment_id")
);

-- CreateTable
CREATE TABLE "courses" (
    "course_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "educator_id" UUID NOT NULL,
    "course_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "instructor_name" VARCHAR(100),
    "level" VARCHAR(20),
    "duration_hours" INTEGER,
    "duration_weeks" INTEGER,
    "price" DECIMAL(10,2),
    "discount_price" DECIMAL(10,2),
    "schedule" JSONB,
    "start_date" DATE,
    "end_date" DATE,
    "format" VARCHAR(20),
    "max_students" INTEGER,
    "enrolled_count" INTEGER DEFAULT 0,
    "is_active" BOOLEAN DEFAULT true,
    "rating" DECIMAL(3,2) DEFAULT 0.00,
    "review_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "educators" (
    "educator_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "institution_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "location" VARCHAR(255),
    "website" VARCHAR(255),
    "is_verified" BOOLEAN DEFAULT false,
    "certifications" JSONB,
    "rating" DECIMAL(3,2) DEFAULT 0.00,
    "review_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "educators_pkey" PRIMARY KEY ("educator_id")
);

-- CreateTable
CREATE TABLE "consultants" (
    "consultant_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "bio" TEXT,
    "specialty" JSONB,
    "experience_years" INTEGER,
    "hourly_rate" DECIMAL(10,2),
    "daily_rate" DECIMAL(10,2),
    "location" VARCHAR(255),
    "languages" VARCHAR(100)[],
    "availability" JSONB,
    "is_verified" BOOLEAN DEFAULT false,
    "verified_date" TIMESTAMP(6),
    "certifications" JSONB,
    "rating" DECIMAL(3,2) DEFAULT 0.00,
    "review_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "consultants_pkey" PRIMARY KEY ("consultant_id")
);

-- CreateTable
CREATE TABLE "government_notices" (
    "notice_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "category" VARCHAR(50),
    "source" VARCHAR(100),
    "source_url" TEXT,
    "application_start" DATE,
    "application_end" DATE,
    "is_active" BOOLEAN DEFAULT true,
    "published_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "government_notices_pkey" PRIMARY KEY ("notice_id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "notification_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "type" "notification_type_enum" NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "data" JSONB,
    "is_read" BOOLEAN DEFAULT false,
    "read_at" TIMESTAMP(6),
    "action_url" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(6),

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("notification_id")
);

-- CreateTable
CREATE TABLE "payments" (
    "payment_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "contract_id" UUID NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "fee" DECIMAL(15,2),
    "net_amount" DECIMAL(15,2),
    "status" "payment_status_enum" DEFAULT 'pending',
    "payment_method" "payment_method_enum",
    "transaction_id" VARCHAR(100),
    "pg_provider" VARCHAR(50),
    "receipt_url" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(6),
    "refunded_at" TIMESTAMP(6),

    CONSTRAINT "payments_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "posts" (
    "post_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "author_id" UUID NOT NULL,
    "category" "post_category_enum" NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "tags" VARCHAR(50)[],
    "view_count" INTEGER DEFAULT 0,
    "like_count" INTEGER DEFAULT 0,
    "comment_count" INTEGER DEFAULT 0,
    "is_adopted" BOOLEAN DEFAULT false,
    "adopted_by_id" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "published_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "posts_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "proposals" (
    "proposal_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "company_id" UUID NOT NULL,
    "consultant_id" UUID NOT NULL,
    "matching_score" INTEGER,
    "matching_reason" TEXT,
    "status" "proposal_status_enum" DEFAULT 'pending',
    "message_history" JSONB,
    "rejection_reason" TEXT,
    "expires_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "proposals_pkey" PRIMARY KEY ("proposal_id")
);

-- CreateTable
CREATE TABLE "rating_aggregates" (
    "consultant_id" UUID NOT NULL,
    "avg_rating" DECIMAL(3,2) DEFAULT 0.00,
    "review_count" INTEGER DEFAULT 0,
    "rating_by_category" JSONB,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rating_aggregates_pkey" PRIMARY KEY ("consultant_id")
);

-- CreateTable
CREATE TABLE "settlements" (
    "settlement_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "consultant_id" UUID,
    "educator_id" UUID,
    "period" VARCHAR(7) NOT NULL,
    "total_earned" DECIMAL(15,2) NOT NULL,
    "platform_fee" DECIMAL(15,2) NOT NULL,
    "tax_withheld" DECIMAL(15,2) DEFAULT 0,
    "net_amount" DECIMAL(15,2) NOT NULL,
    "status" "settlement_status_enum" DEFAULT 'pending',
    "bank_account" VARCHAR(100),
    "transfer_date" DATE,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "settlements_pkey" PRIMARY KEY ("settlement_id")
);

-- CreateIndex
CREATE INDEX "idx_comments_parent" ON "comments"("parent_comment_id");

-- CreateIndex
CREATE INDEX "idx_comments_post" ON "comments"("post_id");

-- CreateIndex
CREATE INDEX "idx_contracts_company" ON "contracts"("company_id");

-- CreateIndex
CREATE INDEX "idx_contracts_consultant" ON "contracts"("consultant_id");

-- CreateIndex
CREATE INDEX "idx_contracts_dates" ON "contracts"("start_date", "end_date");

-- CreateIndex
CREATE INDEX "idx_contracts_status" ON "contracts"("status");

-- CreateIndex
CREATE UNIQUE INDEX "unique_enrollment" ON "course_enrollments"("course_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "consultants_user_id_key" ON "consultants"("user_id");

-- CreateIndex
CREATE INDEX "idx_notifications_created" ON "notifications"("created_at" DESC);

-- CreateIndex
CREATE INDEX "idx_notifications_read" ON "notifications"("is_read");

-- CreateIndex
CREATE INDEX "idx_notifications_user" ON "notifications"("user_id");

-- CreateIndex
CREATE INDEX "idx_payments_contract" ON "payments"("contract_id");

-- CreateIndex
CREATE INDEX "idx_payments_created" ON "payments"("created_at" DESC);

-- CreateIndex
CREATE INDEX "idx_payments_status" ON "payments"("status");

-- CreateIndex
CREATE INDEX "idx_posts_author" ON "posts"("author_id");

-- CreateIndex
CREATE INDEX "idx_posts_category" ON "posts"("category");

-- CreateIndex
CREATE INDEX "idx_posts_created" ON "posts"("created_at" DESC);

-- CreateIndex
CREATE INDEX "idx_posts_tags" ON "posts" USING GIN ("tags");

-- CreateIndex
CREATE INDEX "idx_proposals_company" ON "proposals"("company_id");

-- CreateIndex
CREATE INDEX "idx_proposals_consultant" ON "proposals"("consultant_id");

-- CreateIndex
CREATE INDEX "idx_proposals_created" ON "proposals"("created_at" DESC);

-- CreateIndex
CREATE INDEX "idx_proposals_status" ON "proposals"("status");

-- CreateIndex
CREATE UNIQUE INDEX "unique_proposal" ON "proposals"("company_id", "consultant_id", "created_at");

-- CreateIndex
CREATE INDEX "idx_companies_industry" ON "companies"("industry");

-- CreateIndex
CREATE INDEX "idx_companies_location" ON "companies"("location");

-- CreateIndex
CREATE INDEX "idx_companies_size" ON "companies"("size");

-- CreateIndex
CREATE INDEX "idx_companies_user" ON "companies"("user_id");

-- CreateIndex
CREATE INDEX "idx_reviews_contract" ON "reviews"("contract_id");

-- CreateIndex
CREATE INDEX "idx_reviews_reviewee" ON "reviews"("reviewee_id");

-- CreateIndex
CREATE INDEX "idx_reviews_status" ON "reviews"("status");

-- CreateIndex
CREATE UNIQUE INDEX "unique_review" ON "reviews"("contract_id", "reviewer_id");

-- CreateIndex
CREATE INDEX "idx_users_email" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_users_org" ON "users"("org_id");

-- CreateIndex
CREATE INDEX "idx_users_type" ON "users"("user_type");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "comments"("comment_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_consultant_id_fkey" FOREIGN KEY ("consultant_id") REFERENCES "consultants"("consultant_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_proposal_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "proposals"("proposal_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "course_enrollments" ADD CONSTRAINT "course_enrollments_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("course_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "course_enrollments" ADD CONSTRAINT "course_enrollments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_educator_id_fkey" FOREIGN KEY ("educator_id") REFERENCES "educators"("educator_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "educators" ADD CONSTRAINT "educators_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "consultants" ADD CONSTRAINT "consultants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contracts"("contract_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_adopted_by_id_fkey" FOREIGN KEY ("adopted_by_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_consultant_id_fkey" FOREIGN KEY ("consultant_id") REFERENCES "consultants"("consultant_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rating_aggregates" ADD CONSTRAINT "rating_aggregates_consultant_id_fkey" FOREIGN KEY ("consultant_id") REFERENCES "consultants"("consultant_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contracts"("contract_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewee_id_fkey" FOREIGN KEY ("reviewee_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "settlements" ADD CONSTRAINT "settlements_consultant_id_fkey" FOREIGN KEY ("consultant_id") REFERENCES "consultants"("consultant_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "settlements" ADD CONSTRAINT "settlements_educator_id_fkey" FOREIGN KEY ("educator_id") REFERENCES "educators"("educator_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
