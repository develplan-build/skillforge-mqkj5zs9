import React, { useState } from 'react'
import { Users as UsersIcon, Plus, Search, Edit, Trash2, Mail, Shield, MoreVertical } from 'lucide-react'
import { useToast } from '../components/DashboardLayout'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'student'
  status: 'active' | 'inactive'
}

export default function Users() {
  const { addToast } = useToast()
  const [users, setUsers] = useState<User[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  const [formData, setFormData] = useState({ name: '', email: '', role: 'student' as 'admin' | 'student' })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: 'active'
    }

    setUsers([...users, newUser])
    setIsModalOpen(false)
    setFormData({ name: '', email: '', role: 'student' })
    addToast('Utente aggiunto con successo', 'success')
  }

  const handleDelete = (id: string) => {
    setUsers(users.filter(u => u.id !== id))
    addToast('Utente rimosso', 'info')
  }

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Gestione Utenti</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Amministra gli accessi e i ruoli della piattaforma.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Nuovo Utente
        </button>
      </div>

      <div className="card" style={{ marginBottom: '24px', padding: '16px' }}>
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Cerca per nome o email..." 
            style={{ paddingLeft: '36px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {users.length === 0 ? (
        <div className="empty-state">
          <UsersIcon className="empty-state-icon" />
          <h3 style={{ marginBottom: '8px' }}>Nessun utente registrato</h3>
          <p style={{ marginBottom: '24px', maxWidth: '400px' }}>
            Non hai ancora aggiunto nessun utente. Invita studenti o amministratori per iniziare.
          </p>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            Aggiungi il primo utente
          </button>
        </div>
      ) : (
        <div className="card table-container" style={{ padding: 0 }}>
          <table>
            <thead>
              <tr>
                <th>Utente</th>
                <th>Ruolo</th>
                <th>Stato</th>
                <th style={{ textAlign: 'right' }}>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--bg-surface-hover)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 500 }}>{user.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Mail size={12} /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {user.role === 'admin' ? <Shield size={14} color="var(--accent)" /> : <UsersIcon size={14} color="var(--text-secondary)" />}
                      <span style={{ textTransform: 'capitalize' }}>{user.role}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${user.status === 'active' ? 'success' : 'danger'}`}>
                      {user.status === 'active' ? 'Attivo' : 'Inattivo'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button className="icon-btn" onClick={() => addToast('Modifica non implementata nella demo', 'info')}><Edit size={18} /></button>
                      <button className="icon-btn" style={{ color: 'var(--danger)' }} onClick={() => handleDelete(user.id)}><Trash2 size={18} /></button>
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
              <h3 style={{ fontSize: '1.25rem' }}>Nuovo Utente</h3>
              <button className="icon-btn" onClick={() => setIsModalOpen(false)}><MoreVertical size={20} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Nome completo</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="es. Mario Rossi"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="mario.rossi@email.com"
                  />
                </div>
                <div className="form-group">
                  <label>Ruolo</label>
                  <select 
                    value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value as any})}
                  >
                    <option value="student">Studente</option>
                    <option value="admin">Amministratore</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Annulla</button>
                <button type="submit" className="btn btn-primary">Salva Utente</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}