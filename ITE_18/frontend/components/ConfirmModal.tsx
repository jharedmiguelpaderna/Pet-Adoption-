import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen?: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning';
}

export function ConfirmModal({
  isOpen = true,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  type = 'danger'
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const bgColor = type === 'danger' ? 'bg-red-500' : 'bg-yellow-500';
  const hoverColor = type === 'danger' ? 'hover:bg-red-600' : 'hover:bg-yellow-600';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[1000]">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center`}>
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h2 className="font-['Poppins'] text-2xl text-black">{title}</h2>
          </div>
          <button
            onClick={onCancel}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          <p className="font-['Poppins'] text-gray-700 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="px-8 py-6 bg-gray-50 rounded-b-3xl flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-['Poppins'] hover:bg-gray-300 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 ${bgColor} ${hoverColor} text-white py-3 rounded-xl font-['Poppins'] transition-colors`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}