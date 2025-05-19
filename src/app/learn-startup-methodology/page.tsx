import React from 'react';
import JsonPageRenderer from '@/components/json-renderer/JsonPageRenderer';
import pageConfig from '@/config/pages/learn-startup-methodology.json';

export default function LearnStartupMethodologyPage() {
  return <JsonPageRenderer pageConfig={pageConfig} />;
} 