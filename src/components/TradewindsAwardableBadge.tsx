import React from 'react';

interface TradewindsAwardableBadgeProps {
  className?: string;
  size?: number;
  theme?: 'dark' | 'light';
}

export const TradewindsAwardableBadge: React.FC<TradewindsAwardableBadgeProps> = ({
  className = '',
  size = 120,
  theme = 'dark'
}) => {
  const isLight = theme === 'light';

  // Strict compliance with uploaded image colors:
  // Light: Black lines/text (#000000) on White background (#ffffff)
  // Dark: White lines/text (#ffffff) on Black background (#000000)
  const strokeColor = isLight ? '#000000' : '#ffffff';
  const fillColor = isLight ? '#000000' : '#ffffff';
  const bgColor = isLight ? '#ffffff' : '#000000';

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 hover:scale-105 select-none"
      >
        {/* Background Circle */}
        <circle cx="150" cy="150" r="142" fill={bgColor} stroke={strokeColor} strokeWidth="8" />
        <circle cx="150" cy="150" r="134" stroke={strokeColor} strokeWidth="2.5" strokeDasharray="6 4" />

        {/* Top Arc Path for Text */}
        <path id="topArcPath" d="M 38 150 A 112 112 0 0 1 262 150" fill="none" />
        {/* Bottom Arc Path for Text */}
        <path id="bottomArcPath" d="M 262 150 A 112 112 0 0 1 38 150" fill="none" />

        {/* Circular Curved Text: CHIEF DIGITAL AND ARTIFICIAL INTELLIGENCE OFFICE */}
        <text fill={fillColor} fontSize="11.5" fontWeight="800" fontFamily="sans-serif" letterSpacing="1.2">
          <textPath href="#topArcPath" startOffset="50%" textAnchor="middle">
            CHIEF DIGITAL AND ARTIFICIAL INTELLIGENCE OFFICE
          </textPath>
        </text>

        {/* Center Icon Graphic - CDAO Tech Symbol */}
        <g stroke={strokeColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          {/* Main vertical center line */}
          <line x1="150" y1="95" x2="150" y2="138" strokeWidth="5" />
          
          {/* Left chevrons / branches */}
          <path d="M 135 102 L 135 120 L 128 127" />
          <path d="M 122 107 L 122 125 L 115 132" />

          {/* Right chevrons / branches */}
          <path d="M 165 102 L 165 120 L 172 127" />
          <path d="M 178 107 L 178 125 L 185 132" />
        </g>

        {/* Inner Curved Accent Lines */}
        <path d="M 98 100 A 70 70 0 0 1 128 92" stroke={strokeColor} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 202 100 A 70 70 0 0 0 172 92" stroke={strokeColor} strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* AWARDABLE Main Title */}
        <text
          x="150"
          y="156"
          fill={fillColor}
          fontSize="24"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="2.5"
          textAnchor="middle"
        >
          AWARDABLE
        </text>

        {/* Circuit Line Divider */}
        <g stroke={strokeColor} strokeWidth="2.5" fill="none">
          <circle cx="95" cy="166" r="3" fill={fillColor} />
          <line x1="98" y1="166" x2="140" y2="166" />
          <line x1="140" y1="166" x2="150" y2="172" />
          <line x1="150" y1="172" x2="202" y2="172" />
          <circle cx="205" cy="172" r="3" fill={fillColor} />

          <circle cx="95" cy="172" r="3" fill={fillColor} />
          <line x1="98" y1="172" x2="145" y2="172" />
          <line x1="145" y1="172" x2="155" y2="166" />
          <line x1="155" y1="166" x2="202" y2="166" />
          <circle cx="205" cy="166" r="3" fill={fillColor} />
        </g>

        {/* TRADEWINDS SOLUTIONS MARKETPLACE Text */}
        <text
          x="150"
          y="190"
          fill={fillColor}
          fontSize="11"
          fontWeight="800"
          fontFamily="sans-serif"
          letterSpacing="1.2"
          textAnchor="middle"
        >
          TRADEWINDS SOLUTIONS
        </text>
        <text
          x="150"
          y="204"
          fill={fillColor}
          fontSize="11"
          fontWeight="800"
          fontFamily="sans-serif"
          letterSpacing="1.2"
          textAnchor="middle"
        >
          MARKETPLACE
        </text>

        {/* Bottom Outer Dashed Accent Line */}
        <path d="M 80 220 A 105 105 0 0 0 220 220" stroke={strokeColor} strokeWidth="2.5" strokeDasharray="14 8" fill="none" />
      </svg>
    </div>
  );
};
