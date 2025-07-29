import React from 'react';
import { GitBranch, RefreshCw, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  lastUpdated: string;
  selectedModel?: string;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onRefresh, lastUpdated, selectedModel, onBack }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {selectedModel && onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Models
            </button>
          )}
          <GitBranch className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {selectedModel ? `${selectedModel} - Lineage` : 'Model Lineage Dashboard'}
            </h1>
            <p className="text-sm text-gray-600">
              {selectedModel ? 'Data flow visualization and dependencies' : 'Data flow visualization and monitoring'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Last updated: {lastUpdated}</span>
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;