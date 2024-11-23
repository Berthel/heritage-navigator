import { createClient } from '@supabase/supabase-js'
import { Database } from '../../types/supabase'
import config, { validateConfig } from '../config/environment'

// Only validate config on server-side
if (typeof window === 'undefined') {
  validateConfig()
}

// Debug logging
console.log('Environment:', config.environment)
console.log('Supabase URL:', config.supabaseUrl)
console.log('Supabase Key exists:', !!config.supabaseAnonKey)

if (!config.supabaseUrl || !config.supabaseAnonKey) {
  throw new Error('Missing required Supabase configuration')
}

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  config.supabaseUrl,
  config.supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
)

// Helper type for table rows
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']