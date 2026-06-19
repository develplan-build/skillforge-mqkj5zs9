import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation, useOutletContext } from 'react-router-dom'
import { 
  LayoutDashboard, Users, UserSquare2, BookOpen, 
  FileText, Receipt, Folder, Bell, BarChart3, 
  Settings, LogOut, Menu, X, Search, User, Info
} from 'lucide-react'
import { HAS_BACKEND } from '../config'
import Toast, { ToastMessage } from './Toast'

export type ToastContextType = {
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void
}

export function useToast() {
  return useOutletContext<ToastContextType>()
}

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

  return (
    <div className="app-layout">
      {sidebarOpen && (
        <div 
          className="modal-overlay" 
          style={{ zIndex: 35 }} 
          onClick={() => setSidebarOpen(false)}
        />
      )}

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

        <div className="sidebar-footer">
          <div className="nav-item" onClick={() => navigate('/app/settings')}>
            <Settings size={20} />
            <span>Impostazioni</span>
          </div>
          <div className="nav-item" onClick={() => navigate('/')}>
            <LogOut size={20} />
            <span>Esci</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        {!HAS_BACKEND && (
          <div className="demo-banner">
            <Info size={16} />
            <span>Modalità demo - i dati sono locali. Configura il backend per attivare le funzionalità complete.</span>
          </div>
        )}

        <header className="header">
          <div className="header-left">
            <button className="icon-btn mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="search-bar">
              <Search size={18} color="var(--text-secondary)" />
              <input type="text" placeholder="Cerca..." />
            </div>
          </div>

          <div className="header-right">
            <button className="icon-btn" onClick={() => navigate('/app/notifications')}>
              <Bell size={20} />
              <span className="badge">3</span>
            </button>
            
            <div className="profile-menu-container">
              <button 
                className="profile-btn" 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="avatar">
                  <User size={20} />
                </div>
                <span className="profile-name">Admin</span>
              </button>

              {showProfileMenu && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <strong>Admin User</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>admin@skillforge.com</span>
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item" onClick={() => { navigate('/app/settings'); setShowProfileMenu(false); }}>
                    <User size={16} /> Profilo
                  </div>
                  <div className="dropdown-item" onClick={() => { navigate('/app/settings'); setShowProfileMenu(false); }}>
                    <Settings size={16} /> Impostazioni
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item text-danger" onClick={() => navigate('/')}>
                    <LogOut size={16} /> Esci
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="content-area">
          <Outlet context={{ addToast } satisfies ToastContextType} />
        </div>
      </main>

      <div className="toast-container">
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            message={toast.message} 
            type={toast.type} 
            onClose={() => removeToast(toast.id)} 
          />
        ))}
      </div>
    </div>
  )
}
