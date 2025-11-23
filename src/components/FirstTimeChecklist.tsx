import { useState } from 'react';
import { X, CheckCircle2, Circle, Sparkles } from 'lucide-react';
import { updateChecklistItem } from '../services/onboardingService';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface FirstTimeChecklistProps {
  onClose: () => void;
  initialCompletedItems?: string[];
}

const defaultChecklistItems: Omit<ChecklistItem, 'completed'>[] = [
  {
    id: 'explore',
    title: 'Explore your dashboard',
    description: 'Familiarize yourself with the interface and features',
  },
  {
    id: 'add-contact',
    title: 'Add your first contact',
    description: 'Start building your database with a client or lead',
  },
  {
    id: 'customize',
    title: 'Customize your pipeline',
    description: 'Adjust stages to match your workflow',
  },
  {
    id: 'automation',
    title: 'Review your automations',
    description: 'Check the pre-configured automations working for you',
  },
  {
    id: 'team',
    title: 'Invite team members',
    description: 'Collaborate by adding your team (optional)',
  },
];

export function FirstTimeChecklist({ onClose, initialCompletedItems = [] }: FirstTimeChecklistProps) {
  const [items, setItems] = useState<ChecklistItem[]>(
    defaultChecklistItems.map(item => ({
      ...item,
      completed: initialCompletedItems.includes(item.id),
    }))
  );
  const [isMinimized, setIsMinimized] = useState(false);

  const completedCount = items.filter(item => item.completed).length;
  const progress = Math.round((completedCount / items.length) * 100);

  const handleToggle = async (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const newCompleted = !item.completed;

    setItems(prev =>
      prev.map(i => (i.id === itemId ? { ...i, completed: newCompleted } : i))
    );

    await updateChecklistItem(itemId, newCompleted);
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 btn-brutal bg-yellow-300 px-6 py-3 shadow-lg hover:scale-105 transition-transform"
      >
        <Sparkles className="w-5 h-5 inline mr-2" />
        Getting Started ({completedCount}/{items.length})
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] animate-slide-in">
      <div className="card-brutal bg-white shadow-2xl">
        <div className="flex items-center justify-between mb-4 pb-4 border-b-4 border-black">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-300 border-4 border-black flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black">Getting Started</h3>
              <p className="text-sm font-bold text-gray-600">{progress}% Complete</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsMinimized(true)}
              className="w-8 h-8 border-2 border-black hover:bg-gray-100 flex items-center justify-center"
            >
              <span className="font-black">_</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 border-2 border-black hover:bg-gray-100 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="h-3 bg-gray-200 border-2 border-black">
            <div
              className="h-full bg-yellow-300 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className={`w-full text-left p-4 border-4 border-black transition-all hover:bg-gray-50 ${
                item.completed ? 'bg-green-100' : 'bg-white'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {item.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className={`font-black mb-1 ${item.completed ? 'line-through text-gray-600' : ''}`}>
                    {item.title}
                  </h4>
                  <p className="text-sm font-bold text-gray-600">{item.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {progress === 100 && (
          <div className="mt-4 pt-4 border-t-4 border-black">
            <div className="card-brutal bg-gradient-to-r from-green-200 to-green-300 text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-2" />
              <p className="font-black text-lg">Great job!</p>
              <p className="font-bold text-sm text-gray-700">You're all set to start using your platform!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
