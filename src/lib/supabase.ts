import { createClient } from '@supabase/supabase-js'

// These are undefined when .env is not configured
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isConfigured = Boolean(url && key && url !== 'https://xxxxxxxxxxxx.supabase.co')
export const supabase     = isConfigured ? createClient(url, key) : null
