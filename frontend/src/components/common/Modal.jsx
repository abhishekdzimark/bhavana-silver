import PropTypes from 'prop-types';
import { FiX } from 'react-icons/fi';

/**
 * Reusable Modal component
 */
const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  maxWidth = '3xl',
  showCloseButton = true 
}) => {
  if (!isOpen) return null;

  const maxWidthClasses = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
      <div className={`bg-white rounded-lg shadow-2xl ${maxWidthClasses[maxWidth]} w-full max-h-[90vh] overflow-y-auto relative`}>
        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-300 z-10"
            aria-label="Close modal"
          >
            <FiX className="w-6 h-6 text-gray-600 hover:text-gray-900" />
          </button>
        )}

        {/* Modal Content */}
        <div className="p-6 md:p-8 lg:p-10">
          {title && (
            <h2 className="section-heading mb-8">
              {title}
            </h2>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']),
  showCloseButton: PropTypes.bool,
};

export default Modal;
