'use client';

import ReactLoading from 'react-loading';

export type LoadingType =
  | 'blank'
  | 'balls'
  | 'bars'
  | 'bubbles'
  | 'cubes'
  | 'cylon'
  | 'spin'
  | 'spinningBubbles'
  | 'spokes';

export interface LoadingBarProps {
  type?: LoadingType;
  color?: string;
  height?: string;
  width?: string;
  className?: string;
}

export default function LoadingBar({
  type = 'bars',
  color = '#1d75d3',
  height,
  width,
  className,
}: LoadingBarProps) {
  return (
    <ReactLoading type={type} color={color} height={height} width={width} className={className} />
  );
}
