import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { supabase } from '@/lib/supabase'
import Layout from '@/components/Layout'
import { useTheme, Theme } from '@/lib/ThemeContext'
import { useLang, Lang } from '@/lib/LanguageContext'

export default function SettingsPage() {
  const [, navigate] = useLocation()
  const { theme, setTheme } = useTheme()
  const { lang, setLang } = useLang()
  const [email, setEmail] = useState('')
  
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate('/login')
      else setEmail(data.user.email || '')
    })
  }, [navigate])

  const themes: { id: Theme; name: string; colors: string[] }[] = [
    { id: 'dark', name: 'Cyber Navy', colors: ['#060b18', '#00d4ff'] },
    { id: 'light', name: 'Light Mode', colors: ['#f0f4ff', '#0050dc'] },
    { id: 'uv', name: 'Ultraviolet', colors: ['#0d0020', '#c026d3'] },
    { id: 'pink', name: 'Neon Pink', colors: ['#1a0510', '#ff1493'] },
    { id: 'rosegold', name: 'Rose Gold', colors: ['#1a100d', '#e8957a'] },
    { id: 'forest', name: 'Dark Forest', colors: ['#041208', '#22c55e'] },
    { id: 'charcoal', name: 'Charcoal Minimal', colors: ['#111111', '#e8e8e8'] },
    { id: 'matrix', name: 'Matrix Terminal', colors: ['#000d00', '#00ff41'] },
  ]

  const languages: { id: Lang; name: string }[] = [
    { id: 'ka', name: 'ქართული (Georgian)' },
    { id: 'en', name: 'English' },
    { id: 'ru', name: 'Русский (Russian)' },
    { id: 'tr', name: 'Türkçe (Turkish)' },
    { id: 'zh', name: '中文 (Chinese)' },
    { id: 'hi', name: 'हिन्दी (Hindi)' },
  ]

  return (
    <Layout title="Settings">
      <div className="page-header">
        <div className="page-eyebrow">Preferences</div>
        <h1 className="page-title">Account Settings</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 3fr', gap: '30px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button className="filter-btn active" style={{ width: '100%', justifyContent: 'flex-start' }}>Profile</button>
          <button className="filter-btn" style={{ width: '100%', justifyContent: 'flex-start' }}>Appearance</button>
          <button className="filter-btn" style={{ width: '100%', justifyContent: 'flex-start' }}>Notifications</button>
          <button className="filter-btn" style={{ width: '100%', justifyContent: 'flex-start' }}>Security</button>
        </div>

        <div>
          <div className="panel" style={{ padding: '24px' }}>
            <h2 style={{ fontFamily: 'Rajdhani', fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text)' }}>Profile Information</h2>
            <div className="inp-group">
              <label className="inp-label">Email Address</label>
              <input type="email" className="inp" value={email} disabled style={{ opacity: 0.7 }} />
            </div>
            <div className="inp-group">
              <label className="inp-label">Full Name</label>
              <input type="text" className="inp" placeholder="Your name" />
            </div>
            <button className="save-btn" style={{ width: 'auto', padding: '10px 24px', marginTop: '10px' }}>Save Changes</button>
          </div>

          <div className="panel" style={{ padding: '24px' }}>
            <h2 style={{ fontFamily: 'Rajdhani', fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text)' }}>Appearance</h2>
            <label className="inp-label" style={{ marginBottom: '12px' }}>Theme</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px', marginBottom: '24px' }}>
              {themes.map(t => (
                <div key={t.id} onClick={() => setTheme(t.id)} style={{ padding: '12px', borderRadius: '8px', border: `2px solid ${theme === t.id ? 'var(--accent)' : 'var(--border)'}`, background: 'var(--surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: 'border-color 0.2s' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: `linear-gradient(135deg, ${t.colors[0]}, ${t.colors[1]})`, border: '1px solid rgba(255,255,255,0.2)' }}></div>
                  <span style={{ fontSize: '12px', fontWeight: theme === t.id ? 600 : 400, color: 'var(--text)' }}>{t.name}</span>
                </div>
              ))}
            </div>

            <label className="inp-label" style={{ marginBottom: '12px' }}>Language</label>
            <select className="inp" value={lang} onChange={(e) => setLang(e.target.value as Lang)} style={{ appearance: 'none', width: '100%', maxWidth: '300px' }}>
              {languages.map(l => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Layout>
  )
}
