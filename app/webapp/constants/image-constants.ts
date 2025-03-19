/**
 * Image Constants
 *
 * This file contains constants for default images used throughout the application.
 * Backend developers should replace these with actual image paths from your storage system.
 */

// Default images for users and pets
export const DEFAULT_IMAGES = {
    // Default user avatar - replace with your actual default user avatar path
    USER_AVATAR: "/images/default-pic.png",
  
    // Default pet images - replace with your actual default pet image paths
    DOG_IMAGE: "/images/default-dog.jpg",
    CAT_IMAGE: "/images/default-cat.jpg",
  
    // Default placeholder for when no image is available
    PLACEHOLDER: "/placeholder.svg?height=200&width=200",
  }
  
  /**
   * Get the appropriate pet image based on pet type
   *
   * @param petType - The type of pet ("Dog", "Cat", or any other type)
   * @returns The path to the default image for that pet type
   */
  export function getPetImageByType(petType: string): string {
    switch (petType.toLowerCase()) {
      case "dog":
        return DEFAULT_IMAGES.DOG_IMAGE
      case "cat":
        return DEFAULT_IMAGES.CAT_IMAGE
      default:
        return DEFAULT_IMAGES.PLACEHOLDER
    }
  }
  
  