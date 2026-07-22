import { useEffect } from 'react'
import { useLocation } from 'wouter'
import { supabase } from '@/lib/supabase'
import Layout from '@/components/Layout'

export default function AcademyPage() {
  const [, navigate] = useLocation()
  
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate('/login')
    })
  }, [navigate])

  return (
    <Layout title="Academy">
      <div className="page-header">
        <div className="page-eyebrow">Education</div>
        <h1 className="page-title">Creator Academy</h1>
        <div className="page-sub">Master the art of influencer marketing with our courses.</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {[
          { title: 'Viral Hook Masterclass', level: 'Beginner', duration: '2 Hours', prog: 100 },
          { title: 'Brand Negotiation 101', level: 'Intermediate', duration: '3.5 Hours', prog: 45 },
          { title: 'Algorithm Secrets 2024', level: 'Advanced', duration: '4 Hours', prog: 0 },
          { title: 'Lighting & Composition', level: 'Beginner', duration: '1.5 Hours', prog: 0 }
        ].map((course, i) => (
          <div key={i} className="panel" style={{ marginBottom: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '160px', background: 'linear-gradient(135deg, var(--surface), rgba(0,212,255,0.05))', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            </div>
            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge" style={{ background: 'rgba(0,212,255,0.1)', color: 'var(--accent)', border: '1px solid rgba(0,212,255,0.2)' }}>{course.level}</span>
                <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>{course.duration}</span>
              </div>
              <h3 style={{ fontFamily: 'Rajdhani', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '20px' }}>{course.title}</h3>
              
              <div style={{ marginTop: 'auto' }}>
                {course.prog > 0 ? (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--muted)', fontWeight: 700, fontFamily: 'Rajdhani', marginBottom: '6px' }}>
                      <span>Progress</span>
                      <span>{course.prog}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${course.prog}%`, background: course.prog === 100 ? 'var(--green)' : 'var(--accent)' }}></div>
                    </div>
                  </>
                ) : (
                  <button className="save-btn" style={{ width: '100%', padding: '10px' }}>Start Course</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
