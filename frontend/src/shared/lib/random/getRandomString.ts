export function getRandomString(length = 32): string {
  const randomBytes = new Uint8Array(length)
  window.crypto.getRandomValues(randomBytes)

  const randomString = Array.from(randomBytes, (byte) => {
    return `0${byte.toString(16)}`.slice(-2)
  })
    .join('')
    .slice(0, length)

  return randomString
}
