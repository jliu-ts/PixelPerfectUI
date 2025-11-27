// Application configuration constants
// Centralized for easy updates and consistency

// Responsive breakpoints
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
} as const;

// Toast/notification settings
export const TOAST_CONFIG = {
  limit: 3,
  duration: 5000,
  removeDelay: 1000,
} as const;

// Pagination defaults
export const PAGINATION = {
  defaultPageSize: 20,
  maxPageSize: 100,
} as const;

// API configuration
export const API_CONFIG = {
  baseUrl: "/api",
  timeout: 30000,
  retryAttempts: 3,
} as const;

// Feature flags (can be overridden by environment)
export const FEATURES = {
  enableWebSockets: true,
  enableAnalytics: false,
  debugMode: import.meta.env.DEV,
} as const;

// Content limits
export const LIMITS = {
  maxPromptLength: 4000,
  maxTitleLength: 100,
  maxTagsPerPrompt: 10,
  maxFileUploadMB: 50,
} as const;
