import { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [, navigate] = useLocation()
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('brand')
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate('/dashboard')
    })
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (isRegister) {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { role } } })
      if (error) setError(error.message)
      else navigate('/dashboard')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else navigate('/dashboard')
    }
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + '/dashboard' } })
  }

  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '20px', overflowY: 'auto' }}>
      <div className="panel" style={{ width: '100%', maxWidth: '400px', margin: 0 }}>
        <div className="panel-head" style={{ justifyContent: 'center', borderBottom: 'none', paddingBottom: 0, paddingTop: '30px' }}>
          <div className="logo-icon" style={{ width: '40px', height: '40px', borderRadius: '10px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 12L2 9z"/></svg>
          </div>
        </div>
        <div style={{ padding: '30px' }}>
          <h1 style={{ fontFamily: 'Rajdhani', fontSize: '1.8rem', fontWeight: 700, color: 'var(--text)', textAlign: 'center', marginBottom: '8px' }}>
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p style={{ color: 'var(--muted)', textAlign: 'center', marginBottom: '30px', fontSize: '14px' }}>
            Enter your details to access KGINFLUENCEX
          </p>

          {error && <div style={{ background: 'rgba(244,63,94,0.1)', color: 'var(--red)', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px', border: '1px solid rgba(244,63,94,0.3)' }}>{error}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {isRegister && (
              <div className="inp-group" style={{ marginBottom: 0 }}>
                <label className="inp-label">I am a</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" onClick={() => setRole('brand')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${role === 'brand' ? 'var(--accent)' : 'var(--border)'}`, background: role === 'brand' ? 'rgba(0,212,255,0.1)' : 'var(--surface)', color: role === 'brand' ? 'var(--accent)' : 'var(--text)', cursor: 'pointer', fontFamily: 'DM Sans', transition: 'all 0.2s' }}>Brand</button>
                  <button type="button" onClick={() => setRole('influencer')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${role === 'influencer' ? 'var(--accent)' : 'var(--border)'}`, background: role === 'influencer' ? 'rgba(0,212,255,0.1)' : 'var(--surface)', color: role === 'influencer' ? 'var(--accent)' : 'var(--text)', cursor: 'pointer', fontFamily: 'DM Sans', transition: 'all 0.2s' }}>Influencer</button>
                </div>
              </div>
            )}
            <div className="inp-group" style={{ marginBottom: 0 }}>
              <label className="inp-label">Email</label>
              <input type="email" required className="inp" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="inp-group" style={{ marginBottom: 0 }}>
              <label className="inp-label">Password</label>
              <input type="password" required className="inp" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="save-btn" style={{ marginTop: '10px' }}>
              {isRegister ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <div style={{ margin: '24px 0', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
            <div style={{ color: 'var(--muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.06em', fontFamily: 'Rajdhani', fontWeight: 700 }}>OR</div>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
          </div>

          <button onClick={handleGoogle} type="button" style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', fontFamily: 'DM Sans', fontSize: '.9rem', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'background 0.2s' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.54 20.2A10 10 0 1 1 21.6 4.3l-2.4 2.2a7 7 0 1 0-.1 11.2l2.4 2.5z"/></svg>
            Continue with Google
          </button>

          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: 'var(--muted)' }}>
            {isRegister ? 'Already have an account?' : 'Don\'t have an account?'}{' '}
            <button type="button" onClick={() => setIsRegister(!isRegister)} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 600, padding: 0 }}>
              {isRegister ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
