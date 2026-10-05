/** Envelope the Spring Boot backend wraps around every response. */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  userId: number;
  businessId: number;
  name: string;
  email: string;
  roles: string[];
}

export interface RegisterPayload {
  businessName: string;
  ownerName: string;
  email: string;
  password: string;
  phone?: string;
}
