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
          <div className="kpi-value">{hasData ? '€ 4.500' : '€ 0'}</div>
          <div style={{ fontSize: '0.875rem', color: hasData ? 'var(--success)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {hasData ? <><TrendingUp size={14} /> +8% rispetto al mese scorso</> : 'Nessun dato'}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginTop: '24px' }}>
        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Andamento Vendite</h3>
          <div style={{ height: '300px' }}>
            {hasData ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--text-primary)' }}
                  />
                  <Bar dataKey="vendite" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-state" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <BarChart size={48} color="var(--text-secondary)" style={{ opacity: 0.5, marginBottom: '16px' }} />
                <p style={{ color: 'var(--text-secondary)' }}>Nessun dato disponibile</p>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3>Attività Recenti</h3>
            <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.875rem' }} onClick={() => navigate('/app/notifications')}>
              Vedi tutte
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {hasData ? (
              <>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--info)' }}>
                    <Users size={16} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>Nuovo studente iscritto</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Marco Rossi si è iscritto a "Corso React Avanzato"</p>
                  </div>
                  <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>2 min fa</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
                    <CreditCard size={16} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>Nuovo pagamento ricevuto</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Fattura #INV-2023-001 pagata</p>
                  </div>
                  <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>1 ora fa</span>
                </div>
              </>
            ) : (
              <div className="empty-state" style={{ padding: '32px 0' }}>
                <p style={{ color: 'var(--text-secondary)' }}>Nessuna attività recente</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
