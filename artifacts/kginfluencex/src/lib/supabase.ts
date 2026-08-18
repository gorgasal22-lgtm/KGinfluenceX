import { createClient } from '@supabase/supabase-js'

/**
 * Singleton Supabase client for the Vite/React app
 * (artifacts/kginfluencex).
 *
 * - Reads VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY from env.
 * - Vite only exposes variables prefixed with VITE_* to client code.
 * - Mirrors the env naming in `.env.example`.
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error(
    '[supabase] Missing VITE_SUPABASE_URL. ' +
      'Add it to .env.local (see .env.example).'
  )
}
if (!supabaseKey) {
  throw new Error(
    '[supabase] Missing VITE_SUPABASE_ANON_KEY. ' +
      'Add it to .env.local (see .env.example).'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)
