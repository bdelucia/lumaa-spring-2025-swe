export interface AuthFormProps {
  type: 'login' | 'register';
}

export interface AuthResponse {
  success: boolean;
  userId?: number;
  message?: string;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
}
