import React from "react";

// Ikon scroll animasi di bagian bawah section
export default function ScrollDownIndicator() {
  return (
    <div className="absolute bottom-15 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-yellow-400 text-md animate-bounce-slow">
      {/* SVG ikon mouse dengan lingkaran animasi */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-10 sm:w-8 sm:h-12 mb-1"
        viewBox="0 0 24 40"
        fill="none"
      >
        {/* Outline mouse */}
        <rect
          x="1"
          y="1"
          width="22"
          height="38"
          rx="11"
          stroke="white"
          strokeWidth="1.5"
        />
        {/* Titik dalam mouse dengan animasi turun-naik */}
        <circle cx="12" cy="10" r="3" fill="red">
          <animate
            attributeName="cy"
            values="10;25;10"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* Teks di bawah ikon */}
      <span className="text-sm sm:text-base text-white">
        Scroll to Explore
      </span>
    </div>
  );
}
