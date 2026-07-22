import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { supabase } from '@/lib/supabase'
import Layout from '@/components/Layout'

export default function DashboardPage() {
  const [, navigate] = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate('/login')
      else setLoading(false)
    })
  }, [navigate])

  if (loading) return null

  return (
    <Layout title="Dashboard">
      <div className="page-header">
        <div className="page-eyebrow">Overview</div>
        <h1 className="page-title">Welcome to KGINFLUENCEX</h1>
        <div className="page-sub">Here is what's happening with your campaigns today.</div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Total Influencers</div>
          <div className="stat-value">2,480</div>
          <div className="stat-delta">+12.5% this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Campaigns</div>
          <div className="stat-value">48</div>
          <div className="stat-delta">+4 this week</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Reach</div>
          <div className="stat-value">12.5M</div>
          <div className="stat-delta">+2.1M this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Revenue Generated</div>
          <div className="stat-value">$145.2K</div>
          <div className="stat-delta neg">-2.4% this month</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <div className="panel-title">Recent Activity</div>
          <div className="panel-action">View All</div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Influencer</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Summer Tech Launch</td>
              <td>@techguru</td>
              <td><span className="badge" style={{ background: 'rgba(34,211,168,0.1)', color: 'var(--green)', border: '1px solid rgba(34,211,168,0.2)' }}>Active</span></td>
              <td>Today, 10:42 AM</td>
            </tr>
            <tr>
              <td>Gaming Setup Review</td>
              <td>@gamerpro</td>
              <td><span className="badge" style={{ background: 'rgba(245,158,11,0.1)', color: 'var(--yellow)', border: '1px solid rgba(245,158,11,0.2)' }}>Pending</span></td>
              <td>Yesterday</td>
            </tr>
            <tr>
              <td>Crypto Wallet Promo</td>
              <td>@cryptodude</td>
              <td><span className="badge" style={{ background: 'rgba(0,212,255,0.1)', color: 'var(--accent)', border: '1px solid rgba(0,212,255,0.2)' }}>Completed</span></td>
              <td>Oct 12</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  )
}
