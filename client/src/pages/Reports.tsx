import React, { useState } from 'react'
import { FileText, Download, Filter, Calendar } from 'lucide-react'
import { useToast } from '../components/DashboardLayout'
import jsPDF from 'jspdf'

export default function Reports() {
  const { addToast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = (reportName: string) => {
    setIsGenerating(true)
    try {
      const doc = new jsPDF()
      
      // Header
      doc.setFontSize(20)
      doc.setTextColor(251, 0, 255) // Colore accento
      doc.text('SkillForge', 20, 20)
      
      doc.setFontSize(14)
      doc.setTextColor(0, 0, 0)
      doc.text(`Report: ${reportName}`, 20, 35)
      doc.setFontSize(10)
      doc.text(`Data generazione: ${new Date().toLocaleDateString()}`, 20, 42)
      
      // Content
      doc.line(20, 45, 190, 45)
      doc.setFontSize(12)
      doc.text('Sommario dei dati', 20, 60)
      
      doc.setFontSize(10)
      doc.text('- Totale iscritti: 1,248', 20, 70)
      doc.text('- Corsi attivi: 12', 20, 78)
      doc.text('- Ricavi del periodo: € 14.500,00', 20, 86)
      
      doc.text('Questo è un report generato automaticamente dalla piattaforma SkillForge.', 20, 120)
      
      // Footer
      doc.setFontSize(8)
      doc.setTextColor(150, 150, 150)
      doc.text('SkillForge - Piattaforma B2B per la formazione', 20, 280)
      
      doc.save(`SkillForge_Report_${reportName.replace(/\s+/g, '_')}.pdf`)
      addToast('PDF generato e scaricato con successo', 'success')
    } catch (error) {
      console.error(error)
      addToast('Errore durante la generazione del PDF', 'error')
    } finally {
      setIsGenerating(false)
    }
  }

  const reportsList = [
    { id: 1, name: 'Riepilogo Vendite Mensile', type: 'Finanziario', date: 'Ultimi 30 giorni' },
    { id: 2, name: 'Performance Corsi', type: 'Analitica', date: 'Ultimi 30 giorni' },
    { id: 3, name: 'Engagement Studenti', type: 'Analitica', date: 'Ultimi 7 giorni' },
    { id: 4, name: 'Fatturato Annuale', type: 'Finanziario', date: 'Anno corrente' },
  ]

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Report PDF</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Genera ed esporta i report della tua piattaforma.</p>
        </div>
        <button className="btn btn-secondary" onClick={() => addToast('Filtri non attivi in demo', 'info')}>
          <Filter size={18} /> Filtra
        </button>
      </div>

      <div className="card table-container" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr>
              <th>Nome Report</th>
              <th>Categoria</th>
              <th>Periodo</th>
              <th style={{ textAlign: 'right' }}>Azione</th>
            </tr>
          </thead>
          <tbody>
            {reportsList.map(report => (
              <tr key={report.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <FileText size={20} color="var(--accent)" />
                    <span style={{ fontWeight: 500 }}>{report.name}</span>
                  </div>
                </td>
                <td>
                  <span className="badge" style={{ backgroundColor: 'var(--bg-surface-hover)', color: 'var(--text-primary)' }}>
                    {report.type}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    <Calendar size={14} /> {report.date}
                  </div>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => generatePDF(report.name)}
                    disabled={isGenerating}
                  >
                    <Download size={16} /> Scarica PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}