import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, BookOpen, CreditCard, TrendingUp, Plus, ArrowRight } from 'lucide-react'
import { useToast } from '../components/DashboardLayout'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [hasData, setHasData] = useState(false)

  const loadDemoData = () => {
    setHasData(true)
    addToast('Dati demo caricati con successo', 'success')
  }

  const clearData = () => {
    setHasData(false)
    addToast('Dati azzerati', 'info')
  }

  const chartData = [
    { name: 'Gen', vendite: 4000 },
    { name: 'Feb', vendite: 3000 },
    { name: 'Mar', vendite: 2000 },
    { name: 'Apr', vendite: 2780 },
    { name: 'Mag', vendite: 1890 },
    { name: 'Giu', vendite: 2390 },
  ]

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Panoramica</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Monitora le performance della tua piattaforma.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {!hasData ? (
            <button className="btn btn-secondary" onClick={loadDemoData}>
              Carica Dati Demo
            </button>
          ) : (
            <button className="btn btn-secondary" onClick={clearData}>
              Azzera Dati
            </button>
          )}
          <button className="btn btn-primary" onClick={() => navigate('/app/courses')}>
            <Plus size={18} /> Nuovo Corso
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="card kpi-card">
          <div className="kpi-header">
            <span>Studenti Attivi</span>
            <Users size={20} color="var(--info)" />
          </div>
          <div className="kpi-value">{hasData ? '1,248' : '0'}</div>
          <div style={{ fontSize: '0.875rem', color: hasData ? 'var(--success)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {hasData ? <><TrendingUp size={14} /> +12% questo mese</> : 'Nessun dato'}
          </div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-header">
            <span>Corsi Pubblicati</span>
            <BookOpen size={20} color="var(--accent)" />
          </div>
          <div className="kpi-value">{hasData ? '12' : '0'}</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            {hasData ? '3 in bozza' : 'Inizia a creare'}
          </div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-header">
            <span>Ricavi Mensili</span>
            <CreditCard size={20} color="var(--success)" />
          </div>
          <div className="kpi-value">{hasData ? '€ 14.500' : '€ 0'}</div>
          <div style={{ fontSize: '0.875rem', color: hasData ? 'var(--success)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {hasData ? <><TrendingUp size={14} /> +8% questo mese</> : 'Nessun dato'}
          </div>
        </div>
      </div>

      {!hasData ? (
        <div className="empty-state">
          <TrendingUp className="empty-state-icon" />
          <h3 style={{ marginBottom: '8px' }}>La tua dashboard è pronta</h3>
          <p style={{ marginBottom: '24px', maxWidth: '400px' }}>
            Non ci sono ancora dati da mostrare. Inizia creando il tuo primo corso o carica i dati demo per vedere come apparirà.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/app/courses')}>
            Crea il tuo primo corso
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div className="card">
            <h3 style={{ marginBottom: '24px' }}>Andamento Vendite</h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" />
                  <YAxis stroke="var(--text-secondary)" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--accent)' }}
                  />
                  <Bar dataKey="vendite" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3>Iscrizioni Recenti</h3>
              <button className="icon-btn" onClick={() => navigate('/app/users')}><ArrowRight size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px', borderBottom: i !== 4 ? '1px solid var(--border-color)' : 'none' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--bg-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                    U{i}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500 }}>Utente Demo {i}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Corso React Avanzato</div>
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>€ 99</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}