import React, { useState } from 'react';
import { PopoutWindowProps } from './PopoutWindow.types';

const PopoutWindow: React.FC<PopoutWindowProps> = ({ title, text }) => {
  const [showPopout, setShowPopout] = useState(true);

  if (!showPopout) return null;

  return (
    <div className="fixed top-20 right-5 flex items-start bg-black rounded-lg shadow-lg z-50">
      <div className="relative bg-yellow-400 p-6 rounded-lg max-w-sm">
        <div className="absolute -top-2 right-6 w-4 h-4 bg-yellow-400 rotate-45"></div>
        <p className="text-black font-bold text-lg">{title}</p>
        <p className="text-black mt-2">{text}</p>
        <button
          className="absolute top-2 right-2 text-black hover:text-gray-700"
          onClick={() => setShowPopout(false)}
        >
          <img src="close.svg" className="w-3 h-3 m-1" alt="Close" />
        </button>
      </div>
    </div>
  );
};

export default PopoutWindow;
