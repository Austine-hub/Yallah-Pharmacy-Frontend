import axiosClient from "./axiosClient"; 

/* ============================================================
 * 📦 Type Definitions (Harmonized with Backend)
 * ============================================================ */

/**
 * Payload for the user registration endpoint.
 */
export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

/**
 * Payload for the user login endpoint.
 */
export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Data structure for a successfully authenticated user.
 * Based on your backend User Model, excluding the password.
 */
export interface UserData {
    id: number;
    email: string;
    username: string;
    created_at?: Date;
}

/**
 * Standardized response structure for Auth endpoints.
 */
export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string; // Present on successful login
  user?: UserData; // Present on successful login
  error?: string; // Present on failure
}

/* ============================================================
 * 🧩 API Functions
 * ============================================================ */

/**
 * Sends a request to the backend to log in a user.
 * @param payload - User's email and password.
 * @returns Promise<AuthResponse>
 */
export const loginUser = async (payload: LoginPayload): Promise<AuthResponse> => {
  try {
    const { data } = await axiosClient.post<AuthResponse>("/auth/login", payload);
    return data;
  } catch (error: any) {
    // Return standardized error response from the backend's error handler
    return {
        success: false,
        message: error.response?.data?.error || "Login failed due to a network error.",
        error: error.response?.data?.error || error.message
    } as AuthResponse;
  }
};

/**
 * Sends a request to the backend to register a new user.
 * @param payload - User's username, email, and password.
 * @returns Promise<AuthResponse>
 */
export const registerUser = async (payload: RegisterPayload): Promise<AuthResponse> => {
  try {
    const { data } = await axiosClient.post<AuthResponse>("/auth/register", payload);
    return data;
  } catch (error: any) {
    // Return standardized error response from the backend's error handler
    return {
        success: false,
        message: error.response?.data?.error || "Registration failed due to a server error.",
        error: error.response?.data?.error || error.message
    } as AuthResponse;
  }
};