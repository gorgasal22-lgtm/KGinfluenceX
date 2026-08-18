import { createClient } from '@supabase/supabase-js'

/**
 * Singleton Supabase client for the Next.js app.
 *
 * SECURITY:
 *   - Reads URL + anon key from environment variables only.
 *   - Throws fast at startup if either var is missing (better than a silent
 *     undefined client that 500s on first request).
 *   - Never hardcode these values in source — `.env.example` documents the
 *     expected keys, `.gitignore` excludes real `.env.local` from git.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error(
    '[supabase] Missing NEXT_PUBLIC_SUPABASE_URL. ' +
      'Add it to .env.local (see .env.example).'
  )
}
if (!supabaseKey) {
  throw new Error(
    '[supabase] Missing NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
      'Add it to .env.local (see .env.example).'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)
