import React, { useState } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';

interface FormButtonsProps {
  onSubmit?: () => Promise<void> | void;
}

function FormButtons({ onSubmit = async () => {} }: FormButtonsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-end gap-4 mt-8">
      <button
        type="button"
        className="flex items-center gap-2 px-4 py-2 text-base font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent transition-all duration-200 ease-in-out shadow-xs hover:shadow-sm active:scale-[0.98]"
        disabled={isSubmitting}
      >
        <FiX className="w-5 h-5" />
        Cancel
      </button>

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`
          relative 
          py-4 px-12 
          border-0 
          rounded-md 
          text-white 
          font-semibold 
          text-base
          overflow-hidden 
          shadow-md
          transition-all 
          duration-300 
          active:scale-[0.98]
          ${isSubmitting ? 'bg-green-500' : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'}
        `}
      >
        {/* Progress container */}
        {isSubmitting && (
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute top-0 left-0 bottom-0 bg-white/30"
              style={{
                animation: 'fill 2s infinite',
                width: '0%'
              }}
            />
          </div>
        )}
        
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isSubmitting ? (
            'Submiting'
          ) : (
            <>
              <FiCheck className="w-5 h-5" />
              Submit
            </>
          )}
        </span>

        {/* Add style tag for the animation */}
        <style jsx>{`
          @keyframes fill {
            0% {
              width: 0%;
              left: 0%;
            }
            50% {
              width: 100%;
              left: 0%;
            }
            100% {
              width: 0%;
              left: 100%;
            }
          }
        `}</style>
      </button>
    </div>
  );
}

export default FormButtons;