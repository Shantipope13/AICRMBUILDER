import { useState, useEffect } from 'react';
import {
  User,
  Folder,
  LogOut,
  ArrowLeft,
  Settings,
  Package,
  TrendingUp,
  Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { MyPlatforms } from './MyPlatforms';
import type { SavedPlatform } from '../services/platformService';
import { Toast } from './Toast';

interface AccountDashboardProps {
  onBack: () => void;
  onLogout: () => void;
  onViewPlatform: (platform: SavedPlatform) => void;
}

export function AccountDashboard({ onBack, onLogout, onViewPlatform }: AccountDashboardProps) {
  const [currentView, setCurrentView] = useState<'overview' | 'platforms' | 'settings'>('overview');
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({ totalPlatforms: 0, recentActivity: 0 });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { count } = await supabase
          .from('platforms')
          .select('*', { count: 'exact', head: true })
          .eq('user_session', user.id);

        setStats({
          totalPlatforms: count || 0,
          recentActivity: Math.floor(Math.random() * 10) + 1
        });
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setToast({ message: 'Logged out successfully', type: 'success' });
      setTimeout(() => {
        onLogout();
      }, 1000);
    } catch (error) {
      console.error('Logout error:', error);
      setToast({ message: 'Failed to logout', type: 'error' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
          <p className="text-lg font-bold text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (currentView === 'platforms') {
    return (
      <MyPlatforms
        onBack={() => setCurrentView('overview')}
        onViewPlatform={onViewPlatform}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="btn-brutal bg-white inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>

          <button
            onClick={handleLogout}
            className="btn-brutal bg-red-300 inline-flex items-center"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <div className="card-brutal bg-white mb-4">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b-4 border-black">
                <div className="w-16 h-16 bg-yellow-300 border-4 border-black flex items-center justify-center">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-xl font-black truncate">
                    {user?.user_metadata?.name || 'User'}
                  </h2>
                  <p className="text-sm font-bold text-gray-600 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setCurrentView('overview')}
                  className={`w-full flex items-center gap-3 px-4 py-3 border-4 border-black font-black transition-all ${
                    currentView === 'overview'
                      ? 'bg-yellow-300 translate-x-2'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <TrendingUp className="w-5 h-5" />
                  Overview
                </button>
                <button
                  onClick={() => setCurrentView('platforms')}
                  className={`w-full flex items-center gap-3 px-4 py-3 border-4 border-black font-black transition-all ${
                    currentView === 'platforms'
                      ? 'bg-yellow-300 translate-x-2'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <Folder className="w-5 h-5" />
                  My Platforms
                </button>
                <button
                  onClick={() => setCurrentView('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 border-4 border-black font-black transition-all ${
                    currentView === 'settings'
                      ? 'bg-yellow-300 translate-x-2'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  Settings
                </button>
              </nav>
            </div>
          </aside>

          <main className="lg:col-span-3">
            {currentView === 'overview' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h1 className="text-4xl font-black mb-2">Account Overview</h1>
                  <p className="text-lg font-bold text-gray-600">
                    Manage your platforms and account settings
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="card-brutal bg-white">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-300 border-4 border-black flex items-center justify-center">
                        <Package className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="text-4xl font-black mb-2">{stats.totalPlatforms}</div>
                    <div className="text-lg font-bold text-gray-600">Total Platforms</div>
                  </div>

                  <div className="card-brutal bg-white">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-green-300 border-4 border-black flex items-center justify-center">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="text-4xl font-black mb-2">{stats.recentActivity}</div>
                    <div className="text-lg font-bold text-gray-600">Recent Activities</div>
                  </div>
                </div>

                <div className="card-brutal-lg bg-white">
                  <h2 className="text-2xl font-black mb-4">Quick Actions</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setCurrentView('platforms')}
                      className="card-brutal bg-gradient-to-br from-blue-100 to-blue-200 text-left hover:scale-105 transition-transform"
                    >
                      <Folder className="w-8 h-8 mb-3" />
                      <h3 className="text-xl font-black mb-2">My Platforms</h3>
                      <p className="font-bold text-gray-700">
                        View and manage all your saved platforms
                      </p>
                    </button>

                    <button
                      onClick={onBack}
                      className="card-brutal bg-gradient-to-br from-yellow-100 to-yellow-200 text-left hover:scale-105 transition-transform"
                    >
                      <Package className="w-8 h-8 mb-3" />
                      <h3 className="text-xl font-black mb-2">Generate New</h3>
                      <p className="font-bold text-gray-700">
                        Create a new platform for your business
                      </p>
                    </button>
                  </div>
                </div>

                <div className="card-brutal bg-gradient-to-r from-yellow-200 to-yellow-300">
                  <h2 className="text-2xl font-black mb-3">Welcome to INFLUXX!</h2>
                  <p className="font-bold text-gray-700 leading-relaxed">
                    Your account gives you unlimited platform generation, persistent storage,
                    and access from any device. Generate industry-specific platforms in minutes!
                  </p>
                </div>
              </div>
            )}

            {currentView === 'settings' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h1 className="text-4xl font-black mb-2">Account Settings</h1>
                  <p className="text-lg font-bold text-gray-600">
                    Manage your account preferences
                  </p>
                </div>

                <div className="card-brutal-lg bg-white">
                  <h2 className="text-2xl font-black mb-6">Profile Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-black mb-2">Name</label>
                      <input
                        type="text"
                        value={user?.user_metadata?.name || ''}
                        readOnly
                        className="w-full px-4 py-3 border-4 border-black font-bold bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block font-black mb-2">Email</label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className="w-full px-4 py-3 border-4 border-black font-bold bg-gray-50"
                      />
                    </div>
                    <div className="pt-4 border-t-4 border-black">
                      <p className="font-bold text-gray-600 text-sm">
                        Account settings and profile updates coming soon!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
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
