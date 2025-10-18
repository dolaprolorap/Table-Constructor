export async function copyToClipboard(text: string): Promise<boolean> {
  document.body.focus()

  try {
    await navigator.clipboard.writeText(text)

    return true
  } catch (error) {
    return false
  }
}