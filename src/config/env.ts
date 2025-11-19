// Environment configuration utilities
export const env = {
  // Gym/Fitness Club Configuration
  gymName: import.meta.env.VITE_GYM_NAME || 'Gym Management',
  gymTagline: import.meta.env.VITE_GYM_TAGLINE || 'Your Fitness Partner',
  gymContactEmail: import.meta.env.VITE_GYM_CONTACT_EMAIL || 'info@gym.com',
  gymContactPhone: import.meta.env.VITE_GYM_CONTACT_PHONE || '+91-XXXXXXXXXX',
  
  // App Configuration
  appTitle: import.meta.env.VITE_APP_TITLE || 'Gym Management System',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Authentication Configuration
  loginUsername: import.meta.env.VITE_LOGIN_USERNAME || 'user',
  loginPassword: import.meta.env.VITE_LOGIN_PASSWORD || 'password',
  
  // Development flags
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;

// Type for environment configuration
export type EnvConfig = typeof env;