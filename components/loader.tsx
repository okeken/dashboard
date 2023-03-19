import React from "react";

function FullScreenLoader() {
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <svg className="animate-spin h-12 w-12 text-white" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.411 3.589 8 8 8v-2.009a5.978 5.978 0 01-2-.291zM16 12a8 8 0 01-8 8v-4a4 4 0 004-4h4zm-2-7.291A7.962 7.962 0 0120 12h4c0-4.411-3.589-8-8-8v2.009a5.978 5.978 0 012 .291z"
          />
        </svg>
      </div>
    </div>
  );
}

export default FullScreenLoader;
