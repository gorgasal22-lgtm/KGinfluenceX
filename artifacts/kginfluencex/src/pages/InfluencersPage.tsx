import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { supabase } from '@/lib/supabase'
import Layout from '@/components/Layout'

export default function InfluencersPage() {
  const [, navigate] = useLocation()
  const [showModal, setShowModal] = useState(false)
  
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate('/login')
    })
  }, [navigate])

  return (
    <Layout title="Influencers">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="page-eyebrow">Directory</div>
          <h1 className="page-title">Influencer Network</h1>
          <div className="page-sub">Discover and manage influencers for your campaigns.</div>
        </div>
        <button className="save-btn" style={{ width: 'auto', padding: '10px 20px' }} onClick={() => setShowModal(true)}>
          + Add Influencer
        </button>
      </div>

      <div className="filter-bar">
        <input type="text" className="search-bar" placeholder="Search influencers..." />
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Tech</button>
        <button className="filter-btn">Gaming</button>
        <button className="filter-btn">Lifestyle</button>
      </div>

      <div className="panel">
        <table className="data-table">
          <thead>
            <tr>
              <th>Influencer</th>
              <th>Platform</th>
              <th>Followers</th>
              <th>Niche</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Alex Chen', handle: '@alexc', plat: 'YouTube', fol: '1.2M', niche: 'Tech', score: '98' },
              { name: 'Sarah Jones', handle: '@sarahj', plat: 'Instagram', fol: '850K', niche: 'Lifestyle', score: '94' },
              { name: 'Mike Ross', handle: '@mikeplays', plat: 'Twitch', fol: '2.4M', niche: 'Gaming', score: '99' },
              { name: 'Emma Watson', handle: '@emmatech', plat: 'TikTok', fol: '420K', niche: 'Tech', score: '88' },
            ].map((inf, i) => (
              <tr key={i}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="avatar" style={{ width: '36px', height: '36px' }}>{inf.name[0]}</div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text)' }}>{inf.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{inf.handle}</div>
                    </div>
                  </div>
                </td>
                <td>{inf.plat}</td>
                <td><span style={{ fontWeight: 600 }}>{inf.fol}</span></td>
                <td><span className="badge" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}>{inf.niche}</span></td>
                <td>
                  <div className="rank-badge">{inf.score}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-title">
              <span>Add Influencer</span>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="inp-group">
              <label className="inp-label">Name</label>
              <input type="text" className="inp" placeholder="e.g. Alex Chen" />
            </div>
            <div className="inp-group">
              <label className="inp-label">Social Handle</label>
              <input type="text" className="inp" placeholder="@handle" />
            </div>
            <div className="inp-group">
              <label className="inp-label">Platform</label>
              <select className="inp" style={{ appearance: 'none', background: 'var(--surface)' }}>
                <option value="yt">YouTube</option>
                <option value="ig">Instagram</option>
                <option value="tt">TikTok</option>
                <option value="tw">Twitch</option>
              </select>
            </div>
            <div className="modal-actions" style={{ marginTop: '24px' }}>
              <button className="save-btn" onClick={() => setShowModal(false)}>Save Influencer</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
