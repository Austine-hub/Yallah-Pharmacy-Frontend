import axiosClient from "./axiosClient";
import type { AuthResponse } from "./authApi.js";
 // Reusing the standardized response interface

/* ============================================================
 * 📦 Type Definitions
 * ============================================================ */

/**
 * Defines the required data payload for initiating an STK Push.
 */
export interface STKPushPayload {
  amount: number;
  phoneNumber: string; // The M-Pesa number (e.g., 2547XXXXXXXX)
  // You might add the product ID or description here
}

/**
 * Defines the successful response structure from the backend's /stkpush endpoint.
 */
export interface STKPushResponse {
  success: boolean;
  message: string;
  // Safaricom response data (e.g., MerchantRequestID, CheckoutRequestID)
  checkoutRequestID?: string; 
}

/* ============================================================
 * 🧩 API Functions
 * ============================================================ */

/**
 * Sends a request to the secured backend endpoint to initiate an M-Pesa STK Push.
 * This function relies on the axiosClient being configured with the JWT token
 * in the Authorization header (usually done via an interceptor).
 * * @param payload - Amount and phone number.
 * @returns Promise<STKPushResponse | AuthResponse> - The response data.
 */
export const initiateSTKPush = async (
  payload: STKPushPayload
): Promise<STKPushResponse | AuthResponse> => {
  try {
    const { data } = await axiosClient.post<STKPushResponse>(
      "/payment/stkpush", 
      payload
    );
    return data;
  } catch (error: any) {
    // Handle specific Axios errors, particularly 401 (Unauthorized) or 400 (Validation)
    const errorResponse: AuthResponse = {
        success: false,
        message: error.response?.data?.error || "Failed to initiate payment. Check network or try again.",
        error: error.message
    };
    // If the error response is available and has the expected format, use it
    if (error.response && error.response.data) {
        return {
            success: false,
            message: error.response.data.error || error.response.data.message || errorResponse.message,
            error: error.response.data.error || errorResponse.message
        } as AuthResponse;
    }
    
    return errorResponse;
  }
};