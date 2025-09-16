import React from "react";

const CircularProgress = (
    { 
        percentage, 
        size = 120, 
        strokeWidth = 12,
        classExtensions = null,
    }
) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-300"
          fill="transparent"
        />
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-blue-500 transition-all duration-500 ease-out"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

      {/* Text in middle */}
      <span className="absolute text-xl font-semibold text-gray-700">
        {percentage}%
      </span>
    </div>
  );
};

export default CircularProgress;
