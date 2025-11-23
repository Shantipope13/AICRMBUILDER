import { useState } from 'react';
import { Mail, Lock, User, Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Toast } from './Toast';

interface AuthFormProps {
  onSuccess: () => void;
  onBack: () => void;
}

export function AuthForm({ onSuccess, onBack }: AuthFormProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            },
          },
        });

        if (error) throw error;

        if (data.user) {
          setToast({ message: 'Account created successfully!', type: 'success' });
          setTimeout(() => {
            onSuccess();
          }, 1000);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          setToast({ message: 'Logged in successfully!', type: 'success' });
          setTimeout(() => {
            onSuccess();
          }, 1000);
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setToast({
        message: error.message || 'Authentication failed. Please try again.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setToast(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="btn-brutal bg-white mb-6 inline-flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>

        <div className="card-brutal-lg bg-white">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-yellow-300 border-4 border-black flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-lg font-bold text-gray-600">
              {mode === 'login'
                ? 'Sign in to access your platforms'
                : 'Sign up to save and manage platforms'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block font-black mb-2">Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="w-full pl-12 pr-4 py-3 border-4 border-black font-bold focus:outline-none focus:border-yellow-300"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block font-black mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-12 pr-4 py-3 border-4 border-black font-bold focus:outline-none focus:border-yellow-300"
                />
              </div>
            </div>

            <div>
              <label className="block font-black mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full pl-12 pr-4 py-3 border-4 border-black font-bold focus:outline-none focus:border-yellow-300"
                />
              </div>
              {mode === 'signup' && (
                <p className="text-sm font-bold text-gray-600 mt-2">
                  Must be at least 6 characters
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-brutal bg-yellow-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 inline mr-2 animate-spin" />
                  {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                <>{mode === 'login' ? 'Sign In' : 'Create Account'}</>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t-4 border-black text-center">
            <p className="font-bold text-gray-600">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            </p>
            <button
              onClick={switchMode}
              className="mt-2 font-black text-lg hover:text-yellow-600 transition-colors"
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>

        <div className="mt-6 card-brutal bg-blue-100">
          <p className="font-bold text-sm text-gray-700 leading-relaxed">
            <strong className="font-black">Note:</strong> Your account allows you to save and manage
            multiple platforms, access them from any device, and keep your work secure.
          </p>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
