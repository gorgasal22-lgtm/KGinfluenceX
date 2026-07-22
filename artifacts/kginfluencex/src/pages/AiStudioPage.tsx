import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { supabase } from '@/lib/supabase'
import Layout from '@/components/Layout'

export default function AiStudioPage() {
  const [, navigate] = useLocation()
  const [step, setStep] = useState(1)
  
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate('/login')
    })
  }, [navigate])

  return (
    <Layout title="AI Studio">
      <div className="page-header">
        <div className="page-eyebrow">Generation</div>
        <h1 className="page-title">AI Content Studio</h1>
        <div className="page-sub">Generate ideas, hooks, and captions tailored to your audience.</div>
      </div>

      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }}>
          <div className="panel" style={{ padding: '30px' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
              {[1, 2, 3].map(s => (
                <div key={s} style={{ flex: 1, height: '4px', background: s <= step ? 'var(--accent)' : 'var(--border)', borderRadius: '2px', transition: 'background 0.3s' }}></div>
              ))}
            </div>

            {step === 1 && (
              <div>
                <h2 style={{ fontFamily: 'Rajdhani', fontSize: '1.4rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text)' }}>What are we creating?</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                  {['Video Script', 'Instagram Caption', 'Campaign Brief', 'Email Outreach'].map(opt => (
                    <div key={opt} onClick={() => setStep(2)} style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: '10px', cursor: 'pointer', background: 'var(--surface)', transition: 'all 0.2s' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text)', textAlign: 'center' }}>{opt}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 style={{ fontFamily: 'Rajdhani', fontSize: '1.4rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text)' }}>Provide some details</h2>
                <div className="inp-group">
                  <label className="inp-label">Product/Service Name</label>
                  <input type="text" className="inp" placeholder="e.g. Lumina Skincare" />
                </div>
                <div className="inp-group">
                  <label className="inp-label">Key Selling Points (comma separated)</label>
                  <textarea className="inp" rows={3} placeholder="Vegan, Cruelty-free, Glowing skin" style={{ resize: 'vertical' }}></textarea>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                  <button className="save-btn" style={{ background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' }} onClick={() => setStep(1)}>Back</button>
                  <button className="save-btn" onClick={() => setStep(3)}>Next Step</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 style={{ fontFamily: 'Rajdhani', fontSize: '1.4rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text)' }}>Tone & Voice</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
                  {['Professional', 'Casual', 'Funny', 'Urgent', 'Inspirational', 'Edgy'].map(tone => (
                    <button key={tone} className="filter-btn">{tone}</button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="save-btn" style={{ background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' }} onClick={() => setStep(2)}>Back</button>
                  <button className="save-btn" onClick={() => {
                    alert('AI Generation would start here!')
                  }}>✨ Generate Magic</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ width: '320px', flex: '0 0 auto' }}>
          <div className="panel" style={{ padding: '20px' }}>
            <h3 style={{ fontFamily: 'Rajdhani', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              Tips for Best Results
            </h3>
            <ul style={{ fontSize: '13px', color: 'var(--muted)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>Be specific about your target audience demographics.</li>
              <li>Include any mandatory keywords or hashtags.</li>
              <li>Mention the primary call-to-action (e.g., Click link in bio).</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}
