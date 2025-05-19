import React from 'react';
import JsonPageRenderer from '@/components/json-renderer/JsonPageRenderer';
import pageConfig from '@/config/pages/blue-ocean-strategy.json';

export default function BlueOceanStrategyPage() {
  return <JsonPageRenderer pageConfig={pageConfig} />;
} 