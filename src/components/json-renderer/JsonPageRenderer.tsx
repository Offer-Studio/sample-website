'use client';

import React from 'react';
import ComponentRenderer from './ComponentRenderer';
import { Component } from '@/lib/schemas/site-schema';

interface JsonPageRendererProps {
  pageConfig: {
    components: Component[];
  };
}

const JsonPageRenderer: React.FC<JsonPageRendererProps> = ({ pageConfig }) => {
  // Get components from the page config
  const components = pageConfig.components;

  return (
    <div className="w-full">
      {components.map((component, index) => (
        <ComponentRenderer key={`page-component-${index}`} component={component} />
      ))}
    </div>
  );
};

export default JsonPageRenderer;
