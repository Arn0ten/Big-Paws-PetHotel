/**
 * API Helper Functions
 *
 * This file contains helper functions for working with APIs.
 *
 * =====================================================================
 * BACKEND INTEGRATION INSTRUCTIONS:
 * =====================================================================
 *
 * 1. Use these helper functions for all API calls throughout the application
 * 2. Add proper error handling and loading states
 * 3. Implement authentication token handling if needed
 * 4. Add request/response logging for debugging if needed
 */

/**
 * Fetch data from an API endpoint
 * @param url The API endpoint URL
 * @param options The fetch options
 * @returns The response data
 *
 * @example
 * const data = await fetchData('/api/pets');
 *
 * @example
 * const data = await fetchData('/api/requests', {
 *   method: 'POST',
 *   body: JSON.stringify({ type: 'photo' }),
 * });
 */
export const fetchData = async (url: string, options?: RequestInit) => {
  try {
    // Add authentication token if available
    const headers = {
      "Content-Type": "application/json",
      // Add auth token here if needed
      // "Authorization": `Bearer ${getAuthToken()}`,
      ...(options?.headers || {}),
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `API error: ${response.status}`)
    }

    // Parse JSON response
    return await response.json()
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}

/**
 * Handle API errors
 * @param error The error object
 * @returns An error message
 */
export const handleApiError = (error: any): string => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return error.response.data?.message || "An error occurred with the API response"
  } else if (error.request) {
    // The request was made but no response was received
    return "No response received from the server"
  } else {
    // Something happened in setting up the request that triggered an Error
    return error.message || "An unknown error occurred"
  }
}

/**
 * Create a query string from an object
 * @param params The query parameters
 * @returns The query string
 *
 * @example
 * const queryString = createQueryString({ status: 'active', type: 'dog' });
 * // Returns: "status=active&type=dog"
 */
export const createQueryString = (params: Record<string, string | number | boolean | undefined>): string => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value))
    }
  })

  return searchParams.toString()
}

/**
 * Upload a file to the server
 * @param url The API endpoint URL
 * @param file The file to upload
 * @param additionalData Additional form data to include
 * @returns The response data
 *
 * @example
 * const data = await uploadFile('/api/upload', file, { requestId: '123' });
 */
export const uploadFile = async (url: string, file: File, additionalData?: Record<string, any>) => {
  try {
    const formData = new FormData()
    formData.append("file", file)

    // Add any additional data
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value))
      })
    }

    const response = await fetch(url, {
      method: "POST",
      // Don't set Content-Type header, let the browser set it with the boundary
      headers: {
        // Add auth token here if needed
        // "Authorization": `Bearer ${getAuthToken()}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Upload failed: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("File upload failed:", error)
    throw error
  }
}

/**
 * Get data with pagination
 * @param url The API endpoint URL
 * @param page The page number
 * @param limit The number of items per page
 * @param filters Additional filters
 * @returns The paginated response data
 *
 * @example
 * const { data, totalPages } = await getPaginatedData('/api/pets', 1, 10, { type: 'dog' });
 */
export const getPaginatedData = async (url: string, page = 1, limit = 10, filters?: Record<string, any>) => {
  const params = {
    page,
    limit,
    ...filters,
  }

  const queryString = createQueryString(params)
  const fullUrl = `${url}${queryString ? `?${queryString}` : ""}`

  return await fetchData(fullUrl)
}

/**
 * Format date for API requests
 * @param date The date to format
 * @returns ISO date string
 */
export const formatDateForApi = (date: Date): string => {
  return date.toISOString()
}

