import { useState } from 'react'
import { useLang } from '@/lib/LanguageContext'

export default function Topbar({ title, onToggleSidebar }: { title?: string; onToggleSidebar: () => void }) {
  const { lang, setLang } = useLang()
  const [langOpen, setLangOpen] = useState(false)

  const flags: Record<string, string> = {
    ka: '🇬🇪', en: '🇬🇧', ru: '🇷🇺', tr: '🇹🇷', zh: '🇨🇳', hi: '🇮🇳'
  }

  return (
    <div className="topbar">
      <button className="topbar-hamburger" onClick={onToggleSidebar}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
      
      {title && <div className="page-title" style={{ fontSize: '1.2rem', margin: 0 }}>{title}</div>}

      <div className="topbar-right">
        <div className="search-bar-container topbar-search" style={{ display: 'flex', alignItems: 'center' }}>
          <input type="text" className="search-bar" placeholder="Search..." style={{ height: '34px' }} />
        </div>

        <button className="topbar-btn notif-dot">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        </button>

        <div style={{ position: 'relative' }}>
          <button className="topbar-btn" onClick={() => setLangOpen(!langOpen)}>
            {flags[lang]}
          </button>
          {langOpen && (
            <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '8px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '80px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
              {Object.keys(flags).map(l => (
                <div key={l} onClick={() => { setLang(l as any); setLangOpen(false) }} style={{ padding: '6px 12px', cursor: 'pointer', borderRadius: '4px', background: lang === l ? 'rgba(0,212,255,0.1)' : 'transparent', color: lang === l ? 'var(--accent)' : 'var(--text)', fontSize: '13px' }}>
                  {flags[l]} {l.toUpperCase()}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
