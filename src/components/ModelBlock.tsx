import React from 'react';
import { Brain, Activity, GitBranch } from 'lucide-react';
import { Model } from '../types';

interface ModelBlockProps {
  model: Model;
  position: { x: number; y: number };
}

const ModelBlock: React.FC<ModelBlockProps> = ({ model, position }) => {
  const statusColors = {
    active: 'bg-blue-50 border-blue-300 text-blue-800',
    training: 'bg-orange-50 border-orange-300 text-orange-800',
    deprecated: 'bg-gray-50 border-gray-300 text-gray-800'
  };

  const statusIcons = {
    active: <Activity className="w-5 h-5" />,
    training: <GitBranch className="w-5 h-5" />,
    deprecated: <GitBranch className="w-5 h-5 opacity-50" />
  };

  return (
    <div 
      className={`absolute w-80 p-6 rounded-xl border-3 shadow-2xl bg-white transition-all duration-300 hover:shadow-3xl ${statusColors[model.status]}`}
      style={{ left: position.x, top: position.y }}
    >
      <div className="flex items-center gap-4 mb-4">
        <Brain className="w-8 h-8 text-purple-600" />
        <div>
          <h2 className="font-bold text-xl text-gray-800">{model.name}</h2>
          <p className="text-sm text-gray-600">Version {model.version}</p>
        </div>
        {statusIcons[model.status]}
      </div>
      
      <div className="flex items-center gap-2">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[model.status]}`}>
          {model.status.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default ModelBlock;