import React from 'react';

interface ConnectionLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  animated?: boolean;
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({ from, to, animated = false }) => {
  const midX = (from.x + to.x) / 2;
  const pathD = `M ${from.x} ${from.y} Q ${midX} ${from.y} ${to.x} ${to.y}`;

  return (
    <g>
      <path
        d={pathD}
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="3"
        className={animated ? "animate-pulse" : ""}
      />
      
      {/* Arrow head */}
      <polygon
        points={`${to.x-8},${to.y-4} ${to.x},${to.y} ${to.x-8},${to.y+4}`}
        fill="url(#gradient)"
        className={animated ? "animate-pulse" : ""}
      />
      
      {/* Data flow animation */}
      {animated && (
        <circle r="4" fill="#3B82F6">
          <animateMotion dur="2s" repeatCount="indefinite">
            <mpath href={`#path-${from.x}-${from.y}`} />
          </animateMotion>
        </circle>
      )}
    </g>
  );
};

export default ConnectionLine;