import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Mail, Lock, ArrowRight } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simuliamo un login per la demo
    setTimeout(() => {
      navigate('/app')
    }, 800)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-base)', padding: '24px' }}>
      <div className="card animate-slide-up" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--accent-light)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <BookOpen size={24} color="var(--accent)" />
          </div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Bentornato</h1>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>Accedi al tuo account SkillForge</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input 
                type="email" 
                placeholder="admin@skillforge.com" 
                style={{ paddingLeft: '40px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label>Password</label>
              <a href="#" style={{ fontSize: '0.875rem' }}>Password dimenticata?</a>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input 
                type="password" 
                placeholder="••••••••"
                style={{ paddingLeft: '40px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginBottom: '16px' }} disabled={loading}>
            {loading ? 'Accesso in corso...' : 'Accedi'}
          </button>

          <div style={{ position: 'relative', textAlign: 'center', margin: '24px 0' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
            <span style={{ position: 'relative', backgroundColor: 'var(--bg-surface)', padding: '0 16px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>OPPURE</span>
          </div>

          <button type="button" className="btn btn-secondary" style={{ width: '100%', padding: '12px', marginBottom: '12px' }} onClick={() => navigate('/app')}>
            Accedi con Google
          </button>
          <button type="button" className="btn btn-secondary" style={{ width: '100%', padding: '12px' }} onClick={() => navigate('/app')}>
            Accedi con Apple
          </button>
        </form>

        <div style={{ marginTop: '32px', textAlign: 'center', padding: '16px', backgroundColor: 'var(--accent-light)', borderRadius: 'var(--radius-md)' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--accent)', fontWeight: 500, marginBottom: '8px' }}>Modalità Demo</p>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate('/app')}>
            Entra direttamente <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}