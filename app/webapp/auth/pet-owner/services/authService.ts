/**
 * Pet Owner Authentication Service
 *
 * This service handles all API calls related to pet owner authentication.
 * It provides a clean interface for components to interact with the backend.
 *
 * BACKEND INTEGRATION POINT:
 * Replace the placeholder implementations with actual API calls to your backend.
 */

import type {LoginFormData, PasswordResetRequestFormData, PasswordResetFormData, AuthResponse} from "../types"
import {LoginFormResponse} from "@/types/loginFormDTO";
import {apiDomain} from "@/lib/login";

// Base API URL - Replace with your actual API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

/**
 * Login pet owner user
 *
 * @param {LoginFormData} data - Pet owner login credentials
 * @returns {Promise<AuthResponse>} - Authentication response
 */
export async function login(data: LoginFormData): Promise<AuthResponse> {
    try {
        // BACKEND INTEGRATION POINT:
        // Replace this with actual API call
        // Example:
        // const response = await fetch(`${API_BASE_URL}/auth/pet-owner/login`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data)
        // });
        // const result = await response.json();
        // if (!response.ok) throw new Error(result.error || 'Login failed');
        // return result;

        // Simulated response for development
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate successful login
                resolve({
                    success: true,
                    token: "sample-pet-owner-jwt-token",
                    user: {
                        id: "pet-owner-123",
                        name: "Pet Owner User",
                        email: data.username.includes("@") ? data.username : "petowner@example.com",
                        role: "pet-owner",
                    },
                })
            }, 1000)
        })
    } catch (error) {
        console.error("Pet owner login error:", error)
        return {
            success: false,
            error: error instanceof Error ? error.message : "An unknown error occurred",
        }
    }
}


export async function loginWithEmail(email: string, password: string): Promise<LoginFormResponse> {
    try {
        const url = `${apiDomain}/api/v1/pet-owner/login/phoneNumber`;

        const response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, phoneNumber: "", password}),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Email login failed");
        return result;
    } catch (error) {
        console.error("Email login error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "An unknown error occurred",
        };
    }
}


export async function loginWithPhoneNumber(phoneNumber: string, password: string): Promise<LoginFormResponse> {
    try {
        const url = `${apiDomain}/api/v1/pet-owner/login/phone-number`;

        const response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: "", phoneNumber, password}),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Phone number login failed");
        return result;
    } catch (error) {
        console.error("Phone number login error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "An unknown error occurred",
        };
    }
}


/**
 * Request pet owner password reset
 *
 * @param {PasswordResetRequestFormData} data - Contact information for reset
 * @returns {Promise<AuthResponse>} - Response indicating success or failure
 */
export async function requestPasswordReset(data: PasswordResetRequestFormData): Promise<AuthResponse> {
    try {
        // BACKEND INTEGRATION POINT:
        // Replace this with actual API call
        // Example:
        // const response = await fetch(`${API_BASE_URL}/auth/pet-owner/forgot-password`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     contact: data.contact,
        //     contactType: data.contact.includes('@') ? 'email' : 'phone'
        //   })
        // });
        // const result = await response.json();
        // if (!response.ok) throw new Error(result.error || 'Request failed');
        // return result;

        // Simulated response for development
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    message: "Pet owner password reset instructions sent successfully",
                })
            }, 1000)
        })
    } catch (error) {
        console.error("Pet owner password reset request error:", error)
        return {
            success: false,
            error: error instanceof Error ? error.message : "An unknown error occurred",
        }
    }
}

/**
 * Reset pet owner password
 *
 * @param {PasswordResetFormData} data - New password information
 * @returns {Promise<AuthResponse>} - Response indicating success or failure
 */
export async function resetPassword(data: PasswordResetFormData): Promise<AuthResponse> {
    try {
        // BACKEND INTEGRATION POINT:
        // Replace this with actual API call
        // Example:
        // const response = await fetch(`${API_BASE_URL}/auth/pet-owner/reset-password`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     contact: data.contact,
        //     password: data.password,
        //     token: 'token-from-url-or-state' // You'll need to get this from the URL or state
        //   })
        // });
        // const result = await response.json();
        // if (!response.ok) throw new Error(result.error || 'Reset failed');
        // return result;

        // Simulated response for development
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    message: "Pet owner password reset successful",
                })
            }, 1000)
        })
    } catch (error) {
        console.error("Pet owner password reset error:", error)
        return {
            success: false,
            error: error instanceof Error ? error.message : "An unknown error occurred",
        }
    }
}

/**
 * Change pet owner password
 *
 * @param {PasswordResetRequestFormData} data - Contact information for change password
 * @returns {Promise<AuthResponse>} - Response indicating success or failure
 */
export async function changePassword(data: PasswordResetRequestFormData): Promise<AuthResponse> {
    try {
        // BACKEND INTEGRATION POINT:
        // Replace this with actual API call
        // Example:
        // const response = await fetch(`${API_BASE_URL}/auth/pet-owner/change-password-request`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     contact: data.contact,
        //     contactType: data.contact.includes('@') ? 'email' : 'phone'
        //   })
        // });
        // const result = await response.json();
        // if (!response.ok) throw new Error(result.error || 'Request failed');
        // return result;

        // Simulated response for development
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    message: "Pet owner password change instructions sent successfully",
                })
            }, 1000)
        })
    } catch (error) {
        console.error("Pet owner change password request error:", error)
        return {
            success: false,
            error: error instanceof Error ? error.message : "An unknown error occurred",
        }
    }
}
