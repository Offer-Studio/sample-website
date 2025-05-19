'use client';

import React, { useEffect, useState } from 'react';
import ComponentRenderer from '../ComponentRenderer';
import { Component } from '@/lib/schemas/site-schema';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

interface CarouselComponentProps {
  type: 'carousel';
  id: string;
  style?: Record<string, string>;
  items: Component[];
  showControls?: boolean;
  autoPlay?: boolean;
  interval?: number;
  orientation?: 'horizontal' | 'vertical';
  showDots?: boolean;
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({
  id,
  style,
  items,
  showControls = true,
  autoPlay = false,
  interval = 5000,
  orientation = 'horizontal',
  showDots = false,
}) => {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (!api || !autoPlay) return;

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, interval);

    return () => clearInterval(intervalId);
  }, [api, autoPlay, interval]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div id={id} style={style} className="relative">
      <Carousel 
        setApi={setApi} 
        orientation={orientation} 
        className="w-full"
        opts={{
          loop: autoPlay,
        }}
      >
        {showControls && (
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
        )}
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={`${id}-item-${index}`} className="md:basis-1/1 lg:basis-1/1">
              <div className="p-1">
                <ComponentRenderer component={item} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {showControls && (
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
        )}
      </Carousel>
      
      {showDots && count > 0 && (
        <div className="flex justify-center gap-1 mt-4">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={`${id}-dot-${index}`}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                current === index ? "bg-primary" : "bg-muted-foreground/30"
              )}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarouselComponent; 