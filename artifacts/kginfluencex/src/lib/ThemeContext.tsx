import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Theme = 'dark' | 'light' | 'pink' | 'uv' | 'rosegold' | 'forest' | 'charcoal' | 'matrix'
const VALID: Theme[] = ['dark','light','pink','uv','rosegold','forest','charcoal','matrix']

interface ThemeContextType { theme: Theme; setTheme: (t: Theme) => void }

const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', setTheme: () => {} })

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('kg_theme') as Theme
    const initial = VALID.includes(saved) ? saved : 'dark'
    setThemeState(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [])

  const setTheme = (t: Theme) => {
    setThemeState(t)
    localStorage.setItem('kg_theme', t)
    document.documentElement.setAttribute('data-theme', t)
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
