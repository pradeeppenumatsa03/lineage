import React, { useState } from 'react';
import { Database, Clock, HardDrive, CheckCircle, AlertTriangle, XCircle, Brain } from 'lucide-react';
import { Dataset } from '../types';

interface DatasetCardProps {
  dataset: Dataset;
  position: { x: number; y: number };
  onSourceModelClick?: (modelId: string) => void;
}

const DatasetCard: React.FC<DatasetCardProps> = ({ dataset, position, onSourceModelClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Different colors for raw data vs model outputs
  const getBlockColors = () => {
    if (dataset.sourceType === 'model_output') {
      return {
        healthy: 'bg-purple-500 border-purple-600',
        warning: 'bg-purple-400 border-purple-500',
        error: 'bg-purple-600 border-purple-700'
      };
    } else {
      return {
        healthy: 'bg-green-500 border-green-600',
        warning: 'bg-yellow-500 border-yellow-600',
        error: 'bg-red-500 border-red-600'
      };
    }
  };

  const blockColors = getBlockColors();

  const statusIcons = {
    healthy: <CheckCircle className="w-4 h-4" />,
    warning: <AlertTriangle className="w-4 h-4" />,
    error: <XCircle className="w-4 h-4" />
  };

  const hoverStatusColors = {
    healthy: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800'
  };

  return (
    <div 
      className="absolute"
      style={{ left: position.x, top: position.y }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Simple Block */}
      <div 
        className={`w-48 h-16 rounded-lg border-2 shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer flex items-center justify-center ${blockColors[dataset.status]}`}
      >
        <div className="flex items-center gap-2 text-white">
          {dataset.sourceType === 'model_output' ? (
            <Brain className="w-5 h-5" />
          ) : (
            <Database className="w-5 h-5" />
          )}
          <span className="font-semibold text-sm truncate max-w-32">{dataset.name}</span>
        </div>
      </div>

      {/* Hover Information Panel */}
      {isHovered && (
        <div 
          className={`absolute top-20 left-0 w-80 p-4 rounded-lg border-2 shadow-xl bg-white z-50 transition-all duration-200 ${hoverStatusColors[dataset.status]}`}
        >
          <div className="flex items-center gap-3 mb-3">
            {dataset.sourceType === 'model_output' ? (
              <Brain className="w-6 h-6 text-purple-600" />
            ) : (
              <Database className="w-6 h-6 text-blue-600" />
            )}
            <h3 className="font-semibold text-lg text-gray-800">{dataset.name}</h3>
            {statusIcons[dataset.status]}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">SLA:</span>
              <span className="font-medium">{dataset.sla}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <HardDrive className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">Partitions:</span>
              <span className="font-medium">{dataset.partitions}</span>
            </div>
            
            {dataset.sourceType === 'model_output' && dataset.sourceModelId && (
              <div className="flex items-center gap-2 text-sm">
                <Brain className="w-4 h-4 text-purple-500" />
                <span className="text-gray-600">Source Model:</span>
                <button
                  onClick={() => onSourceModelClick?.(dataset.sourceModelId!)}
                  className="font-medium text-purple-600 hover:text-purple-800 underline capitalize"
                >
                  {dataset.sourceModelId?.replace(/-/g, ' ')}
                </button>
              </div>
            )}
            
            <div className="text-xs text-gray-500 mt-2">
              Last updated: {dataset.lastUpdated}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatasetCard;