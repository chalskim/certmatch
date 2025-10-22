import { z } from 'zod';

// User registration schema
export const registerSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다'),
  confirmPassword: z.string(),
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["confirmPassword"],
});

// User login schema
export const loginSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다'),
});

// Profile update schema
export const profileSchema = z.object({
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
  phone: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
});

// Contract schema
export const contractSchema = z.object({
  title: z.string().min(1, '계약명을 입력해주세요'),
  description: z.string().min(1, '계약 내용을 입력해주세요'),
  amount: z.number().positive('계약 금액은 0보다 커야 합니다'),
  startDate: z.date(),
  endDate: z.date(),
}).refine((data) => data.endDate > data.startDate, {
  message: "종료일은 시작일보다 이후여야 합니다",
  path: ["endDate"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type ContractFormData = z.infer<typeof contractSchema>;