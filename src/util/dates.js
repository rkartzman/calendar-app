/**
 * @see 
 */
export function totalDaysInMonth(month, year) {
  return 32 - new Date(year, month, 32).getDate();
}