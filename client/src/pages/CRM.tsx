import React, { useState } from 'react'
import { UserSquare2, Plus, Search, Edit, Trash2, Phone, Mail, MoreVertical, Star } from 'lucide-react'
import { useToast } from '../components/DashboardLayout'

interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone: string
  status: 'new' | 'contacted' | 'converted' | 'lost'
}

export default function CRM() {
  const { addToast } = useToast()
  const [leads, setLeads] = useState<Lead[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', status: 'new' as Lead['status'] })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) return

    const newLead: Lead = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData
    }

    setLeads([...leads, newLead])
    setIsModalOpen(false)
    setFormData({ name: '', company: '', email: '', phone: '', status: 'new' })
    addToast('Lead aggiunto al CRM', 'success')
  }

  const handleDelete = (id: string) => {
    setLeads(leads.filter(l => l.id !== id))
    addToast('Lead rimosso', 'info')
  }

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: Lead['status']) => {
    switch(status) {
      case 'new': return <span className="badge info">Nuovo</span>
      case 'contacted': return <span className="badge warning">Contattato</span>
      case 'converted': return <span className="badge success">Convertito</span>
      case 'lost': return <span className="badge danger">Perso</span>
    }
  }

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>CRM Clienti</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Gestisci i tuoi contatti, lead e opportunità commerciali.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Nuovo Lead
        </button>
      </div>

      <div className="card" style={{ marginBottom: '24px', padding: '16px' }}>
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Cerca per nome o azienda..." 
            style={{ paddingLeft: '36px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="empty-state">
          <UserSquare2 className="empty-state-icon" />
          <h3 style={{ marginBottom: '8px' }}>Nessun lead nel CRM</h3>
          <p style={{ marginBottom: '24px', maxWidth: '400px' }}>
            Inizia a tracciare le tue opportunità commerciali aggiungendo il tuo primo lead.
          </p>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            Aggiungi Lead
          </button>
        </div>
      ) : (
        <div className="card table-container" style={{ padding: 0 }}>
          <table>
            <thead>
              <tr>
                <th>Contatto</th>
                <th>Azienda</th>
                <th>Recapiti</th>
                <th>Stato</th>
                <th style={{ textAlign: 'right' }}>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map(lead => (
                <tr key={lead.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Star size={16} color={lead.status === 'converted' ? 'var(--warning)' : 'var(--text-secondary)'} />
                      <span style={{ fontWeight: 500 }}>{lead.name}</span>
                    </div>
                  </td>
                  <td>{lead.company || '-'}</td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {lead.email && <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={12} /> {lead.email}</div>}
                      {lead.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={12} /> {lead.phone}</div>}
                    </div>
                  </td>
                  <td>{getStatusBadge(lead.status)}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button className="icon-btn" onClick={() => addToast('Modifica non implementata nella demo', 'info')}><Edit size={18} /></button>
                      <button className="icon-btn" style={{ color: 'var(--danger)' }} onClick={() => handleDelete(lead.id)}><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontSize: '1.25rem' }}>Nuovo Lead</h3>
              <button className="icon-btn" onClick={() => setIsModalOpen(false)}><MoreVertical size={20} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Nome e Cognome</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Azienda (Opzionale)</label>
                  <input 
                    type="text" 
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Telefono</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Stato</label>
                  <select 
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value as any})}
                  >
                    <option value="new">Nuovo</option>
                    <option value="contacted">Contattato</option>
                    <option value="converted">Convertito</option>
                    <option value="lost">Perso</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Annulla</button>
                <button type="submit" className="btn btn-primary">Salva Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}