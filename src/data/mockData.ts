import { Dataset, Model, ModelLineage } from '../types';

export const mockModels: Model[] = [
  {
    id: 'recommendation-engine',
    name: 'Recommendation Engine',
    version: '2.3.1',
    status: 'active',
    sla: '99.9% uptime',
    description: 'Advanced ML model for personalized product recommendations using collaborative filtering and deep learning.',
    inputDatasets: ['customer-transactions', 'product-catalog', 'user-behavior', 'inventory-data', 'external-market', 'user-segments', 'product-features', 'seasonal-trends', 'pricing-data', 'competitor-analysis', 'social-media', 'weather-data']
  },
  {
    id: 'fraud-detection',
    name: 'Fraud Detection System',
    version: '1.8.2',
    status: 'active',
    sla: '99.95% uptime',
    description: 'Real-time fraud detection model using ensemble methods and anomaly detection algorithms.',
    inputDatasets: ['transaction-logs', 'user-profiles', 'device-fingerprints', 'merchant-data']
  },
  {
    id: 'demand-forecasting',
    name: 'Demand Forecasting Model',
    version: '3.1.0',
    status: 'training',
    sla: '99.5% uptime',
    description: 'Time series forecasting model for inventory planning and supply chain optimization.',
    inputDatasets: ['sales-history', 'seasonal-patterns', 'economic-indicators']
  },
  {
    id: 'customer-segmentation',
    name: 'Customer Segmentation',
    version: '1.5.3',
    status: 'active',
    sla: '99.7% uptime',
    description: 'Unsupervised learning model for customer clustering and behavioral analysis.',
    inputDatasets: ['customer-demographics', 'purchase-history', 'engagement-metrics']
  },
  {
    id: 'price-optimization',
    name: 'Price Optimization Engine',
    version: '2.0.1',
    status: 'active',
    sla: '99.8% uptime',
    description: 'Dynamic pricing model that optimizes prices based on demand, competition, and market conditions.',
    inputDatasets: ['historical-pricing', 'competitor-prices', 'demand-elasticity']
  }
];

const createMockDatasets = (): Dataset[] => [
  {
    id: 'customer-transactions',
    name: 'Customer Transaction Data',
    sla: '99.9% uptime',
    partitions: 128,
    status: 'healthy',
    lastUpdated: '2025-01-27 14:30:00',
    sourceType: 'raw'
  },
  {
    id: 'product-catalog',
    name: 'Product Catalog Feed',
    sla: '99.5% uptime',
    partitions: 64,
    status: 'healthy',
    lastUpdated: '2025-01-27 14:25:00',
    sourceType: 'raw'
  },
  {
    id: 'user-behavior',
    name: 'User Behavior Analytics',
    sla: '99.7% uptime',
    partitions: 256,
    status: 'warning',
    lastUpdated: '2025-01-27 13:45:00',
    sourceType: 'raw'
  },
  {
    id: 'inventory-data',
    name: 'Inventory Management System',
    sla: '99.9% uptime',
    partitions: 32,
    status: 'healthy',
    lastUpdated: '2025-01-27 14:20:00',
    sourceType: 'raw'
  },
  {
    id: 'external-market',
    name: 'External Market Data',
    sla: '98.5% uptime',
    partitions: 16,
    status: 'error',
    lastUpdated: '2025-01-27 12:15:00',
    sourceType: 'raw'
  },
  {
    id: 'user-segments',
    name: 'Customer Segmentation Output',
    sla: '99.7% uptime',
    partitions: 8,
    status: 'healthy',
    lastUpdated: '2025-01-27 14:10:00',
    sourceType: 'model_output',
    sourceModelId: 'customer-segmentation'
  },
  {
    id: 'product-features',
    name: 'Product Feature Engineering',
    sla: '99.6% uptime',
    partitions: 48,
    status: 'healthy',
    lastUpdated: '2025-01-27 14:15:00',
    sourceType: 'raw'
  },
  {
    id: 'seasonal-trends',
    name: 'Seasonal Trend Analysis',
    sla: '99.4% uptime',
    partitions: 24,
    status: 'healthy',
    lastUpdated: '2025-01-27 13:50:00',
    sourceType: 'raw'
  },
  {
    id: 'pricing-data',
    name: 'Dynamic Pricing Output',
    sla: '99.8% uptime',
    partitions: 16,
    status: 'healthy',
    lastUpdated: '2025-01-27 14:05:00',
    sourceType: 'model_output',
    sourceModelId: 'price-optimization'
  },
  {
    id: 'competitor-analysis',
    name: 'Competitor Analysis Feed',
    sla: '98.9% uptime',
    partitions: 12,
    status: 'warning',
    lastUpdated: '2025-01-27 13:30:00',
    sourceType: 'raw'
  },
  {
    id: 'social-media',
    name: 'Social Media Sentiment',
    sla: '99.2% uptime',
    partitions: 72,
    status: 'healthy',
    lastUpdated: '2025-01-27 14:00:00',
    sourceType: 'raw'
  },
  {
    id: 'weather-data',
    name: 'Weather & Events Data',
    sla: '99.1% uptime',
    partitions: 4,
    status: 'healthy',
    lastUpdated: '2025-01-27 13:55:00',
    sourceType: 'raw'
  }
];

export const getModelLineage = (modelId: string): ModelLineage => {
  const model = mockModels.find(m => m.id === modelId);
  if (!model) {
    throw new Error(`Model with id ${modelId} not found`);
  }

  const allDatasets = createMockDatasets();
  const datasets = allDatasets.filter(d => model.inputDatasets.includes(d.id));
  
  const sourceModelIds = datasets
    .filter(d => d.sourceType === 'model_output' && d.sourceModelId)
    .map(d => d.sourceModelId!);
  
  const sourceModels = mockModels.filter(m => sourceModelIds.includes(m.id));

  return {
    model,
    datasets,
    sourceModels
  };
};