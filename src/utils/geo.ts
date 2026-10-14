/**
 * Geospatial utilities & duplicate detection algorithms
 */

export const HYDERABAD_DEFAULT_CENTER = {
  lat: 17.385044,
  lng: 78.486671,
  zoom: 12,
};

// Common landmarks in Hyderabad for quick picker & suggestions
export const HYDERABAD_LANDMARKS = [
  { name: 'Charminar Heritage Area', area: 'Old City', lat: 17.361564, lng: 78.474665 },
  { name: 'Road No. 36, Jubilee Hills', area: 'Jubilee Hills', lat: 17.432541, lng: 78.407255 },
  { name: 'Cyber Towers Junction, Hitec City', area: 'Madhapur', lat: 17.450417, lng: 78.380848 },
  { name: 'Banjara Hills Road No. 12', area: 'Banjara Hills', lat: 17.415582, lng: 78.434721 },
  { name: 'Secunderabad Railway Station Area', area: 'Secunderabad', lat: 17.434415, lng: 78.501564 },
  { name: 'Ameerpet Metro Station Hub', area: 'Ameerpet', lat: 17.437462, lng: 78.448288 },
  { name: 'Mehdipatnam Bus Terminal Ring', area: 'Mehdipatnam', lat: 17.391632, lng: 78.439812 },
  { name: 'Gachibowli Stadium Road', area: 'Gachibowli', lat: 17.443512, lng: 78.351241 },
  { name: 'Kukatpally Y-Junction', area: 'Kukatpally', lat: 17.493254, lng: 78.401763 },
  { name: 'Dilsukhnagar Market Road', area: 'Dilsukhnagar', lat: 17.368752, lng: 78.524719 },
];

/**
 * Calculate distance in meters between two lat/lng pairs using the Haversine formula.
 */
export function getHaversineDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000; // Earth radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Compute text token similarity (Jaccard + Trigram token matching) on normalized text.
 * Returns score between 0 and 100.
 */
export function calculateTextSimilarity(textA: string, textB: string): number {
  if (!textA || !textB) return 0;
  const cleanA = textA.toLowerCase().replace(/[^a-z0-9\s]/g, '');
  const cleanB = textB.toLowerCase().replace(/[^a-z0-9\s]/g, '');

  if (cleanA === cleanB) return 100;

  const wordsA = new Set(cleanA.split(/\s+/).filter((w) => w.length > 2));
  const wordsB = new Set(cleanB.split(/\s+/).filter((w) => w.length > 2));

  if (wordsA.size === 0 || wordsB.size === 0) return 0;

  let intersection = 0;
  wordsA.forEach((w) => {
    if (wordsB.has(w)) intersection++;
  });

  const union = new Set([...wordsA, ...wordsB]).size;
  const jaccard = union > 0 ? (intersection / union) * 100 : 0;

  // Check substring contains
  let substringBonus = 0;
  if (cleanA.includes(cleanB) || cleanB.includes(cleanA)) {
    substringBonus = 25;
  }

  return Math.min(100, Math.round(jaccard + substringBonus));
}
