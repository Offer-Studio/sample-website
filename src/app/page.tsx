import React from 'react';
import JsonPageRenderer from '@/components/json-renderer/JsonPageRenderer';
import homeConfig from '@/config/pages/home.json';

export default function Home() {
  return <JsonPageRenderer pageConfig={homeConfig} />;
}
