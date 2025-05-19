import React from 'react';
import JsonPageRenderer from '@/components/json-renderer/JsonPageRenderer';
import pageConfig from '@/config/pages/innovators-dilemma.json';

export default function InnovatorsDilemmaPage() {
  return <JsonPageRenderer pageConfig={pageConfig} />;
} 