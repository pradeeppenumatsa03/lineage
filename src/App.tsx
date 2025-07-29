import React, { useState } from 'react';
import Header from './components/Header';
import StatsPanel from './components/StatsPanel';
import LineageVisualization from './components/LineageVisualization';
import ModelList from './components/ModelList';
import { mockModels, getModelLineage } from './data/mockData';
import { Model, ModelLineage } from './types';

function App() {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [currentLineage, setCurrentLineage] = useState<ModelLineage | null>(null);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());

  const handleModelSelect = (model: Model) => {
    setSelectedModel(model);
    setCurrentLineage(getModelLineage(model.id));
  };

  const handleBackToModels = () => {
    setSelectedModel(null);
    setCurrentLineage(null);
  };

  const handleSourceModelClick = (modelId: string) => {
    const sourceModel = mockModels.find(m => m.id === modelId);
    if (sourceModel) {
      handleModelSelect(sourceModel);
    }
  };

  const handleRefresh = () => {
    setLastUpdated(new Date().toLocaleString());
    if (selectedModel) {
      setCurrentLineage(getModelLineage(selectedModel.id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onRefresh={handleRefresh} 
        lastUpdated={lastUpdated}
        selectedModel={selectedModel?.name}
        onBack={selectedModel ? handleBackToModels : undefined}
      />
      
      <main>
        {!selectedModel ? (
          <ModelList 
            models={mockModels}
            onModelSelect={handleModelSelect}
          />
        ) : currentLineage ? (
          <div className="container mx-auto px-6 py-8">
            <StatsPanel lineage={currentLineage} />
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Data Lineage Flow</h2>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-gray-600">Raw Data (Healthy)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-600">Model Output</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-600">Warning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-gray-600">Error</span>
                  </div>
                </div>
              </div>
              
              <div className="relative overflow-auto" style={{ height: `${Math.max(800, currentLineage.datasets.length * 80 + 200)}px` }}>
                <LineageVisualization 
                  lineage={currentLineage}
                  onSourceModelClick={handleSourceModelClick}
                />
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default App;