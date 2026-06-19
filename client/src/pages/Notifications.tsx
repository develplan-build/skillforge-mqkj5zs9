import React, { useState } from 'react'
import { Bell, Check, Trash2, Info, AlertCircle, CheckCircle } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: 'info' | 'warning' | 'success'
}

export default function Notifications() {
  const { addToast } = useOutletContext<{ addToast: (msg: string, type?: 'success'|'error'|'info') => void }>()
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Nuovo iscritto', message: 'Mario Rossi si è iscritto al corso React Avanzato.', time: '10 min fa', read: false, type: 'success' },
    { id: '2', title: 'Fattura pagata', message: 'La fattura FATT-2023-001 è stata saldata.', time: '1 ora fa', read: false, type: 'success' },
    { id: '3', title: 'Aggiornamento sistema', message: 'Manutenzione programmata per stanotte alle 02:00.', time: '3 ore fa', read: true, type: 'info' },
    { id: '4', title: 'Spazio in esaurimento', message: 'Hai utilizzato l\'80% dello spazio di archiviazione.', time: '1 giorno fa', read: true, type: 'warning' },
  ])

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
    addToast('Tutte le notifiche segnate come lette', 'success')
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
    addToast('Notifica eliminata', 'info')
  }

  const getIcon = (type: Notification['type']) => {
    switch(type) {
      case 'info': return <Info size={20} color="var(--info, #3b82f6)" />
      case 'warning': return <AlertCircle size={20} color="var(--warning, #f59e0b)" />
      case 'success': return <CheckCircle size={20} color="var(--success, #10b981)" />
    }
  }

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Notifiche</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Rimani aggiornato sulle attività della piattaforma.</p>
        </div>
        <button className="btn btn-secondary" onClick={markAllAsRead}>
          <Check size={18} /> Segna tutte come lette
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="empty-state">
          <Bell className="empty-state-icon" />
          <h3 style={{ marginBottom: '8px' }}>Nessuna notifica</h3>
          <p style={{ marginBottom: '24px', maxWidth: '400px' }}>
            Non hai nuove notifiche al momento.
          </p>
        </div>
      ) : (
        <div className="card" style={{ padding: 0 }}>
          {notifications.map((notif, index) => (
            <div 
              key={notif.id} 
              style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '16px', 
                padding: '20px', 
                borderBottom: index !== notifications.length - 1 ? '1px solid var(--border)' : 'none',
                backgroundColor: notif.read ? 'transparent' : 'rgba(var(--accent-rgb, 251, 0, 255), 0.05)'
              }}
            >
              <div style={{ marginTop: '2px' }}>
                {getIcon(notif.type)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <h4 style={{ margin: 0, fontWeight: notif.read ? 500 : 600 }}>{notif.title}</h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{notif.time}</span>
                </div>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{notif.message}</p>
              </div>
              <button 
                className="icon-btn text-danger"
                onClick={() => deleteNotification(notif.id)}
                title="Elimina notifica"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
