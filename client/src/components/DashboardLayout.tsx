import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, Users, UserSquare2, BookOpen, 
  FileText, Receipt, Folder, Bell, BarChart3, 
  Settings, LogOut, Menu, X, Search, User
} from 'lucide-react'
import { HAS_BACKEND } from '../config'
import Toast, { ToastMessage } from './Toast'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { path: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/app/users', icon: Users, label: 'Gestione Utenti' },
    { path: '/app/crm', icon: UserSquare2, label: 'CRM Clienti' },
    { path: '/app/courses', icon: BookOpen, label: 'Corsi' },
    { path: '/app/reports', icon: FileText, label: 'Report PDF' },
    { path: '/app/invoices', icon: Receipt, label: 'Fatturazione' },
    { path: '/app/documents', icon: Folder, label: 'Documenti' },
    { path: '/app/notifications', icon: Bell, label: 'Notifiche' },
    { path: '/app/advanced-reports', icon: BarChart3, label: 'Report Avanzati' },
  ]

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts(prev => [...prev, { id, type, message }])
    setTimeout(() => removeToast(id), 3000)
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  // Passiamo addToast a tutte le rotte figlie tramite context
  return (
    <div className="app-layout">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="modal-overlay" 
          style={{ zIndex: 35 }} 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <BookOpen className="sidebar-logo-icon" size={28} />
          <span className="sidebar-title">SkillForge</span>
          <button className="icon-btn mobile-menu-btn" onClick={() => setSidebarOpen(false)} style={{ marginLeft: 'auto' }}>
            <X size={20} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <div 
                key={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  navigate(item.path)
                  setSidebarOpen(false)
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </div>
            )
          })}
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)' }}>
          <div 
            className={`nav-item ${location.pathname === '/app/settings' ? 'active' : ''}`}
            onClick={() => { navigate('/app/settings'); setSidebarOpen(false); }}
          >
            <Settings size={20} />
            <span>Impostazioni</span>
          </div>
          <div 
            className="nav-item"
            onClick={() => navigate('/')}
            style={{ color: 'var(--danger)' }}
          >
            <LogOut size={20} />
            <span>Esci</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {!HAS_BACKEND && (
          <div className="demo-banner">
            <Info size={16} />
            <span>Modalità Demo: i dati sono salvati localmente. Configura il backend per attivare database e pagamenti reali.</span>
          </div>
        )}

        <header className="top-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="icon-btn mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="header-title">
              {navItems.find(i => i.path === location.pathname)?.label || 
               (location.pathname === '/app/settings' ? 'Impostazioni' : 
                location.pathname === '/app/profile' ? 'Profilo' : '')}
            </h1>
          </div>

          <div className="header-actions">
            <div style={{ position: 'relative', display: 'none' }} className="desktop-search">
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input type="text" placeholder="Cerca..." style={{ paddingLeft: '36px', width: '200px', borderRadius: '999px' }} />
            </div>
            
            <button className="icon-btn" onClick={() => navigate('/app/notifications')}>
              <Bell size={20} />
            </button>

            <div style={{ position: 'relative' }}>
              <button 
                className="icon-btn" 
                style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <User size={20} />
              </button>

              {showProfileMenu && (
                <div 
                  style={{ 
                    position: 'absolute', top: '100%', right: 0, marginTop: '8px', 
                    backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)',
                    width: '200px', zIndex: 50, overflow: 'hidden'
                  }}
                >
                  <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ fontWeight: 600 }}>Admin Demo</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>admin@skillforge.com</div>
                  </div>
                  <div 
                    className="nav-item" 
                    style={{ borderRadius: 0, padding: '12px 16px' }}
                    onClick={() => { navigate('/app/profile'); setShowProfileMenu(false); }}
                  >
                    <User size={16} /> Profilo
                  </div>
                  <div 
                    className="nav-item" 
                    style={{ borderRadius: 0, padding: '12px 16px' }}
                    onClick={() => { navigate('/app/settings'); setShowProfileMenu(false); }}
                  >
                    <Settings size={16} /> Impostazioni
                  </div>
                  <div 
                    className="nav-item" 
                    style={{ borderRadius: 0, padding: '12px 16px', color: 'var(--danger)' }}
                    onClick={() => navigate('/')}
                  >
                    <LogOut size={16} /> Esci
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="page-container">
          <Outlet context={{ addToast }} />
        </div>
      </main>

      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  )
}

// Hook helper per usare i toast nelle pagine
export function useToast() {
  return React.useContext(React.createContext<{addToast: (msg: string, type?: 'success'|'error'|'info') => void}>({ addToast: () => {} }))
}