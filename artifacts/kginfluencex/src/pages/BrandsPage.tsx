import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { supabase } from '@/lib/supabase'
import Layout from '@/components/Layout'

export default function BrandsPage() {
  const [, navigate] = useLocation()
  const [showModal, setShowModal] = useState(false)
  
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate('/login')
    })
  }, [navigate])

  return (
    <Layout title="Brands">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="page-eyebrow">Partners</div>
          <h1 className="page-title">Brand Partners</h1>
          <div className="page-sub">Manage your brand partnerships and contracts.</div>
        </div>
        <button className="save-btn" style={{ width: 'auto', padding: '10px 20px' }} onClick={() => setShowModal(true)}>
          + Add Brand
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {[
          { name: 'TechGear', ind: 'Consumer Electronics', spend: '$120K', camps: 12 },
          { name: 'FitLife', ind: 'Health & Wellness', spend: '$85K', camps: 8 },
          { name: 'GamerX', ind: 'Gaming', spend: '$250K', camps: 24 },
          { name: 'BeautyCo', ind: 'Cosmetics', spend: '$45K', camps: 3 }
        ].map((brand, i) => (
          <div key={i} className="panel" style={{ padding: '24px', marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div className="avatar" style={{ width: '48px', height: '48px', fontSize: '18px' }}>{brand.name[0]}</div>
              <div>
                <div style={{ fontFamily: 'Rajdhani', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>{brand.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{brand.ind}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '24px', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 700, fontFamily: 'Rajdhani', marginBottom: '4px' }}>Total Spend</div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>{brand.spend}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 700, fontFamily: 'Rajdhani', marginBottom: '4px' }}>Campaigns</div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>{brand.camps}</div>
              </div>
            </div>
            <button style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>
              View Profile
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-title">
              <span>Add Brand Partner</span>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="inp-group">
              <label className="inp-label">Brand Name</label>
              <input type="text" className="inp" placeholder="e.g. Nike" />
            </div>
            <div className="inp-group">
              <label className="inp-label">Industry</label>
              <input type="text" className="inp" placeholder="e.g. Apparel" />
            </div>
            <div className="inp-group">
              <label className="inp-label">Website</label>
              <input type="url" className="inp" placeholder="https://" />
            </div>
            <div className="modal-actions" style={{ marginTop: '24px' }}>
              <button className="save-btn" onClick={() => setShowModal(false)}>Add Brand</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
