/**
 * 이메일 유효성 검사 유틸리티
 */

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * 이메일 주소 유효성 검사
 * @param email 검사할 이메일 주소
 * @returns ValidationResult 객체
 */
export const validateEmail = (email: string): ValidationResult => {
  // 빈 값 체크
  if (!email || email.trim() === '') {
    return {
      isValid: false,
      message: '이메일을 입력해주세요.'
    };
  }

  // 공백 체크
  if (email.includes(' ')) {
    return {
      isValid: false,
      message: '이메일에는 공백이 포함될 수 없습니다.'
    };
  }

  // 기본 이메일 형식 체크
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: '올바른 이메일 형식이 아닙니다.'
    };
  }

  // 더 엄격한 이메일 형식 체크
  const strictEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!strictEmailRegex.test(email)) {
    return {
      isValid: false,
      message: '유효하지 않은 이메일 형식입니다.'
    };
  }

  // 이메일 길이 체크 (일반적으로 320자 제한)
  if (email.length > 320) {
    return {
      isValid: false,
      message: '이메일이 너무 깁니다.'
    };
  }

  // 로컬 부분 길이 체크 (@ 앞부분, 64자 제한)
  const localPart = email.split('@')[0];
  if (localPart.length > 64) {
    return {
      isValid: false,
      message: '이메일 주소가 너무 깁니다.'
    };
  }

  // 도메인 부분 체크
  const domainPart = email.split('@')[1];
  if (!domainPart || domainPart.length === 0) {
    return {
      isValid: false,
      message: '도메인이 누락되었습니다.'
    };
  }

  // 도메인 길이 체크 (253자 제한)
  if (domainPart.length > 253) {
    return {
      isValid: false,
      message: '도메인이 너무 깁니다.'
    };
  }

  // 연속된 점 체크
  if (email.includes('..')) {
    return {
      isValid: false,
      message: '연속된 점은 사용할 수 없습니다.'
    };
  }

  // 시작이나 끝에 점이 있는지 체크
  if (email.startsWith('.') || email.endsWith('.')) {
    return {
      isValid: false,
      message: '이메일은 점으로 시작하거나 끝날 수 없습니다.'
    };
  }

  // @ 앞뒤로 점이 있는지 체크
  if (email.includes('.@') || email.includes('@.')) {
    return {
      isValid: false,
      message: '@ 기호 앞뒤에 점이 올 수 없습니다.'
    };
  }

  // 특수문자 체크 (허용되지 않는 문자)
  const invalidChars = /[<>()[\]\\,;:\s@"]/;
  if (invalidChars.test(localPart.replace(/"/g, ''))) {
    return {
      isValid: false,
      message: '허용되지 않는 특수문자가 포함되어 있습니다.'
    };
  }

  // 모든 검사를 통과한 경우
  return {
    isValid: true
  };
};

/**
 * 실시간 이메일 유효성 검사 (입력 중)
 * @param email 검사할 이메일 주소
 * @returns ValidationResult 객체 (더 관대한 검사)
 */
export const validateEmailRealtime = (email: string): ValidationResult => {
  // 빈 값은 허용 (입력 중이므로)
  if (!email || email.trim() === '') {
    return { isValid: true };
  }

  // 공백 체크
  if (email.includes(' ')) {
    return {
      isValid: false,
      message: '공백은 사용할 수 없습니다.'
    };
  }

  // @ 개수 체크
  const atCount = (email.match(/@/g) || []).length;
  if (atCount > 1) {
    return {
      isValid: false,
      message: '@ 기호는 하나만 사용할 수 있습니다.'
    };
  }

  // 연속된 점 체크
  if (email.includes('..')) {
    return {
      isValid: false,
      message: '연속된 점은 사용할 수 없습니다.'
    };
  }

  // 시작이나 끝에 점이 있는지 체크
  if (email.startsWith('.') || email.endsWith('.')) {
    return {
      isValid: false,
      message: '점으로 시작하거나 끝날 수 없습니다.'
    };
  }

  return { isValid: true };
};

/**
 * 비밀번호 유효성 검사
 * @param password 검사할 비밀번호
 * @returns ValidationResult 객체
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password || password.trim() === '') {
    return {
      isValid: false,
      message: '비밀번호를 입력해주세요.'
    };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      message: '비밀번호는 최소 8자 이상이어야 합니다.'
    };
  }

  if (password.length > 128) {
    return {
      isValid: false,
      message: '비밀번호가 너무 깁니다.'
    };
  }

  return { isValid: true };
};