/**
 * Database Schema Types for Personal Registration
 * Based on doc/DDL/1.PersonalRegistration.db
 */

export interface UserPersonal {
  pers_id: string; // UUID
  user_id: string; // UUID
  
  pers_name: string;
  pers_email: string;
  pers_phone: string;
  pers_location?: string;
  pers_bio?: string;
  
  pers_experience_years?: number;
  
  // Hourly Rate
  pers_hourly_rate_min?: number;
  pers_hourly_rate_max?: number;
  pers_hourly_rate_currency?: string; // Default 'KRW'
  pers_hourly_rate_raw?: string; // e.g. '협의' or '50-100만원'
  
  pers_profile_state: 'draft' | 'submitted' | 'approved' | 'rejected';
  
  created_by?: string;
  updated_by?: string;
  pers_created_at: string; // ISO Date string
  pers_updated_at: string; // ISO Date string
  pers_deleted_at?: string; // ISO Date string
}

export interface UserPersonalExperience {
  pexp_id: string; // UUID
  pers_id: string; // UUID
  
  pexp_title: string;
  pexp_company: string;
  
  pexp_start_date?: string; // YYYY-MM-DD
  pexp_end_date?: string; // YYYY-MM-DD
  pexp_period_text?: string; // e.g. "2020.01 - 2021.12"
  
  pexp_description?: string;
  pexp_seq: number;
  
  created_by?: string;
  updated_by?: string;
  pexp_created_at: string;
  pexp_updated_at: string;
  pexp_deleted_at?: string;
}

export interface UserPersonalCertificate {
  pcert_id: string; // UUID
  pers_id: string; // UUID
  
  pcert_name: string;
  pcert_issuer?: string;
  pcert_number?: string;
  
  pcert_issue_date?: string; // YYYY-MM-DD
  pcert_expiry_date?: string; // YYYY-MM-DD
  
  // Status Code (CERT_STATUS)
  pcert_status_gb: string; // 'CERT_STATUS'
  pcert_status_key?: string; // 'valid', 'expired', etc.
  
  // Type Code (CERT_TYPE) - Optional if name is standard
  pcert_code_gb?: string; // 'CERT_TYPE'
  pcert_code_key?: string;
  
  pcert_seq: number;
  
  created_by?: string;
  updated_by?: string;
  pcert_created_at: string;
  pcert_updated_at: string;
  pcert_deleted_at?: string;
}

export interface UserPersonalCode {
  pcode_id: string; // UUID
  pers_id: string; // UUID
  
  pcode_gb: string; // 'INDUSTRY', 'CERT_TYPE', 'ACTIVITY', 'COUNTRY'
  pcode_key: string;
  pcode_label?: string;
  pcode_seq: number;
  
  created_by?: string;
  updated_by?: string;
  pcode_created_at: string;
  pcode_updated_at: string;
  pcode_deleted_at?: string;
}

// Composite type for full registration data (API Payload)
export interface PersonalRegistrationPayload {
  personal: Partial<UserPersonal>;
  experiences?: Partial<UserPersonalExperience>[];
  certificates?: Partial<UserPersonalCertificate>[];
  specialtyCodes?: Partial<UserPersonalCode>[]; // pcode_gb = 'SPECIALTY' or 'INDUSTRY'/'CERT_TYPE'
  countryCodes?: Partial<UserPersonalCode>[]; // pcode_gb = 'COUNTRY'
  activityCodes?: Partial<UserPersonalCode>[]; // pcode_gb = 'ACTIVITY'
  
  // File metadata is handled separately via user_file, but payload might include file info
  files?: {
    profilePhoto?: FileMetadata;
    resume?: FileMetadata;
    selfIntroduction?: FileMetadata;
    certifications?: FileMetadata[];
  };
}

export interface FileMetadata {
  name: string;
  uri?: string; // Local URI for upload
  size?: number;
  type?: string; // MIME type or internal type key
  ufile_code?: string; // 'profile_image', 'resume_file', etc.
}
