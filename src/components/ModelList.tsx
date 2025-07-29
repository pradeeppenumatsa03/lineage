import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ModelCard from './ModelCard';
import { Model } from '../types';

interface ModelListProps {
  models: Model[];
  onModelSelect: (model: Model) => void;
}

const ModelList: React.FC<ModelListProps> = ({ models, onModelSelect }) => {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Model Portfolio</h2>
        <p className="text-gray-600">Select a model to view its data lineage and dependencies</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <ModelCard
            key={model.id}
            model={model}
            onClick={() => onModelSelect(model)}
          />
        ))}
      </div>
    </div>
  );
};

export default ModelList;