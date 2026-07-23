import { useLocation, Link } from 'wouter'
import { useLang, NAV_LABELS } from '@/lib/LanguageContext'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [pathname, navigate] = useLocation()
  const { lang } = useLang()
  const labels = NAV_LABELS[lang]
  const [userName, setUserName] = useState('User')
  
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserName(data.user.email?.split('@')[0] || 'User')
      }
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  const mainNav = [
    { id: 'dashboard', path: '/dashboard', icon: 'M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z' },
    { id: 'campaigns', path: '/campaigns', icon: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' },
    { id: 'influencers', path: '/influencers', icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z' },
    { id: 'brands', path: '/brands', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10' },
    { id: 'content', path: '/content', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M9 13h6M9 17h6M9 9h1' },
    { id: 'analytics', path: '/analytics', icon: 'M18 20V10M12 20V4M6 20v-6' }
  ]

  const aiNav = [
    { id: 'aiStudio', path: '/ai-studio', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
    { id: 'academy', path: '/academy', icon: 'M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5' }
  ]

  const sysNav = [
    { id: 'settings', path: '/settings', icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z' }
  ]

  return (
    <div className={`sidebar ${open ? 'open' : 'closed'}`}>
      <div className="sidebar-logo">
        <div className="logo-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 12L2 9z"/></svg>
        </div>
        <div className="logo-text">KGINFLUENCEX</div>
      </div>
      
      <div className="sidebar-scroll">
        <div className="nav-section">
          <div className="nav-section-label">{labels.workspace || 'WORKSPACE'}</div>
          {mainNav.map(item => (
            <Link key={item.id} to={item.path} className={`nav-item ${pathname === item.path ? 'active' : ''}`}>
              <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon}/>
              </svg>
              <span>{labels[item.id] || item.id}</span>
            </Link>
          ))}
        </div>

        <div className="nav-section">
          <div className="nav-section-label">{labels.aitools || 'AI TOOLS'}</div>
          {aiNav.map(item => (
            <Link key={item.id} to={item.path} className={`nav-item ${pathname === item.path ? 'active' : ''}`}>
              <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon}/>
              </svg>
              <span>{labels[item.id] || item.id}</span>
            </Link>
          ))}
        </div>

        <div className="nav-section">
          <div className="nav-section-label">{labels.system || 'SYSTEM'}</div>
          {sysNav.map(item => (
            <Link key={item.id} to={item.path} className={`nav-item ${pathname === item.path ? 'active' : ''}`}>
              <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon}/>
              </svg>
              <span>{labels[item.id] || item.id}</span>
            </Link>
          ))}
          <div onClick={handleLogout} className="nav-item">
            <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            <span>{labels.logout || 'Logout'}</span>
          </div>
        </div>
      </div>

      <div className="sidebar-user">
        <div className="avatar">{userName.charAt(0).toUpperCase()}</div>
        <div className="user-info">
          <div className="user-name">{userName}</div>
          <div className="user-role">Administrator</div>
        </div>
      </div>
    </div>
  )
}
