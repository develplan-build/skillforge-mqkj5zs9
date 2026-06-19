import React, { useState } from 'react'
import { Receipt, Plus, Search, Download, MoreVertical, CheckCircle, Clock } from 'lucide-react'
import { useToast } from '../components/DashboardLayout'

interface Invoice {
  id: string
  number: string
  client: string
  amount: number
  date: string
  status: 'paid' | 'pending'
}

export default function Invoices() {
  const { addToast } = useToast()
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: '1', number: 'FATT-2023-001', client: 'Mario Rossi', amount: 99.00, date: '2023-10-01', status: 'paid' },
    { id: '2', number: 'FATT-2023-002', client: 'Azienda Srl', amount: 450.00, date: '2023-10-05', status: 'pending' },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  const [formData, setFormData] = useState({ client: '', amount: '' })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.client || !formData.amount) return

    const newInvoice: Invoice = {
      id: Math.random().toString(36).substr(2, 9),
      number: `FATT-2023-${String(invoices.length + 1).padStart(3, '0')}`,
      client: formData.client,
      amount: Number(formData.amount),
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    }

    setInvoices([newInvoice, ...invoices])
    setIsModalOpen(false)
    setFormData({ client: '', amount: '' })
    addToast('Fattura creata con successo', 'success')
  }

  const filteredInvoices = invoices.filter(i => 
    i.client.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.number.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Fatturazione</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Gestisci le fatture e i pagamenti dei tuoi clienti.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Nuova Fattura
        </button>
      </div>

      <div className="kpi-grid">
        <div className="card kpi-card">
          <div className="kpi-header">
            <span>Incassato (Mese)</span>
            <CheckCircle size={20} color="var(--success)" />
          </div>
          <div className="kpi-value">€ 99.00</div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-header">
            <span>Da Incassare</span>
            <Clock size={20} color="var(--warning)" />
          </div>
          <div className="kpi-value">€ 450.00</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px', padding: '16px' }}>
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Cerca per cliente o numero..." 
            style={{ paddingLeft: '36px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="card table-container" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr>
              <th>Numero</th>
              <th>Cliente</th>
              <th>Data</th>
              <th>Importo</th>
              <th>Stato</th>
              <th style={{ textAlign: 'right' }}>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map(invoice => (
              <tr key={invoice.id}>
                <td style={{ fontWeight: 500 }}>{invoice.number}</td>
                <td>{invoice.client}</td>
                <td>{invoice.date}</td>
                <td style={{ fontWeight: 600 }}>€ {invoice.amount.toFixed(2)}</td>
                <td>
                  <span className={`badge ${invoice.status === 'paid' ? 'success' : 'warning'}`}>
                    {invoice.status === 'paid' ? 'Pagata' : 'In attesa'}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="icon-btn" onClick={() => addToast('Download PDF simulato', 'success')}>
                    <Download size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontSize: '1.25rem' }}>Nuova Fattura</h3>
              <button className="icon-btn" onClick={() => setIsModalOpen(false)}><MoreVertical size={20} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Cliente</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.client}
                    onChange={e => setFormData({...formData, client: e.target.value})}
                    placeholder="Nome o Ragione Sociale"
                  />
                </div>
                <div className="form-group">
                  <label>Importo (€)</label>
                  <input 
                    type="number" 
                    min="0" 
                    step="0.01"
                    required
                    value={formData.amount}
                    onChange={e => setFormData({...formData, amount: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Annulla</button>
                <button type="submit" className="btn btn-primary">Emetti Fattura</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}