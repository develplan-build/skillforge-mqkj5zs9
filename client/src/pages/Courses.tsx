import React, { useState } from 'react'
import { Plus, Search, Edit, Trash2, BookOpen, MoreVertical, PlayCircle } from 'lucide-react'
import { useToast } from '../components/DashboardLayout'

interface Course {
  id: string
  title: string
  price: number
  status: 'published' | 'draft'
  students: number
}

export default function Courses() {
  const { addToast } = useToast()
  const [courses, setCourses] = useState<Course[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  const [formData, setFormData] = useState({ title: '', price: '', status: 'draft' as 'published' | 'draft' })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) return

    const newCourse: Course = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      price: Number(formData.price) || 0,
      status: formData.status,
      students: 0
    }

    setCourses([...courses, newCourse])
    setIsModalOpen(false)
    setFormData({ title: '', price: '', status: 'draft' })
    addToast('Corso creato con successo', 'success')
  }

  const handleDelete = (id: string) => {
    setCourses(courses.filter(c => c.id !== id))
    addToast('Corso eliminato', 'info')
  }

  const filteredCourses = courses.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Catalogo Corsi</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Gestisci i tuoi corsi, lezioni e prezzi.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Nuovo Corso
        </button>
      </div>

      <div className="card" style={{ marginBottom: '24px', padding: '16px' }}>
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Cerca corso..." 
            style={{ paddingLeft: '36px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {courses.length === 0 ? (
        <div className="empty-state">
          <BookOpen className="empty-state-icon" />
          <h3 style={{ marginBottom: '8px' }}>Nessun corso presente</h3>
          <p style={{ marginBottom: '24px', maxWidth: '400px' }}>
            Il tuo catalogo è vuoto. Crea il tuo primo corso per iniziare a vendere e formare i tuoi studenti.
          </p>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            Crea il primo corso
          </button>
        </div>
      ) : (
        <div className="card table-container" style={{ padding: 0 }}>
          <table>
            <thead>
              <tr>
                <th>Titolo Corso</th>
                <th>Prezzo</th>
                <th>Stato</th>
                <th>Studenti</th>
                <th style={{ textAlign: 'right' }}>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map(course => (
                <tr key={course.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--accent-light)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PlayCircle size={20} color="var(--accent)" />
                      </div>
                      <span style={{ fontWeight: 500 }}>{course.title}</span>
                    </div>
                  </td>
                  <td>€ {course.price.toFixed(2)}</td>
                  <td>
                    <span className={`badge ${course.status === 'published' ? 'success' : 'warning'}`}>
                      {course.status === 'published' ? 'Pubblicato' : 'Bozza'}
                    </span>
                  </td>
                  <td>{course.students}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button className="icon-btn" onClick={() => addToast('Modifica non implementata nella demo', 'info')}><Edit size={18} /></button>
                      <button className="icon-btn" style={{ color: 'var(--danger)' }} onClick={() => handleDelete(course.id)}><Trash2 size={18} /></button>
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
              <h3 style={{ fontSize: '1.25rem' }}>Nuovo Corso</h3>
              <button className="icon-btn" onClick={() => setIsModalOpen(false)}><MoreVertical size={20} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Titolo del corso</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    placeholder="es. React Avanzato"
                  />
                </div>
                <div className="form-group">
                  <label>Prezzo (€)</label>
                  <input 
                    type="number" 
                    min="0" 
                    step="0.01"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    placeholder="99.00"
                  />
                </div>
                <div className="form-group">
                  <label>Stato iniziale</label>
                  <select 
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value as any})}
                  >
                    <option value="draft">Bozza (Non visibile)</option>
                    <option value="published">Pubblicato (Visibile)</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Annulla</button>
                <button type="submit" className="btn btn-primary">Salva Corso</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}