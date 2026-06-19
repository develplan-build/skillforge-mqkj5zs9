import React, { useState } from 'react'
import { User, Mail, Shield, Camera, Save } from 'lucide-react'
import { useToast } from '../components/DashboardLayout'

export default function Profile() {
  const { addToast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [profile, setProfile] = useState({
    firstName: 'Admin',
    lastName: 'SkillForge',
    email: 'admin@skillforge.com',
    role: 'Amministratore di Sistema',
    bio: 'Appassionato di formazione e tecnologia.'
  })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      addToast('Profilo aggiornato con successo', 'success')
    }, 800)
  }

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Il tuo Profilo</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Gestisci le tue informazioni personali e le preferenze.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 24px' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: 'var(--bg-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent)' }}>
              {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
            </div>
            <button 
              className="icon-btn" 
              style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'var(--accent)', color: 'white', padding: '8px', borderRadius: '50%' }}
              onClick={() => addToast('Upload foto non disponibile in demo', 'info')}
            >
              <Camera size={16} />
            </button>
          </div>
          <h3 style={{ marginBottom: '4px' }}>{profile.firstName} {profile.lastName}</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Shield size={14} /> {profile.role}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            <Mail size={14} /> {profile.email}
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '24px' }}>Informazioni Personali</h3>
          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Nome</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input 
                    type="text" 
                    value={profile.firstName}
                    onChange={e => setProfile({...profile, firstName: e.target.value})}
                    style={{ paddingLeft: '40px' }}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Cognome</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input 
                    type="text" 
                    value={profile.lastName}
                    onChange={e => setProfile({...profile, lastName: e.target.value})}
                    style={{ paddingLeft: '40px' }}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input 
                  type="email" 
                  value={profile.email}
                  onChange={e => setProfile({...profile, email: e.target.value})}
                  style={{ paddingLeft: '40px' }}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Biografia</label>
              <textarea 
                value={profile.bio}
                onChange={e => setProfile({...profile, bio: e.target.value})}
                rows={4}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button type="submit" className="btn btn-primary" disabled={isSaving}>
                {isSaving ? 'Salvataggio...' : <><Save size={18} /> Salva Modifiche</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}