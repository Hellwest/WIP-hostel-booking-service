export const getBoolean = (
  value: string | undefined,
  fallback: boolean,
): boolean => {
  if (value === undefined) {
    return fallback
  }

  try {
    const parsed = JSON.parse(value)

    return Boolean(parsed)
  } catch {
    return false
  }
}
