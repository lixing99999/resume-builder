/** Default accent for new users and invalid picks */
export const DEFAULT_PRIMARY = '#1a365d'

/** Fixed body / meta text color (readability on white) */
export const RESUME_SECONDARY = '#4a4a4a'

export function normalizeHex(hex) {
  if (!hex || typeof hex !== 'string') {
    return DEFAULT_PRIMARY
  }
  let h = hex.trim()
  if (!h.startsWith('#')) {
    h = `#${h}`
  }
  if (/^#[0-9A-Fa-f]{6}$/.test(h)) {
    return h
  }
  if (/^#[0-9A-Fa-f]{3}$/.test(h)) {
    const r = h[1]
    const g = h[2]
    const b = h[3]
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase()
  }
  return DEFAULT_PRIMARY
}

export function hexToRgb(hex) {
  const h = normalizeHex(hex).slice(1)
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16)
  }
}

/** Light wash behind headers / side columns (PDF-safe rgba) */
export function primarySurfaceTint(hex, alpha = 0.1) {
  const { r, g, b } = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export const PREDEFINE_COLORS = [
  '#1a365d',
  '#0f4c75',
  '#1e3a5f',
  '#14532d',
  '#713f12',
  '#7f1d1d',
  '#4c1d95',
  '#0e7490',
  '#1d4ed8',
  '#0f766e',
  '#374151',
  '#000000'
]
