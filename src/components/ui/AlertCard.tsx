import { AlertTriangle, TrendingDown } from 'lucide-react';

interface AlertCardProps {
  type: 'collection' | 'sales';
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
}

export function AlertCard({ type, title, message, actionText, onAction }: AlertCardProps) {
  const isCollection = type === 'collection';
  const Icon = isCollection ? AlertTriangle : TrendingDown;
  
  return (
    <div className={`rounded-xl p-4 border flex items-start space-x-4
      ${isCollection ? 'bg-rose-500/10 border-rose-500/20' : 'bg-amber-500/10 border-amber-500/20'}
    `}>
      <div className={`p-2 rounded-lg ${isCollection ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <h4 className={`font-semibold mb-1 ${isCollection ? 'text-rose-400' : 'text-amber-400'}`}>
          {title}
        </h4>
        <p className="text-slate-300 text-sm mb-3">{message}</p>
        {actionText && (
          <button 
            onClick={onAction}
            className={`text-sm font-medium hover:underline ${isCollection ? 'text-rose-400' : 'text-amber-400'}`}
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
}
