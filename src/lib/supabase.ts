import { createClient } from '@supabase/supabase-js'
import { Database } from '../../types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Debug logging
console.log('Environment:', process.env.NEXT_PUBLIC_ENVIRONMENT)
console.log('Supabase URL exists:', !!supabaseUrl)
console.log('Supabase Key exists:', !!supabaseAnonKey)

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey
)

// Helper type for table rows
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']