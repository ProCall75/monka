"use client";

import React from 'react';

export interface MProgressDotsProps {
  total?: number;
  current: number; // 0-indexed
  accentColor?: string;
}

export const MProgressDots = ({
  total = 4,
  current,
  accentColor = '#2D2A26',
}: MProgressDotsProps) => {
  return (
    <div className="flex gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`
            h-[6px] rounded-full transition-all duration-300
            ${i <= current ? 'flex-[2]' : 'flex-1'}
          `}
          style={{
            backgroundColor: i <= current ? accentColor : '#EDE8E1',
          }}
        />
      ))}
    </div>
  );
};
