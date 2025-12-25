import { AlertTriangle, X, Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NetworkErrorBannerProps {
  isOpen?: boolean;
  message: string;
  backendUrl: string;
  onClose: () => void;
}

export function NetworkErrorBanner({ isOpen = true, message, backendUrl, onClose }: NetworkErrorBannerProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    // Don't auto-close network errors - user needs to see them
  }, [isOpen]);

  if (!isOpen) return null;

  const command = `php artisan serve --host=0.0.0.0 --port=8000`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] animate-in slide-in-from-top-5 duration-300 max-w-4xl w-full px-4">
      <div className="bg-red-50 border-2 border-red-500 rounded-2xl shadow-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-7 h-7 text-white" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-['Poppins'] text-red-900 font-bold text-lg mb-2">
              Backend Connection Failed
            </h3>
            
            <p className="font-['Poppins'] text-red-800 mb-4 whitespace-pre-line">
              {message}
            </p>

            <div className="bg-white rounded-xl p-4 mb-4 border border-red-200">
              <p className="font-['Poppins'] text-sm text-gray-700 mb-2 font-semibold">
                Quick Fix - Run this command in your backend terminal:
              </p>
              <div className="flex items-center gap-2 bg-gray-900 rounded-lg p-3">
                <code className="font-mono text-green-400 flex-1 text-sm">
                  {command}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-white text-sm font-['Poppins'] transition-colors flex items-center gap-2"
                  title="Copy command"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
              <p className="font-['Poppins'] text-sm text-blue-900">
                <strong>Backend URL:</strong> <code className="bg-blue-100 px-2 py-0.5 rounded">{backendUrl}</code>
              </p>
              <p className="font-['Poppins'] text-xs text-blue-800 mt-1">
                Make sure your backend is running and accessible at this address.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-100 transition-colors flex-shrink-0"
            title="Dismiss"
          >
            <X className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
