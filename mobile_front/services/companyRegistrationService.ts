import { apiService } from './apiService';
import {
  CompanyRegistrationPayload,
  UserCompany,
  UserCompanyContactPerson,
  UserCompanyCertification
} from '../types/db/CompanyRegistration';

export interface ContactPerson {
  name: string;
  email: string;
  phone: string;
  position: string;
}

export interface CertificationFile {
  name: string;
  uri: string;
  size?: number;
  mimeType?: string;
}

export interface CertificationInfo {
  id: string;
  certType: string;
  certLevel?: string;
  certScope?: string;
  desiredDate: string;
  auditType?: string;
  files: CertificationFile[];
}

export interface CompanyRegistrationData {
  // 기본 정보
  companyName: string;
  bizRegNo: string;
  ceoName: string;
  establishDate: string;
  industry: string;
  employees: string;
  postcode?: string;
  address: string;
  detailAddress?: string;

  // 담당자 정보
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  contactPersons: ContactPerson[];

  // 산업분야 (다중 선택)
  industryFields: string[];

  // 관심 분야 (인증 종류)
  selectedCertTypes: string[];

  // 인증 정보
  certifications: CertificationInfo[];

  // 약관 동의
  terms1: boolean;
  terms2: boolean;
  terms3: boolean;
}

export interface CompanyRegistrationResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export class CompanyRegistrationService {
  private static readonly BASE_URL = '/api/v1/company-registration';

  static async createCompanyRegistration(
    data: CompanyRegistrationPayload | any,
  ): Promise<CompanyRegistrationResponse> {
    try {
      const response = await apiService.post<CompanyRegistrationResponse>(this.BASE_URL, data);
      return response.data;
    } catch (error: any) {
      console.error('기업 자격 등록 실패:', error);
      return {
        success: false,
        message: '기업 자격 등록에 실패했습니다.',
        error: error.response?.data?.error || error.message,
      };
    }
  }

  static async getMyCompanyRegistration(): Promise<CompanyRegistrationResponse> {
    try {
      const response = await apiService.get<CompanyRegistrationResponse>(`${this.BASE_URL}/my`);
      return response.data;
    } catch (error: any) {
      console.error('기업 정보 조회 실패:', error);
      return {
        success: false,
        message: '기업 정보 조회에 실패했습니다.',
        error: error.response?.data?.error || error.message,
      };
    }
  }

  static async updateCompanyRegistration(
    id: string,
    data: Partial<CompanyRegistrationPayload> | any,
  ): Promise<CompanyRegistrationResponse> {
    try {
      const response = await apiService.patch<CompanyRegistrationResponse>(`${this.BASE_URL}/${id}`, data);
      return response.data;
    } catch (error: any) {
      console.error('기업 정보 수정 실패:', error);
      return {
        success: false,
        message: '기업 정보 수정에 실패했습니다.',
        error: error.response?.data?.error || error.message,
      };
    }
  }

  // 기존 RegistrationCompany.tsx의 handleSubmit 함수을 위한 헬퍼 메서드
  static submitCompanyRegistration(
    formData: any,
    selectedIndustries: string[],
    selectedCertTypes: string[],
    certInfos: any[],
    contactPersons: ContactPerson[],
    terms1: boolean,
    terms2: boolean,
    terms3: boolean,
  ): Promise<CompanyRegistrationResponse> {
    const data: CompanyRegistrationPayload = {
      company: {
        comp_name: formData.companyName,
        comp_biz_reg_no: formData.bizRegNo,
        comp_owner_name: formData.ceoName,
        comp_founded_date: formData.establishDate,
        comp_industry_gb: 'INDUSTRY',
        comp_industry_key: formData.industry,
        comp_employee_count: parseInt(formData.employees?.replace(/[^0-9]/g, '') || '0'),
        comp_address: `${formData.postcode} ${formData.address} ${formData.detailAddress}`.trim(),
        comp_profile_state: 'draft'
      },
      contactPersons: contactPersons.map((cp, index) => ({
        cper_name: cp.name,
        cper_email: cp.email,
        cper_phone: cp.phone,
        cper_position: cp.position,
        cper_seq: index + 1,
        cper_is_primary: index === 0
      })),
      certifications: certInfos.map((cert, index) => ({
        ccert_type_gb: 'CERT_TYPE',
        ccert_type_key: cert.certType,
        ccert_level_gb: 'CERT_LEVEL',
        ccert_level_key: cert.certLevel,
        ccert_audit_type_gb: 'AUDIT_TYPE',
        ccert_audit_type_key: cert.auditType,
        ccert_scope: cert.certScope,
        ccert_desired_date: cert.desiredDate,
        ccert_seq: index + 1
      }))
    };

    return this.createCompanyRegistration(data);
  }
}
