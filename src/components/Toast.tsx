import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastComponentProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

export interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

function ToastComponent({ toast, onClose }: ToastComponentProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = toast.duration || 5000;
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onClose(toast.id), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  const icons = {
    success: CheckCircle2,
    error: XCircle,
    info: Info
  };

  const colors = {
    success: 'bg-green-300',
    error: 'bg-red-300',
    info: 'bg-blue-300'
  };

  const Icon = icons[toast.type];

  return (
    <div
      className={`card-brutal ${colors[toast.type]} mb-3 flex items-start gap-3 animate-slide-in ${
        isExiting ? 'opacity-0' : ''
      } transition-opacity duration-300`}
    >
      <div className="w-6 h-6 flex-shrink-0 mt-0.5">
        <Icon className="w-full h-full" />
      </div>
      <div className="flex-1 font-bold">{toast.message}</div>
      <button
        onClick={() => {
          setIsExiting(true);
          setTimeout(() => onClose(toast.id), 300);
        }}
        className="w-6 h-6 flex items-center justify-center hover:bg-black hover:bg-opacity-10"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[10000] w-96 max-w-[calc(100vw-2rem)]">
      {toasts.map(toast => (
        <ToastComponent key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
}

export function Toast({ message, type, onClose }: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onClose(), 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: CheckCircle2,
    error: XCircle
  };

  const colors = {
    success: 'bg-green-300',
    error: 'bg-red-300'
  };

  const Icon = icons[type];

  return (
    <div
      className={`fixed top-4 right-4 z-[10000] card-brutal ${colors[type]} flex items-start gap-3 animate-slide-in ${
        isExiting ? 'opacity-0' : ''
      } transition-opacity duration-300 max-w-md`}
    >
      <div className="w-6 h-6 flex-shrink-0 mt-0.5">
        <Icon className="w-full h-full" />
      </div>
      <div className="flex-1 font-bold">{message}</div>
      <button
        onClick={() => {
          setIsExiting(true);
          setTimeout(() => onClose(), 300);
        }}
        className="w-6 h-6 flex items-center justify-center hover:bg-black hover:bg-opacity-10"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function createToast(type: ToastType, message: string, duration?: number): ToastMessage {
  return {
    id: `toast_${Date.now()}_${Math.random()}`,
    type,
    message,
    duration
  };
}
