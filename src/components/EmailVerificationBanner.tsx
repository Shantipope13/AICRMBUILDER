import { useState } from 'react';
import { Mail, X, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Toast } from './Toast';

interface EmailVerificationBannerProps {
  onDismiss: () => void;
}

export function EmailVerificationBanner({ onDismiss }: EmailVerificationBannerProps) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSendVerification = async () => {
    setSending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: (await supabase.auth.getUser()).data.user?.email || '',
      });

      if (error) throw error;

      setSent(true);
      setToast({ message: 'Verification email sent!', type: 'success' });
    } catch (error: any) {
      console.error('Failed to send verification email:', error);
      setToast({ message: 'Failed to send email. Please try again.', type: 'error' });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="bg-blue-100 border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-blue-300 border-4 border-black flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-black text-sm md:text-base">
                  {sent ? 'Verification email sent!' : 'Verify your email to send emails and automations'}
                </p>
                <p className="text-xs md:text-sm font-bold text-gray-700">
                  {sent
                    ? 'Check your inbox and click the verification link'
                    : 'Required when sending emails to customers or activating email automations'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!sent && (
                <button
                  onClick={handleSendVerification}
                  disabled={sending}
                  className="btn-brutal bg-black text-white text-sm px-4 py-2 disabled:opacity-50"
                >
                  {sending ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 inline mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Verify Now'
                  )}
                </button>
              )}
              <button
                onClick={onDismiss}
                className="w-8 h-8 border-2 border-black bg-white hover:bg-gray-100 flex items-center justify-center flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </>
  );
}
