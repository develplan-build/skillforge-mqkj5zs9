import React, { useEffect } from 'react'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastMessage {
  id: string
  type: ToastType
  message: string
}

interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
}

export default function Toast({ message, type, onClose }: ToastProps) {
  return (
    <div className="toast" style={{ borderLeftColor: type === 'success' ? 'var(--success, #10b981)' : type === 'error' ? 'var(--danger, #ef4444)' : 'var(--info, #3b82f6)' }}>
      {type === 'success' && <CheckCircle size={20} color="var(--success, #10b981)" />}
      {type === 'error' && <AlertCircle size={20} color="var(--danger, #ef4444)" />}
      {type === 'info' && <Info size={20} color="var(--info, #3b82f6)" />}
      <span style={{ flex: 1, fontSize: '0.875rem', fontWeight: 500 }}>{message}</span>
      <button onClick={onClose} className="icon-btn" style={{ padding: '4px' }}>
        <X size={16} />
      </button>
    </div>
  )
}
