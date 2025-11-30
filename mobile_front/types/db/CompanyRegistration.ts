/**
 * Database Schema Types for Company Registration
 * Based on doc/DDL/2.CompanyRegistration.db
 */

export interface UserCompany {
    comp_id: string; // UUID
    user_id: string; // UUID

    comp_name: string;
    comp_biz_reg_no: string; // Business Registration Number
    comp_owner_name: string;
    comp_address?: string;
    comp_website?: string;

    comp_founded_date?: string; // YYYY-MM-DD
    comp_employee_count?: number;

    // Industry Code
    comp_industry_gb?: string; // 'INDUSTRY'
    comp_industry_key?: string;

    comp_description?: string;
    comp_profile_state: 'draft' | 'submitted' | 'approved' | 'rejected';

    created_by?: string;
    updated_by?: string;
    comp_created_at: string;
    comp_updated_at: string;
    comp_deleted_at?: string;
}

export interface UserCompanyContactPerson {
    cper_id: string; // UUID
    comp_id: string; // UUID

    cper_name: string;
    cper_position?: string;
    cper_email: string;
    cper_phone: string;
    cper_is_primary: boolean;
    cper_seq: number;

    created_by?: string;
    updated_by?: string;
    cper_created_at: string;
    cper_updated_at: string;
    cper_deleted_at?: string;
}

export interface UserCompanyCertification {
    ccert_id: string; // UUID
    comp_id: string; // UUID

    // Certification Type
    ccert_type_gb: string; // 'CERT_TYPE'
    ccert_type_key: string;
    ccert_type_label?: string;

    // Certification Level
    ccert_level_gb?: string; // 'CERT_LEVEL'
    ccert_level_key?: string;
    ccert_level_label?: string;

    // Audit Type
    ccert_audit_type_gb?: string; // 'AUDIT_TYPE'
    ccert_audit_type_key?: string;
    ccert_audit_type_label?: string;

    ccert_scope?: string;
    ccert_desired_date?: string; // YYYY-MM-DD
    ccert_seq: number;

    created_by?: string;
    updated_by?: string;
    ccert_created_at: string;
    ccert_updated_at: string;
    ccert_deleted_at?: string;
}

// Composite type for full registration data (API Payload)
export interface CompanyRegistrationPayload {
    company: Partial<UserCompany>;
    contactPersons?: Partial<UserCompanyContactPerson>[];
    certifications?: Partial<UserCompanyCertification>[];

    files?: {
        bizRegCert?: FileMetadata;
        companyProfile?: FileMetadata;
        certEvidences?: FileMetadata[]; // Array of files corresponding to certifications
    };
}

export interface FileMetadata {
    name: string;
    uri?: string;
    size?: number;
    type?: string;
    ufile_code?: string; // 'biz_reg_cert', 'company_profile', 'cert_evidence'
}
