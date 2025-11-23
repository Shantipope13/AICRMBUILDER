import { useState, useEffect } from 'react';
import {
  Folder,
  Trash2,
  Eye,
  Calendar,
  Sparkles,
  ArrowLeft,
  Loader2,
  Package
} from 'lucide-react';
import { getUserPlatforms, deletePlatform, type SavedPlatform } from '../services/platformService';
import { Toast } from './Toast';

interface MyPlatformsProps {
  onBack: () => void;
  onViewPlatform: (platform: SavedPlatform) => void;
}

export function MyPlatforms({ onBack, onViewPlatform }: MyPlatformsProps) {
  const [platforms, setPlatforms] = useState<SavedPlatform[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadPlatforms();
  }, []);

  const loadPlatforms = async () => {
    setLoading(true);
    try {
      const { data, error } = await getUserPlatforms();
      if (error) throw error;
      setPlatforms(data || []);
    } catch (err) {
      console.error('Failed to load platforms:', err);
      setToast({ message: 'Failed to load platforms', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this platform?')) return;

    try {
      const { error } = await deletePlatform(id);
      if (error) throw error;

      setPlatforms(platforms.filter(p => p.id !== id));
      setToast({ message: 'Platform deleted successfully', type: 'success' });
    } catch (err) {
      console.error('Failed to delete platform:', err);
      setToast({ message: 'Failed to delete platform', type: 'error' });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="btn-brutal bg-white mb-4 inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>

          <div className="flex items-center gap-4 mb-2">
            <div className="w-16 h-16 bg-yellow-300 border-4 border-black flex items-center justify-center">
              <Folder className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-black mb-1">My Platforms</h1>
              <p className="text-lg font-bold text-gray-600">
                View and manage your saved platforms
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
              <p className="text-lg font-bold text-gray-600">Loading your platforms...</p>
            </div>
          </div>
        ) : platforms.length === 0 ? (
          <div className="card-brutal-lg bg-white text-center py-16">
            <Package className="w-20 h-20 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-black mb-2">No Platforms Yet</h2>
            <p className="text-lg font-bold text-gray-600 mb-6">
              Create your first platform to get started!
            </p>
            <button onClick={onBack} className="btn-brutal bg-yellow-300">
              <Sparkles className="w-4 h-4 inline mr-2" />
              Generate Platform
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform, index) => (
              <div
                key={platform.id}
                className="card-brutal bg-white hover:scale-105 transition-transform animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="tag-brutal bg-yellow-200 text-xs mb-2 inline-block">
                      {platform.industry_type.replace('-', ' ').toUpperCase()}
                    </div>
                    <h3 className="text-xl font-black mb-1 truncate">
                      {platform.business_name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {formatDate(platform.created_at)}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                    <Package className="w-4 h-4" />
                    {platform.features?.crmFields?.length || 0} fields,{' '}
                    {platform.features?.pipelineStages?.length || 0} stages
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onViewPlatform(platform)}
                    className="btn-brutal bg-blue-300 flex-1"
                  >
                    <Eye className="w-4 h-4 inline mr-2" />
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(platform.id)}
                    className="btn-brutal bg-red-300 px-4"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 card-brutal bg-gradient-to-r from-blue-100 to-blue-200">
          <div className="flex items-start gap-4">
            <Sparkles className="w-8 h-8 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-black mb-2">Platform Analytics Coming Soon!</h3>
              <p className="font-bold text-gray-700">
                Track usage, ROI metrics, and team performance across all your platforms.
              </p>
            </div>
          </div>
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
