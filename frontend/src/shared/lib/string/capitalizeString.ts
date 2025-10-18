export function capitalizeString(string: string): string {
  const capitalizedString = string.charAt(0).toUpperCase() + string.slice(1).toLocaleLowerCase()

  return capitalizedString
}