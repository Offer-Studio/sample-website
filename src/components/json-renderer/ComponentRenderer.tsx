'use client';

import React from 'react';
import { Component } from '@/lib/schemas/site-schema';
import TextComponent from './components/TextComponent';
import ButtonComponent from './components/ButtonComponent';
import ImageComponent from './components/ImageComponent';
import VideoComponent from './components/VideoComponent';
import ContainerComponent from './components/ContainerComponent';
import GridComponent from './components/GridComponent';
import SpacerComponent from './components/SpacerComponent';
import DividerComponent from './components/DividerComponent';
import PdfComponent from './components/PdfComponent';
import CarouselComponent from './components/CarouselComponent';
import AudioComponent from './components/AudioComponent';
import FlipCardComponent from './components/FlipCardComponent';

interface ComponentRendererProps {
  component: Component;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({ component }) => {
  // Render the appropriate component based on the type property
  switch (component.type) {
    case 'text':
      return (
        <TextComponent
          type={component.type}
          id={component.id}
          content={component.content}
          variant={component.variant}
          style={component.style}
          href={component.href}
          target={component.target}
          scroll={component.scroll}
          allowHtml={component.allowHtml}
        />
      );
    case 'button':
      return (
        <ButtonComponent
          type={component.type}
          id={component.id}
          content={component.content}
          variant={component.variant}
          size={component.size}
          href={component.href}
          style={component.style}
          onClick={component.onClick}
          target={component.target}
        />
      );
    case 'image':
      return (
        <ImageComponent
          type={component.type}
          id={component.id}
          src={component.src}
          alt={component.alt}
          width={component.width}
          height={component.height}
          style={component.style}
          caption={component.caption}
        />
      );
    case 'video':
      return (
        <VideoComponent
          type={component.type}
          id={component.id}
          src={component.src}
          width={component.width}
          height={component.height}
          autoPlay={component.autoPlay}
          controls={component.controls}
          loop={component.loop}
          muted={component.muted}
          style={component.style}
          caption={component.caption}
        />
      );
    case 'pdf':
      return (
        <PdfComponent
          type={component.type}
          id={component.id}
          src={component.src}
          width={component.width}
          height={component.height}
          style={component.style}
          showControls={component.showControls}
        />
      );
    case 'container':
      return (
        <ContainerComponent
          type={component.type}
          id={component.id}
          variant={component.variant}
          style={component.style}
        >
          {component.children}
        </ContainerComponent>
      );
    case 'grid':
      return (
        <GridComponent
          type={component.type}
          id={component.id}
          style={component.style}
        >
          {component.children}
        </GridComponent>
      );
    case 'spacer':
      return (
        <SpacerComponent
          type={component.type}
          id={component.id}
          height={component.height}
          style={component.style}
        />
      );
    case 'divider':
      return (
        <DividerComponent
          type={component.type}
          id={component.id}
          orientation={component.orientation}
          style={component.style}
        />
      );
    case 'audio':
      return (
        <AudioComponent
          type={component.type}
          id={component.id}
          src={component.src}
          autoPlay={component.autoPlay}
          controls={component.controls}
          loop={component.loop}
          muted={component.muted}
          style={component.style}
          caption={component.caption}
        />
      );
    case 'carousel':
      return (
        <CarouselComponent
          type={component.type}
          id={component.id}
          style={component.style}
          items={component.items}
          showControls={component.showControls}
          autoPlay={component.autoPlay}
          interval={component.interval}
          orientation={component.orientation}
          showDots={component.showDots}
        />
      );
    case 'flipCard':
      return (
        <FlipCardComponent
          type={component.type}
          id={component.id}
          frontImage={component.frontImage}
          backContent={component.backContent}
          flipTrigger={component.flipTrigger ?? "hover"}
          width={component.width}
          height={component.height}
          style={component.style}
          frontStyle={component.frontStyle}
          backStyle={component.backStyle}
        />
      );
    default:
      return <div>Unknown component type: {(component as { type: string }).type}</div>;
  }
};

export { ComponentRenderer };
export default ComponentRenderer;
