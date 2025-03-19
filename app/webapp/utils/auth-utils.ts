/**
 * Authentication Utilities
 *
 * This file contains utility functions for authentication.
 * Backend developers should replace these with actual API calls.
 *
 * BACKEND INTEGRATION POINTS:
 * 1. Replace the mock functions with actual API calls
 * 2. Implement proper token management
 * 3. Add proper error handling
 * 4. Implement session persistence
 */

// Mock login function - replace with actual API call
export async function login(email: string, password: string) {
  // BACKEND INTEGRATION:
  // Replace with actual API call to your authentication endpoint
  // Example:
  // const response = await fetch('/api/auth/login', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password })
  // });
  // if (!response.ok) throw new Error('Login failed');
  // const data = await response.json();
  // localStorage.setItem('auth_token', data.token);
  // return data.user;

  // Mock implementation
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simple validation for demo purposes
      if (email && password) {
        const user = {
          id: "1",
          name: email.split("@")[0],
          email,
          role: email.includes("admin") ? "admin" : "pet-owner",
        };

        // Store in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("auth_token", "mock-token-" + Math.random());

        resolve(user);
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 500);
  });
}

// Mock logout function - replace with actual API call
export async function logout() {
  // BACKEND INTEGRATION:
  // Replace with actual API call to your logout endpoint
  // Example:
  // await fetch('/api/auth/logout', {
  //   method: 'POST',
  //   headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` }
  // });

  // Mock implementation
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("auth_token");
      resolve();
    }, 300);
  });
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  // BACKEND INTEGRATION:
  // Replace with actual token validation logic
  // Example:
  // const token = localStorage.getItem('auth_token');
  // return !!token && !isTokenExpired(token);

  // Mock implementation
  return !!localStorage.getItem("auth_token");
}

// Get current user
export function getCurrentUser() {
  // BACKEND INTEGRATION:
  // Replace with actual user data fetching logic
  // Example:
  // const token = localStorage.getItem('auth_token');
  // if (!token) return null;
  // return fetchUserData(token);

  // Mock implementation
  const userJson = localStorage.getItem("user");
  return userJson ? JSON.parse(userJson) : null;
}

// Update user profile
export async function updateUserProfile(userData: any) {
  // BACKEND INTEGRATION:
  // Replace with actual API call to update user profile
  // Example:
  // const response = await fetch('/api/users/profile', {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
  //   },
  //   body: JSON.stringify(userData)
  // });
  // if (!response.ok) throw new Error('Failed to update profile');
  // return await response.json();

  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = getCurrentUser();
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      resolve(updatedUser);
    }, 500);
  });
}
