export function sortDates(date1: Date, date2: Date): 1 | 0 | -1 {

  const date1Bigger = date1 > date2 ? 1 : 0
  const date2Bigger = date2 > date1 ? -1 : 0

  return date1Bigger || date2Bigger
}