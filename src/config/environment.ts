// src/config/environment.ts

type Environment = 'development' | 'staging' | 'production' | 'preview';
type SupportedLanguage = 'en' | 'pt' | 'da';

interface MapConfig {
  defaultCenter: {
    lat: number;
    lng: number;
  };
  defaultZoom: number;
}

interface LocalizationConfig {
  defaultLanguage: SupportedLanguage;
  supportedLanguages: SupportedLanguage[];
}

interface FeatureFlags {
  enableMaps: boolean;
  enableOfflineMode: boolean;
  enableDebug: boolean;
  apiMocking: boolean;
}

interface EnvironmentConfig {
  // Base Environment
  environment: Environment;
  isProduction: boolean;
  isDevelopment: boolean;
  isStaging: boolean;
  isPreview: boolean;
  
  // Supabase
  supabaseUrl: string;
  supabaseAnonKey: string;
  siteUrl: string;

  // Localization
  localization: LocalizationConfig;

  // Maps
  maps: MapConfig;

  // Feature Flags
  features: FeatureFlags;

  // App Settings
  defaultCity: string;
  cacheDuration: number;
}

const getEnvironment = (): Environment => {
  return (process.env.NEXT_PUBLIC_ENVIRONMENT as Environment) || 'development';
};

const parseMapCenter = (): { lat: number; lng: number } => {
  const defaultCenter = '37.1283,-7.6506';
  const center = process.env.NEXT_PUBLIC_MAP_DEFAULT_CENTER || defaultCenter;
  const [lat, lng] = center.split(',').map(Number);
  return { lat, lng };
};

const parseSupportedLanguages = (): SupportedLanguage[] => {
  try {
    const languages = JSON.parse(process.env.NEXT_PUBLIC_SUPPORTED_LANGUAGES || '["en"]');
    return languages.filter((lang: string): lang is SupportedLanguage => 
      ['en', 'pt', 'da'].includes(lang));
  } catch {
    return ['en'];
  }
};

// Validate environment variables first
export const validateConfig = () => {
  console.log('Starting environment validation...');
  
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL', 
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'NEXT_PUBLIC_ENVIRONMENT'
  ];
  
  console.log('All process.env keys:', Object.keys(process.env));
  
  console.log('Required variables values:', {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT
  });
  
  const missing = requiredEnvVars.filter(envVar => {
    const value = process.env[envVar];
    console.log(`Checking ${envVar}:`, { value, exists: !!value });
    return !value;
  });
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  // Validate map center format
  if (process.env.NEXT_PUBLIC_MAP_DEFAULT_CENTER) {
    const centerRegex = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;
    if (!centerRegex.test(process.env.NEXT_PUBLIC_MAP_DEFAULT_CENTER)) {
      throw new Error('Invalid map center format. Expected format: lat,lng');
    }
  }
};

// Run validation only on server side
if (typeof window === 'undefined') {
  validateConfig();
}

// Then create the config object
export const config: EnvironmentConfig = {
  environment: getEnvironment(),
  isProduction: getEnvironment() === 'production',
  isDevelopment: getEnvironment() === 'development',
  isStaging: getEnvironment() === 'staging',
  isPreview: getEnvironment() === 'preview',
  
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

  localization: {
    defaultLanguage: process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE as SupportedLanguage || 'en',
    supportedLanguages: parseSupportedLanguages(),
  },

  maps: {
    defaultCenter: parseMapCenter(),
    defaultZoom: Number(process.env.NEXT_PUBLIC_MAP_DEFAULT_ZOOM) || 15,
  },

  features: {
    enableMaps: process.env.NEXT_PUBLIC_ENABLE_MAPS === 'true',
    enableOfflineMode: process.env.NEXT_PUBLIC_ENABLE_OFFLINE_MODE === 'true',
    enableDebug: process.env.NODE_ENV === 'development',
    apiMocking: process.env.NEXT_PUBLIC_API_MOCKING === 'true',
  },

  defaultCity: process.env.NEXT_PUBLIC_DEFAULT_CITY || 'tavira',
  cacheDuration: Number(process.env.NEXT_PUBLIC_CACHE_DURATION) || 3600,
};

export const isValidEnvironment = (env: string): env is Environment => {
  return ['development', 'staging', 'production', 'preview'].includes(env);
};

export default config;