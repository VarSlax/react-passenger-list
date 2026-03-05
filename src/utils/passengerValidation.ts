export const normalizeName = (name: string): string => {
  // 1. Filter: allow only letters (Unicode), spaces, hyphens, and apostrophes
  let normalized = name.replace(/[^a-zA-Z\u0400-\u04FF\s\-']/g, '');

  // 2. Collapse consecutive separators
  normalized = normalized.replace(/'{2,}/g, "'"); // Multiple apostrophes → one
  normalized = normalized.replace(/-{2,}/g, '-'); // Multiple hyphens → one
  normalized = normalized.replace(/\s{2,}/g, ' '); // Multiple spaces → one

  // 3. Per-word limits: max 1 apostrophe and max 1 hyphen per word
  //    Strip leading separators only (not trailing — see note above)
  normalized = normalized
    .split(' ')
    .map((word) => {
      let apCount = 0;
      let hyphenCount = 0;

      return word
        .replace(/'/g, () => (++apCount <= 1 ? "'" : ''))
        .replace(/-/g, () => (++hyphenCount <= 1 ? '-' : ''))
        .replace(/^[-']+/, ''); // strip leading separators only
    })
    // Note: no filter(Boolean) here — it would eat trailing spaces during live typing
    .join(' ');

  return normalized;
};

/**
 * Validates a name string.
 * Returns an error message string if invalid, or null if valid.
 */
export const validateName = (name: string): string | null => {
  const trimmed = name.trim();

  if (trimmed.length === 0) {
    return 'Name cannot be empty';
  }

  if (trimmed.length < 2) {
    return 'Name is too short (minimum 2 characters)';
  }

  if (trimmed.length > 50) {
    return 'Name is too long (maximum 50 characters)';
  }

  // Ensure it contains at least one letter (to avoid inputs like "- - '")
  if (!/[a-zA-Z\u0400-\u04FF]/.test(trimmed)) {
    return 'Name must contain at least one letter';
  }

  // Each word must not end with a separator (catches "ads'" on blur/submit)
  if (/[-']\s/.test(trimmed) || /[-']$/.test(trimmed)) {
    return 'Each word must end with a letter';
  }

  return null;
};
