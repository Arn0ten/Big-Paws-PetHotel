// This file provides data and utilities for Philippine locations

// Define types for Philippine locations
export interface Province {
  code: string;
  name: string;
  regionCode: string;
  islandGroupCode?: string;
}

export interface City {
  code: string;
  name: string;
  provinceCode: string;
  districtCode?: string;
  regionCode?: string;
}

// Placeholder for provinces - will be fetched from API
export const philippineProvinces: Province[] = [];

/**
 * Fetches cities for a given province code
 * @param provinceCode The code of the province to fetch cities for
 * @returns Array of cities in the province
 */
export async function getCitiesByProvince(
  provinceCode: string,
): Promise<string[]> {
  try {
    const response = await fetch(
      `https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities/`,
    );
    const data = await response.json();
    return data.map((city: any) => city.name);
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
}

/**
 * Fetches all provinces from the API
 * @returns Promise resolving to array of provinces
 */
export async function getAllProvinces(): Promise<Province[]> {
  try {
    const response = await fetch("https://psgc.gitlab.io/api/provinces/");
    return await response.json();
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return [];
  }
}
