import React from 'react';
import { ModelLineage } from '../types';
import { TrendingUp, AlertTriangle, CheckCircle, Database, Brain, Clock } from 'lucide-react';

interface StatsPanelProps {
  lineage: ModelLineage;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ lineage }) => {
  const { model, datasets, sourceModels } = lineage;
  const healthyCount = datasets.filter(d => d.status === 'healthy').length;
  const warningCount = datasets.filter(d => d.status === 'warning').length;
  const errorCount = datasets.filter(d => d.status === 'error').length;
  const totalPartitions = datasets.reduce((sum, d) => sum + d.partitions, 0);
  const modelOutputCount = datasets.filter(d => d.sourceType === 'model_output').length;
  const rawDataCount = datasets.filter(d => d.sourceType === 'raw').length;

  const stats = [
    {
      label: 'Total Datasets',
      value: datasets.length,
      icon: <Database className="w-5 h-5" />,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      label: 'Raw Data Sources',
      value: rawDataCount,
      icon: <Database className="w-5 h-5" />,
      color: 'text-green-600 bg-green-50'
    },
    {
      label: 'Model Outputs',
      value: modelOutputCount,
      icon: <Brain className="w-5 h-5" />,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      label: 'Healthy',
      value: healthyCount,
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      label: 'Warnings',
      value: warningCount,
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      label: 'Total Partitions',
      value: totalPartitions,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-indigo-600 bg-indigo-50'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      {/* Model Information Section */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-4 mb-3">
          <Brain className="w-8 h-8 text-purple-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{model.name}</h2>
            <p className="text-sm text-gray-600">Version {model.version}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            model.status === 'active' ? 'bg-blue-100 text-blue-800' :
            model.status === 'training' ? 'bg-orange-100 text-orange-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {model.status.toUpperCase()}
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">SLA:</span>
          <span className="text-sm font-medium text-gray-800">{model.sla}</span>
        </div>
        
        <p className="text-sm text-gray-700">{model.description}</p>
      </div>

      {/* Statistics Grid */}
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Dataset Overview</h3>
      <div className="grid grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`p-4 rounded-lg ${stat.color}`}>
            <div className="flex items-center gap-3">
              {stat.icon}
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm font-medium">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Source Models Information */}
      {sourceModels.length > 0 && (
        <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            Dependent Source Models
          </h4>
          <div className="flex flex-wrap gap-2">
            {sourceModels.map((sourceModel) => (
              <div key={sourceModel.id} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                {sourceModel.name} v{sourceModel.version}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPanel;