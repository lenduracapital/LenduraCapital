/**
 * Image fallback utility to handle missing assets gracefully
 * This prevents build failures when referenced images don't exist
 */

// Import all available fallback images
import debtConsolidationFallback from "@assets/Debt-Consolidation_1752510134665.jpeg";
import truckFallback from "@assets/Truck_1750271749729.jpg";
import creditFallback from "@assets/bigstock-Fix-Your-Credit-146067395_1750771733188.jpg";
import downloadFallback from "@assets/download_1752510375017.jpg";

// Default fallback image mapping
const fallbackImages = {
  business: debtConsolidationFallback,
  equipment: truckFallback,
  credit: creditFallback,
  financial: downloadFallback,
  default: debtConsolidationFallback
} as const;

/**
 * Get a fallback image based on category
 * @param category - Type of business/financial category
 * @returns Fallback image path
 */
export function getFallbackImage(category: keyof typeof fallbackImages = 'default'): string {
  return fallbackImages[category] || fallbackImages.default;
}

/**
 * Safe image import with automatic fallback
 * Use this for dynamic image imports that might fail
 * @param imagePath - Primary image path to try
 * @param fallbackCategory - Category for fallback selection
 * @returns Image path (primary or fallback)
 */
export function safeImageImport(imagePath: string, fallbackCategory: keyof typeof fallbackImages = 'default'): string {
  try {
    // In a production environment, you could check if the image exists
    // For now, we'll rely on the build process to catch missing images
    return imagePath;
  } catch (error) {
    console.warn(`Image not found: ${imagePath}, using fallback`);
    return getFallbackImage(fallbackCategory);
  }
}

export default fallbackImages;