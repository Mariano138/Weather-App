import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { useWindowDimensions } from 'react-native';

export default function SkeletonLoader() {
  const { width, height } = useWindowDimensions();

  return (
    <ContentLoader
      speed={0.8}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor="#cfcfc7"
      foregroundColor="#ecebeb">
      <Rect x={16} y={23} rx="20" ry="20" width={width - 32} height="84" />

      <Rect x={16} y={117} rx="20" ry="20" width={width - 32} height="285" />

      <Rect x={16} y={412} rx="20" ry="20" width={width - 32} height="90" />

      <Rect x={16} y={512} rx="20" ry="20" width={width - 32} height="90" />

      <Rect x={16} y={612} rx="20" ry="20" width={width - 32} height="90" />

      <Rect x={16} y={712} rx="20" ry="20" width={width - 32} height="90" />

      <Rect x={16} y={812} rx="20" ry="20" width={width - 32} height="90" />
    </ContentLoader>
  );
}
