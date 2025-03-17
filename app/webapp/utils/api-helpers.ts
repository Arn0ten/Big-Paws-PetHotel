/**
 * API Helper Functions
 *
 * This file contains helper functions for working with APIs.
 * Backend developers can modify these to work with actual API data.
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
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

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
    return error.response.data.message || "An error occurred with the API response"
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

