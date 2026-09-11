import { useEffect, useState, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: string;
}

export function Modal({ open, onClose, title, children, maxWidth = 'max-w-2xl' }: ModalProps) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setShow(true);
      document.body.style.overflow = 'hidden';
    } else {
      const t = setTimeout(() => setShow(false), 300);
      document.body.style.overflow = '';
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!show && !open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        ref={ref}
        className={`relative ${maxWidth} w-full max-h-[85vh] overflow-y-auto glass-card p-6 ${open ? 'animate-scale-in' : 'opacity-0'}`}
      >
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-smooth hover:bg-white/10"
              style={{ color: 'var(--text-secondary)' }}
            >
              <X size={20} />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
