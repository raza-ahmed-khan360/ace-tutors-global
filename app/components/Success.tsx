"use client";
import React, { useState, useEffect } from "react";

interface CardProps {
  title: string;
  description: string;
  onClose?: () => void;
}

const Success: React.FC<CardProps> = ({ title, description, onClose }) => {
  const [visible, setVisible] = useState(true);

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 md:right-4 md:left-auto left-1/2 transform -translate-x-1/2 md:translate-x-0 z-50">
      <div className="flex items-center justify-between w-64 sm:w-72 p-3 sm:p-4 rounded-lg shadow-lg border border-gray-700 bg-indigo-950 transition-opacity duration-300 ease-in-out">
        <div className="flex gap-3 items-center">
          <div className="text-green-400 bg-white/10 p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <div>
            <p className="text-white text-sm sm:text-base font-plusjakartasans">{title}</p>
            <p className="text-gray-300 text-xs sm:text-sm font-poppins">{description}</p>
          </div>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-gray-400 hover:text-white p-2 rounded-md transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Success;
