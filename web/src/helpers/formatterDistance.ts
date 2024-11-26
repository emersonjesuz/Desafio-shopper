export function formatterDistance(distance: number): string {
  if (distance > 1000) return `${(distance / 1000).toFixed(2)} km`;
  return `${distance} m`;
}
