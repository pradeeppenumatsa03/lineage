export interface Dataset {
  id: string;
  name: string;
  sla: string;
  partitions: number;
  status: 'healthy' | 'warning' | 'error';
  lastUpdated: string;
  sourceType: 'raw' | 'model_output';
  sourceModelId?: string;
}

export interface Model {
  id: string;
  name: string;
  version: string;
  status: 'active' | 'training' | 'deprecated';
  sla: string;
  description: string;
  inputDatasets: string[];
}

export interface ModelLineage {
  model: Model;
  datasets: Dataset[];
  sourceModels: Model[];
}