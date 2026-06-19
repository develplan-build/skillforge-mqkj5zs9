import React, { useEffect } from 'react'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastMessage {
  id: string
  type: ToastType
  message: string
}

interface ToastProps {
  toasts: ToastMessage[]
  removeToast: (id: string) => void
}

export default function Toast({ toasts, removeToast }: ToastProps) {
  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className="toast" style={{ borderLeftColor: toast.type === 'success' ? 'var(--success)' : toast.type === 'error' ? 'var(--danger)' : 'var(--info)' }}>
          {toast.type === 'success' && <CheckCircle size={20} color="var(--success)" />}
          {toast.type === 'error' && <AlertCircle size={20} color="var(--danger)" />}
          {toast.type === 'info' && <Info size={20} color="var(--info)" />}
          <span style={{ flex: 1, fontSize: '0.875rem', fontWeight: 500 }}>{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} className="icon-btn" style={{ padding: '4px' }}>
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}