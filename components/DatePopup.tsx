import { CSSTransition } from 'react-transition-group';
import React, { useRef } from 'react';

type DatePopupProps = {
  date: string;
  onClose: () => void;
  show: boolean;
};

const DatePopup = ({ date, onClose, show }: DatePopupProps) => {
  const nodeRef = useRef(null);

  const formattedDate = date ? new Date(date).toLocaleString() : 'Invalid Date';

  return (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="fade"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div
        ref={nodeRef}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-200"
      >
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm transform transition-transform scale-95 animate-popup">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Last Updated</h3>
          <p className="text-gray-600 text-sm">{formattedDate}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default DatePopup;
