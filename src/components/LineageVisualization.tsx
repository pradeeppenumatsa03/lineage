import React from 'react';
import DatasetCard from './DatasetCard';
import ModelBlock from './ModelBlock';
import ConnectionLine from './ConnectionLine';
import { ModelLineage } from '../types';

interface LineageVisualizationProps {
  lineage: ModelLineage;
  onSourceModelClick: (modelId: string) => void;
}

const LineageVisualization: React.FC<LineageVisualizationProps> = ({ lineage, onSourceModelClick }) => {
  const { model, datasets } = lineage;
  const containerWidth = 1200;
  const containerHeight = Math.max(800, datasets.length * 80 + 200);
  
  // Position datasets on the left side
  const datasetPositions = datasets.map((_, index) => ({
    x: 50,
    y: 100 + (index * 80)
  }));
  
  // Position model on the right side
  const modelPosition = { x: 750, y: Math.max(300, (datasets.length * 40) - 40) };
  
  // Calculate connection points
  const connections = datasets.map((_, index) => ({
    from: { x: datasetPositions[index].x + 192, y: datasetPositions[index].y + 32 },
    to: { x: modelPosition.x, y: modelPosition.y + 60 }
  }));

  return (
    <div className="relative w-full h-full overflow-hidden">
      <svg 
        width={containerWidth} 
        height={containerHeight} 
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        
        {connections.map((connection, index) => (
          <ConnectionLine
            key={index}
            from={connection.from}
            to={connection.to}
            animated={datasets[index].status === 'healthy'}
          />
        ))}
      </svg>
      
      <div className="relative" style={{ zIndex: 2 }}>
        {datasets.map((dataset, index) => (
          <DatasetCard
            key={dataset.id}
            dataset={dataset}
            position={datasetPositions[index]}
            onSourceModelClick={onSourceModelClick}
          />
        ))}
        
        <ModelBlock
          model={model}
          position={modelPosition}
        />
      </div>
    </div>
  );
};

export default LineageVisualization;