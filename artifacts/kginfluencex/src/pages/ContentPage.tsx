import { useEffect } from 'react'
import { useLocation } from 'wouter'
import { supabase } from '@/lib/supabase'
import Layout from '@/components/Layout'

export default function ContentPage() {
  const [, navigate] = useLocation()
  
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate('/login')
    })
  }, [navigate])

  return (
    <Layout title="Content">
      <div className="page-header">
        <div className="page-eyebrow">Library</div>
        <h1 className="page-title">Content Calendar</h1>
        <div className="page-sub">Review and approve influencer content before publishing.</div>
      </div>

      <div className="filter-bar">
        <button className="filter-btn active">Pending Approval</button>
        <button className="filter-btn">Scheduled</button>
        <button className="filter-btn">Published</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {[
          { title: 'Tech Review Video', inf: '@alexc', date: 'Oct 24, 2023', plat: 'YouTube', type: 'Video' },
          { title: 'Unboxing Story', inf: '@sarahj', date: 'Oct 25, 2023', plat: 'Instagram', type: 'Story' },
          { title: 'Gameplay Highlights', inf: '@mikeplays', date: 'Oct 26, 2023', plat: 'Twitch', type: 'Stream' },
          { title: 'Feature Tutorial', inf: '@emmatech', date: 'Oct 28, 2023', plat: 'TikTok', type: 'Short' }
        ].map((item, i) => (
          <div key={i} className="panel" style={{ padding: '16px', marginBottom: 0 }}>
            <div style={{ height: '140px', background: 'var(--surface)', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border)' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div style={{ fontFamily: 'Rajdhani', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)' }}>{item.title}</div>
              <div className="badge" style={{ background: 'rgba(245,158,11,0.1)', color: 'var(--yellow)', border: '1px solid rgba(245,158,11,0.2)' }}>Pending</div>
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--muted)', marginBottom: '16px' }}>
              By <span style={{ color: 'var(--accent)' }}>{item.inf}</span> for {item.plat}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid var(--green)', background: 'rgba(34,211,168,0.1)', color: 'var(--green)', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}>Approve</button>
              <button style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', fontSize: '12px', cursor: 'pointer' }}>Review</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
