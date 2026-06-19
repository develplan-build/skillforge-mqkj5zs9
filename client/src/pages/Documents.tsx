import React, { useState } from 'react'
import { Folder, File, Upload, Search, Download, Trash2, MoreVertical } from 'lucide-react'
import { useToast } from '../components/DashboardLayout'

interface Document {
  id: string
  name: string
  size: string
  date: string
  type: 'pdf' | 'doc' | 'image'
}

export default function Documents() {
  const { addToast } = useToast()
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'Manuale_Utente.pdf', size: '2.4 MB', date: '2023-10-15', type: 'pdf' },
    { id: '2', name: 'Termini_Condizioni.doc', size: '1.1 MB', date: '2023-10-10', type: 'doc' },
  ])
  const [searchTerm, setSearchTerm] = useState('')

  const handleUpload = () => {
    addToast('Upload simulato per la demo', 'success')
    const newDoc: Document = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Nuovo_Documento_${Math.floor(Math.random() * 100)}.pdf`,
      size: '1.5 MB',
      date: new Date().toISOString().split('T')[0],
      type: 'pdf'
    }
    setDocuments([newDoc, ...documents])
  }

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(d => d.id !== id))
    addToast('Documento eliminato', 'info')
  }

  const filteredDocs = documents.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Documenti</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Archivio file e materiali didattici.</p>
        </div>
        <button className="btn btn-primary" onClick={handleUpload}>
          <Upload size={18} /> Carica File
        </button>
      </div>

      <div className="card" style={{ marginBottom: '24px', padding: '16px' }}>
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Cerca documento..." 
            style={{ paddingLeft: '36px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {documents.length === 0 ? (
        <div className="empty-state">
          <Folder className="empty-state-icon" />
          <h3 style={{ marginBottom: '8px' }}>Nessun documento</h3>
          <p style={{ marginBottom: '24px', maxWidth: '400px' }}>
            Non hai ancora caricato nessun file. Inizia caricando materiali per i tuoi corsi.
          </p>
          <button className="btn btn-primary" onClick={handleUpload}>
            Carica il primo file
          </button>
        </div>
      ) : (
        <div className="card table-container" style={{ padding: 0 }}>
          <table>
            <thead>
              <tr>
                <th>Nome File</th>
                <th>Dimensione</th>
                <th>Data Caricamento</th>
                <th style={{ textAlign: 'right' }}>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map(doc => (
                <tr key={doc.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <File size={20} color="var(--accent)" />
                      <span style={{ fontWeight: 500 }}>{doc.name}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{doc.size}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{doc.date}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button className="icon-btn" onClick={() => addToast('Download simulato', 'success')}><Download size={18} /></button>
                      <button className="icon-btn" style={{ color: 'var(--danger)' }} onClick={() => handleDelete(doc.id)}><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}