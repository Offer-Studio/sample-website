'use client';

import React from 'react';
import { GridComponent as GridComponentType, Component } from '@/lib/schemas/site-schema';
import { cn } from '@/lib/utils';
import ComponentRenderer from '../ComponentRenderer';

const GridComponent: React.FC<GridComponentType> = ({
  style,
  children,
  id
}) => {
  // Extract className from style, and convert remaining style object to React inline style
  const { className: styleClassName, ...restStyle } = style || {};

  // Convert style object to React CSSProperties
  const inlineStyle = restStyle ? { ...restStyle } as React.CSSProperties : {};

  // Set default grid layout if not provided
  if (!restStyle?.display) {
    inlineStyle.display = 'grid';
  }

  if (!restStyle?.gridTemplateColumns) {
    inlineStyle.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
  }

  if (!restStyle?.gap) {
    inlineStyle.gap = '1rem';
  }

  // Render grid children
  const childComponents = children.map((child: Component, index: number) => (
    <ComponentRenderer key={`${id}-child-${index}`} component={child} />
  ));

  return (
    <div
      id={id}
      className={cn("w-full", styleClassName || '')}
      style={inlineStyle}
    >
      {childComponents}
    </div>
  );
};

export default GridComponent;
