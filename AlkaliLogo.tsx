import React from "react";

interface AlkaliLogoProps {
  className?: string;
  showText?: boolean;
}

export default function AlkaliLogo({ className = "w-10 h-10", showText = true }: AlkaliLogoProps) {
  return (
    <div className={`flex items-center space-x-2.5 select-none ${showText ? "" : "justify-center"}`}>
      {/* High-Fi SVG Circular Emblem */}
      <div className={`relative flex-none ${className}`}>
        <svg
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(212,175,55,0.25)] animate-[spin_60s_linear_infinite] hover:animate-[spin_10s_linear_infinite] transition-all duration-1000"
        >
          <defs>
            {/* Metallic Gold Gradient */}
            <linearGradient id="gold-metallic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCE082" />
              <stop offset="25%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#AA7C11" />
              <stop offset="75%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#FFEA9F" />
            </linearGradient>

            {/* Dark Charcoal Ring Gradient */}
            <linearGradient id="dark-ring" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2A2A2A" />
              <stop offset="100%" stopColor="#0F0F0F" />
            </linearGradient>

            {/* Center Background Radial Gradient */}
            <radialGradient id="inner-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="80%" stopColor="#F8F9FA" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </radialGradient>

            {/* Paths for text curving */}
            {/* Clockwise top path for top text */}
            <path
              id="alkali-text-top"
              d="M 88,256 A 168,168 0 0,1 424,256"
              fill="none"
            />
            {/* Clockwise bottom path (but configured to read correctly from left to right underneath) */}
            <path
              id="alkali-text-bottom"
              d="M 424,256 A 168,168 0 0,1 88,256"
              fill="none"
            />
          </defs>

          {/* Outer Gold Ring Border */}
          <circle cx="256" cy="256" r="248" stroke="url(#gold-metallic)" strokeWidth="8" fill="url(#dark-ring)" />
          
          {/* Inner Golden Separator */}
          <circle cx="256" cy="256" r="192" stroke="url(#gold-metallic)" strokeWidth="4" />

          {/* Text Along Path: ALKALI */}
          <text fill="url(#gold-metallic)" className="font-sans font-black uppercase text-[50px] tracking-[12px]" dy="-8">
            <textPath href="#alkali-text-top" startOffset="50%" textAnchor="middle">
              ALKALI
            </textPath>
          </text>

          {/* Circular Dots Separators left and right */}
          <circle cx="96" cy="256" r="12" fill="#E2E8F0" stroke="url(#gold-metallic)" strokeWidth="3" />
          <circle cx="416" ccy66="256" r="12" fill="#E2E8F0" stroke="url(#gold-metallic)" strokeWidth="3" />

          {/* Text Along Path: COMMUNICATION */}
          <text fill="url(#gold-metallic)" className="font-sans font-bold uppercase text-[31px] tracking-[5.5px]" dy="34">
            <textPath href="#alkali-text-bottom" startOffset="50%" textAnchor="middle">
              COMMUNICATION
            </textPath>
          </text>

          {/* Center Light Glistening Canvas */}
          <circle cx="256" cy="256" r="172" fill="url(#inner-glow)" stroke="url(#gold-metallic)" strokeWidth="3" />

          {/* Stylized Phone & Circuit Details in the center */}
          <g transform="translate(148, 148)">
            {/* Left large sweeping gold crescent/bracket */}
            <path
              d="M 45,15 C 5,45 -5,115 15,165 C 30,190 60,205 90,205 C 55,185 28,145 28,95 C 28,55 45,25 65,10"
              fill="url(#gold-metallic)"
            />
            
            {/* Smartphone core drawing (offset to center-right) */}
            <rect
              x="60"
              y="55"
              width="90"
              height="115"
              rx="12"
              fill="#1F2937"
              stroke="url(#gold-metallic)"
              strokeWidth="4.5"
              transform="rotate(6, 105, 112)"
            />
            {/* Phone Screen Notch */}
            <rect
              x="92"
              y="60"
              width="26"
              height="5"
              rx="2.5"
              fill="#0F172A"
              transform="rotate(6, 105, 112)"
            />
            {/* Phone Home visual bar */}
            <line
              x1="95"
              y1="162"
              x2="115"
              y2="162"
              stroke="#E2E8F0"
              strokeWidth="3.5"
              strokeLinecap="round"
              transform="rotate(6, 105, 112)"
            />
            
            {/* Circuit Line with circle node on the right (sweeping around the phone) */}
            <path
              d="M 125,50 C 155,55 185,90 185,130 C 185,155 170,175 155,185 L 140,195"
              fill="none"
              stroke="url(#gold-metallic)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="185" cy="130" r="8" fill="#1F2937" stroke="url(#gold-metallic)" strokeWidth="3" />
            <circle cx="155" cy="185" r="5" fill="url(#gold-metallic)" />

            {/* Inner Bold "ALK" Branding Text */}
            <text
              x="105"
              y="126"
              fill="#0F172A"
              className="font-sans font-black tracking-tight text-[36px]"
              textAnchor="middle"
              transform="rotate(3, 105, 112)"
            >
              ALK
            </text>
            <text
              x="105"
              y="126"
              fill="url(#gold-metallic)"
              className="font-sans font-black tracking-tight text-[36px] opacity-15"
              textAnchor="middle"
              transform="rotate(3, 105, 112) translate(-1, -1)"
            >
              ALK
            </text>
          </g>
        </svg>

        {/* Outer ambient glow effect */}
        <div className="absolute -inset-1.5 rounded-full bg-[#D4AF37]/20 blur-md -z-10 animate-pulse" />
      </div>

      {showText && (
        <div className="flex flex-col select-none">
          <span className="font-sans text-sm font-extrabold tracking-wider text-white uppercase sm:text-lg">
            Alkali
          </span>
          <span className="font-mono text-[9px] tracking-widest text-[#D4AF37] uppercase font-bold sm:text-[10px]">
            Telecom & VTU
          </span>
        </div>
      )}
    </div>
  );
}
