import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { supabase } from '@/lib/supabase'
import Layout from '@/components/Layout'

export default function CampaignsPage() {
  const [, navigate] = useLocation()
  const [showModal, setShowModal] = useState(false)
  
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate('/login')
    })
  }, [navigate])

  return (
    <Layout title="Campaigns">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="page-eyebrow">Management</div>
          <h1 className="page-title">Campaigns</h1>
          <div className="page-sub">Track and manage your active marketing campaigns.</div>
        </div>
        <button className="save-btn" style={{ width: 'auto', padding: '10px 20px' }} onClick={() => setShowModal(true)}>
          + Create Campaign
        </button>
      </div>

      <div className="filter-bar">
        <button className="filter-btn active">All Campaigns</button>
        <button className="filter-btn">Drafts</button>
        <button className="filter-btn">Active</button>
        <button className="filter-btn">Completed</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {[
          { title: 'Summer Tech Launch', status: 'Active', budget: '$12,000', inf: 4, prog: 65, color: 'var(--green)' },
          { title: 'Gaming Headset Review', status: 'Draft', budget: '$5,500', inf: 0, prog: 0, color: 'var(--muted)' },
          { title: 'Crypto App Promo', status: 'Active', budget: '$25,000', inf: 12, prog: 88, color: 'var(--accent)' },
          { title: 'Fitness App Q3', status: 'Completed', budget: '$8,000', inf: 3, prog: 100, color: 'var(--blue)' },
        ].map((camp, i) => (
          <div key={i} className="panel" style={{ marginBottom: 0 }}>
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ fontFamily: 'Rajdhani', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>{camp.title}</div>
                <div className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: camp.color, border: `1px solid ${camp.color}` }}>{camp.status}</div>
              </div>
              <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 700, fontFamily: 'Rajdhani', marginBottom: '4px' }}>Budget</div>
                  <div style={{ fontWeight: 600, color: 'var(--text)' }}>{camp.budget}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 700, fontFamily: 'Rajdhani', marginBottom: '4px' }}>Influencers</div>
                  <div style={{ fontWeight: 600, color: 'var(--text)' }}>{camp.inf}</div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--muted)', fontWeight: 700, fontFamily: 'Rajdhani', marginBottom: '4px' }}>
                  <span>Progress</span>
                  <span style={{ color: camp.color }}>{camp.prog}%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${camp.prog}%`, background: camp.color }}></div>
                </div>
              </div>
            </div>
            <div style={{ padding: '12px 20px', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
              <button style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>View Details →</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-title">
              <span>Create Campaign</span>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="inp-group">
              <label className="inp-label">Campaign Name</label>
              <input type="text" className="inp" placeholder="e.g. Fall Collection Launch" />
            </div>
            <div className="inp-group">
              <label className="inp-label">Budget ($)</label>
              <input type="number" className="inp" placeholder="5000" />
            </div>
            <div className="inp-group">
              <label className="inp-label">Description</label>
              <textarea className="inp" rows={4} placeholder="Campaign goals and requirements..." style={{ resize: 'none' }}></textarea>
            </div>
            <div className="modal-actions" style={{ marginTop: '24px' }}>
              <button className="save-btn" onClick={() => setShowModal(false)}>Create Draft</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
