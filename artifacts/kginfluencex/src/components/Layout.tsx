import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import AiChatWidget from './AiChatWidget'

interface LayoutProps { children: React.ReactNode; title?: string }

export default function Layout({ children, title }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Handle responsive sidebar behavior on mount/resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => { if(window.innerWidth <= 768) setSidebarOpen(false) }} />
      <div id="main" className={!sidebarOpen ? 'full-width' : ''}>
        <Topbar title={title} onToggleSidebar={() => setSidebarOpen(o => !o)} />
        <main style={{ flex: 1, padding: '32px 28px 64px' }}>
          {children}
        </main>
      </div>
      <AiChatWidget />
    </>
  )
}
