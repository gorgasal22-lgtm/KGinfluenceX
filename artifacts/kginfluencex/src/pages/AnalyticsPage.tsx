import { useEffect } from 'react'
import { useLocation } from 'wouter'
import { supabase } from '@/lib/supabase'
import Layout from '@/components/Layout'

export default function AnalyticsPage() {
  const [, navigate] = useLocation()
  
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate('/login')
    })
  }, [navigate])

  return (
    <Layout title="Analytics">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="page-eyebrow">Performance</div>
          <h1 className="page-title">Analytics</h1>
          <div className="page-sub">Measure the impact of your marketing efforts.</div>
        </div>
        <select className="inp" style={{ width: 'auto', minWidth: '150px' }}>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
          <option value="365">This Year</option>
        </select>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Total Impressions</div>
          <div className="stat-value">4.2M</div>
          <div style={{ height: '40px', marginTop: '10px', background: 'linear-gradient(180deg, rgba(0,212,255,0.2) 0%, transparent 100%)', borderRadius: '4px', position: 'relative' }}>
            <svg width="100%" height="40" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0 }}>
              <polyline points="0,40 20,25 40,30 60,15 80,20 100,5 100,40" fill="none" stroke="var(--accent)" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Engagement Rate</div>
          <div className="stat-value">5.8%</div>
          <div style={{ height: '40px', marginTop: '10px', background: 'linear-gradient(180deg, rgba(34,211,168,0.2) 0%, transparent 100%)', borderRadius: '4px', position: 'relative' }}>
            <svg width="100%" height="40" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0 }}>
              <polyline points="0,40 20,35 40,20 60,25 80,10 100,15 100,40" fill="none" stroke="var(--green)" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Click-through Rate</div>
          <div className="stat-value">2.4%</div>
          <div style={{ height: '40px', marginTop: '10px', background: 'linear-gradient(180deg, rgba(245,158,11,0.2) 0%, transparent 100%)', borderRadius: '4px', position: 'relative' }}>
            <svg width="100%" height="40" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0 }}>
              <polyline points="0,40 20,10 40,15 60,30 80,20 100,25 100,40" fill="none" stroke="var(--yellow)" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div className="panel">
          <div className="panel-head">
            <div className="panel-title">Channel Performance</div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Platform</th>
                  <th>Spend</th>
                  <th>Impressions</th>
                  <th>Clicks</th>
                  <th>ROI</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>YouTube</td>
                  <td>$45,000</td>
                  <td>2.1M</td>
                  <td>45.2K</td>
                  <td><span style={{ color: 'var(--green)', fontWeight: 600 }}>240%</span></td>
                </tr>
                <tr>
                  <td>Instagram</td>
                  <td>$32,000</td>
                  <td>1.5M</td>
                  <td>28.4K</td>
                  <td><span style={{ color: 'var(--green)', fontWeight: 600 }}>185%</span></td>
                </tr>
                <tr>
                  <td>TikTok</td>
                  <td>$18,000</td>
                  <td>4.5M</td>
                  <td>12.1K</td>
                  <td><span style={{ color: 'var(--green)', fontWeight: 600 }}>120%</span></td>
                </tr>
                <tr>
                  <td>Twitch</td>
                  <td>$12,000</td>
                  <td>800K</td>
                  <td>5.4K</td>
                  <td><span style={{ color: 'var(--yellow)', fontWeight: 600 }}>95%</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <div className="panel-title">Audience Demographics</div>
          </div>
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', color: 'var(--text)', fontWeight: 500 }}>
                <span>18-24</span>
                <span>45%</span>
              </div>
              <div className="progress-track" style={{ height: '6px' }}><div className="progress-fill" style={{ width: '45%', background: 'var(--accent)' }}></div></div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', color: 'var(--text)', fontWeight: 500 }}>
                <span>25-34</span>
                <span>32%</span>
              </div>
              <div className="progress-track" style={{ height: '6px' }}><div className="progress-fill" style={{ width: '32%', background: 'var(--p2)' }}></div></div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', color: 'var(--text)', fontWeight: 500 }}>
                <span>35-44</span>
                <span>15%</span>
              </div>
              <div className="progress-track" style={{ height: '6px' }}><div className="progress-fill" style={{ width: '15%', background: 'var(--blue)' }}></div></div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', color: 'var(--text)', fontWeight: 500 }}>
                <span>45+</span>
                <span>8%</span>
              </div>
              <div className="progress-track" style={{ height: '6px' }}><div className="progress-fill" style={{ width: '8%', background: 'var(--muted)' }}></div></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
