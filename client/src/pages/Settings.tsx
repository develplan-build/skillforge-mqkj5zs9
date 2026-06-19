import React, { useState } from 'react'
import { Settings as SettingsIcon, Globe, Bell, Shield, CreditCard, Save } from 'lucide-react'
import { useToast } from '../components/DashboardLayout'

export default function Settings() {
  const { addToast } = useToast()
  const [activeTab, setActiveTab] = useState('general')
  const [isSaving, setIsSaving] = useState(false)

  const [settings, setSettings] = useState({
    companyName: 'SkillForge Inc.',
    language: 'it',
    timezone: 'Europe/Rome',
    emailNotifications: true,
    marketingEmails: false,
    twoFactor: false
  })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      addToast('Impostazioni salvate con successo', 'success')
    }, 800)
  }

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Impostazioni</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Configura la tua piattaforma e le preferenze di sistema.</p>
      </div>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        <div className="card" style={{ width: '250px', padding: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button 
              className={`btn ${activeTab === 'general' ? 'btn-primary' : 'btn-secondary'}`} 
              style={{ justifyContent: 'flex-start', padding: '12px' }}
              onClick={() => setActiveTab('general')}
            >
              <SettingsIcon size={18} /> Generali
            </button>
            <button 
              className={`btn ${activeTab === 'notifications' ? 'btn-primary' : 'btn-secondary'}`} 
              style={{ justifyContent: 'flex-start', padding: '12px' }}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={18} /> Notifiche
            </button>
            <button 
              className={`btn ${activeTab === 'security' ? 'btn-primary' : 'btn-secondary'}`} 
              style={{ justifyContent: 'flex-start', padding: '12px' }}
              onClick={() => setActiveTab('security')}
            >
              <Shield size={18} /> Sicurezza
            </button>
            <button 
              className={`btn ${activeTab === 'billing' ? 'btn-primary' : 'btn-secondary'}`} 
              style={{ justifyContent: 'flex-start', padding: '12px' }}
              onClick={() => setActiveTab('billing')}
            >
              <CreditCard size={18} /> Fatturazione
            </button>
          </div>
        </div>

        <div className="card" style={{ flex: 1 }}>
          <form onSubmit={handleSave}>
            {activeTab === 'general' && (
              <div className="animate-fade-in">
                <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Globe size={20} color="var(--accent)" /> Impostazioni Generali
                </h3>
                <div className="form-group">
                  <label>Nome Piattaforma / Azienda</label>
                  <input 
                    type="text" 
                    value={settings.companyName}
                    onChange={e => setSettings({...settings, companyName: e.target.value})}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label>Lingua Predefinita</label>
                    <select 
                      value={settings.language}
                      onChange={e => setSettings({...settings, language: e.target.value})}
                    >
                      <option value="it">Italiano</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Fuso Orario</label>
                    <select 
                      value={settings.timezone}
                      onChange={e => setSettings({...settings, timezone: e.target.value})}
                    >
                      <option value="Europe/Rome">Europe/Rome (GMT+1)</option>
                      <option value="Europe/London">Europe/London (GMT)</option>
                      <option value="America/New_York">America/New_York (GMT-5)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="animate-fade-in">
                <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bell size={20} color="var(--accent)" /> Preferenze Notifiche
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={settings.emailNotifications}
                      onChange={e => setSettings({...settings, emailNotifications: e.target.checked})}
                      style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 500 }}>Notifiche Email</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Ricevi un'email per ogni nuovo iscritto o pagamento.</div>
                    </div>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={settings.marketingEmails}
                      onChange={e => setSettings({...settings, marketingEmails: e.target.checked})}
                      style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 500 }}>Email di Marketing</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Ricevi aggiornamenti su nuove funzionalità di SkillForge.</div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="animate-fade-in">
                <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Shield size={20} color="var(--accent)" /> Sicurezza Account
                </h3>
                <div className="form-group">
                  <label>Cambia Password</label>
                  <input type="password" placeholder="Nuova password" style={{ marginBottom: '12px' }} />
                  <input type="password" placeholder="Conferma nuova password" />
                </div>
                <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={settings.twoFactor}
                      onChange={e => setSettings({...settings, twoFactor: e.target.checked})}
                      style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 500 }}>Autenticazione a Due Fattori (2FA)</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Aggiungi un livello di sicurezza extra al tuo account.</div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="animate-fade-in">
                <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CreditCard size={20} color="var(--accent)" /> Piano e Fatturazione
                </h3>
                <div style={{ padding: '20px', backgroundColor: 'var(--bg-surface-hover)', borderRadius: '8px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ fontWeight: 600, fontSize: '1.125rem' }}>Piano Pro</div>
                    <span className="badge success">Attivo</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Il tuo prossimo rinnovo sarà il 01/12/2023 per € 29.00.</p>
                  <button type="button" className="btn btn-secondary" onClick={() => addToast('Gestione abbonamento non disponibile in demo', 'info')}>
                    Gestisci Abbonamento
                  </button>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
              <button type="submit" className="btn btn-primary" disabled={isSaving}>
                {isSaving ? 'Salvataggio...' : <><Save size={18} /> Salva Impostazioni</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}