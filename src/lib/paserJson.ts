export const parseCuisines = (cuisines: any): string[] => {
  if (Array.isArray(cuisines)) return cuisines;
  if (typeof cuisines === "string") {
    try {
      const parsed = JSON.parse(cuisines);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return cuisines.split(",").map((c: string) => c.trim());
    }
  }
  return [];
};