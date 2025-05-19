'use client';

import React from 'react';
import { ContainerComponent as ContainerComponentType, Component } from '@/lib/schemas/site-schema';
import { cn } from '@/lib/utils';
import ComponentRenderer from '../ComponentRenderer';

const ContainerComponent: React.FC<ContainerComponentType> = ({
  variant = 'div',
  style,
  children,
  id
}) => {
  // Extract className from style, and convert remaining style object to React inline style
  const { className: styleClassName, ...restStyle } = style || {};

  // Convert style object to React CSSProperties
  const inlineStyle = restStyle ? { ...restStyle } as React.CSSProperties : {};

  // Get the base container class
  const containerClass = cn(
    "w-full",
    styleClassName || ''
  );

  // Render the appropriate HTML element based on variant
  const renderContainer = () => {
    const childComponents = children.map((child: Component, index: number) => (
      <ComponentRenderer key={`${id}-child-${index}`} component={child} />
    ));

    switch (variant) {
      case 'section':
        return <section id={id} className={containerClass} style={inlineStyle}>{childComponents}</section>;
      case 'article':
        return <article id={id} className={containerClass} style={inlineStyle}>{childComponents}</article>;
      case 'aside':
        return <aside id={id} className={containerClass} style={inlineStyle}>{childComponents}</aside>;
      case 'main':
        return <main id={id} className={containerClass} style={inlineStyle}>{childComponents}</main>;
      case 'header':
        return <header id={id} className={containerClass} style={inlineStyle}>{childComponents}</header>;
      case 'footer':
        return <footer id={id} className={containerClass} style={inlineStyle}>{childComponents}</footer>;
      case 'div':
      default:
        return <div id={id} className={containerClass} style={inlineStyle}>{childComponents}</div>;
    }
  };

  return renderContainer();
};

export default ContainerComponent;
