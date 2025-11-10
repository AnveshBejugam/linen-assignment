// Application Constants

// Gender options for employee form
export const GENDER_OPTIONS = ['Male', 'Female', 'Other'] as const;

// Language options (Indian languages only)
export const LANGUAGE_OPTIONS = [
  'English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 
  'Gujarati', 'Kannada', 'Malayalam', 'Punjabi', 'Odia', 'Urdu'
] as const;

// Form validation constants
export const VALIDATION_CONSTANTS = {
  USER_NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50
  },
  MOBILE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 15,
    INDIA_CODE: '91'
  },
  SEARCH: {
    DEBOUNCE_TIME: 300 // milliseconds
  },
  DATE_RANGE: {
    MAX_YEARS_BACK: 50
  }
} as const;

// Button colors
export const BUTTON_COLORS = {
  PRIMARY: '#0042af',
  PRIMARY_HOVER: '#00358c',
  PRIMARY_ACTIVE: '#002869'
} as const;

// Error colors for validation
export const ERROR_COLORS = {
  VALIDATION: '#d32f2f'
} as const;

// Grid settings
export const GRID_SETTINGS = {
  PAGE_SIZE: 10,
  SEARCH_MAX_WIDTH: 400
} as const;

// Type definitions
export type GenderOption = typeof GENDER_OPTIONS[number];
export type LanguageOption = typeof LANGUAGE_OPTIONS[number];
