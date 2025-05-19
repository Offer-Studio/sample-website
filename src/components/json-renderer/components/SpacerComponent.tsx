'use client';

import React from 'react';
import { SpacerComponent as SpacerComponentType } from '@/lib/schemas/site-schema';

const SpacerComponent: React.FC<SpacerComponentType> = ({
  height = '1rem',
  style,
  id
}) => {
  // Extract className from style, and convert remaining style object to React inline style
  const { className, ...restStyle } = style || {};

  // Convert style object to React CSSProperties
  const inlineStyle = {
    height,
    width: '100%',
    ...(restStyle as React.CSSProperties)
  };

  return <div id={id} style={inlineStyle} className={className} aria-hidden="true" />;
};

export default SpacerComponent;
