/**
 * Generates a deterministic 6-digit numeric Citizen ID from a unique string (like Firebase UID).
 * This ensures the same user always gets the same ID without needing manual input.
 */
export const generateCitizenId = (uid: string): string => {
  if (!uid) return "000000";
  
  // Simple hashing algorithm
  let hash = 0;
  for (let i = 0; i < uid.length; i++) {
    hash = uid.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Convert to 6-digit positive string
  return Math.abs(hash % 1000000).toString().padStart(6, '0');
};
