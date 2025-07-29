import React from 'react';
import { Brain, Activity, GitBranch, Clock, ChevronRight } from 'lucide-react';
import { Model } from '../types';

interface ModelCardProps {
  model: Model;
  onClick: () => void;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, onClick }) => {
  const statusColors = {
    active: 'bg-blue-50 border-blue-200 text-blue-800',
    training: 'bg-orange-50 border-orange-200 text-orange-800',
    deprecated: 'bg-gray-50 border-gray-200 text-gray-800'
  };

  const statusIcons = {
    active: <Activity className="w-5 h-5" />,
    training: <GitBranch className="w-5 h-5" />,
    deprecated: <GitBranch className="w-5 h-5 opacity-50" />
  };

  return (
    <div 
      onClick={onClick}
      className={`p-6 rounded-xl border-2 shadow-lg bg-white transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer ${statusColors[model.status]}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Brain className="w-8 h-8 text-purple-600" />
          <div>
            <h3 className="font-bold text-xl text-gray-800">{model.name}</h3>
            <p className="text-sm text-gray-600">Version {model.version}</p>
          </div>
        </div>
        <ChevronRight className="w-6 h-6 text-gray-400" />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600">SLA:</span>
          <span className="font-medium">{model.sla}</span>
        </div>
        
        <p className="text-sm text-gray-600">{model.description}</p>
        
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[model.status]}`}>
            {statusIcons[model.status]}
            <span className="ml-1">{model.status.toUpperCase()}</span>
          </div>
          <span className="text-xs text-gray-500">
            {model.inputDatasets.length} input datasets
          </span>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;