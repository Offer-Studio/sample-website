'use client';

import React from 'react';
import { Separator } from '@/components/ui/separator';
import { DividerComponent as DividerComponentType } from '@/lib/schemas/site-schema';
import { cn } from '@/lib/utils';

const DividerComponent: React.FC<DividerComponentType> = ({
  orientation = 'horizontal',
  style,
  id
}) => {
  // Extract className from style, and convert remaining style object to React inline style
  const { className: styleClassName, ...restStyle } = style || {};

  // Convert style object to React CSSProperties
  const inlineStyle = restStyle ? { ...restStyle } as React.CSSProperties : {};

  // Additional customization classes
  const dividerClass = cn(
    "my-4", // Default margin
    styleClassName || ''
  );

  return (
    <Separator
      id={id}
      orientation={orientation}
      style={inlineStyle}
      className={dividerClass}
    />
  );
};

export default DividerComponent;
